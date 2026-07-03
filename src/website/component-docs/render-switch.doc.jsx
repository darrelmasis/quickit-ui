/* eslint-disable react-refresh/only-export-components */
import { Default, Match, RenderSwitch } from "@/lib";
const RENDER_SWITCH_PREVIEW_CODE = `import { RenderSwitch, Match, Default } from "quickit-ui";

export function RenderSwitchPreview({ status }) {
  return (
    <RenderSwitch value={status}>
      <Match when="success">Todo bien</Match>
      <Match when="error">Algo falló</Match>
      <Default>En espera</Default>
    </RenderSwitch>
  );
}`;
function RenderSwitchPreviewCanvas() {
  return <RenderSwitch value="success">
      <Match when="success">Todo bien</Match>
      <Match when="error">Algo falló</Match>
      <Default>En espera</Default>
    </RenderSwitch>;
}
export const renderSwitchDoc = {
  name: "RenderSwitch",
  description: "Control declarativo para varios estados posibles.",
  previewCode: RENDER_SWITCH_PREVIEW_CODE,
  preview: <RenderSwitchPreviewCanvas />,
  installCode: `import { RenderSwitch, Match, Default } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "RenderSwitch con Match y Default.",
    preview: <RenderSwitch value="success">
          <Match when="success">Todo bien</Match>
          <Match when="error">Algo falló</Match>
          <Default>En espera</Default>
        </RenderSwitch>,
    code: `import { Default, Match, RenderSwitch } from "quickit-ui";

export function RenderSwitchBasico() {
  return (
    <RenderSwitch value="success">
      <Match when="success">Todo bien</Match>
      <Match when="error">Algo falló</Match>
      <Default>En espera</Default>
    </RenderSwitch>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "value",
      type: "T",
      defaultValue: "required",
      description: "Valor a evaluar."
    }, {
      name: "fallback",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Contenido si no hay Match/Default."
    }],
    notes: ["Match acepta when como valor, array o función.", "Default define el contenido por defecto.", "Match y Default deben ser hijos directos de RenderSwitch."]
  }]
};
