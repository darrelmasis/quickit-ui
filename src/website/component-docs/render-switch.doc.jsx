/* eslint-disable react-refresh/only-export-components */
import { Default, Match, RenderSwitch } from "@/lib";
const LOGIC_SWITCH_PREVIEW_CODE = `import { RenderSwitch, Match, Default } from "quickit-ui";

export function SwitchPreview({ status }) {
  return (
    <RenderSwitch value={status}>
      <Match when="success">Todo bien</Match>
      <Match when="error">Algo falló</Match>
      <Default>En espera</Default>
    </RenderSwitch>
  );
}`;
function LogicSwitchPreviewCanvas() {
  return <RenderSwitch value="success">
      <Match when="success">Todo bien</Match>
      <Match when="error">Algo falló</Match>
      <Default>En espera</Default>
    </RenderSwitch>;
}
export const renderSwitchDoc = {
  name: "RenderSwitch",
  description: "Control declarativo para varios estados posibles.",
  previewCode: LOGIC_SWITCH_PREVIEW_CODE,
  preview: <LogicSwitchPreviewCanvas />,
  installCode: `import { RenderSwitch, Match, Default } from "quickit-ui";`,
  usageCode: `import { RenderSwitch, Match, Default } from "quickit-ui";

export function SwitchUsage({ status }) {
  return (
    <RenderSwitch value={status}>
      <Match when="success">Todo bien</Match>
      <Match when="error">Algo falló</Match>
      <Default>En espera</Default>
    </RenderSwitch>
  );
}`,
  examples: [{
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
    notes: ["Match acepta when como valor, array o función.", "Default define el contenido por defecto.", "`Match` y `Default` deben renderizarse como hijos directos de `RenderSwitch` para que el componente pueda resolverlos correctamente."]
  }]
};
