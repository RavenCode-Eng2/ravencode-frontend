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
        nombre: '',
        correo_electronico: '',
        departamento: '',
        fecha_de_nacimiento: '',
        foto_de_perfil: '',
    });

    useEffect(() => {
        if (user) {
            console.log('Current user data:', user); // Debug log
            setFormData({
                nombre: user.nombre || '',
                correo_electronico: user.correo_electronico || '',
                departamento: user.departamento || '',
                fecha_de_nacimiento: user.fecha_de_nacimiento || '',
                foto_de_perfil: user.foto_de_perfil || '',
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
        if (!user?.correo_electronico) {
            toast.error('No se pudo identificar al usuario');
            return;
        }
        try {
            await updateUserMutation.mutateAsync({
                email: user.correo_electronico,
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
                        id="nombre"
                        name="nombre"
                        label="Nombre completo"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type="email"
                        id="correo_electronico"
                        name="correo_electronico"
                        label="Correo electrónico"
                        value={formData.correo_electronico}
                        disabled
                    />
                    <Input
                        type="text"
                        id="departamento"
                        name="departamento"
                        label="Departamento"
                        value={formData.departamento}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="date"
                        id="fecha_de_nacimiento"
                        name="fecha_de_nacimiento"
                        label="Fecha de nacimiento"
                        value={formData.fecha_de_nacimiento}
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