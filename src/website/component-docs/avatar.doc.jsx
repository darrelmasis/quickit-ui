/* eslint-disable react-refresh/only-export-components */
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage, AvatarPresence, Badge, Initials, UserChip } from "@/lib";
const AVATAR_PREVIEW_CODE = `import { Avatar } from "quickit-ui";

export function AvatarPreview() {
  return (
    <Avatar>
      <Avatar.Image src="/avatar.png" alt="Elena Ruiz" />
      <Avatar.Fallback>ER</Avatar.Fallback>
    </Avatar>
  );
}`;
function AvatarPreviewCanvas() {
  return <Avatar>
      <AvatarImage src="https://i.pravatar.cc/120?img=11" alt="Elena Ruiz" />
      <AvatarFallback>ER</AvatarFallback>
    </Avatar>;
}
export const avatarDoc = {
  name: "Avatar",
  description: "Avatar base con imagen, fallback, grupo, initials y presencia.",
  previewCode: AVATAR_PREVIEW_CODE,
  preview: <AvatarPreviewCanvas />,
  installCode: `import { Avatar } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: "sm, md, lg, xl, 2xl.",
    preview: <div className="flex flex-wrap items-center gap-3">
          <Avatar size="sm"><AvatarImage src="https://i.pravatar.cc/40?img=11" alt="Elena Ruiz" /><AvatarFallback>ER</AvatarFallback></Avatar>
          <Avatar size="md"><AvatarImage src="https://i.pravatar.cc/48?img=32" alt="Carlos López" /><AvatarFallback>CL</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarImage src="https://i.pravatar.cc/56?img=49" alt="Ana Martínez" /><AvatarFallback>AM</AvatarFallback></Avatar>
          <Avatar size="xl"><AvatarImage src="https://i.pravatar.cc/64?img=60" alt="Pedro Sánchez" /><AvatarFallback>PS</AvatarFallback></Avatar>
          <Avatar size="2xl"><AvatarImage src="https://i.pravatar.cc/72?img=68" alt="Laura Gómez" /><AvatarFallback>LG</AvatarFallback></Avatar>
        </div>,
    code: `import { Avatar } from "quickit-ui";

export function AvatarTamanos() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar size="sm">
        <Avatar.Image src="/avatar-40.jpg" alt="Elena Ruiz" />
        <Avatar.Fallback>ER</Avatar.Fallback>
      </Avatar>
      <Avatar size="md">
        <Avatar.Image src="/avatar-48.jpg" alt="Carlos López" />
        <Avatar.Fallback>CL</Avatar.Fallback>
      </Avatar>
      <Avatar size="lg">
        <Avatar.Image src="/avatar-56.jpg" alt="Ana Martínez" />
        <Avatar.Fallback>AM</Avatar.Fallback>
      </Avatar>
      <Avatar size="xl">
        <Avatar.Image src="/avatar-64.jpg" alt="Pedro Sánchez" />
        <Avatar.Fallback>PS</Avatar.Fallback>
      </Avatar>
      <Avatar size="2xl">
        <Avatar.Image src="/avatar-72.jpg" alt="Laura Gómez" />
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar>
    </div>
  );
}`
  }, {
    id: "ejemplos-shapes",
    title: "Formas",
    description: "circle, rounded, square.",
    preview: <div className="flex flex-wrap items-center gap-3">
          <Avatar shape="circle"><AvatarImage src="https://i.pravatar.cc/48?img=12" alt="María Torres" /><AvatarFallback>MT</AvatarFallback></Avatar>
          <Avatar shape="rounded"><AvatarImage src="https://i.pravatar.cc/48?img=33" alt="Jorge Ruiz" /><AvatarFallback>JR</AvatarFallback></Avatar>
          <Avatar shape="square"><AvatarImage src="https://i.pravatar.cc/48?img=44" alt="Sofía Díaz" /><AvatarFallback>SD</AvatarFallback></Avatar>
        </div>,
    code: `import { Avatar } from "quickit-ui";

export function AvatarFormas() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar shape="circle">
        <Avatar.Image src="/avatar-48-circle.jpg" alt="María Torres" />
        <Avatar.Fallback>MT</Avatar.Fallback>
      </Avatar>
      <Avatar shape="rounded">
        <Avatar.Image src="/avatar-48-rounded.jpg" alt="Jorge Ruiz" />
        <Avatar.Fallback>JR</Avatar.Fallback>
      </Avatar>
      <Avatar shape="square">
        <Avatar.Image src="/avatar-48-square.jpg" alt="Sofía Díaz" />
        <Avatar.Fallback>SD</Avatar.Fallback>
      </Avatar>
    </div>
  );
}`
  }, {
    id: "ejemplos-group",
    title: "Avatar.Group",
    description: "Agrupa avatares y permite stacking.",
    preview: <AvatarGroup stacked>
          <Avatar><AvatarImage src="https://i.pravatar.cc/48?img=45" alt="Ana Rivera" /><AvatarFallback>AR</AvatarFallback></Avatar>
          <Avatar><AvatarImage src="https://i.pravatar.cc/48?img=47" alt="Miguel Núñez" /><AvatarFallback>MN</AvatarFallback></Avatar>
          <Avatar><AvatarImage src="https://i.pravatar.cc/48?img=51" alt="Rosa Salas" /><AvatarFallback>RS</AvatarFallback></Avatar>
        </AvatarGroup>,
    code: `import { Avatar } from "quickit-ui";

