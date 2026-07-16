import * as React from "react";
import type {
  Middleware,
  Placement,
  UseFloatingOptions,
  UseFloatingReturn,
} from "@floating-ui/react";

export declare const QUICKIT_SEMANTIC_COLORS: readonly [
  "neutral",
  "primary",
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
  "success",
  "danger",
  "warning",
  "info",
];
export declare const QUICKIT_STATUS_COLORS: readonly [
  "success",
  "danger",
  "warning",
  "info",
];
export declare const QUICKIT_NEUTRAL_COLORS: readonly [
  "neutral",
  "light",
  "dark",
];
export declare const QUICKIT_CONTROL_SIZES: readonly [
  "xs",
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
  "soft",
  "ghost",
];
export declare const QUICKIT_BUTTON_SHAPES: readonly [
  "default",
  "square",
  "circle",
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
export declare const QUICKIT_TAB_SIZES: readonly ["xs", "sm", "md", "lg", "xl", "2xl"];
export declare const QUICKIT_BREAKPOINTS: Readonly<{
  sm: 640;
  md: 768;
  lg: 1024;
  xl: 1280;
  "2xl": 1536;
}>;
export declare const QUICKIT_FOCUS_RING_COMPONENTS: readonly [
  "button",
  "link",
  "input",
  "textarea",
  "select",
  "checkbox",
  "radio",
  "switch",
  "tabs",
  "accordion",
  "dropdown",
  "modal",
  "drawer",
];
export declare const QUICKIT_RIPPLE_COMPONENTS: readonly [
  "button",
  "link",
];
export declare const QUICKIT_PRESS_EFFECTS: readonly [
  "none",
  "transform",
  "ripple",
];
export declare const QUICKIT_THEME_OPTIONS: readonly [
  "system",
  "light",
  "dark",
];
export declare const QUICKIT_CONTROL_RADIUS_TOKENS: Record<string, string>;
export declare const QUICKIT_AVATAR_RADIUS_TOKENS: Record<
  string,
  Record<string, string>
>;

export type QuickitThemeMode = "light" | "dark";
export type QuickitThemeOption = (typeof QUICKIT_THEME_OPTIONS)[number];
export type QuickitSemanticColor = (typeof QUICKIT_SEMANTIC_COLORS)[number];
export type QuickitAccentColor = (typeof QUICKIT_ACCENT_COLORS)[number];
export type QuickitStatusColor = (typeof QUICKIT_STATUS_COLORS)[number];
export type QuickitNeutralColor = (typeof QUICKIT_NEUTRAL_COLORS)[number];
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
export type QuickitFocusRingComponent =
  (typeof QUICKIT_FOCUS_RING_COMPONENTS)[number];
export type QuickitRippleComponent =
  (typeof QUICKIT_RIPPLE_COMPONENTS)[number];
export type QuickitPressEffect =
  (typeof QUICKIT_PRESS_EFFECTS)[number];

export declare const ACTION_CONTROL_THEME_CLASSES: Readonly<
  Record<
    QuickitThemeMode,
    Readonly<Record<QuickitButtonVariant, Readonly<Record<QuickitSemanticColor, string>>>>
  >
>;
export declare const ACTION_CONTROL_ACTIVE_THEME_CLASSES: typeof ACTION_CONTROL_THEME_CLASSES;
export declare const FORM_FIELD_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const FORM_FIELD_AUTOFILL_TOKENS: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const BADGE_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const ALERT_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const LINK_TEXT_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const LABEL_THEME_CLASSES: Readonly<Record<QuickitThemeMode, string>>;
export declare const PROGRESS_THEME_CLASSES: Readonly<Record<string, unknown>>;
export declare const DATA_TABLE_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const SKELETON_THEME_CLASSES: Readonly<Record<QuickitThemeMode, string>>;
export declare const TABS_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const CHECKBOX_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const RADIO_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const SWITCH_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const ACCORDION_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const BREADCRUMB_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const COMBOBOX_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const DRAWER_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const EMPTY_STATE_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const FORM_CONTROL_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const MODAL_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const POPOVER_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const RANGE_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;
export declare const SELECT_THEME_CLASSES: Readonly<Record<QuickitThemeMode, unknown>>;

export interface QuickitBreakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}
export interface QuickitFocusRingConfig {
  disabledComponents?: QuickitFocusRingComponent[];
  enabled?: boolean;
}
export interface QuickitRippleConfig {
  disabledComponents?: QuickitRippleComponent[];
  enabled?: boolean;
}
export interface QuickitThemeControllerValue {
  setTheme: (theme: QuickitThemeOption) => void;
  resolvedTheme: QuickitThemeMode;
  systemTheme: QuickitThemeMode;
  theme: QuickitThemeOption;
  toggleTheme: () => void;
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
  focusRing?: boolean | QuickitFocusRingConfig;
  pressEffect?: QuickitPressEffect;
  ripple?: boolean | QuickitRippleConfig;
  theme?: QuickitThemeMode;
}
export declare function QuickitProvider(
  props: QuickitProviderProps,
): React.JSX.Element;
export declare const QUICKIT_THEME_STORAGE_KEY: "quickit-ui-theme";
export interface QuickitThemeProviderProps {
  children?: React.ReactNode;
  defaultTheme?: QuickitThemeOption;
  focusRing?: boolean | QuickitFocusRingConfig;
  pressEffect?: QuickitPressEffect;
  ripple?: boolean | QuickitRippleConfig;
  storageKey?: string;
}
export declare function QuickitThemeProvider(
  props: QuickitThemeProviderProps,
): React.JSX.Element;
export declare function useQuickitTheme(): QuickitThemeMode;
export declare function useQuickitThemeController():
  QuickitThemeControllerValue;
