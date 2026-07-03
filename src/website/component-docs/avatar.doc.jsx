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
          <Avatar size="sm"><AvatarFallback>ER</AvatarFallback></Avatar>
          <Avatar size="md"><AvatarFallback>ER</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarFallback>ER</AvatarFallback></Avatar>
          <Avatar size="xl"><AvatarFallback>ER</AvatarFallback></Avatar>
          <Avatar size="2xl"><AvatarFallback>ER</AvatarFallback></Avatar>
        </div>,
    code: `import { Avatar } from "quickit-ui";

export function AvatarTamanos() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar size="sm"><Avatar.Fallback>ER</Avatar.Fallback></Avatar>
      <Avatar size="md"><Avatar.Fallback>ER</Avatar.Fallback></Avatar>
      <Avatar size="lg"><Avatar.Fallback>ER</Avatar.Fallback></Avatar>
      <Avatar size="xl"><Avatar.Fallback>ER</Avatar.Fallback></Avatar>
      <Avatar size="2xl"><Avatar.Fallback>ER</Avatar.Fallback></Avatar>
    </div>
  );
}`
  }, {
    id: "ejemplos-shapes",
    title: "Formas",
    description: "circle, rounded, square.",
    preview: <div className="flex flex-wrap items-center gap-3">
          <Avatar shape="circle"><AvatarFallback>ER</AvatarFallback></Avatar>
          <Avatar shape="rounded"><AvatarFallback>ER</AvatarFallback></Avatar>
          <Avatar shape="square"><AvatarFallback>ER</AvatarFallback></Avatar>
        </div>,
    code: `import { Avatar } from "quickit-ui";

export function AvatarFormas() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar shape="circle"><Avatar.Fallback>ER</Avatar.Fallback></Avatar>
      <Avatar shape="rounded"><Avatar.Fallback>ER</Avatar.Fallback></Avatar>
      <Avatar shape="square"><Avatar.Fallback>ER</Avatar.Fallback></Avatar>
    </div>
  );
}`
  }, {
    id: "ejemplos-group",
    title: "Avatar.Group",
    description: "Agrupa avatares y permite stacking.",
    preview: <AvatarGroup stacked>
          <Avatar><AvatarFallback>AR</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>MN</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>RS</AvatarFallback></Avatar>
        </AvatarGroup>,
    code: `import { Avatar } from "quickit-ui";

export function AvatarGroupExample() {
  return (
    <Avatar.Group stacked>
      <Avatar><Avatar.Fallback>AR</Avatar.Fallback></Avatar>
      <Avatar><Avatar.Fallback>MN</Avatar.Fallback></Avatar>
      <Avatar><Avatar.Fallback>RS</Avatar.Fallback></Avatar>
    </Avatar.Group>
  );
}`
  }, {
    id: "ejemplos-presence",
    title: "Avatar.Presence",
    description: "Indicador de presencia con status.",
    preview: <div className="flex flex-wrap items-center gap-6">
          <Avatar><AvatarFallback>ON</AvatarFallback><AvatarPresence status="online" /></Avatar>
          <Avatar><AvatarFallback>AW</AvatarFallback><AvatarPresence status="away" /></Avatar>
          <Avatar><AvatarFallback>BU</AvatarFallback><AvatarPresence status="busy" /></Avatar>
          <Avatar><AvatarFallback>OF</AvatarFallback><AvatarPresence status="offline" /></Avatar>
        </div>,
    code: `import { Avatar } from "quickit-ui";

export function AvatarPresenceExample() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Avatar><Avatar.Fallback>ON</Avatar.Fallback><Avatar.Presence status="online" /></Avatar>
      <Avatar><Avatar.Fallback>AW</Avatar.Fallback><Avatar.Presence status="away" /></Avatar>
      <Avatar><Avatar.Fallback>BU</Avatar.Fallback><Avatar.Presence status="busy" /></Avatar>
      <Avatar><Avatar.Fallback>OF</Avatar.Fallback><Avatar.Presence status="offline" /></Avatar>
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
    description: "Chip con avatar, nombre y trailing.",
    preview: <UserChip name="Elena Ruiz" description="Design lead" initials="ER" presence="online" trailing={<Badge size="sm">Core</Badge>} />,
    code: `import { Badge, UserChip } from "quickit-ui";

export function AvatarUserChip() {
  return (
    <UserChip
      name="Elena Ruiz"
      description="Design lead"
      initials="ER"
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
