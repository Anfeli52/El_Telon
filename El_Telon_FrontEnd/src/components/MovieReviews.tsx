import { useEffect, useMemo, useState, type FormEvent } from "react";
import api from "../api/axios";
import type { Review } from "../types/Movie";
import { ReviewTree, type ReviewSort } from "../utils/ReviewTree";
import ReviewFilters, { type ReviewRatingFilter } from "./reviews/ReviewFilters";
import ReviewList from "./reviews/ReviewList";
import ReviewStars from "./reviews/ReviewStars";
import { useAuth } from "../context/AuthContext";

interface MovieReviewsProps {
    movieId: number;
}

const MovieReviews = ({ movieId }: MovieReviewsProps) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [comentario, setComentario] = useState("");
    const [calificacion, setCalificacion] = useState(5);
    const [search, setSearch] = useState("");
    const [ratingFilter, setRatingFilter] = useState<ReviewRatingFilter>("all");
    const [sortBy, setSortBy] = useState<ReviewSort>("newest");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { username } = useAuth();

    const getStoredIds = (key: string) => {
        try {
            return new Set<number>(JSON.parse(localStorage.getItem(key) ?? "[]"));
        } catch {
            return new Set<number>();
        }
    };

    const saveStoredIds = (key: string, ids: Set<number>) => {
        localStorage.setItem(key, JSON.stringify(Array.from(ids)));
    };

    const likedKey = `likedReviews_movie_${movieId}`;
    const dislikedKey = `dislikedReviews_movie_${movieId}`;

    const normalizeReview = (review: Review): Review => ({
        ...review,
        likes: review.likes ?? 0,
        liked: getStoredIds(likedKey).has(review.id),
        dislikes: review.dislikes ?? 0,
        disliked: getStoredIds(dislikedKey).has(review.id),
        respuestas: (review.respuestas ?? []).map(normalizeReview)
    });

    useEffect(() => {
        setLoading(true);
        setError(null);
        setReviews([]);

        const loadReviews = async () => {
            try {
                const response = await api.get<Review[]>(`/movies/${movieId}/reviews`);
                setReviews(response.data.map(normalizeReview));
            } catch {
                setReviews([]);
                setError("No se pudieron cargar las resenas.");
            } finally {
                setLoading(false);
            }
        };

        loadReviews();
    }, [movieId]);

    const visibleReviews = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        const filterReview = (review: Review, level = 0): Review | null => {
            const matchesSearch = !normalizedSearch
                || review.autor.toLowerCase().includes(normalizedSearch)
                || review.comentario.toLowerCase().includes(normalizedSearch);

            const matchesRating = level > 0
                || ratingFilter === "all"
                || review.calificacion === Number(ratingFilter);

            const matchesSortGroup = level > 0
                || ratingFilter !== "all"
                || (sortBy !== "best" && sortBy !== "middle" && sortBy !== "worst")
                || (sortBy === "best" && review.calificacion >= 4)
                || (sortBy === "middle" && review.calificacion === 3)
                || (sortBy === "worst" && review.calificacion <= 2);

            const filteredReplies = (review.respuestas ?? [])
                .map((reply) => filterReview(reply, level + 1))
                .filter((reply): reply is Review => Boolean(reply));

            const canShowThread = level > 0 || (matchesRating && matchesSortGroup);

            if ((matchesSearch && matchesRating && matchesSortGroup) || (filteredReplies.length > 0 && canShowThread)) {
                return {
                    ...review,
                    respuestas: filteredReplies
                };
            }

            return null;
        };

        const filteredReviews = reviews
            .map(filterReview)
            .filter((review): review is Review => Boolean(review));

        const tree = new ReviewTree(sortBy);
        filteredReviews.forEach((review) => tree.insert(review));
        return tree.toList();
    }, [reviews, search, ratingFilter, sortBy]);

    useEffect(() => {
        if (ratingFilter !== "all" && (sortBy === "best" || sortBy === "middle" || sortBy === "worst")) {
            setSortBy("newest");
        }
    }, [ratingFilter, sortBy]);

    const average = useMemo(() => {
        if (reviews.length === 0) {
            return "0.0";
        }

        const total = reviews.reduce((sum, review) => sum + review.calificacion, 0);
        return (total / reviews.length).toFixed(1);
    }, [reviews]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!comentario.trim()) {
            setError("Completa tu comentario.");
            return;
        }

        try {
            setSaving(true);
            setError(null);

            const response = await api.post<Review>(`/movies/${movieId}/reviews`, {
                autor: username ?? "Usuario invitado",
                comentario,
                calificacion
            });
            setReviews((currentReviews) => [normalizeReview(response.data), ...currentReviews]);
            setComentario("");
            setCalificacion(5);
        } catch {
            setError("No se pudo guardar la resena.");
        } finally {
            setSaving(false);
        }
    };

    const updateReviewTree = (currentReviews: Review[], reviewId: number, updater: (review: Review) => Review): Review[] =>
        currentReviews.map((review) => {
            if (review.id === reviewId) {
                return updater(review);
            }

            return {
                ...review,
                respuestas: updateReviewTree(review.respuestas ?? [], reviewId, updater)
            };
        });

    const findReview = (currentReviews: Review[], reviewId: number): Review | null => {
        for (const review of currentReviews) {
            if (review.id === reviewId) {
                return review;
            }

            const found = findReview(review.respuestas ?? [], reviewId);

            if (found) {
                return found;
            }
        }

        return null;
    };

    const handleToggleReaction = async (
        reviewId: number,
        key: "like" | "dislike",
        localKey: string
    ) => {
        const currentReview = findReview(reviews, reviewId);

        if (!currentReview) {
            return;
        }

        const activeKey = key === "like" ? "liked" : "disliked";
        const countKey = key === "like" ? "likes" : "dislikes";
        const nextActive = !currentReview[activeKey];
        const storedIds = getStoredIds(localKey);

        try {
            let nextCount = Math.max(0, (currentReview[countKey] ?? 0) + (nextActive ? 1 : -1));

            if (reviewId > 0) {
                const action = nextActive ? key : key === "like" ? "unlike" : "undislike";
                    const response = await api.put<Review>(`/movies/${movieId}/reviews/${reviewId}/${action}`);
                nextCount = response.data[countKey] ?? nextCount;
            }

            if (nextActive) {
                    storedIds.add(reviewId);
            } else {
                storedIds.delete(reviewId);
            }

            saveStoredIds(localKey, storedIds);

            setReviews((currentReviews) => updateReviewTree(currentReviews, reviewId, (review) => ({
                ...review,
                [activeKey]: nextActive,
                [countKey]: nextCount
            })));
        } catch {
            setError(`No se pudo actualizar el ${key}.`);
        }
    };

    const handleReply = async (reviewId: number, text: string) => {
        try {
            let newReply: Review;

            if (reviewId > 0) {
                const response = await api.post<Review>(`/movies/${movieId}/reviews/${reviewId}/replies`, {
                    autor: username?.trim() || "Usuario invitado",
                    comentario: text.trim(),
                    calificacion: 5
                });

                newReply = normalizeReview(response.data);
            } else {
                newReply = {
                    id: Date.now(),
                    autor: username?.trim() || "Usuario invitado",
                    comentario: text.trim(),
                    calificacion: 5,
                    fechaCreacion: new Date().toISOString(),
                    likes: 0,
                    liked: false,
                    dislikes: 0,
                    disliked: false,
                    respuestas: []
                };
            }

            setReviews((currentReviews) => updateReviewTree(currentReviews, reviewId, (review) => ({
                ...review,
                respuestas: [...(review.respuestas ?? []), newReply]
            })));
        } catch {
            setError("No se pudo guardar la respuesta.");
        }
    };

    const removeReviewTree = (currentReviews: Review[], reviewId: number): Review[] =>
        currentReviews
            .filter((r) => r.id !== reviewId)
            .map((r) => ({
                ...r,
                respuestas: removeReviewTree(r.respuestas ?? [], reviewId)
            }));

    const handleDelete = async (reviewId: number) => {
        try {
            if (reviewId > 0) {
                await api.delete(`/movies/${movieId}/reviews/${reviewId}`);
            }

            setReviews((current) => removeReviewTree(current, reviewId));
        } catch {
            setError("No se pudo eliminar la resena.");
        }
    };

    return (
        <section className="movie-reviews">
            <div className="movie-reviews__header">
                <div>
                    <p className="movie-detail__eyebrow">Resenas</p>
                    <h2>Comentarios de la pelicula</h2>
                </div>
                <span className="movie-reviews__score">
                    <strong>{average}/5</strong>
                    <ReviewStars value={Math.round(Number(average))} />
                </span>
            </div>

            <form className="movie-reviews__form" onSubmit={handleSubmit}>
                <select
                    value={calificacion}
                    onChange={(event) => setCalificacion(Number(event.target.value))}
                >
                    <option value={5}>5 estrellas</option>
                    <option value={4}>4 estrellas</option>
                    <option value={3}>3 estrellas</option>
                    <option value={2}>2 estrellas</option>
                    <option value={1}>1 estrella</option>
                </select>

                <textarea
                    value={comentario}
                    maxLength={600}
                    placeholder="Escribe tu comentario"
                    onChange={(event) => setComentario(event.target.value)}
                />

                <button type="submit" disabled={saving}>
                    {saving ? "Guardando..." : "Publicar"}
                </button>
            </form>

            {error && <p className="movie-reviews__error">{error}</p>}
            {loading && <p className="movie-detail__empty-message">Cargando resenas...</p>}

            {!loading && (
                <ReviewFilters
                    search={search}
                    ratingFilter={ratingFilter}
                    sortBy={sortBy}
                    onSearchChange={setSearch}
                    onRatingFilterChange={setRatingFilter}
                    onSortByChange={setSortBy}
                />
            )}

            {!loading && visibleReviews.length === 0 && (
                <p className="movie-detail__empty-message">No hay resenas con esos filtros.</p>
            )}

            {!loading && visibleReviews.length > 0 && (
                <ReviewList
                    reviews={visibleReviews}
                    onToggleLike={(reviewId) => handleToggleReaction(reviewId, "like", likedKey)}
                    onToggleDislike={(reviewId) => handleToggleReaction(reviewId, "dislike", dislikedKey)}
                    onReply={handleReply}
                    onDelete={handleDelete}
                />
            )}
        </section>
    );
};

export default MovieReviews;
