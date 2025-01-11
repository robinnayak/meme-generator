import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { DirectAd, NativeAd } from '../Ads/AdBanner';
import AdCashAd from '../Ads/AdCash';

interface MemeApiResponse {
    id: string;
    name: string;
    url: string;
}

interface MemeApiData {
    memes: MemeApiResponse[];
}

type Template = {
    id: number;
    name: string;
    thumbnail: string;
};

interface TemplateSelectorProps {
    onSelectTemplate: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const response = await axios.get<{ success: boolean; data: MemeApiData }>('https://api.imgflip.com/get_memes');
                if (response.data.success) {
                    const memeTemplates = response.data.data.memes.map((meme) => ({
                        id: parseInt(meme.id),
                        name: meme.name,
                        thumbnail: meme.url
                    }));
                    setTemplates(memeTemplates);
                } else {
                    setError('Failed to fetch meme templates');
                }
            } catch (err) {
                setError('Error fetching meme templates');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMemes();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-pulse flex space-x-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                    <div className="space-y-4">
                        <div className="h-4 w-36 bg-gray-200 rounded"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 p-6 text-center bg-red-50 rounded-lg border border-red-100">
                <p className="font-medium">{error}</p>
                <p className="text-sm mt-2 text-red-400">Please try refreshing the page</p>
            </div>
        );
    }

    return (
        <div>
            {/* Native ad at the top */}
            <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <NativeAd style={{ margin: '0 auto' }} />
            </div>

            {/* For Banner Ads */}
            <div className="mb-1 p-4 border border-gray-200 rounded-lg bg-gray-50 ">
                <AdCashAd type="Autotag" zoneId="i4cxmynhg2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((template, index) => (
                    <React.Fragment key={template.id}>
                        <div
                            className="group cursor-pointer bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
                            onClick={() => onSelectTemplate(template)}
                        >
                            <div className="relative w-full overflow-hidden rounded-lg bg-gray-50 mb-4" style={{ paddingTop: '75%' }}>
                                <div className="absolute inset-0 p-2">
                                    <Image
                                        src={template.thumbnail}
                                        alt={template.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                                        priority={index < 6} // Prioritize loading first 6 images
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-base font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2 leading-snug">
                                    {template.name}
                                </p>
                            </div>
                        </div>

                        {/* Add sponsored link after every 6th template */}
                        {(index + 1) % 6 === 0 && (
                            <div className="col-span-full py-8">
                                {/* For Banner Ads */}
                                <AdCashAd type="Banner" zoneId="9343654" />
                                <DirectAd style={{
                                    display: 'block',
                                    margin: '0 auto',
                                    maxWidth: '728px',
                                    padding: '1.5rem',
                                    backgroundColor: '#f8fafc',
                                    borderRadius: '0.75rem',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                                    textAlign: 'center'
                                }} />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Native ad at the bottom */}
            {/* <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <SocialAd style={{ margin: '0 auto' }} />
            </div> */}
        </div>
    );
};

export default TemplateSelector;
