import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import { theme } from '../theme';

interface SidebarItem {
    title: string;
    path: string;
    icon: React.ReactNode;
}

const dashboardItems: SidebarItem[] = [
    {
        title: 'Inicio',
        path: '/dashboard',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216v40H40ZM216,200H40V112H216v88Z" />
            </svg>
        )
    },
    {
        title: 'Cursos',
        path: '/courses',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M243.84,68.11,131.84,12.11a16,16,0,0,0-15.68,0l-112,56A16,16,0,0,0,0,83.2V192a16,16,0,0,0,16,16H240a16,16,0,0,0,16-16V83.2A16,16,0,0,0,243.84,68.11ZM224,192H32V88.67l88-44V192h16V44.67l88,44Z" />
            </svg>
        )
    },
    {
        title: 'Mi Progreso',
        path: '/my-courses',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM164.49,99.51a12,12,0,0,1,0,17l-28,28a12,12,0,0,1-17,0l-14-14a12,12,0,1,1,17-17L128,119l19.51-19.52A12,12,0,0,1,164.49,99.51Z" />
            </svg>
        )
    },
    {
        title: 'Logros',
        path: '/achievements',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M216,64H176L159.79,25.13a16,16,0,0,0-27.58,0L116,64H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM146,80,128,50,110,80ZM216,200H40V112H216v88ZM96,144a32,32,0,1,1,32,32A32,32,0,0,1,96,144Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,128,128Z" />
            </svg>
        )
    },
    {
        title: 'Mis Entregas',
        path: '/my-submissions',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z" />
            </svg>
        )
    },
    {
        title: 'Configuración',
        path: '/settings',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
            </svg>
        )
    }
];

const adminItems: SidebarItem[] = [
    {
        title: 'Panel Admin',
        path: '/admin',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216v40H40ZM216,200H40V112H216v88Z" />
            </svg>
        )
    },
    {
        title: 'Gestionar Cursos',
        path: '/admin/courses',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M243.84,68.11,131.84,12.11a16,16,0,0,0-15.68,0l-112,56A16,16,0,0,0,0,83.2V192a16,16,0,0,0,16,16H240a16,16,0,0,0,16-16V83.2A16,16,0,0,0,243.84,68.11ZM224,192H32V88.67l88-44V192h16V44.67l88,44Z" />
            </svg>
        )
    },
    {
        title: 'Gestionar Usuarios',
        path: '/admin/users',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.91,16.61a8,8,0,0,1-5.61,9.79A103.85,103.85,0,0,0,208,144a8,8,0,0,1,0,16,87.93,87.93,0,0,1,31.84-6.08,8,8,0,0,1,5.61,9.79A88,88,0,0,1,239,180.36a8,8,0,0,1-14.75-6.24,71.93,71.93,0,0,0,5.64-14.75A87.93,87.93,0,0,1,208,160a8,8,0,0,1,0-16c-.67,0-1.33,0-2,.05a71.93,71.93,0,0,0,5.64-14.75,8,8,0,1,1,14.75-6.24,88,88,0,0,1,6.52,16.61A8,8,0,0,1,250.91,124.61ZM176,120a8,8,0,0,1-8,8H152a8,8,0,0,1,0-16h16A8,8,0,0,1,176,120Z" />
            </svg>
        )
    },
    {
        title: 'Gestionar Logros',
        path: '/admin/achievements',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M216,64H176L159.79,25.13a16,16,0,0,0-27.58,0L116,64H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM146,80,128,50,110,80ZM216,200H40V112H216v88ZM96,144a32,32,0,1,1,32,32A32,32,0,0,1,96,144Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,128,128Z" />
            </svg>
        )
    }
];

interface SidebarProps {
    type: 'dashboard' | 'courses' | 'none';
}

