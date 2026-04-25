import { LinkedListNode } from "./LinkedListNode";

export class LinkedList {
    private head: LinkedListNode | null;
    private tail: LinkedListNode | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }
    
    append(value: any): void {
        const newNode = new LinkedListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return;
        }

        this.tail!.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }

    getHead(): LinkedListNode | null {
        return this.head;
    }

    getTail(): LinkedListNode | null {
        return this.tail;
    }
}