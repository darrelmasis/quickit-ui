# Quickit UI

Quickit UI es una librería de componentes primitivos para React 18+ y Tailwind CSS 4, enfocada en proporcionar cimientos de interfaz accesibles, sin estilos predefinidos restrictivos y altamente composibles.

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

Envuelve tu aplicación con `QuickitProvider` para habilitar la gestión de temas y las configuraciones globales.

```jsx
import "quickit-ui/styles.css";
import { QuickitProvider, Button, Input } from "quickit-ui";

export default function App() {
  return (
    <QuickitProvider defaultTheme="system">
      <div className="flex flex-col gap-4 p-8">
        <Input placeholder="Buscar componentes..." />
        <Button variant="solid" color="brand">
          Empezar
        </Button>
      </div>
    </QuickitProvider>
  );
}
```

## Componentes

La librería proporciona más de 35 componentes diseñados como primitivos de bajo nivel:

- **Base**: `Button`, `Link`, `Badge`, `Label`, `Skeleton`, `Progress`, `Alert`
- **Formularios**: `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`, `Switch`, `Range`, `FormControl`, `Combobox`
- **Overlays**: `Modal`, `Drawer`, `Popover`, `Tooltip`, `Dropdown`, `Toaster`, `CommandPalette`
- **Navegación**: `Tabs`, `Accordion`, `Breadcrumb`, `Pagination`, `Stepper`
- **Datos**: `DataTable`, `DatePicker`, `TimePicker`
- **Identidad**: `Avatar`, `AvatarGroup`, `UserChip`, `Initials`
- **Lógica**: `Show`, `For`, `RenderSwitch`, `Match`, `Default`
- **Feedback**: `EmptyState`, `FormDescription`, `FormMessage`

## Hooks

La librería incluye hooks útiles para desarrollo:

- `useBreakpoint`: Para detectar cambios en el tamaño de pantalla.
- `useFloatingLayer`: Para gestionar capas flotantes.
- `useMediaQuery`: Para consultas de medios personalizadas.

## Documentación

Para consultar la documentación completa, detalles de arquitectura y ejemplos extensos, ejecuta el servidor de desarrollo local:

```bash
npm install
npm run dev
```

La documentación es accesible en `/docs` y cuenta con una referencia de API detallada para cada componente y hook.

Para construir la documentación estática:

```bash
npm run build:docs
```

Para previsualizar la documentación construida:

```bash
npm run preview:docs
```

## Release 1.0.2

Quickit UI entra en `1.0.2` como release de parche con correcciones menores. El detalle de cambios está en [CHANGELOG.md](./CHANGELOG.md).

## Requisitos

- React 18.2+ o 19+
- Node.js 18 o superior
- Entorno Tailwind CSS 4

## Licencia

MIT © [Darel Masis](https://github.com/darrelmasis)