const Sidebar: React.FC<SidebarProps> = ({ type }) => {
    const location = useLocation();
    const { user } = useAuth();
    const { isCollapsed, toggleSidebar } = useSidebar();
    const isAdmin = user?.role === 'admin';

    if (type === 'none') return null;

    // Handle navigation click - auto-collapse on mobile
    const handleNavClick = () => {
        // Check if we're on mobile (screen width < 768px)
        if (window.innerWidth < 768 && !isCollapsed) {
            toggleSidebar();
        }
    };

    return (
        <>
            {/* Mobile overlay */}
            {!isCollapsed && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ease-out"
                    onClick={toggleSidebar}
                />
            )}
            
            <aside className={`
                fixed md:relative z-50 md:z-auto
                h-full md:h-auto
                transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                border-r border-[#283039] 
                bg-[#101923]
                ${isCollapsed 
                    ? '-translate-x-full md:translate-x-0 md:w-16' 
                    : 'translate-x-0 w-64'
                }
                flex-shrink-0
                will-change-transform
            `}>
                {/* Toggle button */}
                <div className="p-4 border-b border-[#283039] flex justify-between items-center">
                    {!isCollapsed && (
                        <span className="text-white text-lg font-semibold transition-opacity duration-300 ease-out">
                            Menú
                        </span>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-[#283039] text-[#9caaba] hover:text-white transition-colors duration-200"
                        aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            fill="currentColor" 
                            viewBox="0 0 256 256"
                            className={`transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isCollapsed ? 'rotate-180' : ''}`}
                        >
                            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
                        </svg>
                    </button>
                </div>

                <div className="p-4">
                    <nav className="space-y-2">
                        {dashboardItems.map((item, index) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={handleNavClick}
                                className={`
                                    flex items-center gap-3 px-3 py-2 rounded-lg 
                                    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                                    transform hover:scale-[1.02] active:scale-[0.98]
                                    ${location.pathname === item.path
                                        ? 'bg-[#283039] text-white shadow-lg'
                                        : 'text-[#9caaba] hover:bg-[#283039] hover:text-white'
                                    }
                                    ${isCollapsed ? 'justify-center' : ''}
                                    overflow-hidden
                                `}
                                style={{
                                    transitionDelay: `${index * 50}ms`
                                }}
                                title={isCollapsed ? item.title : undefined}
                            >
                                <span className={`
                                    w-5 h-5 flex-shrink-0 
                                    transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                                    ${isCollapsed ? 'scale-100' : 'scale-100'}
                                `}>
                                    {item.icon}
                                </span>
                                {!isCollapsed && (
                                    <span className={`
                                        text-sm font-medium
                                        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                                        whitespace-nowrap
                                    `}>
                                        {item.title}
                                    </span>
                                )}
                            </Link>
                        ))}
                        
                        {/* Admin section separator */}
                        {((type === 'dashboard' || type === 'courses') && isAdmin) && (
                            <>
                                <div className={`
                                    my-4 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                                    ${isCollapsed ? 'opacity-50' : 'opacity-100'}
                                `}>
                                    <div className="border-t border-[#283039]"></div>
                                    {!isCollapsed && (
                                        <div className="mt-3 mb-2">
                                            <span className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider px-3">
                                                Administración
                                            </span>
                                        </div>
                                    )}
                                </div>
                                
                                {adminItems.map((item, index) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={handleNavClick}
                                        className={`
                                            flex items-center gap-3 px-3 py-2 rounded-lg 
                                            transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                                            transform hover:scale-[1.02] active:scale-[0.98]
                                            ${location.pathname === item.path
                                                ? 'bg-[#283039] text-white shadow-lg'
                                                : 'text-[#9caaba] hover:bg-[#283039] hover:text-white'
                                            }
                                            ${isCollapsed ? 'justify-center' : ''}
                                            overflow-hidden
                                        `}
                                        style={{
                                            transitionDelay: `${(index + dashboardItems.length) * 50}ms`
                                        }}
                                        title={isCollapsed ? item.title : undefined}
                                    >
                                        <span className={`
                                            w-5 h-5 flex-shrink-0
                                            transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                                            ${isCollapsed ? 'scale-100' : 'scale-100'}
                                        `}>
                                            {item.icon}
                                        </span>
                                        {!isCollapsed && (
                                            <span className={`
                                                text-sm font-medium
                                                transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                                                whitespace-nowrap
                                            `}>
                                                {item.title}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </>
                        )}
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar; 