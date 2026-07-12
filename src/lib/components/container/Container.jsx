import { createElement, forwardRef } from "react";
import { cn } from "@/lib/utils";

const CONTAINER_MAX_WIDTHS = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[90rem]",
  "2xl": "max-w-[96rem]",
  full: "max-w-full",
};

const CONTAINER_PADDING = {
  none: "px-0",
  sm: "px-4 sm:px-6",
  md: "px-6 sm:px-8",
  lg: "px-8 sm:px-12",
  xl: "px-10 sm:px-16",
};

const Container = forwardRef(function Container(
  { as, center = true, className, padding = "md", size = "lg", ...props },
  ref,
) {
  return createElement(as ?? "div", {
    ref,
    className: cn(
      "w-full",
      CONTAINER_MAX_WIDTHS[size] ?? CONTAINER_MAX_WIDTHS.lg,
      CONTAINER_PADDING[padding] ?? CONTAINER_PADDING.md,
      center && "mx-auto",
      className
    ),
    ...props,
  });
});

export { Container };
export default Container;
