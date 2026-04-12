import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'

const Navbar = () => {
    const { token, logout } = useAuth();

    return (
        <nav className="navbar">
            <h2 className="navbar__brand">🎭 El Telón</h2>

            <div className="navbar__actions">
                {token ? (
                <>
                    <Link to="/cartelera" className="nav-link">Cartelera</Link>
                    <button onClick={logout} className="btn btn-danger">
                        Cerrar Sesión
                    </button>
                </>
                ) : (
                <>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Registro</Link>
                </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;