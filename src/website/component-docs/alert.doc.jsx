/* eslint-disable react-refresh/only-export-components */
import { Alert, Button } from "@/lib";
import { QUICKIT_SEMANTIC_COLORS } from "@/lib/tokens";

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

export const alertDoc = {
  name: "Alert",
  description: "Mensaje persistente en línea para confirmaciones, advertencias o estados.",
  previewCode: ALERT_PREVIEW_CODE,
  preview: <AlertPreviewCanvas />,
  installCode: `import { Alert, Button } from "quickit-ui";`,
  examples: [
    {
      id: "ejemplos-colores",
      title: "Colores",
      description: `Colores disponibles: ${QUICKIT_SEMANTIC_COLORS.join(", ")}.`,
      preview: (
        <div className="flex flex-col gap-3">
          <Alert color="info" title="Información" description="Este es un mensaje informativo." />
          <Alert color="success" title="Operación exitosa" description="Los cambios se guardaron correctamente." />
          <Alert color="warning" title="Advertencia" description="Revisa los datos antes de continuar." />
          <Alert color="danger" title="Error" description="No se pudo completar la operación." />
          <Alert color="secondary" title="Acento secundario" description="Este es un mensaje con secondary." />
        </div>
      ),
      code: `import { Alert } from "quickit-ui";

export function AlertColores() {
  return (
    <div className="flex flex-col gap-3">
      <Alert color="info" title="Información" description="Mensaje informativo." />
      <Alert color="success" title="Operación exitosa" description="Cambios guardados." />
      <Alert color="warning" title="Advertencia" description="Revisa los datos." />
      <Alert color="danger" title="Error" description="Operación fallida." />
      <Alert color="secondary" title="Acento secundario" description="Mensaje con secondary." />
    </div>
  );
}`
    },
    {
      id: "ejemplos-shorthand",
      title: "Shorthand",
      description: "Usa title, description y actions sin escribir los subcomponentes.",
      preview: (
        <Alert
          color="success"
          title="La sincronización terminó correctamente"
          description="Los cambios del equipo ya están disponibles en tu dashboard."
          actions={<Button size="sm" color="success">Ver actividad</Button>}
        />
      ),
      code: `import { Alert, Button } from "quickit-ui";

export function AlertShorthand() {
  return (
    <Alert
      color="success"
      title="Sincronización completada"
      description="Los cambios están disponibles."
      actions={<Button size="sm" color="success">Ver actividad</Button>}
    />
  );
}`
    },
    {
      id: "ejemplos-auto-dismiss",
      title: "Auto dismiss",
      description: "Se cierra automáticamente después del tiempo indicado.",
      preview: (
        <Alert
          color="primary"
          autoDismiss={5000}
          dismissible
          title="Enlace copiado"
          description="Puedes compartirlo con el equipo."
        />
      ),
      code: `import { Alert } from "quickit-ui";

export function AlertAutoDismiss() {
  return (
    <Alert
      color="primary"
      autoDismiss={5000}
      dismissible
      title="Enlace copiado"
      description="Puedes compartirlo con el equipo."
    />
  );
}`
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "color", type: "QuickitSemanticColor", defaultValue: `"neutral"`, description: "Define la paleta visual."
        },
        {
          name: "variant", type: `"soft" | "outline" | "solid" | "ghost"`, defaultValue: `"soft"`, description: "Tratamiento visual del contenedor."
        },
        {
          name: "dismissible", type: "boolean", defaultValue: "false", description: "Muestra botón para cerrar."
        },
        {
          name: "autoDismiss", type: "number", defaultValue: "undefined", description: "Cierra automáticamente tras N ms."
        },
        {
          name: "pauseOnHover", type: "boolean", defaultValue: "true", description: "Pausa auto dismiss al hacer hover."
        },
        {
          name: "open", type: "boolean", defaultValue: "undefined", description: "Controla la visibilidad."
        },
        {
          name: "onOpenChange", type: "(open) => void", defaultValue: "undefined", description: "Callback de cambio de visibilidad."
        },
        {
          name: "onDismiss", type: "(reason) => void", defaultValue: "undefined", description: "Informa si el cierre fue manual o auto."
        },
      ],
      notes: [
        "Alert.Title, Alert.Description y Alert.Actions son la ruta compuesta recomendada.",
        "No mezcles children con title, description y actions.",
      ],
    },
  ],
};
