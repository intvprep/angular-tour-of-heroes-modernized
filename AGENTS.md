# Contributor Guidelines

This project is an Angular single-page application. Write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Angular Best Practices

- Use standalone components over NgModules when possible
- Do NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for all state management when possible or RxJS when needed for compatibility
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

### Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

### State Management

- Use signals for local component state
- Use arrow functions (e.g. `derived = () => state() * 2`) for derived state
    - Use `computed()` for derived state ONLY when the recomputing the state is expensive and it is ABSOLUTELY NECESSARY to memoize the derived state
- Keep state transformations pure and predictable inside of derived state
- Do NOT use `mutate` on writable signals, use `update` or `set` instead
- Use `linkedSignal` when its necessary for a writable signal to be overwritten when derived state changes
- Use `resource` and `httpResource` when async reactive state is necessary
    - Take advantage of the `abortSignal` property in the resource loader to cancel async actions when no longer needed
- Never pass in services as inputs. Always use inject

### Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

### Services

- Design services around a single responsibility
- Prefer to provide services only into the topmost component in which they are used
    - Use the `providedIn: 'root'` option ONLY for singleton services, ONLY when they are needed by the entire application
- Use the `inject()` function instead of constructor injection

## Forms

- Always use reactive forms
- Always use strongly typed forms

## Beads

This project uses **bd** (beads) for issue tracking. Run `bd onboard` to get started.

### Using Beads Quickstart

```sh
# Find ready work
bd ready --json | jq '.[0]'

# Create issues during work
bd create "Discovered bug" -t bug -p 0 --json

# Link discovered work back to parent
bd dep add <new-id> <parent-id> --type discovered-from

# Update status
bd update <issue-id> --status in_progress --json

# Complete work
bd close <issue-id> --reason "Implemented" --json

bd show <id>          # View issue details
bd sync               # Sync with git
```

### Creating New Issues

```sh
# IMPORTANT: Always quote titles and descriptions with double quotes
bd create "Issue title" -t bug|feature|task -p 0-4 -d "Description" --json

# Create with acceptance criteria
bd create "Issue title" -t feature -p 1 -d "Description" --acceptance "Acceptance Criteria" --json

# Add technical design notes
bd create "Issue title" -t feature -p 1 -d "Description" --design "Technical Design Notes" --json

# Create with labels (--labels or --label work)
bd create "Issue title" -t bug -p 1 -l bug,critical --json
bd create "Issue title" -t bug -p 1 --label bug,critical --json

# Create epic with hierarchical child tasks
bd create "Auth System" -t epic -p 1 --json                     # Returns: bd-a3f8e9
bd create "Login UI" -p 1 --parent bd-a3f8e9 --json             # Auto-assigned: bd-a3f8e9.1
bd create "Backend validation" -p 1 --parent bd-a3f8e9 --json   # Auto-assigned: bd-a3f8e9.2
bd create "Tests" -p 1 --parent bd-a3f8e9 --json                # Auto-assigned: bd-a3f8e9.3

# Create and link discovered work (one command)
bd create "Found bug" -t bug -p 1 --deps discovered-from:<parent-id> --json
```

### Git Commit Quality Standards

All work MUST be committed using **small, focused, high-quality commits**. Commits are part of the project’s documentation and must be readable, reviewable, and reversible.

**MANDATORY RULES:**

* **One commit = one logical change**

  * One behavior change, fix, refactor, or mechanical update
  * Do NOT mix unrelated changes
* **Commits must map to intent**

  * A commit should clearly answer: *“What changed, and why?”*
* **Commits must be safe to revert**

  * Reverting a commit should not break unrelated functionality
* **Never commit broken states**

  * Tests, builds, and linters must pass at every commit point

#### Commit Size & Scope

* Prefer **many small commits** over a few large ones
* If a change feels “too small to commit,” it probably isn’t
* If a commit message needs “and” or “also,” it’s too big
* Refactors, formatting, and logic changes MUST be separate commits

**Examples of good commit boundaries:**

* Add validation logic → commit
* Update tests for validation → commit
* Refactor helper function → commit
* Rename variables or files → commit
* Reformat codebase → commit (no logic changes allowed)

#### Commit Messages

Commit messages MUST be clear, concise, and written in the **imperative mood**.

**Format:**

```
Short summary (≤ 72 chars)

Optional body explaining why, not how.
Reference relevant bd IDs when applicable.
```

**Good examples:**

* `Fix null handling in auth token parsing`
* `Add tests for expired session handling`
* `Refactor request middleware for clarity`

**Bad examples (NOT allowed):**

* `WIP`
* `Fix stuff`
* `Updates`
* `Changes`
* `Final`
* `Oops`

#### Relationship to Beads Issues

* Commits SHOULD align with the current `bd` issue
* Large issues SHOULD result in multiple commits
* Discovered work MUST result in:

  1. A new `bd` issue
  2. A commit that addresses only that issue

#### Staging Discipline

* Use `git add -p` or equivalent to stage intentionally
* Do NOT rely on `git add .` unless the commit is truly atomic
* Never commit debug logs, commented-out code, or experiments

