/* eslint-disable react-refresh/only-export-components */
import { Alert, Button } from "@/lib";

const ALERT_PREVIEW_CODE = `import { Alert, Button } from "quickit-ui";

export function AlertPreview() {
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
  description:
    "Mensaje persistente en línea para confirmaciones, advertencias o estados que deben seguir visibles dentro del layout.",
  previewCode: ALERT_PREVIEW_CODE,
  preview: <AlertPreviewCanvas />,
  installCode: `import { Alert, Button } from "quickit-ui";`,
  usageCode: `import { Alert, Button } from "quickit-ui";

export function AlertUsage() {
  return (
    <Alert color="info" dismissible>
      <Alert.Title>La verificación del dominio sigue pendiente</Alert.Title>
      <Alert.Description>
        Añade el registro TXT y vuelve a comprobar la configuración cuando termine la propagación DNS.
      </Alert.Description>
      <Alert.Actions>
        <Button size="sm" color="info" variant="outline">Ver guía</Button>
        <Button size="sm" color="info">Comprobar ahora</Button>
      </Alert.Actions>
    </Alert>
  );
}`,
  examples: [
    {
      id: "ejemplos-shorthand",
      title: "Shorthand",
      description:
        "Para confirmaciones simples puedes usar title, description y actions sin escribir los subcomponentes.",
      preview: (
        <Alert
          color="success"
          title="La sincronización terminó correctamente"
          description="Los cambios del equipo ya están disponibles en tu dashboard."
          actions={<Button size="sm" color="success">Ver actividad</Button>}
        />
      ),
    },
    {
      id: "ejemplos-auto-dismiss",
      title: "Auto dismiss",
      description:
        "Útil para confirmaciones breves dentro de una vista, como copiar un enlace o aplicar una acción rápida.",
      preview: (
        <Alert
          color="brand"
          autoDismiss={5000}
          dismissible
          title="El enlace de invitación fue copiado"
          description="Puedes compartirlo ahora con el resto del equipo."
        />
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "color",
          type: "QuickitSemanticColor",
          defaultValue: `"info"`,
          description: "Define la paleta visual principal de la alerta.",
        },
        {
          name: "variant",
          type: `"soft" | "outline" | "solid"`,
          defaultValue: `"soft"`,
          description: "Controla el tratamiento visual del contenedor.",
        },
        {
          name: "dismissible",
          type: "boolean",
          defaultValue: "false",
          description: "Muestra un botón para cerrar la alerta manualmente.",
        },
        {
          name: "autoDismiss",
          type: "number",
          defaultValue: "undefined",
          description: "Cierra automáticamente la alerta después del tiempo indicado en milisegundos.",
        },
        {
          name: "pauseOnHover",
          type: "boolean",
          defaultValue: "true",
          description: "Pausa el auto dismiss mientras el usuario hace hover o foco dentro del contenido.",
        },
        {
          name: "open",
          type: "boolean",
          defaultValue: "undefined",
          description: "Permite controlar la visibilidad desde el componente padre.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          defaultValue: "undefined",
          description: "Se ejecuta cuando la alerta solicita cerrarse.",
        },
        {
          name: "onDismiss",
          type: "(reason: \"manual\" | \"auto\") => void",
          defaultValue: "undefined",
          description: "Informa si el cierre fue manual o automático.",
        },
      ],
      notes: [
        "Alert.Title, Alert.Description y Alert.Actions son la ruta recomendada cuando necesitas layout personalizado.",
        "Si usas children, éstos sustituyen el shorthand title, description y actions.",
      ],
    },
  ],
};
