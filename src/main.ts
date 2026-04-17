/**
 * main.ts — The entry point of the Angular app.
 * Think of this as your `public static void main()` in Java or
 * the `@SpringBootApplication` class that bootstraps Spring Boot.
 *
 * Instead of Spring's component scanning, Angular explicitly declares
 * routes and providers (services) here.
 */

import { importProvidersFrom } from '@angular/core';
// bootstrapApplication = the equivalent of SpringApplication.run()
import { bootstrapApplication } from '@angular/platform-browser';
import {
    provideRouter,
    Routes,
    withComponentInputBinding,
    withInMemoryScrolling,
    withViewTransitions,
} from '@angular/router';

// This is a mock backend — similar to using an embedded H2 database in Spring Boot.
// It intercepts HTTP calls and returns fake data so you don't need a real server.
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './app/services/in-memory-data.service';

// The root component — like your top-level @Controller that renders the main page layout
import { AppComponent } from './app/app.component';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { DashboardComponent } from './app/components/dashboard.component';
import { HeroDetailComponent } from './app/components/hero-detail.component';
import { HeroesComponent } from './app/components/heroes.component';

/**
 * Route definitions — similar to @RequestMapping in Spring MVC.
 * Each route maps a URL path to a component (like mapping a URL to a Controller).
 *
 * - `path: ''` with `redirectTo` = a default redirect, like a welcome page filter
 * - `path: 'detail/:id'` = path variable, like @PathVariable in Spring
 * - `title` = sets the browser tab title for that route
 */
const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard | Tour of Heroes',
    },
    {
        path: 'detail/:id',
        component: HeroDetailComponent,
        // TODO: Implement with resolver data to get the name of the hero
        // title(route, state) {
        //     return `${state.hero.name} | Details | Tour of Heroes`;
        // },
        title: 'Hero Details | Tour of Heroes',
    },
    { path: 'heroes', component: HeroesComponent, title: 'My Heroes | Tour of Heroes' },
];

/**
 * Bootstrap the application — this is where the app starts.
 * `providers` array = the DI container configuration, like Spring's @Bean definitions.
 *
 * - provideRouter() = configures the URL routing system
 * - provideHttpClient() = registers HttpClient (like RestTemplate/WebClient in Spring)
 * - importProvidersFrom(HttpClientInMemoryWebApiModule) = plugs in the mock backend
 */
bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(
            routes,
            // Allows route params (like :id) to be automatically bound to component inputs
            withComponentInputBinding(),
            // Restores scroll position when navigating back
            withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
            // Enables smooth CSS view transitions between routes
            withViewTransitions(),
        ),
        // withFetch() tells Angular to use the modern Fetch API instead of XMLHttpRequest
        provideHttpClient(withFetch()),

        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        importProvidersFrom(
            HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
                dataEncapsulation: false,
            }),
        ),
    ],
});
