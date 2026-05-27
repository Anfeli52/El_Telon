import type { ReviewSort } from "../../utils/ReviewTree";

export type ReviewRatingFilter = "all" | "5" | "4" | "3" | "2" | "1";

interface ReviewFiltersProps {
    search: string;
    ratingFilter: ReviewRatingFilter;
    sortBy: ReviewSort;
    onSearchChange: (value: string) => void;
    onRatingFilterChange: (value: ReviewRatingFilter) => void;
    onSortByChange: (value: ReviewSort) => void;
}

const ReviewFilters = ({
    search,
    ratingFilter,
    sortBy,
    onSearchChange,
    onRatingFilterChange,
    onSortByChange
}: ReviewFiltersProps) => {
    const sortOptions = ratingFilter === "all"
        ? [
            { value: "newest", label: "Mas recientes" },
            { value: "oldest", label: "Mas antiguos" },
            { value: "best", label: "Mejor calificadas" },
            { value: "middle", label: "Calificacion media" },
            { value: "worst", label: "Peor calificadas" }
        ]
        : [
            { value: "newest", label: "Mas recientes" },
            { value: "oldest", label: "Mas antiguos" }
        ];

    return (
        <div className="review-filters">
            <label className="review-filters__search">
                <span>Buscar</span>
                <input
                    type="search"
                    value={search}
                    placeholder="Nombre o comentario"
                    onChange={(event) => onSearchChange(event.target.value)}
                />
            </label>

            <label>
                <span>Estrellas</span>
                <select
                    value={ratingFilter}
                    onChange={(event) => onRatingFilterChange(event.target.value as ReviewRatingFilter)}
                >
                    <option value="all">Todas</option>
                    <option value="5">5 estrellas</option>
                    <option value="4">4 estrellas</option>
                    <option value="3">3 estrellas</option>
                    <option value="2">2 estrellas</option>
                    <option value="1">1 estrella</option>
                </select>
            </label>

            <label>
                <span>Ordenar</span>
                <select
                    value={sortBy}
                    onChange={(event) => onSortByChange(event.target.value as ReviewSort)}
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default ReviewFilters;
