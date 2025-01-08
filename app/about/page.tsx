import type { Metadata } from 'next';
import Header from "@/components/global/Header";
import { BASE_URL } from '@/components/services/baseurl';
import AdBanner from '@/components/Ads/AdBanner';

export const metadata: Metadata = {
  title: 'About Our Meme Generator - Free Online Meme Creation Tool',
  description: 'Learn about our powerful and intuitive meme generator. Create, customize, and share memes with our easy-to-use platform. Features include text customization, real-time preview, and instant downloads.',
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: 'About Our Meme Generator - Free Online Meme Creation Tool',
    description: 'Learn about our powerful and intuitive meme generator. Create and share memes easily.',
    url: `${BASE_URL}/about`,

  },
};

// Add structured data for better search results
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Our Meme Generator',
  description: 'Learn about our powerful and intuitive meme generator platform.',
  mainEntity: {
    '@type': 'WebApplication',
    name: 'Meme Generator by Robin Nayak',
    applicationCategory: 'Multimedia',
    features: [
      'Easy-to-use text editor',
      'Real-time canvas preview',
      'Multiple text boxes',
      'Font customization',
      'Instant downloads'
    ],
    author: {
      '@type': 'Person',
      name: 'Robin Nayak'
    }
  }
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header
        heading="About Our Meme Generator"
        subheading="Learn More About Our Meme Generator"
      />

      {/* Native ad after header */}
      <div className="my-8 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
        <AdBanner type="native" style={{ margin: '2rem auto' }} />
      </div>

      <div className="prose max-w-none">
        <p className="text-lg mb-4">
          Welcome to our Meme Generator &mdash; a powerful and intuitive tool designed to bring your creative ideas to life! Our platform allows you to easily create, customize, and share memes that stand out from the crowd.
        </p>

        {/* Direct link in content */}
        <div className="my-6 text-center">
          <AdBanner type="direct" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0',
            fontWeight: 500,
            transition: 'all 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }} />
        </div>

        <h2 className="text-2xl font-semibold mt-6 mb-4">What Makes Us Special</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Easy-to-use text editor for adding and customizing text</li>
          <li>Real-time canvas preview of your meme</li>
          <li>Multiple text boxes with customizable positions</li>
          <li>Font customization options</li>
          <li>Download your created memes instantly</li>
        </ul>

        {/* Native ad in middle of content */}
        <div className="my-8 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
          <AdBanner type="social" style={{ margin: '0 auto' }} />
        </div>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Mission</h2>
        <p className="text-lg mb-4">
          Our mission is to provide a seamless and enjoyable meme creation experience for everyone, whether you&apos;re a meme enthusiast or creating your very first meme. We believe in making creativity accessible and fun!
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Get Started</h2>
        <p className="text-lg">
          Ready to create your own memes? Head over to our home page and start creating! If you need any help, check out our FAQ section for detailed guides and tips.
        </p>

        {/* Direct link at bottom */}
        <div className="mt-8 mb-4 text-center">
          <AdBanner type="direct" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0',
            fontWeight: 500,
            transition: 'all 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }} />
        </div>
      </div>
    </div>
  );
}