# 🐛 Bug 4: Routing & Navigation

## Symptom
Clicking on a hero from the Dashboard or Heroes list navigates to the detail page,
but the hero details never load — you see skeleton loaders forever.
No errors in the browser console.

## Concept
Angular's **Router** maps URL paths to components and can pass **route parameters**
(like Spring's `@PathVariable`). The parameter name in the route config must match
what the component expects.

## Hint
Look at `main.ts` where routes are defined. Then look at `hero-detail.component.ts`
and see what input name it expects. Do they match?

> 💡 In Spring: if your route is `/heroes/{heroId}` but your controller has
> `@PathVariable("id")`, it won't match. Same principle here.

