import type { Review } from "../../types/Movie";
import { useState, type CSSProperties, type FormEvent } from "react";
import ReviewStars from "./ReviewStars";
import { Trash2 } from "lucide-react";

interface ReviewListProps {
    reviews: Review[];
    onToggleLike: (reviewId: number) => void;
    onToggleDislike: (reviewId: number) => void;
    onReply: (reviewId: number, text: string) => void;
    onDelete: (reviewId: number) => void;
}

const formatDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat("es-CO", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(date).replace(".", "");
};

interface ReviewThreadProps {
    review: Review;
    level: number;
    onToggleLike: (reviewId: number) => void;
    onToggleDislike: (reviewId: number) => void;
    onReply: (reviewId: number, text: string) => void;
}

const ReviewThread = ({ review, level, onToggleLike, onToggleDislike, onReply, onDelete }: ReviewThreadProps & { onDelete: (reviewId: number) => void }) => {
    const [replying, setReplying] = useState(false);
    const [replyText, setReplyText] = useState("");
    const replies = review.respuestas ?? [];

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!replyText.trim()) {
            return;
        }

        onReply(review.id, replyText);
        setReplyText("");
        setReplying(false);
    };

    return (
        <article
            className={level === 0 ? "movie-reviews__item" : "movie-reviews__item movie-reviews__item--reply"}
            style={{ "--reply-level": level } as CSSProperties}
        >
            <div className="movie-reviews__item-top">
                <div>
                    <h3>{review.autor}</h3>
                    <time>{formatDate(review.fechaCreacion)}</time>
                </div>
                {level === 0 && (
                    <span className="movie-reviews__badge">
                        <ReviewStars value={review.calificacion} />
                        <b>{review.calificacion}/5</b>
                    </span>
                )}
            </div>

            <p>{review.comentario}</p>

            <div className="movie-reviews__actions">
                <button
                    type="button"
                    className={review.liked ? "movie-reviews__like is-active" : "movie-reviews__like"}
                    onClick={() => onToggleLike(review.id)}
                >
                    <span>{String.fromCodePoint(0x1f44d)}</span>
                    <b>{review.likes ?? 0}</b>
                </button>
                <button
                    type="button"
                    className={review.disliked ? "movie-reviews__dislike is-active" : "movie-reviews__dislike"}
                    onClick={() => onToggleDislike(review.id)}
                >
                    <span>{String.fromCodePoint(0x1f44e)}</span>
                    <b>{review.dislikes ?? 0}</b>
                </button>
                <button
                    type="button"
                    className="movie-reviews__reply-button"
                    onClick={() => setReplying((current) => !current)}
                >
                    Responder
                </button>
                <button
                    type="button"
                    className="movie-reviews__delete-button"
                    aria-label="Eliminar comentario"
                    onClick={() => {
                        if (confirm("¿Eliminar este comentario y todas sus respuestas?")) {
                            onDelete(review.id);
                        }
                    }}
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {replying && (
                <form className="movie-reviews__reply-form" onSubmit={handleSubmit}>
                    <input
                        value={replyText}
                        placeholder="Escribe una respuesta"
                        onChange={(event) => setReplyText(event.target.value)}
                    />
                    <button type="submit">Enviar</button>
                </form>
            )}

            {replies.length > 0 && (
                <div className="movie-reviews__thread">
                    {replies.map((reply) => (
                        <ReviewThread
                            key={reply.id}
                            review={reply}
                            level={level + 1}
                            onToggleLike={onToggleLike}
                            onToggleDislike={onToggleDislike}
                            onReply={onReply}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </article>
    );
};

const ReviewList = ({ reviews, onToggleLike, onToggleDislike, onReply, onDelete }: ReviewListProps) => {
    return (
        <div className="movie-reviews__list">
            {reviews.map((review) => (
                <ReviewThread
                    key={review.id}
                    review={review}
                    level={0}
                    onToggleLike={onToggleLike}
                    onToggleDislike={onToggleDislike}
                    onReply={onReply}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ReviewList;
