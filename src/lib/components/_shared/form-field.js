import {
  QUICKIT_SEMANTIC_COLORS,
  resolveQuickitToken,
} from "@/lib/tokens";

export const FORM_FIELD_THEME_CLASSES = {
  light: {
    neutral: {
      base: "border-slate-500 bg-slate-200/90 text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.06)] focus-visible:border-slate-700 focus-visible:ring-slate-600/22",
      hover: "hover:border-slate-600 hover:bg-slate-200",
    },
    slate: {
      base: "border-slate-600 bg-slate-300 text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.06)] focus-visible:border-slate-800 focus-visible:ring-slate-700/20",
      hover: "hover:border-slate-700 hover:bg-slate-400/95",
    },
    zinc: {
      base: "border-zinc-600 bg-zinc-300 text-zinc-950 shadow-[0_1px_2px_rgba(24,24,27,0.06)] focus-visible:border-zinc-800 focus-visible:ring-zinc-700/20",
      hover: "hover:border-zinc-700 hover:bg-zinc-400/95",
    },
    primary: {
      base: "border-sky-400/85 bg-sky-100/80 text-slate-950 shadow-[0_1px_2px_rgba(14,165,233,0.08)] focus-visible:border-sky-600 focus-visible:ring-sky-400/25",
      hover: "hover:border-sky-500 hover:bg-sky-100",
    },
    brand: {
      base: "border-brand-400/80 bg-brand-100/75 text-slate-950 shadow-[0_1px_2px_rgba(112,56,255,0.1)] focus-visible:border-brand-600 focus-visible:ring-brand-400/25",
      hover: "hover:border-brand-500 hover:bg-brand-100",
    },
    success: {
      base: "border-emerald-400/85 bg-emerald-100/75 text-slate-950 shadow-[0_1px_2px_rgba(16,185,129,0.08)] focus-visible:border-emerald-600 focus-visible:ring-emerald-400/25",
      hover: "hover:border-emerald-500 hover:bg-emerald-100",
    },
    danger: {
      base: "border-rose-400/85 bg-rose-100/75 text-slate-950 shadow-[0_1px_2px_rgba(244,63,94,0.08)] focus-visible:border-rose-600 focus-visible:ring-rose-400/25",
      hover: "hover:border-rose-500 hover:bg-rose-100",
    },
    warning: {
      base: "border-amber-400/85 bg-amber-100/80 text-slate-950 shadow-[0_1px_2px_rgba(245,158,11,0.08)] focus-visible:border-amber-600 focus-visible:ring-amber-400/25",
      hover: "hover:border-amber-500 hover:bg-amber-100",
    },
    info: {
      base: "border-cyan-400/85 bg-cyan-100/75 text-slate-950 shadow-[0_1px_2px_rgba(6,182,212,0.08)] focus-visible:border-cyan-600 focus-visible:ring-cyan-400/25",
      hover: "hover:border-cyan-500 hover:bg-cyan-100",
    },
    light: {
      base: "border-stone-300 bg-stone-100/90 text-stone-900 shadow-[0_1px_2px_rgba(120,113,108,0.06)] focus-visible:border-stone-500 focus-visible:ring-stone-400/25",
      hover: "hover:border-stone-400 hover:bg-stone-100",
    },
    dark: {
      base: "border-zinc-800 bg-zinc-900 text-white shadow-[0_1px_2px_rgba(24,24,27,0.2)] focus-visible:border-zinc-700 focus-visible:ring-zinc-700/32",
      hover: "hover:border-zinc-900 hover:bg-zinc-950",
    },
    black: {
      base: "border-zinc-950 bg-zinc-950 text-white shadow-[0_1px_2px_rgba(0,0,0,0.28)] focus-visible:border-zinc-700 focus-visible:ring-zinc-700/32",
      hover: "hover:border-black hover:bg-black",
    },
    invalid: "border-rose-400 bg-rose-100/75 text-rose-950 shadow-[0_1px_2px_rgba(239,68,68,0.1)] focus-visible:border-rose-600 focus-visible:ring-rose-300/35",
  },
  dark: {
    neutral: {
      base: "border-zinc-700 bg-zinc-950 text-stone-50 shadow-[0_1px_2px_rgba(0,0,0,0.38)] focus-visible:border-zinc-500 focus-visible:ring-zinc-500/32",
      hover: "hover:border-zinc-600 hover:bg-zinc-900/95",
    },
    slate: {
      base: "border-slate-700 bg-slate-900 text-slate-50 shadow-[0_1px_2px_rgba(0,0,0,0.36)] focus-visible:border-slate-500 focus-visible:ring-slate-600/30",
      hover: "hover:border-slate-600 hover:bg-slate-800/95",
    },
    zinc: {
      base: "border-zinc-700 bg-zinc-900 text-zinc-50 shadow-[0_1px_2px_rgba(0,0,0,0.36)] focus-visible:border-zinc-500 focus-visible:ring-zinc-600/30",
      hover: "hover:border-zinc-600 hover:bg-zinc-800/95",
    },
    primary: {
      base: "border-sky-500/55 bg-sky-500/18 text-stone-50 shadow-[0_1px_2px_rgba(14,165,233,0.12)] focus-visible:border-sky-300/90 focus-visible:ring-sky-400/30",
      hover: "hover:border-sky-400/70 hover:bg-sky-500/22",
    },
    brand: {
      base: "border-brand-500/55 bg-brand-500/18 text-stone-50 shadow-[0_1px_2px_rgba(112,56,255,0.14)] focus-visible:border-brand-300/90 focus-visible:ring-brand-400/30",
      hover: "hover:border-brand-400/70 hover:bg-brand-500/22",
    },
    success: {
      base: "border-emerald-500/55 bg-emerald-500/18 text-stone-50 shadow-[0_1px_2px_rgba(16,185,129,0.12)] focus-visible:border-emerald-300/90 focus-visible:ring-emerald-400/30",
      hover: "hover:border-emerald-400/70 hover:bg-emerald-500/22",
    },
    danger: {
      base: "border-rose-500/55 bg-rose-500/18 text-stone-50 shadow-[0_1px_2px_rgba(244,63,94,0.12)] focus-visible:border-rose-300/90 focus-visible:ring-rose-400/30",
      hover: "hover:border-rose-400/70 hover:bg-rose-500/22",
    },
    warning: {
      base: "border-amber-500/55 bg-amber-500/18 text-stone-50 shadow-[0_1px_2px_rgba(245,158,11,0.12)] focus-visible:border-amber-300/90 focus-visible:ring-amber-400/30",
      hover: "hover:border-amber-400/70 hover:bg-amber-500/22",
    },
    info: {
      base: "border-cyan-500/55 bg-cyan-500/18 text-stone-50 shadow-[0_1px_2px_rgba(6,182,212,0.12)] focus-visible:border-cyan-300/90 focus-visible:ring-cyan-400/30",
      hover: "hover:border-cyan-400/70 hover:bg-cyan-500/22",
    },
    light: {
      base: "border-stone-300/70 bg-stone-100 text-stone-950 shadow-[0_1px_2px_rgba(245,245,244,0.05)] focus-visible:border-stone-200 focus-visible:ring-stone-300/30",
      hover: "hover:border-stone-200/85 hover:bg-stone-50",
    },
    dark: {
      base: "border-zinc-700 bg-zinc-950 text-white shadow-[0_1px_2px_rgba(0,0,0,0.4)] focus-visible:border-zinc-500 focus-visible:ring-zinc-600/35",
      hover: "hover:border-zinc-600 hover:bg-black",
    },
    black: {
      base: "border-zinc-600 bg-black text-white shadow-[0_1px_2px_rgba(0,0,0,0.42)] focus-visible:border-zinc-400 focus-visible:ring-zinc-500/35",
      hover: "hover:border-zinc-500 hover:bg-zinc-950",
    },
    invalid: "border-rose-500/70 bg-rose-500/16 text-stone-50 shadow-[0_1px_2px_rgba(239,68,68,0.14)] focus-visible:border-rose-400/90 focus-visible:ring-rose-500/25",
  },
};

export function resolveFormFieldTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

export function resolveFormFieldColor(color) {
  return resolveQuickitToken(QUICKIT_SEMANTIC_COLORS, color, "neutral");
}
