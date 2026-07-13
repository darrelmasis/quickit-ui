import { forwardRef } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { CARD_THEME_CLASSES } from "@/lib/theme/theme-classes";
import { resolveQuickitToken, QUICKIT_SEMANTIC_COLORS } from "@/lib/tokens";

const CARD_PRIMITIVES = {
  root: "flex flex-col rounded-[var(--qi-radius-xl)] border shadow-sm",
  header: "flex items-center gap-3 border-b px-6 py-4",
  body: "flex-1 px-6 py-4",
  footer: "flex items-center gap-3 border-t px-6 py-4",
};

const Card = forwardRef(function Card({ children, className, color = "neutral", ...props }, ref) {
  const { theme } = useQuickitControlState("card");
  const resolvedColor = resolveQuickitToken(QUICKIT_SEMANTIC_COLORS, color, "neutral");
  const ui = CARD_THEME_CLASSES[theme][resolvedColor];

  return (
    <div ref={ref} className={cn(CARD_PRIMITIVES.root, ui.base, className)} {...props}>
      {children}
    </div>
  );
});

const CardHeader = forwardRef(function CardHeader({ children, className, color = "neutral", ...props }, ref) {
  const { theme } = useQuickitControlState("card");
  const resolvedColor = resolveQuickitToken(QUICKIT_SEMANTIC_COLORS, color, "neutral");
  const ui = CARD_THEME_CLASSES[theme][resolvedColor];

  return (
    <div ref={ref} className={cn(CARD_PRIMITIVES.header, ui.header, className)} {...props}>
      {children}
    </div>
  );
});

const CardBody = forwardRef(function CardBody({ children, className, ...props }, ref) {
  return (
    <div ref={ref} className={cn(CARD_PRIMITIVES.body, className)} {...props}>
      {children}
    </div>
  );
});

const CardFooter = forwardRef(function CardFooter({ children, className, color = "neutral", ...props }, ref) {
  const { theme } = useQuickitControlState("card");
  const resolvedColor = resolveQuickitToken(QUICKIT_SEMANTIC_COLORS, color, "neutral");
  const ui = CARD_THEME_CLASSES[theme][resolvedColor];

  return (
    <div ref={ref} className={cn(CARD_PRIMITIVES.footer, ui.footer, className)} {...props}>
      {children}
    </div>
  );
});

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };
export default Card;
