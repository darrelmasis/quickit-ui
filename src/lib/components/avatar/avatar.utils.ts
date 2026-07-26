import { isValidElement, type ReactNode } from "react";
import {
  QUICKIT_AVATAR_SHAPES,
  QUICKIT_AVATAR_SIZES,
  resolveQuickitToken,
} from "@/lib/tokens";
import { resolveQuickitThemeMode } from "@/lib/theme";
import {
  AVATAR_GROUP_OVERLAP_RATIO,
  AVATAR_PRESENCE_MARKER,
  AVATAR_PRESENCE_MASK_BLEED_PX,
  AVATAR_PRESENCE_SIZE_PX,
  AVATAR_PRESENCE_TRANSLATE_RATIO,
  AVATAR_RADIUS_PX,
  AVATAR_SIZE_PX,
} from "./avatar.constants";
import { AVATAR_PRESENCE_STATUS_CLASSES } from "@/lib/theme/theme-classes";

export function resolveTheme(theme: string) {
  return resolveQuickitThemeMode(theme);
}

export function resolveAvatarShape(shape: string) {
  return resolveQuickitToken(QUICKIT_AVATAR_SHAPES, shape, "circle");
}

export function resolveAvatarSize(size: string) {
  return resolveQuickitToken(QUICKIT_AVATAR_SIZES, size, "md");
}

export function resolvePresenceStatus(status: string) {
  return Object.hasOwn(AVATAR_PRESENCE_STATUS_CLASSES, status)
    ? status
    : "offline";
}

export function normalizeInitialsSource(name: string | number) {
  if (typeof name === "string" || typeof name === "number") {
    return String(name).trim();
  }

  return "";
}

export function getAvatarGroupMaskVariant(index: number, total: number) {
  if (total <= 1 || index === total - 1) {
    return null;
  }

  return "stacked";
}

export function getAvatarGroupOverlapPx(size: string) {
  return Math.round(AVATAR_SIZE_PX[size] * AVATAR_GROUP_OVERLAP_RATIO);
}

export function getAvatarGroupRadiusRatio(shape: string, size: string) {
  if (shape === "circle") {
    return 0.5;
  }

  const radiusPx =
    AVATAR_RADIUS_PX[size]?.[shape] ?? AVATAR_RADIUS_PX.md.rounded;

  return radiusPx / AVATAR_SIZE_PX[size];
}

export function getAvatarGroupMaskDefinition(shape: string, size: string) {
  const cutRatio = getAvatarGroupOverlapPx(size) / AVATAR_SIZE_PX[size];
  const cutStart = Number((1 - cutRatio * 1.24).toFixed(4));

  if (shape === "circle") {
    return {
      type: "circle",
      cx: Number((cutStart + 0.5).toFixed(4)),
      cy: 0.5,
      r: 0.5,
    };
  }

  const radiusRatio = getAvatarGroupRadiusRatio(shape, size);

  return {
    type: "rect",
    x: cutStart,
    y: 0,
    width: 1,
    height: 1,
    rx: Number(radiusRatio.toFixed(4)),
    ry: Number(radiusRatio.toFixed(4)),
  };
}

export function isAvatarPresenceElement(child: ReactNode) {
  if (!isValidElement(child)) {
    return false;
  }

  const { type } = child;
  if (typeof type === "string") {
    return false;
  }

  return (
    (type as unknown as Record<string, unknown>)[AVATAR_PRESENCE_MARKER] === true ||
    (type as { displayName?: string }).displayName === "AvatarPresence" ||
    (type as { render?: { displayName?: string; name?: string } }).render?.displayName === "AvatarPresence" ||
    (type as { render?: { displayName?: string; name?: string } }).render?.name === "AvatarPresence"
  );
}

export function splitAvatarStyle(style: React.CSSProperties) {
  if (!style) {
    return { rootStyle: undefined, shellStyle: undefined };
  }

  const { WebkitMask, mask, ...rootStyle } = style;
  const shellStyle =
    WebkitMask || mask
      ? {
          ...(WebkitMask ? { WebkitMask } : {}),
          ...(mask ? { mask } : {}),
        }
      : undefined;

  return { rootStyle, shellStyle };
}

export function getAvatarPresenceMaskDefinition(avatarSize: string, presenceSize: string) {
  const avatarSizePx = AVATAR_SIZE_PX[avatarSize] ?? AVATAR_SIZE_PX.md;
  const presenceSizePx =
    AVATAR_PRESENCE_SIZE_PX[presenceSize] ?? AVATAR_PRESENCE_SIZE_PX.md;
  const presenceCenter =
    (avatarSizePx -
      presenceSizePx / 2 +
      presenceSizePx * AVATAR_PRESENCE_TRANSLATE_RATIO) /
    avatarSizePx;
  const cutRadius =
    (presenceSizePx / 2 + AVATAR_PRESENCE_MASK_BLEED_PX) / avatarSizePx;

  return {
    cx: Number(presenceCenter.toFixed(4)),
    cy: Number(presenceCenter.toFixed(4)),
    r: Number(cutRadius.toFixed(4)),
  };
}
