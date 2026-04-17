# 🐛 Bug 6: Template Data Binding

## Symptom
The Hero Detail page loads correctly, but typing in the "Hero name" input field
does nothing — the name never updates. The Save button sends the *original* name.

## Concept
Angular has **4 types of data binding**, each with specific syntax:
- `{{value}}` — interpolation (TS → HTML, text content)
- `[property]="value"` — property binding (TS → HTML, DOM property)
- `(event)="handler()"` — event binding (HTML → TS, user actions)
- `[(ngModel)]="value"` — two-way binding (both directions)

Using the wrong syntax means data flows in the wrong direction — or not at all.

## Hint
Look at `hero-detail.component.ts`, specifically the `<input>` element for the hero name.
There are two bindings: one that sets the value, and one that listens for user input.
Is the event binding syntax correct?

> 💡 In Spring MVC/Thymeleaf: `th:value` pushes data TO the form,
> and the form POST sends data BACK. If the POST handler is broken,
> changes in the form never reach the server. Same idea here.

