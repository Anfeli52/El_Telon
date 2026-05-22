import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import { MovieTrie, normalizeMovieQuery } from "../utils/MovieTrie";

export const useMovieSearch = (movies: Movie[]) => {
    const [query, setQuery] = useState("");
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);
    const [suggestions, setSuggestions] = useState<Movie[]>([]);

    useEffect(() => {
        const trie = new MovieTrie();

        movies.forEach((movie) => trie.insert(movie));

        const normalizedQuery = normalizeMovieQuery(query);

        if (!normalizedQuery) {
            setFilteredMovies(movies);
            setSuggestions([]);
            return;
        }

        const matchedIds = trie.search(normalizedQuery);

        const matches = movies.filter((movie) => {
            if (matchedIds.has(movie.id)) {
                return true;
            }

            const normalizedName = normalizeMovieQuery(movie.nombre);
            const normalizedCategory = normalizeMovieQuery(movie.categoria);

            return (
                normalizedName.includes(normalizedQuery) ||
                normalizedCategory.includes(normalizedQuery)
            );
        });

        setFilteredMovies(matches);
        setSuggestions(matches.slice(0, 5));
    }, [movies, query]);

    return {
        query,
        setQuery,
        filteredMovies,
        suggestions,
    };
};