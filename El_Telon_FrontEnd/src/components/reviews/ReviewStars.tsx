interface ReviewStarsProps {
    value: number;
}

const ReviewStars = ({ value }: ReviewStarsProps) => {
    return (
        <span className="review-stars" aria-label={`${value} de 5 estrellas`}>
            {Array.from({ length: 5 }, (_, index) => (
                <span
                    key={index}
                    className={index < value ? "review-stars__star is-active" : "review-stars__star"}
                >
                    ★
                </span>
            ))}
        </span>
    );
};

export default ReviewStars;
