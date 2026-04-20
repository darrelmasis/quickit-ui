import { Button, CommandPalette, Toaster, Tooltip, toast } from "@/lib";
import { useState } from "react";

function CommandCenterFlow() {
  const [openPalette, setOpenPalette] = useState(false);

  return (
    <div className="space-y-4 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
      <h3 className="font-semibold">Command center</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Acciones rápidas para equipos que trabajan con teclado y workflows largos.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button color="brand" onClick={() => setOpenPalette(true)}>
          Abrir paleta
        </Button>
        <Tooltip content="Notifica al usuario con feedback inmediato">
          <Button
            variant="outline"
            color="neutral"
            onClick={() =>
              toast({
                title: "Deploy programado",
                description: "La ejecución inicia en 5 minutos.",
                kind: "success",
              })
            }
          >
            Lanzar toast
          </Button>
        </Tooltip>
      </div>
      <CommandPalette
        open={openPalette}
        onOpenChange={setOpenPalette}
        groups={[
          {
            heading: "Navegación",
            items: [
              { id: "go-dashboard", label: "Ir al dashboard" },
              { id: "go-settings", label: "Ir a settings" },
            ],
          },
          {
            heading: "Acciones",
            items: [
              { id: "run-checks", label: "Ejecutar checks" },
              { id: "open-billing", label: "Abrir billing" },
            ],
          },
        ]}
      />
      <Toaster position="bottom-right" />
    </div>
  );
}

export const commandCenterFlow = {
  id: "command-center",
  label: "Command Center",
  title: "Centro de comandos",
  description: "Paleta de comandos, atajos y feedback de acciones.",
  Component: CommandCenterFlow,
};
