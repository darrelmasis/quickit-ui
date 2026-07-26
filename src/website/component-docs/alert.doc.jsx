/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { Alert, Button } from "@/lib";
import { CheckFillIcon, CloseIcon } from "@/lib/assets/icons";

const ALERT_PREVIEW_CODE = `import { Alert, Button } from "quickit-ui";

export function AlertPreview() {
  return (
    <Alert color="warning" dismissible>
      <Alert.Title>Tu método de pago vence pronto</Alert.Title>
      <Alert.Description>
        Actualiza la tarjeta antes del 24 de abril.
      </Alert.Description>
      <Alert.Actions>
        <Button size="sm" color="warning" variant="outline">Después</Button>
        <Button size="sm" color="warning">Actualizar tarjeta</Button>
      </Alert.Actions>
    </Alert>
  );
}`;

function AlertPreviewCanvas() {
  return (
    <Alert color="warning" dismissible>
      <Alert.Title>Tu método de pago vence pronto</Alert.Title>
      <Alert.Description>
        Actualiza la tarjeta antes del 24 de abril para evitar interrupciones en tu plan.
      </Alert.Description>
      <Alert.Actions>
        <Button size="sm" color="warning" variant="outline">Después</Button>
        <Button size="sm" color="warning">Actualizar tarjeta</Button>
      </Alert.Actions>
    </Alert>
  );
}

function AlertAutoDismissCanvas() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setOpen(true)}>
        Copiar enlace
      </Button>
      <Alert
        color="info"
        autoDismiss={4000}
        dismissible
        open={open}
        onOpenChange={setOpen}
        title="Enlace copiado"
        description="Puedes compartirlo con el equipo."
      />
    </div>
  );
}

