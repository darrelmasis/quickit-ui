import { DatePicker } from "@/lib";
export const datePickerDoc = {
  name: "DatePicker",
  description: "Selector de fecha con calendario en popover. Modo between para rangos.",
  previewCode: `import { DatePicker } from "quickit-ui";

export function DatePickerPreview() {
  return (
    <div className="flex flex-col gap-4">
      <DatePicker defaultValue="2025-06-15" placeholder="Una fecha (single)" />
      <DatePicker selectionMode="between" defaultValue={{ from: "2025-06-01", to: "2025-06-14" }} />
    </div>
  );
}`,
  preview: <div className="w-full max-w-xl flex flex-col gap-4">
      <DatePicker defaultValue="2025-06-15" placeholder="Una fecha (single)" />
      <DatePicker selectionMode="between" defaultValue={{ from: "2025-06-01", to: "2025-06-14" }} />
    </div>,
  installCode: `import { DatePicker } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-reserva",
    title: "Reserva de hotel",
    description: "Ejemplo realista de selección de fechas para reserva.",
    preview: <div className="w-full max-w-xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Fecha de check-in</label>
            <DatePicker defaultValue="2025-07-20" placeholder="Selecciona fecha de llegada" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Fecha de check-out</label>
            <DatePicker defaultValue="2025-07-25" placeholder="Selecciona fecha de salida" />
          </div>
        </div>
      </div>,
    code: `import { DatePicker } from "quickit-ui";

export function DatePickerReserva() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Fecha de check-in</label>
        <DatePicker defaultValue="2025-07-20" placeholder="Selecciona fecha de llegada" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Fecha de check-out</label>
        <DatePicker defaultValue="2025-07-25" placeholder="Selecciona fecha de salida" />
      </div>
    </div>
  );
}`
  }, {
    id: "ejemplos-rango-evento",
    title: "Rango de fechas para evento",
    description: "Ejemplo realista de selección de rango para eventos.",
    preview: <div className="w-full max-w-xl">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Fechas del evento</label>
          <DatePicker 
            selectionMode="between" 
            defaultValue={{ from: "2025-08-15", to: "2025-08-20" }} 
            placeholder="Selecciona el rango de fechas"
          />
        </div>
      </div>,
    code: `import { DatePicker } from "quickit-ui";

export function DatePickerRangoEvento() {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Fechas del evento</label>
      <DatePicker 
        selectionMode="between" 
        defaultValue={{ from: "2025-08-15", to: "2025-08-20" }} 
        placeholder="Selecciona el rango de fechas"
      />
    </div>
  );
}`
  }, {
    id: "ejemplos-cita",
    title: "Agendar cita",
    description: "Ejemplo realista de selección de fecha para cita médica.",
    preview: <div className="w-full max-w-xl">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Fecha de la cita</label>
          <DatePicker 
            minDate="2025-07-18" 
            defaultValue="2025-07-22" 
            placeholder="Selecciona una fecha disponible"
          />
        </div>
      </div>,
    code: `import { DatePicker } from "quickit-ui";

export function DatePickerCita() {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Fecha de la cita</label>
      <DatePicker 
        minDate="2025-07-18" 
        defaultValue="2025-07-22" 
        placeholder="Selecciona una fecha disponible"
      />
    </div>
  );
}`
  }, {
    id: "ejemplos-basico",
    title: "Básico",
    description: "DatePicker simple con fecha por defecto.",
    preview: <div className="w-full max-w-xl">
          <DatePicker defaultValue="2025-06-15" placeholder="Elige una fecha" />
        </div>,
    code: `import { DatePicker } from "quickit-ui";

export function DatePickerBasico() {
  return <DatePicker defaultValue="2025-06-15" placeholder="Elige una fecha" />;
}`
  }, {
    id: "ejemplos-date-style",
    title: "dateStyle: short, long y full",
    description: "El formato depende del locale del navegador.",
    preview: <div className="w-full max-w-xl flex flex-col gap-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">short</p>
            <DatePicker dateStyle="short" defaultValue="2025-06-15" placeholder="Sin fecha" />
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">long</p>
            <DatePicker dateStyle="long" defaultValue="2025-06-15" placeholder="Sin fecha" />
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">full</p>
            <DatePicker dateStyle="full" defaultValue="2025-06-15" placeholder="Sin fecha" />
          </div>
        </div>,
    code: `import { DatePicker } from "quickit-ui";

export function DatePickerStyle() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">short</p>
        <DatePicker dateStyle="short" defaultValue="2025-06-15" placeholder="Sin fecha" />
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">long</p>
        <DatePicker dateStyle="long" defaultValue="2025-06-15" placeholder="Sin fecha" />
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">full</p>
        <DatePicker dateStyle="full" defaultValue="2025-06-15" placeholder="Sin fecha" />
      </div>
    </div>
  );
}`
  }, {
    id: "ejemplos-between",
    title: "Modo between (rango)",
    description: "Dos clics para inicio y fin; se resaltan los días intermedios.",
    preview: <div className="w-full max-w-xl">
          <DatePicker selectionMode="between" defaultValue={{ from: "2025-06-10", to: "2025-06-22" }} />
        </div>,
    code: `import { DatePicker } from "quickit-ui";

export function DatePickerBetween() {
  return <DatePicker selectionMode="between" defaultValue={{ from: "2025-06-10", to: "2025-06-22" }} />;
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "selectionMode",
      type: `"single" | "between"`,
      defaultValue: `"single"`,
      description: "between permite seleccionar inicio y fin."
    }, {
      name: "value",
      type: "fecha o { from, to }",
      defaultValue: "undefined",
      description: "Valor controlado."
    }, {
      name: "onChange",
      type: "(date) o (range)",
      defaultValue: "undefined",
      description: "Callback de cambio."
    }, {
      name: "minDate / maxDate",
      type: "Date | string | number",
      defaultValue: "undefined",
      description: "Límites de días habilitados."
    }, {
      name: "dateStyle",
      type: `"short" | "long" | "full"`,
      defaultValue: `"long"`,
      description: "Formato del texto (Intl dateStyle)."
    }, {
      name: "name",
      type: "string",
      defaultValue: "undefined",
      description: "Serializa con hidden input."
    }, {
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "Color del input."
    }],
    notes: ["La semana inicia en lunes.", "El input es de solo lectura; usa name para formularios.", "En between, mientras el rango está incompleto to es null."]
  }]
};
