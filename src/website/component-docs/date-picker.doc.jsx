import { DatePicker } from "@/lib";
export const datePickerDoc = {
  name: "DatePicker",
  description: "Selector de fecha con calendario en popover (sin dependencias de fechas externas). Modo `between` para rangos.",
  previewCode: `import { DatePicker } from "quickit-ui";

export function DatePickerPreview() {
  return (
    <div className="space-y-4">
      <DatePicker defaultValue="2025-06-15" placeholder="Una fecha (single)" />
      <DatePicker
        selectionMode="between"
        defaultValue={{ from: "2025-06-01", to: "2025-06-14" }}
      />
    </div>
  );
}`,
  preview: <div className="w-full max-w-xl space-y-4">
      <DatePicker defaultValue="2025-06-15" placeholder="Una fecha (single)" />
      <DatePicker selectionMode="between" defaultValue={{
      from: "2025-06-01",
      to: "2025-06-14"
    }} />
    </div>,
  installCode: `import { DatePicker } from "quickit-ui";`,
  usageCode: `import { DatePicker } from "quickit-ui";

export function DatePickerUsage() {
  return (
    <>
      <DatePicker onChange={(d) => console.log(d)} />
      <DatePicker
        selectionMode="between"
        onChange={(r) => console.log(r.from, r.to)}
      />
    </>
  ); 
}`,
  examples: [{
    id: "ejemplos-date-style",
    title: "dateStyle: short, long y full",
    description: "Misma fecha de ejemplo en los tres modos. El resultado depende del locale del navegador (`Intl`). `full` suele incluir el día de la semana.",
    preview: <div className="w-full max-w-xl space-y-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              short
            </p>
            <DatePicker dateStyle="short" defaultValue="2025-06-15" placeholder="Sin fecha" />
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              long
            </p>
            <DatePicker dateStyle="long" defaultValue="2025-06-15" placeholder="Sin fecha" />
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              full
            </p>
            <DatePicker dateStyle="full" defaultValue="2025-06-15" placeholder="Sin fecha" />
          </div>
        </div>
  }, {
    id: "ejemplos-between",
    title: "Modo between (rango)",
    description: "El campo muestra inicio y fin; en el calendario se resaltan los días intermedios. Tras un rango completo, un nuevo clic vuelve a empezar.",
    preview: <div className="w-full max-w-xl">
          <DatePicker selectionMode="between" defaultValue={{
        from: "2025-06-10",
        to: "2025-06-22"
      }} />
        </div>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "selectionMode",
      type: `"single" | "between"`,
      defaultValue: `"single"`,
      description: "`between`: dos clics para inicio y fin; el input muestra ambas fechas. Nuevo clic con rango completo reinicia."
    }, {
      name: "value",
      type: "fecha o { from, to }",
      defaultValue: "undefined",
      description: "Controlado: una fecha o objeto de rango según el modo."
    }, {
      name: "onChange",
      type: "(date) o (range)",
      defaultValue: "undefined",
      description: "`single`: recibe la fecha. `between`: recibe `{ from, to }`; en el primer paso `to` es `null`."
    }, {
      name: "minDate / maxDate",
      type: "Date | string | number",
      defaultValue: "undefined",
      description: "Límites inclusive para días habilitados."
    }, {
      name: "dateStyle",
      type: `"short" | "long" | "full"`,
      defaultValue: `"long"`,
      description: "Formato del texto en el campo (Intl `dateStyle`: corto, largo o completo con día de la semana)."
    }, {
      name: "color / calendarColor",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "`color` estiliza el borde/fondo del input. `calendarColor` (opcional) pinta selección y rango en la cuadrícula; si no se pasa, usa el mismo que `color`."
    }],
    notes: ["La semana inicia en lunes en la cabecera del calendario."]
  }]
};
