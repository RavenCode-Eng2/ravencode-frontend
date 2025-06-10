import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { theme } from '../theme';

interface LayoutProps {
    children: React.ReactNode;
    sidebarType?: 'dashboard' | 'courses' | 'none';
}

const Layout: React.FC<LayoutProps> = ({ children, sidebarType = 'none' }) => {
    const isPublicLayout = sidebarType === 'none';

    return (
        <div
            className={`relative flex min-h-screen flex-col bg-[${theme.colors.background.main}]`}
            style={{ fontFamily: theme.typography.fontFamily }}
        >
            <Header />
            <div className="flex flex-1">
                {!isPublicLayout && <Sidebar type={sidebarType} />}
                <main className={`flex-1 overflow-auto ${isPublicLayout ? 'flex items-center justify-center' : ''}`}>
                    {isPublicLayout ? (
                        children
                    ) : (
                        <div className="h-full w-full">
                            {children}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Layout; 