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
      const canvas = await html2canvas(canvasRef.current, { useCORS: true });
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find clicked text box
    const clickedText = textBoxes.find((box) => isPointInTextBox(x, y, box, ctx));

    if (clickedText) {
      onTextEdit(clickedText.id);
    }
  };

  // const handleKeyDown = (e: KeyboardEvent) => {
  //   if (e.key === 'Delete' || e.key === 'Backspace') {
  //     const canvas = canvasRef.current;
  //     if (!canvas) return;

  //     const ctx = canvas.getContext('2d');
  //     if (!ctx) return;

  //     // Find if mouse is over any text box
  //     const rect = canvas.getBoundingClientRect();
  //     const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
  //     const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

  //     const textToDelete = textBoxes.find((box) => isPointInTextBox(mouseX, mouseY, box, ctx));
      
  //     if (textToDelete) {
  //       onTextDelete(textToDelete.id);
  //     }
  //   }
  // };


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageUrl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Set canvas size based on image dimensions
      const maxWidth = 800;
      const maxHeight = 600;
      let width = img.width;
      let height = img.height;

      // Scale down if image is too large
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;
      setCanvasSize({ width, height });

      // Draw image and text
      ctx.drawImage(img, 0, 0, width, height);
      drawTextBoxes();
    };

    // Handle both data URLs and regular URLs
    if (imageUrl.startsWith('data:')) {
      img.src = imageUrl;
    } else if (imageUrl.startsWith('http')) {
      // For absolute URLs (like https://i.imgflip.com/...)
      img.src = imageUrl;
    } else {
      // For relative URLs (like /assets/meme1.jpg)
      img.src = window.location.origin + imageUrl;
    }
  }, [imageUrl]);

  useEffect(() => {
    if (imageUrl) {
      drawTextBoxes();
    }
  }, [imageUrl]);

  const drawTextBoxes = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageUrl) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas and redraw image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Draw the image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Draw text boxes
      textBoxes.forEach((box) => {
        ctx.font = `${box.bold ? 'bold ' : ''}${box.italic ? 'italic ' : ''}${
          box.fontSize
        }px Arial`;
        ctx.fillStyle = box.color;
        ctx.fillText(box.text, box.x, box.y);
      });
    };

    img.onerror = (error) => {
      console.error('Error loading image:', error);
      // Draw a placeholder or error message
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#666';
      ctx.font = '16px Arial';
      ctx.fillText('Error loading image', canvas.width/2 - 50, canvas.height/2);
    };

    // Set the image source
    if (imageUrl.startsWith('data:')) {
      img.src = imageUrl;
    } else if (imageUrl.startsWith('http')) {
      img.src = imageUrl;
    } else {
      img.src = window.location.origin + imageUrl;
    }
  };

  useEffect(() => {
    drawTextBoxes();
  }, [textBoxes]);

  const isPointInTextBox = (x: number, y: number, box: TextBox, ctx: CanvasRenderingContext2D) => {
    ctx.font = `${box.bold ? 'bold ' : ''}${box.italic ? 'italic ' : ''}${box.fontSize}px Arial`;
    const metrics = ctx.measureText(box.text);
    const padding = 10; // Add some padding for easier selection
    
    return (
      x >= box.x - padding &&
      x <= box.x + metrics.width + padding &&
      y >= box.y - box.fontSize - padding &&
      y <= box.y + padding
    );
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find clicked text box
    const clickedText = textBoxes.find((box) => isPointInTextBox(x, y, box, ctx));

    if (clickedText) {
      setIsDragging(true);
      dragRef.current = {
        id: clickedText.id,
        offsetX: x - clickedText.x,
        offsetY: y - clickedText.y,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragRef.current || !isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    // Calculate new position
    let newX = x - dragRef.current.offsetX;
    let newY = y - dragRef.current.offsetY;

    // Get text metrics for bounds checking
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const textBox = textBoxes.find(box => box.id === dragRef.current?.id);
    if (!textBox) return;

    ctx.font = `${textBox.bold ? 'bold ' : ''}${textBox.italic ? 'italic ' : ''}${textBox.fontSize}px Arial`;
    const metrics = ctx.measureText(textBox.text);

    // Bounds checking
    newX = Math.max(0, Math.min(newX, canvas.width - metrics.width));
    newY = Math.max(textBox.fontSize, Math.min(newY, canvas.height));

    onUpdateTextPosition(dragRef.current.id, newX, newY);
  };

  const handleMouseUp = () => {
    dragRef.current = null;
    setIsDragging(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <canvas
        ref={canvasRef}
        style={{ cursor: isDragging ? 'grabbing' : 'default' }}
        className={`w-full ${isDragging ? 'cursor-grabbing' : textBoxes.length > 0 ? 'cursor-grab' : 'cursor-default'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
      />
      <div className="absolute top-2 right-2">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default CanvasPreview;
