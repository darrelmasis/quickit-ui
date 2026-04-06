import * as React from "react";

export declare const QUICKIT_SEMANTIC_COLORS: readonly [
  "neutral",
  "primary",
  "brand",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];
export declare const QUICKIT_ACCENT_COLORS: readonly [
  "neutral",
  "primary",
  "brand",
  "success",
  "danger",
  "warning",
  "info",
];
export declare const QUICKIT_CONTROL_SIZES: readonly [
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
];
export declare const QUICKIT_COMPACT_CONTROL_SIZES: readonly ["sm", "md"];
export declare const QUICKIT_BUTTON_VARIANTS: readonly [
  "solid",
  "outline",
  "ghost",
];
export declare const QUICKIT_BUTTON_SHAPES: readonly [
  "default",
  "square",
  "pill",
];
export declare const QUICKIT_AVATAR_SHAPES: readonly [
  "circle",
  "rounded",
  "square",
];
export declare const QUICKIT_AVATAR_SIZES: typeof QUICKIT_CONTROL_SIZES;
export declare const QUICKIT_LINK_TEXT_VARIANTS: readonly [
  "default",
  "muted",
  "subtle",
];
export declare const QUICKIT_LINK_UNDERLINES: readonly [
  "always",
  "hover",
  "none",
];
export declare const QUICKIT_TAB_SIZES: readonly ["xs", "sm", "md", "lg"];
export declare const QUICKIT_BREAKPOINTS: Readonly<{
  sm: 640;
  md: 768;
  lg: 1024;
  xl: 1280;
  "2xl": 1536;
}>;
export declare const QUICKIT_CONTROL_RADIUS_TOKENS: Record<string, string>;
export declare const QUICKIT_AVATAR_RADIUS_TOKENS: Record<
  string,
  Record<string, string>
>;

export type QuickitThemeMode = "light" | "dark";
export type QuickitSemanticColor = (typeof QUICKIT_SEMANTIC_COLORS)[number];
export type QuickitAccentColor = (typeof QUICKIT_ACCENT_COLORS)[number];
export type QuickitControlSize = (typeof QUICKIT_CONTROL_SIZES)[number];
export type QuickitCompactControlSize =
  (typeof QUICKIT_COMPACT_CONTROL_SIZES)[number];
export type QuickitButtonVariant = (typeof QUICKIT_BUTTON_VARIANTS)[number];
export type QuickitButtonShape = (typeof QUICKIT_BUTTON_SHAPES)[number];
export type QuickitAvatarShape = (typeof QUICKIT_AVATAR_SHAPES)[number];
export type QuickitAvatarSize = (typeof QUICKIT_AVATAR_SIZES)[number];
export type QuickitPresenceStatus =
  | "online"
  | "away"
  | "busy"
  | "offline";
export type QuickitLinkTextVariant =
  (typeof QUICKIT_LINK_TEXT_VARIANTS)[number];
export type QuickitLinkUnderline =
  (typeof QUICKIT_LINK_UNDERLINES)[number];
export type QuickitTabSize = (typeof QUICKIT_TAB_SIZES)[number];
export type QuickitBreakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type QuickitFloatingColor = "default" | QuickitSemanticColor;
export interface QuickitBreakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

export declare function isQuickitTokenValue(
  collection: readonly string[],
  value: string,
): boolean;
export declare function resolveQuickitToken<T extends string>(
  collection: readonly T[],
  value: string | undefined,
  fallback: T,
): T;

export declare function cn(...inputs: unknown[]): string;
export declare function getControlRadius(size?: QuickitControlSize): string;
export declare function getAvatarRadius(
  shape?: QuickitAvatarShape,
  size?: QuickitAvatarSize,
): string;

export interface QuickitProviderProps {
  children?: React.ReactNode;
  theme?: QuickitThemeMode;
}
export declare function QuickitProvider(
  props: QuickitProviderProps,
): React.JSX.Element;
export declare function useQuickitTheme(): QuickitThemeMode;
export interface UseBreakpointOptions {
  breakpoints?: Partial<QuickitBreakpoints>;
}
export interface UseBreakpointResult {
  breakpoint: QuickitBreakpoint | null;
  breakpoints: QuickitBreakpoints;
  height: number | null;
  isDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;
  ready: boolean;
  width: number | null;
}
export declare function useBreakpoint(
  options?: UseBreakpointOptions,
): UseBreakpointResult;

