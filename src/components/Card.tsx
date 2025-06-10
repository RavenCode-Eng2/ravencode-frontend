import React from 'react';
import { theme } from '../theme';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    noPadding = false,
    ...props
}) => {
    return (
        <div
            className={`
                ${theme.components.card.base}
                ${!noPadding ? theme.spacing.padding.card : ''}
                ${className}
            `}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card; 