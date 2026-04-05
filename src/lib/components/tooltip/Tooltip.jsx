import { cn } from "@/lib/utils";
import Popover from "@/lib/components/popover/Popover";
import { useQuickitTheme } from "@/lib/theme";

const TOOLTIP_BASE_CLASSES = [
  "!max-w-[16rem] !rounded-[0.875rem] !px-2.5 !py-1.5",
  "!text-xs !leading-5",
].join(" ");

const TOOLTIP_COLOR_CLASSES = {
  default: "!border-slate-900 !bg-slate-900 !text-white dark:!border-zinc-800 dark:!bg-zinc-800 dark:!text-stone-50",
  neutral: "!border-neutral-900 !bg-neutral-900 !text-white dark:!border-neutral-700 dark:!bg-neutral-700 dark:!text-white",
  primary: "!border-blue-700 !bg-blue-700 !text-white dark:!border-blue-400 dark:!bg-blue-400 dark:!text-slate-950",
  brand: "!border-brand-700 !bg-brand-700 !text-white dark:!border-brand-400 dark:!bg-brand-400 dark:!text-slate-950",
  success: "!border-emerald-600 !bg-emerald-600 !text-white dark:!border-emerald-400 dark:!bg-emerald-400 dark:!text-slate-950",
  danger: "!border-red-600 !bg-red-600 !text-white dark:!border-red-400 dark:!bg-red-400 dark:!text-slate-950",
  warning: "!border-amber-400 !bg-amber-400 !text-slate-950 dark:!border-amber-300 dark:!bg-amber-300 dark:!text-slate-950",
  info: "!border-sky-600 !bg-sky-600 !text-white dark:!border-sky-400 dark:!bg-sky-400 dark:!text-slate-950",
  light: "!border-slate-200 !bg-white !text-slate-700 dark:!border-slate-200 dark:!bg-slate-100 dark:!text-slate-950",
  dark: "!border-slate-950 !bg-slate-950 !text-white dark:!border-slate-700 dark:!bg-slate-900 dark:!text-white",
};

export default function Tooltip({
  children,
  className = "",
  color = "default",
  content,
  placement = "top",
  ...props
}) {
  const theme = useQuickitTheme();
  const resolvedTheme = theme === "dark" ? "dark" : "light";
  const resolvedColor = TOOLTIP_COLOR_CLASSES[color] ? color : "default";

  return (
    <Popover
      content={content}
      color={resolvedColor === "default" ? "dark" : resolvedColor}
      placement={placement}
      trigger="hover"
      showArrow
      arrowWidth={12}
      arrowHeight={6}
      arrowTipRadius={1.5}
      arrowStrokeWidth={0.75}
      arrowFill={resolvedTheme === "dark" ? "#27272a" : "#0f172a"}
      arrowStroke={resolvedTheme === "dark" ? "#27272a" : "#0f172a"}
      className={cn(TOOLTIP_BASE_CLASSES, TOOLTIP_COLOR_CLASSES[resolvedColor], className)}
      {...props}
    >
      {children}
    </Popover>
  );
}