export interface QuickitFormControlContextValue {
  controlId: string;
  descriptionId: string;
  disabled: boolean;
  invalid: boolean;
  messageId: string;
  required: boolean;
}

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  invalid?: boolean;
  required?: boolean;
}
export declare function FormControl(
  props: FormControlProps,
): React.JSX.Element;

export interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  id?: string;
}
export declare function FormDescription(
  props: FormDescriptionProps,
): React.JSX.Element;

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  id?: string;
}
export declare function FormMessage(
  props: FormMessageProps,
): React.JSX.Element | null;

export declare function useFormControl():
  | QuickitFormControlContextValue
  | null;

type ButtonBaseProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
>;

export interface ButtonProps extends ButtonBaseProps {
  active?: boolean;
  activeMotion?: boolean;
  color?: QuickitSemanticColor;
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: React.ReactNode;
  pressed?: boolean;
  shape?: QuickitButtonShape;
  size?: QuickitControlSize;
  spinner?: boolean;
  variant?: QuickitButtonVariant;
}
export declare const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;

type LinkBaseProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "color"
>;

export interface LinkProps extends LinkBaseProps {
  activeMotion?: boolean;
  appearance?: "text" | "button";
  color?: QuickitSemanticColor;
  fullWidth?: boolean;
  shape?: QuickitButtonShape;
  size?: QuickitControlSize;
  underline?: QuickitLinkUnderline;
  variant?: QuickitLinkTextVariant | QuickitButtonVariant;
}
export declare const Link: React.ForwardRefExoticComponent<
  LinkProps & React.RefAttributes<HTMLAnchorElement>
>;

type BadgeBaseProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "color">;

export interface BadgeProps extends BadgeBaseProps {
  color?: QuickitAccentColor;
  size?: QuickitCompactControlSize;
  variant?: "soft" | "outline" | "solid";
}
export declare const Badge: React.ForwardRefExoticComponent<
  BadgeProps & React.RefAttributes<HTMLSpanElement>
>;

type AvatarBaseProps = React.HTMLAttributes<HTMLSpanElement>;
type AvatarImageBaseProps = React.ImgHTMLAttributes<HTMLImageElement>;
type AvatarGroupBaseProps = React.HTMLAttributes<HTMLDivElement>;

export interface AvatarProps extends AvatarBaseProps {
  shape?: QuickitAvatarShape;
  size?: QuickitAvatarSize;
}
export interface AvatarImageProps extends AvatarImageBaseProps {}
export interface AvatarFallbackProps extends AvatarBaseProps {}
export interface AvatarGroupProps extends AvatarGroupBaseProps {
  stacked?: boolean;
}
export interface InitialsProps extends React.HTMLAttributes<HTMLSpanElement> {
  fallback?: string;
  max?: number;
  name: string | number;
}
export interface AvatarPresenceProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  size?: QuickitAvatarSize;
  status?: QuickitPresenceStatus;
}
export interface UserChipProps extends React.HTMLAttributes<HTMLElement> {
  description?: React.ReactNode;
  href?: string;
  initials?: string;
  name: React.ReactNode;
  presence?: QuickitPresenceStatus;
  rel?: string;
  shape?: QuickitAvatarShape;
  size?: QuickitAvatarSize;
  src?: string;
  target?: string;
  trailing?: React.ReactNode;
}
export declare function getInitials(
  name: string | number,
  options?: { fallback?: string; max?: number },
): string;
export declare const Avatar: React.ForwardRefExoticComponent<
  AvatarProps & React.RefAttributes<HTMLSpanElement>
>;
export declare const AvatarImage: React.ForwardRefExoticComponent<
  AvatarImageProps & React.RefAttributes<HTMLImageElement>
>;
export declare const AvatarFallback: React.ForwardRefExoticComponent<
  AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>
>;
export declare const AvatarGroup: React.ForwardRefExoticComponent<
  AvatarGroupProps & React.RefAttributes<HTMLDivElement>
>;
export declare const Initials: React.ForwardRefExoticComponent<
  InitialsProps & React.RefAttributes<HTMLSpanElement>
>;
export declare const AvatarPresence: React.ForwardRefExoticComponent<
  AvatarPresenceProps & React.RefAttributes<HTMLSpanElement>
>;
export declare const UserChip: React.ForwardRefExoticComponent<
  UserChipProps & React.RefAttributes<HTMLElement>
>;

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start";
}
export interface EmptyStateTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface EmptyStateDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface EmptyStateActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}
export declare const EmptyState: React.ForwardRefExoticComponent<
  EmptyStateProps & React.RefAttributes<HTMLDivElement>
