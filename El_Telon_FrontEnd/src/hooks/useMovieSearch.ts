import { useMemo } from "react";
import type { Movie } from "../types/Movie";
import { MovieTrie, normalizeMovieQuery } from "../utils/MovieTrie";

export const useMovieSearch = (movies: readonly Movie[], query: string) => {
    const { filteredMovies, suggestions } = useMemo(() => {
        const trie = new MovieTrie();

        movies.forEach((movie: Movie) => {
            trie.insert(movie);
        });

        const normalizedQuery: string = normalizeMovieQuery(query);

        if (normalizedQuery.length === 0) {
            return {
                filteredMovies: Array.from(movies),
                suggestions: [] as Movie[],
            };
        }

        const matchedIds: Set<number> = trie.search(normalizedQuery);

        const matches: Movie[] = movies.filter((movie: Movie) => {
            if (matchedIds.has(movie.id)) {
                return true;
            }

            const normalizedName: string = normalizeMovieQuery(movie.nombre);
            const normalizedCategory: string = normalizeMovieQuery(movie.categoria);

            return (
                normalizedName.includes(normalizedQuery) ||
                normalizedCategory.includes(normalizedQuery)
            );
        });

        return {
            filteredMovies: matches,
            suggestions: matches.slice(0, 5),
        };
    }, [movies, query]);

    return {
        filteredMovies,
        suggestions,
    };
};