import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import type { Movie } from '../types/Movie';
import '../styles/cartelera.css';

export const Cartelera = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get<Movie[]>('/movies/available');
                setMovies(response.data);
            } catch {
                setError('No se pudieron cargar las peliculas disponibles.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleMovieClick = (movieId: number) => {
        navigate(`/peliculas/${movieId}/asientos`);
    };

    if (loading) {
        return <div className="cartelera-state">Cargando cartelera...</div>;
    }

    if (error) {
        return <div className="cartelera-state cartelera-state--error">{error}</div>;
    }

    return (
        <main className="cartelera">
            <header className="cartelera__hero">
                <p className="cartelera__eyebrow">Cartelera</p>
                <h1>Peliculas disponibles</h1>
                <p>Selecciona una pelicula para continuar con la reserva de puestos.</p>
            </header>

            <section className="cartelera__grid">
                {movies.map((movie) => (
                    <article key={movie.id} className="movie-card">
                        <button
                            type="button"
                            className="movie-card__image-button"
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            <img
                                src={movie.imagen}
                                alt={movie.nombre}
                                className="movie-card__image"
                            />
                        </button>

                        <div className="movie-card__content">
                            <span className="movie-card__category">{movie.categoria}</span>
                            <h2>{movie.nombre}</h2>
                            <p>{movie.descripcion}</p>

                            <div className="movie-card__meta">
                                <span>{movie.duracion} min</span>
                                <span>{movie.fechaEstreno}</span>
                            </div>

                            <button
                                type="button"
                                className="movie-card__action"
                                onClick={() => handleMovieClick(movie.id)}
                            >
                                Seleccionar puestos
                            </button>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
};
