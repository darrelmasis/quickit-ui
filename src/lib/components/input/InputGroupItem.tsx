import { forwardRef } from "react";
import { getInputGroupItemClassName } from "./input.shared";
import { useInputGroup } from "./input-group.context";

const InputGroupItem = forwardRef(function InputGroupItem(
  { children, className, grow = true, span, style, ...props },
  ref,
) {
  const group = useInputGroup();
  const isFullRow =
    group?.layout === "grid" &&
    Number.isFinite(span) &&
    Number.isFinite(group?.columns) &&
    span >= group.columns;

  return (
    <div
      ref={ref}
      data-slot="input-group-item"
      data-full-row={isFullRow ? "" : undefined}
      data-span={span ?? undefined}
      className={getInputGroupItemClassName({
        className,
        grow,
        layout: group?.layout,
      })}
      style={{
        ...style,
        ...(span
          ? {
              gridColumn: `span ${span} / span ${span}`,
            }
          : null),
      }}
      {...props}
    >
      {children}
    </div>
  );
});

export { InputGroupItem };
export default InputGroupItem;
