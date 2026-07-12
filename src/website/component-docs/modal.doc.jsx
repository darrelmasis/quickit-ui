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
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Modal con trigger, body y acciones.",
    preview: <Modal>
          <Modal.Trigger>Abrir modal</Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Confirmar</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Deseas continuar?</Modal.Body>
            <Modal.Actions>
              <Modal.Action variant="outline">Cancelar</Modal.Action>
              <Modal.Action color="primary">Continuar</Modal.Action>
            </Modal.Actions>
          </Modal.Content>
        </Modal>,
    code: `import { Modal } from "quickit-ui";

export function ModalBasico() {
  return (
    <Modal>
      <Modal.Trigger>Abrir modal</Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Confirmar</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Deseas continuar?</Modal.Body>
        <Modal.Actions>
          <Modal.Action variant="outline">Cancelar</Modal.Action>
          <Modal.Action color="primary">Continuar</Modal.Action>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
}`
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
      description: "Cerrar con Escape."
    }, {
      name: "outsideClick",
      type: "boolean",
      defaultValue: "true",
      description: "Cierra al click fuera."
    }, {
      name: "showCloseButton",
      type: "boolean",
      defaultValue: "true",
      description: "Botón de cierre en Header."
    }, {
      name: "maxWidth",
      type: "string",
      defaultValue: `"max-w-md"`,
      description: "Ancho máximo del panel."
    }, {
      name: "blockingOverlay",
      type: "boolean",
      defaultValue: "true",
      description: "Si false, el backdrop no bloquea clics."
    }, {
      name: "onBeforeClose",
      type: "() => boolean | Promise<boolean>",
      defaultValue: "undefined",
      description: "Hook antes de cerrar."
    }],
    notes: ["Modal.Action hereda props de Button.", "Modal.Action con closeOnClick cierra el modal al hacer clic."]
  }]
};
