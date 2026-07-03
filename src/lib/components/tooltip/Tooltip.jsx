import Popover from "@/lib/components/popover/Popover";

export default function Tooltip({
  children,
  className = "",
  color = "default",
  content,
  placement = "top",
  ...props
}) {
  return (
    <Popover
      variant="tooltip"
      content={content}
      color={color}
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
}
