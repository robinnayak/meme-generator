"use client";
import { useState } from 'react';
import TemplateSelector from '../components/ImageManagement/TemplateSelector';
import ImageUploader from '../components/ImageManagement/ImageUploader';
import CanvasPreview from '../components/CanvasControls/CanvasPreview';
import TextEditor from '../components/TextManipulation/TextEditor';

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

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [undoStack, setUndoStack] = useState<TextBox[][]>([]);
  const [redoStack, setRedoStack] = useState<TextBox[][]>([]);
  const [editingText, setEditingText] = useState<TextBox | null>(null);

  
  const handleAddTextBox = (textBox: TextBox) => {

    setUndoStack(prev => [...prev, textBoxes]);
    setRedoStack([]);  // Clear redo stack on new action
    setTextBoxes(prev => [...prev, textBox]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    
    const newUndoStack = [...undoStack];
    const previousState = newUndoStack.pop();
    
    setUndoStack(newUndoStack);
    setRedoStack(prev => [...prev, textBoxes]);
    setTextBoxes(previousState || []);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    
    const newRedoStack = [...redoStack];
    const nextState = newRedoStack.pop();
    
    setRedoStack(newRedoStack);
    setUndoStack(prev => [...prev, textBoxes]);
    setTextBoxes(nextState || []);
  };

  const handleUpdateTextPosition = (id: string, x: number, y: number) => {
    setUndoStack(prev => [...prev, textBoxes]);
    setRedoStack([]);  // Clear redo stack on new action
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
    setUndoStack(prev => [...prev, textBoxes]);
    setRedoStack([]);
    setTextBoxes(prev =>
      prev.map((textBox) =>
        textBox.id === updatedText.id ? updatedText : textBox
      )
    );
    setEditingText(null);
  };

  const handleTextDelete = (id: string) => {
    setUndoStack(prev => [...prev, textBoxes]);
    setRedoStack([]);
    setTextBoxes(prev => prev.filter(textBox => textBox.id !== id));
    setEditingText(null); // Clear editing state after deletion
  };

  const handleSelectTemplate = (template: Template) => {
    setSelectedImage(template.thumbnail);
  };

  const handleImageUpload = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <main className="p-4 space-y-10">
      <h1 className="text-2xl font-bold text-center">Meme Generator</h1>
      <section>
        <h2 className="text-xl font-semibold mb-4">Select a Meme Template</h2>
        <TemplateSelector onSelectTemplate={handleSelectTemplate} />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Upload Your Own Image</h2>
        <ImageUploader onImageUpload={handleImageUpload} />
      </section>
      {selectedImage && (
        <>
          <section>
            <h2 className="text-xl font-semibold mb-4">Canvas Preview</h2>
            <CanvasPreview
              imageUrl={selectedImage}
              textBoxes={textBoxes}
              onUpdateTextPosition={handleUpdateTextPosition}
              onTextEdit={handleTextEdit}
              onTextDelete={handleTextDelete}
            />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Add Text</h2>
            <TextEditor 
              onAddText={handleAddTextBox} 
              editingText={editingText}
              onUpdateText={handleTextUpdate}
              onDeleteText={handleTextDelete}
            />
          </section>
        </>
      )}
    </main>
  );
};

export default Home;
