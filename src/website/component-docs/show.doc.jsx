/* eslint-disable react-refresh/only-export-components */
import { Show } from "@/lib";
const SHOW_PREVIEW_CODE = `import { Show } from "quickit-ui";

export function ShowPreview({ isReady }) {
  return (
    <Show when={isReady} fallback="Cargando...">
      Contenido listo
    </Show>
  );
}`;
function ShowPreviewCanvas() {
  return <Show when={true} fallback="Cargando...">
      Contenido listo
    </Show>;
}
export const showDoc = {
  name: "Show",
  description: "Render condicional simple con fallback usando truthiness nativa.",
  previewCode: SHOW_PREVIEW_CODE,
  preview: <ShowPreviewCanvas />,
  installCode: `import { Show } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Muestra contenido cuando when es truthy, fallback en caso contrario.",
    preview: <div className="space-y-4">
          <Show when={true} fallback="Cargando...">
            <p className="text-sm">Contenido listo</p>
          </Show>
          <Show when={false} fallback="Cargando...">
            <p className="text-sm">No se ve</p>
          </Show>
        </div>,
    code: `import { Show } from "quickit-ui";

export function ShowBasico() {
  return (
    <div className="space-y-4">
      <Show when={true} fallback="Cargando...">
        <p className="text-sm">Contenido listo</p>
      </Show>
      <Show when={false} fallback="Cargando...">
        <p className="text-sm">No se ve</p>
      </Show>
    </div>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "when",
      type: "T",
      defaultValue: "required",
      description: "Valor evaluado por truthiness."
    }, {
      name: "children",
      type: "ReactNode | (value) => ReactNode",
      defaultValue: "undefined",
      description: "Contenido cuando se cumple."
    }, {
      name: "fallback",
      type: "ReactNode | (value) => ReactNode",
      defaultValue: "undefined",
      description: "Contenido alterno."
    }],
    notes: ["Show usa truthiness nativa de JavaScript.", "Para valores como 0 o \"\" como válidos, convierte a condición explícita."]
  }]
};
