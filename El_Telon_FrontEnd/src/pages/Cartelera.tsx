import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import { Carousel } from "../components/Carousel";
import { RecommendedMovies } from "../components/RecommendedMovies";
import { useMovies } from "../hooks/useMovies";
import { useMovieSearch } from "../hooks/useMovieSearch";
import "../styles/cartelera.css";
import { useSearchableMovies } from "../hooks/useSearchableMovies";

export const Cartelera = () => {
    const { movies: visibleMovies, loading: visibleLoading } = useMovies();
    const { movies: searchableMovies, loading: searchableLoading } = useSearchableMovies();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const query = searchParams.get("q") ?? "";
    const { filteredMovies } = useMovieSearch(searchableMovies, query);
    const navigate = useNavigate();
    const recommendationRefreshKey = (location.state as { recommendationRefreshKey?: number } | null)?.recommendationRefreshKey ?? 0;

    const loading = visibleLoading || searchableLoading;
    const isEmpty = !loading && visibleMovies.length === 0;
    const hasNoMatches = !loading && query.length > 0 && searchableMovies.length > 0 && filteredMovies.length === 0;
    const moviesToRender = query.length > 0 ? filteredMovies : visibleMovies;

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

            <section className="cartelera__recommendations" aria-label="Películas Recomendadas">
                <RecommendedMovies refreshKey={recommendationRefreshKey} />
            </section>

            {loading && <div className="cartelera-state">Cargando películas...</div>}

            {!loading && isEmpty && (
                <div className="cartelera-state">Todavia no hay peliculas agregadas.</div>
            )}

            {!loading && hasNoMatches && (
                <div className="cartelera-state">No encontramos peliculas para "{query}".</div>
            )}

            {!loading && !isEmpty && !hasNoMatches && (
                <section className="cartelera__grid">
                    {moviesToRender.map((movie) => (
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