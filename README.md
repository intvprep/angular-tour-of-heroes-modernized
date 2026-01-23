# Angular Tour of Heroes (Modernized)

This project contains a completed version of the web app from [Angular's Tour of Heroes tutorial](https://angular.dev/tutorial/tour-of-heroes), with modifications to showcase modern Angular features as of **Angular 21.1.1**. Those changes include:

- [Standalone components](https://angular.dev/guide/components#imports-in-the-component-decorator), application bootstrap, and routing
- Inline templates and styles
- [`inject()`](https://angular.dev/guide/di#injecting-dependencies-with-inject) dependency injection function
- [ESBuild-based Angular builder](https://angular.dev/tools/cli/build-system-migration#manual-migration) (`@angular-devkit/build-angular:browser-esbuild`)
- [Vite-based Angular development server](https://angular.dev/tools/cli/build-system-migration#vite-as-a-development-server)
- [Signals](https://angular.dev/guide/signals) for state management
- [`OnPush` change detection](https://angular.dev/guide/signals#reading-signals-in-onpush-components) in the root component
- [`toSignal()` and `toObservable()`](https://angular.dev/ecosystem/rxjs-interop) interoperability functions
- [Signal-based `input` function](https://angular.dev/guide/components/inputs) for component props
- [New control flow syntax (`@if` and `@for`)](https://angular.dev/guide/templates/control-flow) replaces the `*ngIf` and `*ngFor` directives
- [NgOptimizedImage](https://angular.dev/guide/image-optimization) for automatic image loading optimizations
- [Router view transitions](https://angular.dev/guide/routing/route-transition-animations#how-view-transitions-work)
- [Fetch-based HttpClient](https://angular.dev/guide/http/setup#withfetch) via `withFetch()`
- [Tailwind CSS v4](https://tailwindcss.com/docs/installation/framework-guides/angular) with config colocated in CSS
- [Tailwind UI](https://tailwindui.com/components) design system components
- Placeholder loading elements to prevent [cumulative layout shift](https://web.dev/cls/)
