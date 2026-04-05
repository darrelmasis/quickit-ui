import { Children, cloneElement, forwardRef, isValidElement, useId } from "react";
import { cn } from "@/lib/utils";
import { AVATAR_PRIMITIVES } from "./avatar.constants";
import {
  getAvatarGroupMaskDefinition,
  getAvatarGroupMaskVariant,
  getAvatarGroupOverlapPx,
  resolveAvatarShape,
  resolveAvatarSize,
} from "./avatar.utils";

const AvatarGroup = forwardRef(function AvatarGroup(
  { children, className, stacked = true, ...props },
  ref,
) {
  const avatarItems = Children.toArray(children);
  const maskIdPrefix = useId().replaceAll(":", "");
  const shouldMask = stacked && avatarItems.length > 1;
  const stackedItems = avatarItems.map((child, index) => {
    if (!isValidElement(child)) {
      return {
        child,
        index,
        maskId: null,
        overlapPx: 0,
      };
    }

    const resolvedShape = resolveAvatarShape(child.props.shape);
    const resolvedSize = resolveAvatarSize(child.props.size);
    const maskVariant = getAvatarGroupMaskVariant(index, avatarItems.length);
    const maskId = maskVariant
      ? `${maskIdPrefix}-avatar-group-${index}`
      : null;

    return {
      child,
      index,
      maskId,
      maskDefinition: maskId
        ? getAvatarGroupMaskDefinition(resolvedShape, resolvedSize)
        : null,
      overlapPx: index > 0 ? getAvatarGroupOverlapPx(resolvedSize) : 0,
    };
  });

  return (
    <div
      ref={ref}
      className={cn(AVATAR_PRIMITIVES.group, stacked && "relative", className)}
      {...props}
    >
      {shouldMask ? (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden"
          focusable="false"
        >
          <defs>
            {stackedItems.map(({ maskId, maskDefinition }) =>
              maskId ? (
                <mask
                  key={maskId}
                  id={maskId}
                  maskContentUnits="objectBoundingBox"
                  maskUnits="objectBoundingBox"
                >
                  <rect width="1" height="1" fill="white" />
                  {maskDefinition.type === "circle" ? (
                    <circle
                      cx={maskDefinition.cx}
                      cy={maskDefinition.cy}
                      r={maskDefinition.r}
                      fill="black"
                    />
                  ) : (
                    <rect
                      x={maskDefinition.x}
                      y={maskDefinition.y}
                      width={maskDefinition.width}
                      height={maskDefinition.height}
                      rx={maskDefinition.rx}
                      ry={maskDefinition.ry}
                      fill="black"
                    />
                  )}
                </mask>
              ) : null,
            )}
          </defs>
        </svg>
      ) : null}
      {stacked
        ? stackedItems.map(({ child, index, maskId, overlapPx }) => {
            if (!isValidElement(child)) {
              return child;
            }

            return cloneElement(child, {
              style: {
                ...(child.props.style ?? {}),
                marginInlineStart:
                  index > 0
                    ? `${overlapPx * -1}px`
                    : child.props.style?.marginInlineStart,
                zIndex: avatarItems.length - index,
                ...(maskId
                  ? {
                      WebkitMask: `url(#${maskId}) center / 100% 100% no-repeat`,
                      mask: `url(#${maskId}) center / 100% 100% no-repeat`,
                    }
                  : {}),
              },
            });
          })
        : children}
    </div>
  );
});

export default AvatarGroup;
