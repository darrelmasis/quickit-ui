/* eslint-disable react-refresh/only-export-components */
import {
  Avatar,
  AvatarGroup,
  AvatarPresence,
  Badge,
  Initials,
  UserChip,
} from "@/lib";
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
      <Avatar.Image src="https://i.pravatar.cc/120?img=11" alt="Elena Ruiz" />
      <Avatar.Fallback>ER</Avatar.Fallback>
    </Avatar>;
}
export const avatarDoc = {
  name: "Avatar",
  description: "Avatar base con imagen, fallback, grupo, initials y presencia.",
  previewCode: AVATAR_PREVIEW_CODE,
  preview: <AvatarPreviewCanvas />,
  installCode: `import { Avatar } from "quickit-ui";`,
  usageCode: `import { Avatar } from "quickit-ui";

export function AvatarUsage() {
  return (
    <Avatar size="md" shape="circle">
      <Avatar.Image src="/avatar.png" alt="Elena Ruiz" />
      <Avatar.Fallback>ER</Avatar.Fallback>
    </Avatar>
  );
}`,
  examples: [{
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: "sm, md, lg, xl, 2xl.",
    preview: <div className="flex flex-wrap items-center gap-3">
          <Avatar size="sm">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
          <Avatar size="md">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
          <Avatar size="lg">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
          <Avatar size="xl">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
          <Avatar size="2xl">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
        </div>
  }, {
    id: "ejemplos-shapes",
    title: "Formas",
    description: "circle, rounded, square.",
    preview: <div className="flex flex-wrap items-center gap-3">
          <Avatar shape="circle">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
          <Avatar shape="rounded">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
          <Avatar shape="square">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
        </div>
  }, {
    id: "ejemplos-group",
    title: "Avatar.Group",
    description: "Agrupa avatares y permite stacking.",
    preview: <AvatarGroup stacked>
          <Avatar>
            <Avatar.Fallback>AR</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>MN</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>RS</Avatar.Fallback>
          </Avatar>
        </AvatarGroup>
  }, {
    id: "ejemplos-presence",
    title: "Avatar.Presence",
    description: "Indicador de presencia con status.",
    preview: <div className="flex flex-wrap items-center gap-6">
          <Avatar>
            <Avatar.Fallback>ON</Avatar.Fallback>
            <AvatarPresence status="online" />
          </Avatar>
          <Avatar>
            <Avatar.Fallback>AW</Avatar.Fallback>
            <AvatarPresence status="away" />
          </Avatar>
          <Avatar>
            <Avatar.Fallback>BU</Avatar.Fallback>
            <AvatarPresence status="busy" />
          </Avatar>
          <Avatar>
            <Avatar.Fallback>OF</Avatar.Fallback>
            <AvatarPresence status="offline" />
          </Avatar>
        </div>
  }, {
    id: "ejemplos-combo",
    title: "Avatar con presencia",
    description: "Combina Avatar y Avatar.Presence.",
    preview: <Avatar size="lg">
          <Avatar.Fallback>ER</Avatar.Fallback>
          <AvatarPresence status="online" />
        </Avatar>
  }, {
    id: "ejemplos-initials",
    title: "Avatar.Initials",
    description: "Genera iniciales desde nombre.",
    preview: <div className="flex flex-wrap items-center gap-3">
          <Initials name="Elena Ruiz" />
          <Initials name="Quickit UI" max={1} />
        </div>
  }, {
    id: "ejemplos-userchip",
    title: "Avatar.UserChip",
    description: "Chip con avatar, nombre y trailing.",
    preview: <UserChip name="Elena Ruiz" description="Design lead" initials="ER" presence="online" trailing={<Badge size="sm">Core</Badge>} />
  }, {
    id: "ejemplos-imagen",
    title: "Imagen y fallback",
    description: "Avatar.Image cae al fallback si no hay imagen.",
    preview: <Avatar>
            <Avatar.Image alt="Sin imagen" />
            <Avatar.Fallback>NA</Avatar.Fallback>
          </Avatar>
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
      name: "label (AvatarPresence)",
      type: "string",
      defaultValue: "undefined",
      description: "Nombre accesible opcional. Si no lo pasas, AvatarPresence se trata como decorativo."
    }, {
      name: "size (AvatarPresence)",
      type: "QuickitAvatarSize",
      defaultValue: `"md"`,
      description: "Tamaño del indicador de presencia."
    }, {
      name: "name (Initials)",
      type: "string | number",
      defaultValue: "required",
      description: "Nombre para calcular iniciales."
    }, {
      name: "max (Initials)",
      type: "number",
      defaultValue: "2",
      description: "Máximo de letras en Initials."
    }, {
      name: "fallback (Initials)",
      type: "string",
      defaultValue: "undefined",
      description: "Fallback si no hay nombre."
    }, {
      name: "presence (UserChip)",
      type: "QuickitPresenceStatus",
      defaultValue: "undefined",
      description: "Estado de presencia en UserChip."
    }, {
      name: "name (UserChip)",
      type: "ReactNode",
      defaultValue: "required",
      description: "Contenido visible principal. Si no es string/number y quieres fallback estable, pasa `initials` explícito."
    }, {
      name: "description (UserChip)",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Texto secundario en UserChip."
    }, {
      name: "initials (UserChip)",
      type: "string",
      defaultValue: "undefined",
      description: "Iniciales en UserChip."
    }, {
      name: "src (UserChip)",
      type: "string",
      defaultValue: "undefined",
      description: "Imagen principal en UserChip."
    }, {
      name: "href (UserChip)",
      type: "string",
      defaultValue: "undefined",
      description: "Convierte UserChip en link."
    }, {
      name: "target (UserChip)",
      type: "string",
      defaultValue: "undefined",
      description: "Target del link en UserChip."
    }, {
      name: "rel (UserChip)",
      type: "string",
      defaultValue: "undefined",
      description: "Rel del link en UserChip."
    }, {
      name: "shape (UserChip)",
      type: "QuickitAvatarShape",
      defaultValue: `"circle"`,
      description: "Forma en UserChip."
    }, {
      name: "size (UserChip)",
      type: "QuickitAvatarSize",
      defaultValue: `"md"`,
      description: "Tamaño en UserChip."
    }, {
      name: "trailing (UserChip)",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Elemento a la derecha en UserChip."
    }],
    notes: ["Avatar.Image acepta props nativas de img (también exportado como AvatarImage).", "Avatar.Presence acepta size para el badge; el nombre plano AvatarPresence sigue exportado.", "Para la máscara de recorte, renderiza Avatar.Presence como hijo directo de Avatar.", "Avatar.UserChip acepta href/target; Initials y UserChip siguen disponibles como exports con nombre.", "Si `UserChip.name` no es texto plano y no pasas `initials`, el fallback puede degradar a `?`."]
  }]
};
