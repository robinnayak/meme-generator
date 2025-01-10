'use client';

import { useState } from 'react';
import { BlogPost } from '../blog/types/blog';

interface AddBlogPostProps {
    onAddPost: (post: BlogPost) => void;
}

export default function AddBlogPost({ onAddPost }: AddBlogPostProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newPost: BlogPost = {
            id: Date.now().toString(),
            title,
            content,
            author: 'Anonymous', // You can modify this to use actual user data
            date: new Date().toLocaleDateString(),
            imageUrl: imageUrl || undefined
        };
        onAddPost(newPost);
        setTitle('');
        setContent('');
        setImageUrl('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Add New Blog Post</h3>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Post Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <textarea
                    placeholder="Post Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border rounded h-32"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    type="url"
                    placeholder="Image URL (optional)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Post
            </button>
        </form>
    );
}