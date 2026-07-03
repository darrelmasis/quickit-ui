/* eslint-disable react-refresh/only-export-components */
import { Button, EmptyState } from "@/lib";
import { CopyIcon } from "@/lib/assets/icons";
const EMPTY_STATE_PREVIEW_CODE = `import { EmptyState, Button } from "quickit-ui";

export function EmptyStatePreview() {
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
  description: "Estado vacío con título, descripción y acciones.",
  previewCode: EMPTY_STATE_PREVIEW_CODE,
  preview: <EmptyStatePreviewCanvas />,
  installCode: `import { EmptyState } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Estado vacío con icono, título y acciones.",
    preview: <EmptyState align="center">
          <EmptyState.Icon>
            <CopyIcon className="size-5" />
          </EmptyState.Icon>
          <EmptyState.Title>Sin resultados</EmptyState.Title>
          <EmptyState.Description>Prueba otro filtro.</EmptyState.Description>
          <EmptyState.Actions>
            <Button size="sm">Crear item</Button>
          </EmptyState.Actions>
        </EmptyState>,
    code: `import { Button, EmptyState } from "quickit-ui";
import { CopyIcon } from "quickit-ui/icons";

export function EmptyStateBasico() {
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
}`
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
        </EmptyState>,
    code: `import { Button, EmptyState } from "quickit-ui";
import { CopyIcon } from "quickit-ui/icons";

export function EmptyStateLayout() {
  return (
    <EmptyState align="start">
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
  );
}`
  }, {
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
      description: "Shorthand para el título."
    }, {
      name: "description",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Shorthand para descripción."
    }, {
      name: "icon",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Shorthand para icono."
    }],
    notes: ["Usa shorthand (title, description, icon) o subcomponentes compuestos.", "EmptyState.Actions ocupa todo el ancho y apila en mobile."]
  }]
};
