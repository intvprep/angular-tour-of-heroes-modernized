import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
    messages = signal<string[]>([]);
    private clearedAt = signal(0);
    private lastAddedAt = signal(0);

    cleared = computed(
        () => !this.messages().length && this.clearedAt() > this.lastAddedAt(),
    );

    add(message: string) {
        this.messages.update(messages => [...messages, message]);
        this.lastAddedAt.update(value => value + 1);
    }

    clear() {
        this.messages.set([]);
        this.clearedAt.update(value => value + 1);
    }
}
