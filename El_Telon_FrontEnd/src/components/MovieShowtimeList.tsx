/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import type { MovieShowtimeGroup } from '../types/Movie';

interface MovieShowtimeListProps {
    showtimeGroups: MovieShowtimeGroup[];
    activeDateLabel?: string;
}

const MovieShowtimeList = ({
    showtimeGroups,
    activeDateLabel
}: MovieShowtimeListProps) => {
    const [openTheater, setOpenTheater] = useState('');

    useEffect(() => {
        if (showtimeGroups.length > 0) {
            setOpenTheater(showtimeGroups[0].theater);
        }
    }, [showtimeGroups]);

    return (
        <div className="movie-detail__schedule-card">
            <div className="movie-detail__schedule-header">
                <h3>Horarios disponibles</h3>
                <span>{activeDateLabel}</span>
            </div>

            {showtimeGroups.length === 0 && (
                <p className="movie-detail__empty-message">
                    No hay horarios disponibles para esta fecha.
                </p>
            )}

            {showtimeGroups.map((group) => {
                const isOpen = openTheater === group.theater;

                return (
                    <article key={group.theater} className="movie-detail__theater">
                        <button
                            type="button"
                            className="movie-detail__theater-toggle"
                            onClick={() =>
                                setOpenTheater((current) =>
                                    current === group.theater ? '' : group.theater
                                )
                            }
                        >
                            <span>{group.theater}</span>
                            <span>{isOpen ? '-' : '+'}</span>
                        </button>

                        {isOpen && (
                            <div className="movie-detail__showtimes">
                                <p className="movie-detail__format">
                                    {group.format} - {group.language}
                                </p>

                                <div className="movie-detail__times">
                                    {group.times.map((time) => (
                                        <button
                                            key={time}
                                            type="button"
                                            className="movie-detail__time-button"
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>
                );
            })}
        </div>
    );
};

export default MovieShowtimeList;
