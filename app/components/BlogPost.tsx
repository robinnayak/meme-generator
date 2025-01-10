'use client';

import Image from 'next/image';
import type { BlogPost } from '../blog/types/blog';

interface BlogPostProps {
    post: BlogPost;
}

export default function BlogPost({ post }: BlogPostProps) {
    return (
        <article className="bg-white rounded-lg shadow-md p-6 mb-6">
            {post.imageUrl && (
                <div className="relative w-full h-48 mb-4">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            )}
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <div className="text-gray-600 mb-2">
                <span>{post.author} • {post.date}</span>
            </div>
            <p className="text-gray-700">{post.content}</p>
        </article>
    );
}