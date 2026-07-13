/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { TimePicker } from "@/lib";
function TimePickerPreviewCanvas() {
  const [value, setValue] = useState("09:30");
  return <div className="w-full max-w-xl flex flex-col gap-4">
      <TimePicker value={value} onChange={setValue} />
      <TimePicker hourCycle="24h" minuteStep={15} defaultValue="14:00" minTime="08:00" maxTime="18:00" placeholder="Hora de soporte" />
    </div>;
}
export const timePickerDoc = {
  name: "TimePicker",
  description: "Selector de hora con popover y valor normalizado HH:mm.",
  previewCode: `import { useState } from "react";
import { TimePicker } from "quickit-ui";

export function TimePickerPreview() {
  const [value, setValue] = useState("09:30");
  return (
    <div className="flex flex-col gap-4">
      <TimePicker value={value} onChange={setValue} />
      <TimePicker hourCycle="24h" minuteStep={15} defaultValue="14:00" minTime="08:00" maxTime="18:00" placeholder="Hora de soporte" />
    </div>
  );
}`,
  preview: <TimePickerPreviewCanvas />,
  installCode: `import { TimePicker } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-formato",
    title: "12h y 24h",
    description: "Usa hourCycle para AM/PM o cuadrícula de 24 horas.",
    preview: <div className="w-full max-w-xl flex flex-col gap-4">
          <TimePicker defaultValue="09:30" />
          <TimePicker hourCycle="24h" defaultValue="17:45" minuteStep={15} />
        </div>,
    code: `import { TimePicker } from "quickit-ui";

export function TimePickerFormato() {
  return (
    <div className="flex flex-col gap-4">
      <TimePicker defaultValue="09:30" />
      <TimePicker hourCycle="24h" defaultValue="17:45" minuteStep={15} />
    </div>
  );
}`
  }, {
    id: "ejemplos-rango",
    title: "Horario disponible",
    description: "Limita opciones con minTime y maxTime.",
    preview: <div className="w-full max-w-xl">
          <TimePicker hourCycle="24h" minuteStep={30} minTime="08:00" maxTime="17:30" defaultValue="10:30" placeholder="Selecciona un horario" />
        </div>,
    code: `import { TimePicker } from "quickit-ui";

export function TimePickerRango() {
  return (
    <TimePicker hourCycle="24h" minuteStep={30} minTime="08:00" maxTime="17:30" defaultValue="10:30" placeholder="Selecciona un horario" />
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "value / defaultValue",
      type: "Date | string | number | null",
      defaultValue: "undefined",
      description: "Acepta fechas o strings, normaliza a HH:mm."
    }, {
      name: "onChange",
      type: "(value: string | null) => void",
      defaultValue: "undefined",
      description: "Devuelve hora como HH:mm o null si se limpia."
    }, {
      name: "hourCycle",
      type: `"12h" | "24h"`,
      defaultValue: `"12h"`,
      description: "12h (AM/PM) o 24h."
    }, {
      name: "minuteStep",
      type: "number",
      defaultValue: "5",
      description: "Intervalo de minutos."
    }, {
      name: "minTime / maxTime",
      type: "Date | string | number",
      defaultValue: "undefined",
      description: "Ventana horaria permitida."
    }, {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      defaultValue: `"md"`,
      description: "Tamaño del campo."
    }, {
      name: "color",
      type: `"primary" | "secondary" | "neutral" | "success" | "warning" | "danger" | "info" | "light" | "dark"`,
      defaultValue: `"neutral"`,
      description: "Color del campo."
    }, {
      name: "name",
      type: "string",
      defaultValue: "undefined",
      description: "Serializa con hidden input."
    }],
    notes: ["El input es de solo lectura; usa popover + listas.", "Si limpias el valor, onChange recibe null."]
  }]
};
