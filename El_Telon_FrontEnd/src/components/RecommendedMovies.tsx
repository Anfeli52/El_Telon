import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import type { Movie } from '../types/Movie';
import '../styles/recommended-movies.css';

interface JwtPayload {
    role: string; 
    sub: string;
    nombre?: string;
    exp: number;
}

export const RecommendedMovies = () => {
    const { token, username } = useAuth(); 
    
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchRecommendations = async () => {
            try {
                setLoading(true);
                
                const decoded = jwtDecode<JwtPayload>(token);
                const userId = decoded.sub; 

                const response = await api.get<Movie[]>(`/movies/recomendaciones/${userId}`);
                setMovies(response.data);
                setError(null);
            } catch (err) {
                console.error("Error al cargar las recomendaciones del grafo:", err);
                setError("No pudimos cargar tus recomendaciones en este momento.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [token]);

    if (!token) return null;

    if (loading) {
        return (
            <div className="flex justify-center items-center my-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                <p className="ml-2 text-gray-400">Calculando tus recomendaciones ideales en el grafo...</p>
            </div>
        );
    }

    if (error) return <p className="text-red-400 text-center my-4">{error}</p>;
    if (movies.length === 0) return null; 

    return (
        <section className="recommended-movies">
            <div className="recommended-movies__header">
                <h2 className="recommended-movies__title">
                    Recomendado para ti, {username || 'Espectador'}
                </h2>
            </div>

            <div className="recommended-movies__grid">
                {movies.map((movie) => (
                    <div 
                        key={movie.id}
                        className="recommended-movies__card"
                    >
                        <div className="recommended-movies__image-wrapper">
                            <img 
                                src={movie.imagen} 
                                alt={movie.nombre}
                                className="recommended-movies__image"
                                loading="lazy"
                            />
                            <div className="recommended-movies__overlay" />
                            
                            <div className="recommended-movies__info">
                                <div className="recommended-movies__meta">
                                    <span className="recommended-movies__duration">
                                        {movie.duracion} min
                                    </span>
                                </div>
                                <p className="recommended-movies__description">
                                    {movie.descripcion}
                                </p>
                            </div>
                        </div>

                        <div className="recommended-movies__card-body">
                            <h3 className="recommended-movies__card-title">
                                {movie.nombre}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};