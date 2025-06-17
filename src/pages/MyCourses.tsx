import React from 'react';
import Button from '../components/Button';
import CourseProgressCard from '../components/CourseProgressCard';

const enrolledCourses = [
    {
        title: "Fundamentos de Python",
        description: "Aprende los conceptos básicos de programación en Python, incluyendo variables, bucles y funciones. ¡Perfecto para principiantes!",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF7vDyD8znUl9Iq4RLAraN5lc_48azqk-bHSGHq7nszaGSykckIaVlXyhUVLPnkRokvUDxIIvNgic8g2-OKK45f0vKzYennfsuePm0xMfEOloMGZ8SYf-rQ6dZxwQO8nvvQcvtCN8ytMjaJsq2xwIqbHWqiGlPPWnTIbSI_1sd8mvBHiOKRcntVETD2koZ91Z-1ywLU2ZFHpPPSS33x9URiBY5NapaLi-n2FFvNLdaZrfsqb7JU2Vxi6Q4BFOl8wBHfsFVD0_A7Zm5",
        progress: 45,
        nextLesson: "Funciones y Métodos"
    }
];

const MyCourses: React.FC = () => {
    return (
        <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                    <div className="flex min-w-72 flex-col gap-3">
                        <p className="text-white tracking-light text-[32px] font-bold leading-tight">
                            Mis Cursos
                        </p>
                        <p className="text-[#9caaba] text-sm font-normal leading-normal">
                            Sigue tu progreso y continúa aprendiendo donde lo dejaste.
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
                        <p className="text-white text-lg font-medium mb-2">Aún no estás inscrito en ningún curso</p>
                        <p className="text-[#9caaba] text-sm mb-4">Comienza tu viaje de aprendizaje inscribiéndote en un curso</p>
                        <Button
                            to="/courses"
                            variant="primary"
                        >
                            Explorar Cursos
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCourses; 