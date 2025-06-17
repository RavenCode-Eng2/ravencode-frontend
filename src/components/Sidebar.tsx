import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItem {
    title: string;
    path: string;
    icon: React.ReactNode;
}

const dashboardItems: SidebarItem[] = [
    {
        title: 'Vista General',
        path: '/dashboard',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216v40H40ZM216,200H40V112H216v88Z" />
            </svg>
        )
    },
    {
        title: 'Mi Progreso',
        path: '/my-courses',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M243.84,68.11,131.84,12.11a16,16,0,0,0-15.68,0l-112,56A16,16,0,0,0,0,83.2V192a16,16,0,0,0,16,16H240a16,16,0,0,0,16-16V83.2A16,16,0,0,0,243.84,68.11ZM224,192H32V88.67l88-44V192h16V44.67l88,44Z" />
            </svg>
        )
    },
    {
        title: 'Logros',
        path: '/achievements',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-61.66a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L128,164.69l26.34-26.35A8,8,0,0,1,165.66,154.34Zm0-64a8,8,0,0,1,0,11.32L128,139.31,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35A8,8,0,0,1,165.66,90.34Z" />
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

interface SidebarProps {
    type: 'dashboard' | 'courses' | 'none';
}

const Sidebar: React.FC<SidebarProps> = ({ type }) => {
    const location = useLocation();
    const items = type === 'dashboard' ? dashboardItems : [];

    if (type === 'none') return null;

    return (
        <aside className="w-64 border-r border-[#283039] flex-shrink-0">
            <div className="p-6">
                <nav className="space-y-2">
                    {items.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-[#283039] text-white'
                                : 'text-[#9caaba] hover:bg-[#283039] hover:text-white'
                                }`}
                        >
                            <span className="w-5 h-5">{item.icon}</span>
                            <span className="text-sm font-medium">{item.title}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar; 