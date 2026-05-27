import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import api from "../api/axios";

export const useSearchableMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMovies = async () => {
        try {
            const res = await api.get('/movies/searchable');
            setMovies(res.data);
        } catch (error) {
            throw new Error("Error al cargar las películas para búsqueda");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return { movies, loading, fetchMovies };
};