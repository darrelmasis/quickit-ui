import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
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

const AVATAR_SHAPE_CLASSES = {
  circle: "rounded-full",
  rounded: "",
  square: "",
};

const AVATAR_THEME_CLASSES = {
  light: {
    root: "border-slate-200 bg-slate-100 text-slate-700",
    groupRing: "[&>[data-slot='avatar']]:ring-white",
  },
  dark: {
    root: "border-zinc-800 bg-zinc-900 text-stone-200",
    groupRing: "[&>[data-slot='avatar']]:ring-neutral-950",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

function useAvatarContext(componentName) {
  const context = useContext(AvatarContext);

  if (!context) {
    throw new Error(`${componentName} debe usarse dentro de <Avatar>.`);
  }

  return context;
}

const Avatar = forwardRef(function Avatar(
  { children, className, shape = "circle", size = "md", ...props },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = AVATAR_THEME_CLASSES[theme];
  const resolvedShape = Object.hasOwn(AVATAR_SHAPE_CLASSES, shape)
    ? shape
    : "circle";
  const resolvedSize = AVATAR_SIZE_CLASSES[size] ? size : "md";
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
  const theme = resolveTheme(useQuickitTheme());
  const ui = AVATAR_THEME_CLASSES[theme];

  return (
    <div
      ref={ref}
      className={cn(
        AVATAR_PRIMITIVES.group,
        stacked && "-space-x-3",
        stacked && "[&>[data-slot='avatar']]:ring-2",
        stacked && ui.groupRing,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export { Avatar, AvatarFallback, AvatarGroup, AvatarImage };

export default Avatar;
