import { forwardRef } from "react";
import { Button } from "@/lib/components/button";
import { getInputGroupActionClassName } from "./input.shared";
import { useInputGroup } from "./input-group.context";

const InputGroupAction = forwardRef(function InputGroupAction(
  {
    activeMotion = false,
    children,
    className,
    color,
    shape,
    size,
    type = "button",
    variant = "solid",
    ...props
  },
  ref,
) {
  const group = useInputGroup();
  const resolvedShape = (shape ?? group?.shape) === "pill" ? "pill" : "default";

  return (
    <Button
      ref={ref}
      data-slot="input-group-action"
      type={type}
      color={color ?? group?.color}
      shape={resolvedShape}
      size={size ?? group?.size}
      variant={variant}
      activeMotion={activeMotion}
      className={getInputGroupActionClassName({
        attached: group?.attached,
        className,
        size: size ?? group?.size,
      })}
      {...props}
    >
      {children}
    </Button>
  );
});

export { InputGroupAction };
export default InputGroupAction;
