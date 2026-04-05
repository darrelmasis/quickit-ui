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

La API de color es semántica: `neutral`, `primary`, `success`, `danger`, `warning`, `info`, `light` y `dark`.

La lógica recomendada es esta:
- si quieres cambiar un color existente en toda la librería, sobrescribe sus variables CSS
- si quieres usar tu color de marca con la API actual, remapea uno de esos slots semánticos
- si quieres un color nuevo solo en un caso puntual, usa `className`
- si quieres soportar un nuevo valor como `color="brand"` en toda la librería, eso requiere ampliar la API

Ejemplo para cambiar colores existentes:

```css
@import "quickit-ui/styles.css";

:root {
  /* color="neutral" */
  --color-neutral-700: oklch(46% 0 0);
  --color-neutral-800: oklch(39% 0 0);

  /* color="primary" */
  --color-blue-700: oklch(58% 0.18 275);
  --color-blue-800: oklch(51% 0.17 275);
}
```

Si quieres reutilizar un slot semántico como color de marca:

```css
:root {
  /* color="info" */
  --color-sky-600: oklch(62% 0.19 330);
  --color-sky-700: oklch(55% 0.18 330);
}
```

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
