'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import authService, { User } from '@/services/auth.service';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    loginWithFrappe: () => void;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    setSession: (token: string, user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Initialize auth state
    useEffect(() => {
        const initAuth = async () => {
            const token = authService.getToken();
            const savedUser = authService.getCurrentUser();

            if (token && savedUser) {
                // Should verify token validity here or fetch fresh user data
                // For now we trust localStorage but in real app we'd call /auth/me
                setUser(savedUser);
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const loginWithFrappe = () => {
        authService.initiateOAuthLogin();
    };

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            const response = await authService.login({ email, password });

            if (response.user) {
                setUser(response.user);

                // Redirect based on role
                const role = response.user.roleId === 1 ? 'admin' : 'user'; // Simplified role logic
                if (role === 'admin') {
                    router.push('/admin');
                } else {
                    router.push('/');
                }
            }
        } catch (error: any) {
            console.error('Login error:', error);
            throw new Error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const setSession = (token: string, user: User) => {
        authService.setSession(token, user);
        setUser(user);
    };

    const logout = async () => {
        try {
            setLoading(true);
            await authService.logout();
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoading(false);
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        login,
        loginWithFrappe,
        logout,
        isAuthenticated: !!user,
        setSession,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
