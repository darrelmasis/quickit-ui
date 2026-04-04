# Quickit UI

Quickit UI es una libreria de componentes para React pensada para construir interfaces consistentes, limpias y rapidas de integrar.

Incluye componentes base como `Button`, `Input`, `Modal`, `Dropdown`, `Tabs`, `Tooltip`, `Avatar`, `Badge`, `Skeleton` y mas.

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
        <Select id="topic" defaultValue="support">
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

## Licencia

MIT
