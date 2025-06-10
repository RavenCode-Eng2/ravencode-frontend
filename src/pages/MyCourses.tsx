import React from 'react';

const enrolledCourses = [
    {
        title: "Python Fundamentals",
        description: "Learn the basics of Python programming, including variables, loops, and functions. Perfect for beginners!",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF7vDyD8znUl9Iq4RLAraN5lc_48azqk-bHSGHq7nszaGSykckIaVlXyhUVLPnkRokvUDxIIvNgic8g2-OKK45f0vKzYennfsuePm0xMfEOloMGZ8SYf-rQ6dZxwQO8nvvQcvtCN8ytMjaJsq2xwIqbHWqiGlPPWnTIbSI_1sd8mvBHiOKRcntVETD2koZ91Z-1ywLU2ZFHpPPSS33x9URiBY5NapaLi-n2FFvNLdaZrfsqb7JU2Vxi6Q4BFOl8wBHfsFVD0_A7Zm5",
        progress: 45,
        nextLesson: "Functions and Methods"
    }
];

const CourseProgressCard: React.FC<{
    title: string;
    description: string;
    image: string;
    progress: number;
    nextLesson: string;
}> = ({ title, description, image, progress, nextLesson }) => {
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
                            <span className="text-[#9caaba] text-sm">Progress</span>
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
                        <p className="text-[#9caaba] text-sm">Next Lesson</p>
                        <p className="text-white text-sm font-medium">{nextLesson}</p>
                    </div>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#0b79ee] text-white text-sm font-medium leading-normal w-fit hover:bg-[#096ed8] transition-colors">
                        <span className="truncate">Continue Learning</span>
                    </button>
                </div>
                <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                    style={{ backgroundImage: `url("${image}")` }}
                />
            </div>
        </div>
    );
};

const MyCourses: React.FC = () => {
    return (
        <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                    <div className="flex min-w-72 flex-col gap-3">
                        <p className="text-white tracking-light text-[32px] font-bold leading-tight">
                            My Courses
                        </p>
                        <p className="text-[#9caaba] text-sm font-normal leading-normal">
                            Track your progress and continue learning where you left off.
                        </p>
                    </div>
                </div>
                {enrolledCourses.length > 0 ? (
                    enrolledCourses.map((course, index) => (
                        <CourseProgressCard
                            key={index}
                            {...course}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                        <p className="text-white text-lg font-medium mb-2">No courses enrolled yet</p>
                        <p className="text-[#9caaba] text-sm mb-4">Start your learning journey by enrolling in a course</p>
                        <button
                            onClick={() => window.location.href = '/courses'}
                            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#0b79ee] text-white text-sm font-medium leading-normal hover:bg-[#096ed8] transition-colors"
                        >
                            Browse Courses
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCourses; 