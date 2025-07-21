import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();

    if (user?.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-white mb-6">Panel de Administración</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Course Management Card */}
                <div className="bg-[#283039] rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-3">Gestión de Cursos</h2>
                    <p className="text-gray-400 mb-4">Administra los cursos, módulos y lecciones de la plataforma.</p>
                    <button className="bg-[#0b79ee] text-white px-4 py-2 rounded-lg hover:bg-[#096ad4] transition-colors">
                        Administrar Cursos
                    </button>
                </div>

                {/* User Management Card */}
                <div className="bg-[#283039] rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-3">Gestión de Usuarios</h2>
                    <p className="text-gray-400 mb-4">Administra los usuarios, roles y permisos del sistema.</p>
                    <a 
                        href="/admin/users" 
                        className="inline-block bg-[#0b79ee] text-white px-4 py-2 rounded-lg hover:bg-[#096ad4] transition-colors"
                    >
                        Administrar Usuarios
                    </a>
                </div>

                {/* Analytics Card */}
                <div className="bg-[#283039] rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-3">Analíticas</h2>
                    <p className="text-gray-400 mb-4">Visualiza estadísticas y métricas de uso de la plataforma.</p>
                    <button className="bg-[#0b79ee] text-white px-4 py-2 rounded-lg hover:bg-[#096ad4] transition-colors">
                        Ver Analíticas
                    </button>
                </div>

                {/* Submissions Card */}
                <div className="bg-[#283039] rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-3">Submissions</h2>
                    <p className="text-gray-400 mb-4">Revisa y gestiona las submissions de los estudiantes.</p>
                    <button className="bg-[#0b79ee] text-white px-4 py-2 rounded-lg hover:bg-[#096ad4] transition-colors">
                        Ver Submissions
                    </button>
                </div>

                {/* Achievement Management Card */}
                <div className="bg-[#283039] rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-3">Gestión de Logros</h2>
                    <p className="text-gray-400 mb-4">Administra los logros y diplomas disponibles.</p>
                    <button className="bg-[#0b79ee] text-white px-4 py-2 rounded-lg hover:bg-[#096ad4] transition-colors">
                        Administrar Logros
                    </button>
                </div>

                {/* System Settings Card */}
                <div className="bg-[#283039] rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-3">Configuración</h2>
                    <p className="text-gray-400 mb-4">Configura parámetros generales del sistema.</p>
                    <button className="bg-[#0b79ee] text-white px-4 py-2 rounded-lg hover:bg-[#096ad4] transition-colors">
                        Configurar Sistema
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 