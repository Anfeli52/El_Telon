import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, Menu, UserRound, UserPlus, X, TicketCheck } from 'lucide-react';
import MovieSearch from './MovieSearch';
import { useMovies } from '../hooks/useMovies';
import { useMovieSearch } from '../hooks/useMovieSearch';
import '../styles/navbar.css'

const Navbar = () => {
    const { token, username, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { movies } = useMovies();
    const { suggestions } = useMovieSearch(movies, query);
    const isCartelera = location.pathname === '/cartelera';
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isCartelera) {
            setQuery('');
            return;
        }

        const params = new URLSearchParams(location.search);
        setQuery(params.get('q') ?? '');
    }, [isCartelera, location.search]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!menuRef.current) {
                return;
            }

            if (!menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname, location.search]);

    const updateCarteleraQuery = (value: string) => {
        setQuery(value);

        const params = new URLSearchParams(location.search);
        const trimmedValue = value.trim();

        if (trimmedValue.length > 0) {
            params.set('q', value);
        } else {
            params.delete('q');
        }

        const nextSearch = params.toString();
        navigate(`/cartelera${nextSearch ? `?${nextSearch}` : ''}`);
    };

    return (
        <nav className="navbar">
            <h2 className="navbar__brand">🎭 El Telón</h2>

            {isCartelera && (
                <div className="navbar__search">
                    <MovieSearch
                        query={query}
                        suggestions={suggestions}
                        onQueryChange={updateCarteleraQuery}
                        onSuggestionSelect={(movie) => {
                            updateCarteleraQuery(movie.nombre);
                            navigate(`/peliculas/${movie.id}/asientos`);
                        }}
                        variant="navbar"
                    />
                </div>
            )}

            <div className="navbar__actions">
                <Link to="/cartelera" className="nav-link navbar__cartelera-link">Cartelera</Link>

                <div className="navbar__menu" ref={menuRef}>
                    <button
                        type="button"
                        className="navbar__menu-toggle"
                        onClick={() => setIsMenuOpen((prevState) => !prevState)}
                        aria-expanded={isMenuOpen}
                        aria-controls="navbar-dropdown-menu"
                        aria-label="Abrir menú de navegación"
                    >
                        {isMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
                        <span>{token ? (username ?? 'Usuario') : 'Menú'}</span>
                    </button>

                    {isMenuOpen && (
                        <div id="navbar-dropdown-menu" className="navbar__menu-panel" role="menu">
                            {token ? (
                                <>
                                    <span className="navbar__menu-user" role="none">
                                        <UserRound size={16} aria-hidden="true" />
                                        {username ?? 'Usuario'}
                                    </span>
                                    <Link to="/mis-boletos" className="navbar__menu-item" role="menuitem">
                                        <TicketCheck size={16} aria-hidden="true" />
                                        Mis Boletos
                                    </Link>
                                    <button
                                        type="button"
                                        className="navbar__menu-item navbar__menu-item--danger"
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        role="menuitem"
                                    >
                                        <LogOut size={16} aria-hidden="true" />
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="navbar__menu-item" role="menuitem">
                                        <LogIn size={16} aria-hidden="true" />
                                        Login
                                    </Link>

                                    <Link to="/register" className="navbar__menu-item" role="menuitem">
                                        <UserPlus size={16} aria-hidden="true" />
                                        Registro
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;