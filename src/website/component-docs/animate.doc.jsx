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

  return (
    <div className="space-y-4">
      <Button color="neutral" variant="outline" onClick={() => setOpen((current) => !current)}>
        Alternar panel
      </Button>

      <Animate show={open} duration={180}>
        {(visible) => (
          <div
            className="rounded-2xl border border-neutral-200 p-4 transition-all dark:border-neutral-800"
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
}

export const animateDoc = {
  name: "Animate",
  description:
    "Primitive de lógica para gestionar entrada/salida declarativa cuando necesitas animar montaje y desmontaje sin depender de una librería externa.",
  previewCode: ANIMATE_PREVIEW_CODE,
  preview: <AnimatePreviewCanvas />,
  installCode: `import { Animate } from "quickit-ui";`,
  usageCode: `import { Animate } from "quickit-ui";

export function FadeBlock({ open }) {
  return (
    <Animate show={open} duration={180}>
      {(visible) => (
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.98)",
            transition: "opacity 180ms ease, transform 180ms ease",
          }}
        >
          Contenido
        </div>
      )}
    </Animate>
  );
}`,
  examples: [
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "show",
          type: "boolean",
          defaultValue: "required",
          description: "Controla si el contenido debe entrar o iniciar su salida.",
        },
        {
          name: "duration",
          type: "number",
          defaultValue: "140",
          description: "Tiempo en ms que `Animate` espera antes de desmontar el contenido al cerrar.",
        },
        {
          name: "children",
          type: "(visible: boolean) => ReactNode",
          defaultValue: "required",
          description: "Render prop que recibe el estado visual (`true` al entrar, `false` al salir).",
        },
      ],
      notes: [
        "`Animate` no aplica estilos por sí mismo: tú defines la transición en el contenido renderizado.",
        "Durante la salida, el nodo sigue montado hasta que se cumple `duration`; úsalo para sincronizar tu CSS con el desmontaje.",
        "Es una utilidad de composición, no un replacement completo de Framer Motion o React Transition Group.",
      ],
    },
  ],
};
