/* eslint-disable react-refresh/only-export-components */
import { Button, Dropdown } from "@/lib";
const DROPDOWN_PREVIEW_CODE = `import { Dropdown } from "quickit-ui";

export function DropdownPreview() {
  return (
    <Dropdown>
      <Dropdown.Trigger>Acciones</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Editar</Dropdown.Item>
        <Dropdown.Item>Duplicar</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}`;
function DropdownPreviewCanvas() {
  return <Dropdown>
      <Dropdown.Trigger>Acciones</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Editar</Dropdown.Item>
        <Dropdown.Item>Duplicar</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item variant="danger">Eliminar</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>;
}
export const dropdownDoc = {
  name: "Dropdown",
  description: "Menú flotante composable con items y separadores.",
  previewCode: DROPDOWN_PREVIEW_CODE,
  preview: <DropdownPreviewCanvas />,
  installCode: `import { Dropdown } from "quickit-ui";`,
  usageCode: `import { Dropdown } from "quickit-ui";

export function DropdownUsage() {
  return (
    <Dropdown>
      <Dropdown.Trigger>Acciones</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Editar</Dropdown.Item>
        <Dropdown.Item>Duplicar</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}`,
  examples: [{
    id: "ejemplos-trigger",
    title: "Triggers",
    description: "Puedes usar un botón o cualquier nodo con asChild.",
    preview: <div className="flex flex-wrap gap-3">
          <Dropdown>
            <Dropdown.Trigger>Acciones</Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Editar</Dropdown.Item>
              <Dropdown.Item>Duplicar</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
          <Dropdown>
            <Dropdown.Trigger asChild>
              <Button color="neutral" variant="outline" size="sm">
                Más opciones
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Compartir</Dropdown.Item>
              <Dropdown.Item>Archivar</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
  }, {
    id: "ejemplos-apertura-hover",
    title: "Apertura por hover",
    description: "Úsalo con criterio en barras densas o accesos rápidos. Para menús de acciones delicadas, `click` sigue siendo el patrón recomendado.",
    preview: <Dropdown trigger="hover">
          <Dropdown.Trigger asChild>
            <Button color="neutral" variant="outline" size="sm">
              Pasar el ratón
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Vista rápida</Dropdown.Item>
            <Dropdown.Item>Editar</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
  }, {
    id: "ejemplos-items",
    title: "Items y variantes",
    description: "Incluye estados disabled, separators y variant danger.",
    preview: <Dropdown>
          <Dropdown.Trigger>Opciones</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Editar</Dropdown.Item>
            <Dropdown.Item disabled>Duplicar</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item variant="danger">Eliminar</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
  }, {
    id: "ejemplos-links",
    title: "Items con link",
    description: "DropdownItem puede renderizarse como link con href.",
    preview: <Dropdown>
          <Dropdown.Trigger>Ir a</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item href="#perfil">Perfil</Dropdown.Item>
            <Dropdown.Item href="#config">Configuración</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
  }, {
    id: "ejemplos-placement",
    title: "Placement y offsets",
    description: "Ajusta placement, offsetX y collisionPadding.",
    preview: <Dropdown placement="top-end" offsetX={8} collisionPadding={12}>
          <Dropdown.Trigger>Posición</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Top end</Dropdown.Item>
            <Dropdown.Item>Offset 8</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Estado inicial."
    }, {
      name: "open",
      type: "boolean",
      defaultValue: "undefined",
      description: "Controla el dropdown."
    }, {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "undefined",
      description: "Callback de apertura."
    }, {
      name: "placement",
      type: "string",
      defaultValue: `"bottom-end"`,
      description: "Posición del panel."
    }, {
      name: "offsetX",
      type: "number",
      defaultValue: "0",
      description: "Offset horizontal."
    }, {
      name: "collisionPadding",
      type: "number",
      defaultValue: "8",
      description: "Padding contra bordes."
    }, {
      name: "usePortal",
      type: "boolean",
      defaultValue: "true",
      description: "Renderiza el panel en portal."
    }, {
      name: "closeOnClickOutside",
      type: "boolean",
      defaultValue: "true",
      description: "Cierra al hacer click fuera."
    }, {
      name: "closeOnScroll",
      type: "boolean",
      defaultValue: "false",
      description: "Cierra al hacer scroll."
    }, {
      name: "trigger",
      type: `"click" | "hover"`,
      defaultValue: `"click"`,
      description: "Modo de apertura: clic (por defecto) o hover sobre el trigger."
    }],
    notes: ["Dropdown.Trigger soporta asChild para usar un Button u otro componente.", "Reserva `trigger=\"hover\"` para navegación ligera o descubrimiento rápido; para acciones importantes o destructivas usa apertura por click.", "Dropdown.Item soporta as, href, disabled, closeOnClick y variant=\"danger\"."]
  }]
};
