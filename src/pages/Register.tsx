import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../theme';

const Register: React.FC = () => {
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
                    Create your account
                </h2>
                <div className="space-y-4">
                    <Input
                        type="text"
                        id="name"
                        label="Full Name"
                        placeholder="Enter your full name"
                    />
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
                        placeholder="Create a password"
                    />
                    <Input
                        type="password"
                        id="confirm-password"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                    />
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            className={`h-4 w-4 rounded border-[${theme.colors.border.main}] bg-[${theme.colors.background.secondary}] text-[${theme.colors.primary.main}] focus:ring-[${theme.colors.primary.main}] focus:ring-offset-[${theme.colors.background.main}]`}
                        />
                        <label htmlFor="terms" className={`ml-2 block ${theme.typography.body.default} text-[${theme.colors.text.secondary}]`}>
                            I agree to the{' '}
                            <Link
                                to="/terms"
                                className={`font-medium text-[${theme.colors.primary.main}] hover:text-[${theme.colors.primary.main}]/80`}
                            >
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                                to="/privacy"
                                className={`font-medium text-[${theme.colors.primary.main}] hover:text-[${theme.colors.primary.main}]/80`}
                            >
                                Privacy Policy
                            </Link>
                        </label>
                    </div>
                    <Button size="lg" fullWidth>
                        Create Account
                    </Button>
                    <p className={`text-center ${theme.typography.body.default} text-[${theme.colors.text.secondary}]`}>
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className={`font-medium text-[${theme.colors.primary.main}] hover:text-[${theme.colors.primary.main}]/80`}
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Register; 