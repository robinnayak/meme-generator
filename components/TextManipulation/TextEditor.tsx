import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

interface TextEditorProps {
  onAddText: (textBox: TextBox) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onAddText }) => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState('#000000');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);

  const handleAddText = () => {
    if (!text.trim()) return;

    const newTextBox: TextBox = {
      id: uuidv4(),
      text,
      x: 50, // Default position
      y: 50,
      fontSize,
      color,
      bold,
      italic,
    };

    onAddText(newTextBox);
    setText('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          className="p-2 border rounded"
        />
        <div className="flex space-x-4">
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            min="8"
            max="72"
            className="p-2 border rounded w-20"
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="p-1 border rounded"
          />
          <button
            onClick={() => setBold(!bold)}
            className={`px-4 py-2 border rounded ${
              bold ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
          >
            B
          </button>
          <button
            onClick={() => setItalic(!italic)}
            className={`px-4 py-2 border rounded ${
              italic ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
          >
            I
          </button>
        </div>
      </div>
      <button
        onClick={handleAddText}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Text
      </button>
    </div>
  );
};

export default TextEditor;
