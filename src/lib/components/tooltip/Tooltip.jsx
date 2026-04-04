import { cn } from "@/lib/utils";
import Popover from "@/lib/components/popover/Popover";
import { useQuickitTheme } from "@/lib/theme";

const TOOLTIP_BASE_CLASSES = [
  "!max-w-[16rem] !rounded-[0.875rem] !px-2.5 !py-1.5",
  "!text-xs !leading-5",
  "!border-slate-900 !bg-slate-900 !text-white",
  "dark:!border-zinc-800 dark:!bg-zinc-800 dark:!text-stone-50",
].join(" ");

export default function Tooltip({
  children,
  className = "",
  content,
  placement = "top",
  ...props
}) {
  const theme = useQuickitTheme();
  const resolvedTheme = theme === "dark" ? "dark" : "light";

  return (
    <Popover
      content={content}
      placement={placement}
      trigger="hover"
      showArrow
      arrowWidth={12}
      arrowHeight={6}
      arrowTipRadius={1.5}
      arrowStrokeWidth={0.75}
      arrowFill={resolvedTheme === "dark" ? "#27272a" : "#0f172a"}
      arrowStroke={resolvedTheme === "dark" ? "#27272a" : "#0f172a"}
      className={cn(TOOLTIP_BASE_CLASSES, className)}
      {...props}
    >
      {children}
    </Popover>
  );
}
