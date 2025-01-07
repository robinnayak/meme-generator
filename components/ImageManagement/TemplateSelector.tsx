import React from 'react';
import Image from 'next/image';
import Meme from '../../public/assets/meme-background1.png';

type Template = {
    id: number;
    name: string;
    thumbnail: string;
};

interface TemplateSelectorProps {
    onSelectTemplate: (template: Template) => void;
}

const templates: Template[] = [
    { id: 1, name: 'Drake Meme', thumbnail: '/assets/meme-background.png' },
    { id: 2, name: 'Distracted Boyfriend', thumbnail: '/assets/meme-background1.png' },
    { id: 3, name: 'Change My Mind', thumbnail: '/assets/meme-background2.png' },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates.map((template) => (
                <div
                    key={template.id}
                    className="relative group cursor-pointer"
                    onClick={() => onSelectTemplate(template)}
                >
                    <Image
                        src={template.thumbnail}
                        alt={template.name}
                        width={200}
                        height={200}
                        className="w-full h-auto rounded-lg shadow hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold text-lg rounded-lg">
                        {template.name}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TemplateSelector;
