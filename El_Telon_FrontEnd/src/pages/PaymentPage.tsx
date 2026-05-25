import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import type { FunctionSeats } from '../types/Movie';
import '../styles/seat-selection.css';

const serviceFee = 2900;

const PaymentPage = () => {
    const { functionId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<FunctionSeats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [paid, setPaid] = useState(false);
    const [timeLeftMs, setTimeLeftMs] = useState(0);

    const reservationToken = searchParams.get('reservationToken') ?? '';
    const reservationExpiresAt = searchParams.get('expiresAt') ?? '';

    const selectedIds = useMemo(() => {
        return (searchParams.get('asientos') ?? '')
            .split(',')
            .map((id) => Number(id))
            .filter(Boolean);
    }, [searchParams]);

    useEffect(() => {
        const loadPayment = async () => {
            try {
                const response = await api.get<FunctionSeats>(`/seats/functions/${functionId}`);
                setData(response.data);
            } catch {
                setError('No se pudo cargar el pago.');
            } finally {
                setLoading(false);
            }
        };

        loadPayment();
    }, [functionId]);

    useEffect(() => {
        if (!reservationExpiresAt) {
            setTimeLeftMs(0);
            return;
        }

        const expiryTime = new Date(reservationExpiresAt).getTime();

        const updateCountdown = () => {
            const remaining = Math.max(0, expiryTime - Date.now());
            setTimeLeftMs(remaining);
        };

        updateCountdown();
        const intervalId = window.setInterval(updateCountdown, 1000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [reservationExpiresAt]);

    const selectedSeats = useMemo(() => {
        return data?.seats.filter((seat) => selectedIds.includes(seat.id)) ?? [];
    }, [data, selectedIds]);

    const subtotal = (data?.price ?? 0) * selectedSeats.length;
    const total = subtotal + serviceFee;
    const seatLabel = selectedSeats.map((seat) => `${seat.row}${seat.number}`).join(', ');
    const countdownMinutes = Math.floor(timeLeftMs / 60000);
    const countdownSeconds = Math.floor((timeLeftMs % 60000) / 1000);
    const countdownLabel = `${countdownMinutes.toString().padStart(2, '0')}:${countdownSeconds
        .toString()
        .padStart(2, '0')}`;
    const reservationExpired = timeLeftMs <= 0;

    const releaseReservation = async () => {
        if (!reservationToken || paid) {
            return;
        }

        try {
            await api.delete(`/seats/functions/${functionId}/reserve/${reservationToken}`);
        } catch { /* empty */ }
    };

    const pay = async () => {
    try {
        await api.post(`/seats/functions/${functionId}/purchase`, {
            seatIds: selectedIds
        });
        
        window.dispatchEvent(new Event('ticketPurchased'));

        setModalOpen(false);
        setPaid(true);
    } catch {
        setError('No se pudo hacer el pago.');
    }
};

    const goBack = async () => {
        await releaseReservation();
        navigate(`/funciones/${functionId}/asientos`);
    };

    if (loading) {
        return <div className="cartelera-state">Cargando pago...</div>;
    }

    if (error || !data || selectedSeats.length === 0 || !reservationToken) {
        return (
            <main className="payment-page">
                <section className="chairs-empty">
                    <h1>No se pudo continuar</h1>
                    <p>{error || 'Selecciona una silla primero.'}</p>
                    <Link to={`/funciones/${functionId}/asientos`}>Volver</Link>
                </section>
            </main>
        );
    }

    return (
        <main className="payment-page">
            <section className="payment-form">
                <button type="button" onClick={goBack} className="payment-back">
                    &lt; Regresar
                </button>

                <div className={`payment-countdown ${reservationExpired ? 'payment-countdown--expired' : ''}`}>
                    <span>Tiempo restante para pagar</span>
                    <strong>{countdownLabel}</strong>
                </div>

                <h1>Informacion personal</h1>

                <div className="payment-grid">
                    <label>
                        Nombre(s)
                        <input type="text" />
                    </label>
                    <label>
                        Apellidos
                        <input type="text" />
                    </label>
                    <label>
                        Correo electronico
                        <input type="email" />
                    </label>
                </div>

                <h2>Datos de facturacion</h2>
                <label className="payment-radio">
                    <input type="radio" defaultChecked />
                    consumidor final
                </label>

                <h2>Selecciona el metodo de pago</h2>
                <button type="button" className="payment-method">
                    <span>tarjeta</span>
                    credito / debito
                </button>

                <label className="payment-check">
                    <input type="checkbox" defaultChecked />
                    He leido y estoy de acuerdo con los terminos y condiciones.
                </label>
            </section>

            <aside className="payment-summary">
                <h2>Resumen de compra</h2>
                <div className="payment-movie">
                    <img src={data.poster} alt={data.movieName} />
                    <div>
                        <p><b>Pelicula:</b> {data.movieName} {data.format}</p>
                        <p><b>Fecha:</b> {data.dateLabel}</p>
                        <p><b>Funcion:</b> {data.timeLabel}</p>
                        <p><b>Boletos:</b> general web ({selectedSeats.length})</p>
                        <p><b>Asientos:</b> {seatLabel}</p>
                    </div>
                </div>

                <div className="payment-totals">
                    <p><span>Cargo por servicio:</span><b>${serviceFee.toLocaleString('es-CO')}</b></p>
                    <p><span>Subtotal:</span><b>${subtotal.toLocaleString('es-CO')}</b></p>
                    <p><span>Total:</span><b>${total.toLocaleString('es-CO')}</b></p>
                </div>

                <button type="button" className="payment-pay" onClick={() => setModalOpen(true)} disabled={reservationExpired}>
                    proceder al pago
                </button>

                {reservationExpired && (
                    <p className="payment-expired-message">
                        La reserva expiró. Vuelve a seleccionar tus asientos para intentar de nuevo.
                    </p>
                )}

                {paid && <p className="payment-success">pago correctamente hecho</p>}
            </aside>

            {modalOpen && (
                <div className="pay-modal">
                    <section className="pay-card">
                        <button type="button" className="pay-close" onClick={() => setModalOpen(false)}>
                            x
                        </button>
                        <h2>Datos del Tarjetahabiente</h2>
                        <div className="payment-grid">
                            <label>
                                Nombre
                                <input type="text" />
                            </label>
                            <label>
                                Apellido
                                <input type="text" />
                            </label>
                        </div>

                        <h2>Detalles de Pago</h2>
                        <div className="payment-grid payment-grid--card">
                            <label>
                                Numero de Tarjeta
                                <input type="text" />
                            </label>
                            <label>
                                CVV
                                <input type="text" maxLength={3} />
                            </label>
                            <label>
                                Fecha de Expiracion
                                <input type="text" placeholder="MM / YYYY" />
                            </label>
                        </div>

                        <button type="button" className="payment-pay" onClick={pay} disabled={reservationExpired}>
                            pagar
                        </button>
                    </section>
                </div>
            )}
        </main>
    );
};

export default PaymentPage;
