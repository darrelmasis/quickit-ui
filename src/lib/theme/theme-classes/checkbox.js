export const CHECKBOX_THEME_CLASSES = {
  light: {
    box: {
      idle: "border-neutral-300 bg-white hover:border-neutral-400",
      invalid: "border-rose-500 bg-white",
      focus: "focus-visible:ring-neutral-400/50 focus-visible:ring-offset-white",
      colors: {
        neutral:
          "peer-checked:border-neutral-700 peer-checked:bg-neutral-700 peer-checked:text-white",
        primary:
          "peer-checked:border-sky-600 peer-checked:bg-sky-600 peer-checked:text-white",
        success:
          "peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-checked:text-white",
        danger:
          "peer-checked:border-rose-600 peer-checked:bg-rose-600 peer-checked:text-white",
        warning:
          "peer-checked:border-amber-500 peer-checked:bg-amber-500 peer-checked:text-neutral-950",
        info:
          "peer-checked:border-cyan-600 peer-checked:bg-cyan-600 peer-checked:text-white",
        light:
          "peer-checked:border-neutral-300 peer-checked:bg-neutral-300 peer-checked:text-neutral-950",
        dark:
          "peer-checked:border-neutral-800 peer-checked:bg-neutral-800 peer-checked:text-white",
      },
    },
    label: "text-neutral-900",
  },
  dark: {
    box: {
      idle: "border-neutral-700 bg-neutral-950 hover:border-neutral-600",
      invalid: "border-rose-500 bg-neutral-950",
      focus: "focus-visible:ring-neutral-500/50 focus-visible:ring-offset-neutral-950",
      colors: {
        neutral:
          "peer-checked:border-neutral-100 peer-checked:bg-neutral-100 peer-checked:text-neutral-950",
        primary:
          "peer-checked:border-sky-300 peer-checked:bg-sky-300 peer-checked:text-neutral-950",
        success:
          "peer-checked:border-emerald-300 peer-checked:bg-emerald-300 peer-checked:text-neutral-950",
        danger:
          "peer-checked:border-rose-300 peer-checked:bg-rose-300 peer-checked:text-neutral-950",
        warning:
          "peer-checked:border-amber-300 peer-checked:bg-amber-300 peer-checked:text-neutral-950",
        info:
          "peer-checked:border-cyan-300 peer-checked:bg-cyan-300 peer-checked:text-neutral-950",
        light:
          "peer-checked:border-neutral-200 peer-checked:bg-neutral-200 peer-checked:text-neutral-950",
        dark:
          "peer-checked:border-neutral-300 peer-checked:bg-neutral-300 peer-checked:text-neutral-950",
      },
    },
    label: "text-neutral-50",
  },
};
