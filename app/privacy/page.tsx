import type { Metadata } from 'next';
import Header from "@/components/global/Header";
import { DirectAd, NativeAd } from "@/components/Ads/AdBanner";
import { BASE_URL } from '@/components/services/baseurl';

export const metadata: Metadata = {
  title: 'Privacy Policy - Meme Generator Nepal',
  description: 'Privacy policy for Meme Generator Nepal. Learn how we protect your data while you create and share Nepali memes using our free online meme generator.',
  openGraph: {
    title: 'Privacy Policy - Meme Generator Nepal',
    description: 'Privacy policy for Meme Generator Nepal. Learn how we protect your data while you create and share Nepali memes using our free online meme generator.',
    url: `${BASE_URL}/privacy`,
  },
};

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Header
        heading="Privacy Policy"
        subheading="How we handle your data"
      />

      {/* Native ad after header */}
      <div className="my-8 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
        <NativeAd style={{ margin: '0 auto' }} />
      </div>

      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            When you use our Meme Generator, we collect minimal information necessary for the service to function properly.
            This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Images you upload for meme creation</li>
            <li>Basic usage analytics</li>
            <li>Technical information about your browser and device</li>
          </ul>
        </section>

        {/* Direct link after first section */}
        {/* <div className="my-8 text-center">
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
        </div> */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use the collected information to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Provide and improve our meme generation service</li>
            <li>Analyze and optimize website performance</li>
            <li>Protect against misuse or abuse</li>
          </ul>
        </section>

        {/* Native ad in middle */}
        {/* <div className="my-8 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
          <AdBanner type="native" style={{ margin: '0 auto' }} />
        </div> */}
        {/* Direct link before contact section */}
        <div className="my-8 text-center">
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

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-gray-600">
            We take appropriate measures to protect your information. Your uploaded images are temporarily stored and
            automatically deleted after processing. We do not share your personal information with third parties.
          </p>
        </section>



        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about our privacy policy, please contact us at privacy@memegenerator.com
          </p>
        </section>

        {/* Native ad at bottom */}
        {/* <div className="mt-12 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
          <AdBanner type="native" style={{ margin: '0 auto' }} />
        </div> */}
        <div className="my-8 text-center">

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

      </div>
    </div>
  );
}