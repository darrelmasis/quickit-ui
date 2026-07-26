# Quickit UI

Quickit UI es una librería de componentes para React 18.2+ / 19+ y Tailwind CSS 4. Está pensada para construir interfaces reales con una API consistente, soporte de tema, primitives compuestos y documentación integrada.

## Instalación

```bash
npm install quickit-ui
```

## Estilos

Importa los estilos de Quickit una sola vez en el entry de tu app. Este archivo incluye los estilos base de los componentes, colores de acento, variables CSS y variantes dark compiladas de la librería.

```jsx
import "quickit-ui/styles.css";
```

Si tu proyecto también usa Tailwind CSS 4, importa primero Quickit y después Tailwind en tu CSS global. Ese orden deja el contrato base de Quickit cargado, pero permite que las utilidades y tokens de tu app queden al final de la cascada.

```css
@import "quickit-ui/styles.css";
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

### Personalizar colores de acento

Los colores `primary` (blue) y `secondary` (purple) se mapean directamente a colores nativos de Tailwind. Para personalizarlos, sobrescribe el color Tailwind subyacente en `@theme`:

```css
@import "quickit-ui/styles.css";
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-blue-600: oklch(0.5 0.2 250);
  --color-purple-500: oklch(0.55 0.18 290);
}
```

### Taxonomía de colores

La API de Quickit para props `color` usa `QuickitSemanticColor`:

- `primary`, `secondary`: acentos de producto.
- `success`, `danger`, `warning`, `info`: estados semánticos.
- `neutral`, `light`, `dark`: escalas neutras o de superficie.

Para construir wrappers o galerías puedes importar colecciones más precisas:

```js
import {
  QUICKIT_ACCENT_COLORS,
  QUICKIT_NEUTRAL_COLORS,
  QUICKIT_STATUS_COLORS,
} from "quickit-ui";
```

## Providers

Usa `QuickitProvider` si solo quieres fijar la política visual global.

```jsx
import { QuickitProvider } from "quickit-ui";

export function AppProviders({ children }) {
  return (
    <QuickitProvider
      theme="light"
      lang="es"
      focusRing
      ripple
      pressEffect="transform"
    >
      {children}
    </QuickitProvider>
  );
}
```

Usa `QuickitThemeProvider` si quieres tema persistente con `light`, `dark` y `system`.

```jsx
import { QuickitThemeProvider } from "quickit-ui";

export function AppProviders({ children }) {
  return (
    <QuickitThemeProvider defaultTheme="system" lang="es">
      {children}
    </QuickitThemeProvider>
  );
}
```

> **i18n**: Ambos providers aceptan `lang="es"` | `"en"`. Los textos internos (ARIA labels, placeholders, mensajes de error) se traducen automáticamente. Puedes importar los objetos completos con `import { TXT_ES, TXT_EN } from "quickit-ui"`.

### Ripple global

Para activar el ripple globalmente no basta con pasar `ripple={true}`. En Quickit UI el efecto visual de ripple solo se aplica cuando la política global de `pressEffect` está en `"ripple"`.

```jsx
import { QuickitThemeProvider } from "quickit-ui";

export function AppProviders({ children }) {
  return (
    <QuickitThemeProvider
      defaultTheme="system"
      ripple={true}
      pressEffect="ripple"
    >
      {children}
    </QuickitThemeProvider>
  );
}
```

También puedes activarlo globalmente y excluir componentes concretos:

```jsx
<QuickitThemeProvider
  defaultTheme="system"
  pressEffect="ripple"
  ripple={{ enabled: true, disabledComponents: ["link"] }}
>
  <App />
</QuickitThemeProvider>
```

Notas:

- El ripple global aplica a `Button` y `Link`.
- Si usas `ripple={true}` pero dejas `pressEffect="transform"`, no verás ripple.
- `QuickitProvider` y `QuickitThemeProvider` aceptan la misma configuración de `ripple`, `focusRing` y `pressEffect`.

## Uso básico

```jsx
import "quickit-ui/styles.css";
import { Button, FormControl, Input, Label, QuickitThemeProvider } from "quickit-ui";

export default function App() {
  return (
    <QuickitThemeProvider defaultTheme="system">
      <div className="mx-auto flex max-w-md flex-col gap-4 p-8">
        <FormControl required>
          <Label>Correo</Label>
          <Input type="email" placeholder="equipo@quickit.dev" />
          <FormControl.Description>
            Usa tu correo principal.
          </FormControl.Description>
        </FormControl>

        <Button color="primary">Empezar</Button>
      </div>
    </QuickitThemeProvider>
  );
}
```

## Qué incluye

- Formularios: `Input`, `Textarea`, `Select`, `DatePicker`, `TimePicker`, `Checkbox`, `Radio`, `Switch`, `Range`, `FormControl`
- Overlays: `Modal`, `Drawer`, `Popover`, `Tooltip`, `Dropdown`, `Toaster`
- Navegación: `Tabs`, `Accordion`, `Breadcrumb`, `Pagination`, `Stepper`
- Datos y feedback: `DataTable`, `Alert`, `EmptyState`, `Skeleton`, `Progress`, `Badge`
- Identidad y acciones: `Button`, `Link`, `Avatar`
- Lógica declarativa: `Show`, `For`, `RenderSwitch`, `Match`, `Default`
- Hooks: `useBreakpoint`, `useFloatingLayer`, `useMediaQuery`, `useQuickitTheme`, `useQuickitThemeController`, `useQuickitFocusRing`, `useQuickitFocusRingConfig`, `useQuickitRipple`, `useQuickitRippleConfig`, `useQuickitPressEffect`, `useFormControl`
- Utilidades y tokens: `cn`, `getControlRadius`, `getAvatarRadius`, `lockAppScroll`, `unlockAppScroll`, `useMergeRefs`, `resolveQuickitToken`, `isQuickitTokenValue`, `resolveQuickitThemeMode`

## Notas de integración

- `Range`: en modo `range`, `name` serializa el valor inicial y `endName` el valor final. Por defecto `endName` será `${name}End`.
- `Switch`: `onCheckedChange` recibe `(checked, event)`, alineado con `Checkbox` y `Radio`; el segundo argumento puede ignorarse si no lo necesitas.

## Documentación

- Sitio: [https://quickit-ui.vercel.app](https://quickit-ui.vercel.app)
- Docs locales:

```bash
npm install
npm run dev
```

Rutas útiles:

- `/docs`
- `/docs/components`
- `/docs/hooks`

Build de documentación:

```bash
npm run build:docs
```

## Validación del paquete

```bash
npm run lint
npm run build
npm run test
npm run test:types
npm run pack:check
```

## Migración y cambios

- Changelog: [CHANGELOG.md](./CHANGELOG.md)
- Guía de migración: [docs/migration.md](./docs/migration.md)

Versión actual: `1.4.0`

## Requisitos

- React `^18.2.0 || ^19.0.0`
- React DOM `^18.2.0 || ^19.0.0`
- Node.js `>=18`
- Tailwind CSS 4

## Licencia

MIT © [Darel Masis](https://github.com/darelmasis)
