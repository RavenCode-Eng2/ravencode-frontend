import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { theme } from '../theme';
import { useLocation } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';

interface LayoutProps {
    children: React.ReactNode;
    sidebarType?: 'dashboard' | 'courses' | 'none';
}

const Layout: React.FC<LayoutProps> = ({ children, sidebarType = 'none' }) => {
    const location = useLocation();
    const { isCollapsed } = useSidebar();
    const isPublicLayout = sidebarType === 'none';
    
    // Force dashboard sidebar for admin routes
    const effectiveSidebarType = location.pathname.startsWith('/admin') ? 'dashboard' : sidebarType;

    return (
        <div
            className={`relative flex min-h-screen flex-col bg-[${theme.colors.background.main}]`}
            style={{ fontFamily: theme.typography.fontFamily }}
        >
            <Header />
            <div className="flex flex-1">
                {!isPublicLayout && <Sidebar type={effectiveSidebarType} />}
                <main className={`flex-1 overflow-auto transition-all duration-300 pb-8 ${
                    isPublicLayout 
                        ? 'flex items-center justify-center' 
                        : `${!isCollapsed ? 'ml-0' : 'ml-0'}`
                }`}>
                    {isPublicLayout ? (
                        <div className="flex flex-col min-h-full w-full">
                            <div className="flex-1 flex items-center justify-center">
                                {children}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full w-full">
                            {children}
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout; 