# Changelog

## [1.2.0] — 2026-07-12

### Added
- `secondary` color semántico mapeado a `purple`, registrado en `QUICKIT_SEMANTIC_COLORS` y `QUICKIT_ACCENT_COLORS`
- 5 nuevos archivos theme-classes: `input-group`, `input-affix`, `date-picker`, `avatar`, `toaster`
- Documentación del sistema de temas en `docs/architecture.md`

### Changed
- **Breaking**: Mapa de colores semánticos actualizado:
  - `primary` ahora mapea a `blue` (antes `sky`)
  - `secondary` mapea a `purple` (nuevo)
  - `success` ahora mapea a `green` (antes `emerald`)
  - `danger` ahora mapea a `red` (antes `rose`)
- Todas las clases de color Tailwind migradas a `src/lib/theme/theme-classes/`; ningún componente JSX contiene literales de color
- El modo oscuro se maneja con objetos `light`/`dark` separados en cada theme-classes file, no con selectores CSS `.dark`
- Los colores se personalizan vía `@theme` sobrescribiendo variables nativas (ej. `--color-blue-600`) sin capa de variables intermedias

## [1.1.0] — 2026-07-11

### Added
- New `soft` variant for all action controls (Button, ButtonGroup, Link, etc.): border + subtle background in normal state, solid fill on hover
- `"soft"` added to `QUICKIT_BUTTON_VARIANTS` and TypeScript declarations

### Changed
- **Breaking default change**: All components with a `variant` prop now default to `"soft"` (was `"solid"`/`"default"`)
- **Breaking default change**: All components with a `color` prop now default to `"neutral"` (was `"primary"`/`"info"`)
- ButtonGroup redesigned: outline uses negative-margin overlap; solid/ghost auto-inject dividers between buttons
- Removed 36 per-component `index.js` barrel files — imports resolve directly to component files

### Fixed
- `Show` component: children no longer evaluated eagerly when `when` is falsy
- `forwardRef` warnings in DataTable and Pagination (ref destructured from props instead of second parameter)
- Playground page no longer crashes when Combobox selection is cleared

## [1.0.17] — 2026-07-11

### Added
- ARIA compliance: `aria-describedby`, `aria-label` fallbacks, `aria-controls` conditional on open, `aria-haspopup`/`aria-controls` on Combobox/Select triggers
- 9 accessibility tests in `tests/runtime/accessibility.test.jsx`
- `loading` and `emptyText` props to DataTable, Select, Combobox
- `forwardRef` support to Accordion, Tabs, FormControl, Stepper, Toaster, Popover, Tooltip, DataTable, Pagination, Modal (Trigger/Content/Action), Drawer (Trigger/Content/Action)
- TypeScript declarations for ButtonGroup, lockAppScroll/unlockAppScroll, useMergeRefs, 10 theme-classes constants, `emptyText`/`loading` props
- Scaffolding script (`npm run component:create Nombre`)
- Centralized texts in `src/lib/texts.js` (27 constants)

### Changed
- Replaced Tailwind v4-removed `space-y-*`/`space-x-*` with `flex flex-col gap-*` (4 in lib/, 100+ in website/)
- Split monolithic `theme-classes.js` (1190 lines) into 25 per-component files under `src/lib/theme/theme-classes/`
- Standardized export patterns: all components have both named + default export

### Fixed
- Tabs bubble bug (`display: ""` → `"block"` in `measureIndicator`)
- Removed erroneous `aria-selected` from CommandPalette options

## [1.0.16] — 2026-06-30

### Added
- Initial public release
- 36 components: Accordion, Alert, Avatar, Badge, Breadcrumb, Button, ButtonGroup, Checkbox, Combobox, CommandPalette, Container, DataTable, DatePicker, Drawer, Dropdown, EmptyState, FormControl, Input, Label, Link, Modal, Pagination, Popover, Progress, Radio, Range, Select, Skeleton, Stepper, Switch, Tabs, Textarea, TimePicker, Toaster, Tooltip
- Light/dark mode support
- Custom theme engine with CSS variables
- Floating UI integration for popovers, tooltips, dropdowns
