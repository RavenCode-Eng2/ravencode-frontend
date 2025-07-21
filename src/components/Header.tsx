import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import { useLogout } from '../hooks/useApi';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, user, logout: authLogout } = useAuth();
    const { toggleSidebar } = useSidebar();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const logoutMutation = useLogout();

    const isActive = (path: string) => location.pathname === path;

    // Mock notifications data
    const notifications = [
        {
            id: 1,
            title: "Nuevo módulo disponible",
            message: "El módulo 'Estructuras de Datos' ya está disponible",
            time: "Hace 2 horas",
            isRead: false,
            type: "info"
        },
        {
            id: 2,
            title: "Evaluación completada",
            message: "Has completado la evaluación del Módulo 1 con éxito",
            time: "Hace 1 día",
            isRead: true,
            type: "success"
        },
        {
            id: 3,
            title: "Recordatorio",
            message: "No olvides completar la lección de Python básico",
            time: "Hace 2 días",
            isRead: false,
            type: "warning"
        }
    ];

    const unreadCount = notifications.filter(n => !n.isRead).length;

    // Close notifications when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleNotifications = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
        setIsProfileOpen(false); // Close profile when opening notifications
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
        setIsNotificationsOpen(false); // Close notifications when opening profile
    };

    const handleLogout = async () => {
        try {
            await logoutMutation.mutateAsync();
            authLogout(); // Clear auth context
            navigate('/login'); // Redirect to login
        } catch (error) {
            console.error('Logout failed:', error);
            // Still clear auth context and redirect even if backend call fails
            authLogout();
            navigate('/login');
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success':
                return '✅';
            case 'warning':
                return '⚠️';
            case 'info':
            default:
                return 'ℹ️';
        }
    };

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283039] px-6 md:px-10 py-3">
            <div className="flex items-center gap-2 md:gap-4 text-white">
                {isAuthenticated && (
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden p-2 rounded-lg hover:bg-[#283039] text-white transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            fill="currentColor" 
                            viewBox="0 0 256 256"
                        >
                            <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"/>
                        </svg>
                    </button>
                )}
                <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2 md:gap-4">
                    <div className="size-4">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" />
                        </svg>
                    </div>
                    <h2 className="text-white text-base md:text-lg font-bold leading-tight tracking-[-0.015em]">RavenCode</h2>
                </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 justify-end">
                {/* Navigation Links */}
                <div className="flex items-center gap-8">
                    <Link
                        to="/dashboard"
                        className={`text-sm font-medium leading-normal transition-colors ${isActive('/dashboard') ? 'text-[#0b79ee]' : 'text-white hover:text-[#0b79ee]'}`}
                    >
                        Inicio
                    </Link>
                    <Link
                        to="/courses"
                        className={`text-sm font-medium leading-normal transition-colors ${isActive('/courses') ? 'text-[#0b79ee]' : 'text-white hover:text-[#0b79ee]'}`}
                    >
                        Cursos
                    </Link>
                </div>
                
                {/* Separator */}
                <div className="mx-6 h-6 w-px bg-[#283039]"></div>
                
                {/* Action Group */}
                <div className="flex items-center gap-3">
                    {/* Help Icon */}
                    <Link
                        to="/help"
                        className={`flex items-center justify-center h-10 w-10 rounded-full transition-colors ${isActive('/help') ? 'bg-[#0b79ee] text-white' : 'bg-[#283039] text-white hover:bg-[#3b4754]'}`}
                        title="Ayuda"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/>
                        </svg>
                    </Link>
                    
                    {isAuthenticated ? (
                        <>
                            <div className="relative" ref={notificationsRef}>
                                <button 
                                    onClick={toggleNotifications}
                                    className="relative flex items-center justify-center h-10 w-10 rounded-full bg-[#283039] text-white hover:bg-[#3b4754] transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                        <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
                                    </svg>
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>
                                
                                {/* Desktop Notifications Dropdown */}
                                {isNotificationsOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-[#1a2332] border border-[#283039] rounded-lg shadow-lg z-50 max-h-96 overflow-hidden flex flex-col">
                                        <div className="p-4 border-b border-[#283039] flex-shrink-0">
                                            <h3 className="text-white font-semibold text-base truncate">Notificaciones</h3>
                                            {unreadCount > 0 && (
                                                <span className="text-sm text-gray-400">{unreadCount} sin leer</span>
                                            )}
                                        </div>
                                        <div className="flex-1 overflow-y-auto overflow-x-hidden notifications-scrollbar">
                                            {notifications.map((notification) => (
                                                <div 
                                                    key={notification.id}
                                                    className={`p-4 border-b border-[#283039] hover:bg-[#283039] transition-colors ${
                                                        !notification.isRead ? 'bg-[#1e2a3a]' : ''
                                                    }`}
                                                >
                                                    <div className="flex items-start gap-3 min-w-0">
                                                        <span className="text-xl flex-shrink-0">{getNotificationIcon(notification.type)}</span>
                                                        <div className="flex-1 min-w-0 overflow-hidden">
                                                            <div className="flex items-center gap-2 mb-1 min-w-0">
                                                                <h4 className="text-white text-sm font-medium truncate flex-1">
                                                                    {notification.title}
                                                                </h4>
                                                                {!notification.isRead && (
                                                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                                                )}
                                                            </div>
                                                            <p className="text-gray-300 text-sm leading-relaxed mb-2 break-words overflow-wrap-anywhere">
                                                                {notification.message}
                                                            </p>
                                                            <span className="text-gray-500 text-xs truncate block">{notification.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-4 border-t border-[#283039] flex-shrink-0">
                                            <Link 
                                                to="/notifications"
                                                onClick={toggleNotifications}
                                                className="w-full block text-center py-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                                            >
                                                Ver todas las notificaciones
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={toggleProfile}
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 hover:ring-2 hover:ring-[#3b4754] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#3b4754] flex-shrink-0"
                                    title="Perfil de usuario"
                                    style={user?.foto_de_perfil ? { backgroundImage: `url("${user.foto_de_perfil}")` } : {}}
                                >
                                    {!user?.foto_de_perfil && (
                                        <div className="w-full h-full rounded-full bg-[#0b79ee] flex items-center justify-center">
                                            <span className="text-white font-semibold text-xs leading-none">
                                                {user?.nombre?.charAt(0).toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                    )}
                                </button>
                                
                                {/* Profile Dropdown */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 top-10 w-64 bg-[#1a2332] border border-[#283039] rounded-lg shadow-2xl z-50 overflow-hidden">
                                        {/* User Info Section */}
                                        <div className="p-4 border-b border-[#283039]">
                                            <div className="flex items-center gap-3">
                                                {user?.foto_de_perfil ? (
                                                    <img
                                                        src={user.foto_de_perfil}
                                                        alt={user.nombre}
                                                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-[#0b79ee] flex items-center justify-center flex-shrink-0">
                                                        <span className="text-white font-semibold text-sm leading-none">
                                                            {user?.nombre?.charAt(0).toUpperCase() || 'U'}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white font-medium text-sm truncate">
                                                        {user?.nombre || 'Usuario'}
                                                    </p>
                                                    <p className="text-gray-400 text-xs truncate">
                                                        {user?.correo_electronico || 'email@ejemplo.com'}
                                                    </p>
                                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                                                        user?.role === 'admin' 
                                                            ? 'bg-red-500/20 text-red-400' 
                                                            : 'bg-blue-500/20 text-blue-400'
                                                    }`}>
                                                        {user?.role === 'admin' ? 'Administrador' : 'Estudiante'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Menu Items */}
                                        <div className="py-2">
                                            <Link
                                                to="/settings"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#283039] hover:text-white transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                                                    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3.18-3l-2.64-23.72a8,8,0,0,0-3.93-6,107.6,107.6,0,0,0-26.25-10.88,8,8,0,0,0-7.06,1.48L130.16,40q-2.16-.06-4.32,0L107.2,25.08a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.48a8,8,0,0,0-3.93,6L67.32,64.2q-1.56,1.48-3,3.18L40.6,70.02a8,8,0,0,0-6,3.93,107.6,107.6,0,0,0-10.88,26.25,8,8,0,0,0,1.48,7.06L40.08,125.84q-.06,2.16,0,4.32L25.2,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.48,1.56,3.18,3l2.64,23.72a8,8,0,0,0,3.93,6,107.6,107.6,0,0,0,26.25,10.88,8,8,0,0,0,7.06-1.48L125.84,215.92q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.6,107.6,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3.18l23.72-2.64a8,8,0,0,0,6-3.93,107.6,107.6,0,0,0,10.88-26.25,8,8,0,0,0-1.48-7.06ZM128,208a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,208Z"/>
                                                </svg>
                                                <span className="text-sm">Configuración</span>
                                            </Link>
                                            
                                            <div className="border-t border-[#283039] my-2"></div>
                                            
                                            <button
                                                onClick={handleLogout}
                                                disabled={logoutMutation.isPending}
                                                className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-[#283039] hover:text-red-300 transition-colors w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {logoutMutation.isPending ? (
                                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                                                        <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"/>
                                                    </svg>
                                                )}
                                                <span className="text-sm">
                                                    {logoutMutation.isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#283039] text-white text-sm font-bold leading-normal hover:bg-[#3b4754] transition-colors"
                        >
                            Iniciar sesión
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Right Side - Help, Notifications and User Avatar/Login */}
            <div className="flex md:hidden items-center gap-3">
                {/* Help Icon */}
                <Link
                    to="/help"
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isActive('/help') ? 'bg-[#0b79ee] text-white' : 'bg-[#283039] text-white hover:bg-[#3b4754]'}`}
                    title="Ayuda"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/>
                    </svg>
                </Link>

                {isAuthenticated && (
                    <div className="relative" ref={notificationsRef}>
                        <button 
                            onClick={toggleNotifications}
                            className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#283039] text-white hover:bg-[#3b4754] transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256">
                                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
                            </svg>
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                        
                        {/* Mobile Notifications Full Screen */}
                        {isNotificationsOpen && (
                            <div className="fixed inset-0 bg-[#101923] z-50 md:hidden">
                                <div className="flex flex-col h-full">
                                    {/* Header */}
                                    <div className="flex items-center justify-between p-4 border-b border-[#283039]">
                                        <h2 className="text-white text-lg font-semibold">Notificaciones</h2>
                                        <button 
                                            onClick={toggleNotifications}
                                            className="p-2 rounded-lg hover:bg-[#283039] text-white transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                                                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1 p-4">
                                        {unreadCount > 0 && (
                                            <p className="text-gray-400 text-sm mb-4">{unreadCount} sin leer</p>
                                        )}
                                        
                                        <div className="space-y-4">
                                            {notifications.map((notification) => (
                                                <div 
                                                    key={notification.id}
                                                    className={`p-4 rounded-lg border border-[#283039] ${
                                                        !notification.isRead ? 'bg-[#1e2a3a]' : 'bg-[#1a2332]'
                                                    }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-xl flex-shrink-0">{getNotificationIcon(notification.type)}</span>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <h4 className="text-white text-base font-medium break-words">
                                                                    {notification.title}
                                                                </h4>
                                                                {!notification.isRead && (
                                                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                                                )}
                                                            </div>
                                                            <p className="text-gray-300 text-sm leading-relaxed mb-2 break-words">
                                                                {notification.message}
                                                            </p>
                                                            <span className="text-gray-500 text-xs">{notification.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Footer */}
                                    <div className="p-4 border-t border-[#283039]">
                                        <Link 
                                            to="/notifications"
                                            onClick={toggleNotifications}
                                            className="w-full block text-center py-3 bg-[#283039] hover:bg-[#3b4754] text-white font-medium rounded-lg transition-colors"
                                        >
                                            Ver todas las notificaciones
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                
                {isAuthenticated ? (
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={toggleProfile}
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 hover:ring-2 hover:ring-[#3b4754] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#3b4754] flex-shrink-0"
                            title="Perfil de usuario"
                            style={user?.foto_de_perfil ? { backgroundImage: `url("${user.foto_de_perfil}")` } : {}}
                        >
                            {!user?.foto_de_perfil && (
                                <div className="w-full h-full rounded-full bg-[#0b79ee] flex items-center justify-center">
                                    <span className="text-white font-semibold text-xs leading-none">
                                        {user?.nombre?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                            )}
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute right-0 top-12 w-64 bg-[#283039] border border-[#40474f] rounded-xl shadow-xl z-50">
                                <div className="p-4 border-b border-[#40474f]">
                                    <div className="flex items-center gap-3">
                                        {user?.foto_de_perfil ? (
                                            <img
                                                src={user.foto_de_perfil}
                                                alt={user.nombre}
                                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-[#0b79ee] flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-semibold text-lg leading-none">
                                                    {user?.nombre?.charAt(0).toUpperCase() || 'U'}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-medium text-sm truncate">
                                                {user?.nombre || 'Usuario'}
                                            </p>
                                            <p className="text-gray-400 text-xs truncate">
                                                {user?.correo_electronico}
                                            </p>
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                                                user?.role === 'admin' 
                                                    ? 'bg-red-500/20 text-red-400' 
                                                    : 'bg-blue-500/20 text-blue-400'
                                            }`}>
                                                {user?.role === 'admin' ? 'Administrador' : 'Estudiante'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <Link
                                        to="/settings"
                                        onClick={toggleProfile}
                                        className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:bg-[#3b4754] rounded-lg transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                                            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
                                        </svg>
                                        <span className="text-sm">Configuración</span>
                                    </Link>
                                    {user?.role === 'admin' && (
                                        <Link
                                            to="/admin"
                                            onClick={toggleProfile}
                                            className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:bg-[#3b4754] rounded-lg transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                                                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216v40H40ZM216,200H40V112H216v88Z" />
                                            </svg>
                                            <span className="text-sm">Panel Admin</span>
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:bg-[#3b4754] rounded-lg transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                                            <path d="M224,128a8,8,0,0,1-8,8H136v40a8,8,0,0,1-13.66,5.66l-96-96a8,8,0,0,1,0-11.32l96-96A8,8,0,0,1,136,24V64h80A8,8,0,0,1,224,72Z" />
                                        </svg>
                                        <span className="text-sm">Cerrar Sesión</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#283039] text-white text-xs font-bold leading-normal hover:bg-[#3b4754] transition-colors"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header; 