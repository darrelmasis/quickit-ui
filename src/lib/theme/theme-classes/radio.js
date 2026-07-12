export const RADIO_THEME_CLASSES = {
  light: {
    box: "border-neutral-300 bg-white peer-hover:border-neutral-400 peer-hover:bg-neutral-50",
    focus:
      "peer-focus-visible:outline-neutral-500 peer-focus-visible:ring-neutral-400/45 peer-focus-visible:ring-offset-white",
    colors: {
      neutral: {
        box: "peer-checked:border-neutral-700 peer-checked:bg-neutral-700 peer-hover:peer-checked:border-neutral-800 peer-hover:peer-checked:bg-neutral-800",
        dot: "bg-white",
      },
      primary: {
        box: "peer-checked:border-sky-600 peer-checked:bg-sky-600 peer-hover:peer-checked:border-sky-700 peer-hover:peer-checked:bg-sky-700",
        dot: "bg-white",
      },
      success: {
        box: "peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-hover:peer-checked:border-emerald-700 peer-hover:peer-checked:bg-emerald-700",
        dot: "bg-white",
      },
      danger: {
        box: "peer-checked:border-rose-600 peer-checked:bg-rose-600 peer-hover:peer-checked:border-rose-700 peer-hover:peer-checked:bg-rose-700",
        dot: "bg-white",
      },
      warning: {
        box: "peer-checked:border-amber-500 peer-checked:bg-amber-500 peer-hover:peer-checked:border-amber-600 peer-hover:peer-checked:bg-amber-600",
        dot: "bg-neutral-950",
      },
      info: {
        box: "peer-checked:border-cyan-600 peer-checked:bg-cyan-600 peer-hover:peer-checked:border-cyan-700 peer-hover:peer-checked:bg-cyan-700",
        dot: "bg-white",
      },
      light: {
        box: "peer-checked:border-neutral-200 peer-checked:bg-neutral-200 peer-hover:peer-checked:border-neutral-300 peer-hover:peer-checked:bg-neutral-300",
        dot: "bg-neutral-950",
      },
      dark: {
        box: "peer-checked:border-neutral-800 peer-checked:bg-neutral-800 peer-hover:peer-checked:border-neutral-900 peer-hover:peer-checked:bg-neutral-900",
        dot: "bg-white",
      },
    },
    invalid: "border-rose-300 peer-checked:border-rose-600 peer-checked:bg-rose-600 peer-hover:peer-checked:border-rose-700 peer-hover:peer-checked:bg-rose-700",
    invalidDot: "bg-white",
  },
  dark: {
    box: "border-neutral-700 bg-neutral-950 peer-hover:border-neutral-600 peer-hover:bg-neutral-900",
    focus:
      "peer-focus-visible:outline-neutral-400 peer-focus-visible:ring-neutral-400/35 peer-focus-visible:ring-offset-[#09090b]",
    colors: {
      neutral: {
        box: "peer-checked:border-neutral-100 peer-checked:bg-neutral-100 peer-hover:peer-checked:border-white peer-hover:peer-checked:bg-white",
        dot: "bg-neutral-950",
      },
      primary: {
        box: "peer-checked:border-sky-300 peer-checked:bg-sky-300 peer-hover:peer-checked:border-sky-200 peer-hover:peer-checked:bg-sky-200",
        dot: "bg-neutral-950",
      },
      success: {
        box: "peer-checked:border-emerald-300 peer-checked:bg-emerald-300 peer-hover:peer-checked:border-emerald-200 peer-hover:peer-checked:bg-emerald-200",
        dot: "bg-neutral-950",
      },
      danger: {
        box: "peer-checked:border-rose-300 peer-checked:bg-rose-300 peer-hover:peer-checked:border-rose-200 peer-hover:peer-checked:bg-rose-200",
        dot: "bg-neutral-950",
      },
      warning: {
        box: "peer-checked:border-amber-300 peer-checked:bg-amber-300 peer-hover:peer-checked:border-amber-200 peer-hover:peer-checked:bg-amber-200",
        dot: "bg-neutral-950",
      },
      info: {
        box: "peer-checked:border-cyan-300 peer-checked:bg-cyan-300 peer-hover:peer-checked:border-cyan-200 peer-hover:peer-checked:bg-cyan-200",
        dot: "bg-neutral-950",
      },
      light: {
        box: "peer-checked:border-neutral-200 peer-checked:bg-neutral-200 peer-hover:peer-checked:border-neutral-100 peer-hover:peer-checked:bg-neutral-100",
        dot: "bg-neutral-950",
      },
      dark: {
        box: "peer-checked:border-neutral-300 peer-checked:bg-neutral-300 peer-hover:peer-checked:border-neutral-200 peer-hover:peer-checked:bg-neutral-200",
        dot: "bg-neutral-950",
      },
    },
    invalid: "border-rose-500/70 peer-checked:border-rose-300 peer-checked:bg-rose-300 peer-hover:peer-checked:border-rose-200 peer-hover:peer-checked:bg-rose-200",
    invalidDot: "bg-neutral-950",
  },
};
