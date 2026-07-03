/* eslint-disable react-refresh/only-export-components */
import { Progress } from "@/lib";
const PROGRESS_PREVIEW_CODE = `import { Progress } from "quickit-ui";

export function ProgressPreview() {
  return <Progress value={62} />;
}`;
function ProgressPreviewCanvas() {
  return <div className="w-full max-w-md space-y-4">
      <Progress value={80} color="neutral" />
      <Progress value={75} color="slate" />
      <Progress value={70} color="zinc" />
      <Progress value={65} color="primary" />
      <Progress value={60} color="brand" />
      <Progress value={55} color="success" />
      <Progress value={50} color="danger" />
      <Progress value={45} color="warning" />
      <Progress value={40} color="info" />
    </div>;
}
export const progressDoc = {
  name: "Progress",
  description: "Indicador de progreso lineal con color y tamaño.",
  previewCode: PROGRESS_PREVIEW_CODE,
  preview: <ProgressPreviewCanvas />,
  installCode: `import { Progress } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Progress simple con value.",
    preview: <div className="w-full max-w-md space-y-3">
          <Progress value={45} />
          <Progress value={78} />
        </div>,
    code: `import { Progress } from "quickit-ui";

export function ProgressBasico() {
  return (
    <div className="space-y-3">
      <Progress value={45} />
      <Progress value={78} />
    </div>
  );
}`
  }, {
    id: "ejemplos-colores",
    title: "Colores",
    description: "Selecciona color por semántica.",
    preview: <div className="space-y-3">
          <Progress value={30} color="neutral" />
          <Progress value={60} color="brand" />
          <Progress value={80} color="success" />
        </div>,
    code: `import { Progress } from "quickit-ui";

export function ProgressColores() {
  return (
    <div className="space-y-3">
      <Progress value={30} color="neutral" />
      <Progress value={60} color="brand" />
      <Progress value={80} color="success" />
    </div>
  );
}`
  }, {
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: "Altura sm, md, lg.",
    preview: <div className="space-y-3">
          <Progress value={40} size="sm" />
          <Progress value={60} size="md" />
          <Progress value={80} size="lg" />
        </div>,
    code: `import { Progress } from "quickit-ui";

export function ProgressTamanos() {
  return (
    <div className="space-y-3">
      <Progress value={40} size="sm" />
      <Progress value={60} size="md" />
      <Progress value={80} size="lg" />
    </div>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "value",
      type: "number",
      defaultValue: "0",
      description: "Valor actual del progreso."
    }, {
      name: "min",
      type: "number",
      defaultValue: "0",
      description: "Valor mínimo."
    }, {
      name: "max",
      type: "number",
      defaultValue: "100",
      description: "Valor máximo."
    }, {
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"primary"`,
      description: "Color de la barra activa."
    }, {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      defaultValue: `"md"`,
      description: "Altura del progreso."
    }],
    notes: ["Usa max > min para valor accesible coherente."]
  }]
};
