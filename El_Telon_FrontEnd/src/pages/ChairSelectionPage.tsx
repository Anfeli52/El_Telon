import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import type { FunctionSeats, Seat, SeatReservation } from '../types/Movie';
import '../styles/seat-selection.css';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const leftNumbers = [17, 16, 15, 14, 13, 12, 11];
const rightNumbers = [8, 7, 6, 5, 4, 3, 2, 1];

const ChairSelectionPage = () => {
    const { functionId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<FunctionSeats | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadSeats = async () => {
            try {
                const response = await api.get<FunctionSeats>(`/seats/functions/${functionId}`);
                setData(response.data);
            } catch {
                setError('No se pudo cargar la sala.');
            } finally {
                setLoading(false);
            }
        };

        loadSeats();
    }, [functionId]);

    const seatsByKey = useMemo(() => {
        const map = new Map<string, Seat>();
        data?.seats.forEach((seat) => {
            map.set(`${seat.row}-${seat.number}`, seat);
        });
        return map;
    }, [data]);

    const toggleSeat = (seat: Seat) => {
        if (!seat.available) {
            return;
        }

        setSelectedSeats((current) =>
            current.includes(seat.id)
                ? current.filter((id) => id !== seat.id)
                : [...current, seat.id]
        );
    };

    const goToPayment = async () => {
        if (selectedSeats.length === 0) {
            return;
        }

        try {
            const response = await api.post<SeatReservation>(
                `/seats/functions/${functionId}/reserve`,
                { seatIds: selectedSeats }
            );

            navigate(
                `/funciones/${functionId}/pago?asientos=${selectedSeats.join(',')}&reservationToken=${response.data.reservationToken}`
            );
        } catch {
            setError('No se pudieron reservar temporalmente las sillas seleccionadas.');
        }
    };

    if (loading) {
        return <div className="cartelera-state">Cargando sillas...</div>;
    }

    if (error || !data) {
        return (
            <main className="chairs-page">
                <section className="chairs-empty">
                    <h1>No se encontro la funcion</h1>
                    <p>{error || 'Intenta con otro horario.'}</p>
                    <Link to="/cartelera">Volver</Link>
                </section>
            </main>
        );
    }

    const renderSeat = (seat?: Seat) => {
        if (!seat) {
            return <span className="chair chair--ghost" />;
        }

        const selected = selectedSeats.includes(seat.id);
        const className = [
            'chair',
            seat.type === 'VIP' ? 'chair--vip' : 'chair--general',
            seat.type === 'DISCAPACITADO' ? 'chair--wheel' : '',
            !seat.available ? 'chair--busy' : '',
            selected ? 'chair--selected' : ''
        ].join(' ');

        return (
            <button
                key={seat.id}
                type="button"
                className={className}
                onClick={() => toggleSeat(seat)}
                disabled={!seat.available}
                title={`${seat.row}${seat.number}`}
            >
                {seat.type === 'DISCAPACITADO' ? 'ru' : seat.number}
            </button>
        );
    };

    return (
        <main className="chairs-page">
            <section className="chairs-movie">
                <img src={data.poster} alt={data.movieName} />

                <div className="chairs-movie__main">
                    <div className="chairs-movie__title">
                        <h1>{data.movieName}</h1>
                        <span>{data.classification}</span>
                    </div>
                    <strong>{data.format}</strong>
                </div>

                <div className="chairs-movie__meta">
                    <div>
                        <b>Multiplex</b>
                        <span>{data.cinema}</span>
                    </div>
                    <div>
                        <b>Sala</b>
                        <span>{data.room}</span>
                    </div>
                    <div>
                        <b>Fecha y horario</b>
                        <span>{data.dateLabel}, {data.timeLabel}</span>
                    </div>
                    <div>
                        <b>Duracion</b>
                        <span>{Math.floor(data.duration / 60)}h {data.duration % 60}m</span>
                    </div>
                </div>
            </section>

            <h2 className="chairs-title">Seleccione sus sillas</h2>

            <section className="chairs-legend">
                <span><i className="legend-dot legend-dot--selected" />Silla seleccionada</span>
                <span><i className="legend-dot legend-dot--busy" />No disponible</span>
                <span><i className="legend-dot legend-dot--general" />General</span>
                <span><i className="legend-icon">ru</i>Silla de ruedas</span>
                <span><i className="legend-dot legend-dot--vip" />Preferencial</span>
            </section>

            <section className="chairs-room">
                <div className="screen">
                    <span>Pantalla</span>
                </div>

                <div className="chairs-map">
                    {rows.map((row) => (
                        <div className="chairs-row" key={row}>
                            <span className="row-label">{row}</span>
                            <div className="chairs-side">
                                {leftNumbers.map((number) => renderSeat(seatsByKey.get(`${row}-${number}`)))}
                            </div>
                            <div className="chairs-side">
                                {rightNumbers.map((number) => renderSeat(seatsByKey.get(`${row}-${number}`)))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="chairs-actions">
                <Link to={`/peliculas/${data.movieId}/asientos`} className="chairs-back">
                    &lt; Atras
                </Link>
                <button
                    type="button"
                    className="chairs-next"
                    disabled={selectedSeats.length === 0}
                    onClick={goToPayment}
                >
                    Comprar asientos &gt;
                </button>
            </div>
        </main>
    );
};

export default ChairSelectionPage;

