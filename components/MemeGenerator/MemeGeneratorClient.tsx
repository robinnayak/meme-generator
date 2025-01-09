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

export default function MemeGeneratorClient() {
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

  const handleNavigation = (path: string) => {
    window.location.href = path;
};

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-gray-800 tracking-tight">Create Your Perfect Meme</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose from hundreds of templates or upload your own image to create a unique and engaging meme.
          </p>
        </div>

        {/* Create Custom Meme Button */}
        <div className="flex justify-center">
          <Link
            href="/custommeme"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={(e) => { e.preventDefault(); handleNavigation('/custommeme'); }}
          >
            Create Your Custom Meme
          </Link>
        </div>

        {/* Editor Section */}
        {selectedImage && (
          <div id="canvas-preview" className="space-y-8 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Canvas Preview</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <CanvasPreview
                  imageUrl={selectedImage}
                  textBoxes={textBoxes}
                  onUpdateTextPosition={handleUpdateTextPosition}
                  onTextEdit={handleTextEdit}
                  onTextDelete={handleTextDelete}
                />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Text</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <TextEditor
                  onAddText={handleAddTextBox}
                  editingText={editingText}
                  onUpdateText={handleTextUpdate}
                  onDeleteText={handleTextDelete}
                />
              </div>
            </section>
          </div>
        )}

        {/* Templates Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center justify-between">
            <span>Popular Templates</span>
            <span className="text-sm text-gray-500 font-normal">(Click to Choose a Template)</span>
          </h2>

          {/* Search Bar */}
          <div className="relative mb-8">
            <input
              type="search"
              placeholder="Search Templates"
              className="w-full px-6 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm hover:shadow-md"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
            />
          </div>

          <TemplateSelector onSelectTemplate={handleSelectTemplate} />
        </section>
      </div>
    </main>
  );
}