>;
export declare const EmptyStateTitle: React.ForwardRefExoticComponent<
  EmptyStateTitleProps & React.RefAttributes<HTMLHeadingElement>
>;
export declare const EmptyStateDescription: React.ForwardRefExoticComponent<
  EmptyStateDescriptionProps & React.RefAttributes<HTMLParagraphElement>
>;
export declare const EmptyStateActions: React.ForwardRefExoticComponent<
  EmptyStateActionsProps & React.RefAttributes<HTMLDivElement>
>;

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
  shape?: "line" | "rect" | "circle";
}
export declare const Skeleton: React.ForwardRefExoticComponent<
  SkeletonProps & React.RefAttributes<HTMLDivElement>
>;

type InputBaseProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
>;
type TextareaBaseProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type LabelBaseProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export interface InputProps extends InputBaseProps {
  color?: QuickitSemanticColor;
  invalid?: boolean;
  required?: boolean;
  size?: "sm" | "md" | "lg";
}
export declare const Input: React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
>;

export interface TextareaProps extends TextareaBaseProps {
  color?: QuickitSemanticColor;
  invalid?: boolean;
  minRows?: number;
  required?: boolean;
}
export declare const Textarea: React.ForwardRefExoticComponent<
  TextareaProps & React.RefAttributes<HTMLTextAreaElement>
>;

export interface LabelProps extends LabelBaseProps {
  optional?: boolean;
  requiredIndicator?: boolean;
}
export declare const Label: React.ForwardRefExoticComponent<
  LabelProps & React.RefAttributes<HTMLLabelElement>
>;

type CheckboxInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "color" | "size" | "type"
>;
type RadioInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "color" | "size" | "type"
>;

export interface CheckboxProps extends CheckboxInputProps {
  color?: QuickitAccentColor;
  containerClassName?: string;
  invalid?: boolean;
  label?: React.ReactNode;
  labelClassName?: string;
  onCheckedChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  required?: boolean;
  size?: QuickitCompactControlSize;
}
export declare const Checkbox: React.ForwardRefExoticComponent<
  CheckboxProps & React.RefAttributes<HTMLInputElement>
>;

export interface RadioProps extends RadioInputProps {
  color?: QuickitAccentColor;
  containerClassName?: string;
  invalid?: boolean;
  label?: React.ReactNode;
  labelClassName?: string;
  onCheckedChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  required?: boolean;
  size?: QuickitCompactControlSize;
}
export declare const Radio: React.ForwardRefExoticComponent<
  RadioProps & React.RefAttributes<HTMLInputElement>
>;

type SwitchButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color" | "onChange" | "size" | "value"
>;

export interface SwitchProps extends SwitchButtonProps {
  checked?: boolean;
  color?: QuickitAccentColor;
  containerClassName?: string;
  defaultChecked?: boolean;
  invalid?: boolean;
  label?: React.ReactNode;
  labelClassName?: string;
  name?: string;
  onChange?: (event: QuickitCheckedChangeEvent) => void;
  onCheckedChange?: (checked: boolean) => void;
  required?: boolean;
  size?: QuickitCompactControlSize;
  value?: string;
}
export declare const Switch: React.ForwardRefExoticComponent<
  SwitchProps & React.RefAttributes<HTMLButtonElement>
>;

export interface QuickitSelectChangeEvent {
  type: "change";
  nativeEvent?: Event;
  target: {
    id?: string;
    name?: string;
    value: string;
  };
  currentTarget: {
    id?: string;
    name?: string;
    value: string;
  };
  preventDefault(): void;
  stopPropagation(): void;
}

export interface QuickitCheckedChangeEvent {
  type: "change";
  nativeEvent?: Event;
  target: {
    checked: boolean;
    id?: string;
    name?: string;
    value?: string;
  };
  currentTarget: {
    checked: boolean;
    id?: string;
    name?: string;
    value?: string;
  };
  preventDefault(): void;
  stopPropagation(): void;
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onChange"> {
  children?: React.ReactNode;
  color?: QuickitSemanticColor;
  defaultValue?: string | number;
  disabled?: boolean;
  id?: string;
  invalid?: boolean;
  name?: string;
  onChange?: (event: QuickitSelectChangeEvent) => void;
  onValueChange?: (value: string) => void;
  placeholder?: React.ReactNode;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  usePortal?: boolean;
  value?: string | number;
}
export declare const Select: React.ForwardRefExoticComponent<
  SelectProps & React.RefAttributes<HTMLButtonElement>
