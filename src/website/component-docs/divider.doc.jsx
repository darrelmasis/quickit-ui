/* eslint-disable react-refresh/only-export-components */
import { Divider } from "@/lib";
import { Button } from "@/lib";

const DIVIDER_PREVIEW_CODE = `import { Divider } from "quickit-ui";

export function DividerPreview() {
  return (
    <div>
      <p>Sección uno</p>
      <Divider />
      <p>Sección dos</p>
      <Divider label="O" />
      <p>Sección tres</p>
    </div>
  );
}`;

function DividerPreviewCanvas() {
  return (
    <div className="space-y-3">
      <p className="text-sm">Sección uno</p>
      <Divider />
      <p className="text-sm">Sección dos</p>
      <Divider label="O" />
      <p className="text-sm">Sección tres</p>
    </div>
  );
}

function DividerVerticalExample() {
  return (
    <div className="flex h-16 items-center gap-2">
      <span className="text-sm">Item A</span>
      <Divider orientation="vertical" />
      <span className="text-sm">Item B</span>
      <Divider orientation="vertical" />
      <span className="text-sm">Item C</span>
    </div>
  );
}

export const dividerDoc = {
  name: "Divider",
  description: "Línea separadora horizontal o vertical. Soporta texto opcional en modo horizontal.",
  previewCode: DIVIDER_PREVIEW_CODE,
  preview: <DividerPreviewCanvas />,
  installCode: `import { Divider } from "quickit-ui";`,
  examples: [
    {
      id: "ejemplos-horizontal",
      title: "Horizontal",
      description: "Separador simple entre secciones.",
      preview: <DividerPreviewCanvas />,
      code: DIVIDER_PREVIEW_CODE,
    },
    {
      id: "ejemplos-vertical",
      title: "Vertical",
      description: "Útil para separar items en una fila.",
      preview: <DividerVerticalExample />,
      code: `import { Divider } from "quickit-ui";

export function DividerVertical() {
  return (
    <div className="flex h-16 items-center gap-2">
      <span>Item A</span>
      <Divider orientation="vertical" />
      <span>Item B</span>
    </div>
  );
}`,
    },
    {
      id: "ejemplos-con-label",
      title: "Con etiqueta",
      description: "Usa la prop label para mostrar texto entre las líneas.",
      preview: (
        <div className="space-y-3">
          <Button size="sm" variant="outline" fullWidth>Registrarse con Google</Button>
          <Divider label="O" />
          <Button size="sm" fullWidth>Crear cuenta</Button>
        </div>
      ),
      code: `import { Divider, Button } from "quickit-ui";

export function DividerLabel() {
  return (
    <div>
      <Button variant="outline" fullWidth>
        Registrarse con Google
      </Button>
      <Divider label="O" />
      <Button fullWidth>Crear cuenta</Button>
    </div>
  );
}`,
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          defaultValue: '"horizontal"',
          description: "Dirección del separador.",
        },
        {
          name: "label",
          type: "string",
          defaultValue: "undefined",
          description: "Texto opcional entre las líneas (solo horizontal).",
        },
      ],
      notes: [
        "Usa role=\"separator\" con aria-orientation para accesibilidad.",
        "El Divider vertical necesita un contenedor con altura definida (h-full o self-stretch).",
        "No necesita theme classes — usa colores neutros directos de Tailwind.",
      ],
    },
  ],
};
