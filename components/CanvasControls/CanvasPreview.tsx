import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

type TextBox = {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  bold: boolean;
  italic: boolean;
};

interface CanvasPreviewProps {
  imageUrl: string | null;
  textBoxes: TextBox[];
  onUpdateTextPosition: (id: string, x: number, y: number) => void;
  onTextEdit: (id: string) => void;
  onTextDelete: (id: string) => void;
}

const CanvasPreview: React.FC<CanvasPreviewProps> = ({
  imageUrl,
  textBoxes,
  onUpdateTextPosition,
  onTextEdit,
  onTextDelete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDownload = async () => {
    if (canvasRef.current) {
      try {
        const canvas = await html2canvas(canvasRef.current, { 
          useCORS: true,
          backgroundColor: null 
        });
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    }
  };

  const isPointInTextBox = (x: number, y: number, box: TextBox, ctx: CanvasRenderingContext2D) => {
    ctx.font = `${box.italic ? 'italic ' : ''}${box.bold ? 'bold ' : ''}${box.fontSize}px Arial`;
    const metrics = ctx.measureText(box.text);
    const height = box.fontSize;
    return (
      x >= box.x &&
      x <= box.x + metrics.width &&
      y >= box.y - height &&
      y <= box.y
    );
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clickedText = textBoxes.find((box) => isPointInTextBox(x, y, box, ctx));
    if (clickedText) {
      onTextEdit(clickedText.id);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clickedText = textBoxes.find((box) => isPointInTextBox(x, y, box, ctx));
    if (clickedText) {
      dragRef.current = {
        id: clickedText.id,
        offsetX: x - clickedText.x,
        offsetY: y - clickedText.y,
      };
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !dragRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    onUpdateTextPosition(
      dragRef.current.id,
      x - dragRef.current.offsetX,
      y - dragRef.current.offsetY
    );
  };

  const handleMouseUp = () => {
    dragRef.current = null;
    setIsDragging(false);
  };

  const drawTextBoxes = (ctx: CanvasRenderingContext2D) => {
    textBoxes.forEach((box) => {
      ctx.font = `${box.italic ? 'italic ' : ''}${box.bold ? 'bold ' : ''}${box.fontSize}px Arial`;
      ctx.fillStyle = box.color;
      ctx.fillText(box.text, box.x, box.y);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageUrl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      let width = img.width;
      let height = img.height;

      // Scale down if image is too large
      if (width > 300 || height > 400) {
        if (aspectRatio > 1) {
          width = 300;
          height = 300 / aspectRatio;
        } else {
          height = 400;
          width = 400 * aspectRatio;
        }
      }

      canvas.width = width;
      canvas.height = height;
      setCanvasSize({ width, height });

      // Clear canvas and draw image
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      drawTextBoxes(ctx);
    };

    img.src = imageUrl;
  }, [imageUrl, textBoxes]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative bg-gray-100 rounded-lg p-4 shadow-inner">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          className="max-w-full border border-gray-200 rounded-lg shadow-sm"
          style={{
            cursor: isDragging ? 'grabbing' : 'default',
            touchAction: 'none'
          }}
        />
      </div>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
      >
        Download Meme
      </button>
    </div>
  );
};

export default CanvasPreview;
