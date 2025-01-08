"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import Header from '@/components/global/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import MemeGuideCover from '@/public/assets/meme-guide-cover.jpg';
import MemeAnalysisCover from '@/public/assets/meme-guide-cover1.jpg';
// This would typically come from your CMS or API
interface BlogPost {
  title: string;
  date: string;
  content: string;
  author: string;
  coverImage: string | StaticImageData;
}

interface BlogPosts {
  [key: string]: BlogPost;
}

const blogPosts: BlogPosts = {
  'meme-creation-guide': {
    title: 'The Ultimate Guide to Creating Viral Memes',
    date: '2025-01-08',
    content: `
      # The Ultimate Guide to Creating Viral Memes

      Creating memes that resonate with your audience and have the potential to go viral isn't just about slapping text on an image. It's an art form that requires creativity, timing, and understanding of internet culture. In this guide, we'll walk you through the process of creating memes that people will love to share.

      ## Understanding Meme Culture

      Before diving into creation, it's important to understand what makes a meme successful:

      - **Relatability**: The best memes connect with shared experiences
      - **Timing**: Trending topics make your memes more relevant
      - **Simplicity**: Keep your message clear and concise
      - **Humor**: A clever twist or unexpected punchline works best

      [... rest of the content ...]
    `,
    author: 'Robin Nayak',
    coverImage: MemeGuideCover,
  },
  'meme-analysis': {
    title: 'Meme Analysis: What Makes a Meme Go Viral?',
    date: '2025-01-15',
    content: `
      # Meme Analysis: What Makes a Meme Go Viral?

      Ever wondered what makes a meme go viral? In this deep dive, we'll explore the key elements that contribute to a meme's success and how you can apply these principles to your own meme creation.

      ## The Anatomy of a Viral Meme

      - **Cultural Context**: Understanding current trends and references
      - **Perfect Timing**: Posting at the right moment
      - **Universal Appeal**: Creating content that resonates widely
      - **Shareability**: Making it easy and compelling to share

      ## Key Success Factors

      1. **Emotional Response**: The best memes evoke strong emotions
      2. **Simplicity**: Clear message that can be understood quickly
      3. **Adaptability**: Templates that can be used in multiple contexts
      4. **Authenticity**: Genuine humor that doesn't feel forced

      Remember, viral success often comes when you least expect it. Focus on creating quality content that resonates with your audience rather than chasing virality.
    `,
    author: 'Robin Nayak',
    coverImage: MemeAnalysisCover,
  }
};

const BlogPost = () => {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        <Header heading={post.title} subheading={`By ${post.author} • ${new Date(post.date).toLocaleDateString()}`} />

        {/* Cover Image */}
        <div className="relative h-[400px] w-full mt-8 rounded-xl overflow-hidden shadow-sm">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
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
};

export default BlogPost;
