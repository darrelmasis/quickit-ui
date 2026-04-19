/* eslint-disable react-refresh/only-export-components */
import { Show } from "@/lib";
const LOGIC_SHOW_PREVIEW_CODE = `import { Show } from "quickit-ui";

export function ShowPreview({ isReady }) {
  return (
    <Show when={isReady} fallback="Cargando...">
      Contenido listo
    </Show>
  );
}`;
function LogicShowPreviewCanvas() {
  return <Show when={true} fallback="Cargando...">
      Contenido listo
    </Show>;
}
export const showDoc = {
  name: "Show",
  description: "Render condicional simple con fallback.",
  previewCode: LOGIC_SHOW_PREVIEW_CODE,
  preview: <LogicShowPreviewCanvas />,
  installCode: `import { Show } from "quickit-ui";`,
  usageCode: `import { Show } from "quickit-ui";

export function ShowUsage({ isReady }) {
  return (
    <Show when={isReady} fallback="Cargando...">
      Contenido listo
    </Show>
  );
}`,
  examples: [{
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "when",
      type: "T",
      defaultValue: "required",
      description: "Valor evaluado para render."
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
    }]
  }]
};
