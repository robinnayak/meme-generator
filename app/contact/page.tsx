import type { Metadata } from 'next';
import Header from "@/components/global/Header";
import { NativeAd, DirectAd } from "@/components/Ads/AdBanner";
import { BASE_URL } from '@/components/services/baseurl';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us - Meme Generator',
  description: 'Get in touch with us about our Meme Generator tool.',
  openGraph: {
    title: 'Contact Us - Meme Generator',
    description: 'Get in touch with us about our Meme Generator tool.',
    url: `${BASE_URL}/contact`,
  },
};

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Header
        heading="Contact Us"
        subheading="Get in touch with our team"
      />

      {/* Native ad after header */}
      <div className="my-8 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
        <NativeAd style={{ margin: '0 auto' }} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions or feedback? We&apos;d love to hear from you. Fill out the form
            and we&apos;ll get back to you as soon as possible.
          </p>

          {/* Direct link in sidebar */}
          <div className="mb-6">
            <DirectAd style={{
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

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Other Ways to Connect</h3>
            <div className="space-y-4">
              <h3>Robin Nayak</h3>
              <p className="text-gray-600">
                <strong>Email:</strong> robinnayak86@gmail.com
              </p>
              <p className="text-gray-600">
                <strong>Whatsapp:</strong> +977 9815823670
              </p>
              <p className="text-gray-600">
                <strong className='text-gray-600 mr-2'>LinkedIn:</strong>
                <Link href="https://www.linkedin.com/in/robin-nayak-1093371b6/">
                  https://www.linkedin.com/in/robin-nayak-1093371b6/
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Native ad at bottom */}
      <div className="mt-12 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
        <NativeAd style={{ margin: '0 auto' }} />
      </div>
    </div>
  );
}