#### Before You Commit

Before every commit, verify:

* Diff matches the commit message exactly
* No unrelated whitespace or formatting noise
* No TODOs added without a corresponding `bd` issue
* The commit stands alone and tells a clear story

### Beads Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - tests, linters, formatters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
    ```sh
    git pull --rebase
    bd sync
    git push
    git status  # MUST show "up to date with origin"
    ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**

- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds

## Chrome DevTools MCP

Use the `chrome-devtools` MCP server whenever you need to _see what the browser sees_ or debug behavior that depends on actual page state, network calls, or performance characteristics. It’s not a generic "fetch HTML" tool – think of it as a fully remote-controlled Chrome with DevTools wired into your agent.

### When you should use it

Reach for `chrome-devtools` when:

- A bug only reproduces in a real browser (hydration issues, layout glitches, event timing, etc.).
- You need to inspect console errors, network failures, or redirects.
- You’re diagnosing performance problems that require a real trace (slow TTI, long tasks, layout thrash, etc.).
- You need to drive realistic user flows (log in, click through a checkout, fill forms) to reproduce or verify behavior.

For static reasoning ("what does this code do?", "is this fetch URL correct?"), local code analysis is fine. For "why does this page _actually_ break?", use Chrome DevTools MCP.

### Core debugging workflows

Below are patterns agents should follow, with the main tools involved. Exact tool signatures live in [`docs/tool-reference.md`](./docs/tool-reference.md).

#### 1. Reproduce a bug in the browser

1. Open or select a page:
    - `new_page` or `navigate_page` to the URL.
    - If multiple tabs are open, use `list_pages` + `select_page`.
2. Drive the UI to reproduce the issue:
    - Use `click`, `fill`, `fill_form`, `press_key`, `hover`, `drag`, and `upload_file` as needed.
    - Use `wait_for` between key steps (e.g. waiting for selectors, navigation, or network idle) instead of hard assumptions about timing.
3. Capture evidence:
    - `take_screenshot` for visual bugs.
    - `take_snapshot` when you need a DOM snapshot for deeper analysis.

**Agent goal:** Recreate exactly what the user described, capture screenshots or snapshots, and summarize what you observed.

#### 2. Inspect console errors and runtime state

Once the page is in the failing state:

- Read console output:
    - Use `list_console_messages` (and `get_console_message` if you need details) to pull errors, warnings, and logs.
- Inspect runtime behavior:
    - Use `evaluate_script` for targeted checks, e.g.:
        - Inspecting `window.__STATE__`-like globals.
        - Checking specific DOM nodes for unexpected values or attributes.
        - Verifying feature flags or configuration.

**Agent goal:** Turn raw console + runtime state into a clear explanation of what’s breaking and why (bad API response, uncaught exception, null state, etc.).

#### 3. Debug network issues

For bugs involving APIs, authentication, or assets:

1. Reproduce the problematic flow (as above).
2. Use:
    - `list_network_requests` to see what was requested, status codes, and timing.
    - `get_network_request` to inspect headers and bodies for specific calls (e.g. failed POST, 500 errors, CORS failures).
3. Correlate:
    - Match network failures with console messages and UI symptoms.
    - Suggest fixes in code or configuration (e.g. wrong endpoint, missing header, invalid payload).

**Agent goal:** Identify which request is failing, why, and what code-side change would resolve it.

#### 4. Performance analysis

For performance investigations, prefer the dedicated performance tools:

1. Prepare the scenario:
    - Navigate to the relevant page and set up state.
2. Record a trace:
    - `performance_start_trace`
    - Perform the slow action (scroll, interaction, navigation, etc.).
    - `performance_stop_trace`
3. Ask for insights:
    - `performance_analyze_insight` to extract actionable findings (long tasks, heavy scripts, layout thrash, slow resources, etc.).
4. Link findings back to code:
    - Suggest concrete optimizations (code splitting, memoization, reducing layout work, image optimization, etc.) based on the trace.

**Agent goal:** Move from "it feels slow" to "here are the specific bottlenecks and code-level changes to fix them."

### Emulation & environment

Use emulation tools to reproduce user environments instead of guessing:

- `emulate` to switch device profiles, user agents, or throttling (e.g. mobile viewport, slow CPU/network).
- `resize_page` for quick responsive layout checks.

Combine emulation with the workflows above to debug "only broken on mobile" or "slow on 3G" issues.

### Good hygiene & safety

- **Minimize sensitive data exposure.** The MCP server exposes whatever is in the controlled browser session to the agent. Avoid testing on accounts or pages with sensitive personal data when possible, and be cautious when running on a real profile instead of an isolated one.
- **Use `wait_for` instead of spammy polling.** Prefer explicit waits for selectors or navigation over repeatedly calling tools in tight loops.
- **Keep flows deterministic.** Reuse the same page when possible instead of constantly opening/closing new tabs, so traces, console logs, and network activity stay easy to correlate.
- **Prefer isolated profiles for experiments.** Unless you intentionally need the same profile state, use the `--isolated` option in the MCP config to avoid polluting your main Chrome profile.

### Example prompts for agents

These are example _user_ prompts that agents should respond to by using `chrome-devtools` tools:

- "Open our staging login page, sign in with the provided test user, and tell me why the dashboard shows a blank screen."
- "Record a performance trace for loading `/search?q=test` on mobile emulation and tell me what’s making it slow."
- "Try submitting the checkout form with a fake credit card number and share the console errors and failing network requests."
- "On a 3G-like connection, check how long it takes before the main content is visible and suggest optimizations."

Agents should treat these as instructions to drive the browser through Chrome DevTools MCP, gather concrete evidence (screens, logs, traces), and then synthesize that into clear, opinionated debugging guidance.

## Technology Overview

- **Development runtime**: Node.js (v24.x.x)
- **Package manager**: npm
- **Toolchain manager**: Mise
- **Task runner**: Node (via `node --run`)
- **Bundler**: Angular CLI (Vite + esbuild under-the-hood)
- **JavaScript framework**: Angular (v21.x)
- **Router**: Angular Router
- **Styling**: Tailwind CSS (v4.x)
- **Unstyled Components**: [Angular Aria](https://angular.dev/guide/aria/overview) 
- **Animations**: [Angular Animations](https://angular.dev/guide/animations)
- **Formatter**: Prettier

## Tooling Setup

This project uses Mise for all toolchain management and Node/npm for task management.

> ![IMPORTANT]
> **DO NOT USE `npm run` for scripts!** All package scripts should be run via Node. You can run an individual script using `node --run <script-name>`, for example: `node --run fmt`.

## Debugging Approach

- Use `console.log` with clear prefixes (e.g. `[USER ID]: ${user.id}`) during development
- **❌ NEVER** attempt to run the dev server yourself, I will most likely already have the dev server manually running in another shell so that I can view the progress live via HMR in my browser.
- If you need to do some debugging, add some `console.log` statements, tell me where I need to look for the `console.log` statements when I run the project myself (browser console, server console, both, somewhere else, etc.), and then I will come back and paste the results of the `console.log` statements for you to debug with
- If you have access to the Chrome DevTools MCP, you should use it for inspecting any browser console logs and any DOM or style issues instead of asking me to manually inspect for you

## Node.js

- Always use the `node:` prefix for Node built-in module imports
- Format code with `node --run fmt` before committing
- Run `node --run typecheck` and fix all info, warnings, and errors
- Prefer `unknown` over `any` unless absolutely necessary
- Use JSDoc/TSDoc comments for public APIs
- Document important lines of code with a single line **meaningful** comment; do not just restate what is already obvious by looking at the code
- Prefer `jsr:@std/*` for standard library
    - JSR packages can be installed using `npx jsr add package-name`
- Use relative imports for local modules
- Prefer import aliases over relative imports for local modules (e.g. `~/*` for anything in the `./app/*` directory)
- Validate any environment variables in use at startup using `jsr:@std/assert`

# General Rules

## Correctness

- **Remove anything that isn’t used** – delete unused imports, function parameters, and private class members.
- **Exhaust every hook dependency** – always list _all_ external values in React hook dependency arrays.
- **Use only real selectors** – in CSS, reference valid pseudo-classes, pseudo-elements, and type selectors only.

## Suspicious Code

- **Skip the "any" shortcut** – prefer precise TypeScript types.
- **Hands off `document.cookie`** – manipulating cookies directly is forbidden. Use React Router's cookie utilities instead.

## Performance

- **Compile regexes once** – declare regular expressions at module scope, not inside hot functions.

## Style & Consistency

- **Stick to ES modules** – no `require` or other CommonJS patterns.
- **Prefer `import type`** – separate type-only imports.
- **Use the `node:` protocol** – write `import fs from 'node:fs'` rather than bare `'fs'`.
- **Arrays = `T[]`** – use shorthand array syntax consistently.
- **Don’t reassign parameters** – treat function arguments as read-only.
- **Favor `const`** – use `const` over `let` whenever a binding never changes.
- **One `const` per line** – declare variables individually.
- **Skip non-null assertions** – rewrite code so `!` isn’t necessary.
- **Avoid `enum`** – choose unions, objects, or literal types instead.
- **Stick with `trimStart/End`** – don’t use `trimLeft/Right`.
- **Default parameters go last** – never precede required params with optional ones.
- **Self-close when empty** – use `<Component />` instead of `<Component></Component>` when there are no children.
- **No unused template literals** – convert to quotes if you’re not interpolating.
- **Don’t write `substr`** – use `slice` instead.
- **Flatten simple `if` chains** – collapse `else { if … }` when feasible.
- **Export only the component** – in React Router routes, export nothing except the component and the whitelisted helpers (`loader`, `action`, `meta`, etc.).
- **Keep member access simple** – omit `public`, `private`, or `protected`. Use native JavaScript private properties (e.g. `#property`) when you need to make a property private.
- **Leverage `as const`** – assert immutability where appropriate.
- **Kill useless `else` blocks** – when the `if` branch returns or throws, omit the `else`.
- Prefer type inference when the type is obvious
