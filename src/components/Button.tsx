import React from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof theme.components.button.variants;
    size?: keyof typeof theme.components.button.sizes;
    fullWidth?: boolean;
    href?: string;
    to?: string;
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    href,
    to,
    isLoading = false,
    className = '',
    ...props
}) => {
    const styles = `${theme.components.button.base} ${theme.components.button.variants[variant]} ${theme.components.button.sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

    if (isLoading) {
        return (
            <button
                className={styles}
                disabled
                {...props}
            >
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
            </button>
        );
    }

    if (to) {
        return (
            <Link to={to} className={styles}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={styles}>
                {children}
            </a>
        );
    }

    return (
        <button
            className={styles}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button; 