export const alertDoc = {
  name: "Alert",
  description: "Mensaje persistente en línea para confirmaciones, advertencias o estados.",
  previewCode: ALERT_PREVIEW_CODE,
  preview: <AlertPreviewCanvas />,
  installCode: `import { Alert, Button } from "quickit-ui";`,
  examples: [
    {
      id: "ejemplos-notificacion",
      title: "Notificación de éxito",
      description: "Alert success con cierre manual.",
      preview: (
        <Alert color="success" dismissible>
          <Alert.Title>¡Cambios guardados!</Alert.Title>
          <Alert.Description>
            Tu perfil se actualizó correctamente. Los cambios ya están visibles para otros usuarios.
          </Alert.Description>
        </Alert>
      ),
      code: `import { Alert } from "quickit-ui";

export function AlertNotificacion() {
  return (
    <Alert color="success" dismissible>
      <Alert.Title>¡Cambios guardados!</Alert.Title>
      <Alert.Description>
        Tu perfil se actualizó correctamente. Los cambios ya están visibles para otros usuarios.
      </Alert.Description>
    </Alert>
  );
}`
    },
    {
      id: "ejemplos-error",
      title: "Error de conexión",
      description: "Alert danger con acciones.",
      preview: (
        <Alert color="danger">
          <Alert.Title>Error de conexión</Alert.Title>
          <Alert.Description>
            No se pudo conectar con el servidor. Verifica tu conexión a internet e intenta nuevamente.
          </Alert.Description>
          <Alert.Actions>
            <Button size="sm" color="danger" variant="outline">Cerrar</Button>
            <Button size="sm" color="danger">Reintentar</Button>
          </Alert.Actions>
        </Alert>
      ),
      code: `import { Alert, Button } from "quickit-ui";

export function AlertError() {
  return (
    <Alert color="danger">
      <Alert.Title>Error de conexión</Alert.Title>
      <Alert.Description>
        No se pudo conectar con el servidor. Verifica tu conexión a internet e intenta nuevamente.
      </Alert.Description>
      <Alert.Actions>
        <Button size="sm" color="danger" variant="outline">Cerrar</Button>
        <Button size="sm" color="danger">Reintentar</Button>
      </Alert.Actions>
    </Alert>
  );
}`
    },
    {
      id: "ejemplos-icon",
      title: "Icono personalizado",
      description: "Alert con icono decorativo al inicio.",
      preview: (
        <div className="flex flex-col gap-3">
          <Alert
            color="success"
            icon={<CheckFillIcon />}
            title="Operación exitosa"
            description="Los datos se guardaron correctamente."
          />
          <Alert
            color="danger"
            icon={<CloseIcon />}
            title="Error"
            description="No se pudo completar la operación."
          />
        </div>
      ),
      code: `import { Alert } from "quickit-ui";
import { CheckFillIcon, CloseIcon } from "quickit-ui/assets/icons";

export function AlertIcono() {
  return (
    <div className="flex flex-col gap-3">
      <Alert
        color="success"
        icon={<CheckFillIcon />}
        title="Operación exitosa"
        description="Los datos se guardaron correctamente."
      />
      <Alert
        color="danger"
        icon={<CloseIcon />}
        title="Error"
        description="No se pudo completar la operación."
      />
    </div>
  );
}`
    },
    {
      id: "ejemplos-auto-dismiss",
      title: "Auto dismiss",
      description: "Presiona el botón para mostrar el alert. Se cierra solo a los 4 segundos.",
      preview: <AlertAutoDismissCanvas />,
      code: `import { useState } from "react";
import { Alert, Button } from "quickit-ui";

export function AlertAutoDismiss() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setOpen(true)}>
        Copiar enlace
      </Button>
      <Alert
        color="info"
        autoDismiss={4000}
        dismissible
        open={open}
        onOpenChange={setOpen}
        title="Enlace copiado"
        description="Puedes compartirlo con el equipo."
      />
    </div>
  );
}`
    },
    {
      id: "ejemplos-colores",
      title: "Colores",
      description: "Variantes: neutral, info, success, danger, warning.",
      preview: (
        <div className="flex flex-col gap-3">
          <Alert color="neutral" title="Neutral" description="Mensaje neutro por defecto." />
          <Alert color="info" title="Información" description="Este es un mensaje informativo." />
          <Alert color="success" title="Éxito" description="Operación completada correctamente." />
          <Alert color="danger" title="Error" description="No se pudo completar la operación." />
          <Alert color="warning" title="Advertencia" description="Revisa los datos antes de continuar." />
        </div>
      ),
      code: `import { Alert } from "quickit-ui";

export function AlertColores() {
  return (
    <div className="flex flex-col gap-3">
      <Alert color="neutral" title="Neutral" description="Mensaje neutro por defecto." />
      <Alert color="info" title="Información" description="Este es un mensaje informativo." />
      <Alert color="success" title="Éxito" description="Operación completada correctamente." />
      <Alert color="danger" title="Error" description="No se pudo completar la operación." />
      <Alert color="warning" title="Advertencia" description="Revisa los datos antes de continuar." />
    </div>
  );
}`
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "color", type: `"neutral" | "info" | "success" | "danger" | "warning"`, defaultValue: `"neutral"`, description: "Define la paleta visual."
        },
        {
          name: "variant", type: `"soft" | "outline"`, defaultValue: `"soft"`, description: "Tratamiento visual del contenedor."
        },
        {
          name: "title", type: "ReactNode", defaultValue: "undefined", description: "Título del alert."
        },
        {
          name: "description", type: "ReactNode", defaultValue: "undefined", description: "Descripción del alert."
        },
        {
          name: "icon", type: "ReactNode", defaultValue: "undefined", description: "Icono decorativo al inicio del alert."
        },
        {
          name: "actions", type: "ReactNode", defaultValue: "undefined", description: "Acciones o botones del alert."
        },
        {
          name: "children", type: "ReactNode", defaultValue: "undefined", description: "Contenido custom. Reemplaza title, description y actions."
        },
        {
          name: "dismissible", type: "boolean", defaultValue: "false", description: "Muestra botón para cerrar."
        },
        {
          name: "dismissLabel", type: "string", defaultValue: `"Cerrar"`, description: "Label accesible del botón de cierre."
        },
        {
          name: "autoDismiss", type: "number", defaultValue: "undefined", description: "Cierra automáticamente tras N ms."
        },
        {
          name: "pauseOnHover", type: "boolean", defaultValue: "true", description: "Pausa auto dismiss al hacer hover."
        },
        {
          name: "defaultOpen", type: "boolean", defaultValue: "true", description: "Estado inicial de visibilidad (no controlado)."
        },
        {
          name: "open", type: "boolean", defaultValue: "undefined", description: "Controla la visibilidad (controlado)."
        },
        {
          name: "role", type: `"alert" | "status"`, defaultValue: `"status"`, description: "Rol ARIA del contenedor. Usa alert para danger/warning."
        },
        {
          name: "aria-live", type: `"polite" | "assertive"`, defaultValue: `"polite"`, description: "Nivel de anuncio para lectores de pantalla. Usa assertive para danger/warning."
        },
        {
          name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "undefined", description: "Callback al cambiar visibilidad."
        },
        {
          name: "onDismiss", type: "(reason: string) => void", defaultValue: "undefined", description: "Callback al cerrar. El reason es 'manual' o 'auto'."
        },
      ],
      notes: [
        "Alert.Title, Alert.Description y Alert.Actions son la ruta compuesta recomendada.",
        "No mezcles children con title, description y actions.",
        "El icono es puramente decorativo; no afecta la semántica ARIA.",
        "El rol por defecto es status para la mayoría de colores, y alert para danger/warning.",
      ],
    },
  ],
};
