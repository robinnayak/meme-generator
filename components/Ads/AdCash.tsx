'use client';

import Script from 'next/script';
import React, { useEffect, useState } from 'react';

interface AdCashProps {
    style?: React.CSSProperties;
    zoneId: string;
}

interface AdCashComponentProps {
    type: 'Banner' | 'Native';
    className?: string;
    zoneId: string;
}

declare global {
    interface Window {
        aclib: {
            runBanner: (config: { zoneId: string }) => void;
            runNative: (config: { zoneId: string }) => void;
        };
    }
}

const AdContainer: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex justify-center w-full">
            <div style={style}>
                {children}
            </div>
        </div>
    );
};

export const AdCashBannerAd: React.FC<AdCashProps> = ({ style, zoneId }) => {
    return (
        <AdContainer style={{ width: '300px', height: '250px', ...style }}>
            <Script
                src="https://aclib.net/libs/aclib.js"
                strategy="lazyOnload"
                onLoad={() => {
                    if (typeof window !== 'undefined' && window.aclib) {
                        window.aclib.runBanner({
                            zoneId,
                        });
                    }
                }}
            />
            {/* AdCash banner will be inserted here */}
        </AdContainer>
    );
};

export const AdCashNativeAd: React.FC<AdCashProps> = ({ style, zoneId }) => {
    return (
        <AdContainer style={style}>
            <Script
                src="https://aclib.net/libs/aclib.js"
                strategy="lazyOnload"
                onLoad={() => {
                    if (typeof window !== 'undefined' && window.aclib) {
                        window.aclib.runNative({
                            zoneId,
                        });
                    }
                }}
            />
            {/* AdCash native ad will be inserted here */}
        </AdContainer>
    );
};

const AdCashAd: React.FC<AdCashComponentProps> = ({ type, zoneId, className }) => {
    return (
        <div className={className}>
            {type === 'Banner' && <AdCashBannerAd zoneId={zoneId} />}
            {type === 'Native' && <AdCashNativeAd zoneId={zoneId} />}
        </div>
    );
};

export default AdCashAd;