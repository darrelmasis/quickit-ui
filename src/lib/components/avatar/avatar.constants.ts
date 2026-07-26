export const AVATAR_PRIMITIVES = {
  root: "relative inline-flex shrink-0 overflow-visible align-middle",
  shell: [
    "absolute inset-0 z-0 inline-flex items-center justify-center overflow-hidden border",
    "select-none transition-[background-color,border-color,color] duration-200",
  ].join(" "),
  image: "h-full w-full object-cover",
  fallback:
    "inline-flex h-full w-full items-center justify-center font-medium uppercase",
  group: "flex items-center",
};

export const AVATAR_SIZE_CLASSES: Record<string, Record<string, string>> = {
  sm: { root: "size-8", fallback: "text-xs" },
  md: { root: "size-10", fallback: "text-sm" },
  lg: { root: "size-12", fallback: "text-base" },
  xl: { root: "size-14", fallback: "text-lg" },
  "2xl": { root: "size-16", fallback: "text-xl" },
};

export const AVATAR_SIZE_PX: Record<string, number> = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  "2xl": 64,
};

export const AVATAR_RADIUS_PX: Record<string, Record<string, number>> = {
  sm: { rounded: 12, square: 8 },
  md: { rounded: 14, square: 10 },
  lg: { rounded: 16, square: 12 },
  xl: { rounded: 18, square: 14 },
  "2xl": { rounded: 20, square: 16 },
};

export const AVATAR_GROUP_OVERLAP_RATIO = 0.25;

export const AVATAR_SHAPE_CLASSES: Record<string, string> = {
  circle: "rounded-full",
  rounded: "",
  square: "",
};

export const AVATAR_THEME_CLASSES: Record<string, Record<string, string>> = {
  light: {
    root: "border-neutral-200 bg-neutral-100 text-neutral-700",
    userChip:
      "border-neutral-200 bg-white text-neutral-950",
    userChipDescription: "text-neutral-500",
  },
  dark: {
    root: "border-neutral-800 bg-neutral-900 text-neutral-200",
    userChip:
      "border-neutral-800 bg-neutral-950 text-neutral-50",
    userChipDescription: "text-neutral-400",
  },
};

export const AVATAR_PRESENCE_SIZE_CLASSES: Record<string, Record<string, string>> = {
  sm: { outer: "size-3", inner: "size-1.5" },
  md: { outer: "size-3.5", inner: "size-2" },
  lg: { outer: "size-4", inner: "size-2.5" },
  xl: { outer: "size-[1.125rem]", inner: "size-3" },
  "2xl": { outer: "size-5", inner: "size-3.5" },
};

export const AVATAR_PRESENCE_SIZE_PX: Record<string, number> = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
};

export const AVATAR_PRESENCE_TRANSLATE_RATIO = 0.1;
export const AVATAR_PRESENCE_MASK_BLEED_PX = 0.5;
export const AVATAR_PRESENCE_MARKER = "__quickitAvatarPresence";

export const AVATAR_PRESENCE_STATUS_LABELS: Record<string, string> = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
};

export const USER_CHIP_SIZE_CLASSES: Record<string, Record<string, any>> = {
  sm: {
    root: "gap-2 rounded-[var(--qk-radius-lg)] px-2.5 py-2",
    title: "text-sm",
    description: "text-xs",
    details: {
      role: "text-xs",
      email: "text-[0.6875rem]",
      username: "text-[0.6875rem]",
      separator: "text-[0.6875rem] text-neutral-400",
    },
  },
  md: {
    root: "gap-3 rounded-[var(--qk-radius-xl)] px-3 py-2.5",
    title: "text-sm",
    description: "text-sm",
    details: {
      role: "text-xs",
      email: "text-xs",
      username: "text-xs",
      separator: "text-xs text-neutral-400",
    },
  },
  lg: {
    root: "gap-3.5 rounded-[var(--qk-radius-2xl)] px-3.5 py-3",
    title: "text-base",
    description: "text-sm",
    details: {
      role: "text-sm",
      email: "text-xs",
      username: "text-xs",
      separator: "text-xs text-neutral-400",
    },
  },
  xl: {
    root: "gap-4 rounded-[var(--qk-radius-3xl)] px-4 py-3.5",
    title: "text-base",
    description: "text-base",
    details: {
      role: "text-sm",
      email: "text-sm",
      username: "text-sm",
      separator: "text-sm text-neutral-400",
    },
  },
  "2xl": {
    root: "gap-4 rounded-[var(--qk-radius-3xl)] px-4.5 py-4",
    title: "text-lg",
    description: "text-base",
    details: {
      role: "text-base",
      email: "text-sm",
      username: "text-sm",
      separator: "text-sm text-neutral-400",
    },
  },
};
