# 🐛 Bug 1: Signals

## Symptom
The Dashboard page shows a loading spinner forever — the "Top Heroes" never appear.
No errors in the browser console. No errors in the terminal.

## Concept
Angular **Signals** are reactive state containers. But they work differently from plain variables.

## Hint
Look at the `dashboard.component.ts` template. How are signals accessed in templates?
Compare how `heroes` is used in the template vs how it's defined in the class.

> 💡 In Java terms: a Signal is like a method that returns a value, not a field.
> You wouldn't write `myList.size` in Java — you'd write `myList.size()`.