export declare function useQuickitFocusRing(
  component: QuickitFocusRingComponent,
): boolean;
export declare function useQuickitFocusRingConfig(): {
  disabledComponents: QuickitFocusRingComponent[];
  enabled: boolean;
};
export declare function useQuickitRipple(
  component: QuickitRippleComponent,
): boolean;
export declare function useQuickitRippleConfig(): {
  disabledComponents: QuickitRippleComponent[];
  enabled: boolean;
};
export declare function useQuickitPressEffect(): QuickitPressEffect;
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
export interface UseMediaQueryOptions {
  defaultValue?: boolean;
}
export declare function useMediaQuery(
  query: string,
  options?: UseMediaQueryOptions,
): boolean;

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
    controlId?: string;
    disabled?: boolean;
    id?: string;
    invalid?: boolean;
    required?: boolean;
  }
export interface FormControlComponent extends React.FC<FormControlProps> {
  Description: typeof FormDescription;
  Message: typeof FormMessage;
}

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

export declare const FormControl: FormControlComponent;

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
  align?: "left" | "center" | "right";
  color?: QuickitSemanticColor;
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: React.ReactNode;
  pressEffect?: QuickitPressEffect;
  pressed?: boolean;
  ripple?: boolean;
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
  pressEffect?: QuickitPressEffect;
  ripple?: boolean;
  shape?: QuickitButtonShape;
  size?: QuickitControlSize;
  underline?: QuickitLinkUnderline;
  variant?: QuickitLinkTextVariant | QuickitButtonVariant;
}
export declare const Link: React.ForwardRefExoticComponent<
  LinkProps & React.RefAttributes<HTMLAnchorElement>
>;

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
  orientation?: ButtonGroupOrientation;
  size?: QuickitControlSize;
}
export interface ButtonGroupDividerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: ButtonGroupOrientation;
}
export declare const ButtonGroupDivider: React.FC<ButtonGroupDividerProps>;
export interface ButtonGroupComponent
  extends React.ForwardRefExoticComponent<
    ButtonGroupProps & React.RefAttributes<HTMLDivElement>
  > {
  Divider: typeof ButtonGroupDivider;
}
export declare const ButtonGroup: ButtonGroupComponent;

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
export type AvatarComponent = React.ForwardRefExoticComponent<
  AvatarProps & React.RefAttributes<HTMLSpanElement>
