/* eslint-disable react-refresh/only-export-components */
import { Animate, Button } from "@/lib";
import { useState } from "react";
const ANIMATE_PREVIEW_CODE = `import { useState } from "react";
import { Animate, Button } from "quickit-ui";

export function AnimatePreview() {
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-4">
      <Button onClick={() => setOpen((current) => !current)}>
        Alternar panel
      </Button>

      <Animate show={open} duration={180}>
        {(visible) => (
          <div
            className="rounded-2xl border p-4 transition-all"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
            }}
          >
            Contenido animado
          </div>
        )}
      </Animate>
    </div>
  );
}`;
function AnimatePreviewCanvas() {
  const [open, setOpen] = useState(true);
  return <div className="space-y-4">
      <Button color="neutral" variant="outline" onClick={() => setOpen((current) => !current)}>
        Alternar panel
      </Button>
      <Animate show={open} duration={180}>
        {(visible) => (
          <div className="rounded-2xl border border-neutral-200 p-4 transition-all dark:border-neutral-800" style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)"
          }}>
            Contenido animado
          </div>
        )}
      </Animate>
    </div>;
}
function AnimateBasicoEjemplo() {
  const [open, setOpen] = useState(true);
  return <div className="space-y-4">
      <Button color="neutral" variant="outline" onClick={() => setOpen(c => !c)}>Alternar panel</Button>
      <Animate show={open} duration={180}>
        {(visible) => (
          <div className="rounded-2xl border border-neutral-200 p-4 transition-all dark:border-neutral-800" style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)"
          }}>
            Contenido animado
          </div>
        )}
      </Animate>
    </div>;
}
export const animateDoc = {
  name: "Animate",
  description: "Primitive de lógica para gestionar entrada/salida declarativa.",
  previewCode: ANIMATE_PREVIEW_CODE,
  preview: <AnimatePreviewCanvas />,
  installCode: `import { Animate } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Animate con fade + translateY.",
    preview: <AnimateBasicoEjemplo />,
    code: `import { useState } from "react";
import { Animate, Button } from "quickit-ui";

export function AnimateBasico() {
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-4">
      <Button onClick={() => setOpen((c) => !c)}>
        Alternar panel
      </Button>
      <Animate show={open} duration={180}>
        {(visible) => (
          <div
            className="rounded-2xl border p-4 transition-all"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
            }}
          >
            Contenido animado
          </div>
        )}
      </Animate>
    </div>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "show",
      type: "boolean",
      defaultValue: "required",
      description: "Controla entrada/salida."
    }, {
      name: "duration",
      type: "number",
      defaultValue: "140",
      description: "ms antes de desmontar al cerrar."
    }, {
      name: "children",
      type: "(visible: boolean) => ReactNode",
      defaultValue: "required",
      description: "Render prop con estado visual."
    }],
    notes: ["Animate no aplica estilos: tú defines la transición.", "Durante la salida el nodo sigue montado hasta cumplir duration."]
  }]
};
