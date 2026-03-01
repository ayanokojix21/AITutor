import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Check local storage for initial auth state (simple mock)
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('classmind_auth') === 'true';
    });
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            setUser({ name: 'Student Account', plan: 'Pro Plan' });
            localStorage.setItem('classmind_auth', 'true');
        } else {
            setUser(null);
            localStorage.removeItem('classmind_auth');
        }
    }, [isAuthenticated]);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
