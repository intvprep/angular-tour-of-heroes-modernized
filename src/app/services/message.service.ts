/**
 * MessageService — A simple singleton service for app-wide message logging.
 * Think of it like a Spring @Service that acts as an in-memory message queue.
 *
 * This service uses Angular **Signals** for state management:
 * - signal() = a reactive variable that notifies the UI when it changes
 *   (like an AtomicReference that auto-triggers UI re-renders)
 * - computed() = derived state that recalculates when its dependencies change
 *   (like a calculated/virtual column in a database view)
 *
 * `providedIn: 'root'` = singleton scope, like @Scope("singleton") in Spring.
 * Angular creates one instance and shares it across the entire app.
 */
import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
    /**
     * A signal holding the list of messages.
     * signal<string[]>([]) = a reactive container initialized with an empty array.
     * When you call .set() or .update(), any component reading messages() re-renders.
     */
    messages = signal<string[]>([]);

    /** Monotonic counter tracking when clear() was last called */
    private clearedAt = signal(0);

    /** Monotonic counter tracking when add() was last called */
    private lastAddedAt = signal(0);

    /**
     * Derived state: true when messages are empty AND clear was called after the last add.
     * This differentiates "empty because nothing loaded yet" from "empty because user cleared".
     * computed() auto-tracks its signal dependencies (messages, clearedAt, lastAddedAt).
     */
    cleared = computed(() => !this.messages().length && this.clearedAt() > this.lastAddedAt());

    /**
     * Append a message. `.update()` receives the current value and returns the new value.
     * We spread into a new array ([...old, new]) because signals detect change by reference
     * — mutating the existing array wouldn't trigger re-renders (same reference = no change).
     */
    add(message: string) {
        this.messages.update(messages => [...messages, message]);
        this.lastAddedAt.update(value => value + 1);
    }

    /** Clear all messages and mark that the user explicitly cleared them */
    clear() {
        this.messages.set([]);
        this.clearedAt.update(value => value + 1);
    }
}
