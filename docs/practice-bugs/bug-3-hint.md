# 🐛 Bug 3: RxJS / Observables

## Symptom
The "My Heroes" page shows a loading spinner forever. No heroes appear.
No errors in the console. The dashboard works fine.

## Concept
Angular uses **RxJS Observables** for async operations like HTTP calls.
Observables are *lazy* — they don't execute until someone subscribes.

## Hint
Look at `heroes.component.ts`, specifically the `getHeroes()` method.
The HTTP call is set up... but is anything actually *triggering* it?

> 💡 In Java Reactor terms: a `Mono` or `Flux` does nothing until you call
> `.subscribe()` or `.block()`. Just creating the pipeline doesn't execute it.

