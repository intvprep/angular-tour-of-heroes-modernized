/**
 * AppComponent — The root component of the application.
 * Think of this as the main layout template in a Java web app (like a Thymeleaf layout
 * or JSP master page). Every page renders inside this shell.
 *
 * Key Angular concepts shown here:
 * - @Component decorator = like @Controller + @RequestMapping combined
 * - `selector` = the custom HTML tag name, e.g. <app-root>
 * - `imports` = declares which other components/directives this component uses
 *   (similar to Java import statements, but for the template)
 * - `template` = inline HTML (like an embedded JSP/Thymeleaf template)
 * - `styles` = scoped CSS that only applies to this component
 */
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
// toSignal bridges RxJS Observables → Angular Signals (reactive primitives)
import { toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { Event, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { MessagesComponent } from './components/messages.component';

@Component({
    selector: 'app-root',
    standalone: true,
    // OnPush = only re-render when inputs or signals change (performance optimization)
    // Similar to avoiding unnecessary DB queries — don't recompute if data hasn't changed
    changeDetection: ChangeDetectionStrategy.OnPush,
    // Components used in the template must be declared here
    imports: [RouterOutlet, RouterLink, MessagesComponent, NgOptimizedImage],
    template: `
        <div class="min-h-full">
            <!-- Navigation bar — always visible at the top -->
            <nav class="sticky top-0 border-b border-gray-200 bg-white">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex h-16 justify-between">
                        <div class="flex">
                            <div class="flex flex-shrink-0 items-center">
                                <!-- NgOptimizedImage auto-optimizes image loading (lazy load, srcset, etc.) -->
                                <img
                                    class="h-12 w-auto lg:block"
                                    ngSrc="/assets/angular-signals.png"
                                    width="48"
                                    height="48"
                                    alt="Angular Logo"
                                />
                            </div>
                            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                <!--
                                    routerLink = like <a href="..."> but for SPA navigation (no page reload).
                                    [class.current] = conditional CSS class binding.
                                    isDashboard() calls a Signal — Angular tracks it and updates the DOM reactively.
                                -->
                                <a
                                    class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                                    routerLink="/dashboard"
                                    [class.current]="isDashboard()"
                                    [class.default]="!isDashboard()"
                                >
                                    Dashboard
                                </a>
                                <a
                                    class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                                    routerLink="/heroes"
                                    [class.current]="isHeroes()"
                                    [class.default]="!isHeroes()"
                                >
                                    Heroes
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="flex flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
                <!--
                    <router-outlet> = the placeholder where routed components render.
                    Like a <div id="content"> in a JSP layout where each page's content appears.
                    When the URL changes, Angular swaps the component shown here.
                -->
                <router-outlet></router-outlet>

                <div class="relative">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center">
                        <span
                            class="bg-gray-50 px-3 text-base leading-6 font-semibold text-gray-900"
                        >
                            Messages
                        </span>
                    </div>
                </div>

                <!-- Child component rendered via its selector — like including a JSP fragment -->
                <app-messages></app-messages>
            </div>
        </div>
    `,
    styles: [
        `
            a.current {
                color: theme('colors.gray.900');
                border-color: theme('colors.blue.500');
            }

            a.default {
                color: theme('colors.gray.500');
                border-color: transparent;
            }

            a.default:hover {
                color: theme('colors.gray.700');
                border-color: theme('colors.gray.300');
            }
        `,
    ],
})
export class AppComponent {
    /**
     * inject(Router) = Angular's DI, equivalent to @Autowired in Spring.
     * The `inject()` function is the modern alternative to constructor injection.
     */
    private router = inject(Router);

    /**
     * `toSignal()` converts an RxJS Observable into a Signal.
     *
     * Signals are Angular's reactive primitives — think of them like
     * a variable that automatically notifies the UI when it changes.
     * Java equivalent: an ObservableValue in JavaFX, or a reactive Mono in WebFlux.
     *
     * Here we listen to router navigation events and extract the current URL.
     * - filter() = like Stream.filter() — only keep NavigationEnd events
     * - map() = like Stream.map() — extract the URL string
     */
    location = toSignal(
        this.router.events.pipe(
            filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
            map(event => event.url),
        ),
    );

    /**
     * computed() = derived/calculated state that auto-updates when dependencies change.
     * Like a @Transient getter in JPA that computes a value from other fields.
     * When `location()` changes, these automatically recompute.
     */
    isHeroes = computed(() => this.location() === '/heroes');
    isDashboard = computed(() => this.location() === '/dashboard');
}
