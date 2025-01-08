"use client";
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
    excerpt: 'Learn the art of meme creation with our comprehensive guide. From choosing templates to adding the perfect text, become a meme master!',
    author: 'Robin Nayak',
    coverImage: MemeGuideCover,
  },
  {
    slug: 'meme-analysis',
    title: 'Meme Analysis: What Makes a Meme Go Viral?',
    date: '2025-01-15',
    excerpt: 'Ever wondered what makes a meme go viral? Dive into our analysis of the most popular memes and discover the secrets to creating a viral sensation!',
    author: 'Robin Nayak',
    coverImage: MemeAnalysisCover,
  },
  // Add more blog posts here
];

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform duration-300 group-hover:shadow-md group-hover:-translate-y-1">
          <div className="relative h-48 w-full">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {' • '}
                <span>{post.author}</span>
              </p>
            </div>
            <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
            <div className="pt-4">
              <span className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                Read More
                <svg
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <Header heading="Blog" subheading="Latest insights and guides about meme creation" />
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;