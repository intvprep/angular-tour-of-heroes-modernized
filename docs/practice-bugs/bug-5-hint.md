# 🐛 Bug 5: Lifecycle Hooks

## Symptom
The Dashboard page shows a spinner forever — heroes never load.
The Heroes page works perfectly fine.

## Concept
Angular components have **lifecycle hooks** — special methods that Angular calls
at specific moments (creation, change, destruction). They're like `@PostConstruct`
and `@PreDestroy` in Spring.

## Hint
Look at `dashboard.component.ts`. The `ngOnInit()` method contains the code that
fetches heroes. But does Angular know to call it?

Compare the class declaration with `heroes.component.ts` — what's different?

> 💡 In Java: if you have a method annotated with `@PostConstruct`, Spring calls it
> automatically. But in Angular, the class must *declare* that it implements the
> lifecycle interface for the compiler to wire it up properly.

