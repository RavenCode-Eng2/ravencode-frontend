import React from 'react';
import Button from './Button';
import { theme } from '../theme';

interface ProgressCardProps {
    title: string;
    description: string;
    image: string;
    buttonText: string;
    onButtonClick?: () => void;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
    title,
    description,
    image,
    buttonText,
    onButtonClick
}) => {
    return (
        <div className="bg-[#31425c] rounded-xl shadow-lg border border-[#223449] p-6 flex items-center gap-8">
            <div className="flex flex-col justify-center flex-1 min-w-0">
                <p className="text-white text-xl font-bold mb-1 truncate">{title}</p>
                <p className="text-[#b8c7e0] text-base mb-4 truncate">{description}</p>
                <Button
                    onClick={onButtonClick}
                    variant="primary"
                    size="md"
                    className="w-fit mt-2"
                >
                    {buttonText}
                </Button>
            </div>
            <div
                className="aspect-video w-56 min-w-[180px] rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url('${image}')` }}
            />
        </div>
    );
};

export default ProgressCard; 