# 🐛 Bug 2: Dependency Injection

## Symptom
The app crashes on load with a runtime error. No heroes load. The browser console shows an error.

## Concept
Angular has a built-in **Dependency Injection (DI)** container, just like Spring.
Services must be obtained through DI — not created manually.

## Hint
Look at `hero.service.ts`. How are `HttpClient` and `MessageService` obtained?
In Spring, would you ever write `new RestTemplate()` inside a `@Service` class
instead of using `@Autowired`?

> 💡 Angular's `inject()` function = Spring's `@Autowired`.
> The DI container manages service lifecycles and their dependencies.

