# Contributing

## Language

All code, comments, JSDoc, error messages, ARIA labels, and user-facing strings **must be in Spanish**.

## Code conventions

### Components

- Use `forwardRef<HTMLElement, Props>` with a named function, and set `displayName`:
  ```tsx
  const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
    return <button ref={ref} ...>{children}</button>;
  });
  Button.displayName = "Button";
  ```

- Export prop interfaces: `export interface ButtonProps extends React.ComponentPropsWithoutRef<"button">`
- Compound components follow the `Namespace.Subcomponent` pattern:
  ```tsx
  Modal.Trigger = ModalTrigger;
  ModalTrigger.displayName = "ModalTrigger";
  ```

- Contexts use `createSafeContext<T>()` from `@/lib/utils/create-safe-context`
- `forceMount` prop on content components to keep DOM mounted during exit animations
- Avoid `any` — prefer `unknown` with type narrowing; only `as any` for unavoidable cases

### Hooks

- Hooks in `src/lib/hooks/` are general-purpose; component-specific logic stays in the component file
- Custom hooks return typed objects, not tuples

### Styling

- Tailwind v4 utility classes + `cn()` from `@/lib/utils/cn`
- No inline styles or CSS-in-JS
- CSS variables under `--qk-*` namespace for runtime theming
- Animation durations and easings in CSS, not JS

### Tokens

- All token arrays/objects in `src/lib/tokens/index.ts` must be `Object.freeze()` or `as const`
- Radius, easing, spacing, shadow, typography, and z-index tokens are defined there
- Component-specific tokens stay in the component file

### State

- Controlled/uncontrolled pattern via `useControllableState` when applicable
- Stable store (like toast) uses module-level variables + Set-based listener notification

### Testing

- One `.test.jsx` per component in `tests/runtime/`
- Use `@testing-library/react` queries (getByRole, findByText, etc.)
- Render with `renderWithProvider` when the component depends on QuickitProvider
- Tests must pass before merge: `npm test`

### Naming

- **Files**: PascalCase for components (`Button.tsx`), camelCase for utils/hooks (`useBreakpoint.ts`)
- **Props**: camelCase, descriptive
- **CSS classes**: `qk-*` prefix for component-specific, utility classes via Tailwind

## PR checklist

- [ ] Build passes (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] All tests pass (`npm test`)
- [ ] `displayName` set on every component
- [ ] No hardcoded English text
- [ ] New tokens are frozen with `Object.freeze()`
