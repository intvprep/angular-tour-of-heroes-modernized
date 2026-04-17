# 🐛 Angular Practice Bugs

Welcome! This branch contains **7 intentional bugs**, each targeting a core Angular concept.
Each bug is tagged so you can checkout, diagnose, and fix it yourself.

## How to Use

```bash
# List all practice bug tags
git tag -l "bug-*"

# Checkout a specific bug to practice
git checkout bug-1-signals

# Read the hint (no spoilers!)
cat docs/practice-bugs/bug-1-hint.md

# Try to fix it yourself...

# When stuck, read the solution
cat docs/practice-bugs/bug-1-solution.md

# Reset and move to the next bug
git checkout practice-bugs   # back to clean branch
git checkout bug-2-di        # next bug
```

## Bug List

| Tag | Concept | Difficulty | File(s) Affected |
|-----|---------|------------|------------------|
| `bug-1-signals` | Signals | ⭐ | `dashboard.component.ts` |
| `bug-2-di` | Dependency Injection | ⭐⭐ | `hero.service.ts` |
| `bug-3-subscribe` | RxJS / Observables | ⭐ | `heroes.component.ts` |
| `bug-4-routing` | Routing & Navigation | ⭐⭐ | `main.ts` |
| `bug-5-lifecycle` | Lifecycle Hooks | ⭐⭐ | `dashboard.component.ts` |
| `bug-6-binding` | Template Data Binding | ⭐ | `hero-detail.component.ts` |
| `bug-7-model` | Component Communication (model) | ⭐⭐⭐ | `new-hero.component.ts` |

## Tips

- **Read the error messages** — Angular gives very descriptive errors
- **Check the browser console** (F12 → Console tab) for runtime errors
- **Check the terminal** where `ng serve` is running for compile errors
- Each bug has exactly **one root cause** — don't overthink it

Happy debugging! 🚀

