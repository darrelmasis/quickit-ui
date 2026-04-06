import {
  QUICKIT_SEMANTIC_COLORS,
  resolveQuickitToken,
} from "@/lib/tokens";

export const FORM_FIELD_THEME_CLASSES = {
  light: {
    neutral: {
      base: "border-slate-300 bg-white text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus-visible:border-slate-400 focus-visible:ring-slate-300/35",
      hover: "hover:border-slate-400",
    },
    primary: {
      base: "border-sky-300 bg-sky-50/40 text-slate-950 shadow-[0_1px_2px_rgba(14,165,233,0.08)] focus-visible:border-sky-500 focus-visible:ring-sky-200/80",
      hover: "hover:border-sky-400 hover:bg-sky-50/60",
    },
    brand: {
      base: "border-brand-300 bg-brand-50/45 text-slate-950 shadow-[0_1px_2px_rgba(112,56,255,0.08)] focus-visible:border-brand-500 focus-visible:ring-brand-200/75",
      hover: "hover:border-brand-400 hover:bg-brand-50/60",
    },
    success: {
      base: "border-emerald-300 bg-emerald-50/45 text-slate-950 shadow-[0_1px_2px_rgba(16,185,129,0.08)] focus-visible:border-emerald-500 focus-visible:ring-emerald-200/80",
      hover: "hover:border-emerald-400 hover:bg-emerald-50/65",
    },
    danger: {
      base: "border-rose-300 bg-rose-50/45 text-slate-950 shadow-[0_1px_2px_rgba(244,63,94,0.08)] focus-visible:border-rose-500 focus-visible:ring-rose-200/80",
      hover: "hover:border-rose-400 hover:bg-rose-50/65",
    },
    warning: {
      base: "border-amber-300 bg-amber-50/55 text-slate-950 shadow-[0_1px_2px_rgba(245,158,11,0.08)] focus-visible:border-amber-500 focus-visible:ring-amber-200/80",
      hover: "hover:border-amber-400 hover:bg-amber-50/70",
    },
    info: {
      base: "border-cyan-300 bg-cyan-50/45 text-slate-950 shadow-[0_1px_2px_rgba(6,182,212,0.08)] focus-visible:border-cyan-500 focus-visible:ring-cyan-200/80",
      hover: "hover:border-cyan-400 hover:bg-cyan-50/65",
    },
    light: {
      base: "border-stone-200 bg-stone-50 text-stone-900 shadow-[0_1px_2px_rgba(120,113,108,0.06)] focus-visible:border-stone-300 focus-visible:ring-stone-200/80",
      hover: "hover:border-stone-300 hover:bg-stone-100/80",
    },
    dark: {
      base: "border-slate-950 bg-slate-950 text-white shadow-[0_1px_2px_rgba(15,23,42,0.18)] focus-visible:border-slate-700 focus-visible:ring-slate-900/20",
      hover: "hover:border-slate-800 hover:bg-slate-900",
    },
    invalid: "border-red-400 bg-red-50/60 text-red-950 shadow-[0_1px_2px_rgba(239,68,68,0.1)] focus-visible:border-red-500 focus-visible:ring-red-200/85",
  },
  dark: {
    neutral: {
      base: "border-zinc-800 bg-zinc-950 text-stone-50 shadow-[0_1px_2px_rgba(0,0,0,0.32)] focus-visible:border-zinc-600 focus-visible:ring-zinc-700/45",
      hover: "hover:border-zinc-700 hover:bg-zinc-900/70",
    },
    primary: {
      base: "border-sky-500/35 bg-sky-500/10 text-stone-50 shadow-[0_1px_2px_rgba(14,165,233,0.12)] focus-visible:border-sky-400/75 focus-visible:ring-sky-500/25",
      hover: "hover:border-sky-400/50 hover:bg-sky-500/14",
    },
    brand: {
      base: "border-brand-500/35 bg-brand-500/10 text-stone-50 shadow-[0_1px_2px_rgba(112,56,255,0.14)] focus-visible:border-brand-400/75 focus-visible:ring-brand-500/25",
      hover: "hover:border-brand-400/50 hover:bg-brand-500/14",
    },
    success: {
      base: "border-emerald-500/35 bg-emerald-500/10 text-stone-50 shadow-[0_1px_2px_rgba(16,185,129,0.12)] focus-visible:border-emerald-400/75 focus-visible:ring-emerald-500/25",
      hover: "hover:border-emerald-400/50 hover:bg-emerald-500/14",
    },
    danger: {
      base: "border-rose-500/35 bg-rose-500/10 text-stone-50 shadow-[0_1px_2px_rgba(244,63,94,0.12)] focus-visible:border-rose-400/75 focus-visible:ring-rose-500/25",
      hover: "hover:border-rose-400/50 hover:bg-rose-500/14",
    },
    warning: {
      base: "border-amber-500/35 bg-amber-500/10 text-stone-50 shadow-[0_1px_2px_rgba(245,158,11,0.12)] focus-visible:border-amber-400/75 focus-visible:ring-amber-500/25",
      hover: "hover:border-amber-400/50 hover:bg-amber-500/14",
    },
    info: {
      base: "border-cyan-500/35 bg-cyan-500/10 text-stone-50 shadow-[0_1px_2px_rgba(6,182,212,0.12)] focus-visible:border-cyan-400/75 focus-visible:ring-cyan-500/25",
      hover: "hover:border-cyan-400/50 hover:bg-cyan-500/14",
    },
    light: {
      base: "border-stone-400/35 bg-stone-100 text-stone-950 shadow-[0_1px_2px_rgba(245,245,244,0.05)] focus-visible:border-stone-300 focus-visible:ring-stone-200/35",
      hover: "hover:border-stone-300/60 hover:bg-stone-50",
    },
    dark: {
      base: "border-zinc-700 bg-black text-white shadow-[0_1px_2px_rgba(0,0,0,0.4)] focus-visible:border-zinc-500 focus-visible:ring-zinc-700/55",
      hover: "hover:border-zinc-600 hover:bg-zinc-950",
    },
    invalid: "border-red-500/65 bg-red-500/10 text-stone-50 shadow-[0_1px_2px_rgba(239,68,68,0.14)] focus-visible:border-red-400/85 focus-visible:ring-red-500/25",
  },
};

export function resolveFormFieldTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

export function resolveFormFieldColor(color) {
  return resolveQuickitToken(QUICKIT_SEMANTIC_COLORS, color, "neutral");
}
