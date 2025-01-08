import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

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
                const response = await axios.get('https://api.imgflip.com/get_memes');
                if (response.data.success) {
                    const memeTemplates = response.data.data.memes.slice(0, 8).map((meme: any) => ({
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
    console.log("======================================")
    console.log("templates",templates);
    console.log("======================================")
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {templates.map((template) => (
                <div
                    key={template.id}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => onSelectTemplate(template)}
                >
                    <div className="relative aspect-square w-full h-[200px]">
                        <Image
                            src={template.thumbnail}
                            alt={template.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>
                    <p className="mt-2 text-sm text-center">{template.name}</p>
                </div>
            ))}
        </div>
    );
};

export default TemplateSelector;
