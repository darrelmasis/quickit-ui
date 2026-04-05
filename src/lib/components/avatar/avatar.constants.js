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

export const AVATAR_SIZE_CLASSES = {
  sm: { root: "size-8", fallback: "text-xs" },
  md: { root: "size-10", fallback: "text-sm" },
  lg: { root: "size-12", fallback: "text-base" },
  xl: { root: "size-14", fallback: "text-lg" },
  "2xl": { root: "size-16", fallback: "text-xl" },
};

export const AVATAR_SIZE_PX = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  "2xl": 64,
};

export const AVATAR_RADIUS_PX = {
  sm: { rounded: 12, square: 8 },
  md: { rounded: 14, square: 10 },
  lg: { rounded: 16, square: 12 },
  xl: { rounded: 18, square: 14 },
  "2xl": { rounded: 20, square: 16 },
};

export const AVATAR_GROUP_OVERLAP_RATIO = 0.25;

export const AVATAR_SHAPE_CLASSES = {
  circle: "rounded-full",
  rounded: "",
  square: "",
};

export const AVATAR_THEME_CLASSES = {
  light: {
    root: "border-slate-200 bg-slate-100 text-slate-700",
    userChip:
      "border-slate-200 bg-white text-slate-950 hover:border-slate-300 hover:bg-slate-50",
    userChipDescription: "text-slate-500",
  },
  dark: {
    root: "border-zinc-800 bg-zinc-900 text-stone-200",
    userChip:
      "border-zinc-800 bg-zinc-950 text-stone-50 hover:border-zinc-700 hover:bg-zinc-900",
    userChipDescription: "text-stone-400",
  },
};

export const AVATAR_PRESENCE_SIZE_CLASSES = {
  sm: { outer: "size-3", inner: "size-1.5" },
  md: { outer: "size-3.5", inner: "size-2" },
  lg: { outer: "size-4", inner: "size-2.5" },
  xl: { outer: "size-[1.125rem]", inner: "size-3" },
  "2xl": { outer: "size-5", inner: "size-3.5" },
};

export const AVATAR_PRESENCE_SIZE_PX = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
};

export const AVATAR_PRESENCE_TRANSLATE_RATIO = 0.1;
export const AVATAR_PRESENCE_MASK_BLEED_PX = 0.5;
export const AVATAR_PRESENCE_MARKER = "__quickitAvatarPresence";

export const AVATAR_PRESENCE_STATUS_CLASSES = {
  online: "bg-emerald-500",
  away: "bg-amber-400",
  busy: "bg-red-500",
  offline: "bg-neutral-400",
};

export const AVATAR_PRESENCE_STATUS_LABELS = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
};

export const USER_CHIP_SIZE_CLASSES = {
  sm: { root: "gap-2 rounded-[0.9rem] px-2.5 py-2", title: "text-sm", description: "text-xs" },
  md: { root: "gap-3 rounded-[1rem] px-3 py-2.5", title: "text-sm", description: "text-sm" },
  lg: { root: "gap-3.5 rounded-[1.1rem] px-3.5 py-3", title: "text-base", description: "text-sm" },
  xl: { root: "gap-4 rounded-[1.2rem] px-4 py-3.5", title: "text-base", description: "text-base" },
  "2xl": { root: "gap-4 rounded-[1.25rem] px-4.5 py-4", title: "text-lg", description: "text-base" },
};
