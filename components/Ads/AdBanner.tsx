'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  type: 'banner' | 'native' | 'social' | 'direct';
  style?: React.CSSProperties;
}

const AD_CONFIGS = {
  banner: {
    key: '81739498e28e1a2e5a1b093d92e6e980',
    scriptUrl: '//www.highperformanceformat.com/81739498e28e1a2e5a1b093d92e6e980/invoke.js'
  },
  native: {
    key: '88f8872a9af2ec71bdde47dd011bb6c6',
    scriptUrl: '//pl25513408.profitablecpmrate.com/88f8872a9af2ec71bdde47dd011bb6c6/invoke.js',
    containerId: 'container-88f8872a9af2ec71bdde47dd011bb6c6'
  },
  social: {
    scriptUrl: '//pl25513470.profitablecpmrate.com/a1/00/c6/a100c655a6b7938ff9c68207a995ac15.js'
  },
  direct: {
    url: 'https://www.profitablecpmrate.com/ewuse2cci?key=d7b0c37e8cea7a7c8a0f878e617d11ea'
  }
};

const AdBanner = ({ type, style }: AdBannerProps) => {
  useEffect(() => {
    if (type === 'banner') {
      (window as any).atOptions = {
        'key': AD_CONFIGS.banner.key,
        'format': 'iframe',
        'height': 60,
        'width': 468,
        'params': {}
      };
      const script = document.createElement('script');
      script.src = AD_CONFIGS.banner.scriptUrl;
      script.async = true;
      document.body.appendChild(script);
    } 
    else if (type === 'native') {
      const script = document.createElement('script');
      script.src = AD_CONFIGS.native.scriptUrl;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      document.body.appendChild(script);
    }
    else if (type === 'social') {
      const script = document.createElement('script');
      script.src = AD_CONFIGS.social.scriptUrl;
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }
    else if (type === 'direct') {
      // Direct link doesn't need script injection
      // It will be handled in the render method
    }

    return () => {
      const scripts = document.getElementsByTagName('script');
      for (let script of scripts) {
        if (script.src.includes('profitablecpmrate.com') || 
            script.src.includes('highperformanceformat.com')) {
          script.remove();
        }
      }
    };
  }, [type]);

  // Render methods for different ad types
  const renderBanner = () => (
    <div 
      className="ad-container flex justify-center items-center my-4 bg-gray-50 rounded-lg p-2" 
      style={{ 
        minHeight: '60px',
        minWidth: '468px',
        ...style 
      }}
    />
  );

  const renderNative = () => (
    <div 
      className="ad-container my-4"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2rem auto',
        ...style
      }}
    >
      <div id={AD_CONFIGS.native.containerId}></div>
    </div>
  );

  const renderSocial = () => (
    <div 
      className="ad-container fixed bottom-0 left-0 right-0 z-50"
      style={{
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        ...style
      }}
    />
  );

  const renderDirect = () => (
    <a 
      href={AD_CONFIGS.direct.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline"
      style={style}
    >
      Sponsored Link
    </a>
  );

  // Return the appropriate ad component based on type
  switch (type) {
    case 'banner':
      return renderBanner();
    case 'native':
      return renderNative();
    case 'social':
      return renderSocial();
    case 'direct':
      return renderDirect();
    default:
      return null;
  }
};

export default AdBanner;
