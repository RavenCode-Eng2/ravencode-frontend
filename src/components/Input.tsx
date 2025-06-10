import React from 'react';
import { theme } from '../theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    id,
    className = '',
    ...props
}) => {
    return (
        <div>
            {label && (
                <label
                    htmlFor={id}
                    className={theme.components.input.label}
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`${theme.components.input.base} ${error ? 'border-red-500' : ''} ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input; 