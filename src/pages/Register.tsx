import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../theme';
import { authService } from '../services/authService';
import { toast } from 'react-hot-toast';

interface FormData {
    nombre: string;
    email: string;
    password: string;
    confirmPassword: string;
    fecha_de_nacimiento: string;
    institucion_educativa: string;
    grado_academico: string;
    terms: boolean;
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: '',
        fecha_de_nacimiento: '',
        institucion_educativa: '',
        grado_academico: '',
        terms: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        // Validate terms
        if (!formData.terms) {
            toast.error('Debes aceptar los términos y condiciones');
            return;
        }

        try {
            setIsLoading(true);
            await authService.register({
                nombre: formData.nombre,
                email: formData.email,
                password: formData.password,
                fecha_de_nacimiento: formData.fecha_de_nacimiento,
                institucion_educativa: formData.institucion_educativa,
                grado_academico: formData.grado_academico,
            });

            toast.success('Registro exitoso');
            navigate('/login');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Error al registrar');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex flex-1 items-center justify-center">
            <div className={`w-full ${theme.spacing.container.default} max-w-[512px]`}>
                <div className="flex justify-center mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-[${theme.colors.primary.main}] flex items-center justify-center`}>
                        <div className="w-8 h-8 text-white">
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" />
                            </svg>
                        </div>
                    </div>
                </div>
                <h2 className={`${theme.typography.heading.h2} text-${theme.colors.text.primary} text-center mb-8`}>
                    Crea tu cuenta
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="text"
                        id="nombre"
                        name="nombre"
                        label="Nombre completo"
                        placeholder="Ingresa tu nombre completo"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        label="Correo electrónico"
                        placeholder="Ingresa tu correo electrónico"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        label="Contraseña"
                        placeholder="Crea una contraseña"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirmar contraseña"
                        placeholder="Confirma tu contraseña"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type="date"
                        id="fecha_de_nacimiento"
                        name="fecha_de_nacimiento"
                        label="Fecha de nacimiento"
                        value={formData.fecha_de_nacimiento}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type="text"
                        id="institucion_educativa"
                        name="institucion_educativa"
                        label="Institución educativa"
                        placeholder="Ingresa tu institución educativa"
                        value={formData.institucion_educativa}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type="text"
                        id="grado_academico"
                        name="grado_academico"
                        label="Grado académico"
                        placeholder="Ingresa tu grado académico"
                        value={formData.grado_academico}
                        onChange={handleInputChange}
                        required
                    />
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleInputChange}
                            className={`h-4 w-4 rounded border-[${theme.colors.border.main}] bg-[${theme.colors.background.secondary}] text-[${theme.colors.primary.main}] focus:ring-[${theme.colors.primary.main}] focus:ring-offset-[${theme.colors.background.main}]`}
                        />
                        <label htmlFor="terms" className={`ml-2 block ${theme.typography.body.default} text-[${theme.colors.text.secondary}]`}>
                            Acepto los{' '}
                            <Link
                                to="/terms"
                                className={`font-medium text-[${theme.colors.primary.main}] hover:text-[${theme.colors.primary.main}]/80`}
                            >
                                Términos de Servicio
                            </Link>{' '}
                            y la{' '}
                            <Link
                                to="/privacy"
                                className={`font-medium text-[${theme.colors.primary.main}] hover:text-[${theme.colors.primary.main}]/80`}
                            >
                                Política de Privacidad
                            </Link>
                        </label>
                    </div>
                    <Button type="submit" size="lg" fullWidth disabled={isLoading}>
                        {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                    </Button>
                    <p className={`text-center ${theme.typography.body.default} text-[${theme.colors.text.secondary}]`}>
                        ¿Ya tienes una cuenta?{' '}
                        <Link
                            to="/login"
                            className={`font-medium text-[${theme.colors.primary.main}] hover:text-[${theme.colors.primary.main}]/80`}
                        >
                            Iniciar sesión
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
};

export default Register; 