# Changelog

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