export function AvatarGroupExample() {
  return (
    <Avatar.Group stacked>
      <Avatar>
        <Avatar.Image src="/avatar-1.jpg" alt="Ana Rivera" />
        <Avatar.Fallback>AR</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image src="/avatar-2.jpg" alt="Miguel Núñez" />
        <Avatar.Fallback>MN</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image src="/avatar-3.jpg" alt="Rosa Salas" />
        <Avatar.Fallback>RS</Avatar.Fallback>
      </Avatar>
    </Avatar.Group>
  );
}`
  }, {
    id: "ejemplos-presence",
    title: "Avatar.Presence",
    description: "Indicador de presencia con status.",
    preview: <div className="flex flex-wrap items-center gap-6">
          <Avatar><AvatarImage src="https://i.pravatar.cc/48?img=1" alt="Usuario en línea" /><AvatarFallback>ON</AvatarFallback><AvatarPresence status="online" /></Avatar>
          <Avatar><AvatarImage src="https://i.pravatar.cc/48?img=19" alt="Usuario ausente" /><AvatarFallback>AW</AvatarFallback><AvatarPresence status="away" /></Avatar>
          <Avatar><AvatarImage src="https://i.pravatar.cc/48?img=16" alt="Usuario ocupado" /><AvatarFallback>BU</AvatarFallback><AvatarPresence status="busy" /></Avatar>
          <Avatar><AvatarImage src="https://i.pravatar.cc/48?img=22" alt="Usuario desconectado" /><AvatarFallback>OF</AvatarFallback><AvatarPresence status="offline" /></Avatar>
        </div>,
    code: `import { Avatar } from "quickit-ui";

export function AvatarPresenceExample() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Avatar>
        <Avatar.Image src="/avatar-online.jpg" alt="Usuario en línea" />
        <Avatar.Fallback>ON</Avatar.Fallback>
        <Avatar.Presence status="online" />
      </Avatar>
      <Avatar>
        <Avatar.Image src="/avatar-away.jpg" alt="Usuario ausente" />
        <Avatar.Fallback>AW</Avatar.Fallback>
        <Avatar.Presence status="away" />
      </Avatar>
      <Avatar>
        <Avatar.Image src="/avatar-busy.jpg" alt="Usuario ocupado" />
        <Avatar.Fallback>BU</Avatar.Fallback>
        <Avatar.Presence status="busy" />
      </Avatar>
      <Avatar>
        <Avatar.Image src="/avatar-offline.jpg" alt="Usuario desconectado" />
        <Avatar.Fallback>OF</Avatar.Fallback>
        <Avatar.Presence status="offline" />
      </Avatar>
    </div>
  );
}`
  }, {
    id: "ejemplos-initials",
    title: "Avatar.Initials",
    description: "Genera iniciales desde nombre.",
    preview: <div className="flex flex-wrap items-center gap-3">
          <Initials name="Elena Ruiz" />
          <Initials name="Quickit UI" max={1} />
        </div>,
    code: `import { Initials } from "quickit-ui";

export function AvatarInitials() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Initials name="Elena Ruiz" />
      <Initials name="Quickit UI" max={1} />
    </div>
  );
}`
  }, {
    id: "ejemplos-userchip",
    title: "Avatar.UserChip",
    description: "Chip con foto, detalles enriquecidos y badge.",
    preview: <UserChip
        name="Elena Ruiz"
        src="https://i.pravatar.cc/120?img=11"
        initials="ER"
        details={{ role: "Design Lead", email: "elena@ejemplo.com", username: "elena" }}
        presence="online"
        trailing={<Badge size="sm">Core</Badge>}
      />,
    code: `import { Badge, UserChip } from "quickit-ui";

export function AvatarUserChip() {
  return (
    <UserChip
      name="Elena Ruiz"
      src="/avatar.jpg"
      initials="ER"
      details={{ role: "Design Lead", email: "elena@ejemplo.com", username: "elena" }}
      presence="online"
      trailing={<Badge size="sm">Core</Badge>}
    />
  );
}`
  }, {
    id: "ejemplos-imagen",
    title: "Imagen y fallback",
    description: "Avatar.Image cae al fallback si no hay imagen.",
    preview: <Avatar>
          <AvatarImage alt="Sin imagen" />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>,
    code: `import { Avatar } from "quickit-ui";

export function AvatarImagen() {
  return (
    <Avatar>
      <Avatar.Image alt="Sin imagen" />
      <Avatar.Fallback>NA</Avatar.Fallback>
    </Avatar>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "shape (Avatar)",
      type: "QuickitAvatarShape",
      defaultValue: `"circle"`,
      description: "Forma del avatar."
    }, {
      name: "size (Avatar)",
      type: "QuickitAvatarSize",
      defaultValue: `"md"`,
      description: "Tamaño del avatar."
    }, {
      name: "stacked (AvatarGroup)",
      type: "boolean",
      defaultValue: "false",
      description: "Activa stacking en AvatarGroup."
    }, {
      name: "status (AvatarPresence)",
      type: "QuickitPresenceStatus",
      defaultValue: `"online"`,
      description: "Estado de presencia."
    }, {
      name: "size (AvatarPresence)",
      type: "QuickitAvatarSize",
      defaultValue: `"md"`,
      description: "Tamaño del indicador."
    }, {
      name: "name (Initials)",
      type: "string | number",
      defaultValue: "required",
      description: "Nombre para calcular iniciales."
    }, {
      name: "max (Initials)",
      type: "number",
      defaultValue: "2",
      description: "Máximo de letras."
    }],
    notes: ["Avatar.Image acepta props nativas de img.", "Initials y UserChip se exportan como exports con nombre."]
  }]
};
