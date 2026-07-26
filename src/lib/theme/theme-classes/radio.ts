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
        box: "peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-hover:peer-checked:border-blue-700 peer-hover:peer-checked:bg-blue-700",
        dot: "bg-white",
      },
      secondary: {
        box: "peer-checked:border-purple-600 peer-checked:bg-purple-600 peer-hover:peer-checked:border-purple-700 peer-hover:peer-checked:bg-purple-700",
        dot: "bg-white",
      },
      success: {
        box: "peer-checked:border-green-600 peer-checked:bg-green-600 peer-hover:peer-checked:border-green-700 peer-hover:peer-checked:bg-green-700",
        dot: "bg-white",
      },
      danger: {
        box: "peer-checked:border-red-600 peer-checked:bg-red-600 peer-hover:peer-checked:border-red-700 peer-hover:peer-checked:bg-red-700",
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
        box: "peer-checked:border-neutral-100 peer-checked:bg-neutral-50 peer-hover:peer-checked:border-neutral-200 peer-hover:peer-checked:bg-neutral-100",
        dot: "bg-neutral-950",
      },
      dark: {
        box: "peer-checked:border-neutral-950 peer-checked:bg-neutral-950 peer-hover:peer-checked:border-neutral-900 peer-hover:peer-checked:bg-neutral-900",
        dot: "bg-white",
      },
    },
    invalid: "border-red-300 peer-checked:border-red-600 peer-checked:bg-red-600 peer-hover:peer-checked:border-red-700 peer-hover:peer-checked:bg-red-700",
    invalidDot: "bg-white",
  },
  dark: {
    box: "border-neutral-700 bg-neutral-900 peer-hover:border-neutral-600 peer-hover:bg-neutral-800",
    focus:
      "peer-focus-visible:outline-neutral-400 peer-focus-visible:ring-neutral-400/35 peer-focus-visible:ring-offset-[#09090b]",
    colors: {
      neutral: {
        box: "peer-checked:border-neutral-700 peer-checked:bg-neutral-700 peer-hover:peer-checked:border-neutral-900 peer-hover:peer-checked:bg-neutral-900",
        dot: "bg-white",
      },
      primary: {
        box: "peer-checked:border-blue-300 peer-checked:bg-blue-300 peer-hover:peer-checked:border-blue-200 peer-hover:peer-checked:bg-blue-200",
        dot: "bg-neutral-950",
      },
      secondary: {
        box: "peer-checked:border-purple-300 peer-checked:bg-purple-300 peer-hover:peer-checked:border-purple-200 peer-hover:peer-checked:bg-purple-200",
        dot: "bg-neutral-950",
      },
      success: {
        box: "peer-checked:border-green-300 peer-checked:bg-green-300 peer-hover:peer-checked:border-green-200 peer-hover:peer-checked:bg-green-200",
        dot: "bg-neutral-950",
      },
      danger: {
        box: "peer-checked:border-red-300 peer-checked:bg-red-300 peer-hover:peer-checked:border-red-200 peer-hover:peer-checked:bg-red-200",
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
        box: "peer-checked:border-neutral-100 peer-checked:bg-neutral-100 peer-hover:peer-checked:border-neutral-200 peer-hover:peer-checked:bg-neutral-200",
        dot: "bg-neutral-950",
      },
      dark: {
        box: "peer-checked:border-neutral-950 peer-checked:bg-neutral-950 peer-hover:peer-checked:border-neutral-800 peer-hover:peer-checked:bg-neutral-800",
        dot: "bg-white",
      },
    },
    invalid: "border-red-500/70 peer-checked:border-red-300 peer-checked:bg-red-300 peer-hover:peer-checked:border-red-200 peer-hover:peer-checked:bg-red-200",
    invalidDot: "bg-neutral-950",
  },
};
