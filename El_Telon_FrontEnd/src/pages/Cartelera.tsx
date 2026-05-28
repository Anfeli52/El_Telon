import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

import MovieCard from "../components/MovieCard";
import { Carousel } from "../components/Carousel";
import { RecommendedMovies } from "../components/RecommendedMovies";
import { useSearchableMovies } from "../hooks/useSearchableMovies";
import { useMovieSearch } from "../hooks/useMovieSearch";
import "../styles/cartelera.css";

const CATEGORY_LABELS: Record<string, string> = {
    ACCION: 'Acción',
    COMEDIA: 'Comedia',
    DRAMA: 'Drama',
    TERROR: 'Terror',
    CIENCIA_FICCION: 'Ciencia ficción',
    ANIMACION: 'Animación',
    SUSPENSO: 'Suspenso',
    ROMANCE: 'Romance',
};

export const Cartelera = () => {
    const { movies: visibleMovies, loading: visibleLoading } = useSearchableMovies();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const query = searchParams.get("q") ?? "";
    const selectedCategory = searchParams.get('category') ?? 'TODAS';
    const { filteredMovies } = useMovieSearch(visibleMovies, query);
    const navigate = useNavigate();
    const recommendationRefreshKey = (location.state as { recommendationRefreshKey?: number } | null)?.recommendationRefreshKey ?? 0;

    const loading = visibleLoading;
    const isEmpty = !loading && visibleMovies.length === 0;
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(visibleMovies.map((movie) => movie.categoria)));

        return ['TODAS', ...uniqueCategories];
    }, [visibleMovies]);

    const moviesAfterSearch = query.length > 0 ? filteredMovies : visibleMovies;
    const moviesToRender = useMemo(() => {
        if (selectedCategory === 'TODAS') {
            return moviesAfterSearch;
        }

        return moviesAfterSearch.filter((movie) => movie.categoria === selectedCategory);
    }, [moviesAfterSearch, selectedCategory]);

    const hasNoMatches = !loading && moviesAfterSearch.length > 0 && moviesToRender.length === 0;

    const handleMovieClick = (movieId: number) => {
        navigate(`/peliculas/${movieId}/asientos`);
    };

    const handleCategorySelect = (category: string) => {
        const nextParams = new URLSearchParams(searchParams);

        if (category === 'TODAS') {
            nextParams.delete('category');
        } else {
            nextParams.set('category', category);
        }

        const nextSearch = nextParams.toString();
        navigate(`/cartelera${nextSearch ? `?${nextSearch}` : ''}`);
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

            <section className="cartelera__filters-section" aria-label="Filtros por categoría">
                <div className="cartelera__filters" aria-label="Filtrar películas por categoría">
                    <span className="cartelera__filters-label">Categorías</span>
                    <div className="cartelera__filters-list">
                        {categories.map((category) => {
                            const isActive = selectedCategory === category || (category === 'TODAS' && selectedCategory === 'TODAS');

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    className={`cartelera__filter-chip ${isActive ? 'is-active' : ''}`}
                                    onClick={() => handleCategorySelect(category)}
                                >
                                    {category === 'TODAS' ? 'Todas' : CATEGORY_LABELS[category] ?? category}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {loading && <div className="cartelera-state">Cargando películas...</div>}

            {!loading && isEmpty && (
                <div className="cartelera-state">Todavia no hay peliculas agregadas.</div>
            )}

            {!loading && hasNoMatches && (
                <div className="cartelera-state">
                    No encontramos peliculas para esta búsqueda.
                </div>
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