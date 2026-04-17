# ✅ Bug 3 Solution: RxJS / Observables

## The Bug
In `heroes.component.ts`, the `.subscribe()` call is missing from the HTTP Observable.

```typescript
// ❌ BUG: Observable is created but never subscribed — HTTP call never fires
getHeroes() {
    this.heroService.getHeroes();
}

// ✅ FIX: subscribe() triggers the Observable and executes the HTTP call
getHeroes() {
    this.heroService.getHeroes()
        .subscribe(heroes =>
            this.heroes.set(heroes.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name)))
        );
}
```

## Why This Happens
Observables are **lazy by design**. The `.pipe()` chain just *describes* what to do —
it doesn't *do* anything. You must call `.subscribe()` to start the execution.

This is the #1 most common RxJS mistake for newcomers.

## Java Analogy
```java
// ❌ Wrong: pipeline is defined but never executed
Flux.fromIterable(heroes)
    .filter(h -> h.isActive())
    .map(Hero::getName);
// Nothing happens! No terminal operation.

// ✅ Right: .subscribe() or .block() triggers execution
Flux.fromIterable(heroes)
    .filter(h -> h.isActive())
    .map(Hero::getName)
    .subscribe(name -> System.out.println(name));
```

It's also like Java Streams:
```java
// ❌ Stream pipeline without terminal operation — nothing happens
list.stream().filter(x -> x > 5).map(x -> x * 2);

// ✅ Terminal operation triggers the pipeline
list.stream().filter(x -> x > 5).map(x -> x * 2).collect(Collectors.toList());
```

## Key Takeaway
**Observables are lazy.** Always `.subscribe()` to execute them.
If you see an Observable pipeline with no `.subscribe()`, the HTTP call will never fire.

