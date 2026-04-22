/* eslint-disable react-refresh/only-export-components */
import { For } from "@/lib";
const LOGIC_FOR_PREVIEW_CODE = `import { For } from "quickit-ui";

export function ForPreview({ items }) {
  return (
    <For each={items} fallback="Sin datos">
      {(item) => <div key={item.id}>{item.label}</div>}
    </For>
  );
}`;
function LogicForPreviewCanvas() {
  return <For each={[{
    id: 1,
    label: "Primero"
  }, {
    id: 2,
    label: "Segundo"
  }]}>
      {item => <div key={item.id}>{item.label}</div>}
    </For>;
}
export const forDoc = {
  name: "For",
  description: "Iteración declarativa con fallback vacío.",
  previewCode: LOGIC_FOR_PREVIEW_CODE,
  preview: <LogicForPreviewCanvas />,
  installCode: `import { For } from "quickit-ui";`,
  usageCode: `import { For } from "quickit-ui";

export function ForUsage({ items }) {
  return (
    <For each={items} fallback="Sin datos">
      {(item) => <div key={item.id}>{item.label}</div>}
    </For>
  );
}`,
  examples: [{
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "each",
      type: "Iterable<T> | null",
      defaultValue: "undefined",
      description: "Colección a iterar."
    }, {
      name: "children",
      type: "(item, index) => ReactNode",
      defaultValue: "undefined",
      description: "Render de cada item."
    }, {
      name: "fallback",
      type: "ReactNode | (items) => ReactNode",
      defaultValue: "undefined",
      description: "Render cuando no hay items."
    }],
    notes: ["`For` no genera keys por ti; devuelve nodos con `key` estable dentro del render de cada item."]
  }]
};
