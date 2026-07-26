import { forwardRef } from "react";
import { getInputGroupAddonClassName } from "./input.shared";
import { useInputGroup } from "./input-group.context";

const InputGroupAddon = forwardRef(function InputGroupAddon(
  {
    align = "start",
    children,
    className,
    color,
    shape,
    size,
    ...props
  },
  ref,
) {
  const group = useInputGroup();

  return (
    <div
      ref={ref}
      data-slot="input-group-addon"
      className={getInputGroupAddonClassName({
        align,
        attached: group?.attached,
        className,
        color: color ?? group?.color,
        shape: shape ?? group?.shape,
        size: size ?? group?.size,
        theme: group?.theme,
      })}
      {...props}
    >
      {children}
    </div>
  );
});

export { InputGroupAddon };
export default InputGroupAddon;
