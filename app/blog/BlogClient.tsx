'use client';

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import Header from '@/components/global/Header';
import { motion } from 'framer-motion';
import MemeGuideCover from '@/public/assets/meme-guide-cover.jpg';
import MemeAnalysisCover from '@/public/assets/meme-guide-cover1.jpg';

// Blog post type definition
type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  coverImage: string | StaticImageData;
};

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    slug: 'meme-creation-guide',
    title: 'The Ultimate Guide to Creating Viral Memes',
    date: '2025-01-08',
    excerpt: 'Learn the essential techniques and best practices for creating memes that resonate with your audience and have the potential to go viral.',
    author: 'Robin Nayak',
    coverImage: MemeGuideCover,
  },
  {
    slug: 'meme-trends-2025',
    title: 'Top Meme Trends to Watch in 2025',
    date: '2025-01-08',
    excerpt: 'Stay ahead of the curve with our comprehensive analysis of emerging meme trends and predictions for the upcoming year.',
    author: 'Robin Nayak',
    coverImage: MemeAnalysisCover,
  },
];

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-600">
            {post.excerpt}
          </p>
          <div className="mt-4">
            <span className="text-blue-600 hover:text-blue-700 font-medium">
              Read more →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function BlogClient() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <Header
          heading="Meme Generator Blog"
          subheading="Tips, Guides, and Insights into Meme Creation"
        />
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
