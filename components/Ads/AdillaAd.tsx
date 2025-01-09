'use client';

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
        <>
            <div data-banner-id="1432610"></div>
            <div className="flex justify-center w-full">
                <div
                    id="adilla-banner"
                    style={{
                        width: '728px',
                        height: '90px',
                        margin: '10px auto',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #e9ecef',
                        borderRadius: '4px',
                        ...style
                    }}
                />
            </div>
        </>
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


