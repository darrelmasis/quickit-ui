# Quickit UI

Quickit UI es una librería de componentes para React enfocada en interfaces consistentes, con una API semántica, tema `light` y `dark`, documentación local y soporte TypeScript vía `.d.ts`.

## Instalación

```bash
npm install quickit-ui react react-dom
```

Importa los estilos una sola vez:

```jsx
import "quickit-ui/styles.css";
```

## Uso rápido

```jsx
import "quickit-ui/styles.css";
import { Button, Input, QuickitProvider } from "quickit-ui";

export default function App() {
  return (
    <QuickitProvider theme="light">
      <main className="space-y-4 p-6">
        <Input color="neutral" placeholder="Correo electrónico" />
        <Button color="brand">Continuar</Button>
      </main>
    </QuickitProvider>
  );
}
```

## Tema

Quickit UI trabaja con `light` y `dark`. El estado del tema vive en tu app; `QuickitProvider` solo lo distribuye al resto de componentes.

```jsx
import "quickit-ui/styles.css";
import { Button, QuickitProvider } from "quickit-ui";

export default function App() {
  return (
    <QuickitProvider theme="dark">
      <Button color="neutral">Guardar cambios</Button>
    </QuickitProvider>
  );
}
```

## Colores semánticos

La API pública soporta:

```txt
neutral | slate | zinc | primary | brand | success | danger | warning | info | light | dark | black
```

Criterio actual:

- `neutral` mantiene la base premium de la librería.
- `slate` y `zinc` exponen neutrales explícitos.
- `primary` usa `sky-*`.
- `brand` usa `brand-*`.
- `success` usa `emerald-*`.
- `danger` usa `rose-*`.
- `warning` usa `amber-*`.
- `info` usa `cyan-*`.
- `light` usa una escala clara basada en `stone-*`.
- `dark` es una variante oscura intermedia.
- `black` es la opción más densa y de mayor contraste.

Ejemplo recomendado para conectar tu marca:

```css
@import "quickit-ui/styles.css";

:root {
  --color-brand-300: oklch(0.86 0.19 126);
  --color-brand-400: oklch(0.8 0.2 126);
  --color-brand-500: oklch(0.74 0.2 126);
  --color-brand-600: oklch(0.68 0.19 126);
  --color-brand-700: oklch(0.62 0.18 126);
  --color-brand-800: oklch(0.55 0.16 126);
}
```

Si quieres que `primary` use tu marca, reemplaza `sky-*`.

Si necesitas neutrales más explícitos y previsibles, usa `color="slate"` o `color="zinc"` en lugar de asumir que `neutral` es una escala plana.

Si necesitas un color puntual fuera de la API semántica, sobrescribe con `className`:

```jsx
<Button
  color="neutral"
  className="border-fuchsia-600 bg-fuchsia-600 text-white hover:border-fuchsia-700 hover:bg-fuchsia-700"
>
  Magenta
</Button>
```

## Hooks y utilidades

Quickit también exporta hooks y utilidades para componer tu app o tu propia documentación:

```jsx
import {
  QUICKIT_BREAKPOINTS,
  QUICKIT_BUTTON_SHAPES,
  QUICKIT_CONTROL_SIZES,
  QUICKIT_SEMANTIC_COLORS,
  QuickitProvider,
  useBreakpoint,
  useMediaQuery,
  useQuickitTheme,
} from "quickit-ui";
```

## Ejemplos

### Button

```jsx
import { Button } from "quickit-ui";

export function Actions() {
  return (
    <div className="flex gap-3">
      <Button color="neutral">Neutral</Button>
      <Button variant="outline" color="primary">
        Outline
      </Button>
      <Button loading loadingText="Guardando">
        Guardar
      </Button>
    </div>
  );
}
```

### Formularios

```jsx
import {
  FormControl,
  FormDescription,
  FormMessage,
  Input,
  Label,
  Select,
  Textarea,
} from "quickit-ui";

export function ContactForm() {
  return (
    <div className="space-y-4">
      <FormControl>
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" color="neutral" placeholder="Tu nombre" />
      </FormControl>

      <FormControl>
        <Label htmlFor="topic">Tema</Label>
        <Select
          id="topic"
          color="slate"
          defaultValue="support"
          onValueChange={(value) => console.log(value)}
        >
          <option value="support">Soporte</option>
          <option value="sales">Ventas</option>
        </Select>
        <FormDescription>Selecciona el motivo de tu consulta.</FormDescription>
      </FormControl>

      <FormControl invalid>
        <Label htmlFor="message">Mensaje</Label>
        <Textarea id="message" color="danger" placeholder="Escribe tu mensaje" />
        <FormMessage>Este campo es obligatorio.</FormMessage>
      </FormControl>
    </div>
  );
}
```

