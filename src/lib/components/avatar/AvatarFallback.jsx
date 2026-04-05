import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useAvatarContext } from "./avatar.context";
import { AVATAR_PRIMITIVES, AVATAR_SIZE_CLASSES } from "./avatar.constants";

const AvatarFallback = forwardRef(function AvatarFallback(
  { children, className, ...props },
  ref,
) {
  const { size, status } = useAvatarContext("AvatarFallback");

  if (status === "loaded") {
    return null;
  }

  return (
    <span
      ref={ref}
      className={cn(
        AVATAR_PRIMITIVES.fallback,
        AVATAR_SIZE_CLASSES[size].fallback,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});

export default AvatarFallback;
