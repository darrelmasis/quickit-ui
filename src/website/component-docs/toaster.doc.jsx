/* eslint-disable react-refresh/only-export-components */
import { Button, toast } from "@/lib";
const TOASTER_PREVIEW_CODE = `import { Button, Toaster, toast } from "quickit-ui";

export function ToasterPreview() {
  return (
    <>
      <Button
        onClick={() =>
          toast({
            title: "Notificación enviada",
            description: "Se actualizó el estado del proyecto.",
          })
        }
      >
        Mostrar toast
      </Button>
      <Toaster />
    </>
  );
}`;
function ToasterPreviewCanvas() {
  return <div className="flex flex-col items-start gap-4">
      <Button color="neutral" onClick={() => toast({
      title: "Notificación enviada",
      description: "Se actualizó el estado del proyecto."
    })}>
        Mostrar toast
      </Button>
    </div>;
}
export const toasterDoc = {
  name: "Toaster",
  description: "Contenedor de toasts con portal; usa la API imperativa `toast()` y `dismiss()`.",
  previewCode: TOASTER_PREVIEW_CODE,
  preview: <ToasterPreviewCanvas />,
  installCode: `import { Toaster, toast, dismiss } from "quickit-ui";`,
  usageCode: `import { Button, Toaster, toast, dismiss } from "quickit-ui";

export function ToasterUsage() {
  return (
    <>
      <Button onClick={() => toast("Guardado correctamente")}>
        Mostrar toast
      </Button>
      <Toaster position="bottom-right" />
    </>
  );
}`,
  examples: [{
    id: "ejemplos-action",
    title: "Con acción",
    description: "Incluye un CTA para deshacer o confirmar.",
    preview: <Button size="sm" variant="outline" onClick={() => toast({
      title: "Proyecto eliminado",
      description: "Puedes restaurarlo desde historial.",
      action: {
        label: "Deshacer",
        onClick: () => {}
      }
    })}>
          Mostrar con acción
        </Button>
  }, {
    id: "ejemplos-kind",
    title: "Por tipo (`kind`)",
    description: "Valores: `default`, `loading`, `success`, `error`. Hay icono integrado en `loading`, `success` y `error`; `default` no. No existe `info`: usa `default` y `icon` si quieres un pictograma.",
    preview: <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => toast({
        title: "Cambios guardados",
        kind: "success"
      })}>
            Success
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast({
        title: "No se pudo conectar",
        description: "Revisa la red e inténtalo de nuevo.",
        kind: "error"
      })}>
            Error
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast({
        title: "Procesando…",
        kind: "loading",
        duration: 0
      })}>
            Loading
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast({
        title: "Aviso",
        description: "Mensaje neutro sin icono por defecto.",
        kind: "default"
      })}>
            Default
          </Button>
        </div>
  }, {
    id: "ejemplos-promise",
    title: "Promesa",
    description: "`toast.promise` muestra estado loading y actualiza a success/error al resolver.",
    preview: <Button size="sm" variant="outline" onClick={() => toast.promise(new Promise(resolve => setTimeout(() => resolve("OK"), 1800)), {
      loading: "Guardando…",
      success: d => ({
        title: "Hecho",
        description: String(d)
      }),
      error: "No se pudo guardar"
    })}>
          Simular guardado
        </Button>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "position",
      type: `"top-left" | "top-right" | "bottom-left" | "bottom-right"`,
      defaultValue: `"bottom-right"`,
      description: "Esquina del viewport. `z-index` base 10000 por encima de modales."
    }, {
      name: "visibleToasts",
      type: "number",
      defaultValue: "3",
      description: "Cuántos toasts se ven en stack colapsado (1–10). El resto queda en cola."
    }, {
      name: "gap",
      type: "number | { collapsed?, expanded? }",
      defaultValue: "12 / 96 px",
      description: "Separación vertical entre tarjetas; un número ajusta colapsado y deriva el expandido."
    }, {
      name: "expandOnHover",
      type: "boolean",
      defaultValue: "true",
      description: "Al hover/foco: más separación entre los mismos toasts y pausa del auto-cierre. No muestra más de `visibleToasts`; la cola ocupa el hueco al cerrar o expirar."
    }, {
      name: "showCloseButton",
      type: "boolean",
      defaultValue: "true",
      description: "Muestra el botón de cerrar en cada toast."
    }, {
      name: "defaultIcon",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Icono por defecto para toasts sin `icon` y `kind` default."
    }, {
      name: "icons",
      type: "ToasterKindIcons",
      defaultValue: "undefined",
      description: "Iconos por `kind`: `default`, `loading`, `success`, `error` (no hay clave `info`). Sustituyen los del tema."
    }, {
      name: "toastClassName",
      type: "string",
      defaultValue: "undefined",
      description: "Clases Tailwind extra en la superficie de cada toast."
    }],
    notes: ["`toast` acepta string u objeto con title, description, action, duration, icon y kind.", "`kind`: `default` | `loading` | `success` | `error`. Iconos del paquete para `loading` (spinner), `success` y `error`. `default` no incluye icono salvo que pases `icon` o configures `defaultIcon` / `icons` en `<Toaster />`. No hay `kind: \"info\"`; para informativos usa `default` con `icon` propio.", "`toast.promise(promise, { loading, success, error })` — success/error pueden ser string, objeto o función.", "`duration: 0` deja el toast hasta cerrar manual o hasta un `update` (p. ej. al terminar la promesa). Sin `duration` en `toast(\"texto\")`, el auto-cierre usa 4000 ms por defecto; `toast.promise` usa 0 en loading, 4000 en success y 5000 en error.", "Para cerrar todo: `dismiss()` sin id. Auto-cierre pausado con hover/foco en el área del Toaster.", "En pantalla hay como máximo `visibleToasts` (3 por defecto): el resto espera en cola y aparece cuando uno visible se cierra o caduca.", "Tope de cola: `MAX_QUEUED_TOASTS` (25).", "Exportaciones útiles: `dismiss`, `MAX_VISIBLE_TOASTS` y `MAX_QUEUED_TOASTS` desde `quickit-ui`."]
  }]
};
