import { Carousel } from "../components/Carousel";
import { useMovies } from "../hooks/useMovies";
import "../styles/cartelera.css";

export const Cartelera = () => {
    const { movies, loading } = useMovies();
    const isEmpty = !loading && movies.length === 0;
    
    return (
        <>
            <div className="bildboard-carousel">
                <Carousel />
            </div>
            <div className="bildboard-container">
                
                {movies.map((movie, index) => (
                    <div key={index} className="bildboard-card">
                        <img src={movie.imagen} alt={movie.nombre} className="bildboard-image" />
                        <div className="bildboard-info">
                            <h3 className="bildboard-title">{movie.nombre}</h3>
                            <p className="bildboard-description">{movie.descripcion}</p>
                        </div>
                    </div>
                ))}
                {loading && <p className="bildboard-status">Cargando películas...</p>}
                {isEmpty && (
                    <div className="bildboard-empty-state">
                        <span className="bildboard-empty-eyebrow">Cartelera vacía</span>
                        <h2 className="bildboard-empty-title">Todavía no hay películas agregadas</h2>
                        <p className="bildboard-empty-text">
                            En cuanto se publiquen nuevas películas, aparecerán aquí para que puedas revisarlas.
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}