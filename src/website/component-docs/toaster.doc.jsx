/* eslint-disable react-refresh/only-export-components */
import { Button, toast } from "@/lib";
const TOASTER_PREVIEW_CODE = `import { Button, Toaster, toast } from "quickit-ui";

export function ToasterPreview() {
  return (
    <>
      <Button onClick={() => toast({
        title: "Notificación enviada",
        description: "Se actualizó el estado del proyecto.",
      })}>
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
  description: "Contenedor de toasts con portal; usa la API imperativa toast() y dismiss().",
  previewCode: TOASTER_PREVIEW_CODE,
  preview: <ToasterPreviewCanvas />,
  installCode: `import { Toaster, toast, dismiss } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-action",
    title: "Con acción",
    description: "Incluye un CTA para deshacer o confirmar.",
    preview: <Button size="sm" variant="outline" onClick={() => toast({
      title: "Proyecto eliminado",
      description: "Puedes restaurarlo desde historial.",
      action: { label: "Deshacer", onClick: () => {} }
    })}>Mostrar con acción</Button>,
    code: `import { Button, toast } from "quickit-ui";

export function ToasterAction() {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() =>
        toast({
          title: "Proyecto eliminado",
          description: "Puedes restaurarlo desde historial.",
          action: { label: "Deshacer", onClick: () => {} },
        })
      }
    >
      Mostrar con acción
    </Button>
  );
}`
  }, {
    id: "ejemplos-kind",
    title: "Por tipo (kind)",
    description: "Valores: default, loading, success, error.",
    preview: <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Cambios guardados", kind: "success" })}>Success</Button>
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Error de conexión", description: "Revisa la red.", kind: "error" })}>Error</Button>
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Procesando…", kind: "loading", duration: 0 })}>Loading</Button>
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Aviso", description: "Mensaje neutro.", kind: "default" })}>Default</Button>
        </div>,
    code: `import { Button, toast } from "quickit-ui";

export function ToasterKind() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="outline" onClick={() => toast({ title: "Cambios guardados", kind: "success" })}>
        Success
      </Button>
      <Button size="sm" variant="outline" onClick={() => toast({ title: "Error de conexión", description: "Revisa la red.", kind: "error" })}>
        Error
      </Button>
      <Button size="sm" variant="outline" onClick={() => toast({ title: "Procesando…", kind: "loading", duration: 0 })}>
        Loading
      </Button>
      <Button size="sm" variant="outline" onClick={() => toast({ title: "Aviso", description: "Mensaje neutro.", kind: "default" })}>
        Default
      </Button>
    </div>
  );
}`
  }, {
    id: "ejemplos-promise",
    title: "Promesa",
    description: "toast.promise muestra loading y actualiza a success/error.",
    preview: <Button size="sm" variant="outline" onClick={() => toast.promise(new Promise(resolve => setTimeout(() => resolve("OK"), 1800)), {
      loading: "Guardando…",
      success: d => ({ title: "Hecho", description: String(d) }),
      error: "No se pudo guardar"
    })}>Simular guardado</Button>,
    code: `import { Button, toast } from "quickit-ui";

export function ToasterPromise() {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() =>
        toast.promise(
          new Promise((resolve) => setTimeout(() => resolve("OK"), 1800)),
          {
            loading: "Guardando…",
            success: (d) => ({ title: "Hecho", description: String(d) }),
            error: "No se pudo guardar",
          }
        )
      }
    >
      Simular guardado
    </Button>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "position",
      type: `"top-left" | "top-right" | "bottom-left" | "bottom-right"`,
      defaultValue: `"bottom-right"`,
      description: "Esquina del viewport."
    }, {
      name: "visibleToasts",
      type: "number",
      defaultValue: "3",
      description: "Toasts visibles en stack."
    }, {
      name: "expandOnHover",
      type: "boolean",
      defaultValue: "true",
      description: "Expande al hacer hover."
    }, {
      name: "showCloseButton",
      type: "boolean",
      defaultValue: "true",
      description: "Botón de cerrar."
    }, {
      name: "toastClassName",
      type: "string",
      defaultValue: "undefined",
      description: "Clases extra en cada toast."
    }],
    notes: ["Monta una sola instancia de <Toaster /> en el shell.", "toast acepta string u objeto con title, description, action, duration, icon y kind.", "toast.promise(promise, { loading, success, error }).", "dismiss() sin id cierra todo.", "kind: default, loading, success, error (no existe info)."]
  }]
};
