/**
 * NewHeroComponent — A form to add new heroes.
 * Like a Spring MVC form-backing controller with @PostMapping.
 *
 * Key concept: model() = a two-way bindable signal.
 * The parent passes a signal via [(heroes)]="heroes", and this component
 * can both read and write it. Like passing a mutable List<Hero> reference in Java.
 */
import { Component, inject, model } from '@angular/core';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
    selector: 'app-new-hero',
    standalone: true,
    template: `
        <div class="mt-6 mb-12 bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-base leading-6 font-semibold text-gray-900">Add A New Hero</h3>
                <div class="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Add a new superhero to your roster and keep track of them below!</p>
                </div>
                <div class="mt-5">
                    <label
                        class="block text-sm leading-6 font-medium text-gray-900"
                        for="hero-name"
                    >
                        Hero Name
                    </label>
                    <div class="sm:flex sm:items-center">
                        <div class="w-full sm:max-w-xs">
                            <!--
                                #heroName = template reference variable (direct DOM access)
                                (keypress) = keyboard event binding — submits on Enter
                            -->
                            <input
                                #heroName
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6"
                                id="hero-name"
                                name="hero-name"
                                type="text"
                                placeholder="e.g. Wonder Woman, She-Hulk, etc."
                                (keypress)="onEnter($event, button)"
                            />
                        </div>
                        <!--
                            #button = template ref to the button element.
                            The click handler calls add() then clears the input field.
                            Multiple statements separated by ; are allowed in event bindings.
                        -->
                        <button
                            #button
                            class="mt-3 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:mt-0 sm:ml-3 sm:w-auto"
                            type="button"
                            (click)="add(heroName.value); heroName.value = ''"
                        >
                            Add Hero
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class NewHeroComponent {
    /**
     * model.required() = a two-way bindable signal (input + output combined).
     * The parent uses [(heroes)]="heroes" syntax to bind it.
     * When this component calls heroes.update(), the parent's signal updates too.
     */
    heroes = model.required<Hero[]>();
    private heroService = inject(HeroService);

    /** POST a new hero to the server, then append it to the local list */
    add(name: string) {
        name = name.trim();
        if (!name) return;

        this.heroService
            .addHero({ id: Math.floor(Math.random() * 90 + 10), name } as Hero)
            .subscribe(hero => {
                // .update() = immutable update pattern: create a new array with the new hero appended
                this.heroes.update(heroes => [...heroes, hero]);
            });
    }

    delete(hero: Hero) {
        this.heroes.update(heroes => heroes.filter(h => h !== hero));
        this.heroService.deleteHero(hero.id).subscribe();
    }

    /** Programmatically click the Add button when user presses Enter in the input */
    onEnter($event: KeyboardEvent, button: HTMLButtonElement) {
        if ($event.key === 'Enter') button.click();
    }
}
