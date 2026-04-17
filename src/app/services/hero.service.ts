/**
 * HeroService — The data access layer for Hero entities.
 * Think of this as a Spring @Service + @Repository combined.
 *
 * Uses RxJS Observables for HTTP calls — similar to Project Reactor's Mono/Flux in Spring WebFlux.
 * Observable = a lazy async stream (like Flux). It doesn't execute until you .subscribe().
 *
 * Key RxJS concepts for Java devs:
 * - Observable = like CompletableFuture, but cancellable and can emit multiple values
 * - .pipe() = like Stream pipeline — chains transformation operators
 * - .subscribe() = like .block() or .subscribe() in Reactor — triggers execution
 * - tap() = like peek() in Java Stream — side effect without transforming data
 * - catchError() = like .onErrorResume() in Reactor — handle errors gracefully
 * - map() = like Stream.map() — transform the emitted value
 * - of() = like Mono.just() — creates an Observable from a static value
 */

// I'm leaving this service implemented with Observables for now,
// since they play nicer with debouncing and such. Maybe I'll convert
// them to async/await at some point, but I also like how this showcases
// interoperability between RxJS and Signals.

// I also don't know if I can convert this to use something other
// than HttpClient and still have the InMemoryDataService work.
// Will angular-in-memory-web-api work with fetch?

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from '../models/hero';

import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {
    // Base URL for the hero REST API — like @Value("${api.heroes.url}") in Spring
    private heroesUrl = 'api/heroes';

    // Default HTTP headers — like setting Content-Type in a RestTemplate
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    // inject() = @Autowired — Angular's DI injects these singleton services
    private http = new HttpClient();
    private messageService = inject(MessageService);

    /** GET heroes from the server — like a @GetMapping("/heroes") handler */
    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl).pipe(
            // tap = side effect (logging), doesn't modify the data stream
            tap(_ => this.log('fetched heroes')),
            // If the HTTP call fails, return an empty array instead of crashing
            catchError(this.handleError<Hero[]>('getHeroes', [])),
        );
    }

    /** GET hero by id. Return `undefined` when id not found */
    getHeroNo404(id: number): Observable<Hero> {
        // Query param style: api/heroes/?id=15
        const url = `${this.heroesUrl}/?id=${id}`;
        return this.http.get<Hero[]>(url).pipe(
            map(heroes => heroes[0]),
            tap(h => {
                const outcome = h ? 'fetched' : 'did not find';
                this.log(`${outcome} hero id=${id}`);
            }),
            catchError(this.handleError<Hero>(`getHero id=${id}`)),
        );
    }

    /** GET hero by id. Will 404 if id not found — like @GetMapping("/heroes/{id}") */
    getHero(id: number): Observable<Hero> {
        // Path variable style: api/heroes/15
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url).pipe(
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`)),
        );
    }

    /** GET heroes whose name contains search term — like a @GetMapping with @RequestParam */
    searchHeroes(term: string): Observable<Hero[]> {
        if (!term.trim()) {
            return of([]);
        }
        return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
            tap(x =>
                x.length
                    ? this.log(`found heroes matching "${term}"`)
                    : this.log(`no heroes matching "${term}"`),
            ),
            catchError(this.handleError<Hero[]>('searchHeroes', [])),
        );
    }

    //////// Save methods //////////

    /** POST: add a new hero — like @PostMapping("/heroes") */
    addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
            tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
            catchError(this.handleError<Hero>('addHero')),
        );
    }

    /** DELETE: delete the hero — like @DeleteMapping("/heroes/{id}") */
    deleteHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;

        return this.http.delete<Hero>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError<Hero>('deleteHero')),
        );
    }

    /** PUT: update the hero — like @PutMapping("/heroes") */
    updateHero(hero: Hero): Observable<any> {
        return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
            tap(_ => this.log(`updated hero id=${hero.id}`)),
            catchError(this.handleError<any>('updateHero')),
        );
    }

    /**
     * Generic error handler — like a @ControllerAdvice / @ExceptionHandler in Spring.
     * Returns a curried function (function that returns a function) — common in FP/RxJS.
     * Instead of throwing, it logs the error and returns a safe fallback value.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            // Return a safe fallback so the app keeps running (graceful degradation)
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}
