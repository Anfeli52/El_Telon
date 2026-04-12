import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/register.css';

const RegisterPage = () => {
    const [form, setForm] = useState({nombre: '', correo: '', password: '' });
    const { register } = useAuth();

    const handleRegister = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            await register(form);
            alert("Usuario creado. Ahora puedes loguearte.");
        } catch (error: any) {
            console.log("Cuerpo del error:", error.response?.data);
            const serverMessage = error.response?.data?.message || "Error desconocido al registrar";
            alert("Error: "+serverMessage);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Registro de Usuario</h2>
                <p className="auth-subtitle">Crea tu cuenta para comenzar.</p>

                <form className="auth-form" onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input className="input" type="text" placeholder="Nombre completo" onChange={e => setForm({ ...form, nombre: e.target.value })}/>
                    </div>

                    <div className="form-group">
                        <label>Correo</label>
                        <input className="input" type="text" placeholder="Correo electrónico" onChange={e => setForm({ ...form, correo: e.target.value })}/>
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input className="input" type="password" placeholder="Crea una contraseña" onChange={e => setForm({ ...form, password: e.target.value })}/>
                    </div>

                    <button className="btn btn-primary" type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;