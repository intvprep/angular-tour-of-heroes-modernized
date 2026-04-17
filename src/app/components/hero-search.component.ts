/**
 * HeroSearchComponent — A typeahead/autocomplete search for heroes.
 * Demonstrates the bridge between Angular Signals and RxJS Observables.
 *
 * This is the most "reactive programming" heavy component — similar to
 * building a Kafka consumer pipeline with backpressure and deduplication.
 *
 * Key pattern: Signal → Observable → debounce/dedupe → HTTP → Signal → Template
 */
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
    selector: 'app-hero-search',
    standalone: true,
    imports: [RouterLink],
    template: `
        <div class="w-1/2">
            <label class="block text-sm leading-6 font-medium text-gray-900" for="search-box">
                Hero Search
            </label>
            <div class="mt-2">
                <!--
                    #searchBox = template ref to the <input> element
                    (input) = fires on every keystroke, calls search() with the current value
                -->
                <input
                    #searchBox
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-red-600 focus:ring-inset sm:text-sm sm:leading-6"
                    id="search-box"
                    type="text"
                    placeholder="e.g. Superman, Captain Marvel, Batman, Spider-man"
                    (input)="search(searchBox.value)"
                />
            </div>

            <!-- Only show results dropdown when there are matches -->
            @if (heroes().length) {
                <ul
                    class="mt-2 divide-y divide-gray-200 rounded border border-1 border-gray-300 bg-white"
                    role="list"
                >
                    <!--
                        $first / $last = built-in loop context variables (like loop.first/last in Thymeleaf).
                        Used here to round corners on first/last items.
                    -->
                    @for (hero of heroes(); track hero.id; let first = $first; let last = $last) {
                        <li
                            class="flex py-4 hover:cursor-pointer hover:bg-gray-100"
                            routerLink="/detail/{{ hero.id }}"
                            [class.rounded-b]="last"
                            [class.rounded-t]="first"
                        >
                            <span class="px-2 py-0.5 text-sm font-medium text-gray-900">
                                {{ hero.name }}
                            </span>
                        </li>
                    }
                </ul>
            }
        </div>
    `,
})
export class HeroSearchComponent {
    private heroService = inject(HeroService);

    /** The raw search term — updated on every keystroke */
    private searchTerm = signal<string>('');

    /**
     * The search results — a Signal derived from an RxJS pipeline:
     *
     * 1. toObservable(signal) converts the Signal into an Observable stream
     * 2. debounceTime(300) = wait 300ms after the user stops typing before searching
     *    (like rate-limiting API calls — prevents hammering the server on every keystroke)
     * 3. distinctUntilChanged() = skip if the term hasn't actually changed
     *    (like a SQL "SELECT DISTINCT" — avoid duplicate queries)
     * 4. switchMap() = cancel the previous HTTP request and start a new one
     *    (like cancelling a pending CompletableFuture when a newer request comes in)
     * 5. toSignal() converts the final Observable back into a Signal for the template
     */
    heroes = toSignal(
        toObservable(this.searchTerm).pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.heroService.searchHeroes(term)),
        ),
        { initialValue: [] as Hero[] },
    );

    /** Called on every keystroke — just updates the signal, the pipeline does the rest */
    search(term: string) {
        this.searchTerm.set(term);
    }
}
