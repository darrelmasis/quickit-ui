import { Accordion } from "@/lib";

const ACCORDION_PREVIEW_CANVAS_CLASSNAME = "w-full max-w-md space-y-4";

const previewCode = `import { Accordion } from "quickit-ui";

export function AccordionPreview() {
  return (
    <div className="${ACCORDION_PREVIEW_CANVAS_CLASSNAME}">
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
    </div>
  );
}`;

const preview = (
  <div className={ACCORDION_PREVIEW_CANVAS_CLASSNAME}>
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
  </div>
);

export const accordionDoc = {
  name: "Accordion",
  description: "Secciones colapsables con soporte single o multiple.",
  previewCode,
  preview,
  installCode: `import { Accordion } from "quickit-ui";`,
  usageCode: `import { Accordion } from "quickit-ui";

export function AccordionUsage() {
  return (
    <Accordion type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>¿Qué incluye?</Accordion.Trigger>
        <Accordion.Content>Incluye componentes base.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}`,
  examples: [
    {
      id: "ejemplos-multiple",
      title: "Multiple",
      description: "Permite abrir más de un panel.",
      preview: (
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
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "type",
          type: `"single" | "multiple"`,
          defaultValue: `"single"`,
          description: "Define si permite uno o varios items abiertos.",
        },
        {
          name: "clickOutside",
          type: "boolean",
          defaultValue: "false",
          description: "Cierra panels abiertos al hacer click fuera. En `type=\"single\"` úsalo junto con `collapsible` para evitar un contrato ambiguo.",
        },
        {
          name: "collapsible",
          type: "boolean",
          defaultValue: "false",
          description: "Permite cerrar el item activo en modo single.",
        },
        {
          name: "defaultValue",
          type: "string | string[]",
          defaultValue: "undefined",
          description: "Valor inicial para items abiertos.",
        },
        {
          name: "value",
          type: "string | string[] | null",
          defaultValue: "undefined",
          description: "Controla los items abiertos.",
        },
        {
          name: "onValueChange",
          type: "(value) => void",
          defaultValue: "undefined",
          description: "Callback cuando cambia el valor.",
        },
      ],
      notes: [
        "Accordion.Item requiere prop value (también disponible como AccordionItem).",
        "En `type=\"single\"` solo puede haber un ítem abierto; si `value` o `defaultValue` llegan como array, solo se usa el primer elemento.",
        "Si activas `clickOutside` en `type=\"single\"`, deja también `collapsible` en true para que el comportamiento sea coherente.",
        "El panel anima altura con CSS grid (`0fr` → `1fr`); con `prefers-reduced-motion` la transición se acorta.",
        "`forceMount` se mantiene por compatibilidad; el contenido queda montado para poder animar.",
      ],
    },
  ],
};