> & {
  Image: typeof AvatarImage;
  Fallback: typeof AvatarFallback;
  Group: typeof AvatarGroup;
  Presence: typeof AvatarPresence;
  Initials: typeof Initials;
  UserChip: typeof UserChip;
};
export declare const Avatar: AvatarComponent;

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start";
  description?: React.ReactNode;
  icon?: React.ReactNode;
  title?: React.ReactNode;
}
export interface EmptyStateIconProps
  extends React.HTMLAttributes<HTMLDivElement> {}
export interface EmptyStateTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface EmptyStateDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface EmptyStateActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}
export declare const EmptyStateIcon: React.ForwardRefExoticComponent<
  EmptyStateIconProps & React.RefAttributes<HTMLDivElement>
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
export type EmptyStateComponent = React.ForwardRefExoticComponent<
  EmptyStateProps & React.RefAttributes<HTMLDivElement>
> & {
  Icon: typeof EmptyStateIcon;
  Title: typeof EmptyStateTitle;
  Description: typeof EmptyStateDescription;
  Actions: typeof EmptyStateActions;
};
export declare const EmptyState: EmptyStateComponent;

export type AlertDismissReason = "manual" | "auto";
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: React.ReactNode;
  autoDismiss?: number;
  color?: "neutral" | "info" | "success" | "danger" | "warning";
  defaultOpen?: boolean;
  description?: React.ReactNode;
  dismissible?: boolean;
  dismissLabel?: string;
  icon?: React.ReactNode;
  onDismiss?: (reason: AlertDismissReason) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  pauseOnHover?: boolean;
  title?: React.ReactNode;
  variant?: "soft" | "outline";
}
export interface AlertTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface AlertActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}
export declare const AlertTitle: React.ForwardRefExoticComponent<
  AlertTitleProps & React.RefAttributes<HTMLHeadingElement>
>;
export declare const AlertDescription: React.ForwardRefExoticComponent<
  AlertDescriptionProps & React.RefAttributes<HTMLParagraphElement>
>;
export declare const AlertActions: React.ForwardRefExoticComponent<
  AlertActionsProps & React.RefAttributes<HTMLDivElement>
>;
export type AlertComponent = React.ForwardRefExoticComponent<
  AlertProps & React.RefAttributes<HTMLDivElement>
> & {
  Title: typeof AlertTitle;
  Description: typeof AlertDescription;
  Actions: typeof AlertActions;
};
export declare const Alert: AlertComponent;

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
type InputGroupBaseProps = React.HTMLAttributes<HTMLDivElement>;
type InputGroupActionBaseProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
>;
type TextareaBaseProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type LabelBaseProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export interface InputProps extends InputBaseProps {
  actionShape?: "square" | "circle";
  color?: QuickitSemanticColor;
  clearButton?: boolean;
  clearButtonLabel?: string;
  clearIcon?: React.ReactNode;
  defaultPasswordVisible?: boolean;
  hidePasswordIcon?: React.ReactNode;
  hidePasswordLabel?: string;
  invalid?: boolean;
  leftElement?: React.ReactNode;
  onClear?: () => void;
  onPasswordVisibilityChange?: (visible: boolean) => void;
  passwordToggle?: boolean;
  required?: boolean;
  rightElement?: React.ReactNode;
  shape?: "square" | "pill";
  size?: "sm" | "md" | "lg";
  showPasswordIcon?: React.ReactNode;
  showPasswordLabel?: string;
}
export declare const Input: React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
>;
export interface InputGroupProps extends InputGroupBaseProps {
  attached?: boolean;
  children?: React.ReactNode;
  color?: QuickitSemanticColor;
  columns?: number | string;
  fullWidth?: boolean;
  layout?: "inline" | "grid";
  shape?: "square" | "pill";
  size?: "sm" | "md" | "lg";
}
export interface InputGroupItemProps extends InputGroupBaseProps {
  children?: React.ReactNode;
  grow?: boolean;
  span?: number;
}
export declare const InputGroupItem: React.ForwardRefExoticComponent<
  InputGroupItemProps & React.RefAttributes<HTMLDivElement>
