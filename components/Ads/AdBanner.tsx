'use client';

import React, { useEffect, useCallback } from 'react';

interface AdBannerProps {
  type: 'native' | 'social' | 'direct';
  style?: React.CSSProperties;
}

interface ScriptAttributes {
  type?: string;
  src?: string;
  async?: boolean;
  'data-cfasync'?: string;
  'data-adel'?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ type, style }) => {
  const injectScript = useCallback((attributes: ScriptAttributes) => {
    const script = document.createElement('script');
    Object.entries(attributes).forEach(([key, value]) => {
      if (value !== undefined) {
        script.setAttribute(key, value.toString());
      }
    });
    document.head.appendChild(script);
  }, []);

  const loadNativeAd = useCallback(() => {
    const scriptAttributes: ScriptAttributes = {
      type: 'text/javascript',
      src: '//pl21736204.toprevenuegate.com/68/35/5e/68355e5cdd69b94ba4e2265bf8de3075.js',
      async: true,
      'data-cfasync': 'false',
    };
    injectScript(scriptAttributes);
  }, [injectScript]);

  const loadSocialAd = useCallback(() => {
    const scriptAttributes: ScriptAttributes = {
      type: 'text/javascript',
      src: '//pl21736204.toprevenuegate.com/d6/c9/54/d6c954adb312b4b0298f52d82deb0ad6.js',
      async: true,
      'data-cfasync': 'false',
    };
    injectScript(scriptAttributes);
  }, [injectScript]);

  const loadDirectAd = useCallback(() => {
    const scriptAttributes: ScriptAttributes = {
      type: 'text/javascript',
      src: '//pl21736204.toprevenuegate.com/31/8c/c9/318cc92f94b0557b3f725d33d0a6f0e6.js',
      async: true,
      'data-cfasync': 'false',
    };
    injectScript(scriptAttributes);
  }, [injectScript]);

  useEffect(() => {
    if (type === 'native') {
      loadNativeAd();
    } else if (type === 'social') {
      loadSocialAd();
    } else if (type === 'direct') {
      loadDirectAd();
    }

    return () => {
      const scripts = document.getElementsByTagName('script');
      for (const script of scripts) {
        if (script.src.includes('toprevenuegate.com')) {
          script.remove();
        }
      }
    };
  }, [type, loadNativeAd, loadSocialAd, loadDirectAd]);

  return (
    <div style={style}>
      {type === 'native' && <div id="container-68355e5cdd69b94ba4e2265bf8de3075"></div>}
      {type === 'social' && <div id="container-d6c954adb312b4b0298f52d82deb0ad6"></div>}
      {type === 'direct' && <div id="container-318cc92f94b0557b3f725d33d0a6f0e6"></div>}
    </div>
  );
};

export default AdBanner;
