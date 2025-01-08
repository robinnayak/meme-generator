import React, { useEffect, useState } from 'react';
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
  editingText: TextBox | null;
  onUpdateText: (updatedText: TextBox) => void;
  onDeleteText: (id: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onAddText, editingText, onUpdateText, onDeleteText }) => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState('#000000');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);

  useEffect(() => {
    if (editingText) {
      setText(editingText.text);
      setFontSize(editingText.fontSize);
      setColor(editingText.color);
      setBold(editingText.bold);
      setItalic(editingText.italic);
    }
  }, [editingText]);

  const handleAddText = () => {
    if (!text.trim()) return;

    if (editingText) {
      // Update existing text
      onUpdateText({
        ...editingText,
        text,
        fontSize,
        color,
        bold,
        italic,
      });
    } else {
      // Add new text
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
    }

    // Clear form
    setText('');

  };
  const handleDelete = () => {
    if (editingText && onDeleteText) {
      onDeleteText(editingText.id);
      // Clear form after deletion
      setText('');
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full p-2 border rounded-lg"
          rows={3}
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
            className={`px-4 py-2 border rounded ${bold ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
          >
            B
          </button>
          <button
            onClick={() => setItalic(!italic)}
            className={`px-4 py-2 border rounded ${italic ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
          >
            I
          </button>
        </div>
      </div>

      <button
        onClick={handleAddText}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        {editingText ? 'Update Text' : 'Add Text'}
      </button>
      {editingText && (
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Delete Text
        </button>
      )}
    </div>
  );
};

export default TextEditor;