>;

export interface TabsContextValue {
  activationMode: "automatic" | "manual";
  baseId: string;
  color: QuickitSemanticColor;
  orientation: "horizontal" | "vertical";
  setValue: (value: string) => void;
  size: QuickitTabSize;
  value?: string;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  activationMode?: "automatic" | "manual";
  color?: QuickitSemanticColor;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  size?: QuickitTabSize;
  value?: string;
}
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  value: string;
}
export interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean;
  value: string;
}
export declare function Tabs(props: TabsProps): React.JSX.Element;
export declare function TabsList(props: TabsListProps): React.JSX.Element;
export declare function TabsTrigger(
  props: TabsTriggerProps,
): React.JSX.Element;
export declare function TabsContent(
  props: TabsContentProps,
): React.JSX.Element | null;
export declare function useTabs(): TabsContextValue;

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: boolean;
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[] | null) => void;
  type?: "single" | "multiple";
  value?: string | string[] | null;
}
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}
export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean;
}
export declare function Accordion(props: AccordionProps): React.JSX.Element;
export declare function AccordionItem(
  props: AccordionItemProps,
): React.JSX.Element;
export declare function AccordionTrigger(
  props: AccordionTriggerProps,
): React.JSX.Element;
export declare function AccordionContent(
  props: AccordionContentProps,
): React.JSX.Element | null;

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}
export interface BreadcrumbListProps
  extends React.OlHTMLAttributes<HTMLOListElement> {
  separator?: React.ReactNode;
  separatorClassName?: string;
}
export interface BreadcrumbItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  allowLink?: boolean;
  contentClassName?: string;
  current?: boolean;
  href?: string;
  linkVariant?: QuickitLinkTextVariant;
  title?: string;
  underline?: QuickitLinkUnderline;
}
export interface BreadcrumbLinkProps extends LinkProps {}
export interface BreadcrumbSeparatorProps
  extends React.LiHTMLAttributes<HTMLLIElement> {}
export interface BreadcrumbCurrentProps
  extends React.HTMLAttributes<HTMLSpanElement> {}
export declare const Breadcrumb: React.ForwardRefExoticComponent<
  BreadcrumbProps & React.RefAttributes<HTMLElement>
>;
export declare const BreadcrumbList: React.ForwardRefExoticComponent<
  BreadcrumbListProps & React.RefAttributes<HTMLOListElement>
>;
export declare const BreadcrumbItem: React.ForwardRefExoticComponent<
  BreadcrumbItemProps & React.RefAttributes<HTMLLIElement>
>;
export declare const BreadcrumbLink: React.ForwardRefExoticComponent<
  BreadcrumbLinkProps & React.RefAttributes<HTMLAnchorElement>
>;
export declare const BreadcrumbSeparator: React.ForwardRefExoticComponent<
  BreadcrumbSeparatorProps & React.RefAttributes<HTMLLIElement>
>;
export declare const BreadcrumbCurrent: React.ForwardRefExoticComponent<
  BreadcrumbCurrentProps & React.RefAttributes<HTMLSpanElement>
>;

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  color?: QuickitSemanticColor;
  count: number;
  defaultPage?: number;
  disabled?: boolean;
  onPageChange?: (page: number) => void;
  page?: number;
  siblingCount?: number;
}
export declare function Pagination(props: PaginationProps): React.JSX.Element;

export interface DropdownProps {
  children?: React.ReactNode;
  closeOnClickOutside?: boolean;
  closeOnScroll?: boolean;
  collisionPadding?: number;
  defaultOpen?: boolean;
  offsetX?: number;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placement?: string;
  showArrow?: boolean;
  usePortal?: boolean;
}
export interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  close: () => void;
  refs: unknown;
  context: unknown;
  interactions: unknown;
  floatingStyles: React.CSSProperties;
  placement: string;
  setArrowElement: (element: Element | null) => void;
  showArrow: boolean;
  usePortal: boolean;
}
export interface DropdownTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: React.ReactNode;
}
export interface DropdownContentProps
  extends React.HTMLAttributes<HTMLUListElement> {
  animated?: boolean;
}
export interface DropdownItemProps
  extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  closeOnClick?: boolean;
  disabled?: boolean;
  href?: string;
  variant?: "default" | "danger";
}
export interface DropdownSeparatorProps
  extends React.HTMLAttributes<HTMLLIElement> {}
