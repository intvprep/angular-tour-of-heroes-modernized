# ✅ Bug 2 Solution: Dependency Injection

## The Bug
In `hero.service.ts`, `HttpClient` is created with `new` instead of `inject()`.

```typescript
// ❌ BUG: manually constructing HttpClient bypasses Angular's DI
private http = new HttpClient();

// ✅ FIX: use inject() to get the DI-managed instance
private http = inject(HttpClient);
```

## Why This Happens
`HttpClient` has its own dependencies (HTTP interceptors, the backend handler, etc.)
that are configured by Angular's DI system via `provideHttpClient()` in `main.ts`.

When you write `new HttpClient()`, you:
1. Bypass the DI container entirely
2. Don't get the configured interceptors (including the in-memory web API)
3. Get a constructor error because HttpClient requires dependencies you can't provide

## Java Analogy
```java
// ❌ Wrong: bypasses Spring DI, dependencies not injected
@Service
public class HeroService {
    private RestTemplate http = new RestTemplate(); // no interceptors, no config
}

// ✅ Right: let Spring inject the configured bean
@Service
public class HeroService {
    @Autowired
    private RestTemplate http; // fully configured with interceptors
}
```

## Key Takeaway
**Never use `new` for Angular services or framework classes.** Always use `inject()`
(or constructor injection) to get instances from the DI container. This ensures all
dependencies are properly wired, just like `@Autowired` in Spring.

