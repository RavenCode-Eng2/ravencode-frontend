import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283039] px-10 py-3">
            <div className="flex items-center gap-4 text-white">
                <Link to="/" className="flex items-center gap-4">
                    <div className="size-4">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" />
                        </svg>
                    </div>
                    <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">RavenCode</h2>
                </Link>
            </div>
            <div className="flex flex-1 justify-end gap-8">
                <div className="flex items-center gap-9">
                    <Link
                        to="/"
                        className={`text-sm font-medium leading-normal transition-colors ${isActive('/') ? 'text-[#0b79ee]' : 'text-white hover:text-[#0b79ee]'}`}
                    >
                        Inicio
                    </Link>
                    <Link
                        to="/courses"
                        className={`text-sm font-medium leading-normal transition-colors ${isActive('/courses') ? 'text-[#0b79ee]' : 'text-white hover:text-[#0b79ee]'}`}
                    >
                        Cursos
                    </Link>
                    {isAuthenticated && (
                        <Link
                            to="/my-courses"
                            className={`text-sm font-medium leading-normal transition-colors ${isActive('/my-courses') ? 'text-[#0b79ee]' : 'text-white hover:text-[#0b79ee]'}`}
                        >
                            Mis Cursos
                        </Link>
                    )}
                    <Link
                        to="/help"
                        className={`text-sm font-medium leading-normal transition-colors ${isActive('/help') ? 'text-[#0b79ee]' : 'text-white hover:text-[#0b79ee]'}`}
                    >
                        Ayuda
                    </Link>
                </div>
                {isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#283039] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#3b4754] transition-colors">
                            <div className="text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                    <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
                                </svg>
                            </div>
                        </button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCZZLM7aYAqd8ScJ6a2Ou6wfAkdWyjKtmQgDHJnFE6RjWOxXY9BYoEAjbYlR5tUPzTRWqGK7MW8VM8SyPGaERXgeGj1b63dzZAww9syD1sdWK5ouxHUA4Bwe29A2EQCiZmeD83xPX4_QRQl4Fs0QkNGc6PwThJ364eK_AFtPUoqDgMrYXIO2UeqV2-t9fhtI_zv2WlBx7DJwyHFfE7VjxJEy2PHtl3j0IINP56Tx-BgMgE8l6q8eBX7ANYDrVAA8X98-FgAS2QNFKtP")' }} />
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#283039] text-white text-sm font-bold leading-normal hover:bg-[#3b4754] transition-colors"
                    >
                        Iniciar sesión
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header; 