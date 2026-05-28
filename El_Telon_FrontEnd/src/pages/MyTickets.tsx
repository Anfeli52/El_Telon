import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock3, Film, MapPin, TicketCheck } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import type { TicketHistoryItem } from '../types/Movie';
import '../styles/my-tickets.css';

const currencyFormatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
});

export const MyTickets = () => {
    const { username, email } = useAuth();
    const [tickets, setTickets] = useState<TicketHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTickets = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await api.get<TicketHistoryItem[]>('/tickets/me');
                setTickets(response.data);
            } catch {
                setError('No pudimos cargar tus boletos. Intenta de nuevo en unos segundos.');
                setTickets([]);
            } finally {
                setLoading(false);
            }
        };

        loadTickets();
    }, []);

    const stats = useMemo(() => {
        const totalTickets = tickets.length;
        const totalSpent = tickets.reduce((sum, ticket) => sum + Number(ticket.price ?? 0), 0);
        const uniqueMovies = new Set(tickets.map((ticket) => ticket.movieId)).size;

        return {
            totalTickets,
            totalSpent,
            uniqueMovies,
        };
    }, [tickets]);

    return (
        <main className="my-tickets-page">
            <section className="my-tickets-page__container">
                <header className="my-tickets-page__hero">
                    <span className="my-tickets-page__eyebrow">Mis boletos</span>
                    <h1>Todo tu historial de compra en un solo lugar</h1>
                    <p>
                        Revisa tus funciones, la hora exacta, la sala, los asientos y el valor de cada ticket.
                        Si necesitas volver a comprar o consultar una función, aquí tienes la información completa.
                    </p>

                    <div className="my-tickets-page__meta">
                        <span className="my-tickets-page__meta-chip">
                            <TicketCheck size={16} aria-hidden="true" />
                            {stats.totalTickets} tickets comprados
                        </span>
                        <span className="my-tickets-page__meta-chip">
                            <Film size={16} aria-hidden="true" />
                            {stats.uniqueMovies} películas distintas
                        </span>
                        <span className="my-tickets-page__meta-chip">
                            <CalendarDays size={16} aria-hidden="true" />
                            {currencyFormatter.format(stats.totalSpent)} invertidos
                        </span>
                        <span className="my-tickets-page__meta-chip">
                            <MapPin size={16} aria-hidden="true" />
                            {username ?? email ?? 'Tu cuenta'}
                        </span>
                    </div>

                    <div className="my-tickets-page__actions">
                        <Link to="/cartelera" className="my-tickets-page__button">
                            <ArrowLeft size={16} aria-hidden="true" />
                            Volver a cartelera
                        </Link>
                        <Link to="/cartelera" className="my-tickets-page__button--secondary">
                            Seguir comprando
                        </Link>
                    </div>
                </header>

                {loading && (
                    <section className="my-tickets-page__state" aria-live="polite">
                        <div>
                            <strong>Cargando tus boletos...</strong>
                            <p>Estamos recuperando las compras de tu cuenta.</p>
                        </div>
                    </section>
                )}

                {!loading && error && (
                    <section className="my-tickets-page__state" aria-live="polite">
                        <div>
                            <strong>{error}</strong>
                            <p>Si acabas de comprar, refresca la página o vuelve a intentar en un momento.</p>
                            <Link to="/cartelera" className="my-tickets-page__button" style={{ marginTop: '1rem' }}>
                                Ir a cartelera
                            </Link>
                        </div>
                    </section>
                )}

                {!loading && !error && tickets.length === 0 && (
                    <section className="my-tickets-page__state" aria-live="polite">
                        <div>
                            <strong>Aún no tienes boletos comprados</strong>
                            <p>Cuando completes una compra, aquí aparecerán la función, la hora y los asientos.</p>
                            <Link to="/cartelera" className="my-tickets-page__button" style={{ marginTop: '1rem' }}>
                                Explorar cartelera
                            </Link>
                        </div>
                    </section>
                )}

                {!loading && !error && tickets.length > 0 && (
                    <section className="my-tickets-page__tickets" aria-label="Lista de tickets comprados">
                        {tickets.map((ticket) => (
                            <article className="my-tickets-page__ticket-card" key={ticket.ticketId}>
                                <img
                                    src={ticket.moviePoster}
                                    alt={ticket.movieName}
                                    className="my-tickets-page__poster"
                                    loading="lazy"
                                />

                                <div className="my-tickets-page__content">
                                    <div className="my-tickets-page__title-row">
                                        <div>
                                            <h2>{ticket.movieName}</h2>
                                            <div className="my-tickets-page__badges">
                                                <span className="my-tickets-page__badge">{ticket.classification}</span>
                                                <span className="my-tickets-page__badge">{ticket.format}</span>
                                                <span className="my-tickets-page__badge">{ticket.cinema}</span>
                                            </div>
                                        </div>

                                        <span className="my-tickets-page__ticket-id">Boleto #{ticket.ticketId}</span>
                                    </div>

                                    <div className="my-tickets-page__details">
                                        <div className="my-tickets-page__detail">
                                            <span>Función</span>
                                            <strong>#{ticket.functionId}</strong>
                                        </div>
                                        <div className="my-tickets-page__detail">
                                            <span>Sala</span>
                                            <strong>{ticket.room}</strong>
                                        </div>
                                        <div className="my-tickets-page__detail">
                                            <span>Fecha</span>
                                            <strong>{ticket.functionDate}</strong>
                                        </div>
                                        <div className="my-tickets-page__detail">
                                            <span>Hora</span>
                                            <strong>{ticket.functionTime}</strong>
                                        </div>
                                        <div className="my-tickets-page__detail">
                                            <span>Asiento</span>
                                            <strong>{ticket.seatLabel} · {ticket.seatType}</strong>
                                        </div>
                                        <div className="my-tickets-page__detail">
                                            <span>Compra realizada</span>
                                            <strong>{ticket.purchaseDate}</strong>
                                        </div>
                                    </div>
                                </div>

                                <aside className="my-tickets-page__sidebar">
                                    <h3>Valor del ticket</h3>
                                    <div className="my-tickets-page__price">{currencyFormatter.format(ticket.price)}</div>
                                    <p>
                                        <MapPin size={14} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
                                        {ticket.room} · {ticket.cinema}
                                    </p>
                                    <p>
                                        <Clock3 size={14} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
                                        {ticket.functionDate} a las {ticket.functionTime}
                                    </p>
                                </aside>
                            </article>
                        ))}
                    </section>
                )}
            </section>
        </main>
    );
};

export default MyTickets;