import {
  QUICKIT_SEMANTIC_COLORS,
  resolveQuickitToken,
} from "@/lib/tokens";

export const FORM_FIELD_THEME_CLASSES = {
  light: {
    neutral: {
      base: "border-slate-300 bg-white text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus-visible:border-slate-500 focus-visible:ring-slate-400/25",
      hover: "hover:border-slate-400 hover:bg-slate-50/45",
    },
    primary: {
      base: "border-sky-300 bg-sky-50/55 text-slate-950 shadow-[0_1px_2px_rgba(14,165,233,0.08)] focus-visible:border-sky-500 focus-visible:ring-sky-300/45",
      hover: "hover:border-sky-400 hover:bg-sky-100/65",
    },
    brand: {
      base: "border-brand-300 bg-brand-50/60 text-slate-950 shadow-[0_1px_2px_rgba(112,56,255,0.08)] focus-visible:border-brand-500 focus-visible:ring-brand-300/45",
      hover: "hover:border-brand-400 hover:bg-brand-100/70",
    },
    success: {
      base: "border-emerald-300 bg-emerald-50/55 text-slate-950 shadow-[0_1px_2px_rgba(16,185,129,0.08)] focus-visible:border-emerald-500 focus-visible:ring-emerald-300/45",
      hover: "hover:border-emerald-400 hover:bg-emerald-100/65",
    },
    danger: {
      base: "border-rose-300 bg-rose-50/55 text-slate-950 shadow-[0_1px_2px_rgba(244,63,94,0.08)] focus-visible:border-rose-500 focus-visible:ring-rose-300/45",
      hover: "hover:border-rose-400 hover:bg-rose-100/65",
    },
    warning: {
      base: "border-amber-300 bg-amber-50/65 text-slate-950 shadow-[0_1px_2px_rgba(245,158,11,0.08)] focus-visible:border-amber-500 focus-visible:ring-amber-300/45",
      hover: "hover:border-amber-400 hover:bg-amber-100/75",
    },
    info: {
      base: "border-cyan-300 bg-cyan-50/55 text-slate-950 shadow-[0_1px_2px_rgba(6,182,212,0.08)] focus-visible:border-cyan-500 focus-visible:ring-cyan-300/45",
      hover: "hover:border-cyan-400 hover:bg-cyan-100/65",
    },
    light: {
      base: "border-stone-300 bg-stone-50 text-stone-900 shadow-[0_1px_2px_rgba(120,113,108,0.06)] focus-visible:border-stone-400 focus-visible:ring-stone-300/45",
      hover: "hover:border-stone-400 hover:bg-stone-100",
    },
    dark: {
      base: "border-slate-950 bg-slate-950 text-white shadow-[0_1px_2px_rgba(15,23,42,0.18)] focus-visible:border-slate-700 focus-visible:ring-slate-800/35",
      hover: "hover:border-slate-800 hover:bg-slate-900",
    },
    invalid: "border-red-400 bg-red-50/60 text-red-950 shadow-[0_1px_2px_rgba(239,68,68,0.1)] focus-visible:border-red-500 focus-visible:ring-red-200/85",
  },
  dark: {
    neutral: {
      base: "border-zinc-800 bg-zinc-900/80 text-stone-50 shadow-[0_1px_2px_rgba(0,0,0,0.32)] focus-visible:border-zinc-500 focus-visible:ring-zinc-600/30",
      hover: "hover:border-zinc-700 hover:bg-zinc-900",
    },
    primary: {
      base: "border-sky-500/45 bg-sky-500/14 text-stone-50 shadow-[0_1px_2px_rgba(14,165,233,0.12)] focus-visible:border-sky-300/85 focus-visible:ring-sky-400/30",
      hover: "hover:border-sky-400/60 hover:bg-sky-500/18",
    },
    brand: {
      base: "border-brand-500/45 bg-brand-500/14 text-stone-50 shadow-[0_1px_2px_rgba(112,56,255,0.14)] focus-visible:border-brand-300/85 focus-visible:ring-brand-400/30",
      hover: "hover:border-brand-400/60 hover:bg-brand-500/18",
    },
    success: {
      base: "border-emerald-500/45 bg-emerald-500/14 text-stone-50 shadow-[0_1px_2px_rgba(16,185,129,0.12)] focus-visible:border-emerald-300/85 focus-visible:ring-emerald-400/30",
      hover: "hover:border-emerald-400/60 hover:bg-emerald-500/18",
    },
    danger: {
      base: "border-rose-500/45 bg-rose-500/14 text-stone-50 shadow-[0_1px_2px_rgba(244,63,94,0.12)] focus-visible:border-rose-300/85 focus-visible:ring-rose-400/30",
      hover: "hover:border-rose-400/60 hover:bg-rose-500/18",
    },
    warning: {
      base: "border-amber-500/45 bg-amber-500/14 text-stone-50 shadow-[0_1px_2px_rgba(245,158,11,0.12)] focus-visible:border-amber-300/85 focus-visible:ring-amber-400/30",
      hover: "hover:border-amber-400/60 hover:bg-amber-500/18",
    },
    info: {
      base: "border-cyan-500/45 bg-cyan-500/14 text-stone-50 shadow-[0_1px_2px_rgba(6,182,212,0.12)] focus-visible:border-cyan-300/85 focus-visible:ring-cyan-400/30",
      hover: "hover:border-cyan-400/60 hover:bg-cyan-500/18",
    },
    light: {
      base: "border-stone-300/45 bg-stone-100 text-stone-950 shadow-[0_1px_2px_rgba(245,245,244,0.05)] focus-visible:border-stone-200 focus-visible:ring-stone-200/45",
      hover: "hover:border-stone-200/70 hover:bg-stone-50",
    },
    dark: {
      base: "border-zinc-700 bg-black text-white shadow-[0_1px_2px_rgba(0,0,0,0.4)] focus-visible:border-zinc-400 focus-visible:ring-zinc-600/35",
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
