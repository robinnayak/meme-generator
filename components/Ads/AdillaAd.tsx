'use client';

import Script from 'next/script';
import React from 'react';

interface AdillaAdProps {
    style?: React.CSSProperties;
}

interface AdillaComponentProps {
    type?: 'Banner';
    className?: string;
}

export const AdillaBannerAd: React.FC<AdillaAdProps> = ({ style }) => {
    return (
        <div className="flex justify-center w-full">
            <Script
                async
                src="https://js.wpadmngr.com/static/adManager.js"
                data-admpid="278307"
                strategy="afterInteractive"
            />
            <div data-banner-id="1432610" style={
                {
                    width: '728px',
                    height: '90px',
                    ...style
                }
            }></div>
        </div>
    );
};

const AdillaAd: React.FC<AdillaComponentProps> = ({ type = 'Banner' }) => {
    switch (type) {
        case 'Banner':
            return <AdillaBannerAd />;
        default:
            return null;
    }
};

export default AdillaAd;