>;
export interface InputGroupAddonProps extends InputGroupBaseProps {
  align?: "start" | "center" | "end" | "inline-start" | "inline-end";
  children?: React.ReactNode;
  color?: QuickitSemanticColor;
  shape?: "square" | "pill";
  size?: "sm" | "md" | "lg";
}
export declare const InputGroupAddon: React.ForwardRefExoticComponent<
  InputGroupAddonProps & React.RefAttributes<HTMLDivElement>
>;
export interface InputGroupActionProps extends InputGroupActionBaseProps {
  activeMotion?: boolean;
  color?: QuickitSemanticColor;
  shape?: "square" | "pill";
  size?: "sm" | "md" | "lg";
  variant?: QuickitButtonVariant;
}
export declare const InputGroupAction: React.ForwardRefExoticComponent<
  InputGroupActionProps & React.RefAttributes<HTMLButtonElement>
>;
export type InputGroupComponent = React.ForwardRefExoticComponent<
  InputGroupProps & React.RefAttributes<HTMLDivElement>
> & {
  Item: typeof InputGroupItem;
  Addon: typeof InputGroupAddon;
  Action: typeof InputGroupAction;
};
export declare const InputGroup: InputGroupComponent;

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
    requiredIndicator?: React.ReactNode | false;
    size?: "sm" | "md";
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
  color?: QuickitSemanticColor;
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
  color?: QuickitSemanticColor;
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
  color?: QuickitSemanticColor;
  containerClassName?: string;
  defaultChecked?: boolean;
  invalid?: boolean;
  label?: React.ReactNode;
  labelClassName?: string;
  name?: string;
  onChange?: (event: QuickitCheckedChangeEvent) => void;
  onCheckedChange?: (
    checked: boolean,
    event: QuickitCheckedChangeEvent,
  ) => void;
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
  contentClassName?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  emptyText?: string;
  id?: string;
  invalid?: boolean;
  loading?: boolean;
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
export declare function TabsList(props: TabsListProps): React.JSX.Element;
export declare function TabsTrigger(
  props: TabsTriggerProps,
): React.JSX.Element;
export declare function TabsContent(
  props: TabsContentProps,
): React.JSX.Element | null;
export interface TabsComponent extends React.FC<TabsProps> {
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Content: typeof TabsContent;
}
export declare const Tabs: TabsComponent;
export declare function useTabs(): TabsContextValue;

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  clickOutside?: boolean;
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
  /**
   * Compatibilidad con versiones anteriores; el contenido permanece montado para animar la apertura/cierre.
   */
  forceMount?: boolean;
}
export declare function AccordionItem(
  props: AccordionItemProps,
): React.JSX.Element;
export declare function AccordionTrigger(
  props: AccordionTriggerProps,
): React.JSX.Element;
export declare function AccordionContent(
  props: AccordionContentProps,
): React.JSX.Element;
export interface AccordionComponent extends React.FC<AccordionProps> {
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
}
export declare const Accordion: AccordionComponent;

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
export type BreadcrumbComponent = React.ForwardRefExoticComponent<
  BreadcrumbProps & React.RefAttributes<HTMLElement>
> & {
  List: typeof BreadcrumbList;
  Item: typeof BreadcrumbItem;
  Link: typeof BreadcrumbLink;
  Separator: typeof BreadcrumbSeparator;
  Current: typeof BreadcrumbCurrent;
};
export declare const Breadcrumb: BreadcrumbComponent;

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
  /** `click`: al pulsar el trigger (por defecto). `hover`: al pasar el puntero por el trigger. */
  trigger?: "click" | "hover";
  usePortal?: boolean;
}
export interface DropdownContextValue {
  close: () => void;
  floatingStyles: React.CSSProperties;
  getContentRef: () => HTMLDivElement | null;
  getFloatingProps: (
    userProps?: Record<string, unknown>,
  ) => Record<string, unknown>;
  getItemProps: (
    userProps?: Record<string, unknown>,
  ) => Record<string, unknown>;
  getReferenceProps: (
    userProps?: Record<string, unknown>,
  ) => Record<string, unknown>;
  isMounted: boolean;
  open: boolean;
  placement: string;
  refs: unknown;
  setContentNode: (node: HTMLDivElement | null) => void;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  transitionStyles: React.CSSProperties;
  usePortal: boolean;
}
export interface DropdownTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: React.ReactNode;
}
export interface DropdownContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}
export interface DropdownItemProps
  extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  closeOnClick?: boolean;
  disabled?: boolean;
  href?: string;
  variant?: "default" | "danger";
}
export interface DropdownSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}
export declare const DropdownTrigger: React.ForwardRefExoticComponent<
  DropdownTriggerProps & React.RefAttributes<HTMLButtonElement>
