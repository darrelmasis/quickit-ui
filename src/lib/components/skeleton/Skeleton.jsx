import { forwardRef } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const SKELETON_THEME_CLASSES = {
  light: "bg-slate-200",
  dark: "bg-zinc-800",
};

const SKELETON_SHAPE_CLASSES = {
  line: "h-4 w-full rounded-full",
  rect: "h-24 w-full rounded-[1rem]",
  circle: "size-12 rounded-full",
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

const Skeleton = forwardRef(function Skeleton(
  { animated = true, className, shape = "line", ...props },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        SKELETON_SHAPE_CLASSES[shape] ?? SKELETON_SHAPE_CLASSES.line,
        SKELETON_THEME_CLASSES[theme],
        animated && "animate-pulse",
        className,
      )}
      {...props}
    />
  );
});

export { Skeleton };
export default Skeleton;
