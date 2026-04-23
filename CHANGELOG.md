# Changelog

## 1.0.9 - 22 de abril de 2026

Release de parche para corregir la publicación del subpath de estilos del paquete.

### Cambios destacados

- Se corrigió la exportación de `styles.css` para que `@import "quickit-ui/styles.css";` resuelva de forma fiable en proyectos consumidores.
- El paquete ahora publica un archivo físico `dist/styles.css` además del CSS principal generado por Vite.

## 1.0.7 - 22 de abril de 2026

Release de consolidación enfocada en alinear la librería, el website y la documentación con una pasada completa de hardening técnico y visual.

### Highlights

- Librería y docs quedaron alineadas con el runtime real en props, accesibilidad y ejemplos.
- Se endurecieron formularios, overlays, feedback global, tablas, pickers y controles complejos.
- Se cerró la distribución del paquete con builds, type checks, tests runtime y `npm pack --dry-run` en verde.

### Cambios destacados

- `FormControl`, `Label`, `Input`, `Textarea`, `Select`, `Combobox`, `DatePicker`, `TimePicker` y `Range` quedaron mejor conectados en naming accesible, estados y contratos de integración.
- `Modal`, `Drawer`, `Popover`, `Tooltip`, `Dropdown` y `CommandPalette` mejoraron consistencia accesible y comportamiento de interacción.
- `CommandPalette` ahora evita que varias instancias respondan al mismo atajo global al mismo tiempo.
- `EmptyState` añade un patrón más sólido para icono superior y acciones mobile-first con `EmptyState.Icon`.
- `AvatarPresence` pasa a ser decorativo por defecto y solo anuncia estado cuando recibe `label`.
- El website ahora documenta mejor formularios, shortcuts, composición y restricciones reales de cada componente.
- Se corrigieron tokens de tema `brand` para que librería y docs generen y consuman los mismos colores.

### Migración principal desde 0.2.4

Revisa [docs/migration.md](docs/migration.md).

## 1.0.3 - 19 de abril de 2026

Release de parche con mejoras de interacción, responsividad y calidad visual en componentes y ejemplos del sitio.

## 1.0.2 - 19 de abril de 2026

Release de parche con correcciones menores y mejoras.

## 1.0.1 - 19 de abril de 2026

Release de parche con correcciones menores y mejoras.

## 1.0.0 - 18 de abril de 2026

Primera release estable de Quickit UI.

### Highlights

- Soporte oficial para React 18.2+ y React 19.
- Nuevos primitives estables: `Combobox`, `DatePicker`, `CommandPalette`, `DataTable`, `Drawer`, `Stepper`, `Progress` y `Toaster`.
- Overlays y capas flotantes reforzados con mejor manejo de foco, cierre y consistencia de contratos.
- Documentación con buscador en header, navegación unificada y páginas de componente divididas por archivo.
- Cobertura de tests y type checks ampliada para endurecer la API pública.

### Cambios destacados

- `Dropdown`, `Modal`, `Drawer` y `Popover` quedaron más consistentes en accesibilidad, cierre y posicionamiento.
- `Breadcrumb` simplifica el caso común con `Breadcrumb.Item` usando `href` o `current`.
- `Link` añade `rel="noopener noreferrer"` automáticamente cuando se usa `target="_blank"`.
- `DatePicker` mejora apertura por teclado, render de días adyacentes y navegación por vistas.
- El sitio de docs deja de depender de un `DocsPage` monolítico y ahora consume docs por componente.

### Migración desde 0.2.4

La migración a `1.0.0` no introduce una ruptura masiva, pero conviene revisar:

- overlays personalizados (`Modal`, `Drawer`, `Dropdown`, `Popover`, `CommandPalette`)
- usos antiguos o verbosos de `Breadcrumb`
- formularios y selección de fecha si adoptas `Combobox` o `DatePicker`
- integraciones con `Link` cuando abras pestañas nuevas

Checklist recomendada:

```bash
npm install quickit-ui@1.0.0
npm run lint
npm run test
npm run test:types
npm run build
```
