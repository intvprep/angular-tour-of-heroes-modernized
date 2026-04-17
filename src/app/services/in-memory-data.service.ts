/**
 * InMemoryDataService — A mock REST API backend.
 * Like an embedded H2 database with Spring Boot's data.sql seed file.
 *
 * This implements InMemoryDbService from `angular-in-memory-web-api`, which
 * intercepts all HttpClient calls and serves data from an in-memory store.
 * When you call GET /api/heroes, this service returns the heroes array below
 * instead of making a real HTTP request.
 *
 * Remove this when connecting to a real backend (like a Spring Boot REST API).
 */
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../models/hero';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
    /**
     * Creates the in-memory database.
     * The returned object's keys become API endpoints:
     *   { heroes: [...] } → GET /api/heroes, GET /api/heroes/:id, POST /api/heroes, etc.
     */
    createDb() {
        const heroes = [
            { id: 12, name: 'Dr. Nice' },
            { id: 13, name: 'Bombasto' },
            { id: 14, name: 'Celeritas' },
            { id: 15, name: 'Magneta' },
            { id: 16, name: 'RubberMan' },
            { id: 17, name: 'Dynama' },
            { id: 18, name: 'Dr. IQ' },
            { id: 19, name: 'Magma' },
            { id: 20, name: 'Tornado' },
        ];
        return { heroes };
    }

    /**
     * Auto-generates IDs for new heroes (like @GeneratedValue in JPA).
     * Finds the max existing ID and increments by 1.
     */
    genId(heroes: Hero[]): number {
        return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
    }
}
