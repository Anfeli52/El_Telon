import type { Review } from "../types/Movie";

export type ReviewSort = "newest" | "oldest" | "best" | "middle" | "worst";

class ReviewNode {
    value: Review;
    left: ReviewNode | null = null;
    right: ReviewNode | null = null;

    constructor(value: Review) {
        this.value = value;
    }
}

export class ReviewTree {
    private root: ReviewNode | null = null;
    private sortBy: ReviewSort;

    constructor(sortBy: ReviewSort) {
        this.sortBy = sortBy;
    }

    insert(review: Review) {
        const newNode = new ReviewNode(review);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;

        while (current) {
            const goesLeft = this.isBefore(review, current.value);

            if (goesLeft) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }

                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }

                current = current.right;
            }
        }
    }

    toList() {
        const reviews: Review[] = [];
        this.walk(this.root, reviews);
        return reviews;
    }

    private walk(node: ReviewNode | null, reviews: Review[]) {
        if (!node) {
            return;
        }

        this.walk(node.right, reviews);
        reviews.push(node.value);
        this.walk(node.left, reviews);
    }

    private isBefore(a: Review, b: Review) {
        if (this.sortBy === "best" && a.calificacion !== b.calificacion) {
            return a.calificacion < b.calificacion;
        }

        if (this.sortBy === "worst" && a.calificacion !== b.calificacion) {
            return a.calificacion > b.calificacion;
        }

        const aDate = new Date(a.fechaCreacion).getTime();
        const bDate = new Date(b.fechaCreacion).getTime();

        if (aDate !== bDate) {
            return this.sortBy === "oldest" ? aDate > bDate : aDate < bDate;
        }

        return this.sortBy === "oldest" || this.sortBy === "worst" ? a.id > b.id : a.id < b.id;
    }
}
