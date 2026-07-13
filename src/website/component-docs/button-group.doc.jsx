/* eslint-disable react-refresh/only-export-components */
import { Button, ButtonGroup } from "@/lib";
const BTN_GROUP_PREVIEW_CODE = `import { Button, ButtonGroup } from "quickit-ui";

export function ButtonGroupPreview() {
  return (
    <ButtonGroup>
      <Button color="neutral" variant="outline">Izquierda</Button>
      <Button color="neutral" variant="outline">Centro</Button>
      <Button color="neutral" variant="outline">Derecha</Button>
    </ButtonGroup>
  );
}`;
function BtnGroupPreviewCanvas() {
  return <ButtonGroup>
      <Button color="neutral" variant="outline">Izquierda</Button>
      <Button color="neutral" variant="outline">Centro</Button>
      <Button color="neutral" variant="outline">Derecha</Button>
    </ButtonGroup>;
}
export const buttonGroupDoc = {
  name: "ButtonGroup",
  description: "Agrupa botones en un solo contenedor visual con separadores entre ellos.",
  previewCode: BTN_GROUP_PREVIEW_CODE,
  preview: <BtnGroupPreviewCanvas />,
  installCode: `import { ButtonGroup } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-variantes",
    title: "Variantes y colores",
    description: "Cada botón conserva su variante y color individual.",
    preview: <div className="flex flex-wrap gap-6">
        <ButtonGroup>
          <Button color="primary">Save</Button>
          <Button color="primary" variant="outline">Cancel</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button color="success" variant="outline">Approve</Button>
          <Button color="danger" variant="outline">Reject</Button>
        </ButtonGroup>
      </div>,
    code: `import { Button, ButtonGroup } from "quickit-ui";

export function BtnGroupVariantes() {
  return (
    <div className="flex flex-wrap gap-6">
      <ButtonGroup>
        <Button color="primary">Save</Button>
        <Button color="primary" variant="outline">Cancel</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button color="success" variant="outline">Approve</Button>
        <Button color="danger" variant="outline">Reject</Button>
      </ButtonGroup>
    </div>
  );
}`
  }, {
    id: "ejemplos-vertical",
    title: "Vertical",
    description: "Apila los botones verticalmente con orientation.",
    preview: <ButtonGroup orientation="vertical">
        <Button color="neutral" variant="outline">Arriba</Button>
        <Button color="neutral" variant="outline">Centro</Button>
        <Button color="neutral" variant="outline">Abajo</Button>
      </ButtonGroup>,
    code: `import { Button, ButtonGroup } from "quickit-ui";

export function BtnGroupVertical() {
  return (
    <ButtonGroup orientation="vertical">
      <Button color="neutral" variant="outline">Arriba</Button>
      <Button color="neutral" variant="outline">Centro</Button>
      <Button color="neutral" variant="outline">Abajo</Button>
    </ButtonGroup>
  );
}`
  }, {
    id: "ejemplos-fullwidth",
    title: "Full width",
    description: "Ocupa todo el ancho disponible y reparte el espacio equitativamente.",
    preview: <ButtonGroup fullWidth>
        <Button color="primary" variant="outline">Opción A</Button>
        <Button color="primary" variant="outline">Opción B</Button>
        <Button color="primary" variant="outline">Opción C</Button>
      </ButtonGroup>,
    code: `import { Button, ButtonGroup } from "quickit-ui";

export function BtnGroupFullWidth() {
  return (
    <ButtonGroup fullWidth>
      <Button color="primary" variant="outline">Opción A</Button>
      <Button color="primary" variant="outline">Opción B</Button>
      <Button color="primary" variant="outline">Opción C</Button>
    </ButtonGroup>
  );
}`
  }, {
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: "ButtonGroup respeta el size para el border radius.",
    preview: <div className="flex flex-wrap items-center gap-6">
        <ButtonGroup size="sm">
          <Button size="sm" color="neutral" variant="outline">Pequeño</Button>
          <Button size="sm" color="neutral" variant="outline">Grupo</Button>
        </ButtonGroup>
        <ButtonGroup size="md">
          <Button color="neutral" variant="outline">Mediano</Button>
          <Button color="neutral" variant="outline">Grupo</Button>
        </ButtonGroup>
        <ButtonGroup size="lg">
          <Button size="lg" color="neutral" variant="outline">Grande</Button>
          <Button size="lg" color="neutral" variant="outline">Grupo</Button>
        </ButtonGroup>
      </div>,
    code: `import { Button, ButtonGroup } from "quickit-ui";

export function BtnGroupTamanos() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <ButtonGroup size="sm">
        <Button size="sm" color="neutral" variant="outline">Pequeño</Button>
        <Button size="sm" color="neutral" variant="outline">Grupo</Button>
      </ButtonGroup>
      <ButtonGroup size="md">
        <Button color="neutral" variant="outline">Mediano</Button>
        <Button color="neutral" variant="outline">Grupo</Button>
      </ButtonGroup>
      <ButtonGroup size="lg">
        <Button size="lg" color="neutral" variant="outline">Grande</Button>
        <Button size="lg" color="neutral" variant="outline">Grupo</Button>
      </ButtonGroup>
    </div>
  );
}`
  }, {
    id: "ejemplos-divider",
    title: "Con divisor",
    description: "ButtonGroup.Divider separa visualmente secciones del grupo.",
    preview: <ButtonGroup>
        <Button color="neutral" variant="outline">Editar</Button>
        <Button color="neutral" variant="outline">Duplicar</Button>
        <ButtonGroup.Divider />
        <Button color="neutral" variant="outline">Archivar</Button>
        <Button color="danger" variant="outline">Eliminar</Button>
      </ButtonGroup>,
    code: `import { Button, ButtonGroup } from "quickit-ui";

export function BtnGroupDivider() {
  return (
    <ButtonGroup>
      <Button color="neutral" variant="outline">Editar</Button>
      <Button color="neutral" variant="outline">Duplicar</Button>
      <ButtonGroup.Divider />
      <Button color="neutral" variant="outline">Archivar</Button>
      <Button color="danger" variant="outline">Eliminar</Button>
    </ButtonGroup>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "orientation",
      type: `"horizontal" | "vertical"`,
      defaultValue: `"horizontal"`,
      description: "Dirección de los botones."
    }, {
      name: "size",
      type: `"sm" | "md" | "lg" | "xl" | "2xl"`,
      defaultValue: `"md"`,
      description: "Tamaño que determina el border radius del grupo."
    }, {
      name: "color",
      type: `"primary" | "secondary" | "neutral" | "success" | "warning" | "danger" | "info" | "light" | "dark"`,
      defaultValue: `"neutral"`,
      description: "Color base del grupo."
    }, {
      name: "fullWidth",
      type: "boolean",
      defaultValue: "false",
      description: "Expande el grupo al 100% del ancho."
    }, {
      name: "className",
      type: "string",
      defaultValue: "undefined",
      description: "Clases adicionales."
    }],
    notes: ["ButtonGroup.Divider separa secciones dentro del grupo."]
  }]
};