export declare function Dropdown(props: DropdownProps): React.JSX.Element;
export declare const DropdownTrigger: React.ForwardRefExoticComponent<
  DropdownTriggerProps & React.RefAttributes<HTMLButtonElement>
>;
export declare const DropdownContent: React.ForwardRefExoticComponent<
  DropdownContentProps & React.RefAttributes<HTMLUListElement>
>;
export declare const DropdownItem: React.ForwardRefExoticComponent<
  DropdownItemProps & React.RefAttributes<HTMLElement>
>;
export declare function DropdownSeparator(
  props: DropdownSeparatorProps,
): React.JSX.Element;
export declare function useDropdown(): DropdownContextValue;

export interface PopoverProps {
  arrowHeight?: number;
  arrowFill?: string;
  arrowStroke?: string;
  arrowStrokeWidth?: number;
  arrowTipRadius?: number;
  arrowWidth?: number;
  autoCloseMs?: number;
  children?: React.ReactNode;
  className?: string;
  color?: QuickitFloatingColor;
  content: React.ReactNode;
  offset?: number;
  placement?: string;
  showArrow?: boolean;
  trigger?: "hover" | "click";
  usePortal?: boolean;
  zIndex?: number;
}
export declare function Popover(props: PopoverProps): React.JSX.Element;

export interface TooltipProps extends Omit<PopoverProps, "trigger"> {}
export declare function Tooltip(props: TooltipProps): React.JSX.Element;

export interface ModalContextValue {
  close: () => Promise<void> | void;
  instanceZIndex: number;
  maxWidth: string;
  open: boolean;
  outsideClick: boolean;
  rendered: boolean;
  setOpen: (open: boolean) => void;
  visible: boolean;
}
export interface ModalProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  maxWidth?: string;
  onBeforeClose?: () => boolean | Promise<boolean | void> | void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  outsideClick?: boolean;
  zIndex?: number;
}
export interface ModalTriggerProps {
  as?: React.ElementType;
  asChild?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  [key: string]: unknown;
}
export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  centered?: boolean;
}
export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ModalActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?: "start" | "center" | "end";
}
export interface ModalActionProps extends ButtonProps {
  closeOnClick?: boolean;
}
export interface ModalComponent extends React.FC<ModalProps> {
  Trigger: typeof ModalTrigger;
  Content: typeof ModalContent;
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Body: typeof ModalBody;
  Actions: typeof ModalActions;
  Action: typeof ModalAction;
}
export declare const ModalTrigger: React.FC<ModalTriggerProps>;
export declare const ModalContent: React.FC<ModalContentProps>;
export declare const ModalHeader: React.FC<ModalHeaderProps>;
export declare const ModalTitle: React.FC<ModalTitleProps>;
export declare const ModalBody: React.FC<ModalBodyProps>;
export declare const ModalActions: React.FC<ModalActionsProps>;
export declare const ModalAction: React.FC<ModalActionProps>;
export declare const Modal: ModalComponent;
export declare function useModal(): ModalContextValue;

type Renderable<T> = React.ReactNode | ((value: T) => React.ReactNode);

export interface ShowProps<T = unknown> {
  children?: Renderable<T>;
  fallback?: Renderable<T>;
  when: T;
}
export declare function Show<T = unknown>(props: ShowProps<T>): React.JSX.Element;

export interface MatchProps<T = unknown> {
  children?: Renderable<T>;
  when: T | readonly T[] | ((value: T) => boolean);
}
export declare function Match<T = unknown>(
  props: MatchProps<T>,
): React.JSX.Element;

export interface DefaultProps<T = unknown> {
  children?: Renderable<T>;
}
export declare function Default<T = unknown>(
  props: DefaultProps<T>,
): React.JSX.Element;

export interface RenderSwitchProps<T = unknown> {
  children?: React.ReactNode;
  fallback?: Renderable<T>;
  value: T;
}
export declare function RenderSwitch<T = unknown>(
  props: RenderSwitchProps<T>,
): React.JSX.Element;

export interface ForProps<T = unknown> {
  children?: (item: T, index: number) => React.ReactNode;
  each?: Iterable<T> | null;
  fallback?: React.ReactNode | ((items: T[]) => React.ReactNode);
}
export declare function For<T = unknown>(props: ForProps<T>): React.JSX.Element;

export interface UseFloatingLayerOptions {
  middleware?: unknown[];
  offset?: number;
  placement?: string;
  shiftPadding?: number;
  [key: string]: unknown;
}
export declare function useFloatingLayer(
  options?: UseFloatingLayerOptions,
): any;
