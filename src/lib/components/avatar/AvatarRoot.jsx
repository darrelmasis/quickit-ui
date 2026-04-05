import { Children, forwardRef, useId, useMemo, useState } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn, getAvatarRadius } from "@/lib/utils";
import { AvatarContext } from "./avatar.context";
import {
  AVATAR_PRIMITIVES,
  AVATAR_SHAPE_CLASSES,
  AVATAR_SIZE_CLASSES,
  AVATAR_THEME_CLASSES,
} from "./avatar.constants";
import {
  getAvatarPresenceMaskDefinition,
  isAvatarPresenceElement,
  resolveAvatarShape,
  resolveAvatarSize,
  resolveTheme,
  splitAvatarStyle,
} from "./avatar.utils";

const Avatar = forwardRef(function Avatar(
  { children, className, shape = "circle", size = "md", style, ...props },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = AVATAR_THEME_CLASSES[theme];
  const resolvedShape = resolveAvatarShape(shape);
  const resolvedSize = resolveAvatarSize(size);
  const [status, setStatus] = useState("error");
  const maskId = useId().replaceAll(":", "");
  const avatarChildren = Children.toArray(children);
  const presenceChildren = avatarChildren.filter(isAvatarPresenceElement);
  const contentChildren = avatarChildren.filter(
    (child) => !isAvatarPresenceElement(child),
  );
  const firstPresence = presenceChildren.find(isAvatarPresenceElement);
  const resolvedPresenceSize = resolveAvatarSize(
    firstPresence?.props.size ?? resolvedSize,
  );
  const presenceMask = firstPresence
    ? getAvatarPresenceMaskDefinition(resolvedSize, resolvedPresenceSize)
    : null;
  const { rootStyle, shellStyle } = splitAvatarStyle(style);

  const contextValue = useMemo(
    () => ({
      setStatus,
      shape: resolvedShape,
      size: resolvedSize,
      status,
      theme,
    }),
    [resolvedShape, resolvedSize, setStatus, status, theme],
  );

  return (
    <AvatarContext.Provider value={contextValue}>
      <span
        ref={ref}
        data-slot="avatar"
        className={cn(
          AVATAR_PRIMITIVES.root,
          AVATAR_SIZE_CLASSES[resolvedSize].root,
          className,
        )}
        style={rootStyle}
        {...props}
      >
        {presenceMask ? (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute h-0 w-0 overflow-hidden"
            focusable="false"
          >
            <defs>
              <mask
                id={maskId}
                maskContentUnits="objectBoundingBox"
                maskUnits="objectBoundingBox"
              >
                <rect width="1" height="1" fill="white" />
                <circle
                  cx={presenceMask.cx}
                  cy={presenceMask.cy}
                  r={presenceMask.r}
                  fill="black"
                />
              </mask>
            </defs>
          </svg>
        ) : null}

        <span
          data-slot="avatar-shell"
          className={cn(
            AVATAR_PRIMITIVES.shell,
            resolvedShape === "circle"
              ? AVATAR_SHAPE_CLASSES.circle
              : getAvatarRadius(resolvedShape, resolvedSize),
            ui.root,
          )}
          style={
            presenceMask
              ? {
                  ...shellStyle,
                  WebkitMask: `url(#${maskId}) center / 100% 100% no-repeat`,
                  mask: `url(#${maskId}) center / 100% 100% no-repeat`,
                }
              : shellStyle
          }
        >
          {contentChildren}
        </span>

        {presenceChildren}
      </span>
    </AvatarContext.Provider>
  );
});

export default Avatar;
