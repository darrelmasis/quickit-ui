import { forwardRef, useMemo } from "react";
import { useQuickitFocusRing, useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import {
  getInputGroupAttachedChildrenClassName,
  getInputGroupClassName,
  getInputGroupFrameClassName,
  getInputGroupInnerClassName,
  resolveInputGroupLayout,
} from "./input.shared";
import { InputGroupContext } from "./input-group.context";

const InputGroup = forwardRef(function InputGroup(
  {
    attached = false,
    children,
    className,
    color = "neutral",
    columns,
    fullWidth = true,
    layout = "inline",
    shape = "square",
    size = "md",
    style,
    ...props
  },
  ref,
) {
  const theme = useQuickitTheme();
  const focusRingEnabled = useQuickitFocusRing("input");
  const resolvedLayout = resolveInputGroupLayout(layout);
  const contextValue = useMemo(
    () => ({
      attached,
      color,
      columns,
      focusRingEnabled,
      layout: resolvedLayout,
      shape,
      size,
      theme,
    }),
    [attached, color, columns, focusRingEnabled, resolvedLayout, shape, size, theme],
  );

  return (
    <InputGroupContext.Provider value={contextValue}>
      <div
        ref={ref}
        data-slot="input-group"
        data-attached={attached ? "" : undefined}
        className={getInputGroupClassName({
          attached,
          className,
          color,
          focusRingEnabled,
          fullWidth,
          layout: resolvedLayout,
          shape,
          size,
          theme,
        })}
        style={
          attached
            ? undefined
            : {
                ...style,
                ...(resolvedLayout === "grid" && columns
                  ? {
                      gridTemplateColumns:
                        typeof columns === "number"
                          ? `repeat(${columns}, minmax(0, 1fr))`
                          : columns,
                    }
                  : null),
              }
        }
        {...props}
      >
        {attached ? (
          <div
            data-slot="input-group-frame"
            className={getInputGroupFrameClassName({
              color,
              layout: resolvedLayout,
              shape,
              size,
              theme,
            })}
          >
            <div
              data-slot="input-group-inner"
              className={cn(
                getInputGroupInnerClassName({
                  color,
                  layout: resolvedLayout,
                  theme,
                }),
                getInputGroupAttachedChildrenClassName({
                  columns,
                  layout: resolvedLayout,
                  shape,
                  size,
                }),
              )}
              style={{
                ...style,
                ...(resolvedLayout === "grid" && columns
                  ? {
                      gridTemplateColumns:
                        typeof columns === "number"
                          ? `repeat(${columns}, minmax(0, 1fr))`
                          : columns,
                    }
                  : null),
              }}
            >
              {children}
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </InputGroupContext.Provider>
  );
});

export { InputGroup };
export default InputGroup;
