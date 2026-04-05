import { forwardRef } from "react";
import { getInitials } from "./get-initials";

const Initials = forwardRef(function Initials(
  { className, fallback = "?", max = 2, name, ...props },
  ref,
) {
  return (
    <span ref={ref} className={className} {...props}>
      {getInitials(name, { fallback, max })}
    </span>
  );
});

export default Initials;
