import { Alert, Badge, Button, EmptyState, Toaster, toast } from "@/lib";

function NotificationsInboxFlow() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-3 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <h3 className="font-semibold">Inbox operativo</h3>
        <Alert
          color="warning"
          variant="outline"
          title="Webhook con retraso"
          description="Se detectó latencia en eventos de facturación."
        />
        <div className="space-y-2">
          {[
            { id: 1, title: "Nuevo signup", kind: "success" },
            { id: 2, title: "Pago rechazado", kind: "danger" },
            { id: 3, title: "Cambio de plan", kind: "info" },
          ].map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-neutral-200 px-3 py-2 dark:border-neutral-800"
            >
              <span className="text-sm">{item.title}</span>
              <Badge size="sm" variant="soft" color={item.kind}>
                nuevo
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <h3 className="font-semibold">Estado vacío + acciones</h3>
        <EmptyState align="center">
          <EmptyState.Title>No hay notificaciones pendientes</EmptyState.Title>
          <EmptyState.Description>
            Cuando llegue algo nuevo aparecerá en este panel.
          </EmptyState.Description>
          <EmptyState.Actions>
            <Button
              size="sm"
              variant="outline"
              color="neutral"
              onClick={() =>
                toast({
                  title: "Inbox sincronizado",
                  description: "No se detectaron nuevos eventos.",
                  kind: "success",
                })
              }
            >
              Refrescar
            </Button>
            <Button size="sm" color="brand">
              Configurar reglas
            </Button>
          </EmptyState.Actions>
        </EmptyState>
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}

export const notificationsInboxFlow = {
  id: "notifications-inbox",
  label: "Notificaciones",
  title: "Inbox de notificaciones de producto",
  description: "Alertas reales, estado vacío y acciones de seguimiento.",
  Component: NotificationsInboxFlow,
};
