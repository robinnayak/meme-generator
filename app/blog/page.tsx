'use client';

import { useState } from 'react';
import { BlogPost as BlogPostType } from '../blog/types/blog';
import BlogPost from '../components/BlogPost';
import AddBlogPost from '../components/AddBlogPost';

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPostType[]>([]);

    const handleAddPost = (newPost: BlogPostType) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Blog</h1>
            <AddBlogPost onAddPost={handleAddPost} />
            <div className="space-y-6">
                {posts.length === 0 ? (
                    <p className="text-gray-500 text-center">No posts yet. Be the first to add one!</p>
                ) : (
                    posts.map((post) => (
                        <BlogPost key={post.id} post={post} />
                    ))
                )}
            </div>
        </div>
    );
}