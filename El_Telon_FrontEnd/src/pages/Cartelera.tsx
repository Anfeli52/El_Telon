import { useMovies } from "../hooks/useMovies";
import "../styles/cartelera.css";

import { useNavigate } from 'react-router-dom';
import { Carousel } from "../components/Carousel";
import MovieCard from '../components/MovieCard';

export const Cartelera = () => {
    const { movies, loading } = useMovies();
    const isEmpty = !loading && movies.length === 0;
    const navigate = useNavigate();


    const handleMovieClick = (movieId: number) => {
        navigate(`/peliculas/${movieId}/asientos`);
    };

    return (
        <main className="cartelera">
            <header className="cartelera__hero">
                <p className="cartelera__eyebrow">Cartelera</p>
                <h1>Películas disponibles</h1>
                <p>Selecciona una película para revisar su información y continuar con la reserva.</p>
            </header>

            <section className="cartelera__carousel" aria-label="Promociones destacadas">
                <Carousel />
            </section>

            {loading && <div className="cartelera-state">Cargando películas...</div>}

            {!loading && isEmpty && (
                <div className="cartelera-state">Todavía no hay películas agregadas.</div>
            )}

            {!loading && !isEmpty && (
                <section className="cartelera__grid">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onSelect={handleMovieClick}
                        />
                    ))}
                </section>
            )}
        </main>
    )
}