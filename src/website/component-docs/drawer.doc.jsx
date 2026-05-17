/* eslint-disable react-refresh/only-export-components */
import { Button, Drawer } from "@/lib";
const DRAWER_PREVIEW_CODE = `import { Drawer, Button } from "quickit-ui";

export function DrawerPreview() {
  return (
    <Drawer>
      <Drawer.Trigger>
        <Button>Ver detalles</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Actividad</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          Contenido del drawer.
        </Drawer.Body>
        <Drawer.Actions>
          <Drawer.Action variant="outline">Cerrar</Drawer.Action>
        </Drawer.Actions>
      </Drawer.Content>
    </Drawer>
  );
}`;
function DrawerPreviewCanvas() {
  return <Drawer>
      <Drawer.Trigger>
        <Button color="neutral">Ver detalles</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Actividad</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>Contenido del drawer.</Drawer.Body>
        <Drawer.Actions>
          <Drawer.Action variant="outline">Cerrar</Drawer.Action>
        </Drawer.Actions>
      </Drawer.Content>
    </Drawer>;
}
export const drawerDoc = {
  name: "Drawer",
  description: "Panel lateral o inferior con overlay, header y acciones.",
  previewCode: DRAWER_PREVIEW_CODE,
  preview: <DrawerPreviewCanvas />,
  installCode: `import { Drawer } from "quickit-ui";`,
  usageCode: `import { Drawer, Button } from "quickit-ui";

export function DrawerUsage() {
  return (
    <Drawer placement="right">
      <Drawer.Trigger>
        <Button>Ver detalles</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Actividad</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>Contenido del drawer.</Drawer.Body>
        <Drawer.Actions>
          <Drawer.Action variant="outline">Cerrar</Drawer.Action>
        </Drawer.Actions>
      </Drawer.Content>
    </Drawer>
  );
}`,
  examples: [{
    id: "ejemplos-placements",
    title: "Placements",
    description: "Right, left, bottom y top.",
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Drawer placement="right">
            <Drawer.Trigger>
              <Button size="sm" variant="outline">Right</Button>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Body>Drawer right</Drawer.Body>
            </Drawer.Content>
          </Drawer>
          <Drawer placement="bottom">
            <Drawer.Trigger>
              <Button size="sm" variant="outline">Bottom</Button>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Body>Drawer bottom</Drawer.Body>
            </Drawer.Content>
          </Drawer>
        </div>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "placement",
      type: `"right" | "left" | "bottom" | "top"`,
      defaultValue: `"right"`,
      description: "Ubicación del panel."
    }, {
      name: "size",
      type: "string",
      defaultValue: "auto",
      description: "Clase para ancho/alto máximo del panel."
    }, {
      name: "open",
      type: "boolean",
      defaultValue: "undefined",
      description: "Controla la apertura."
    }, {
      name: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Apertura inicial no controlada."
    }, {
      name: "onOpenChange",
      type: "(open) => void",
      defaultValue: "undefined",
      description: "Callback al cambiar open."
    }, {
      name: "closeOnEscape",
      type: "boolean",
      defaultValue: "true",
      description: "Permite cerrar el drawer con Escape cuando es el panel superior."
    }, {
      name: "onBeforeClose",
      type: "() => boolean | Promise<boolean | void>",
      defaultValue: "undefined",
      description: "Bloquea el cierre si retorna false."
    }, {
      name: "outsideClick",
      type: "boolean",
      defaultValue: "true",
      description: "Cierra al hacer click fuera."
    }, {
      name: "showCloseButton",
      type: "boolean",
      defaultValue: "true",
      description: "Muestra el botón de cierre dentro de Drawer.Header."
    }, {
      name: "zIndex",
      type: "number",
      defaultValue: "auto",
      description: "Override del z-index."
    }],
    notes: ["Drawer.Trigger acepta `asChild` para componer con `Button` u otro elemento sin anidar botones.", "Drawer.Header incluye botón de cerrar cuando `showCloseButton` es `true`.", "Si el handler de `Drawer.Action` hace `event.preventDefault()`, el drawer no se cierra aunque `closeOnClick` siga activo.", "Elige `placement=\"bottom\"` o `top` cuando el contenido sea más cercano a un sheet móvil; para navegación lateral o detalle contextual, `right` y `left` suelen ser más naturales."]
  }]
};
