import type { Movie } from '../types/Movie';

interface MovieCardProps {
    movie: Movie;
    onSelect: (movieId: number) => void;
}

const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
    return (
        <article className="movie-card">
            <button
                type="button"
                className="movie-card__image-button"
                onClick={() => onSelect(movie.id)}
            >
                <img
                    src={movie.imagen}
                    alt={movie.nombre}
                    className="movie-card__image"
                />
            </button>

            <div className="movie-card__content">
                <span className="movie-card__category">{movie.categoria}</span>
                <h2>{movie.nombre}</h2>
                <p>{movie.descripcion}</p>

                <div className="movie-card__meta">
                    <span>{movie.duracion} min</span>
                    <span>{movie.fechaEstreno}</span>
                </div>

                <button
                    type="button"
                    className="movie-card__action"
                    onClick={() => onSelect(movie.id)}
                >
                    Ver funciones
                </button>
            </div>
        </article>
    );
};

export default MovieCard;
