import React, { useState } from 'react';
import { theme } from '../theme';
import { getResponsiveContainer } from '../utils/responsive';

interface Notification {
    id: number;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    type: 'info' | 'success' | 'warning';
}

const Notifications: React.FC = () => {
    // Mock notifications data - in real app this would come from an API
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            title: "Nuevo módulo disponible",
            message: "El módulo 'Estructuras de Datos' ya está disponible. Puedes acceder a él desde tu dashboard y comenzar a aprender sobre arrays, listas enlazadas y más.",
            time: "Hace 2 horas",
            isRead: false,
            type: "info"
        },
        {
            id: 2,
            title: "Evaluación completada",
            message: "Has completado la evaluación del Módulo 1 con éxito. Tu puntuación fue de 85/100. ¡Excelente trabajo!",
            time: "Hace 1 día",
            isRead: true,
            type: "success"
        },
        {
            id: 3,
            title: "Recordatorio",
            message: "No olvides completar la lección de Python básico. Llevas 3 días sin actividad en el curso.",
            time: "Hace 2 días",
            isRead: false,
            type: "warning"
        },
        {
            id: 4,
            title: "Nuevo logro desbloqueado",
            message: "¡Felicitaciones! Has desbloqueado el logro 'Primer Paso' por completar tu primera lección.",
            time: "Hace 3 días",
            isRead: true,
            type: "success"
        },
        {
            id: 5,
            title: "Mantenimiento programado",
            message: "El sistema estará en mantenimiento el próximo domingo de 2:00 AM a 4:00 AM. Durante este tiempo no podrás acceder a la plataforma.",
            time: "Hace 1 semana",
            isRead: false,
            type: "warning"
        },
        {
            id: 6,
            title: "Actualización de contenido",
            message: "Hemos actualizado el contenido del Módulo 2 con nuevos ejercicios prácticos y ejemplos mejorados.",
            time: "Hace 1 semana",
            isRead: true,
            type: "info"
        }
    ]);

    const [filter, setFilter] = useState<'all' | 'unread'>('all');

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

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(notification => 
            notification.id === id ? { ...notification, isRead: true } : notification
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notification => 
            ({ ...notification, isRead: true })
        ));
    };

    const filteredNotifications = filter === 'all' 
        ? notifications 
        : notifications.filter(n => !n.isRead);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div 
            className="relative flex size-full min-h-screen flex-col bg-[#101923]"
            style={{ fontFamily: theme.typography.fontFamily }}
        >
            <div className="layout-container flex h-full grow flex-col">
                <div className={getResponsiveContainer()}>
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        {/* Header */}
                        <div className="flex flex-col gap-4 p-4">
                            <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em]">
                                Notificaciones
                            </h1>
                            
                            {/* Stats and Actions */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-400 text-sm">
                                        {notifications.length} notificaciones
                                    </span>
                                    {unreadCount > 0 && (
                                        <span className="text-blue-400 text-sm">
                                            {unreadCount} sin leer
                                        </span>
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    {/* Filter buttons */}
                                    <button
                                        onClick={() => setFilter('all')}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                            filter === 'all' 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-[#283039] text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        Todas
                                    </button>
                                    <button
                                        onClick={() => setFilter('unread')}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                            filter === 'unread' 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-[#283039] text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        Sin leer
                                    </button>
                                    
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            className="px-3 py-1 bg-[#283039] text-gray-400 hover:text-white rounded-full text-sm font-medium transition-colors"
                                        >
                                            Marcar todas como leídas
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Notifications List */}
                        <div className="flex-1 p-4">
                            {filteredNotifications.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-500 text-lg mb-2">
                                        {filter === 'unread' ? 'No tienes notificaciones sin leer' : 'No tienes notificaciones'}
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        {filter === 'unread' ? 'Todas tus notificaciones están al día' : 'Las notificaciones aparecerán aquí'}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredNotifications.map((notification) => (
                                        <div 
                                            key={notification.id}
                                            className={`p-4 rounded-lg border border-[#283039] transition-colors ${
                                                !notification.isRead 
                                                    ? 'bg-[#1e2a3a] hover:bg-[#253242]' 
                                                    : 'bg-[#1a2332] hover:bg-[#1e2a3a]'
                                            }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <span className="text-2xl flex-shrink-0">
                                                    {getNotificationIcon(notification.type)}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="text-white text-base font-semibold">
                                                            {notification.title}
                                                        </h3>
                                                        {!notification.isRead && (
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                                        {notification.message}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-500 text-xs">
                                                            {notification.time}
                                                        </span>
                                                        {!notification.isRead && (
                                                            <button
                                                                onClick={() => markAsRead(notification.id)}
                                                                className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
                                                            >
                                                                Marcar como leída
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications; 