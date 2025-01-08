'use client';

import { useEffect, useState } from 'react';
import TemplateSelector from '../ImageManagement/TemplateSelector';
import CanvasPreview from '../CanvasControls/CanvasPreview';
import TextEditor from '../TextManipulation/TextEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

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

type Template = {
  id: number;
  name: string;
  thumbnail: string;
};

export default function MemeGeneratorClient( ) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);
  const [editingText, setEditingText] = useState<TextBox | null>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  
  useEffect(() => {
    if (shouldScroll && selectedImage) {
      const canvasSection = document.getElementById('canvas-preview');
      if (canvasSection) {
        canvasSection.scrollIntoView({ behavior: 'smooth' });
        setShouldScroll(false);
      }
    }
  }, [selectedImage, shouldScroll]);
  
  const handleAddTextBox = (textBox: TextBox) => {
    setTextBoxes(prev => [...prev, textBox]);
  };

  const handleUpdateTextPosition = (id: string, x: number, y: number) => {
    setTextBoxes(prev =>
      prev.map((textBox) =>
        textBox.id === id ? { ...textBox, x, y } : textBox
      )
    );
  };

  const handleTextEdit = (id: string) => {
    const textBox = textBoxes.find(box => box.id === id);
    if (textBox) {
      setEditingText(textBox);
    }
  };

  const handleTextUpdate = (updatedText: TextBox) => {
    setTextBoxes(prev =>
      prev.map((textBox) =>
        textBox.id === updatedText.id ? updatedText : textBox
      )
    );
    setEditingText(null);
  };

  const handleTextDelete = (id: string) => {
    setTextBoxes(prev => prev.filter(textBox => textBox.id !== id));
    setEditingText(null);
  };

  const handleSelectTemplate = (template: Template) => {
    setSelectedImage(template.thumbnail);
    setShouldScroll(true);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-gray-800">Create Your Perfect Meme</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from hundreds of templates or upload your own image to create a unique and engaging meme.
          </p>
        </div>

        {/* Create Custom Meme Button */}
        <div className="flex justify-center">
          <Link
            href="/custommeme"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-blue-600 bg-white border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition duration-300 ease-in-out shadow-sm hover:shadow-md"
          >
            Create Your Custom Meme
          </Link>
        </div>

        {/* Editor Section */}
        {selectedImage && (
          <div id="canvas-preview" className="space-y-8 bg-white rounded-lg shadow-sm p-6">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Canvas Preview</h2>
              <CanvasPreview
                imageUrl={selectedImage}
                textBoxes={textBoxes}
                onUpdateTextPosition={handleUpdateTextPosition}
                onTextEdit={handleTextEdit}
                onTextDelete={handleTextDelete}
              />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Text</h2>
              <TextEditor
                onAddText={handleAddTextBox}
                editingText={editingText}
                onUpdateText={handleTextUpdate}
                onDeleteText={handleTextDelete}
              />
            </section>
          </div>
        )}

        {/* Templates Section */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Popular Templates <span className="text-sm text-gray-600">(Click to Choose a Template)</span>
          </h2>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="search"
              placeholder="Search Templates"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          <TemplateSelector onSelectTemplate={handleSelectTemplate} />
        </section>
      </div>
    </main>
  );
}