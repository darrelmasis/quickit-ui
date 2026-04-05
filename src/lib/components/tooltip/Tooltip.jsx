import Popover from "@/lib/components/popover/Popover";

const TOOLTIP_BASE_CLASSES = [
  "!max-w-[16rem] !rounded-[0.875rem] !px-2.5 !py-1.5",
  "!text-xs !leading-5",
].join(" ");

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
      content={content}
      color={color}
      placement={placement}
      trigger="hover"
      showArrow
      arrowWidth={12}
      arrowHeight={6}
      arrowTipRadius={1.5}
      className={[TOOLTIP_BASE_CLASSES, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </Popover>
  );
}
