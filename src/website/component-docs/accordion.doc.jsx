/* eslint-disable react-refresh/only-export-components */
import { Accordion } from "@/lib";
const ACCORDION_PREVIEW_CODE = `import { Accordion } from "quickit-ui";

export function AccordionPreview() {
  return (
    <Accordion type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Primera sección</Accordion.Trigger>
        <Accordion.Content>Contenido interno.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Segunda sección</Accordion.Trigger>
        <Accordion.Content>Solo un panel puede quedar abierto a la vez.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}`;
function AccordionPreviewCanvas() {
  return <div className="w-full max-w-md flex flex-col gap-4">
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Primera sección</Accordion.Trigger>
          <Accordion.Content>Contenido interno.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Segunda sección</Accordion.Trigger>
          <Accordion.Content>Solo un panel puede quedar abierto a la vez.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>;
}
export const accordionDoc = {
  name: "Accordion",
  description: "Secciones colapsables con soporte single o multiple.",
  previewCode: ACCORDION_PREVIEW_CODE,
  preview: <AccordionPreviewCanvas />,
  installCode: `import { Accordion } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-single",
    title: "Single",
    description: "Solo un panel abierto a la vez; collapsible permite cerrarlo.",
    preview: <div className="w-full max-w-md">
        <Accordion type="single" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Trigger>¿Qué incluye?</Accordion.Trigger>
            <Accordion.Content>Componentes base listos para copiar.</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>¿Requiere configuración?</Accordion.Trigger>
            <Accordion.Content>Solo importar y usar.</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>,
    code: `import { Accordion } from "quickit-ui";

export function AccordionSingle() {
  return (
    <Accordion type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>¿Qué incluye?</Accordion.Trigger>
        <Accordion.Content>Componentes base listos para copiar.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>¿Requiere configuración?</Accordion.Trigger>
        <Accordion.Content>Solo importar y usar.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}`
  }, {
    id: "ejemplos-multiple",
    title: "Multiple",
    description: "Varios paneles abiertos al mismo tiempo.",
    preview: <div className="w-full max-w-md">
        <Accordion type="multiple" defaultValue={["item-1"]}>
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Detalles</Accordion.Trigger>
            <Accordion.Content>Contenido 1.</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Notas</Accordion.Trigger>
            <Accordion.Content>Contenido 2.</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>,
    code: `import { Accordion } from "quickit-ui";

export function AccordionMultiple() {
  return (
    <Accordion type="multiple" defaultValue={["item-1"]}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Detalles</Accordion.Trigger>
        <Accordion.Content>Contenido 1.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Notas</Accordion.Trigger>
        <Accordion.Content>Contenido 2.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "type",
      type: `"single" | "multiple"`,
      defaultValue: `"single"`,
      description: "Define si permite uno o varios items abiertos."
    }, {
      name: "clickOutside",
      type: "boolean",
      defaultValue: "false",
      description: "Cierra panels abiertos al hacer click fuera."
    }, {
      name: "collapsible",
      type: "boolean",
      defaultValue: "false",
      description: "Permite cerrar el item activo en modo single."
    }, {
      name: "defaultValue",
      type: "string | string[]",
      defaultValue: "undefined",
      description: "Valor inicial para items abiertos."
    }, {
      name: "value",
      type: "string | string[] | null",
      defaultValue: "undefined",
      description: "Controla los items abiertos."
    }, {
      name: "onValueChange",
      type: "(value) => void",
      defaultValue: "undefined",
      description: "Callback cuando cambia el valor."
    }],
    notes: ["Accordion.Item requiere prop value.", "En type=\"single\" solo un ítem abierto a la vez.", "El panel anima altura con CSS grid (0fr → 1fr)."]
  }]
};
