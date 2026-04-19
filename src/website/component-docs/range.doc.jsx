/* eslint-disable react-refresh/only-export-components */
import { Range } from "@/lib";
const RANGE_PREVIEW_CODE = `import { Range } from "quickit-ui";

export function RangePreview() {
  return (
    <div className="space-y-4">
      <Range defaultValue={40} />
      <Range
        range
        defaultValue={[20, 75]}
        color="brand"
        showValueTooltip
      />
      <div className="h-40">
        <Range
          orientation="vertical"
          defaultValue={60}
          step={10}
          className="h-full"
        />
      </div>
    </div>
  );
}`;
function RangePreviewCanvas() {
  return <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Valor único
        </p>
        <Range defaultValue={40} />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Rango (inicio/fin)
        </p>
        <Range range defaultValue={[20, 75]} color="brand" />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Vertical + rueda del mouse
        </p>
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
  usageCode: `import { Range } from "quickit-ui";

export function RangeUsage() {
  return (
    <div className="space-y-4">
      <Range defaultValue={50} min={0} max={100} step={5} />
      <Range
        range
        defaultValue={[20, 80]}
        min={0}
        max={100}
        showValueTooltip
      />
      <div className="h-40">
        <Range
          orientation="vertical"
          defaultValue={50}
          step={10}
          className="h-full"
        />
      </div>
    </div>
  );
}`,
  examples: [{
    id: "ejemplos-colores",
    title: "Colores",
    description: "Usa tokens semánticos para mantener consistencia.",
    preview: <div className="space-y-3">
          <Range defaultValue={10} color="neutral" />
          <Range defaultValue={20} color="slate" />
          <Range defaultValue={30} color="zinc" />
          <Range defaultValue={40} color="primary" />
          <Range defaultValue={50} color="brand" />
          <Range defaultValue={60} color="success" />
          <Range defaultValue={70} color="danger" />
          <Range defaultValue={80} color="warning" />
          <Range defaultValue={90} color="info" />
        </div>
  }, {
    id: "ejemplos-doble-thumb",
    title: "Rango doble (inicio/fin)",
    description: "Activa `range` para renderizar dos thumbs y seleccionar un intervalo.",
    preview: <div className="space-y-4">
          <Range range defaultValue={[15, 65]} />
          <Range range defaultValue={[30, 90]} color="brand" showValueTooltip />
        </div>
  }, {
    id: "ejemplos-vertical",
    title: "Vertical y rueda del mouse",
    description: "Con `orientation=\"vertical\"` puedes cambiar también con la rueda (por defecto activo).",
    preview: <div className="h-44">
          <Range orientation="vertical" defaultValue={50} step={10} className="h-full" />
        </div>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"primary"`,
      description: "Color del thumb (accent nativo)."
    }, {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      defaultValue: `"md"`,
      description: "Altura del slider."
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
      description: "Muestra tooltip con el valor actual en el/los thumb(s)."
    }, {
      name: "tooltipHideDelay",
      type: "number",
      defaultValue: "900",
      description: "Tiempo en ms que el tooltip permanece visible después de terminar la interacción."
    }, {
      name: "tooltipOffset",
      type: "number",
      defaultValue: "12",
      description: "Separación principal entre tooltip y thumb."
    }, {
      name: "tooltipCrossOffset",
      type: "number",
      defaultValue: "0",
      description: "Ajuste transversal del tooltip respecto al thumb."
    }, {
      name: "tooltipPlacement",
      type: "Placement",
      defaultValue: "auto (`top` horizontal, `right` vertical)",
      description: "Lado preferido del tooltip con fallback automático."
    }, {
      name: "tooltipFormatter",
      type: "(value: number, thumb: \"start\" | \"end\") => ReactNode",
      defaultValue: "undefined",
      description: "Formatea el contenido del tooltip (útil para prefijos, unidades o inicio/fin)."
    }, {
      name: "getAriaValueText",
      type: "(value: number, thumb: \"start\" | \"end\") => string",
      defaultValue: "undefined",
      description: "Texto para `aria-valuetext` de lectores de pantalla; por defecto usa el tooltip si es string/número."
    }, {
      name: "onChange",
      type: "(event) => void",
      defaultValue: "undefined",
      description: "Evento nativo del input."
    }, {
      name: "onValueChange",
      type: "(value: number | [number, number]) => void",
      defaultValue: "undefined",
      description: "Callback de valor normalizado."
    }],
    notes: ["El resto de props válidas de `input type=\"range\"` se reenvían al elemento nativo.", "En modo doble se montan dos inputs range superpuestos para controlar inicio y fin.", "Con orientación vertical, el valor bajo queda abajo y el alto arriba.", "`aria-valuetext` mejora la lectura del valor en SR cuando usas `getAriaValueText` o un `tooltipFormatter` textual."]
  }]
};
