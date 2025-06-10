import React from 'react';
import { theme } from '../theme';

interface ModuleCardProps {
    title: string;
    description: string;
    image: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, image }) => (
    <div className="flex flex-col gap-3 pb-3">
        <div
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
            style={{ backgroundImage: `url("${image}")` }}
        />
        <div>
            <p className={`text-${theme.colors.text.primary} text-base font-medium leading-normal`}>
                {title}
            </p>
            <p className={`text-[${theme.colors.text.secondary}] ${theme.typography.body.default}`}>
                {description}
            </p>
        </div>
    </div>
);

export default ModuleCard; 