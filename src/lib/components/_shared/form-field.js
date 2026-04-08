import {
  QUICKIT_SEMANTIC_COLORS,
  resolveQuickitToken,
} from "@/lib/tokens";

export const FORM_FIELD_THEME_CLASSES = {
  light: {
    neutral: {
      base: "border-slate-300 bg-white text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.05)] focus-visible:border-slate-500 focus-visible:ring-slate-400/50",
      hover: "hover:border-slate-400",
    },
    slate: {
      base: "border-slate-300 bg-slate-50 text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.05)] focus-visible:border-slate-500 focus-visible:ring-slate-400/50",
      hover: "hover:border-slate-400",
    },
    zinc: {
      base: "border-zinc-300 bg-zinc-50 text-zinc-950 shadow-[0_1px_2px_rgba(24,24,27,0.05)] focus-visible:border-zinc-500 focus-visible:ring-zinc-400/50",
      hover: "hover:border-zinc-400",
    },
    primary: {
      base: "border-sky-300/90 bg-sky-50/85 text-slate-950 shadow-[0_1px_2px_rgba(14,165,233,0.06)] focus-visible:border-sky-500 focus-visible:ring-sky-400/45",
      hover: "hover:border-sky-400",
    },
    brand: {
      base: "border-brand-300/90 bg-brand-50/80 text-slate-950 shadow-[0_1px_2px_rgba(112,56,255,0.08)] focus-visible:border-brand-500 focus-visible:ring-brand-400/45",
      hover: "hover:border-brand-400",
    },
    success: {
      base: "border-emerald-300/90 bg-emerald-50/80 text-slate-950 shadow-[0_1px_2px_rgba(16,185,129,0.06)] focus-visible:border-emerald-500 focus-visible:ring-emerald-400/45",
      hover: "hover:border-emerald-400",
    },
    danger: {
      base: "border-rose-300/90 bg-rose-50/80 text-slate-950 shadow-[0_1px_2px_rgba(244,63,94,0.06)] focus-visible:border-rose-500 focus-visible:ring-rose-400/45",
      hover: "hover:border-rose-400",
    },
    warning: {
      base: "border-amber-300/90 bg-amber-50/85 text-slate-950 shadow-[0_1px_2px_rgba(245,158,11,0.06)] focus-visible:border-amber-500 focus-visible:ring-amber-400/45",
      hover: "hover:border-amber-400",
    },
    info: {
      base: "border-cyan-300/90 bg-cyan-50/80 text-slate-950 shadow-[0_1px_2px_rgba(6,182,212,0.06)] focus-visible:border-cyan-500 focus-visible:ring-cyan-400/45",
      hover: "hover:border-cyan-400",
    },
    light: {
      base: "border-stone-300 bg-stone-50 text-stone-900 shadow-[0_1px_2px_rgba(120,113,108,0.05)] focus-visible:border-stone-500 focus-visible:ring-stone-400/45",
      hover: "hover:border-stone-400",
    },
    dark: {
      base: "border-zinc-800 bg-zinc-900 text-white shadow-[0_1px_2px_rgba(24,24,27,0.2)] focus-visible:border-zinc-700 focus-visible:ring-zinc-700/32",
      hover: "hover:border-zinc-900",
    },
    black: {
      base: "border-zinc-950 bg-zinc-950 text-white shadow-[0_1px_2px_rgba(0,0,0,0.28)] focus-visible:border-zinc-700 focus-visible:ring-zinc-700/32",
      hover: "hover:border-black",
    },
    invalid: "border-rose-300 bg-rose-50 text-rose-950 shadow-[0_1px_2px_rgba(239,68,68,0.07)] focus-visible:border-rose-500 focus-visible:ring-rose-400/45",
  },
  dark: {
    neutral: {
      base: "border-zinc-700 bg-zinc-950 text-stone-50 shadow-[0_1px_2px_rgba(0,0,0,0.38)] focus-visible:border-zinc-500 focus-visible:ring-zinc-500/32",
      hover: "hover:border-zinc-500",
    },
    slate: {
      base: "border-slate-700 bg-slate-900 text-slate-50 shadow-[0_1px_2px_rgba(0,0,0,0.36)] focus-visible:border-slate-500 focus-visible:ring-slate-600/30",
      hover: "hover:border-slate-600",
    },
    zinc: {
      base: "border-zinc-700 bg-zinc-900 text-zinc-50 shadow-[0_1px_2px_rgba(0,0,0,0.36)] focus-visible:border-zinc-500 focus-visible:ring-zinc-600/30",
      hover: "hover:border-zinc-600",
    },
    primary: {
      base: "border-sky-500/55 bg-sky-500/18 text-stone-50 shadow-[0_1px_2px_rgba(14,165,233,0.12)] focus-visible:border-sky-300/90 focus-visible:ring-sky-400/30",
      hover: "hover:border-sky-400/70",
    },
    brand: {
      base: "border-brand-500/55 bg-brand-500/18 text-stone-50 shadow-[0_1px_2px_rgba(112,56,255,0.14)] focus-visible:border-brand-300/90 focus-visible:ring-brand-400/30",
      hover: "hover:border-brand-400/70",
    },
    success: {
      base: "border-emerald-500/55 bg-emerald-500/18 text-stone-50 shadow-[0_1px_2px_rgba(16,185,129,0.12)] focus-visible:border-emerald-300/90 focus-visible:ring-emerald-400/30",
      hover: "hover:border-emerald-400/70",
    },
    danger: {
      base: "border-rose-500/55 bg-rose-500/18 text-stone-50 shadow-[0_1px_2px_rgba(244,63,94,0.12)] focus-visible:border-rose-300/90 focus-visible:ring-rose-400/30",
      hover: "hover:border-rose-400/70",
    },
    warning: {
      base: "border-amber-500/55 bg-amber-500/18 text-stone-50 shadow-[0_1px_2px_rgba(245,158,11,0.12)] focus-visible:border-amber-300/90 focus-visible:ring-amber-400/30",
      hover: "hover:border-amber-400/70",
    },
    info: {
      base: "border-cyan-500/55 bg-cyan-500/18 text-stone-50 shadow-[0_1px_2px_rgba(6,182,212,0.12)] focus-visible:border-cyan-300/90 focus-visible:ring-cyan-400/30",
      hover: "hover:border-cyan-400/70",
    },
    light: {
      base: "border-stone-300/70 bg-stone-100 text-stone-950 shadow-[0_1px_2px_rgba(245,245,244,0.05)] focus-visible:border-stone-200 focus-visible:ring-stone-300/30",
      hover: "hover:border-stone-200/85",
    },
    dark: {
      base: "border-zinc-700 bg-zinc-950 text-white shadow-[0_1px_2px_rgba(0,0,0,0.4)] focus-visible:border-zinc-500 focus-visible:ring-zinc-600/35",
      hover: "hover:border-zinc-600",
    },
    black: {
      base: "border-zinc-600 bg-black text-white shadow-[0_1px_2px_rgba(0,0,0,0.42)] focus-visible:border-zinc-400 focus-visible:ring-zinc-500/35",
      hover: "hover:border-zinc-500",
    },
    invalid: "border-rose-500/70 bg-rose-500/16 text-stone-50 shadow-[0_1px_2px_rgba(239,68,68,0.14)] focus-visible:border-rose-400/90 focus-visible:ring-rose-500/25",
  },
};

