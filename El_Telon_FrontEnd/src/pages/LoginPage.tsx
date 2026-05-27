import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import '../styles/login.css';

interface ApiErrorResponse {
    message?: string;
}

const getLoginErrorMessage = (error: unknown) => {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const firebaseError = error as { code?: string; message?: string };

    switch (firebaseError.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
        case 'auth/invalid-email':
        case 'auth/invalid-login-credentials':
            return 'Correo o contraseña incorrectos.';
        case 'auth/network-request-failed':
            return 'No se pudo conectar con Firebase. Verifica tu conexión.';
        default:
            break;
    }

    if (axiosError.response?.data?.message) {
        return axiosError.response.data.message;
    }

    if (axiosError.response?.status === 401) {
        return 'Correo o contraseña incorrectos.';
    }

    if (axiosError.response?.status === 500) {
        return 'El servidor tuvo un error. Revisa el backend y la base de datos.';
    }

    return 'No se pudo conectar con el servidor.';
};

const LoginPage = () => {
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    
    const [form, setForm] = useState({ correo: '', password: '' });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const isExpired = searchParams.get('expired') === 'true';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);

        try {
            await login(form);
        } catch (error) {
            setErrorMsg(getLoginErrorMessage(error));
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Iniciar Sesión</h2>
                <p className="auth-subtitle">Accede a tu cuenta para ver la cartelera.</p>

                {isExpired && (
                    <div className="alert alert-warning">
                        ⚠️ Tu sesión ha expirado por seguridad. Por favor, ingresa de nuevo.
                    </div>
                )}

                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Correo</label>
                        <input
                            className="input"
                            type="email"
                            placeholder="Tu correo"
                            required
                            onChange={e => setForm({ ...form, correo: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            className="input"
                            type="password"
                            placeholder="••••••••"
                            minLength={6}
                            required
                            onChange={e => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <button className="btn btn-primary" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
