export const CONTROL_RADIUS_BY_SIZE = {
  sm: "rounded-[0.625rem]",
  md: "rounded-[0.75rem]",
  lg: "rounded-[0.875rem]",
  xl: "rounded-[1rem]",
  "2xl": "rounded-[1.125rem]",
};

export const AVATAR_RADIUS_BY_SIZE = {
  sm: {
    rounded: "rounded-[0.75rem]",
    square: "rounded-[0.5rem]",
  },
  md: {
    rounded: "rounded-[0.875rem]",
    square: "rounded-[0.625rem]",
  },
  lg: {
    rounded: "rounded-[1rem]",
    square: "rounded-[0.75rem]",
  },
  xl: {
    rounded: "rounded-[1.125rem]",
    square: "rounded-[0.875rem]",
  },
  "2xl": {
    rounded: "rounded-[1.25rem]",
    square: "rounded-[1rem]",
  },
};

export const DEFAULT_CONTROL_RADIUS = CONTROL_RADIUS_BY_SIZE.md;

export function getControlRadius(size = "md") {
  return CONTROL_RADIUS_BY_SIZE[size] ?? DEFAULT_CONTROL_RADIUS;
}

export function getAvatarRadius(shape = "circle", size = "md") {
  if (shape === "circle") {
    return "rounded-full";
  }

  return AVATAR_RADIUS_BY_SIZE[size]?.[shape] ?? AVATAR_RADIUS_BY_SIZE.md.rounded;
}
