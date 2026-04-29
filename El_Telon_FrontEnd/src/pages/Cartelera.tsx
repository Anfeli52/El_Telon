import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import type { Movie } from '../types/Movie';
import MovieCard from '../components/MovieCard';
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
                <p>Selecciona una pelicula para revisar su informacion y continuar con la reserva.</p>
            </header>

            <section className="cartelera__grid">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onSelect={handleMovieClick}
                    />
                ))}
            </section>
        </main>
    );
};
