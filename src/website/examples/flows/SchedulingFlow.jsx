import { Badge, Button, DatePicker, EmptyState, Range, TimePicker } from "@/lib";
import { CopyIcon } from "@/lib/assets/icons";
import { useState } from "react";

export function SchedulingFlow() {
  const [duration, setDuration] = useState(45);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
      <div className="space-y-3 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <h3 className="font-semibold">Programación de lanzamiento</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <DatePicker placeholder="Fecha de ejecución" />
          <TimePicker placeholder="Hora de inicio" minuteStep={15} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Duración (minutos)</p>
            <Badge variant="soft" color="brand">
              {duration} min
            </Badge>
          </div>
          <Range value={duration} min={15} max={120} step={15} onValueChange={setDuration} />
        </div>
        <Button color="brand">Reservar ventana</Button>
      </div>

      <div className="space-y-3 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <h3 className="font-semibold">Disponibilidad</h3>
        <EmptyState align="center">
          <EmptyState.Icon>
            <CopyIcon className="size-5" />
          </EmptyState.Icon>
          <EmptyState.Title>Sin slots disponibles hoy</EmptyState.Title>
          <EmptyState.Description>
            Intenta mañana o amplía la ventana.
          </EmptyState.Description>
          <EmptyState.Actions>
            <Button size="sm" variant="outline" color="neutral">
              Ver semana completa
            </Button>
          </EmptyState.Actions>
        </EmptyState>
      </div>
    </div>
  );
}
