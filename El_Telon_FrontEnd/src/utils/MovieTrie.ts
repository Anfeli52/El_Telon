import type { Movie } from "../types/Movie";

class TrieNode {
    children = new Map<string, TrieNode>();
    movieIds = new Set<number>();
}

const normalizeText = (value: string) =>
    value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

export class MovieTrie {
    private readonly root = new TrieNode();

    insert(movie: Movie) {
        const searchableTerms = [movie.nombre, movie.categoria];

        searchableTerms.forEach((term) => {
            const normalizedTerm = normalizeText(term);

            if (!normalizedTerm) {
                return;
            }

            let current = this.root;

            for (const char of normalizedTerm) {
                if (!current.children.has(char)) {
                    current.children.set(char, new TrieNode());
                }

                current = current.children.get(char)!;
                current.movieIds.add(movie.id);
            }
        });
    }

    search(prefix: string) {
        const normalizedPrefix = normalizeText(prefix);

        if (!normalizedPrefix) {
            return new Set<number>();
        }

        let current = this.root;

        for (const char of normalizedPrefix) {
            const nextNode = current.children.get(char);

            if (!nextNode) {
                return new Set<number>();
            }

            current = nextNode;
        }

        return current.movieIds;
    }
}

export const normalizeMovieQuery = normalizeText;