import { createContext, useState, useContext, type ReactNode, useMemo, useCallback, useEffect } from 'react';
import api from '../api/axios';
import type { AuthResponse, UserCredentials } from '../types/auth';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    token: string | null;
    role: string | null;
    username: string | null;
    login: (credentials: UserCredentials) => Promise<void>;
    register: (credentials: UserCredentials) => Promise<any>;
    logout: () => void;
}

interface JwtPayload {
    role: string; 
    sub: string;
    nombre?: string;
    exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const navigate = useNavigate();

    const logout = useCallback((redirectTo = '/login') => {
        localStorage.removeItem('token');
        setToken(null);
        navigate(redirectTo);
    }, [navigate]);

    const role = useMemo(() => {
        if (!token) return null;
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            return decoded.role;
        } catch (error) {
            console.error("Error decodificando el token:", error);
            return null;
        }
    }, [token]);

    const username = useMemo(() => {
        if (!token) return null;
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            return decoded.nombre ?? decoded.sub;
        } catch (error) {
            console.error("Error decodificando el token:", error);
            return null;
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                const currentTime = Date.now() / 1000; // Tiempo actual en segundos
                const timeLeft = (decoded.exp - currentTime) * 1000; // Milisegundos restantes

                if (timeLeft <= 0) {
                    logout('/login?expired=true');
                } else {
                    const timer = setTimeout(() => {
                        console.warn("Token expirado. Cerrando sesión automáticamente...");
                        logout('/login?expired=true');
                    }, timeLeft);
                    
                    return () => clearTimeout(timer);
                }
            } catch (error) {
                logout();
            }
        }
    }, [token, logout]);

    const login = async (credentials: UserCredentials) => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        const { token: receivedToken, role: receivedRole } = response.data;

        localStorage.setItem('token', receivedToken);
        setToken(receivedToken);

        if (receivedRole === 'ADMIN') {
            navigate('/admin/dashboard');
        } else if (receivedRole === 'WORKER') {
            navigate('/worker/dashboard');
        } else {
            navigate('/cartelera');
        }
    };

    const register = async (credentials: UserCredentials) => {
        try {
            return await api.post('/auth/register', credentials);
        } catch (error) {
            throw error; 
        }
    };



    return (
        <AuthContext.Provider value={{ token, role, username, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};