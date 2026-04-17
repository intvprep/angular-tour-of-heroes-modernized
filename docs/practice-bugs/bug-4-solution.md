# ✅ Bug 4 Solution: Routing & Navigation

## The Bug
In `main.ts`, the route parameter is named `:heroId` but the component expects an input named `id`.

```typescript
// ❌ BUG in main.ts: parameter name doesn't match component input
{ path: 'detail/:heroId', component: HeroDetailComponent }

// ✅ FIX: parameter name must match the input() name in the component
{ path: 'detail/:id', component: HeroDetailComponent }
```

The component declares:
```typescript
// This expects a route parameter named "id"
id = input.required<string>();
```

## Why This Happens
Angular's `withComponentInputBinding()` (configured in `main.ts`) automatically
maps route parameters to component inputs **by name**. If the route says `:heroId`
but the component input is called `id`, the binding silently fails — `id` stays
as an empty/undefined value.

The `effect()` in the component then tries to parse `undefined` as a number,
gets `NaN`, and returns early without fetching any hero.

## Java Analogy
```java
// ❌ Wrong: path variable name doesn't match parameter name
@GetMapping("/detail/{heroId}")
public Hero getHero(@PathVariable("id") Long id) {
    // id will be null — Spring can't match "heroId" to "id"
}

// ✅ Right: names must match
@GetMapping("/detail/{id}")
public Hero getHero(@PathVariable("id") Long id) {
    return heroService.findById(id);
}
```

## Key Takeaway
**Route parameter names must exactly match the component's `input()` names**
when using `withComponentInputBinding()`. A mismatch doesn't throw an error —
the input just never gets a value.

