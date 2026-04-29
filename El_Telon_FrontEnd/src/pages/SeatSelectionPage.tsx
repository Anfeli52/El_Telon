import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axios';
import type {
    MovieDateOption,
    MovieDetail,
    MovieShowtimeGroup,
    MovieShowtimeResponse
} from '../types/Movie';
import MovieDateSelector from '../components/MovieDateSelector';
import MovieInfoPanel from '../components/MovieInfoPanel';
import MovieShowtimeList from '../components/MovieShowtimeList';
import '../styles/seat-selection.css';

const SeatSelectionPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [dates, setDates] = useState<MovieDateOption[]>([]);
    const [schedules, setSchedules] = useState<Record<string, MovieShowtimeGroup[]>>({});
    const [selectedDateId, setSelectedDateId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const [movieResponse, showtimeResponse] = await Promise.all([
                    api.get<MovieDetail>(`/movies/${movieId}`),
                    api.get<MovieShowtimeResponse>(`/movies/${movieId}/showtimes`)
                ]);

                setMovie(movieResponse.data);
                setDates(showtimeResponse.data.dates);
                setSchedules(showtimeResponse.data.schedules);

                const firstDate = showtimeResponse.data.dates[0]?.id ?? '';
                setSelectedDateId(firstDate);
            } catch {
                setError('No se pudo cargar la informacion de la pelicula.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieData();
    }, [movieId]);

    const activeDate = useMemo(
        () => dates.find((date) => date.id === selectedDateId),
        [dates, selectedDateId]
    );

    const showtimeGroups = schedules[selectedDateId] ?? [];

    if (loading) {
        return <div className="cartelera-state">Cargando informacion de la pelicula...</div>;
    }

    if (error || !movie) {
        return (
            <main className="movie-detail movie-detail--empty">
                <div className="movie-detail__empty-card">
                    <h1>Pelicula no encontrada</h1>
                    <p>{error ?? 'La pelicula seleccionada no esta disponible.'}</p>
                    <Link to="/cartelera" className="movie-detail__back-link">
                        Volver a cartelera
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="movie-detail">
            <div className="movie-detail__container">
                <div className="movie-detail__topbar">
                    <Link to="/cartelera" className="movie-detail__back-link">
                        Volver a cartelera
                    </Link>
                    <span className="movie-detail__runtime">{movie.duracion} min</span>
                </div>

                <section className="movie-detail__layout">
                    <aside className="movie-detail__poster-column">
                        <img
                            className="movie-detail__poster"
                            src={movie.poster}
                            alt={movie.nombre}
                        />
                    </aside>

                    <MovieInfoPanel movie={movie} />

                    <aside className="movie-detail__schedule">
                        <MovieDateSelector
                            dates={dates}
                            selectedDateId={selectedDateId}
                            onSelectDate={setSelectedDateId}
                        />

                        <MovieShowtimeList
                            showtimeGroups={showtimeGroups}
                            activeDateLabel={activeDate?.dayLabel}
                        />
                    </aside>
                </section>
            </div>
        </main>
    );
};

export default SeatSelectionPage;
