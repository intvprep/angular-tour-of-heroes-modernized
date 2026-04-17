# ✅ Bug 7 Solution: Component Communication (model)

## The Bug
In `new-hero.component.ts`, `model.required()` was changed to `input.required()`.

```typescript
// ❌ BUG: input() is read-only — .update() doesn't propagate changes to the parent
heroes = input.required<Hero[]>();

// ✅ FIX: model() enables two-way binding — changes flow back to the parent
heroes = model.required<Hero[]>();
```

Also need to fix the import:
```typescript
// ❌ BUG
import { Component, inject, input } from '@angular/core';

// ✅ FIX
import { Component, inject, model } from '@angular/core';
```

## Why This Happens
- `input()` creates a **read-only** signal. The parent pushes data down, but the child
  cannot push data back up. Calling `.update()` on an input signal changes the local
  copy but the parent never sees it.
- `model()` creates a **read-write** signal with two-way binding. When the child calls
  `.update()`, Angular automatically emits the new value back to the parent via the
  `[(heroes)]` banana-in-a-box syntax.

The parent template uses `[(heroes)]="heroes"` which is shorthand for:
```html
[heroes]="heroes()" (heroesChange)="heroes.set($event)"
```
With `input()`, there's no `heroesChange` output, so the second half is broken.

## Java Analogy
```java
// ❌ input() = like passing an immutable copy
void addHero(List<Hero> heroes) {  // heroes is a copy
    heroes.add(newHero);           // only modifies the local copy
    // parent's list is unchanged!
}

// ✅ model() = like passing the actual mutable reference
void addHero(List<Hero> heroes) {  // heroes is the same object reference
    heroes.add(newHero);           // parent's list is also updated
}
```

## Key Takeaway
- Use `input()` when data flows **one way** (parent → child, read-only)
- Use `model()` when the child needs to **modify data and send it back** to the parent
- `[(banana)]` syntax (two-way binding) requires `model()`, not `input()`

