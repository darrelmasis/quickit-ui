# Quickit UI

Quickit UI es una libreria de componentes para React pensada para construir interfaces consistentes, limpias y rapidas de integrar.

Incluye componentes base como `Button`, `Input`, `Modal`, `Dropdown`, `Tabs`, `Tooltip`, `Avatar`, `Badge`, `Skeleton` y mas.

## Documentacion local

La libreria incluye una documentacion local con ejemplos, API y fundamentos del sistema.

```bash
npm install
npm run dev
```

Para generar la version estatica de la documentacion:

```bash
npm run build:docs
```

## Instalacion

Instala el paquete junto con sus dependencias peer:

```bash
npm install quickit-ui react react-dom
```

## Uso rapido

Importa los estilos del paquete una sola vez y empieza a usar los componentes:

```jsx
import 'quickit-ui/styles.css'
import { Button, Input, QuickitProvider } from 'quickit-ui'

export default function App() {
  return (
    <QuickitProvider theme="light">
      <main className="space-y-4 p-6">
        <Input placeholder="Correo electronico" />
        <Button color="neutral">Continuar</Button>
      </main>
    </QuickitProvider>
  )
}
```

## Tema

Quickit UI soporta `light` y `dark` desde `QuickitProvider`.

```jsx
import 'quickit-ui/styles.css'
import { Button, QuickitProvider } from 'quickit-ui'

export default function App() {
  return (
    <QuickitProvider theme="dark">
      <Button>Guardar cambios</Button>
    </QuickitProvider>
  )
}
```

## Personalizar colores

La API de color es semántica: `neutral`, `primary`, `brand`, `success`, `danger`, `warning`, `info`, `light` y `dark`.

La lógica recomendada es esta:
- cada color semántico usa una familia Tailwind interna
- si reemplazas esa familia, cambias ese color en toda la librería
- `brand` existe precisamente para tu color de marca y consume `brand-*`
- si quieres usar tu color de marca en otro slot, reemplaza la familia que consume ese slot semántico
- si quieres un color nuevo solo en un caso puntual, usa `className`
- si quieres soportar un nuevo valor como `color="gray"` o `color="clientA"` en toda la librería, eso requiere ampliar la API

Mapa actual:

```txt
neutral -> neutral-*
primary -> blue-*
brand   -> brand-*
success -> emerald-*
danger  -> red-*
warning -> amber-*
info    -> sky-*
```

Ejemplo recomendado: si tu marca debe vivir en `brand`, reemplaza `brand-*`:

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

Si prefieres que tu marca viva en `primary`, entonces reemplaza `blue-*`.

Si quieres cambiar `neutral`, reemplaza `neutral-*`:

```css
:root {
  --color-neutral-50: oklch(0.985 0.002 247);
  --color-neutral-100: oklch(0.97 0.004 247);
  --color-neutral-200: oklch(0.93 0.01 252);
  --color-neutral-300: oklch(0.87 0.018 253);
  --color-neutral-700: oklch(0.37 0.03 257);
  --color-neutral-800: oklch(0.28 0.028 260);
  --color-neutral-900: oklch(0.21 0.026 265);
}
```

También puedes reutilizar otro slot semántico como color de marca:

```css
:root {
  /* color="info" */
  --color-sky-600: oklch(62% 0.19 330);
  --color-sky-700: oklch(55% 0.18 330);
}
```

Si creas una paleta nueva como `gray-*`, podrás usarla en clases Tailwind, pero no aparece sola en la API de Quickit:

```css
@theme {
  --color-gray-50: oklch(0.984 0.003 247.858);
  --color-gray-100: oklch(0.968 0.007 247.896);
  --color-gray-200: oklch(0.929 0.013 255.508);
  --color-gray-300: oklch(0.869 0.022 252.894);
  --color-gray-400: oklch(0.704 0.04 256.788);
  --color-gray-500: oklch(0.554 0.046 257.417);
  --color-gray-600: oklch(0.446 0.043 257.281);
  --color-gray-700: oklch(0.372 0.044 257.287);
  --color-gray-800: oklch(0.279 0.041 260.031);
  --color-gray-900: oklch(0.208 0.042 265.755);
  --color-gray-950: oklch(0.129 0.042 264.695);
}
```

Eso significa:
- sí puedes usar `bg-gray-500`, `text-gray-700`, etc. en `className`
- no puedes usar `color="gray"` a menos que la librería amplíe su mapa de colores

Si quieres un color nuevo puntual, puedes sobreescribir estilos con `className`:

```jsx
<Button
  color="neutral"
  className="border-fuchsia-600 bg-fuchsia-600 text-white hover:border-fuchsia-700 hover:bg-fuchsia-700"
>
  Magenta
</Button>
```

## Ejemplos rapidos

### Button

```jsx
import { Button } from 'quickit-ui'

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
  )
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
} from 'quickit-ui'

export function ContactForm() {
  return (
    <div className="space-y-4">
      <FormControl>
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" placeholder="Tu nombre" />
      </FormControl>

      <FormControl>
        <Label htmlFor="topic">Tema</Label>
        <Select
          id="topic"
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
        <Textarea id="message" placeholder="Escribe tu mensaje" />
        <FormMessage>Este campo es obligatorio.</FormMessage>
      </FormControl>
    </div>
  )
}
```

### Navegacion

```jsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'quickit-ui'

export function SettingsTabs() {
  return (
    <Tabs defaultValue="general" activationMode="manual">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Seguridad</TabsTrigger>
      </TabsList>

      <TabsContent value="general">Contenido general</TabsContent>
      <TabsContent value="security">Contenido de seguridad</TabsContent>
    </Tabs>
  )
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
} from 'quickit-ui'

export function OverlayExamples() {
  return (
    <div className="flex gap-4">
      <Dropdown>
        <DropdownTrigger>
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
        <Button color="neutral">Abrir modal</Button>

        <ModalContent>
          <ModalHeader>
            <ModalTitle>Confirmar accion</ModalTitle>
          </ModalHeader>

          <ModalBody>Este cambio no se puede deshacer.</ModalBody>

          <ModalActions placement="end">
            <ModalAction color="neutral" variant="outline">
              Cancelar
            </ModalAction>
            <ModalAction color="danger">Eliminar</ModalAction>
          </ModalActions>
        </ModalContent>
      </Modal>
    </div>
  )
}
```

## Componentes disponibles

- `Accordion`
- `Avatar`
- `Badge`
- `Breadcrumb`
- `Button`
- `Checkbox`
- `Dropdown`
- `EmptyState`
- `FormControl`
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

## Requisitos

- `react` `^19.0.0`
- `react-dom` `^19.0.0`
- Node.js `18` o superior

## Exportaciones utiles

El paquete exporta componentes, hooks y utilidades desde:

```jsx
import {
  Button,
  Input,
  QuickitProvider,
  useQuickitTheme,
} from 'quickit-ui'
```

## Scripts utiles

- `npm run dev`: entorno local de desarrollo.
- `npm run build`: build de la libreria.
- `npm run build:docs`: build estatico de la documentacion.
- `npm run lint`: validacion con ESLint.
- `npm run pack:check`: vista previa del paquete que se publicaria en npm.

## Licencia

MIT
