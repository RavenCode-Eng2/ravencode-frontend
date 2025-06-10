import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../theme';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = () => {
        login(); // Set isAuthenticated to true
        navigate('/dashboard');
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
                    Welcome back
                </h2>
                <div className="space-y-4">
                    <Input
                        type="email"
                        id="email"
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <Input
                        type="password"
                        id="password"
                        label="Password"
                        placeholder="Enter your password"
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className={`h-4 w-4 rounded border-[${theme.colors.border.main}] bg-[${theme.colors.background.secondary}] text-[${theme.colors.primary.main}] focus:ring-[${theme.colors.primary.main}] focus:ring-offset-[${theme.colors.background.main}]`}
                            />
                            <label htmlFor="remember" className={`ml-2 block ${theme.typography.body.default} text-[${theme.colors.text.secondary}]`}>
                                Remember me
                            </label>
                        </div>
                        <Link
                            to="/forgot-password"
                            className={`${theme.typography.body.default} font-medium text-[${theme.colors.primary.main}] hover:text-[${theme.colors.primary.main}]/80`}
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <Button onClick={handleLogin} size="lg" fullWidth>
                        Sign in
                    </Button>
                    <p className={`text-center ${theme.typography.body.default} text-[${theme.colors.text.secondary}]`}>
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className={`font-medium text-[${theme.colors.primary.main}] hover:text-[${theme.colors.primary.main}]/80`}
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Login; 