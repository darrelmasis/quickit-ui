# Changelog

## 1.0.12 - 17 de mayo de 2026

Release de documentación e integración para aclarar el contrato de estilos con Tailwind CSS 4 y consolidar el manual completo de la librería.

### Cambios destacados

- Se documenta el orden recomendado para apps con Tailwind CSS 4: importar primero `quickit-ui/styles.css`, después `tailwindcss` y declarar `@theme` al final.
- Website, README y manual explican la diferencia entre integración sin Tailwind y con Tailwind para evitar que la cascada reintroduzca defaults de Quickit sobre tokens de la app.
- Se agrega `Quicki-UI-manual.md` como referencia completa de instalación, tema, comportamiento, tokens, utilidades, hooks, componentes, migración y guía para agentes.

## 1.0.11 - 17 de mayo de 2026

Release de hardening compatible para cerrar inconsistencias de API, accesibilidad, tokens y documentación.

### Cambios destacados

- `Radio` corrige estados `checked + hover` en dark mode para variantes de color.
- `Range` mejora accesibilidad de thumbs en modo doble, agrega labels configurables y serializa ambos extremos en formularios HTML cuando recibe `name`.
- `CommandPalette` genera IDs únicos por instancia para evitar colisiones de `aria-controls` y `aria-activedescendant` con múltiples paletas montadas.
- `Combobox` respeta `label` como `ReactNode` y usa `textValue` para búsqueda/input cuando el label es rico.
- `Switch` alinea `onCheckedChange` con `Checkbox` y `Radio` entregando también el evento sintético como segundo argumento.
- Los tokens públicos agregan colecciones compatibles más precisas: `QUICKIT_STATUS_COLORS`, `QUICKIT_BRAND_COLORS` y `QUICKIT_NEUTRAL_COLORS`.
- README, migración y docs del website documentan mejor `@theme`, `brand`, estilos, tokens y contratos de integración.
 
## 1.0.10 - 22 de abril de 2026
 
Fix para asegurar que los estilos de Tailwind CSS se empaqueten correctamente en la librería.
 
### Cambios destacados
 
- Se agregaron las importaciones de Tailwind (`theme` y `utilities`) al punto de entrada de estilos de la librería (`src/lib/styles.css`).
- Se optimizó el bundle de CSS eliminando el preflight (reset) para evitar conflictos en proyectos consumidores, manteniendo todas las utilidades necesarias para los componentes.
- Se verificó que el archivo `dist/quickit-ui.css` incluya correctamente todas las clases generadas por Tailwind.

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
