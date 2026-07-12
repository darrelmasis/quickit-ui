/* eslint-disable react-refresh/only-export-components */
import { Range } from "@/lib";
const RANGE_PREVIEW_CODE = `import { Range } from "quickit-ui";

export function RangePreview() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-neutral-500">Valor único</p>
        <Range defaultValue={40} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-neutral-500">Rango (inicio/fin)</p>
        <Range range defaultValue={[20, 75]} color="primary" />
      </div>
      <div className="h-40">
        <Range orientation="vertical" defaultValue={60} step={10} className="h-full" />
      </div>
    </div>
  );
}`;
function RangePreviewCanvas() {
  return <div className="w-full max-w-md flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Valor único</p>
        <Range defaultValue={40} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Rango (inicio/fin)</p>
        <Range range defaultValue={[20, 75]} color="primary" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Vertical</p>
        <div className="h-40">
          <Range orientation="vertical" defaultValue={60} step={10} className="h-full" />
        </div>
      </div>
    </div>;
}
export const rangeDoc = {
  name: "Range",
  description: "Slider nativo estilizado con modo simple y modo rango doble (inicio/fin).",
  previewCode: RANGE_PREVIEW_CODE,
  preview: <RangePreviewCanvas />,
  installCode: `import { Range } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Slider de valor único.",
    preview: <div className="w-full max-w-md">
        <Range defaultValue={50} min={0} max={100} step={5} />
      </div>,
    code: `import { Range } from "quickit-ui";

export function RangeBasico() {
  return (
    <Range defaultValue={50} min={0} max={100} step={5} />
  );
}`
  }, {
    id: "ejemplos-colores",
    title: "Colores",
    description: "Usa tokens semánticos para mantener consistencia.",
    preview: <div className="flex flex-col gap-3">
          <Range defaultValue={10} color="neutral" />
          <Range defaultValue={20} color="primary" />
          <Range defaultValue={30} color="primary" />
          <Range defaultValue={40} color="success" />
          <Range defaultValue={50} color="danger" />
        </div>,
    code: `import { Range } from "quickit-ui";

export function RangeColores() {
  return (
    <div className="flex flex-col gap-3">
      <Range defaultValue={10} color="neutral" />
      <Range defaultValue={20} color="primary" />
      <Range defaultValue={30} color="primary" />
      <Range defaultValue={40} color="success" />
      <Range defaultValue={50} color="danger" />
    </div>
  );
}`
  }, {
    id: "ejemplos-doble-thumb",
    title: "Rango doble (inicio/fin)",
    description: "Activa range para renderizar dos thumbs y seleccionar un intervalo.",
    preview: <div className="flex flex-col gap-4">
          <Range range defaultValue={[15, 65]} />
          <Range range name="priceMin" endName="priceMax" defaultValue={[30, 90]} color="primary" startLabel="Precio mínimo" endLabel="Precio máximo" showValueTooltip />
        </div>,
    code: `import { Range } from "quickit-ui";

export function RangeDoble() {
  return (
    <div className="flex flex-col gap-4">
      <Range range defaultValue={[15, 65]} />
      <Range
        range
        name="priceMin"
        endName="priceMax"
        defaultValue={[30, 90]}
        color="primary"
        startLabel="Precio mínimo"
        endLabel="Precio máximo"
        showValueTooltip
      />
    </div>
  );
}`
  }, {
    id: "ejemplos-vertical",
    title: "Vertical y rueda del mouse",
    description: "Con orientation=\"vertical\" puedes cambiar con la rueda (por defecto activo).",
    preview: <div className="h-44">
          <Range orientation="vertical" defaultValue={50} step={10} className="h-full" />
        </div>,
    code: `import { Range } from "quickit-ui";

export function RangeVertical() {
  return (
    <div className="h-44">
      <Range orientation="vertical" defaultValue={50} step={10} className="h-full" />
    </div>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "Color del thumb (accent nativo)."
    }, {
      name: "min",
      type: "number",
      defaultValue: "0",
      description: "Límite inferior del eje."
    }, {
      name: "max",
      type: "number",
      defaultValue: "100",
      description: "Límite superior del eje."
    }, {
      name: "step",
      type: "number",
      defaultValue: "1",
      description: "Incremento por paso."
    }, {
      name: "value",
      type: "number | [number, number]",
      defaultValue: "undefined",
      description: "Valor controlado (simple o rango doble)."
    }, {
      name: "defaultValue",
      type: "number | [number, number]",
      defaultValue: "undefined",
      description: "Valor inicial en modo no controlado."
    }, {
      name: "name",
      type: "string",
      defaultValue: "undefined",
      description: "Nombre del input nativo."
    }, {
      name: "endName",
      type: "string",
      defaultValue: "`name + \"End\"`",
      description: "Nombre del hidden input que serializa el valor final en modo doble."
    }, {
      name: "range",
      type: "boolean",
      defaultValue: "false",
      description: "Activa el modo doble thumb (inicio/fin)."
    }, {
      name: "orientation",
      type: `"horizontal" | "vertical"`,
      defaultValue: `"horizontal"`,
      description: "Orientación del slider."
    }, {
      name: "allowWheel",
      type: "boolean",
      defaultValue: "true",
      description: "Permite cambiar el valor con la rueda del mouse."
    }, {
      name: "showValueTooltip",
      type: "boolean",
      defaultValue: "true",
      description: "Muestra tooltip con el valor actual."
    }, {
      name: "onChange",
      type: "(event) => void",
      defaultValue: "undefined",
      description: "Evento del input nativo en modo simple."
    }, {
      name: "onValueChange",
      type: "(value: number | [number, number]) => void",
      defaultValue: "undefined",
      description: "Callback de valor normalizado."
    }],
    notes: ["En modo simple se comporta como input[type=\"range\"] estilizado.", "En modo doble se montan dos inputs range internos con labels accesibles.", "Con orientación vertical, el valor bajo queda abajo y el alto arriba.", "Si no quieres tooltips visibles, desactiva showValueTooltip."]
  }]
};