### Navegación

```jsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "quickit-ui";

export function SettingsTabs() {
  return (
    <Tabs defaultValue="general" activationMode="manual" color="brand">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Seguridad</TabsTrigger>
      </TabsList>

      <TabsContent value="general">Contenido general</TabsContent>
      <TabsContent value="security">Contenido de seguridad</TabsContent>
    </Tabs>
  );
}
```

### Lógica declarativa

```jsx
import { Default, For, Match, RenderSwitch, Show } from "quickit-ui";

export function States({ items, status, user }) {
  return (
    <>
      <Show when={user} fallback={<p>Inicia sesión</p>}>
        {(value) => <p>Hola, {value.name}</p>}
      </Show>

      <RenderSwitch value={status}>
        <Match when="idle">Idle</Match>
        <Match when="loading">Loading</Match>
        <Default>Done</Default>
      </RenderSwitch>

      <For each={items} fallback={<p>Sin resultados</p>}>
        {(item) => <div key={item.id}>{item.label}</div>}
      </For>
    </>
  );
}
```

### Overlay

```jsx
import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  Modal,
  ModalAction,
  ModalActions,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "quickit-ui";

export function OverlayExamples() {
  return (
    <div className="flex gap-4">
      <Dropdown>
        <DropdownTrigger asChild>
          <Button color="neutral" variant="outline">
            Opciones
          </Button>
        </DropdownTrigger>

        <DropdownContent>
          <DropdownItem>Editar</DropdownItem>
          <DropdownItem>Duplicar</DropdownItem>
          <DropdownItem variant="danger">Eliminar</DropdownItem>
        </DropdownContent>
      </Dropdown>

      <Modal>
        <Modal.Trigger asChild>
          <Button color="neutral">Abrir modal</Button>
        </Modal.Trigger>

        <Modal.Content>
          <ModalHeader>
            <ModalTitle>Confirmar acción</ModalTitle>
          </ModalHeader>

          <ModalBody>Este cambio no se puede deshacer.</ModalBody>

          <ModalActions placement="end">
            <ModalAction color="neutral" variant="outline">
              Cancelar
            </ModalAction>
            <ModalAction color="danger">Eliminar</ModalAction>
          </ModalActions>
        </Modal.Content>
      </Modal>
    </div>
  );
}
```

## Identidad

Quickit incluye primitives y compuestos de identidad:

- `Avatar`
- `AvatarGroup`
- `AvatarPresence`
- `Initials`
- `UserChip`

## Componentes disponibles

- `Accordion`
- `Avatar`
- `AvatarGroup`
- `AvatarPresence`
- `Badge`
- `Breadcrumb`
- `Button`
- `Checkbox`
- `Dropdown`
- `EmptyState`
- `FormControl`
- `FormDescription`
- `FormMessage`
- `Initials`
- `Input`
- `Label`
- `Link`
- `Modal`
- `Pagination`
- `Popover`
- `Radio`
- `Select`
- `Skeleton`
- `Switch`
- `Tabs`
- `Textarea`
- `Tooltip`
- `UserChip`
- `Show`
- `RenderSwitch`
- `Match`
- `Default`
- `For`

## Documentación local

```bash
npm install
npm run dev
```

Para generar la versión estática:

```bash
npm run build:docs
```

## Requisitos

- `react` `^19.0.0`
- `react-dom` `^19.0.0`
- Node.js `18` o superior

## Scripts útiles

- `npm run dev`: entorno local de desarrollo.
- `npm run build`: build de la librería para distribución.
- `npm run build:docs`: build estático de la documentación.
- `npm run lint`: validación con ESLint.
- `npm run test`: pruebas runtime.
- `npm run test:types`: validación del consumo TypeScript.
- `npm run pack:check`: vista previa del paquete que se publicaría en npm.

## Licencia

MIT
