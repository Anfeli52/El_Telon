import type { CarouselType } from "../types/Movie";

export class LinkedListNode {
    value: CarouselType;
    next: LinkedListNode | null;
    prev: LinkedListNode | null;

    constructor(value: any) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}