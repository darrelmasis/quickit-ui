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
        <Drawer.Body>Contenido del drawer.</Drawer.Body>
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
  examples: [{
    id: "ejemplos-placements",
    title: "Placements",
    description: "Right, left, bottom y top.",
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Drawer placement="right">
            <Drawer.Trigger><Button size="sm" variant="outline" color="neutral">Right</Button></Drawer.Trigger>
            <Drawer.Content><Drawer.Body>Drawer right</Drawer.Body></Drawer.Content>
          </Drawer>
          <Drawer placement="bottom">
            <Drawer.Trigger><Button size="sm" variant="outline" color="neutral">Bottom</Button></Drawer.Trigger>
            <Drawer.Content><Drawer.Body>Drawer bottom</Drawer.Body></Drawer.Content>
          </Drawer>
        </div>,
    code: `import { Button, Drawer } from "quickit-ui";

export function DrawerPlacements() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Drawer placement="right">
        <Drawer.Trigger>
          <Button size="sm" variant="outline" color="neutral">Right</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Body>Drawer right</Drawer.Body>
        </Drawer.Content>
      </Drawer>
      <Drawer placement="bottom">
        <Drawer.Trigger>
          <Button size="sm" variant="outline" color="neutral">Bottom</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Body>Drawer bottom</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    </div>
  );
}`
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
      description: "Clase para ancho/alto máximo."
    }, {
      name: "open",
      type: "boolean",
      defaultValue: "undefined",
      description: "Controla la apertura."
    }, {
      name: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Apertura inicial."
    }, {
      name: "onOpenChange",
      type: "(open) => void",
      defaultValue: "undefined",
      description: "Callback de apertura."
    }, {
      name: "closeOnEscape",
      type: "boolean",
      defaultValue: "true",
      description: "Cerrar con Escape."
    }, {
      name: "outsideClick",
      type: "boolean",
      defaultValue: "true",
      description: "Cierra al click fuera."
    }, {
      name: "showCloseButton",
      type: "boolean",
      defaultValue: "true",
      description: "Botón de cierre."
    }, {
      name: "onBeforeClose",
      type: "() => boolean | Promise<boolean | void>",
      defaultValue: "undefined",
      description: "Bloquea cierre si retorna false."
    }],
    notes: ["Drawer.Trigger acepta asChild para componer con Button.", "Para navegación lateral usa placement right/left; para sheet móvil usa bottom/top."]
  }]
};
