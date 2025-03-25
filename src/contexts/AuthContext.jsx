import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const user = authService.getCurrentUser();
        setCurrentUser(user);
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        setCurrentUser(response.user);
        return response;
    };

    const logout = () => {
        authService.logout();
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        loading,
        login,
        logout,
        isAuthenticated: authService.isAuthenticated
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);