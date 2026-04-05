import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn, getAvatarRadius } from "@/lib/utils";

const AvatarContext = createContext(null);

const AVATAR_PRIMITIVES = {
  root: [
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden border",
    "select-none transition-[background-color,border-color,color] duration-200",
  ].join(" "),
  image: "h-full w-full object-cover",
  fallback:
    "inline-flex h-full w-full items-center justify-center font-medium uppercase",
  group: "flex items-center",
};

const AVATAR_SIZE_CLASSES = {
  sm: {
    root: "size-8",
    fallback: "text-xs",
  },
  md: {
    root: "size-10",
    fallback: "text-sm",
  },
  lg: {
    root: "size-12",
    fallback: "text-base",
  },
  xl: {
    root: "size-14",
    fallback: "text-lg",
  },
  "2xl": {
    root: "size-16",
    fallback: "text-xl",
  },
};

const AVATAR_SIZE_PX = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  "2xl": 64,
};

const AVATAR_RADIUS_PX = {
  sm: {
    rounded: 12,
    square: 8,
  },
  md: {
    rounded: 14,
    square: 10,
  },
  lg: {
    rounded: 16,
    square: 12,
  },
  xl: {
    rounded: 18,
    square: 14,
  },
  "2xl": {
    rounded: 20,
    square: 16,
  },
};

const AVATAR_GROUP_OVERLAP_RATIO = 0.25;

const AVATAR_SHAPE_CLASSES = {
  circle: "rounded-full",
  rounded: "",
  square: "",
};

const AVATAR_THEME_CLASSES = {
  light: {
    root: "border-slate-200 bg-slate-100 text-slate-700",
  },
  dark: {
    root: "border-zinc-800 bg-zinc-900 text-stone-200",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

function resolveAvatarShape(shape) {
  return Object.hasOwn(AVATAR_SHAPE_CLASSES, shape) ? shape : "circle";
}

function resolveAvatarSize(size) {
  return AVATAR_SIZE_CLASSES[size] ? size : "md";
}

function useAvatarContext(componentName) {
  const context = useContext(AvatarContext);

  if (!context) {
    throw new Error(`${componentName} debe usarse dentro de <Avatar>.`);
  }

  return context;
}

function getAvatarGroupMaskVariant(index, total) {
  if (total <= 1) {
    return null;
  }

  if (index === total - 1) {
    return null;
  }

  return "stacked";
}

function getAvatarGroupOverlapPx(size) {
  return Math.round(AVATAR_SIZE_PX[size] * AVATAR_GROUP_OVERLAP_RATIO);
}

function getAvatarGroupRadiusRatio(shape, size) {
  if (shape === "circle") {
    return 0.5;
  }

  const radiusPx =
    AVATAR_RADIUS_PX[size]?.[shape] ?? AVATAR_RADIUS_PX.md.rounded;

  return radiusPx / AVATAR_SIZE_PX[size];
}

function getAvatarGroupMaskDefinition(shape, size) {
  const cutRatio = getAvatarGroupOverlapPx(size) / AVATAR_SIZE_PX[size];
  const cutStart = Number((1 - cutRatio * 1.24).toFixed(4));

  if (shape === "circle") {
    return {
      type: "circle",
      cx: Number((cutStart + 0.5).toFixed(4)),
      cy: 0.5,
      r: 0.5,
    };
  }

  const radiusRatio = getAvatarGroupRadiusRatio(shape, size);

  return {
    type: "rect",
    x: cutStart,
    y: 0,
    width: 1,
    height: 1,
    rx: Number(radiusRatio.toFixed(4)),
    ry: Number(radiusRatio.toFixed(4)),
  };
}

const Avatar = forwardRef(function Avatar(
  { children, className, shape = "circle", size = "md", ...props },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = AVATAR_THEME_CLASSES[theme];
  const resolvedShape = resolveAvatarShape(shape);
  const resolvedSize = resolveAvatarSize(size);
  const [status, setStatus] = useState("error");

  const contextValue = useMemo(
    () => ({
      setStatus,
      shape: resolvedShape,
      size: resolvedSize,
      status,
      theme,
    }),
    [resolvedShape, resolvedSize, status, theme],
  );

  return (
    <AvatarContext.Provider value={contextValue}>
      <span
        ref={ref}
        data-slot="avatar"
        className={cn(
          AVATAR_PRIMITIVES.root,
          AVATAR_SIZE_CLASSES[resolvedSize].root,
          resolvedShape === "circle"
            ? AVATAR_SHAPE_CLASSES.circle
            : getAvatarRadius(resolvedShape, resolvedSize),
          ui.root,
          className,
        )}
        {...props}
      >
        {children}
      </span>
    </AvatarContext.Provider>
  );
});

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
      className={cn(
        AVATAR_PRIMITIVES.group,
        stacked && "relative",
        className,
      )}
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
                  index > 0 ? `${overlapPx * -1}px` : child.props.style?.marginInlineStart,
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

export { Avatar, AvatarFallback, AvatarGroup, AvatarImage };

export default Avatar;
