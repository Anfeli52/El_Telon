import type { Movie } from "../types/Movie";

interface MovieSearchProps {
    query: string;
    suggestions: Movie[];
    onQueryChange: (value: string) => void;
    onSuggestionSelect: (movie: Movie) => void;
    variant?: "default" | "navbar";
}

const MovieSearch = ({
    query,
    suggestions,
    onQueryChange,
    onSuggestionSelect,
    variant = "default",
}: MovieSearchProps) => {
    const showSuggestions = query.trim().length > 0 && suggestions.length > 0;
    const isNavbarVariant = variant === "navbar";

    return (
        <div className={`movie-search ${isNavbarVariant ? "movie-search--navbar" : ""}`}>
            {!isNavbarVariant && (
                <label className="movie-search__label" htmlFor="movie-search-input">
                    Buscar pelicula
                </label>
            )}

            <div className="movie-search__field">
                <input
                    id="movie-search-input"
                    className="movie-search__input"
                    type="search"
                    placeholder="Escribe un titulo o categoria"
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                />
            </div>

            {showSuggestions && (
                <ul className="movie-search__suggestions">
                    {suggestions.map((movie) => (
                        <li key={movie.id}>
                            <button
                                type="button"
                                className="movie-search__suggestion"
                                onClick={() => onSuggestionSelect(movie)}
                            >
                                <span>{movie.nombre}</span>
                                <span className="movie-search__tag">{movie.categoria}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieSearch;