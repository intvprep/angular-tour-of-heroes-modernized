# ✅ Bug 1 Solution: Signals

## The Bug
In `dashboard.component.ts`, the template uses `heroes` instead of `heroes()`.

```html
<!-- ❌ BUG: heroes is a Signal, not a plain array -->
@if (!heroes.length) {
@for (hero of heroes; track hero.id) {

<!-- ✅ FIX: Call the signal as a function to get its value -->
@if (!heroes().length) {
@for (hero of heroes(); track hero.id) {
```

## Why This Happens
A **Signal** in Angular is a function that wraps a value. You must call it with `()` to read the current value.

- `heroes` → the Signal object itself (a function reference, always truthy)
- `heroes()` → the actual array value inside the Signal

Without `()`, `!heroes.length` evaluates `!undefined` which is `true` only if the
Signal function itself has no `.length` property — but since functions have `.length`
(number of parameters), this doesn't behave as expected.

## Java Analogy
Think of it like this:
```java
// Signal is like AtomicReference
AtomicReference<List<Hero>> heroes = new AtomicReference<>(new ArrayList<>());

// ❌ Wrong: checking the AtomicReference object itself
heroes.isEmpty(); // AtomicReference doesn't have isEmpty()

// ✅ Right: call .get() first to unwrap the value
heroes.get().isEmpty(); // checks the actual list
```

## Key Takeaway
**Always call signals with `()` in templates and TypeScript code** to read their value.
This is the most common beginner mistake with Angular Signals.