>;
export declare const DropdownContent: React.ForwardRefExoticComponent<
  DropdownContentProps & React.RefAttributes<HTMLDivElement>
>;
export declare const DropdownItem: React.ForwardRefExoticComponent<
  DropdownItemProps & React.RefAttributes<HTMLElement>
>;
export declare const DropdownSeparator: React.ForwardRefExoticComponent<
  DropdownSeparatorProps & React.RefAttributes<HTMLDivElement>
>;
export interface DropdownComponent extends React.FC<DropdownProps> {
  Trigger: typeof DropdownTrigger;
  Content: typeof DropdownContent;
  Item: typeof DropdownItem;
  Separator: typeof DropdownSeparator;
}
export declare const Dropdown: DropdownComponent;
export declare function useDropdown(): DropdownContextValue;

export interface PopoverProps {
  asChild?: boolean;
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
  hoverDelayPreset?: "fast" | "normal" | "slow";
  interactive?: boolean;
  offset?:
    | number
    | {
      mainAxis?: number;
      crossAxis?: number;
      alignmentAxis?: number | null;
    };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: string;
  showArrow?: boolean;
  trigger?: "hover" | "click" | "manual";
  usePortal?: boolean;
  zIndex?: number;
}
export declare function Popover(props: PopoverProps): React.JSX.Element;

export interface TooltipProps
  extends Omit<
    PopoverProps,
    "autoCloseMs" | "interactive" | "trigger"
  > {}
export declare function Tooltip(props: TooltipProps): React.JSX.Element;

