import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Usuario } from '../types';
import { userService } from '../services/userService';

interface AuthContextType {
    isAuthenticated: boolean;
    user: Usuario | null;
    login: () => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<Usuario | null>(null);

    const refreshUser = async () => {
        try {
            const response = await userService.getCurrentUser();
            console.log('User data from /me endpoint:', response.data);
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error fetching user data:', error);
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                await refreshUser();
            }
        };

        validateToken();
    }, []);

    const login = async () => {
        setIsAuthenticated(true);
        await refreshUser();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 