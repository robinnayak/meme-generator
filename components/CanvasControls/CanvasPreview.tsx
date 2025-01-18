import React, { useRef, useEffect, useState, useCallback } from 'react';
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
  onUpdateFontSize: (id: string, fontSize: number) => void;
}

const CanvasPreview: React.FC<CanvasPreviewProps> = ({
  imageUrl,
  textBoxes,
  onUpdateTextPosition,
  onTextEdit,
  onTextDelete,
  onUpdateFontSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number; lastTap: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [initialTouchDistance, setInitialTouchDistance] = useState<number | null>(null);
  const [activeTextId, setActiveTextId] = useState<string | null>(null);
  const [initialFontSize, setInitialFontSize] = useState<number | null>(null);

  // Add touch event listeners with passive: false
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const touchStartHandler = (e: TouchEvent) => {
      e.preventDefault();
    };

    const touchMoveHandler = (e: TouchEvent) => {
      e.preventDefault();
    };

    canvas.addEventListener('touchstart', touchStartHandler, { passive: false });
    canvas.addEventListener('touchmove', touchMoveHandler, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', touchStartHandler);
      canvas.removeEventListener('touchmove', touchMoveHandler);
    };
  }, []);

  const handleDownload = async () => {
    if (canvasRef.current) {
      setIsDownloading(true);
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
      }finally {
        setIsDownloading(false);
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
      if (e.altKey) {
        onTextDelete(clickedText.id);
      } else {
        onTextEdit(clickedText.id);
      }
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
        lastTap: 0,
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

  const calculateTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const y = (touch.clientY - rect.top) * (canvas.height / rect.height);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clickedText = textBoxes.find((box) => isPointInTextBox(x, y, box, ctx));
    
    if (clickedText) {
      setActiveTextId(clickedText.id);
      setInitialFontSize(clickedText.fontSize);

      // Handle long press for drag
      const timer = setTimeout(() => {
        dragRef.current = {
          id: clickedText.id,
          offsetX: e.touches[0].clientX - clickedText.x,
          offsetY: e.touches[0].clientY - clickedText.y,
          lastTap: 0,
        };
        setIsDragging(true);
      }, 500); // 500ms for long press

      setLongPressTimer(timer);

      // Handle double tap for editing
      const now = Date.now();
      const lastTap = dragRef.current?.lastTap || 0;
      const tapTimeout = 300; // 300ms between taps

      if (now - lastTap < tapTimeout) {
        // Double tap detected
        onTextEdit(clickedText.id);
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          setLongPressTimer(null);
        }
      }

      dragRef.current = {
        id: clickedText.id,
        offsetX: e.touches[0].clientX - clickedText.x,
        offsetY: e.touches[0].clientY - clickedText.y,
        lastTap: now,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle pinch-to-zoom for text scaling
    if (e.touches.length === 2 && activeTextId && initialTouchDistance !== null && initialFontSize !== null) {
      const currentDistance = calculateTouchDistance(e.touches[0], e.touches[1]);
      const scale = currentDistance / initialTouchDistance;
      const newFontSize = Math.max(8, Math.min(200, Math.round(initialFontSize * scale)));
      onUpdateFontSize(activeTextId, newFontSize);
      return;
    }

    // Handle dragging
    if (isDragging && dragRef.current) {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
      const y = (touch.clientY - rect.top) * (canvas.height / rect.height);

      onUpdateTextPosition(
        dragRef.current.id,
        x - dragRef.current.offsetX,
        y - dragRef.current.offsetY
      );
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }

    // Reset all states
    dragRef.current = null;
    setIsDragging(false);
    setActiveTextId(null);
    setInitialTouchDistance(null);
    setInitialFontSize(null);
  };

  const handleFontSizeChange = (id: string, increase: boolean) => {
    const textBox = textBoxes.find((box) => box.id === id);
    if (textBox) {
      const newSize = increase ? textBox.fontSize + 2 : Math.max(8, textBox.fontSize - 2);
      onUpdateFontSize(id, newSize);
    }
  };

  const drawTextBoxes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageUrl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Draw text boxes
      textBoxes.forEach((box) => {
        ctx.font = `${box.italic ? 'italic ' : ''}${box.bold ? 'bold ' : ''}${box.fontSize}px sans-serif`;
        ctx.fillStyle = box.color;
        ctx.fillText(box.text, box.x, box.y);
      });
    };
  }, [imageUrl, textBoxes]);

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

      drawTextBoxes();
    };

    img.src = imageUrl;
  }, [imageUrl, textBoxes, drawTextBoxes]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative bg-gray-100 rounded-lg p-4 shadow-inner">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={handleDoubleClick}
          className="max-w-full border border-gray-200 rounded-lg shadow-sm touch-none"
          style={{
            cursor: isDragging ? 'grabbing' : 'default',
          }}
        />
      </div>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
        disabled={isDownloading}
      >
        {isDownloading ? 'Downloading...' : 'Download Meme'}
      </button>
    </div>
  );
};

export default CanvasPreview;
