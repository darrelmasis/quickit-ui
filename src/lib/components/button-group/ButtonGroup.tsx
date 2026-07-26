import { Children, cloneElement, forwardRef, isValidElement } from "react";
import { cn } from "@/lib/utils";
import Button from "@/lib/components/button/Button";

function ButtonGroupDivider({ orientation = "horizontal", className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-neutral-200 dark:bg-neutral-700",
        orientation === "horizontal"
          ? "w-px self-stretch"
          : "h-px self-stretch w-full",
        className,
      )}
    />
  );
}

function cornerClasses(index, total, orientation) {
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const isH = orientation === "horizontal";

  if (isH) {
    if (isFirst) return "rounded-r-none";
    if (isLast) return "rounded-l-none";
    return "rounded-none";
  }
  if (isFirst) return "rounded-b-none";
  if (isLast) return "rounded-t-none";
  return "rounded-none";
}

const AUTO_DIVIDER_COLORS = {
  solid: "bg-white/25 dark:bg-black/25",
};

const ButtonGroup = forwardRef(function ButtonGroup(
  {
    children,
    color,
    variant = "soft",
    fullWidth = false,
    orientation = "horizontal",
    size,
    className,
    ...props
  },
  ref,
) {
  const childrenArray = Children.toArray(children).filter(isValidElement);
  const hasExplicitDividers = childrenArray.some(
    (child) => isValidElement(child) && child.type === ButtonGroupDivider,
  );
  const needsAutoDividers =
    !hasExplicitDividers && variant in AUTO_DIVIDER_COLORS;
  const isH = orientation === "horizontal";

  const buttonCount = childrenArray.filter(
    (child) => isValidElement(child) && child.type !== ButtonGroupDivider,
  ).length;

  function renderButton(child, buttonIndex) {
    const isButton = child.type === Button;
    const childProps = isButton
      ? {
          ...(size !== undefined && { size: child.props.size ?? size }),
          ...(color !== undefined && { color: child.props.color ?? color }),
          ...(variant !== undefined && { variant: child.props.variant ?? variant }),
        }
      : {};

    return cloneElement(child, {
      ...childProps,
      className: cn(
        "focus-visible:z-10",
        cornerClasses(buttonIndex, buttonCount, orientation),
        child.props.className,
      ),
    });
  }

  let rendered;
  let buttonIndex = 0;

  if (needsAutoDividers) {
    const dividerColor = AUTO_DIVIDER_COLORS[variant];
    rendered = [];
    childrenArray.forEach((child) => {
      if (!isValidElement(child)) {
        rendered.push(child);
        return;
      }
      if (child.type === ButtonGroupDivider) {
        rendered.push(cloneElement(child, { orientation }));
        return;
      }
      if (buttonIndex > 0) {
        rendered.push(
          <div
            key={`d-${buttonIndex}`}
            aria-hidden="true"
            className={cn(
              isH ? "w-px self-stretch" : "h-px self-stretch w-full",
              dividerColor,
            )}
          />,
        );
      }
      rendered.push(renderButton(child, buttonIndex));
      buttonIndex++;
    });
  } else {
    rendered = childrenArray.map((child, index) => {
      if (!isValidElement(child)) return child;
      if (child.type === ButtonGroupDivider) {
        return cloneElement(child, { orientation });
      }
      const btn = renderButton(child, buttonIndex);
      buttonIndex++;
      if (!isH) {
        return index > 0
          ? cloneElement(btn, { className: cn("-mt-px", btn.props.className) })
          : btn;
      }
      return index > 0
        ? cloneElement(btn, { className: cn("-ml-px", btn.props.className) })
        : btn;
    });
  }

  return (
    <div
      ref={ref}
      role="group"
      className={cn(
        "inline-flex",
        orientation === "vertical" ? "flex-col" : "flex-row",
        fullWidth && "w-full [&>*]:flex-1",
        className,
      )}
      {...props}
    >
      {rendered}
    </div>
  );
});

ButtonGroup.Divider = ButtonGroupDivider;

export default ButtonGroup;