export interface ModalContextValue {
  blockingOverlay: boolean;
  close: () => Promise<void> | void;
  closeOnEscape: boolean;
  descriptionId: string;
  hasDescription: boolean;
  hasTitle: boolean;
  instanceZIndex: number;
  isTopmost: () => boolean;
  maxWidth: string;
  open: boolean;
  outsideClick: boolean;
  registerDescription: (enabled: boolean) => void;
  registerTitle: (enabled: boolean) => void;
  rendered: boolean;
  setOpen: (open: boolean) => void;
  setTriggerElement: (element: HTMLElement | null) => void;
  showCloseButton: boolean;
  titleId: string;
  visible: boolean;
}
export interface ModalProps {
  children?: React.ReactNode;
  /** Si es `false`, el backdrop no intercepta clics. */
  blockingOverlay?: boolean;
  closeOnEscape?: boolean;
  defaultOpen?: boolean;
  maxWidth?: string;
  onBeforeClose?: () => boolean | Promise<boolean | void> | void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  outsideClick?: boolean;
  showCloseButton?: boolean;
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

export interface DrawerContextValue {
  close: () => Promise<void> | void;
  closeOnEscape: boolean;
  descriptionId: string;
  hasDescription: boolean;
  hasTitle: boolean;
  instanceZIndex: number;
  isTopmost: () => boolean;
  open: boolean;
  outsideClick: boolean;
  placement: "right" | "left" | "bottom" | "top";
  registerDescription: (enabled: boolean) => void;
  registerTitle: (enabled: boolean) => void;
  rendered: boolean;
  setOpen: (open: boolean) => void;
  setTriggerElement: (element: HTMLElement | null) => void;
  showCloseButton: boolean;
  size?: string;
  titleId: string;
  visible: boolean;
}
export interface DrawerProps {
  children?: React.ReactNode;
  closeOnEscape?: boolean;
  defaultOpen?: boolean;
  placement?: "right" | "left" | "bottom" | "top";
  onBeforeClose?: () => boolean | Promise<boolean | void> | void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  outsideClick?: boolean;
  showCloseButton?: boolean;
  size?: string;
  zIndex?: number;
}
export interface DrawerTriggerProps {
  as?: React.ElementType;
  asChild?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  [key: string]: unknown;
}
export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  centered?: boolean;
}
export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DrawerActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?: "start" | "center" | "end";
}
export interface DrawerActionProps extends ButtonProps {
  closeOnClick?: boolean;
}
export interface DrawerComponent extends React.FC<DrawerProps> {
  Trigger: typeof DrawerTrigger;
  Content: typeof DrawerContent;
  Header: typeof DrawerHeader;
  Title: typeof DrawerTitle;
  Body: typeof DrawerBody;
  Actions: typeof DrawerActions;
  Action: typeof DrawerAction;
}
export declare const DrawerTrigger: React.FC<DrawerTriggerProps>;
export declare const DrawerContent: React.FC<DrawerContentProps>;
export declare const DrawerHeader: React.FC<DrawerHeaderProps>;
export declare const DrawerTitle: React.FC<DrawerTitleProps>;
export declare const DrawerBody: React.FC<DrawerBodyProps>;
export declare const DrawerActions: React.FC<DrawerActionsProps>;
export declare const DrawerAction: React.FC<DrawerActionProps>;
export declare const Drawer: DrawerComponent;

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: QuickitSemanticColor;
  max?: number;
  min?: number;
  size?: "sm" | "md" | "lg";
  value?: number;
}
export declare const Progress: React.ForwardRefExoticComponent<
  ProgressProps & React.RefAttributes<HTMLDivElement>
>;

export type RangeProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "value" | "defaultValue" | "onChange"
> & {
  allowWheel?: boolean;
  color?: QuickitSemanticColor;
  getAriaValueText?: (
    value: number,
    thumb: "start" | "end",
  ) => string;
  defaultValue?: number | readonly [number, number];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onValueChange?: (value: number | readonly [number, number]) => void;
  orientation?: "horizontal" | "vertical";
  range?: boolean;
  showValueTooltip?: boolean;
  size?: "sm" | "md" | "lg";
  startLabel?: React.ReactNode;
  endLabel?: React.ReactNode;
  startName?: string;
  endName?: string;
  tooltipCrossOffset?: number;
  tooltipHideDelay?: number;
  tooltipFormatter?: (
    value: number,
    thumb: "start" | "end",
  ) => React.ReactNode;
  tooltipOffset?: number;
  tooltipPlacement?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
  value?: number | readonly [number, number];
};

export declare const Range: React.ForwardRefExoticComponent<
  RangeProps & React.RefAttributes<HTMLInputElement>
>;

export type ToastKind = "default" | "loading" | "success" | "error";

export interface ToastAction {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export interface ToastOptions {
  id?: string;
  title?: string;
  description?: React.ReactNode;
  action?: ToastAction;
  /** `0` o omitir: sin auto-cierre hasta actualizar o cerrar manual. */
  duration?: number;
  icon?: React.ReactNode;
  kind?: ToastKind;
}

export interface ToasterGap {
  collapsed?: number;
  expanded?: number;
}

export interface ToasterKindIcons {
  loading?: React.ReactNode;
  success?: React.ReactNode;
  error?: React.ReactNode;
  default?: React.ReactNode;
}

export interface ToasterProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Toasts visibles con el stack colapsado (1–10). Por defecto 3. */
  visibleToasts?: number;
  /** Separación vertical en px, o `{ collapsed, expanded }`. */
  gap?: number | ToasterGap;
  /** Si es `false`, no se amplía separación/escala al hover/foco (solo pausa timers). Por defecto `true`. Siempre se muestran como máximo `visibleToasts` toasts; el resto entra al cerrar o expirar uno. */
  expandOnHover?: boolean;
  showCloseButton?: boolean;
  /** Icono por defecto cuando el toast no define `icon` y `kind` es `default`. */
  defaultIcon?: React.ReactNode;
  /** Sustituye iconos por `kind` (loading, success, error, default). */
  icons?: ToasterKindIcons;
  /** Clases extra en la tarjeta de cada toast. */
  toastClassName?: string;
}

