import { forwardRef, useContext } from "react";
import { cn } from "@/lib/utils";
import { AvatarContext } from "./avatar.context";
import {
  AVATAR_PRESENCE_MARKER,
  AVATAR_PRESENCE_SIZE_CLASSES,
  AVATAR_PRESENCE_STATUS_CLASSES,
  AVATAR_PRESENCE_STATUS_LABELS,
  AVATAR_PRESENCE_TRANSLATE_RATIO,
} from "./avatar.constants";
import { resolveAvatarSize, resolvePresenceStatus } from "./avatar.utils";

const AvatarPresence = forwardRef(function AvatarPresence(
  { className, label, size, status = "online", ...props },
  ref,
) {
  const context = useContext(AvatarContext);
  const resolvedStatus = resolvePresenceStatus(status);
  const resolvedSize = resolveAvatarSize(size ?? context?.size);
  const sizeClasses =
    AVATAR_PRESENCE_SIZE_CLASSES[resolvedSize] ??
    AVATAR_PRESENCE_SIZE_CLASSES.md;

  return (
    <span
      ref={ref}
      data-slot="avatar-presence"
      role="status"
      aria-label={label ?? AVATAR_PRESENCE_STATUS_LABELS[resolvedStatus]}
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full",
        sizeClasses.outer,
        className,
      )}
      style={{
        transform: `translate(${AVATAR_PRESENCE_TRANSLATE_RATIO * 100}%, ${AVATAR_PRESENCE_TRANSLATE_RATIO * 100}%)`,
      }}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex rounded-full",
          sizeClasses.inner,
          AVATAR_PRESENCE_STATUS_CLASSES[resolvedStatus],
        )}
      />
    </span>
  );
});

AvatarPresence.displayName = "AvatarPresence";
AvatarPresence[AVATAR_PRESENCE_MARKER] = true;

export default AvatarPresence;
