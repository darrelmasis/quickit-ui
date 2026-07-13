/* eslint-disable react-refresh/only-export-components */
import { Button, Dropdown } from "@/lib";
import { ChevronDownIcon } from "@/lib/assets/icons";
const PROFILE_HREF = "/docs/components/avatar";
const SETTINGS_HREF = "/examples/flows/settings-theme";
const SAFE_LINK_PROPS = { onClick: (event) => event.preventDefault() };
const DROPDOWN_PREVIEW_CODE = `import { Button, Dropdown } from "quickit-ui";
import { ChevronDownIcon } from "quickit-ui/icons";

export function DropdownPreview() {
  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button color="neutral" variant="outline" size="sm">
          Acciones
          <ChevronDownIcon className="h-3 w-3" />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Editar</Dropdown.Item>
        <Dropdown.Item>Duplicar</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}`;
function DropdownPreviewCanvas() {
  return <Dropdown>
      <Dropdown.Trigger asChild>
        <Button color="neutral" variant="outline" size="sm">
          Acciones
          <ChevronDownIcon className="h-3 w-3" />
        </Button>
      </Dropdown.Trigger>
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
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Dropdown simple con items.",
    preview: <Dropdown>
          <Dropdown.Trigger>Acciones</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Editar</Dropdown.Item>
            <Dropdown.Item>Duplicar</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>,
    code: `import { Dropdown } from "quickit-ui";

export function DropdownBasico() {
  return (
    <Dropdown>
      <Dropdown.Trigger>Acciones</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Editar</Dropdown.Item>
        <Dropdown.Item>Duplicar</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}`
  }, {
    id: "ejemplos-trigger",
    title: "Trigger con Button",
    description: "Usa asChild para componentes personalizados.",
    preview: <Dropdown>
          <Dropdown.Trigger asChild>
            <Button color="neutral" variant="outline" size="sm">Más opciones</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Compartir</Dropdown.Item>
            <Dropdown.Item>Archivar</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>,
    code: `import { Button, Dropdown } from "quickit-ui";

export function DropdownTrigger() {
  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button color="neutral" variant="outline" size="sm">Más opciones</Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Compartir</Dropdown.Item>
        <Dropdown.Item>Archivar</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}`
  }, {
    id: "ejemplos-hover",
    title: "Apertura por hover",
    description: "Úsalo en barras densas o accesos rápidos.",
    preview: <Dropdown trigger="hover">
          <Dropdown.Trigger asChild>
            <Button color="neutral" variant="outline" size="sm">Pasar el ratón</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Vista rápida</Dropdown.Item>
            <Dropdown.Item>Editar</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>,
    code: `import { Button, Dropdown } from "quickit-ui";

export function DropdownHover() {
  return (
    <Dropdown trigger="hover">
      <Dropdown.Trigger asChild>
        <Button color="neutral" variant="outline" size="sm">Pasar el ratón</Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Vista rápida</Dropdown.Item>
        <Dropdown.Item>Editar</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}`
  }, {
    id: "ejemplos-disabled",
    title: "Items deshabilitados y separadores",
    description: "Disabled, Separator y variant danger.",
    preview: <Dropdown>
          <Dropdown.Trigger>Opciones</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Editar</Dropdown.Item>
            <Dropdown.Item disabled>Duplicar</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item variant="danger">Eliminar</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>,
    code: `import { Dropdown } from "quickit-ui";

export function DropdownItems() {
  return (
    <Dropdown>
      <Dropdown.Trigger>Opciones</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Editar</Dropdown.Item>
        <Dropdown.Item disabled>Duplicar</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item variant="danger">Eliminar</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}`
  }, {
    id: "ejemplos-links",
    title: "Items como links",
    description: "DropdownItem con href.",
    preview: <Dropdown>
          <Dropdown.Trigger>Ir a</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item href={PROFILE_HREF} {...SAFE_LINK_PROPS}>Perfil</Dropdown.Item>
            <Dropdown.Item href={SETTINGS_HREF} {...SAFE_LINK_PROPS}>Configuración</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>,
    code: `import { Dropdown } from "quickit-ui";

export function DropdownLinks() {
  return (
    <Dropdown>
      <Dropdown.Trigger>Ir a</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item href="/profile">Perfil</Dropdown.Item>
        <Dropdown.Item href="/settings">Configuración</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "Define la paleta visual del menú flotante y sus items."
    }, {
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
      name: "trigger",
      type: `"click" | "hover"`,
      defaultValue: `"click"`,
      description: "Modo de apertura."
    }, {
      name: "usePortal",
      type: "boolean",
      defaultValue: "true",
      description: "Renderiza en portal."
    }, {
      name: "collisionPadding",
      type: "number",
      defaultValue: "8",
      description: "Padding contra bordes."
    }],
    notes: ["Dropdown.Trigger soporta asChild.", "Dropdown.Item soporta as, href, disabled y variant=\"danger\".", "Reserva trigger=\"hover\" para navegación ligera."]
  }]
};
