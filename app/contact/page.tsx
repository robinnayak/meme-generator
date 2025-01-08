import type { Metadata } from 'next';
import Header from '@/components/global/Header';
import { BASE_URL } from '@/components/services/baseurl';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Meme Generator Team',
  description: 'Contact Robin Nayak and the Meme Generator team. Get support, share feedback, or collaborate with us. We&apos;re here to help you create the perfect memes.',
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Meme Generator Team',
    description: 'Get in touch with the Meme Generator team. We&apos;re here to help!',
    url: `${BASE_URL}/contact`,
    images: [
      {
        url: '/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Meme Generator Team',
      }
    ],
  },
};

// Add structured data for better search results
const contactStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Meme Generator Team',
  description: 'Contact page for the Meme Generator application',
  mainEntity: {
    '@type': 'Person',
    name: 'Robin Nayak',
    email: 'robinnayak86@gmail.com',
    sameAs: [
      'https://github.com/robinnayak',
      'https://linkedin.com/in/robinnayak',
      'https://twitter.com/robinnayak'
    ]
  }
};

export default function Contact() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Header heading="Contact Us" subheading="Get in Touch with Our Team" />
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-6 underline">Robin Nayak</h2>
            <p className="text-gray-700 mb-6">
              Meet Robin Nayak, a developer with a knack for turning data into laughs.
              With a creative twist, he&apos;s crafted a meme generator that brings humor to life,
              proving that coding and fun go hand in hand!
            </p>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600">📧</span>
              <a 
                href="mailto:robinnayak86@gmail.com" 
                className="text-blue-600 hover:underline"
                rel="noopener noreferrer"
              >
                robinnayak86@gmail.com
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600">🌐</span>
              <a
                href="https://github.com/robinnayak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600">💼</span>
              <a
                href="https://linkedin.com/in/robinnayak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}