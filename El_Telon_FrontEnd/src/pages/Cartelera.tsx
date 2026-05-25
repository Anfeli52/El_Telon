import { useNavigate, useSearchParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import { Carousel } from "../components/Carousel";
import { useMovies } from "../hooks/useMovies";
import { useMovieSearch } from "../hooks/useMovieSearch";
import "../styles/cartelera.css";

export const Cartelera = () => {
    const { movies, loading } = useMovies();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") ?? "";
    const { filteredMovies } = useMovieSearch(movies, query);
    const navigate = useNavigate();

    const isEmpty = !loading && movies.length === 0;
    const hasNoMatches = !loading && movies.length > 0 && filteredMovies.length === 0;

    const handleMovieClick = (movieId: number) => {
        navigate(`/peliculas/${movieId}/asientos`);
    };

    return (
        <main className="cartelera">
            <header className="cartelera__hero">
                <p className="cartelera__eyebrow">Cartelera</p>
                <h1>Peliculas disponibles</h1>
                <p>Selecciona una pelicula para revisar su informacion y continuar con la reserva.</p>
            </header>

            <section className="cartelera__carousel" aria-label="Promociones destacadas">
                <Carousel />
            </section>

            {loading && <div className="cartelera-state">Cargando peliculas...</div>}

            {!loading && isEmpty && (
                <div className="cartelera-state">Todavia no hay peliculas agregadas.</div>
            )}

            {!loading && hasNoMatches && (
                <div className="cartelera-state">No encontramos peliculas para "{query}".</div>
            )}

            {!loading && !isEmpty && !hasNoMatches && (
                <section className="cartelera__grid">
                    {filteredMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onSelect={handleMovieClick}
                        />
                    ))}
                </section>
            )}
        </main>
    );
};