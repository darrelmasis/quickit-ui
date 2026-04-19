/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { TimePicker } from "@/lib";

function TimePickerPreviewCanvas() {
  const [value, setValue] = useState("09:30");

  return (
    <div className="w-full max-w-xl space-y-4">
      <TimePicker value={value} onChange={setValue} />
      <TimePicker
        hourCycle="24h"
        minuteStep={15}
        defaultValue="14:00"
        minTime="08:00"
        maxTime="18:00"
        placeholder="Hora de soporte"
      />
    </div>
  );
}

export const timePickerDoc = {
  name: "TimePicker",
  description:
    "Selector de hora con popover, listas de horas y minutos, soporte controlado y valor normalizado `HH:mm`.",
  previewCode: `import { useState } from "react";
import { TimePicker } from "quickit-ui";

export function TimePickerPreview() {
  const [value, setValue] = useState("09:30");

  return (
    <div className="space-y-4">
      <TimePicker value={value} onChange={setValue} />
      <TimePicker
        hourCycle="24h"
        minuteStep={15}
        defaultValue="14:00"
        minTime="08:00"
        maxTime="18:00"
        placeholder="Hora de soporte"
      />
    </div>
  );
}`,
  preview: <TimePickerPreviewCanvas />,
  installCode: `import { TimePicker } from "quickit-ui";`,
  usageCode: `import { useState } from "react";
import { TimePicker } from "quickit-ui";

export function TimePickerUsage() {
  const [meetingTime, setMeetingTime] = useState("13:30");

  return (
    <TimePicker
      value={meetingTime}
      onChange={setMeetingTime}
      minuteStep={15}
      minTime="09:00"
      maxTime="18:00"
      name="meetingTime"
    />
  );
}`,
  examples: [
    {
      id: "ejemplos-formato",
      title: "12h y 24h",
      description:
        "Usa `hourCycle` para decidir si la interfaz muestra AM/PM o una cuadrícula de 24 horas.",
      preview: (
        <div className="w-full max-w-xl space-y-4">
          <TimePicker defaultValue="09:30" />
          <TimePicker
            hourCycle="24h"
            defaultValue="17:45"
            minuteStep={15}
          />
        </div>
      ),
    },
    {
      id: "ejemplos-rango",
      title: "Horario disponible",
      description:
        "Puedes limitar las opciones visibles con `minTime` y `maxTime` para agendas, soporte o ventanas de entrega.",
      preview: (
        <div className="w-full max-w-xl">
          <TimePicker
            hourCycle="24h"
            minuteStep={30}
            minTime="08:00"
            maxTime="17:30"
            defaultValue="10:30"
            placeholder="Selecciona un horario"
          />
        </div>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "value / defaultValue",
          type: "Date | string | number | null",
          defaultValue: "undefined",
          description:
            "Acepta fechas o strings y normaliza internamente el resultado a `HH:mm`.",
        },
        {
          name: "onChange",
          type: "(value: string | null) => void",
          defaultValue: "undefined",
          description:
            "Devuelve la hora normalizada como `HH:mm`. Si limpias el campo, devuelve `null`.",
        },
        {
          name: "hourCycle",
          type: `"12h" | "24h"`,
          defaultValue: `"12h"`,
          description:
            "Controla si el picker usa AM/PM o una cuadrícula completa de 24 horas.",
        },
        {
          name: "minuteStep",
          type: "number",
          defaultValue: "5",
          description:
            "Define el intervalo de minutos disponible en la columna de selección.",
        },
        {
          name: "minTime / maxTime",
          type: "Date | string | number",
          defaultValue: "undefined",
          description:
            "Restringe la selección a una ventana de horas permitida.",
        },
        {
          name: "clearButton",
          type: "boolean",
          defaultValue: "true",
          description:
            "Muestra un botón para limpiar la hora actual cuando ya existe un valor.",
        },
      ],
      notes: [
        "Si pasas `name`, el componente renderiza un input hidden con el valor normalizado para formularios HTML.",
      ],
    },
  ],
};
