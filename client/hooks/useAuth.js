'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(null);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            const response = await apiClient.get('/auth/me');
            if (response.success) {
                setIsAuthenticated(true);
                setAdmin(response.admin);
            } else {
                localStorage.removeItem('adminToken');
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('adminToken');
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await apiClient.post('/auth/login', { email, password }, { auth: false });
            if (response.success) {
                localStorage.setItem('adminToken', response.token);
                setIsAuthenticated(true);
                setAdmin(response.admin);
                return { success: true };
            }
            return { success: false, message: response.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        setAdmin(null);
        router.push('/admin/login');
    };

    return {
        isAuthenticated,
        loading,
        admin,
        login,
        logout,
        checkAuth
    };
}
