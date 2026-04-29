import type { MovieDateOption } from '../types/Movie';

interface MovieDateSelectorProps {
    dates: MovieDateOption[];
    selectedDateId: string;
    onSelectDate: (dateId: string) => void;
}

const MovieDateSelector = ({
    dates,
    selectedDateId,
    onSelectDate
}: MovieDateSelectorProps) => {
    return (
        <div className="movie-detail__date-strip">
            {dates.map((date) => (
                <button
                    key={date.id}
                    type="button"
                    className={`movie-detail__date-chip ${selectedDateId === date.id ? 'is-active' : ''}`}
                    onClick={() => onSelectDate(date.id)}
                >
                    <span>{date.weekDay}</span>
                    <strong>{date.dayLabel}</strong>
                </button>
            ))}
        </div>
    );
};

export default MovieDateSelector;
