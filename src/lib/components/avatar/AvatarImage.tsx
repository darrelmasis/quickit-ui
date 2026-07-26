import { forwardRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAvatarContext } from "./avatar.context";
import { AVATAR_PRIMITIVES } from "./avatar.constants";

const AvatarImage = forwardRef(function AvatarImage(
  { alt = "", className, onError, onLoad, src, ...props },
  ref,
) {
  const { setStatus, status } = useAvatarContext("AvatarImage");

  useEffect(() => {
    setStatus(src ? "loading" : "error");
  }, [setStatus, src]);

  return (
    <img
      ref={ref}
      alt={alt}
      src={src}
      className={cn(
        AVATAR_PRIMITIVES.image,
        status === "loaded" ? "block" : "hidden",
        className,
      )}
      onLoad={(event) => {
        setStatus("loaded");
        onLoad?.(event);
      }}
      onError={(event) => {
        setStatus("error");
        onError?.(event);
      }}
      {...props}
    />
  );
});

export default AvatarImage;
