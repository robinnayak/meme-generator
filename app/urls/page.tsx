'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function URLManager() {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<string[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setUrls([...urls, url]);
    setUrl('');
    setError('');
  };

  const removeUrl = (indexToRemove: number) => {
    setUrls(urls.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">URL Manager</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col space-y-2">
          <label htmlFor="url" className="text-lg font-medium">
            Add New URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL here"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add URL
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Added URLs</h2>
        {urls.length === 0 ? (
          <p className="text-gray-500">No URLs added yet</p>
        ) : (
          <ul className="space-y-3">
            {urls.map((url, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline truncate flex-1 mr-4"
                >
                  {url}
                </a>
                <button
                  onClick={() => removeUrl(index)}
                  className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded-md"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
