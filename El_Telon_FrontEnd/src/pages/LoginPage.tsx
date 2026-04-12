import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import '../styles/login.css';

const LoginPage = () => {
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    
    const [form, setForm] = useState({ correo: '', password: '' });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const isExpired = searchParams.get('expired') === 'true';

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            await login(form);
        } catch (error) {
            setErrorMsg("Error en las credenciales");
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
                            onChange={e => setForm({ ...form, correo: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            className="input"
                            type="password"
                            placeholder="••••••••"
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>

                    <button className="btn btn-primary" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;