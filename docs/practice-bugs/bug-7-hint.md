# 🐛 Bug 7: Component Communication (model)

## Symptom
On the "My Heroes" page, you can type a new hero name and click "Add Hero".
The server call succeeds (you see the message in the Messages section),
but the **new hero never appears in the list**.

## Concept
Angular components communicate via **inputs and outputs**:
- `input()` = read-only data flowing from parent → child (like a constructor parameter)
- `output()` = events flowing from child → parent (like a callback)
- `model()` = **two-way binding** — the child can read AND write back to the parent

## Hint
Look at `new-hero.component.ts`. The `heroes` field is used to both read the current
hero list AND append new heroes to it. What kind of binding does it need?
Then check how the parent (`heroes.component.ts`) uses it: `[(heroes)]="heroes"`.

> 💡 In Java: `input()` is like passing an immutable object — the child can read but not modify.
> `model()` is like passing a mutable `List<Hero>` reference — the child can add items
> and the parent sees the changes immediately.

