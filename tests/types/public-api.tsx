import * as React from "react";
import "quickit-ui/styles.css";
import {
  Avatar,
  AvatarFallback,
  AvatarPresence,
  Badge,
  Button,
  Checkbox,
  Default,
  For,
  getInitials,
  Input,
  InputGroup,
  InputGroupAction,
  InputGroupAddon,
  InputGroupItem,
  Initials,
  Link,
  Match,
  Modal,
  QUICKIT_BUTTON_SHAPES,
  QUICKIT_BREAKPOINTS,
  QUICKIT_CONTROL_SIZES,
  QUICKIT_FOCUS_RING_COMPONENTS,
  QUICKIT_PRESS_EFFECTS,
  QUICKIT_RIPPLE_COMPONENTS,
  QUICKIT_SEMANTIC_COLORS,
  QUICKIT_THEME_OPTIONS,
  QuickitProvider,
  QuickitThemeProvider,
  useBreakpoint,
  useQuickitFocusRing,
  useQuickitPressEffect,
  useQuickitRipple,
  useQuickitThemeController,
  useMediaQuery,
  Radio,
  RenderSwitch,
  Select,
  Show,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  UserChip,
  type ButtonProps,
  type LinkProps,
  type QuickitBreakpoint,
  type QuickitBreakpoints,
  type QuickitCheckedChangeEvent,
  type QuickitPressEffect,
  type QuickitPresenceStatus,
  type QuickitRippleComponent,
  type QuickitSemanticColor,
  type QuickitThemeControllerValue,
  type QuickitThemeOption,
} from "quickit-ui";

const color: QuickitSemanticColor = QUICKIT_SEMANTIC_COLORS[0];
const buttonProps: ButtonProps = {
  color,
  size: QUICKIT_CONTROL_SIZES[1],
  shape: QUICKIT_BUTTON_SHAPES[0],
};
const linkProps: LinkProps = {
  href: "#",
  appearance: "button",
  color,
  shape: "pill",
};
const presence: QuickitPresenceStatus = "online";
const initials = getInitials("Elena Ruiz");
const handleToggleChange = (event: QuickitCheckedChangeEvent) => {
  event.target.checked;
};
const desktopCutoff: number = QUICKIT_BREAKPOINTS.lg;
const customBreakpoints: Partial<QuickitBreakpoints> = { lg: desktopCutoff + 100 };
const pressEffect: QuickitPressEffect = QUICKIT_PRESS_EFFECTS[0];
const rippleComponent: QuickitRippleComponent = QUICKIT_RIPPLE_COMPONENTS[0];
const controllerValue: QuickitThemeControllerValue | null = null;
const themeOption: QuickitThemeOption = QUICKIT_THEME_OPTIONS[0];

function ConsumerPreviewInner() {
  const responsive = useBreakpoint({ breakpoints: customBreakpoints });
  const activeBreakpoint: QuickitBreakpoint | null = responsive.breakpoint;
  const prefersDesktop = useMediaQuery("(min-width: 1024px)");
  const buttonFocusRing = useQuickitFocusRing(QUICKIT_FOCUS_RING_COMPONENTS[0]);
  const resolvedPressEffect = useQuickitPressEffect();
  const buttonRipple = useQuickitRipple(rippleComponent);
  const themeController = useQuickitThemeController();
  const themeMode = controllerValue?.resolvedTheme ?? themeController.resolvedTheme;
  const themeSetting = controllerValue?.theme ?? themeController.theme;

  return (
    <QuickitProvider theme={themeMode}>
      <span>{activeBreakpoint}</span>
      <span>{String(prefersDesktop)}</span>
      <span>{String(buttonFocusRing)}</span>
      <span>{resolvedPressEffect}</span>
      <span>{String(buttonRipple)}</span>
      <span>{themeSetting}</span>
      <Button {...buttonProps} pressEffect="ripple">Guardar</Button>
      <Link {...linkProps} ripple={false}>Ir a docs</Link>
      <Badge color="success">Activo</Badge>
      <Input
        color="dark"
        type="search"
        defaultValue="Quickit"
        clearButton
        actionShape="circle"
        shape="pill"
        leftElement={<span>S</span>}
      />
      <Input
        color="brand"
        type="password"
        passwordToggle
        showPasswordLabel="Ver"
        rightElement={<span>!</span>}
      />
      <InputGroup attached layout="grid" columns={2} color="dark">
        <InputGroupItem span={2}>
          <Input placeholder="Card number" />
        </InputGroupItem>
        <InputGroupItem>
          <Input placeholder="MM / YY" />
        </InputGroupItem>
        <InputGroupItem>
          <Input placeholder="CVC" />
        </InputGroupItem>
      </InputGroup>
      <InputGroup attached shape="pill">
        <InputGroupAddon align="inline-start">https://</InputGroupAddon>
        <Input placeholder="quickit.dev" />
        <InputGroupAction variant="outline">Ir</InputGroupAction>
      </InputGroup>
      <Textarea color="light" minRows={3} />
      <Checkbox
        defaultChecked
        onCheckedChange={(checked, event) => {
          checked;
          event.target.checked;
        }}
      />
      <Radio
        name="privacy"
        defaultChecked
        onCheckedChange={(checked, event) => {
          checked;
          event.target.checked;
        }}
      />
      <Switch onChange={handleToggleChange} onCheckedChange={(checked) => checked} />
      <Select color="brand" defaultValue="docs">
        <option value="docs">Docs</option>
        <option value="tokens">Tokens</option>
      </Select>
      <Avatar size="lg" shape="rounded">
        <AvatarFallback>ER</AvatarFallback>
        <AvatarPresence status={presence} />
      </Avatar>
      <Initials name="Quickit UI" />
      <Show when={{ name: "Elena" }}>
        {(user) => <span>{user.name}</span>}
      </Show>
      <RenderSwitch value="review">
        <Match when="review">
          <span>En revisión</span>
        </Match>
        <Default>
          <span>Otro estado</span>
        </Default>
      </RenderSwitch>
      <For each={[{ id: 1, name: "Landing" }]}>
        {(item) => <span key={item.id}>{item.name}</span>}
      </For>
      <UserChip
        name="Elena Ruiz"
        description="Design lead"
        initials={initials}
        presence={presence}
      />
      <Tabs defaultValue="overview" color="neutral">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Contenido</TabsContent>
      </Tabs>
      <Modal defaultOpen={false}>
        <Modal.Trigger asChild>
          <Button color="neutral">Abrir</Button>
        </Modal.Trigger>
      </Modal>
    </QuickitProvider>
  );
}

export function ConsumerPreview() {
  return (
    <QuickitThemeProvider
      defaultTheme={themeOption}
      focusRing={{ disabledComponents: ["input"] }}
      pressEffect={pressEffect}
      ripple={{ disabledComponents: ["link"] }}
      storageKey="consumer-preview-theme"
    >
      <ConsumerPreviewInner />
    </QuickitThemeProvider>
  );
}

void React.createElement(ConsumerPreview);
