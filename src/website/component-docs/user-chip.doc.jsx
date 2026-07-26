/* eslint-disable react-refresh/only-export-components */
import { Avatar, AvatarFallback, AvatarImage, UserChip } from "@/lib";

const USER_CHIP_PREVIEW_CODE = `import { UserChip } from "quickit-ui";

export function UserChipPreview() {
  return (
    <UserChip
      name="Elena Ruiz"
      src="/avatar.jpg"
      initials="ER"
      details={{ role: "Design Lead", email: "elena@ejemplo.com", username: "elena" }}
      presence="online"
    />
  );
}`;

function UserChipPreviewCanvas() {
  return <UserChip
      name="Elena Ruiz"
      src="https://i.pravatar.cc/120?img=11"
      initials="ER"
      details={{ role: "Design Lead", email: "elena@ejemplo.com", username: "elena" }}
      presence="online"
    />;
}

export const userChipDoc = {
  name: "UserChip",
  description: "Chip de usuario con avatar, nombre y presencia.",
  previewCode: USER_CHIP_PREVIEW_CODE,
  preview: <UserChipPreviewCanvas />,
  installCode: `import { UserChip } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "UserChip con iniciales, nombre y descripción.",
    preview: <div className="flex flex-col gap-3">
        <UserChip
          name="Elena Ruiz"
          src="https://i.pravatar.cc/120?img=11"
          initials="ER"
          details={{ role: "Design Lead", email: "elena@ejemplo.com", username: "elena" }}
          presence="online"
        />
        <UserChip
          name="Juan Martínez"
          src="https://i.pravatar.cc/120?img=22"
          initials="JM"
          details={{ role: "Diseñador UI", email: "juan@ejemplo.com" }}
        />
      </div>,
    code: `import { UserChip } from "quickit-ui";

export function UserChipBasico() {
  return (
    <div className="flex flex-col gap-3">
      <UserChip
        name="Elena Ruiz"
        src="/avatar-1.jpg"
        initials="ER"
        details={{ role: "Design Lead", email: "elena@ejemplo.com", username: "elena" }}
        presence="online"
      />
      <UserChip
        name="Juan Martínez"
        src="/avatar-2.jpg"
        initials="JM"
        details={{ role: "Diseñador UI", email: "juan@ejemplo.com" }}
      />
    </div>
  );
}`
  }, {
    id: "ejemplos-con-imagen",
    title: "Con imagen",
    description: "UserChip con avatar en lugar de iniciales.",
    preview: <div className="flex flex-col gap-3">
        <UserChip
          name="Elena Ruiz"
          src="https://i.pravatar.cc/120?img=11"
          initials="ER"
          description="Desarrolladora"
        />
      </div>,
    code: `import { UserChip } from "quickit-ui";

export function UserChipConImagen() {
  return (
    <div className="flex flex-col gap-3">
      <UserChip
        name="Elena Ruiz"
        src="/avatar.jpg"
        initials="ER"
        description="Desarrolladora"
      />
    </div>
  );
}`
  }, {
    id: "ejemplos-enlace",
    title: "Como enlace",
    description: "UserChip con href para navegación.",
    preview: <div className="flex flex-col gap-3">
        <UserChip
          name="Elena Ruiz"
          src="https://i.pravatar.cc/120?img=11"
          initials="ER"
          details={{ username: "elena" }}
          href="#"
        />
      </div>,
    code: `import { UserChip } from "quickit-ui";

export function UserChipEnlace() {
  return (
    <div className="flex flex-col gap-3">
      <UserChip
        name="Elena Ruiz"
        src="/avatar.jpg"
        initials="ER"
        details={{ username: "elena" }}
        href="#"
      />
    </div>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "name",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Nombre del usuario."
    }, {
      name: "details",
      type: "{ role?, email?, username? }",
      defaultValue: "undefined",
      description: "Detalles enriquecidos: role, email y/o username."
    }, {
      name: "description",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Descripción simple (se usa si no hay `details`)."
    }, {
      name: "src",
      type: "string",
      defaultValue: "undefined",
      description: "URL de la foto del avatar."
    }, {
      name: "initials",
      type: "string",
      defaultValue: "undefined",
      description: "Iniciales de respaldo cuando src no carga."
    }, {
      name: "presence",
      type: "QuickitPresenceStatus",
      defaultValue: "undefined",
      description: "Estado de presencia (online, away, busy, offline)."
    }, {
      name: "trailing",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Elemento al final (badge, icono, etc.)."
    }, {
      name: "href",
      type: "string",
      defaultValue: "undefined",
      description: "Convierte el chip en un enlace."
    }, {
      name: "size",
      type: `"sm" | "md" | "lg" | "xl" | "2xl"`,
      defaultValue: `"md"`,
      description: "Tamaño del chip."
    }],
    notes: ["UserChip usa getInitials automáticamente si no se proporcionan iniciales.", "La prop `details` reemplaza a `description` cuando se provee.", "Con href, el chip se comporta como un enlace navegable."]
  }]
};
