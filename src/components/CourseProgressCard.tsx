import React from 'react';
import Button from './Button';

interface CourseProgressCardProps {
    title: string;
    description: string;
    image: string;
    progress: number;
    nextLesson: string;
}

const CourseProgressCard: React.FC<CourseProgressCardProps> = ({
    title,
    description,
    image,
    progress,
    nextLesson
}) => {
    return (
        <div className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-xl bg-[#1b2127] p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-white text-base font-bold leading-tight">{title}</p>
                        <p className="text-[#9caaba] text-sm font-normal leading-normal">
                            {description}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[#9caaba] text-sm">Progreso</span>
                            <span className="text-white text-sm">{progress}%</span>
                        </div>
                        <div className="h-2 bg-[#283039] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#0b79ee] rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-[#9caaba] text-sm">Siguiente Lección</p>
                        <p className="text-white text-sm font-medium">{nextLesson}</p>
                    </div>
                    <Button size="sm" variant="primary">
                        Continuar Aprendiendo
                    </Button>
                </div>
                <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                    style={{ backgroundImage: `url("${image}")` }}
                />
            </div>
        </div>
    );
};

export default CourseProgressCard; 