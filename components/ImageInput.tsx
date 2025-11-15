
import React, { useState, useRef, ChangeEvent } from 'react';
import { IconComponents } from './IconComponents';

interface ImageInputProps {
  onSearch: (imageData: { base64: string; mimeType: string; url: string }) => void;
  disabled: boolean;
}

type InputMode = 'file' | 'url';

const fileToDataUri = (file: File): Promise<{ base64: string; mimeType: string; url: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        const url = event.target.result;
        const base64 = url.split(',')[1];
        resolve({ base64, mimeType: file.type, url });
      } else {
        reject(new Error('Failed to read file.'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const ImageInput: React.FC<ImageInputProps> = ({ onSearch, disabled }) => {
  const [inputMode, setInputMode] = useState<InputMode>('file');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setError(null);
      try {
        const imageData = await fileToDataUri(file);
        onSearch(imageData);
      } catch (err) {
        setError('Could not process the selected file.');
      }
    }
  };

  const handleUrlSubmit = async () => {
    if (!imageUrl.trim()) {
      setError('Please enter a valid image URL.');
      return;
    }
    setError(null);
    try {
        // NOTE: This can fail due to CORS. This is a limitation of client-side fetching.
        // A server-side proxy would be needed for robust URL fetching.
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch image. Status: ${response.status}`);
        }
        const blob = await response.blob();
        const file = new File([blob], "image_from_url", { type: blob.type });
        const imageData = await fileToDataUri(file);
        onSearch(imageData);
    } catch (err) {
        setError('Could not fetch or process the image from the URL. Please check the URL and CORS policy.');
        console.error(err);
    }
  };
  
  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div className="flex justify-center border-b border-gray-200 mb-4">
        <button
          onClick={() => setInputMode('file')}
          className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
            inputMode === 'file' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <IconComponents.Upload className="w-5 h-5 inline-block mr-2" />
          Upload File
        </button>
        <button
          onClick={() => setInputMode('url')}
          className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
            inputMode === 'url' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <IconComponents.Link className="w-5 h-5 inline-block mr-2" />
          Image URL
        </button>
      </div>

      {inputMode === 'file' && (
        <div className="flex flex-col items-center">
            <button
                onClick={triggerFileSelect}
                disabled={disabled}
                className="w-full flex items-center justify-center bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:bg-indigo-300"
            >
                <IconComponents.Search className="w-5 h-5 mr-2" />
                Select Image and Search
            </button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                disabled={disabled}
            />
        </div>
      )}

      {inputMode === 'url' && (
        <div className="flex flex-col items-center">
          <div className="flex w-full">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              disabled={disabled}
              className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-gray-100"
            />
            <button
              onClick={handleUrlSubmit}
              disabled={disabled}
              className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-r-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500 transition-all disabled:bg-indigo-300"
            >
              <IconComponents.Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
    </div>
  );
};
