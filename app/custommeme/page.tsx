"use client";
import { useState } from 'react';
import ImageUploader from '../../components/ImageManagement/ImageUploader';
import CanvasPreview from '../../components/CanvasControls/CanvasPreview';
import TextEditor from '../../components/TextManipulation/TextEditor';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/global/Header';

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
// Structured data component
const MemeGeneratorStructuredData = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Custom Meme Creator',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    features: [
      'Image upload capability',
      'Text customization',
      'Font size adjustment',
      'Color selection',
      'Bold and italic text options',
      'Drag and drop text positioning'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
const CustomMeme = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);
  const [editingText, setEditingText] = useState<TextBox | null>(null);

  const handleImageUpload = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

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

  return (
    <>
      <MemeGeneratorStructuredData />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              <span>Back to Templates</span>
            </Link>
          </div>
          <Header heading="Create Custom Meme" subheading="Customize Your Meme" />
          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Upload and Preview */}
            <div className="space-y-6">
              {!selectedImage ? (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Image</h2>
                  <ImageUploader onImageUpload={handleImageUpload} />
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Preview</h2>
                  <CanvasPreview
                    imageUrl={selectedImage}
                    textBoxes={textBoxes}
                    onUpdateTextPosition={handleUpdateTextPosition}
                    onTextEdit={handleTextEdit}
                    onTextDelete={handleTextDelete}
                  />
                </div>
              )}
            </div>

            {/* Right Column - Text Editor */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Text</h2>
              <TextEditor
                onAddText={handleAddTextBox}
                editingText={editingText}
                onUpdateText={handleTextUpdate}
                onDeleteText={handleTextDelete}
              />
              {textBoxes.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Tips:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Double-click text to edit</li>
                    <li>• Drag text to reposition</li>
                    <li>• Use controls above to style text</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CustomMeme;
