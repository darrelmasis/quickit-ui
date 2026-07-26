# Quickit UI — Agent Guide

## Commands

| command | what it does |
|---------|-------------|
| `npm run dev` | Vite dev server (docs mode, not library) |
| `npm run build` | Build library + copy types |
| `npm test` | Run all tests (vitest, jsdom) |
| `npm test -- --run <file>` | Single test file |
| `npm test -- -t "test name"` | Single test by name |
| `npm run test:types` | Type-check dist types via public-api.tsx |
| `npm run lint` | ESLint on everything |
| `npm run build:docs` | Build docs site to dist-docs/ |
| `npm run component:create` | Scaffold a new component |

CI runs `lint → test → build` in that order (`.github/workflows/ci.yml`).

## Architecture

- **Library entry:** `src/lib/index.ts` — re-exports from `components/`, `hooks/`, `tokens/`, `theme/`, `utils/`
- **Vite lib build:** `src/lib/index.js` (yes, `.js` — Vite resolves via `src/lib/index.ts` at build time). React is external, Tailwind v4 via `@tailwindcss/vite`
- **Type declarations:** `src/lib/quickit-ui.d.ts` is **hand-written** (not generated). Must stay in sync with implementation. Copied to `dist/` via `scripts/copy-types.mjs`
- **CSS:** Tailwind v4 `@theme` in `src/lib/styles.css`. CSS custom properties under `--qk-*` namespace. No CSS-in-JS
- **Path alias:** `@/` → `src/` in both Vite and vitest configs

## Test quirks

- Tests in `tests/runtime/*.test.jsx` (`.jsx`, not `.tsx`)
- Uses `jsdom` environment with `css: false`
- Setup mocks `scrollIntoView` and `ResizeObserver` globally
- `renderWithProvider` helper wraps components that need `QuickitProvider`

## Conventions (must follow)

- **Components:** `forwardRef<HTMLElement, Props>(function Named(...)` + `Named.displayName = "Named"`
- **Lenguaje:** Español en todo — comentarios, errores, cadenas de texto, etiquetas ARIA
- **Types:** Export prop interfaces. No `any` (warn-only lint, but prefer `unknown`). Use `as const`/`Object.freeze()` for token arrays
- **Context:** `createSafeContext<T>(rootName)` — returns `[Context, useSafeContext]` tuple
- **Arrow keys:** `DropdownContent`, `TabsTrigger` use `aria-activedescendant` with virtual focus — do NOT move real DOM focus to option elements in lists
- **Toast store:** Module-level mutable state + Set-based subscriber pattern (not Zustand/Redux)
- **New components:** `npm run component:create` scaffolds the skeleton

## State of refactor

`refactor.md` at root defines 9 stages. Stage 0 and Stage 1 are complete (TS migration, lint strict, displayName, Spanish-only, tokens frozen, CONTRIBUTING.md).


## Workflow Rules
- Tasks are executed sequentially, not in parallel.
- New instructions are queued until the current task finishes.
- CI/CD tasks (lint → test → build) always run in that order.
- Urgent tasks (security fixes) may override queue.

## Task Queue
- Queue mode: FIFO (first in, first out).
- No task interrupts another unless marked as urgent.
- Documentation tasks run only after testing tasks.
