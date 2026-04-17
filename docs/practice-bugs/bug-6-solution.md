# ✅ Bug 6 Solution: Template Data Binding

## The Bug
In `hero-detail.component.ts`, the `(input)` event binding was changed to `[input]` property binding.

```html
<!-- ❌ BUG: [input] is property binding (TS→HTML), not event binding -->
<!-- This tries to SET a DOM property called "input", not LISTEN for the input event -->
<input
    [value]="hero()?.name"
    [input]="onInput(nameInput.value)"
/>

<!-- ✅ FIX: (input) is event binding (HTML→TS) — listens for user keystrokes -->
<input
    [value]="hero()?.name"
    (input)="onInput(nameInput.value)"
/>
```

## Why This Happens
Angular binding syntax uses different brackets for different directions:

| Syntax | Direction | Purpose | Java Analogy |
|--------|-----------|---------|--------------|
| `[prop]="expr"` | TS → HTML | Set a DOM property | `th:value="${name}"` in Thymeleaf |
| `(event)="handler()"` | HTML → TS | Listen for DOM events | `onclick` / form POST handler |
| `{{expr}}` | TS → HTML | Text interpolation | `${name}` in JSP EL |

`[input]` tries to set a DOM property called "input" (which doesn't exist).
`(input)` listens for the native `input` event fired on every keystroke.

## Java Analogy
```java
// ❌ Wrong: setting a read-only field instead of listening for changes
textField.setOnInputListener(null);  // no listener
textField.setInputProperty(handler); // this isn't a thing

// ✅ Right: registering an event listener
textField.addInputListener(event -> updateHeroName(event.getValue()));
```

## Key Takeaway
- **`[brackets]`** = push data TO the template (property binding)
- **`(parentheses)`** = listen for events FROM the template (event binding)
- Mixing them up is a silent bug — no error, just broken behavior