export interface ToastPromiseMessages<T = unknown> {
  loading: string | ToastOptions;
  success: string | ToastOptions | ((data: T) => string | ToastOptions);
  error: string | ToastOptions | ((error: unknown) => string | ToastOptions);
}

export interface ToastFn {
  (input: string | ToastOptions): string;
  promise: <T>(promise: Promise<T>, messages: ToastPromiseMessages<T>) => string;
}

export declare function Toaster(props: ToasterProps): React.JSX.Element;
export declare const toast: ToastFn;
export declare function dismiss(id?: string): void;
/** Máximo en colapsado sin hover; el resto espera en cola. */
export declare const MAX_VISIBLE_TOASTS: number;
/** Tope de toasts en memoria (los más antiguos se descartan sin animación). */
export declare const MAX_QUEUED_TOASTS: number;

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
  middleware?: Middleware[];
  offset?: number;
  placement?: Placement;
  shiftPadding?: number;
}
export declare function useFloatingLayer(
  options?: UseFloatingLayerOptions &
    Omit<UseFloatingOptions, "middleware" | "placement">,
): UseFloatingReturn;

export interface ComboboxOption {
  disabled?: boolean;
  label?: React.ReactNode;
  textValue?: string;
  value: string | number;
}

export type QuickitComboboxChangeEvent = QuickitSelectChangeEvent;

export interface ComboboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange" | "value" | "defaultValue"
  > {
  clearButton?: boolean;
  clearButtonLabel?: string;
  clearIcon?: React.ReactNode;
  defaultValue?: string | number;
  emptyText?: string;
  loading?: boolean;
  name?: string;
    onChange?: (event: QuickitComboboxChangeEvent) => void;
    onClear?: () => void;
    onInputChange?: (
      query: string,
      event: React.ChangeEvent<HTMLInputElement>,
    ) => void;
    onValueChange?: (value: string) => void;
  options?: readonly ComboboxOption[];
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  usePortal?: boolean;
  value?: string | number;
}

export declare const Combobox: React.ForwardRefExoticComponent<
  ComboboxProps & React.RefAttributes<HTMLInputElement>
>;

export interface StepperStep {
  clickable?: boolean;
  description?: React.ReactNode;
  id?: string | number;
  title?: React.ReactNode;
}

export interface StepperProps {
  activeStep?: number;
  className?: string;
  id?: string;
  onStepChange?: (index: number) => void;
  orientation?: "horizontal" | "vertical";
  steps?: readonly StepperStep[];
}

export declare function Stepper(props: StepperProps): React.JSX.Element;

export type DatePickerSelectionMode = "between" | "single";

export interface DatePickerRangePartial {
  from: Date | string | number | null;
  to: Date | string | number | null;
}

export interface DatePickerProps
  extends Omit<
    React.ComponentPropsWithoutRef<"input">,
    | "children"
    | "color"
    | "defaultValue"
    | "onChange"
    | "size"
    | "type"
    | "value"
  > {
  /**
   * Color de acento del calendario (días seleccionados y franja de rango).
   * Si se omite, se usa el mismo que `color` del campo.
   */
  calendarColor?: QuickitSemanticColor;
  color?: QuickitSemanticColor;
  /**
   * Cómo mostrar la fecha en el input: compacta (`short`), con mes largo (`long`) o con día de la semana (`full`). Usa `Intl` y el locale del entorno.
   * @default "long"
   */
  dateStyle?: "full" | "long" | "short";
  /**
   * Una fecha o `{ from, to }` según `selectionMode`.
   * Con `between`, puede incluir solo `from` mientras el usuario elige el fin.
   */
  defaultValue?:
    | Date
    | string
    | number
    | { from?: Date | string | number; to?: Date | string | number };
  maxDate?: Date | string | number;
  minDate?: Date | string | number;
  /**
   * `single`: `(date) => void`.
   * `between`: `(range) => void` — en el primer clic `to` es `null`; al completar, fechas en orden (inicio ≤ fin).
   */
  onChange?:
    | ((date: Date) => void)
    | ((range: { from: Date; to: Date | null }) => void);
  /**
   * `between`: fecha inicio y fin en dos clics; el input muestra ambas separadas por un guión largo.
   */
  selectionMode?: DatePickerSelectionMode;
  size?: "sm" | "md" | "lg";
  value?:
    | Date
    | string
    | number
    | null
    | DatePickerRangePartial;
}

