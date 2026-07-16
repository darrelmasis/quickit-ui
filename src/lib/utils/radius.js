export const CHECKBOX_RADIUS_BY_SIZE = {
  sm: "rounded-[calc(var(--qi-radius)*0.333)]",
  md: "rounded-[calc(var(--qi-radius)*0.5)]",
};

export const CONTROL_RADIUS_BY_SIZE = {
  xs: "rounded-[var(--qi-radius-xs)]",
  sm: "rounded-[var(--qi-radius-xs)]",
  md: "rounded-[var(--qi-radius)]",
  lg: "rounded-[var(--qi-radius-lg)]",
  xl: "rounded-[var(--qi-radius-xl)]",
  "2xl": "rounded-[var(--qi-radius-2xl)]",
};

export const AVATAR_RADIUS_BY_SIZE = {
  sm: {
    rounded: "rounded-[var(--qi-radius)]",
    square: "rounded-[var(--qi-radius-xs)]",
  },
  md: {
    rounded: "rounded-[var(--qi-radius-lg)]",
    square: "rounded-[var(--qi-radius-xs)]",
  },
  lg: {
    rounded: "rounded-[var(--qi-radius-xl)]",
    square: "rounded-[var(--qi-radius)]",
  },
  xl: {
    rounded: "rounded-[var(--qi-radius-2xl)]",
    square: "rounded-[var(--qi-radius-lg)]",
  },
  "2xl": {
    rounded: "rounded-[var(--qi-radius-3xl)]",
    square: "rounded-[var(--qi-radius-xl)]",
  },
};

export const DEFAULT_CONTROL_RADIUS = CONTROL_RADIUS_BY_SIZE.md;

export function getControlRadius(size = "md") {
  return CONTROL_RADIUS_BY_SIZE[size] ?? DEFAULT_CONTROL_RADIUS;
}

export function getCheckboxRadius(size = "md") {
  return CHECKBOX_RADIUS_BY_SIZE[size] ?? CHECKBOX_RADIUS_BY_SIZE.md;
}

export function getAvatarRadius(shape = "circle", size = "md") {
  if (shape === "circle") {
    return "rounded-full";
  }

  return AVATAR_RADIUS_BY_SIZE[size]?.[shape] ?? AVATAR_RADIUS_BY_SIZE.md.rounded;
}
