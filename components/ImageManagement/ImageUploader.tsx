"use client"
import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onImageUpload?: (file: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('File size exceeds 5MB');
          return;
        }
        if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
          alert('Invalid file format. Only PNG, JPG, and WEBP are allowed.');
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setUploadedImage(reader.result as string);
          if (onImageUpload) {
            onImageUpload(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    multiple: false,
  });

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the image here</p>
        ) : (
          <div>
            <p className="text-gray-600">Drag and drop an image here, or click to select</p>
            <p className="text-sm text-gray-500 mt-2">Supports PNG, JPG, JPEG, WEBP</p>
          </div>
        )}
      </div>
      {/* {uploadedImage && (
        <div className="w-full">
          <Image
            src={uploadedImage}
            alt="Uploaded"
            width={200}
            height={200}
            className="w-full h-auto rounded-lg shadow"
          />
        </div>
      )} */}
    </div>
  );
};

export default ImageUploader;