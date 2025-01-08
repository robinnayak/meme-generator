import React from 'react';
import MemeGeneratorClient from '../components/MemeGenerator/MemeGeneratorClient';
import Header from '@/components/global/Header';
import AdBanner from '@/components/Ads/AdBanner';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <Header
          heading="Create Your Own Memes"
          subheading="Free Online Meme Generator"
        />

        {/* Native ad after header */}
        <div className="my-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <AdBanner type="social" style={{ margin: '0 auto' }} />
        </div>

        <MemeGeneratorClient />

        {/* Sponsored link before features */}
        <div className="text-center my-8">
          <AdBanner type="direct" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0',
            fontWeight: 500
          }} />
        </div>


        {/* Native ad at the bottom */}
        <div className="my-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <AdBanner type="native" style={{ margin: '0 auto' }} />
        </div>
      </div>
    </div>
  );
}
