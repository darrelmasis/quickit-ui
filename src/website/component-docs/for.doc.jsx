/* eslint-disable react-refresh/only-export-components */
import { For } from "@/lib";
const FOR_PREVIEW_CODE = `import { For } from "quickit-ui";

export function ForPreview({ items }) {
  return (
    <For each={items} fallback="Sin datos">
      {(item) => <div key={item.id}>{item.label}</div>}
    </For>
  );
}`;
function ForPreviewCanvas() {
  return <For each={[{ id: 1, label: "Primero" }, { id: 2, label: "Segundo" }]}>
      {item => <div key={item.id}>{item.label}</div>}
    </For>;
}
export const forDoc = {
  name: "For",
  description: "Iteración declarativa con fallback vacío.",
  previewCode: FOR_PREVIEW_CODE,
  preview: <ForPreviewCanvas />,
  installCode: `import { For } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Itera un array con fallback cuando está vacío.",
    preview: <div className="flex flex-col gap-4">
          <For each={[{ id: 1, label: "Primero" }, { id: 2, label: "Segundo" }]}>
            {item => <div key={item.id} className="text-sm">{item.label}</div>}
          </For>
          <For each={[]} fallback={<p className="text-sm text-neutral-500">Sin datos</p>}>
            {item => <div key={item.id} className="text-sm">{item.label}</div>}
          </For>
        </div>,
    code: `import { For } from "quickit-ui";

export function ForBasico() {
  return (
    <div className="flex flex-col gap-4">
      <For each={[{ id: 1, label: "Primero" }, { id: 2, label: "Segundo" }]}>
        {(item) => <div key={item.id} className="text-sm">{item.label}</div>}
      </For>
      <For each={[]} fallback={<p className="text-sm text-neutral-500">Sin datos</p>}>
        {(item) => <div key={item.id} className="text-sm">{item.label}</div>}
      </For>
    </div>
  );
}`
  }, {
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
      description: "Render sin items."
    }],
    notes: ["For no genera keys por ti; define key dentro del render de cada item."]
  }]
};
