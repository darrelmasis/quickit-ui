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
    id: "ejemplos-confirmacion",
    title: "Diálogo de confirmación",
    description: "Ejemplo realista de diálogo de confirmación de eliminación.",
    preview: <Modal>
          <Modal.Trigger>Eliminar cuenta</Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>¿Eliminar tu cuenta?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Esta acción eliminará permanentemente tu cuenta y todos los datos asociados. 
                Esta acción no se puede deshacer.
              </p>
            </Modal.Body>
            <Modal.Actions>
              <Modal.Action variant="outline">Cancelar</Modal.Action>
              <Modal.Action color="danger">Eliminar cuenta</Modal.Action>
            </Modal.Actions>
          </Modal.Content>
        </Modal>,
    code: `import { Modal } from "quickit-ui";

export function ModalConfirmacion() {
  return (
    <Modal>
      <Modal.Trigger>Eliminar cuenta</Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>¿Eliminar tu cuenta?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Esta acción eliminará permanentemente tu cuenta y todos los datos asociados. 
            Esta acción no se puede deshacer.
          </p>
        </Modal.Body>
        <Modal.Actions>
          <Modal.Action variant="outline">Cancelar</Modal.Action>
          <Modal.Action color="danger">Eliminar cuenta</Modal.Action>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
}`
  }, {
    id: "ejemplos-formulario",
    title: "Formulario en modal",
    description: "Ejemplo realista de formulario de edición en modal.",
    preview: <Modal>
          <Modal.Trigger>Editar perfil</Modal.Trigger>
          <Modal.Content maxWidth="max-w-lg">
            <Modal.Header>
              <Modal.Title>Editar perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Nombre completo</label>
                  <input type="text" defaultValue="Juan Pérez" className="rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Email</label>
                  <input type="email" defaultValue="juan@ejemplo.com" className="rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea defaultValue="Desarrollador web apasionado por React" className="rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100" rows={3} />
                </div>
              </div>
            </Modal.Body>
            <Modal.Actions>
              <Modal.Action variant="outline">Cancelar</Modal.Action>
              <Modal.Action color="primary">Guardar cambios</Modal.Action>
            </Modal.Actions>
          </Modal.Content>
        </Modal>,
    code: `import { Modal } from "quickit-ui";

export function ModalFormulario() {
  return (
    <Modal>
      <Modal.Trigger>Editar perfil</Modal.Trigger>
      <Modal.Content maxWidth="max-w-lg">
        <Modal.Header>
          <Modal.Title>Editar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Nombre completo</label>
              <input type="text" defaultValue="Juan Pérez" className="rounded-lg border px-3 py-2 text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Email</label>
              <input type="email" defaultValue="juan@ejemplo.com" className="rounded-lg border px-3 py-2 text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Bio</label>
              <textarea defaultValue="Desarrollador web apasionado por React" className="rounded-lg border px-3 py-2 text-sm" rows={3} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Actions>
          <Modal.Action variant="outline">Cancelar</Modal.Action>
          <Modal.Action color="primary">Guardar cambios</Modal.Action>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
}`
  }, {
    id: "ejemplos-informacion",
    title: "Modal informativo",
    description: "Ejemplo realista de modal con información importante.",
    preview: <Modal>
          <Modal.Trigger>Ver detalles</Modal.Trigger>
          <Modal.Content maxWidth="max-w-2xl">
            <Modal.Header>
              <Modal.Title>Detalles del pedido #12345</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between border-b border-neutral-200 pb-3 dark:border-neutral-700">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Estado</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">Entregado</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-3 dark:border-neutral-700">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Fecha</span>
                  <span className="text-sm font-medium">15 de enero, 2024</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-3 dark:border-neutral-700">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Total</span>
                  <span className="text-sm font-medium">$1,250.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Método de pago</span>
                  <span className="text-sm font-medium">Tarjeta de crédito</span>
                </div>
              </div>
            </Modal.Body>
            <Modal.Actions>
              <Modal.Action color="primary">Cerrar</Modal.Action>
            </Modal.Actions>
          </Modal.Content>
        </Modal>,
    code: `import { Modal } from "quickit-ui";

export function ModalInformacion() {
  return (
    <Modal>
      <Modal.Trigger>Ver detalles</Modal.Trigger>
      <Modal.Content maxWidth="max-w-2xl">
        <Modal.Header>
          <Modal.Title>Detalles del pedido #12345</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between border-b border-neutral-200 pb-3 dark:border-neutral-700">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Estado</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Entregado</span>
            </div>
            <div className="flex justify-between border-b border-neutral-200 pb-3 dark:border-neutral-700">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Fecha</span>
              <span className="text-sm font-medium">15 de enero, 2024</span>
            </div>
            <div className="flex justify-between border-b border-neutral-200 pb-3 dark:border-neutral-700">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Total</span>
              <span className="text-sm font-medium">$1,250.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Método de pago</span>
              <span className="text-sm font-medium">Tarjeta de crédito</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Actions>
          <Modal.Action color="primary">Cerrar</Modal.Action>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
}`
  }, {
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
      name: "color",
      type: `"primary" | "secondary" | "neutral" | "success" | "warning" | "danger" | "info" | "light" | "dark"`,
      defaultValue: `"neutral"`,
      description: "Color del modal."
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
