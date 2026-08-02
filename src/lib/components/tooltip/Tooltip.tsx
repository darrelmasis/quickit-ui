import { forwardRef } from "react";
import Popover from "@/lib/components/popover/Popover";

const Tooltip = forwardRef(function Tooltip({
  arrowPosition = "center",
  children,
  className = "",
  color = "default",
  content,
  placement = "top",
  ...props
}, ref) {
  return (
    <Popover
      ref={ref}
      variant="tooltip"
      content={content}
      color={color}
      arrowPosition={arrowPosition}
      placement={placement}
      arrowWidth={12}
      arrowHeight={6}
      arrowTipRadius={1.5}
      className={className}
      {...props}
    >
      {children}
    </Popover>
  );
});

export default Tooltip;
