/* eslint-disable react-refresh/only-export-components */
import { Button, EmptyState } from "@/lib";
const EMPTY_STATE_PREVIEW_CODE = `import { EmptyState, Button } from "quickit-ui";

export function EmptyStatePreview() {
  return (
    <EmptyState align="center">
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
    }],
    notes: ["Usa EmptyState.Title, EmptyState.Description y EmptyState.Actions (o EmptyStateTitle, etc. por nombre)."]
  }, {
    id: "ejemplos-layout",
    title: "Layout",
    description: "Alinea acciones a la izquierda si align es start.",
    preview: <EmptyState align="start">
          <EmptyState.Title>Sin proyectos</EmptyState.Title>
          <EmptyState.Description>Comienza creando uno nuevo.</EmptyState.Description>
          <EmptyState.Actions>
            <Button size="sm" variant="outline">Explorar</Button>
            <Button size="sm">Crear</Button>
          </EmptyState.Actions>
        </EmptyState>
  }]
};
