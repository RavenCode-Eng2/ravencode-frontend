import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUpdateUser } from '../hooks/useApi';
import { theme } from '../theme';
import Button from '../components/Button';
import Input from '../components/Input';
import { toast } from 'react-hot-toast';

const Settings: React.FC = () => {
    const { user, refreshUser } = useAuth();
    const updateUserMutation = useUpdateUser();

    const [formData, setFormData] = useState({
        Nombre: '',
        Correo_electronico: '',
        Institucion_educativa: '',
        Grado_academico: '',
        Foto_de_perfil: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                Nombre: user.Nombre || '',
                Correo_electronico: user.Correo_electronico || '',
                Institucion_educativa: user.Institucion_educativa || '',
                Grado_academico: user.Grado_academico || '',
                Foto_de_perfil: user.Foto_de_perfil || '',
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.Correo_electronico) {
            toast.error('No se pudo identificar al usuario');
            return;
        }
        try {
            await updateUserMutation.mutateAsync({
                email: user.Correo_electronico,
                userData: formData
            });
            await refreshUser();
            toast.success('Perfil actualizado exitosamente');
        } catch (error) {
            toast.error('Error al actualizar el perfil');
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Cargando información del usuario...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className={`${theme.typography.heading.h1} text-${theme.colors.text.primary} px-4 text-left pb-3 pt-5 mb-8`}>
                Configuración de Perfil
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <Input
                        type="text"
                        id="Nombre"
                        name="Nombre"
                        label="Nombre completo"
                        value={formData.Nombre}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type="email"
                        id="Correo_electronico"
                        name="Correo_electronico"
                        label="Correo electrónico"
                        value={formData.Correo_electronico}
                        disabled
                    />
                    <Input
                        type="text"
                        id="Institucion_educativa"
                        name="Institucion_educativa"
                        label="Institución educativa"
                        value={formData.Institucion_educativa}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="text"
                        id="Grado_academico"
                        name="Grado_academico"
                        label="Grado académico"
                        value={formData.Grado_academico}
                        onChange={handleInputChange}
                    />
                </div>
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={updateUserMutation.isPending}
                >
                    {updateUserMutation.isPending ? 'Guardando...' : 'Guardar cambios'}
                </Button>
            </form>
        </div>
    );
};

export default Settings; 