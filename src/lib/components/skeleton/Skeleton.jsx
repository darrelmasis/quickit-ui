import { forwardRef } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { SKELETON_THEME_CLASSES } from "@/lib/theme/theme-classes";
import { cn } from "@/lib/utils";

const SKELETON_SHAPE_CLASSES = {
  line: "h-4 w-full rounded-full",
  rect: "h-24 w-full rounded-[1rem]",
  circle: "size-12 rounded-full",
};



const Skeleton = forwardRef(function Skeleton(
  { animated = true, className, shape = "line", ...props },
  ref,
) {
  const { theme } = useQuickitControlState("skeleton");

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
