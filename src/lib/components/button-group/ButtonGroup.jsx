import { Children, cloneElement, forwardRef, isValidElement } from "react";
import { cn, getControlRadius } from "@/lib/utils";

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

function makeSideRadius(radius, side) {
  const suffix = radius.replace("rounded-", "");
  return `rounded-${side}-${suffix}`;
}

const ButtonGroup = forwardRef(function ButtonGroup(
  {
    children,
    fullWidth = false,
    orientation = "horizontal",
    size = "md",
    className,
    ...props
  },
  ref,
) {
  const childrenArray = Children.toArray(children).filter(isValidElement);
  const hasDivider = childrenArray.some(
    (child) => isValidElement(child) && child.type === ButtonGroupDivider,
  );
  const radius = getControlRadius(size);
  const borderColor = "border-neutral-200 dark:border-neutral-700";

  function getButtonBorderClass(index) {
    if (hasDivider) {
      const nextChild = childrenArray[index + 1];
      if (
        !nextChild ||
        (isValidElement(nextChild) && nextChild.type === ButtonGroupDivider)
      ) {
        return "";
      }
    }
    if (index === childrenArray.length - 1) return "";
    return orientation === "vertical"
      ? `border-b ${borderColor}`
      : `border-r ${borderColor}`;
  }

  return (
    <div
      ref={ref}
      role="group"
      className={cn(
        "inline-flex overflow-hidden border border-neutral-200 dark:border-neutral-700",
        radius,
        orientation === "vertical" && "flex-col",
        !hasDivider &&
          orientation === "horizontal" &&
          "divide-x divide-neutral-200 dark:divide-neutral-700",
        !hasDivider &&
          orientation === "vertical" &&
          "divide-y divide-neutral-200 dark:divide-neutral-700",
        fullWidth && "w-full [&>*]:flex-1",
        className,
      )}
      {...props}
    >
      {Children.map(childrenArray, (child, index) => {
        if (!isValidElement(child)) return child;

        if (child.type === ButtonGroupDivider) {
          return cloneElement(child, { orientation });
        }

        const isFirst = index === 0;
        const isLast = index === childrenArray.length - 1;

        return cloneElement(child, {
          className: cn(
            "rounded-none border-0",
            getButtonBorderClass(index),
            isFirst &&
              (orientation === "vertical"
                ? makeSideRadius(radius, "t")
                : makeSideRadius(radius, "l")),
            isLast &&
              (orientation === "vertical"
                ? makeSideRadius(radius, "b")
                : makeSideRadius(radius, "r")),
            child.props.className,
          ),
        });
      })}
    </div>
  );
});

ButtonGroup.Divider = ButtonGroupDivider;

export default ButtonGroup;
