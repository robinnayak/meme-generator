import type { Metadata } from 'next';
import Header from "@/components/global/Header";
import { DirectAd, NativeAd } from "@/components/Ads/AdBanner";
import { BASE_URL } from '@/components/services/baseurl';

export const metadata: Metadata = {
  title: 'FAQ - Meme Generator Nepal',
  description: 'Frequently asked questions about Meme Generator Nepal. Learn how to create, customize, and share Nepali memes using our free online meme generator.',
  openGraph: {
    title: 'FAQ - Meme Generator Nepal',
    description: 'Frequently asked questions about Meme Generator Nepal. Learn how to create, customize, and share Nepali memes using our free online meme generator.',
    url: `${BASE_URL}/faq`,
  },
};

export default function FAQ() {
  const faqs = [
    {
      question: "How do I create a meme?",
      answer: "Creating a meme is easy! Simply choose a template from our collection, add your text, customize the styling, and download your meme. You can also upload your own image to create a custom meme."
    },
    {
      question: "Can I use my own images?",
      answer: "Yes! You can upload your own images to create custom memes. Click the 'Upload' button to use your own image as a template."
    },
    {
      question: "Is it free to use?",
      answer: "Yes, our meme generator is completely free to use. You can create and download as many memes as you want without any cost."
    },
    {
      question: "What image formats are supported?",
      answer: "We support common image formats including JPG, PNG, and WEBP. Your downloaded memes will be in high-quality PNG format."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Header
        heading="Frequently Asked Questions"
        subheading="Find answers to common questions about our Meme Generator"
      />

      {/* Native ad after header */}
      <div className="my-8 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
        <NativeAd style={{ margin: '0 auto' }} />
      </div>

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <>
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>

            {/* Add direct link after every 2 FAQs */}
            {/* {(index + 1) % 2 === 0 && (
              <div className="text-center py-4">
                <NativeAd style={{
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
            )} */}
          </>
        ))}
      </div>

      {/* Native ad at bottom */}
      <div className="mt-12 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
        <DirectAd style={{ margin: '0 auto' }} />
      </div>
    </div>
  );
}