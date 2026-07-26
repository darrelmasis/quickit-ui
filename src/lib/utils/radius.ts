export const CHECKBOX_RADIUS_BY_SIZE: Record<string, string> = {
  sm: "rounded-[calc(var(--qk-radius)*0.333)]",
  md: "rounded-[calc(var(--qk-radius)*0.5)]",
};

export const CONTROL_RADIUS_BY_SIZE: Record<string, string> = {
  xs: "rounded-[var(--qk-radius-xs)]",
  sm: "rounded-[var(--qk-radius-xs)]",
  md: "rounded-[var(--qk-radius)]",
  lg: "rounded-[var(--qk-radius-lg)]",
  xl: "rounded-[var(--qk-radius-xl)]",
  "2xl": "rounded-[var(--qk-radius-2xl)]",
};

export const AVATAR_RADIUS_BY_SIZE: Record<string, Record<string, string>> = {
  sm: {
    rounded: "rounded-[var(--qk-radius)]",
    square: "rounded-[var(--qk-radius-xs)]",
  },
  md: {
    rounded: "rounded-[var(--qk-radius-lg)]",
    square: "rounded-[var(--qk-radius-xs)]",
  },
  lg: {
    rounded: "rounded-[var(--qk-radius-xl)]",
    square: "rounded-[var(--qk-radius)]",
  },
  xl: {
    rounded: "rounded-[var(--qk-radius-2xl)]",
    square: "rounded-[var(--qk-radius-lg)]",
  },
  "2xl": {
    rounded: "rounded-[var(--qk-radius-3xl)]",
    square: "rounded-[var(--qk-radius-xl)]",
  },
};

export const DEFAULT_CONTROL_RADIUS = CONTROL_RADIUS_BY_SIZE.md;

export function getControlRadius(size: string = "md") {
  return CONTROL_RADIUS_BY_SIZE[size] ?? DEFAULT_CONTROL_RADIUS;
}

export function getCheckboxRadius(size: string = "md") {
  return CHECKBOX_RADIUS_BY_SIZE[size] ?? CHECKBOX_RADIUS_BY_SIZE.md;
}

export function getAvatarRadius(shape: string = "circle", size: string = "md") {
  if (shape === "circle") {
    return "rounded-full";
  }

  return AVATAR_RADIUS_BY_SIZE[size]?.[shape] ?? AVATAR_RADIUS_BY_SIZE.md.rounded;
}
