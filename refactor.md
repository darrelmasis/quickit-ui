# Quickit UI — Plan de Refactor Total

## Etapa 0 — Cimentación

- [ ] Unificar idioma a 100% inglés (comentarios, `TXT.js`, tests, errores)
- [ ] Definir y congelar tokens visuales (spacing, typography, shadows, easings)
- [ ] Escribir `CONTRIBUTING.md` con convenciones de patrones y nomenclatura
- [ ] Agregar `Component.displayName` a TODOS los componentes

## Etapa 1 — TypeScript + Linting Estricto

- [ ] Renombrar `.js`/`.jsx` → `.ts`/`.tsx` (~130 archivos)
- [ ] Tipar props con interfaces exportadas (todos los componentes)
- [ ] Tipar contexts, hooks, utils (`create-safe-context`, `cn`, `useRippleEffect`)
- [ ] Eliminar `void forceMount` en `AccordionContent`
- [ ] ESLint strict: `strict-type-checked`, `no-any`, `explicit-function-return-type`
- [ ] Configurar `tsconfig.json` para `src/` (no solo types)
- [ ] Limpiar imports no usados

## Etapa 2 — Refactor Arquitectónico

- [ ] Dividir componentes largos: `DatePicker.jsx` (719 líneas), `Input.jsx` (632)
- [ ] Crear hook `useControllableState` para estandarizar controlled/uncontrolled
- [ ] Crear hook `useOverlay` compartido (Modal + Drawer + Popover)
- [ ] Extraer SVG icons a archivos estáticos (no componentes React)
- [ ] Evaluar migración de `toast-store.js` a `useSyncExternalStore` o Zustand

## Etapa 3 — Testing (Cobertura Real)

- [ ] Ejecutar `vitest --coverage` y mapear componentes sin tests sólidos
- [ ] Escribir tests para: Stepper, TimePicker, Range, Progress, Skeleton, Container, Divider, EmptyState
- [ ] Agregar `jest-axe` con `toHaveNoViolations` en Modal, Popover, Combobox
- [ ] Tests de keyboard navigation: Arrow keys, Tab, Escape
- [ ] Tests de edge cases: controlled/uncontrolled, null/undefined props
- [ ] Subir thresholds a branches:70, functions:80, lines:80, statements:80

## Etapa 4 — Build & Distribución

- [ ] Dual CJS/ESM: `formats: ["es", "cjs"]` en vite.config.js
- [ ] Exports por componente en `package.json`: `"./button": "./dist/button.js"`
- [ ] Agregar `vite-plugin-visualizer` para bundle analysis
- [ ] Declarar `sideEffects` en `package.json`

## Etapa 5 — Sistema Visual y Tokens

- [ ] Auditoría de valores CSS hardcodeados → reemplazar con tokens
- [ ] Crear sistema de sombras: `--qi-shadow-sm/md/lg/xl`
- [ ] Crear sistema de tipografía: `--qi-font-*`, `--qi-leading-*`
- [ ] Unificar TODAS las transiciones al easing token `QUICKIT_EASE_DEFAULT`
- [ ] Auditar que todos los componentes usen `--qi-radius-*` (no `rounded-*` fijos)
- [ ] Buscar `bg-white`, `text-black`, `dark:` faltantes

## Etapa 6 — Storybook + Documentación

- [ ] `storybook init` con React + Vite
- [ ] CSF3 stories por componente con variantes (default, loading, disabled, dark, colores, tamaños)
- [ ] Autodocs para props automáticas
- [ ] Interaction tests (play function) para Modal, Tabs, Select
- [ ] Chromatic o storybook/test-runner para regression visual

## Etapa 7 — SSR & Rendimiento

- [ ] Hook `useIsomorphicLayoutEffect` compartido (ya existe en Tabs — estandarizar)
- [ ] SSR-safe guards para `window`/`document` en hooks
- [ ] Media query hooks con `matchMedia` diferido
- [ ] Lazy initialization en todos los `useState` que dependan del DOM

## Etapa 8 — UX Pulido

- [ ] Focus trap en Popover y Dropdown con `interactive=true`
- [ ] Scroll lock sin fugas (Modal + Drawer)
- [ ] `prefers-reduced-motion` en TODOS los componentes
- [ ] Loading states consistentes (skeleton/spinner/disabled)
- [ ] Empty states en Dropdown, Tabs, Accordion
- [ ] Mensajes de error claros en contexts (`createSafeContext` ya cubierto)

## Etapa 9 — CI/CD & Mantenimiento

- [ ] GitHub Actions: lint → typecheck → test --coverage → build
- [ ] Coverage gating (fallo si no se cumplen thresholds)
- [ ] commitlint + husky para conventional commits
- [ ] standard-version o semantic-release para changelog automático
- [ ] Workflow de npm publish desde CI
