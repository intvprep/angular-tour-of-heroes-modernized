# ✅ Bug 5 Solution: Lifecycle Hooks

## The Bug
In `dashboard.component.ts`, the `ngOnInit()` method exists but the class doesn't
implement `OnInit`, AND the method has been renamed to `onInit()` (lowercase "ng").

```typescript
// ❌ BUG: wrong method name — Angular looks for ngOnInit, not onInit
export class DashboardComponent {
    onInit() {
        this.heroService.getHeroes().subscribe(heroes => this.heroes.set(heroes.slice(1, 6)));
    }
}

// ✅ FIX: implement OnInit and use the correct method name
export class DashboardComponent implements OnInit {
    ngOnInit() {
        this.heroService.getHeroes().subscribe(heroes => this.heroes.set(heroes.slice(1, 6)));
    }
}
```

## Why This Happens
Angular lifecycle hooks have specific names prefixed with `ng`:
- `ngOnInit`, `ngOnDestroy`, `ngOnChanges`, etc.

If you name the method `onInit()` instead of `ngOnInit()`, Angular doesn't recognize it
as a lifecycle hook and never calls it. The `implements OnInit` interface helps catch this
at compile time — TypeScript will error if the required method is missing or misspelled.

## Java Analogy
```java
// ❌ Wrong: misspelled annotation — Spring won't call it
@PostContruct  // typo!
public void init() { ... }

// ✅ Right: correct annotation name
@PostConstruct
public void init() { ... }
```

## Key Takeaway
1. **Always `implements OnInit`** (or other lifecycle interfaces) — it provides compile-time safety
2. **Method names must be exact**: `ngOnInit`, not `onInit` or `init`
3. The `implements` keyword is technically optional at runtime, but it catches typos at compile time

