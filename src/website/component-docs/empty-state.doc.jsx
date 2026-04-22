/* eslint-disable react-refresh/only-export-components */
import { Button, EmptyState } from "@/lib";
import { CopyIcon } from "@/lib/assets/icons";
const EMPTY_STATE_PREVIEW_CODE = `import { EmptyState, Button } from "quickit-ui";

export function EmptyStatePreview() {
  return (
    <EmptyState align="center">
      <EmptyState.Icon>
        <svg aria-hidden="true" viewBox="0 0 448 512" className="size-5">
          <path fill="currentColor" d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16h140.1L400 115.9V320c0 8.8-7.2 16-16 16ZM192 384h192c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64ZM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64Z"/>
        </svg>
      </EmptyState.Icon>
      <EmptyState.Title>Sin resultados</EmptyState.Title>
      <EmptyState.Description>Prueba otro filtro.</EmptyState.Description>
      <EmptyState.Actions>
        <Button size="sm">Crear item</Button>
      </EmptyState.Actions>
    </EmptyState>
  );
}`;
function EmptyStatePreviewCanvas() {
  return <EmptyState align="center">
      <EmptyState.Icon>
        <CopyIcon className="size-5" />
      </EmptyState.Icon>
      <EmptyState.Title>Sin resultados</EmptyState.Title>
      <EmptyState.Description>Prueba otro filtro.</EmptyState.Description>
      <EmptyState.Actions>
        <Button size="sm">Crear item</Button>
      </EmptyState.Actions>
    </EmptyState>;
}
export const emptyStateDoc = {
  name: "EmptyState",
  description: "Estado vacío con título, descripción y acciones (EmptyState.Title, .Description, .Actions).",
  previewCode: EMPTY_STATE_PREVIEW_CODE,
  preview: <EmptyStatePreviewCanvas />,
  installCode: `import { EmptyState, Button } from "quickit-ui";`,
  usageCode: `import { EmptyState, Button } from "quickit-ui";

export function EmptyStateUsage() {
  return (
    <EmptyState align="center">
      <EmptyState.Icon>
        <CopyIcon className="size-5" />
      </EmptyState.Icon>
      <EmptyState.Title>Sin resultados</EmptyState.Title>
      <EmptyState.Description>Prueba otro filtro.</EmptyState.Description>
      <EmptyState.Actions>
        <Button size="sm">Crear item</Button>
      </EmptyState.Actions>
    </EmptyState>
  );
}`,
  examples: [{
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "align",
      type: `"center" | "start"`,
      defaultValue: `"center"`,
      description: "Alineación del contenido."
    }, {
      name: "title",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Shorthand para el título cuando no quieres usar `EmptyState.Title`."
    }, {
      name: "description",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Shorthand para la descripción."
    }, {
      name: "icon",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Shorthand para un icono o ilustración simple."
    }],
    notes: ["Puedes usar shorthand (`title`, `description`, `icon`) o subcomponentes compuestos.", "Usa `EmptyState.Icon`, `EmptyState.Title`, `EmptyState.Description` y `EmptyState.Actions` cuando necesites layout más flexible.", "`EmptyState.Actions` ocupa todo el ancho y apila acciones en mobile; en pantallas mayores vuelve a layout horizontal."]
  }, {
    id: "ejemplos-layout",
    title: "Layout",
    description: "Alinea acciones a la izquierda si align es start.",
    preview: <EmptyState align="start">
          <EmptyState.Icon>
            <CopyIcon className="size-5" />
          </EmptyState.Icon>
          <EmptyState.Title>Sin proyectos</EmptyState.Title>
          <EmptyState.Description>Comienza creando uno nuevo.</EmptyState.Description>
          <EmptyState.Actions>
            <Button size="sm" variant="outline">Explorar</Button>
            <Button size="sm">Crear</Button>
          </EmptyState.Actions>
        </EmptyState>
  }]
};
