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

export interface UserChipDetails {
  /** Cargo o rol del usuario */
  role?: React.ReactNode;
  /** Correo electrónico */
  email?: React.ReactNode;
  /** Nombre de usuario (se muestra con @) */
  username?: React.ReactNode;
}

const UserChip = forwardRef(function UserChip(
  {
    className,
    description,
    details,
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
  const initialsSource = normalizeInitialsSource(
    typeof name === "string" || typeof name === "number" ? name : "",
  );
  const avatarFallback = initials ?? getInitials(initialsSource || "?");

  const hasDetails = details && (details.role || details.email || details.username);
  const sizes = USER_CHIP_SIZE_CLASSES[resolvedSize];

  return (
    <Component
      ref={ref}
      href={href}
      rel={href ? rel : undefined}
      target={href ? target : undefined}
      className={cn(
        "inline-flex min-w-0 items-center border transition-[background-color,border-color,color] duration-200",
        sizes.root,
        ui.userChip,
        href && "cursor-pointer no-underline",
        className,
      )}
      {...props}
    >
      <Avatar size={resolvedSize} shape={shape}>
        <AvatarImage src={src} alt={initialsSource} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
        {presence ? <AvatarPresence status={presence} /> : null}
      </Avatar>

      <span className="min-w-0 flex-1">
        <span className="flex min-w-0 items-start justify-between gap-2">
          <span
            className={cn(
              "block min-w-0 truncate font-medium",
              sizes.title,
            )}
          >
            {name}
          </span>
          {trailing ? <span className="shrink-0 self-start">{trailing}</span> : null}
        </span>

        {/* Details multi-línea: role, email, username */}
        {hasDetails ? (
          <div className="mt-0.5 flex flex-col gap-0.5">
            {details.role ? (
              <span
                className={cn(
                  "block truncate",
                  sizes.details.role,
                  ui.userChipDescription,
                )}
              >
                {details.role}
              </span>
            ) : null}
            <div className="flex flex-wrap items-center gap-1.5">
              {details.email ? (
                <span className={cn("block truncate", sizes.details.email)}>
                  {details.email}
                </span>
              ) : null}
              {details.email && details.username ? (
                <span className={cn("shrink-0", sizes.details.separator)} aria-hidden="true">
                  ·
                </span>
              ) : null}
              {details.username ? (
                <span className={cn("block truncate", sizes.details.username)}>
                  @{details.username}
                </span>
              ) : null}
            </div>
          </div>
        ) : (
          /* Backward compat: description simple */
          description ? (
            <span
              className={cn(
                "mt-0.5 block truncate",
                sizes.description,
                ui.userChipDescription,
              )}
            >
              {description}
            </span>
          ) : null
        )}
      </span>
    </Component>
  );
});

export default UserChip;
