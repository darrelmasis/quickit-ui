# Quickit UI

Quickit UI es una librería de componentes primitivos para React 19 y Tailwind CSS 4, enfocada en proporcionar cimientos de interfaz accesibles, sin estilos predefinidos restrictivos y altamente composibles.

## Instalación

```bash
npm install quickit-ui
```

## Configuración

Quickit UI requiere un entorno compatible con Tailwind CSS 4. Añade lo siguiente a tu hoja de estilos global:

```css
@import "quickit-ui/styles.css";
@import "tailwindcss";

/* Opcional: Sincroniza las utilidades dependientes del tema con el modo oscuro de Quickit */
@custom-variant dark (&:where(.dark, .dark *));
```

## Uso Básico

Envuelve tu aplicación con `QuickitThemeProvider` para habilitar la gestión de temas y las configuraciones globales.

```jsx
import "quickit-ui/styles.css";
import { QuickitThemeProvider, Button, Input } from "quickit-ui";

export default function App() {
  return (
    <QuickitThemeProvider defaultTheme="system">
      <div className="flex flex-col gap-4 p-8">
        <Input placeholder="Buscar componentes..." />
        <Button variant="solid" color="brand">Empezar</Button>
      </div>
    </QuickitThemeProvider>
  );
}
```

## Componentes

La librería proporciona más de 35 componentes diseñados como primitivos de bajo nivel:

- **Base**: `Button`, `Link`, `Badge`, `Label`, `Skeleton`, `Progress`
- **Formularios**: `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`, `Switch`, `Range`, `FormControl`
- **Overlays**: `Modal`, `Drawer`, `Popover`, `Tooltip`, `Dropdown`, `Toaster`
- **Navegación**: `Tabs`, `Accordion`, `Breadcrumb`, `Pagination`
- **Identidad**: `Avatar`, `AvatarGroup`, `UserChip`, `Initials`
- **Lógica**: `Show`, `For`, `RenderSwitch`, `Match`, `Default`
- **Feedback**: `EmptyState`, `FormDescription`, `FormMessage`

## Documentación

Para consultar la documentación completa, detalles de arquitectura y ejemplos extensos, ejecuta el servidor de desarrollo local:

```bash
npm install
npm run dev
```

La documentación es accesible en `/docs` y cuenta con una referencia de API detallada para cada componente y hook.

## Requisitos

- React 19 o superior
- Node.js 18 o superior
- Entorno Tailwind CSS 4

## Licencia

MIT © [Darel Masis](https://github.com/darrelmasis)
