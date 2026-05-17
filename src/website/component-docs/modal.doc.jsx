/* eslint-disable react-refresh/only-export-components */
import { Modal } from "@/lib";
const MODAL_PREVIEW_CODE = `import { Modal } from "quickit-ui";

export function ModalPreview() {
  return (
    <Modal>
      <Modal.Trigger>Eliminar</Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Eliminar proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta acción no se puede deshacer.</Modal.Body>
        <Modal.Actions>
          <Modal.Action variant="outline">Cancelar</Modal.Action>
          <Modal.Action color="danger">Eliminar</Modal.Action>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
}`;
function ModalPreviewCanvas() {
  return <Modal>
      <Modal.Trigger>Eliminar</Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Eliminar proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta acción no se puede deshacer.</Modal.Body>
        <Modal.Actions>
          <Modal.Action variant="outline">Cancelar</Modal.Action>
          <Modal.Action color="danger">Eliminar</Modal.Action>
        </Modal.Actions>
      </Modal.Content>
    </Modal>;
}
export const modalDoc = {
  name: "Modal",
  description: "Overlay con trigger, contenido y acciones compuestas.",
  previewCode: MODAL_PREVIEW_CODE,
  preview: <ModalPreviewCanvas />,
  installCode: `import { Modal } from "quickit-ui";`,
  usageCode: `import { Modal } from "quickit-ui";

export function ModalUsage() {
  return (
    <Modal>
      <Modal.Trigger>Eliminar</Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Eliminar proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta acción no se puede deshacer.</Modal.Body>
        <Modal.Actions>
          <Modal.Action variant="outline">Cancelar</Modal.Action>
          <Modal.Action color="danger">Eliminar</Modal.Action>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
}`,
  examples: [{
    id: "ejemplos-actions",
    title: "Acciones",
    description: "Modal.Action hereda props de Button.",
    preview: <Modal>
          <Modal.Trigger>Confirmar</Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Confirmar</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Deseas continuar?</Modal.Body>
            <Modal.Actions placement="end">
              <Modal.Action variant="outline">Cancelar</Modal.Action>
              <Modal.Action color="brand">Continuar</Modal.Action>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Estado inicial."
    }, {
      name: "open",
      type: "boolean",
      defaultValue: "undefined",
      description: "Controla el modal."
    }, {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "undefined",
      description: "Callback de apertura."
    }, {
      name: "closeOnEscape",
      type: "boolean",
      defaultValue: "true",
      description: "Permite cerrar el modal con Escape cuando es el overlay superior."
    }, {
      name: "blockingOverlay",
      type: "boolean",
      defaultValue: "true",
      description: "Si es false, el backdrop no bloquea clics bajo el overlay."
    }, {
      name: "outsideClick",
      type: "boolean",
      defaultValue: "true",
      description: "Cierra al click fuera."
    }, {
      name: "showCloseButton",
      type: "boolean",
      defaultValue: "true",
      description: "Muestra el botón de cierre en Modal.Header."
    }, {
      name: "maxWidth",
      type: "string",
      defaultValue: `"max-w-md"`,
      description: "Ancho máximo del panel (clase Tailwind)."
    }, {
      name: "onBeforeClose",
      type: "() => boolean | Promise<boolean>",
      defaultValue: "undefined",
      description: "Hook antes de cerrar (retorna false para cancelar)."
    }, {
      name: "zIndex",
      type: "number",
      defaultValue: "undefined",
      description: "Controla el stacking (auto si no se define)."
    }],
    notes: ["Modal.Action hereda props de Button y acepta closeOnClick.", "Si el handler de `Modal.Action` hace `event.preventDefault()`, el modal no se cierra aunque `closeOnClick` siga en true.", "Usa `blockingOverlay={false}` solo cuando realmente quieras permitir interacción con el fondo; para confirmaciones y formularios suele convenir mantener el patrón modal clásico."]
  }]
};
