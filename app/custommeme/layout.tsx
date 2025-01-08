import type { Metadata } from 'next';
import { BASE_URL } from '@/components/services/baseurl';

export const metadata: Metadata = {
  title: 'Custom Meme Creator - Create Your Own Memes Online',
  description: 'Create custom memes with our easy-to-use meme generator. Upload your images, add text, customize fonts, and download your memes instantly. Free online meme maker tool.',
  alternates: {
    canonical: `${BASE_URL}/custommeme`,
  },
  openGraph: {
    title: 'Custom Meme Creator - Make Your Own Memes',
    description: 'Create and customize memes with our free online meme generator. Add text, adjust fonts, and download instantly.',
    url: `${BASE_URL}/custommeme`,
    images: [
      {
        url: '/custommeme-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Custom Meme Creator Tool',
      }
    ],
  },
};

export default function CustomMemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}