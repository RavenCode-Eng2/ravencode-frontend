import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../theme';
import { useLogin } from '../hooks/useApi';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login: authLogin, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginMutation = useLogin();

    // Redirect if already authenticated
    useEffect(() => {
        console.log('[Login] useEffect - isAuthenticated:', isAuthenticated);
        console.log('[Login] useEffect - current location:', location);
        
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || '/dashboard';
            console.log('[Login] Redirecting to:', from);
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    const handleLogin = async () => {
        try {
            console.log('[Login] Attempting login with email:', email);
            setError('');
            
            console.log('[Login] Calling loginMutation...');
            const result = await loginMutation.mutateAsync({ email, password });
            console.log('[Login] Login mutation result:', result);
            
            console.log('[Login] Calling authLogin...');
            await authLogin();
            console.log('[Login] Auth login completed');
            
        } catch (err: any) {
            console.error('[Login] Login error:', err);
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !loginMutation.isPending && email && password) {
            handleLogin();
        }
    };

    return (
        <main className="flex flex-1 items-center justify-center">
            <div className={`w-full ${theme.spacing.container.default} max-w-[512px]`}>
                <div className="flex justify-center mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-[${theme.colors.primary.light}] flex items-center justify-center`}>
                        <span className={`text-[${theme.colors.text.dark}] text-2xl font-bold`}>CQ</span>
                    </div>
                </div>
                <h2 className={`${theme.typography.heading.h2} text-${theme.colors.text.primary} text-center mb-8`}>
                    Bienvenido de nuevo
                </h2>
                {error && (
                    <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-center">
                        {error}
                    </div>
                )}
                <div className="space-y-4">
                    <Input
                        type="email"
                        id="email"
                        label="Correo electrónico"
                        placeholder="Ingresa tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <Input
                        type="password"
                        id="password"
                        label="Contraseña"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className={`h-4 w-4 rounded border-[${theme.colors.border.main}] bg-[${theme.colors.background.secondary}] text-[${theme.colors.primary.main}] focus:ring-[${theme.colors.primary.main}] focus:ring-offset-[${theme.colors.background.main}]`}
                            />
                            <label htmlFor="remember" className={`ml-2 block ${theme.typography.body.default} text-[${theme.colors.text.secondary}]`}>
                                Recordarme
                            </label>
                        </div>
                        <Link
                            to="/forgot-password"
                            className={`${theme.typography.body.default} font-medium text-[${theme.colors.primary.main}] hover:text-[${theme.colors.primary.main}]/80`}
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <Button
                        onClick={handleLogin}
                        size="lg"
                        fullWidth
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </Button>
                    <p className={`text-center ${theme.typography.body.default} text-[${theme.colors.text.secondary}]`}>
                        ¿No tienes una cuenta?{' '}
                        <Link
                            to="/register"
                            className={`font-medium text-[${theme.colors.primary.main}] hover:text-[${theme.colors.primary.main}]/80`}
                        >
                            Regístrate
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Login; 