'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/global/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { StaticImageData } from 'next/image';

interface BlogPost {
  title: string;
  date: string;
  content: string;
  author: string;
  coverImage: string | StaticImageData;
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Header */}
        <Header 
          heading={post.title} 
          subheading={`By ${post.author} • ${new Date(post.date).toLocaleDateString()}`} 
        />

        {/* Cover Image */}
        <div className="relative h-[400px] w-full mt-8 rounded-xl overflow-hidden shadow-sm">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <article className="mt-12 bg-white rounded-xl shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium gap-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
