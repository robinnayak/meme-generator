import type { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';
import { StaticImageData } from 'next/image';
import { BASE_URL } from '@/components/services/baseurl';

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

// Sample blog posts data - In production, this would come from a CMS or API
export const blogPosts: BlogPosts = {
  'meme-creation-guide': {
    title: 'The Ultimate Guide to Creating Viral Memes',
    date: '2025-01-08',
    author: 'Robin Nayak',
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
    coverImage: '/assets/meme-guide-cover.jpg',
  },
  'meme-analysis': {
    title: 'Meme Analysis: What Makes a Meme Go Viral?',
    date: '2025-01-15',
    author: 'Robin Nayak',
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
    coverImage: '/assets/meme-guide-cover1.jpg',
  }
};

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts[params.slug];
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Meme Generator Blog`,
    description: post.content.substring(0, 155) + '...',
    alternates: {
      canonical: `${BASE_URL}/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 155) + '...',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: typeof post.coverImage === 'string' ? post.coverImage : post.coverImage.src,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content.substring(0, 155) + '...',
      images: [{
        url: typeof post.coverImage === 'string' ? post.coverImage : post.coverImage.src,
        width: 1200,
        height: 630,
        alt: post.title
      }],
    },
  };
}

export default function BlogPost({ params }: Props) {
  const post = blogPosts[params.slug];
  
  if (!post) {
    return <div>Post not found</div>;
  }

  // Create article structured data
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    image: {
      '@type': 'ImageObject',
      url: typeof post.coverImage === 'string' ? post.coverImage : post.coverImage.src,
      width: 1200,
      height: 630,
      alt: post.title
    },
    publisher: {
      '@type': 'Organization',
      name: 'Meme Generator',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/meme-logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${params.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
