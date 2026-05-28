import { createContext, useState, useContext, type ReactNode, useMemo, useCallback, useEffect } from 'react';
import api from '../api/axios';
import type { AuthResponse, UserCredentials } from '../types/auth';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { firebaseAuth, hasFirebaseConfig } from '../firebase';
import { useRef } from 'react';
import { isJwtExpired } from '../utils/authToken';

interface AuthContextType {
    token: string | null;
    role: string | null;
    username: string | null;
    email: string | null;
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
    const [token, setToken] = useState<string | null>(() => {
        const storedToken = localStorage.getItem('token');

        if (isJwtExpired(storedToken)) {
            localStorage.removeItem('token');
            return null;
        }

        return storedToken;
    });
    const navigate = useNavigate();
    const isSynchronizingFirebaseSession = useRef(false);
    const isLoggingOut = useRef(false);

    const logout = useCallback(async (redirectTo = '/login') => {
        isLoggingOut.current = true;
        localStorage.removeItem('token');
        setToken(null);
        navigate(redirectTo, { replace: true });

        if (firebaseAuth) {
            void signOut(firebaseAuth)
                .catch((error) => {
                    console.warn('No se pudo cerrar la sesión de Firebase:', error);
                })
                .finally(() => {
                    isLoggingOut.current = false;
                });
            return;
        }

        isLoggingOut.current = false;
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

    const email = useMemo(() => {
        if (!token) return null;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            return decoded.sub ?? null;
        } catch (error) {
            console.error("Error decodificando el token:", error);
            return null;
        }
    }, [token]);

    useEffect(() => {
        if (!token) {
            return;
        }

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const currentTime = Date.now() / 1000;
            const timeLeft = ((decoded.exp ?? 0) - currentTime) * 1000;

            if (timeLeft <= 0 || isJwtExpired(token)) {
                void logout('/login?expired=true');
                return;
            }

            const timer = setTimeout(() => {
                console.warn('Token expirado. Cerrando sesión automáticamente...');
                void logout('/login?expired=true');
            }, timeLeft);

            return () => clearTimeout(timer);
        } catch (error) {
            void logout('/login?expired=true');
        }
    }, [token, logout]);

    const exchangeFirebaseToken = useCallback(async (idToken: string, nombre?: string) => {
        const response = await api.post<AuthResponse>('/auth/firebase', { idToken, nombre });
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
    }, [navigate]);

    const login = async (credentials: UserCredentials) => {
        if (!firebaseAuth || !hasFirebaseConfig) {
            throw new Error('Firebase no está configurado en el frontend');
        }

        isSynchronizingFirebaseSession.current = true;
        const firebaseUserCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            credentials.correo,
            credentials.password ?? '',
        );

        try {
            const idToken = await firebaseUserCredential.user.getIdToken();
            await exchangeFirebaseToken(idToken);
        } catch (error) {
            await signOut(firebaseAuth);
            throw error;
        } finally {
            isSynchronizingFirebaseSession.current = false;
        }
    };

    const register = async (credentials: UserCredentials) => {
        if (!firebaseAuth || !hasFirebaseConfig) {
            throw new Error('Firebase no está configurado en el frontend');
        }

        isSynchronizingFirebaseSession.current = true;
        try {
            const firebaseUserCredential = await createUserWithEmailAndPassword(
                firebaseAuth,
                credentials.correo,
                credentials.password ?? '',
            );

            if (credentials.nombre) {
                await updateProfile(firebaseUserCredential.user, { displayName: credentials.nombre });
            }

            const idToken = await firebaseUserCredential.user.getIdToken();
            await exchangeFirebaseToken(idToken, credentials.nombre);
            return firebaseUserCredential;
        } catch (error) {
            await signOut(firebaseAuth);
            throw error; 
        } finally {
            isSynchronizingFirebaseSession.current = false;
        }
    };

    useEffect(() => {
        if (!firebaseAuth || !hasFirebaseConfig) {
            return;
        }

        const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
            if (!firebaseUser || token || isSynchronizingFirebaseSession.current || isLoggingOut.current) {
                return;
            }

            try {
                const idToken = await firebaseUser.getIdToken();
                await exchangeFirebaseToken(idToken, firebaseUser.displayName ?? undefined);
            } catch (error) {
                console.error('No se pudo sincronizar la sesión de Firebase:', error);
            }
        });

        return unsubscribe;
    }, [token, exchangeFirebaseToken, hasFirebaseConfig]);



    return (
        <AuthContext.Provider value={{ token, role, username, email, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};