const FORM_FIELD_AUTOFILL_TOKENS = {
  light: {
    neutral: {
      background: "var(--color-slate-100)",
      border: "var(--color-slate-400)",
      text: "var(--color-slate-950)",
    },
    slate: {
      background: "var(--color-slate-100)",
      border: "var(--color-slate-500)",
      text: "var(--color-slate-950)",
    },
    zinc: {
      background: "var(--color-zinc-100)",
      border: "var(--color-zinc-500)",
      text: "var(--color-zinc-950)",
    },
    primary: {
      background: "var(--color-sky-100)",
      border: "var(--color-sky-400)",
      text: "var(--color-slate-950)",
    },
    brand: {
      background: "var(--color-brand-100)",
      border: "var(--color-brand-400)",
      text: "var(--color-slate-950)",
    },
    success: {
      background: "var(--color-emerald-100)",
      border: "var(--color-emerald-400)",
      text: "var(--color-slate-950)",
    },
    danger: {
      background: "var(--color-rose-100)",
      border: "var(--color-rose-400)",
      text: "var(--color-slate-950)",
    },
    warning: {
      background: "var(--color-amber-100)",
      border: "var(--color-amber-400)",
      text: "var(--color-slate-950)",
    },
    info: {
      background: "var(--color-cyan-100)",
      border: "var(--color-cyan-400)",
      text: "var(--color-slate-950)",
    },
    light: {
      background: "var(--color-stone-100)",
      border: "var(--color-stone-400)",
      text: "var(--color-stone-900)",
    },
    dark: {
      background: "color-mix(in oklab, var(--color-zinc-800) 88%, black)",
      border: "var(--color-zinc-700)",
      text: "white",
    },
    black: {
      background: "color-mix(in oklab, var(--color-zinc-900) 92%, black)",
      border: "var(--color-zinc-800)",
      text: "white",
    },
    invalid: {
      background: "var(--color-rose-100)",
      border: "var(--color-rose-400)",
      text: "var(--color-rose-950)",
    },
  },
  dark: {
    neutral: {
      background: "var(--color-zinc-900)",
      border: "var(--color-zinc-600)",
      text: "var(--color-stone-50)",
    },
    slate: {
      background: "var(--color-slate-800)",
      border: "var(--color-slate-600)",
      text: "var(--color-slate-50)",
    },
    zinc: {
      background: "var(--color-zinc-800)",
      border: "var(--color-zinc-600)",
      text: "var(--color-zinc-50)",
    },
    primary: {
      background:
        "color-mix(in oklab, var(--color-sky-500) 28%, var(--color-zinc-950))",
      border: "var(--color-sky-400)",
      text: "var(--color-stone-50)",
    },
    brand: {
      background:
        "color-mix(in oklab, var(--color-brand-500) 28%, var(--color-zinc-950))",
      border: "var(--color-brand-400)",
      text: "var(--color-stone-50)",
    },
    success: {
      background:
        "color-mix(in oklab, var(--color-emerald-500) 28%, var(--color-zinc-950))",
      border: "var(--color-emerald-400)",
      text: "var(--color-stone-50)",
    },
    danger: {
      background:
        "color-mix(in oklab, var(--color-rose-500) 28%, var(--color-zinc-950))",
      border: "var(--color-rose-400)",
      text: "var(--color-stone-50)",
    },
    warning: {
      background:
        "color-mix(in oklab, var(--color-amber-500) 28%, var(--color-zinc-950))",
      border: "var(--color-amber-400)",
      text: "var(--color-stone-50)",
    },
    info: {
      background:
        "color-mix(in oklab, var(--color-cyan-500) 28%, var(--color-zinc-950))",
      border: "var(--color-cyan-400)",
      text: "var(--color-stone-50)",
    },
    light: {
      background: "var(--color-stone-200)",
      border: "var(--color-stone-400)",
      text: "var(--color-stone-950)",
    },
    dark: {
      background: "var(--color-zinc-900)",
      border: "var(--color-zinc-600)",
      text: "white",
    },
    black: {
      background: "color-mix(in oklab, var(--color-zinc-900) 90%, black)",
      border: "var(--color-zinc-500)",
      text: "white",
    },
    invalid: {
      background:
        "color-mix(in oklab, var(--color-rose-500) 26%, var(--color-zinc-950))",
      border: "var(--color-rose-400)",
      text: "var(--color-stone-50)",
    },
  },
};

export function resolveFormFieldTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

export function resolveFormFieldColor(color) {
  return resolveQuickitToken(QUICKIT_SEMANTIC_COLORS, color, "neutral");
}

export function getFormFieldAutofillStyle({
  color = "neutral",
  invalid = false,
  style,
  theme = "light",
}) {
  const resolvedTheme = resolveFormFieldTheme(theme);
  const resolvedColor = resolveFormFieldColor(color);
  const autofillTokens = invalid
    ? FORM_FIELD_AUTOFILL_TOKENS[resolvedTheme].invalid
    : FORM_FIELD_AUTOFILL_TOKENS[resolvedTheme][resolvedColor];

  // Chrome y Safari pintan autofill fuera del sistema visual del componente.
  // Estas variables nos dejan recolorearlo según tema y variante sin duplicar
  // reglas CSS por componente.
  return {
    ...style,
    "--qi-field-autofill-bg": autofillTokens.background,
    "--qi-field-autofill-border": autofillTokens.border,
    "--qi-field-autofill-text": autofillTokens.text,
    "--qi-field-autofill-caret": autofillTokens.text,
  };
}
