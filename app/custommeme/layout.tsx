import type { Metadata } from 'next';
import { BASE_URL } from '@/components/services/baseurl';

export const metadata: Metadata = {
  title: 'Custom Meme Creator - Create Your Own Memes Online',
  description: 'Create custom memes with our easy-to-use meme generator. Upload your images, add text, customize fonts, and download your memes instantly.',
  alternates: {
    canonical: `${BASE_URL}/custommeme`,
  },
  openGraph: {
    type: 'website',
    siteName: 'Meme Generator',
    title: 'Custom Meme Creator - Design Your Perfect Meme',
    description: 'Upload images, add custom text, and create unique memes with our free online tool. Easy to use, instant downloads.',
    url: `${BASE_URL}/custommeme`,
    
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Meme Creator - Design Your Perfect Meme',
    description: 'Upload images, add custom text, and create unique memes with our free online tool.',
    
  }
};

export default function CustomMemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}