import { forwardRef } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import Avatar from "./AvatarRoot";
import AvatarFallback from "./AvatarFallback";
import AvatarImage from "./AvatarImage";
import AvatarPresence from "./AvatarPresence";
import {
  AVATAR_THEME_CLASSES,
  USER_CHIP_SIZE_CLASSES,
} from "./avatar.constants";
import {
  normalizeInitialsSource,
  resolveAvatarSize,
  resolveTheme,
} from "./avatar.utils";
import { getInitials } from "./get-initials";

const UserChip = forwardRef(function UserChip(
  {
    className,
    description,
    href,
    initials,
    name,
    presence,
    rel,
    shape = "circle",
    size = "md",
    src,
    target,
    trailing,
    ...props
  },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = AVATAR_THEME_CLASSES[theme];
  const resolvedSize = resolveAvatarSize(size);
  const Component = href ? "a" : "div";
  const avatarFallback = initials ?? getInitials(name);

  return (
    <Component
      ref={ref}
      href={href}
      rel={href ? rel : undefined}
      target={href ? target : undefined}
      className={cn(
        "inline-flex min-w-0 items-center border transition-[background-color,border-color,color] duration-200",
        USER_CHIP_SIZE_CLASSES[resolvedSize].root,
        ui.userChip,
        href && "cursor-pointer no-underline",
        className,
      )}
      {...props}
    >
      <Avatar size={resolvedSize} shape={shape}>
        {src ? <AvatarImage src={src} alt={normalizeInitialsSource(name)} /> : null}
        <AvatarFallback>{avatarFallback}</AvatarFallback>
        {presence ? <AvatarPresence status={presence} /> : null}
      </Avatar>

      <span className="min-w-0 flex-1">
        <span className="flex min-w-0 items-start justify-between gap-2">
          <span
            className={cn(
              "block min-w-0 truncate font-medium",
              USER_CHIP_SIZE_CLASSES[resolvedSize].title,
            )}
          >
            {name}
          </span>
          {trailing ? <span className="shrink-0 self-start">{trailing}</span> : null}
        </span>
        {description ? (
          <span
            className={cn(
              "mt-0.5 block truncate",
              USER_CHIP_SIZE_CLASSES[resolvedSize].description,
              ui.userChipDescription,
            )}
          >
            {description}
          </span>
        ) : null}
      </span>
    </Component>
  );
});

export default UserChip;
