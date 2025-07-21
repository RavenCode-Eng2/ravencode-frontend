import React, { useState, useEffect } from 'react';
import { theme } from '../theme';
import ProgressCard from '../components/ProgressCard';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { getResponsiveContainer } from '../utils/responsive';
import { learningService } from '../services/learningService';
import { Link } from 'react-router-dom';

// Interface for module progress
interface ModuleProgress {
    id: string;
    title: string;
    description: string;
    course: string;
    progress: number;
    image: string;
    nextLesson: string;
    route: string;
    isLocked: boolean;
    status: 'not_started' | 'in_progress' | 'completed';
    lastAccessed?: string;
}

// Interface for roadmaps
interface Roadmap {
    id: string;
    title: string;
    description: string;
    courses: string[];
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    image: string;
    route: string;
    progress: number;
    totalModules: number;
    completedModules: number;
}

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [modulesInProgress, setModulesInProgress] = useState<ModuleProgress[]>([]);
    const [lastAccessedModule, setLastAccessedModule] = useState<ModuleProgress | null>(null);
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchModuleProgress = async () => {
            if (!user?.correo_electronico) return;
            
            try {
                // Simulate fetching module progress from different courses
                // In a real app, this would fetch from an API
                const mockProgressData: ModuleProgress[] = [
                    {
                        id: 'module-1',
                        title: 'Introducción a Python',
                        description: 'Fundamentos básicos de programación y Python',
                        course: 'Fundamentos de Python',
                        progress: 75,
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOVzfcHHLV7oiV1KQ-STzk9FYASDTb3eK7aW-_AkRswxuXhf332V7N7QQHRjNBDl-Dxm0leYXl5qJdJnhtO9D7DsYs_Ko70q6APPUTpJ9qhzyszbrsVD412e56OqR-yfz47TaGss5zvfQ_XbGgvKE-mwGXPP8vAA_0vQC9_jz3-vc7t6O47qS_L7kYW6J4S-XMQ3bCQpGtOcsQPhLwc7VKWW40Jd-XId0LEjrBya9ARe0citIozELE0vhSf_zkliJNpEBaxFMaJBOj',
                        nextLesson: 'Lección 4: Variables y tipos de datos',
                        route: '/lesson4',
                        isLocked: false,
                        status: 'in_progress',
                        lastAccessed: '2024-01-15T10:30:00Z'
                    },
                    {
                        id: 'module-2',
                        title: 'Estructuras de Control',
                        description: 'Condicionales, bucles y control de flujo',
                        course: 'Fundamentos de Python',
                        progress: 40,
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoORGORDPY85BGx45rAsDWcEQESeqJbV65GaS0H7mpHcYOqI1Mkq8BtfRcYbiVwAuTIPWYCjZ0Cx_SQPXpehHMVzv-L7ooeK_owymSPKWSQ_NxNxbNS56oHLvCH4oUpCcsfg7Zseb4DYTFJoBEDoIC5sTU7zVfcgqqj0i3YAoMESVr45p0lMVdodkrEwEyJk_wE2il9FUMNJchpte32s9MugB7d3fbgwjdWwMOK3uqtJN9FfpKSUf0ZCqI4bRbSJk629lhVQi4i1Rw',
                        nextLesson: 'Lección 2: Bucles While',
                        route: '/lesson2-module2',
                        isLocked: false,
                        status: 'in_progress',
                        lastAccessed: '2024-01-14T14:20:00Z'
                    },
                    {
                        id: 'web-module-1',
                        title: 'HTML y CSS Básico',
                        description: 'Estructura y estilos de páginas web',
                        course: 'Desarrollo Web Básico',
                        progress: 25,
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoORGORDPY85BGx45rAsDWcEQESeqJbV65GaS0H7mpHcYOqI1Mkq8BtfRcYbiVwAuTIPWYCjZ0Cx_SQPXpehHMVzv-L7ooeK_owymSPKWSQ_NxNxbNS56oHLvCH4oUpCcsfg7Zseb4DYTFJoBEDoIC5sTU7zVfcgqqj0i3YAoMESVr45p0lMVdodkrEwEyJk_wE2il9FUMNJchpte32s9MugB7d3fbgwjdWwMOK3uqtJN9FfpKSUf0ZCqI4bRbSJk629lhVQi4i1Rw',
                        nextLesson: 'Lección 3: Selectores CSS',
                        route: '/web-lesson3',
                        isLocked: false,
                        status: 'in_progress',
                        lastAccessed: '2024-01-10T09:15:00Z'
                    }
                ];

                // Mock roadmaps data
                const mockRoadmapsData: Roadmap[] = [
                    {
                        id: 'fullstack-web',
                        title: 'Desarrollador Full Stack',
                        description: 'Conviértete en un desarrollador completo con HTML, CSS, JavaScript, React, Node.js y bases de datos',
                        courses: ['Fundamentos de HTML/CSS', 'JavaScript Esencial', 'React Avanzado', 'Node.js y Express', 'Bases de Datos'],
                        duration: '8-12 meses',
                        level: 'intermediate',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoORGORDPY85BGx45rAsDWcEQESeqJbV65GaS0H7mpHcYOqI1Mkq8BtfRcYbiVwAuTIPWYCjZ0Cx_SQPXpehHMVzv-L7ooeK_owymSPKWSQ_NxNxbNS56oHLvCH4oUpCcsfg7Zseb4DYTFJoBEDoIC5sTU7zVfcgqqj0i3YAoMESVr45p0lMVdodkrEwEyJk_wE2il9FUMNJchpte32s9MugB7d3fbgwjdWwMOK3uqtJN9FfpKSUf0ZCqI4bRbSJk629lhVQi4i1Rw',
                        route: '/roadmap/fullstack-web',
                        progress: 35,
                        totalModules: 20,
                        completedModules: 7
                    },
                    {
                        id: 'python-developer',
                        title: 'Desarrollador Python',
                        description: 'Domina Python desde lo básico hasta desarrollo web, análisis de datos y automatización',
                        courses: ['Fundamentos de Python', 'Python Avanzado', 'Django/Flask', 'Análisis de Datos', 'Automatización'],
                        duration: '6-9 meses',
                        level: 'beginner',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOVzfcHHLV7oiV1KQ-STzk9FYASDTb3eK7aW-_AkRswxuXhf332V7N7QQHRjNBDl-Dxm0leYXl5qJdJnhtO9D7DsYs_Ko70q6APPUTpJ9qhzyszbrsVD412e56OqR-yfz47TaGss5zvfQ_XbGgvKE-mwGXPP8vAA_0vQC9_jz3-vc7t6O47qS_L7kYW6J4S-XMQ3bCQpGtOcsQPhLwc7VKWW40Jd-XId0LEjrBya9ARe0citIozELE0vhSf_zkliJNpEBaxFMaJBOj',
                        route: '/roadmap/python-developer',
                        progress: 60,
                        totalModules: 15,
                        completedModules: 9
                    },
                    {
                        id: 'data-scientist',
                        title: 'Científico de Datos',
                        description: 'Aprende análisis de datos, machine learning y visualización con Python, R y herramientas modernas',
                        courses: ['Python para Datos', 'Estadística y Probabilidad', 'Machine Learning', 'Visualización de Datos', 'Deep Learning'],
                        duration: '10-15 meses',
                        level: 'advanced',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLV75dBR_JxoTZXyhIMoUClQ5UBJq4ZIdDAZ5Ara791_hyZGUcgPb5fdBoE7I_KH8kF8QzzOvAF3dLMkeS3CNXe3tNBZYkfoTVaKR3o2Rl5sLwgN6DqBo2RQuY7iNaQS1AxX12E_7BYYk4-3vVQCqheYo23kE1kHpX66iWNgLYqCvquutMGwsP3v7vTRDBxbo81AYoX4gb_5C2KIBRIJF4fEPqg7XmtfF74TOXjSCi4i4q5PWr0MlW9QXPUxl35I7lTntqtiuNfH56',
                        route: '/roadmap/data-scientist',
                        progress: 20,
                        totalModules: 25,
                        completedModules: 5
                    },
                    {
                        id: 'mobile-developer',
                        title: 'Desarrollador Mobile',
                        description: 'Crea aplicaciones móviles nativas e híbridas con React Native, Flutter y desarrollo nativo',
                        courses: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'App Store Deployment'],
                        duration: '7-10 meses',
                        level: 'intermediate',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkWTqKYzKLwFlJ-mbukpXvErArhDB7YdoEV40iugp6LBK0dnaUTTSl8pRr6zhmhpEiWjmrjylfbEGqr8pBm9DukkjWVFJZYKnuhSWtCBhAfWHxxLJBK051yWl4JTYxfHTj-j00rN50AtbS4b2-23cR91NgNRwVZ8Zp77d9s9vGt-4fgO8C-sgEjBP23kXIc2nLrlEPMIa4QHwmv6vkAmoEzfKO0NVzSf4ODFrCS3dkH9LUXsoslV2lswFw_ILMnm_frug7r0DlMU0d',
                        route: '/roadmap/mobile-developer',
                        progress: 15,
                        totalModules: 18,
                        completedModules: 3
                    }
                ];

                // In a real implementation, you might check grades:
                // const module1Grade = await learningService.getGrade(user.correo_electronico, 'Assessment1');
                // const module2Grade = await learningService.getGrade(user.correo_electronico, 'Assessment2');

                // Find the most recently accessed module
                const mostRecentModule = mockProgressData.reduce((latest, current) => {
                    if (!latest.lastAccessed || !current.lastAccessed) return latest;
                    return new Date(current.lastAccessed) > new Date(latest.lastAccessed) ? current : latest;
                });

                setModulesInProgress(mockProgressData);
                setLastAccessedModule(mostRecentModule);
                setRoadmaps(mockRoadmapsData);
            } catch (error) {
                console.error('Error fetching module progress:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchModuleProgress();
    }, [user]);

    return (
        <div className={`min-h-screen bg-[${theme.colors.background.main}]`}>
            <div className={`${getResponsiveContainer()}`}>
                <div className={`layout-content-container flex flex-col ${theme.spacing.container.max} flex-1 w-full`}>
                    <h2 className={`${theme.typography.heading.h1} text-${theme.colors.text.primary} text-left pb-3 pt-5 mb-8`}>
                        ¡Bienvenido de nuevo, {user?.nombre || 'Usuario'}!
                    </h2>

                    {/* Sección Continuar Tu Aventura */}
                    <div className="mb-12">
                        {lastAccessedModule ? (
                            <div className="bg-[#31425c] rounded-xl shadow-lg border border-[#223449] p-6 flex flex-col md:flex-row items-center gap-6">
                                <div className="flex flex-col justify-center flex-1 min-w-0">
                                    <p className="text-white text-xl font-bold mb-2">Continúa Tu Aventura</p>
                                    <p className="text-[#b8c7e0] text-base mb-3">
                                        Reanuda tu progreso en el módulo <span className="font-semibold">'{lastAccessedModule.title}'</span> del curso <span className="font-semibold">{lastAccessedModule.course}</span>
                                    </p>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-[#283039] rounded-full h-2 min-w-[120px]">
                                                <div
                                                    className="bg-[#0b79ee] h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${lastAccessedModule.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-[#b8c7e0] text-sm font-medium">{lastAccessedModule.progress}%</span>
                                        </div>
                                    </div>
                                    <p className="text-[#9caaba] text-sm mb-4">
                                        Siguiente: {lastAccessedModule.nextLesson}
                                    </p>
                                    <Link
                                        to={lastAccessedModule.route}
                                        className="inline-flex items-center justify-center px-6 py-3 bg-[#0b79ee] text-white text-sm font-medium rounded-lg hover:bg-[#0960c4] transition-colors w-fit"
                                    >
                                        Continuar
                                    </Link>
                                </div>
                                <div
                                    className="w-full md:w-56 h-48 md:h-32 md:min-w-[180px] rounded-xl bg-cover bg-center flex-shrink-0"
                                    style={{ backgroundImage: `url('${lastAccessedModule.image}')` }}
                                />
                            </div>
                        ) : (
                            <div className="bg-[#31425c] rounded-xl shadow-lg border border-[#223449] p-6 flex flex-col md:flex-row items-center gap-6">
                                <div className="flex flex-col justify-center flex-1 min-w-0">
                                    <p className="text-white text-xl font-bold mb-2">Comienza Tu Aventura</p>
                                    <p className="text-[#b8c7e0] text-base mb-4">
                                        Explora nuestros cursos y comienza tu viaje en el mundo de la programación
                                    </p>
                                    <Link
                                        to="/courses"
                                        className="inline-flex items-center justify-center px-6 py-3 bg-[#0b79ee] text-white text-sm font-medium rounded-lg hover:bg-[#0960c4] transition-colors w-fit"
                                    >
                                        Explorar Cursos
                                    </Link>
                                </div>
                                <div
                                    className="w-full md:w-56 h-48 md:h-32 md:min-w-[180px] rounded-xl bg-cover bg-center flex-shrink-0"
                                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCOVzfcHHLV7oiV1KQ-STzk9FYASDTb3eK7aW-_AkRswxuXhf332V7N7QQHRjNBDl-Dxm0leYXl5qJdJnhtO9D7DsYs_Ko70q6APPUTpJ9qhzyszbrsVD412e56OqR-yfz47TaGss5zvfQ_XbGgvKE-mwGXPP8vAA_0vQC9_jz3-vc7t6O47qS_L7kYW6J4S-XMQ3bCQpGtOcsQPhLwc7VKWW40Jd-XId0LEjrBya9ARe0citIozELE0vhSf_zkliJNpEBaxFMaJBOj')` }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Separator */}
                    <div className="w-full h-px bg-[#283039] mb-8"></div>

                    {/* Sección Módulos en Progreso */}
                    <h2 className={`${theme.typography.heading.h3} text-${theme.colors.text.primary} pb-3 pt-2`}>
                        Módulos en Progreso
                    </h2>
                    {isLoading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0b79ee]"></div>
                        </div>
                    ) : modulesInProgress.length > 0 ? (
                        <div className="modules-progress-grid grid gap-4 sm:gap-6 mb-8">
                            {modulesInProgress.map((module) => (
                                <div key={module.id} className="bg-[#1b2127] rounded-xl p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)] hover:shadow-[0_0_8px_rgba(0,0,0,0.2)] transition-shadow">
                                    <div className="flex flex-col">
                                        <div
                                            className="w-full h-32 bg-center bg-no-repeat bg-cover rounded-lg mb-4"
                                            style={{ backgroundImage: `url(${module.image})` }}
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className={`text-[${theme.colors.text.primary}] text-sm font-medium`}>
                                                    {module.course}
                                                </p>
                                                <span className="text-[#0b79ee] text-xs bg-[#0b79ee]/20 px-2 py-1 rounded-full flex-shrink-0">
                                                    En progreso
                                                </span>
                                            </div>
                                            <p className={`text-[${theme.colors.text.primary}] text-base font-bold leading-tight mb-2`}>
                                                {module.title}
                                            </p>
                                            <p className={`text-[${theme.colors.text.secondary}] text-sm font-normal leading-normal mb-3`}>
                                                {module.description}
                                            </p>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[#9caaba] text-xs">Progreso</span>
                                                <span className="text-white text-xs">{module.progress}%</span>
                                            </div>
                                            <div className="h-1.5 bg-[#283039] rounded-full overflow-hidden mb-3">
                                                <div
                                                    className="h-full bg-[#0b79ee] rounded-full transition-all duration-300"
                                                    style={{ width: `${module.progress}%` }}
                                                />
                                            </div>
                                            <p className="text-[#9caaba] text-xs mb-3">
                                                Siguiente: {module.nextLesson}
                                            </p>
                                            <Link
                                                to={module.route}
                                                className="inline-flex items-center justify-center px-4 py-2 bg-[#0b79ee] text-white text-sm font-medium rounded-lg hover:bg-[#0960c4] transition-colors w-full"
                                            >
                                                Continuar
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className={`text-[${theme.colors.text.secondary}] text-base`}>
                                No tienes módulos en progreso actualmente.
                            </p>
                            <Link
                                to="/courses"
                                className="inline-flex items-center justify-center px-4 py-2 mt-4 bg-[#0b79ee] text-white text-sm font-medium rounded-lg hover:bg-[#0960c4] transition-colors"
                            >
                                Explorar Cursos
                            </Link>
                        </div>
                    )}

                    {/* Separator */}
                    <div className="w-full h-px bg-[#283039] mb-8"></div>

                    {/* Sección Roadmaps */}
                    <h2 className={`${theme.typography.heading.h3} text-${theme.colors.text.primary} pb-3 pt-2`}>
                        Roadmaps de Aprendizaje
                    </h2>
                    <p className={`text-[${theme.colors.text.secondary}] text-sm mb-6`}>
                        Rutas de aprendizaje estructuradas que combinan múltiples cursos para alcanzar objetivos profesionales específicos
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                        {roadmaps.map((roadmap) => {
                            const levelColors = {
                                beginner: 'bg-green-500/20 text-green-400',
                                intermediate: 'bg-yellow-500/20 text-yellow-400',
                                advanced: 'bg-red-500/20 text-red-400'
                            };
                            
                            const levelLabels = {
                                beginner: 'Principiante',
                                intermediate: 'Intermedio',
                                advanced: 'Avanzado'
                            };

                            return (
                                <div key={roadmap.id} className="bg-[#1b2127] rounded-xl p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)] hover:shadow-[0_0_8px_rgba(0,0,0,0.2)] transition-shadow">
                                    <div className="flex flex-col">
                                        <div
                                            className="w-full h-32 bg-center bg-no-repeat bg-cover rounded-lg mb-4"
                                            style={{ backgroundImage: `url(${roadmap.image})` }}
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className={`text-[${theme.colors.text.primary}] text-lg font-bold`}>
                                                    {roadmap.title}
                                                </h3>
                                                <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${levelColors[roadmap.level]}`}>
                                                    {levelLabels[roadmap.level]}
                                                </span>
                                            </div>
                                            <p className={`text-[${theme.colors.text.secondary}] text-sm mb-3`}>
                                                {roadmap.description}
                                            </p>
                                            <div className="mb-3">
                                                <p className="text-[#9caaba] text-xs mb-1">Cursos incluidos:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {roadmap.courses.slice(0, 2).map((course, idx) => (
                                                        <span key={idx} className="text-[#0b79ee] text-xs bg-[#0b79ee]/10 px-2 py-1 rounded">
                                                            {course}
                                                        </span>
                                                    ))}
                                                    {roadmap.courses.length > 2 && (
                                                        <span className="text-[#9caaba] text-xs px-2 py-1">
                                                            +{roadmap.courses.length - 2} más
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[#9caaba] text-xs">
                                                        {roadmap.completedModules}/{roadmap.totalModules} módulos
                                                    </span>
                                                    <span className="text-[#9caaba] text-xs">
                                                        {roadmap.duration}
                                                    </span>
                                                </div>
                                                <span className="text-white text-xs">{roadmap.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-[#283039] rounded-full overflow-hidden mb-4">
                                                <div
                                                    className="h-full bg-[#0b79ee] rounded-full transition-all duration-300"
                                                    style={{ width: `${roadmap.progress}%` }}
                                                />
                                            </div>
                                            <Link
                                                to={roadmap.route}
                                                className="inline-flex items-center justify-center px-4 py-2 bg-[#0b79ee] text-white text-sm font-medium rounded-lg hover:bg-[#0960c4] transition-colors w-full"
                                            >
                                                {roadmap.progress > 0 ? 'Continuar Roadmap' : 'Comenzar Roadmap'}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Separator */}
                    <div className="w-full h-px bg-[#283039] mb-8"></div>

                    {/* Sección Logros */}
                    <h2 className={`text-[${theme.colors.text.primary}] text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-2`}>
                        Logros
                    </h2>
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-4 rounded-xl">
                            {/* Mobile Layout */}
                            <div className="block md:hidden">
                                <div className="flex flex-col gap-1 mb-4">
                                    <p className={`text-[${theme.colors.text.primary}] text-base font-bold leading-tight`}>
                                        Conquistador del Código
                                    </p>
                                    <p className={`text-[${theme.colors.text.secondary}] text-sm font-normal leading-normal`}>
                                        Completaste 5 módulos y ganaste 1000 XP.
                                    </p>
                                </div>
                                <div
                                    className="w-full h-48 bg-center bg-no-repeat aspect-video bg-cover rounded-xl mb-4"
                                    style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuC63-qQiitPlMt7t59cGKZD1FDzRTZVtAA7471s0yBdK2Hf5lI1esEYlQhboJLniiJfCvx8W2rRNceOPPDUKmAxXFFDI13o1C1mq5XNfioJFV4dO_m4yISojydC384Fv_a73HFz605TIPgfhp1t_sG2ASr3_ntY1BoiVsy3aFcO2Ej3oHaSqj0XdyzBuioxjBZPrbp7DxqZR2vUlRgXE9kLzbXvpBr4ZlGNFauiRhcvZPfczZAI9VNISEmqIz2tGpm_Tpk8pVq-Ky1s)' }}
                                />
                                <Button
                                    variant="secondary"
                                    size="md"
                                    className="w-fit"
                                >
                                    Ver Logros
                                </Button>
                            </div>
                            
                            {/* Desktop Layout */}
                            <div className="hidden md:flex md:items-stretch md:justify-between gap-4 w-full">
                                <div className="flex flex-col gap-4 md:flex-[2_2_0px]">
                                    <div className="flex flex-col gap-1">
                                        <p className={`text-[${theme.colors.text.primary}] text-base font-bold leading-tight`}>
                                            Conquistador del Código
                                        </p>
                                                                                 <p className={`text-[${theme.colors.text.secondary}] text-sm font-normal leading-normal`}>
                                             Completaste 5 módulos y ganaste 1000 XP.
                                         </p>
                                     </div>
                                     <Button
                                        variant="secondary"
                                        size="md"
                                        className="w-fit"
                                    >
                                        Ver Logros
                                    </Button>
                                </div>
                                <div
                                    className="w-full h-48 md:h-auto bg-center bg-no-repeat aspect-video bg-cover rounded-xl md:flex-1"
                                    style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuC63-qQiitPlMt7t59cGKZD1FDzRTZVtAA7471s0yBdK2Hf5lI1esEYlQhboJLniiJfCvx8W2rRNceOPPDUKmAxXFFDI13o1C1mq5XNfioJFV4dO_m4yISojydC384Fv_a73HFz605TIPgfhp1t_sG2ASr3_ntY1BoiVsy3aFcO2Ej3oHaSqj0XdyzBuioxjBZPrbp7DxqZR2vUlRgXE9kLzbXvpBr4ZlGNFauiRhcvZPfczZAI9VNISEmqIz2tGpm_Tpk8pVq-Ky1s)' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Datos de los módulos
const modules = [
    {
        title: "Fundamentos de Python",
        description: "Aprende los conceptos básicos del lenguaje de programación Python.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOVzfcHHLV7oiV1KQ-STzk9FYASDTb3eK7aW-_AkRswxuXhf332V7N7QQHRjNBDl-Dxm0leYXl5qJdJnhtO9D7DsYs_Ko70q6APPUTpJ9qhzyszbrsVD412e56OqR-yfz47TaGss5zvfQ_XbGgvKE-mwGXPP8vAA_0vQC9_jz3-vc7t6O47qS_L7kYW6J4S-XMQ3bCQpGtOcsQPhLwc7VKWW40Jd-XId0LEjrBya9ARe0citIozELE0vhSf_zkliJNpEBaxFMaJBOj"
    },
    {
        title: "Desarrollo Web Básico",
        description: "Construye tu primera página web usando HTML, CSS y JavaScript.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoORGORDPY85BGx45rAsDWcEQESeqJbV65GaS0H7mpHcYOqI1Mkq8BtfRcYbiVwAuTIPWYCjZ0Cx_SQPXpehHMVzv-L7ooeK_owymSPKWSQ_NxNxbNS56oHLvCH4oUpCcsfg7Zseb4DYTFJoBEDoIC5sTU7zVfcgqqj0i3YAoMESVr45p0lMVdodkrEwEyJk_wE2il9FUMNJchpte32s9MugB7d3fbgwjdWwMOK3uqtJN9FfpKSUf0ZCqI4bRbSJk629lhVQi4i1Rw"
    },
    {
        title: "Desarrollo de Juegos con Pygame",
        description: "Crea juegos simples utilizando la biblioteca Pygame.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkWTqKYzKLwFlJ-mbukpXvErArhDB7YdoEV40iugp6LBK0dnaUTTSl8pRr6zhmhpEiWjmrjylfbEGqr8pBm9DukkjWVFJZYKnuhSWtCBhAfWHxxLJBK051yWl4JTYxfHTj-j00rN50AtbS4b2-23cR91NgNRwVZ8Zp77d9s9vGt-4fgO8C-sgEjBP23kXIc2nLrlEPMIa4QHwmv6vkAmoEzfKO0NVzSf4ODFrCS3dkH9LUXsoslV2lswFw_ILMnm_frug7r0DlMU0d"
    },
    {
        title: "Ciencia de Datos para Principiantes",
        description: "Explora técnicas de análisis y visualización de datos.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLV75dBR_JxoTZXyhIMoUClQ5UBJq4ZIdDAZ5Ara791_hyZGUcgPb5fdBoE7I_KH8kF8QzzOvAF3dLMkeS3CNXe3tNBZYkfoTVaKR3o2Rl5sLwgN6DqBo2RQuY7iNaQS1AxX12E_7BYYk4-3vVQCqheYo23kE1kHpX66iWNgLYqCvquutMGwsP3v7vTRDBxbo81AYoX4gb_5C2KIBRIJF4fEPqg7XmtfF74TOXjSCi4i4q5PWr0MlW9QXPUxl35I7lTntqtiuNfH56"
    }
];

export default Dashboard;