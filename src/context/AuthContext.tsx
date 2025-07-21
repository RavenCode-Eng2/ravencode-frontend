import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Usuario } from '../types';
import { userService } from '../services/userService';
import { TokenManager } from '../utils/tokenManager';

interface AuthContextType {
    isAuthenticated: boolean;
    user: Usuario | null;
    login: () => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
    updateUserData: (userData: Usuario) => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<Usuario | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshUser = async () => {
        const hasTokens = TokenManager.hasValidTokens();
        console.log('[AuthContext] refreshUser - Has valid tokens:', hasTokens);
        
        if (!hasTokens) {
            console.log('[AuthContext] No valid tokens found, setting unauthenticated');
            setIsAuthenticated(false);
            setUser(null);
            return;
        }

        try {
            console.log('[AuthContext] Fetching user data from server...');
            const response = await userService.getCurrentUser();
            console.log('[AuthContext] User data received from server:', response.data);
            
            if (!response.data) {
                console.log('[AuthContext] No user data received, setting unauthenticated');
                setIsAuthenticated(false);
                setUser(null);
                TokenManager.clearTokens();
                return;
            }

            // Store user data in localStorage for future use
            TokenManager.setUserData(response.data);
            setUser(response.data);
            setIsAuthenticated(true);
            console.log('[AuthContext] Authentication successful, user data cached');
        } catch (error) {
            console.error('[AuthContext] Error fetching user data:', error);
            
            // Check if it's a session expired error
            if (error instanceof Error && error.message === 'Session expired') {
                console.log('[AuthContext] Session expired, clearing tokens');
                TokenManager.clearTokens();
            }
            
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const initializeAuth = async () => {
        console.log('[AuthContext] Initializing authentication...');
        
        const hasTokens = TokenManager.hasValidTokens();
        const cachedUserData = TokenManager.getUserData();
        
        console.log('[AuthContext] Has tokens:', hasTokens);
        console.log('[AuthContext] Has cached user data:', !!cachedUserData);
        
        if (!hasTokens) {
            console.log('[AuthContext] No tokens, setting unauthenticated');
            setIsAuthenticated(false);
            setUser(null);
            setIsLoading(false);
            return;
        }

        if (cachedUserData) {
            console.log('[AuthContext] Using cached user data');
            setUser(cachedUserData);
            setIsAuthenticated(true);
            setIsLoading(false);
        } else {
            console.log('[AuthContext] No cached user data, fetching from server');
            await refreshUser();
            setIsLoading(false);
        }
    };

    useEffect(() => {
        initializeAuth();
    }, []);

    const login = async () => {
        console.log('[AuthContext] Login called - fetching fresh user data');
        setIsLoading(true);
        await refreshUser();
        setIsLoading(false);
    };

    const logout = () => {
        console.log('[AuthContext] Logout called');
        TokenManager.clearTokens();
        setIsAuthenticated(false);
        setUser(null);
    };

    const updateUserData = (userData: Usuario) => {
        TokenManager.setUserData(userData);
        setUser(userData);
        console.log('[AuthContext] User data updated in context');
    };

    console.log('[AuthContext] Current state:', { isAuthenticated, user: !!user, isLoading });

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, refreshUser, updateUserData, isLoading }}>
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