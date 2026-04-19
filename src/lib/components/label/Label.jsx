import { forwardRef } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { cn } from "@/lib/utils";

const LABEL_THEME_CLASSES = {
  light: "text-slate-950/85",
  dark: "text-zinc-50/85",
};

const LABEL_SIZE_CLASSES = {
  sm: "text-xs px-0.5",
  md: "text-[0.85rem] px-0.1",
};

const Label = forwardRef(function Label(
  { children, className, size = "md", ...props },
  ref,
) {
  const { theme } = useQuickitControlState("label");

  return (
    <label
      ref={ref}
      className={cn(
        "inline-block font-medium tracking-[-0.01em]",
        LABEL_THEME_CLASSES[theme],
        LABEL_SIZE_CLASSES[size] ?? LABEL_SIZE_CLASSES.md,
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
});

export { Label };
export default Label;
