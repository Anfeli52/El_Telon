import type { MovieDetail } from '../types/Movie';

interface MovieInfoPanelProps {
    movie: MovieDetail;
}

const MovieInfoPanel = ({ movie }: MovieInfoPanelProps) => {
    return (
        <section className="movie-detail__summary">
            <header className="movie-detail__header">
                <p className="movie-detail__eyebrow">{movie.categoria}</p>
                <h1>{movie.nombre}</h1>
            </header>

            <div className="movie-detail__synopsis">
                <h2>Sinopsis</h2>
                <p>{movie.descripcion}</p>
            </div>

            <dl className="movie-detail__info">
                <div>
                    <dt>Nombre original:</dt>
                    <dd>{movie.tituloOriginal}</dd>
                </div>
                <div>
                    <dt>Clasificacion:</dt>
                    <dd>{movie.clasificacion}</dd>
                </div>
                <div>
                    <dt>Reparto:</dt>
                    <dd>{movie.reparto}</dd>
                </div>
                <div>
                    <dt>Director:</dt>
                    <dd>{movie.director}</dd>
                </div>
            </dl>
        </section>
    );
};

export default MovieInfoPanel;
