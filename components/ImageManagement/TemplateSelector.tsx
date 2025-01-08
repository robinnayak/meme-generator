import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import AdBanner from '../Ads/AdBanner';

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
        return <div className="flex justify-center items-center p-4">Loading meme templates...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Choose a Template</h2>
            
            {/* Native ad at the top */}
            <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <AdBanner type="native" style={{ margin: '0 auto' }} />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {templates.map((template, index) => (
                    <React.Fragment key={template.id}>
                        <div
                            className="cursor-pointer hover:opacity-80 transition-opacity bg-white rounded-lg p-3 shadow-sm hover:shadow-md"
                            onClick={() => onSelectTemplate(template)}
                        >
                            <div className="relative aspect-square w-full h-[200px]">
                                <Image
                                    src={template.thumbnail}
                                    alt={template.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-contain rounded-lg"
                                />
                            </div>
                            <p className="mt-2 text-sm text-center font-medium">{template.name}</p>
                        </div>
                        
                        {/* Add sponsored link after every 4th template */}
                        {(index + 1) % 4 === 0 && (
                            <div className="col-span-full py-4 text-center">
                                <AdBanner type="direct" style={{ 
                                    display: 'inline-block',
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#f8fafc',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #e2e8f0'
                                }} />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            
            {/* Native ad at the bottom */}
            <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <AdBanner type="native" style={{ margin: '0 auto' }} />
            </div>
        </div>
    );
};

export default TemplateSelector;
