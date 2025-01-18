'use client';

import React from 'react';
import Script from 'next/script';

interface AdProps {
  style?: React.CSSProperties;
}

export const NativeAd: React.FC<AdProps> = ({ style }) => (
  <>
    <Script
      async
      data-cfasync="false"
      src="//pl25513408.profitablecpmrate.com/88f8872a9af2ec71bdde47dd011bb6c6/invoke.js"
      strategy="lazyOnload"
    />
    <div
      id="container-88f8872a9af2ec71bdde47dd011bb6c6"
      style={{ ...style }}
    />
  </>
);

export const SocialAd: React.FC<AdProps> = ({ style }) => (
  <>
    <Script
      src="//pl25513470.profitablecpmrate.com/a1/00/c6/a100c655a6b7938ff9c68207a995ac15.js"
      strategy="lazyOnload"
    />
    <div style={{ ...style, minHeight: '100px' }} />
  </>
);

export const BannerAd: React.FC<AdProps> = ({ style }) => (
  <>
    <Script id="banner-options" strategy="lazyOnload">
      {`
        window.atOptions = {
          'key': '81739498e28e1a2e5a1b093d92e6e980',
          'format': 'iframe',
          'height': 60,
          'width': 468,
          'params': {}
        };
      `}
    </Script>
    <Script
      src="//www.highperformanceformat.com/81739498e28e1a2e5a1b093d92e6e980/invoke.js"
      strategy="lazyOnload"
    />
    <div style={{ ...style, height: '60px', width: '468px', margin: '0 auto' }} />
  </>
);

export const DirectAd: React.FC<AdProps> = ({ style }) => (
  <div className="flex items-center justify-center mt-4" style={style}>
    <a
      href="https://www.profitablecpmrate.com/ewuse2cci?key=d7b0c37e8cea7a7c8a0f878e617d11ea"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
    >
      Meme Sponsered
    </a>
  </div>
);

export const handleAdRedirect = () => {
  const link = document.createElement('a');
  link.href = 'https://www.profitablecpmrate.com/ewuse2cci?key=d7b0c37e8cea7a7c8a0f878e617d11ea';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// For backward compatibility
const AdBanner: React.FC<{ type: 'native' | 'social' | 'direct' | 'banner'; style?: React.CSSProperties }> = ({ type, style }) => {
  switch (type) {
    case 'native':
      return <NativeAd style={style} />;
    case 'social':
      return <SocialAd style={style} />;
    case 'banner':
      return <BannerAd style={style} />;
    case 'direct':
      return <DirectAd style={style} />;
  }
};

export default AdBanner;