export declare const DatePicker: React.ForwardRefExoticComponent<
  DatePickerProps &
    React.RefAttributes<HTMLInputElement>
>;

export interface TimePickerProps
  extends Omit<
    React.ComponentPropsWithoutRef<"input">,
    | "children"
    | "color"
    | "defaultValue"
    | "onChange"
    | "size"
    | "type"
    | "value"
  > {
  clearButton?: boolean;
  clearButtonLabel?: string;
  color?: QuickitSemanticColor;
  defaultValue?: Date | string | number | null;
  hourCycle?: "12h" | "24h";
  maxTime?: Date | string | number;
  minTime?: Date | string | number;
  minuteStep?: number;
  onChange?: (value: string | null) => void;
  size?: "sm" | "md" | "lg";
  value?: Date | string | number | null;
}

export declare const TimePicker: React.ForwardRefExoticComponent<
  TimePickerProps &
    React.RefAttributes<HTMLInputElement>
>;

export type DataTableSortDir = "asc" | "desc";

export interface DataTableSortState {
  column: string;
  dir: DataTableSortDir;
}

export interface DataTableColumn<Row = Record<string, unknown>> {
  accessor?: (row: Row) => unknown;
  align?: "left" | "center" | "right";
  cellClassName?: string;
  header: React.ReactNode;
  headerClassName?: string;
  key: string;
  render?: (row: Row, rowIndex: number) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<Row = Record<string, unknown>> {
  caption?: string;
  className?: string;
  color?: QuickitSemanticColor;
  columns?: readonly DataTableColumn<Row>[];
  data?: readonly Row[];
  defaultSort?: DataTableSortState | null;
  emptyText?: string;
  loading?: boolean;
  onSortChange?: (sort: DataTableSortState | null) => void;
  rowKey?: (row: Row, index: number) => React.Key;
  sort?: DataTableSortState | null;
  stickyHeader?: boolean;
}

export declare function DataTable<Row = Record<string, unknown>>(
  props: DataTableProps<Row>,
): React.JSX.Element;


export type QuickitContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type QuickitContainerPadding = "none" | "sm" | "md" | "lg" | "xl";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  center?: boolean;
  padding?: QuickitContainerPadding;
  size?: QuickitContainerSize;
}
export declare const Container: React.ForwardRefExoticComponent<
  ContainerProps & React.RefAttributes<HTMLDivElement>
>;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {}
export type CardComponent = React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<HTMLDivElement>
> & {
  Header: React.ForwardRefExoticComponent<
    CardSectionProps & React.RefAttributes<HTMLDivElement>
  >;
  Body: React.ForwardRefExoticComponent<
    CardSectionProps & React.RefAttributes<HTMLDivElement>
  >;
  Footer: React.ForwardRefExoticComponent<
    CardSectionProps & React.RefAttributes<HTMLDivElement>
  >;
};
export declare const Card: CardComponent;

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}
export declare const Divider: React.ForwardRefExoticComponent<
  DividerProps & React.RefAttributes<HTMLDivElement>
>;

export declare function lockAppScroll(): void;
export declare function unlockAppScroll(): void;
export declare function useMergeRefs<T = HTMLElement>(
  ...refs: (React.Ref<T> | null | undefined)[]
): React.RefCallback<T>;
