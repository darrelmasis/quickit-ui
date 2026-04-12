import {
  Badge,
  Button,
  Checkbox,
  Default,
  Drawer,
  FormControl,
  For,
  Match,
  Modal,
  Progress,
  Input,
  InputGroup,
  Label,
  Link,
  Range,
  RenderSwitch,
  Radio,
  Select,
  Show,
  Toaster,
  Switch,
  Textarea,
  Accordion,
  Breadcrumb,
  Pagination,
  Tabs,
  Dropdown,
  Popover,
  Tooltip,
  Avatar,
  EmptyState,
  Skeleton,
  toast,
} from "@/lib";
import {
  QUICKIT_BUTTON_SHAPES,
  QUICKIT_BUTTON_VARIANTS,
  QUICKIT_CONTROL_SIZES,
  QUICKIT_SEMANTIC_COLORS,
  QUICKIT_LINK_TEXT_VARIANTS,
  QUICKIT_LINK_UNDERLINES,
  QUICKIT_COMPACT_CONTROL_SIZES,
  QUICKIT_ACCENT_COLORS,
} from "@/lib/tokens";
import { WEBSITE_ROUTES, WEBSITE_SHELL } from "@/website/site-config";
import {
  WEBSITE_BUTTON_DOC,
  WEBSITE_COMPONENT_DOC_SECTIONS,
  WEBSITE_COMPONENT_GROUPS,
  WEBSITE_COMPONENT_LOOKUP,
  WEBSITE_COMPONENT_REVIEW_NOTES,
  WEBSITE_DOC_OVERVIEW_SECTIONS,
  WEBSITE_HOOKS,
} from "@/website/docs-content";
import WebsiteCodeBlock from "@/website/components/WebsiteCodeBlock";
import WebsiteDocsSidebar from "@/website/components/WebsiteDocsSidebar";
import WebsitePageToc from "@/website/components/WebsitePageToc";
import WebsitePreviewTabs from "@/website/components/WebsitePreviewTabs";
import WebsiteSection from "@/website/components/WebsiteSection";

const INSTALL_COMMAND = `npm install quickit-ui`;

const STYLES_SNIPPET = `@import "quickit-ui/styles.css";
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));`;

const QUICKIT_PROVIDER_SNIPPET = `import { QuickitProvider } from "quickit-ui";

export function AppRoot({ theme }) {
  return (
    <QuickitProvider
      theme={theme}
      focusRing={{ enabled: true, disabledComponents: ["dropdown"] }}
      ripple={{ enabled: true, disabledComponents: ["link"] }}
      pressEffect="transform"
    >
      <App />
    </QuickitProvider>
  );
}`;

const THEME_PROVIDER_SNIPPET = `import { QuickitThemeProvider } from "quickit-ui";

createRoot(document.getElementById("root")).render(
  <QuickitThemeProvider
    defaultTheme="system"
    storageKey="quickit-ui-theme"
  >
    <App />
  </QuickitThemeProvider>,
);`;

const THEME_TOGGLE_SNIPPET = `import { Switch, useQuickitThemeController } from "quickit-ui";

function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useQuickitThemeController();

  return (
    <Switch
      checked={resolvedTheme === "dark"}
      onCheckedChange={toggleTheme}
      label={\`Tema: \${resolvedTheme}\`}
    />
  );
}`;

const THEME_READ_SNIPPET = `import { useQuickitTheme } from "quickit-ui";

function ThemeBadge() {
  const theme = useQuickitTheme();

  return <span>Tema activo: {theme}</span>;
}`;

const HOOK_EXAMPLES = {
  useQuickitTheme: {
    code: THEME_READ_SNIPPET,
  },
  useQuickitThemeController: {
    code: THEME_TOGGLE_SNIPPET,
  },
  useFormControl: {
    code: `import { FormControl, Label, Input, useFormControl } from "quickit-ui";

function FormIds() {
  const control = useFormControl();

  if (!control) {
    return null;
  }

  return <span>Control ID: {control.controlId}</span>;
}

export function Field() {
  return (
    <FormControl>
      <Label>Nombre</Label>
      <Input placeholder="Quickit" />
      <FormIds />
    </FormControl>
  );
}`,
  },
  useBreakpoint: {
    code: `import { useBreakpoint } from "quickit-ui";

function ResponsiveHeader() {
  const { isMobile, breakpoint } = useBreakpoint();

  return (
    <span>
      {isMobile ? "Mobile" : \`Breakpoint: \${breakpoint}\`}
    </span>
  );
}`,
  },
  useMediaQuery: {
    code: `import { useMediaQuery } from "quickit-ui";

function LayoutHint() {
  const isWide = useMediaQuery("(min-width: 1024px)");

  return <span>{isWide ? "Layout amplio" : "Layout compacto"}</span>;
}`,
  },
  useTabs: {
    code: `import { Tabs, useTabs } from "quickit-ui";

function TabsMeta() {
  const { value, size } = useTabs();

  return <span>Tab activa: {value} (size {size})</span>;
}

export function TabsUsage() {
  return (
    <Tabs defaultValue="overview">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="team">Equipo</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview"><TabsMeta /></Tabs.Content>
      <Tabs.Content value="team">Equipo</Tabs.Content>
    </Tabs>
  );
}`,
  },
  useDropdown: {
    code: `import { Dropdown, useDropdown } from "quickit-ui";

function DropdownState() {
  const { open } = useDropdown();

  return (
    <Dropdown.Item as="div" disabled>
      {open ? "Abierto" : "Cerrado"}
    </Dropdown.Item>
  );
}

export function DropdownUsage() {
  return (
    <Dropdown>
      <Dropdown.Trigger>Opciones</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Editar</Dropdown.Item>
        <Dropdown.Item>Eliminar</Dropdown.Item>
        <DropdownState />
      </Dropdown.Content>
    </Dropdown>
  );
}`,
  },
  useModal: {
    code: `import { Modal, Button, useModal } from "quickit-ui";

function CloseAction() {
  const { close } = useModal();

  return <Button variant="outline" onClick={close}>Cerrar</Button>;
}

export function ModalUsage() {
  return (
    <Modal>
      <Modal.Trigger>Abrir modal</Modal.Trigger>
      <Modal.Content>
        <Modal.Body>
          <CloseAction />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}`,
  },
  useFloatingLayer: {
    code: `import { useFloatingLayer } from "quickit-ui";

export function FloatingLayerUsage() {
  const { refs, floatingStyles } = useFloatingLayer({ placement: "bottom-start" });

  return (
    <>
      <button ref={refs.setReference}>Abrir</button>
      <div ref={refs.setFloating} style={floatingStyles}>
        Panel flotante
      </div>
    </>
  );
}`,
  },
  useQuickitFocusRing: {
    code: `import { useQuickitFocusRing } from "quickit-ui";

function InputShell({ children }) {
  const showRing = useQuickitFocusRing("input");

  return (
    <div className={showRing ? "ring-2 ring-neutral-400" : ""}>
      {children}
    </div>
  );
}`,
  },
  useQuickitFocusRingConfig: {
    code: `import { useQuickitFocusRingConfig } from "quickit-ui";

function FocusConfig() {
  const { enabled, disabledComponents } = useQuickitFocusRingConfig();

  return (
    <span>
      Focus ring {enabled ? "activo" : "apagado"} (
      {disabledComponents.length} excepciones)
    </span>
  );
}`,
  },
  useQuickitPressEffect: {
    code: `import { useQuickitPressEffect } from "quickit-ui";

function PressEffectStatus() {
  const pressEffect = useQuickitPressEffect();

  return <span>Efecto activo: {pressEffect}</span>;
}`,
  },
  useQuickitRipple: {
    code: `import { useQuickitRipple } from "quickit-ui";

function RippleStatus() {
  const rippleOn = useQuickitRipple("button");

  return <span>Ripple en botones: {rippleOn ? "on" : "off"}</span>;
}`,
  },
  useQuickitRippleConfig: {
    code: `import { useQuickitRippleConfig } from "quickit-ui";

function RippleConfig() {
  const { enabled, disabledComponents } = useQuickitRippleConfig();

  return (
    <span>
      Ripple global {enabled ? "activo" : "apagado"} (
      {disabledComponents.length} excepciones)
    </span>
  );
}`,
  },
};

const LINK_PREVIEW_CODE = `import { Link } from "quickit-ui";

export function LinkPreview() {
  return <Link href="#">Visitar documentación</Link>;
}`;

const LINK_USAGE_CODE = `import { Link } from "quickit-ui";

export function LinkUsage() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link href="#">Link básico</Link>
      <Link href="#" variant="muted">
        Muted
      </Link>
      <Link href="#" appearance="button" color="neutral">
        Acción
      </Link>
    </div>
  );
}`;

const BADGE_PREVIEW_CODE = `import { Badge } from "quickit-ui";

export function BadgePreview() {
  return <Badge color="brand">Nuevo</Badge>;
}`;

const BADGE_USAGE_CODE = `import { Badge } from "quickit-ui";

export function BadgeUsage() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge color="neutral">Default</Badge>
      <Badge color="brand" variant="solid">
        Premium
      </Badge>
    </div>
  );
}`;

const INPUT_PREVIEW_CODE = `import { Input } from "quickit-ui";

export function InputPreview() {
  return <Input placeholder="tu@email.com" />;
}`;

const TEXTAREA_PREVIEW_CODE = `import { Textarea } from "quickit-ui";

export function TextareaPreview() {
  return <Textarea placeholder="Notas..." />;
}`;

const SELECT_PREVIEW_CODE = `import { Select } from "quickit-ui";

export function SelectPreview() {
  return (
    <Select placeholder="Selecciona estado">
      <option value="active">Activo</option>
      <option value="paused">Pausado</option>
    </Select>
  );
}`;

const INPUT_GROUP_PREVIEW_CODE = `import { InputGroup, Input } from "quickit-ui";

export function InputGroupPreview() {
  return (
    <InputGroup attached>
      <InputGroup.Addon align="inline-start">https://</InputGroup.Addon>
      <Input placeholder="quickit.dev" />
      <InputGroup.Action>Ir</InputGroup.Action>
    </InputGroup>
  );
}`;

const RANGE_PREVIEW_CODE = `import { Range } from "quickit-ui";

export function RangePreview() {
  return <Range defaultValue={40} />;
}`;

const FORM_CONTROL_PREVIEW_CODE = `import { FormControl, Label, Input } from "quickit-ui";

export function FormControlPreview() {
  return (
    <FormControl>
      <Label htmlFor="name">Nombre</Label>
      <Input id="name" placeholder="Elena Ruiz" />
      <FormControl.Description>Se mostrará en tu perfil público.</FormControl.Description>
    </FormControl>
  );
}`;

const CHECKBOX_PREVIEW_CODE = `import { Checkbox } from "quickit-ui";

export function CheckboxPreview() {
  return <Checkbox label="Recordarme" />;
}`;

const RADIO_PREVIEW_CODE = `import { Radio } from "quickit-ui";

export function RadioPreview() {
  return <Radio label="Plan anual" />;
}`;

const SWITCH_PREVIEW_CODE = `import { Switch } from "quickit-ui";

export function SwitchPreview() {
  return <Switch defaultChecked label="Modo oscuro" />;
}`;

const ACCORDION_PREVIEW_CODE = `import { Accordion } from "quickit-ui";

export function AccordionPreview() {
  return (
    <>
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Primera sección</Accordion.Trigger>
          <Accordion.Content>Contenido interno.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <Accordion type="multiple" defaultValue={["item-1"]}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Detalles</Accordion.Trigger>
          <Accordion.Content>Incluye componentes base.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Notas</Accordion.Trigger>
          <Accordion.Content>Texto adicional.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
}`;

const TABS_PREVIEW_CODE = `import { Tabs } from "quickit-ui";

export function TabsPreview() {
  return (
    <>
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">Resumen</Tabs.Content>
        <Tabs.Content value="stats">Métricas</Tabs.Content>
      </Tabs>
      <Tabs defaultValue="overview" size="sm">
        <Tabs.List>
          <Tabs.Trigger value="overview">Resumen</Tabs.Trigger>
          <Tabs.Trigger value="team">Equipo</Tabs.Trigger>
          <Tabs.Trigger value="billing">Pago</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">Contenido corto.</Tabs.Content>
        <Tabs.Content value="team">Miembros.</Tabs.Content>
        <Tabs.Content value="billing">Metodos.</Tabs.Content>
      </Tabs>
    </>
  );
}`;

const DROPDOWN_PREVIEW_CODE = `import { Dropdown } from "quickit-ui";

export function DropdownPreview() {
  return (
    <Dropdown>
      <Dropdown.Trigger>Acciones</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Editar</Dropdown.Item>
        <Dropdown.Item>Duplicar</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}`;

const POPOVER_PREVIEW_CODE = `import { Popover } from "quickit-ui";

export function PopoverPreview() {
  return <Popover content="Detalle rápido">Ver detalle</Popover>;
}`;

const TOOLTIP_PREVIEW_CODE = `import { Tooltip } from "quickit-ui";

export function TooltipPreview() {
  return <Tooltip content="Ayuda rápida">Hover aquí</Tooltip>;
}`;

const MODAL_PREVIEW_CODE = `import { Modal } from "quickit-ui";

export function ModalPreview() {
  return (
    <Modal>
      <Modal.Trigger>Eliminar</Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Eliminar proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta acción no se puede deshacer.</Modal.Body>
        <Modal.Actions>
          <Modal.Action variant="outline">Cancelar</Modal.Action>
          <Modal.Action color="danger">Eliminar</Modal.Action>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
}`;

const AVATAR_PREVIEW_CODE = `import { Avatar } from "quickit-ui";

export function AvatarPreview() {
  return (
    <Avatar>
      <Avatar.Image src="/avatar.png" alt="Elena Ruiz" />
      <Avatar.Fallback>ER</Avatar.Fallback>
    </Avatar>
  );
}`;

const EMPTY_STATE_PREVIEW_CODE = `import { EmptyState, Button } from "quickit-ui";

export function EmptyStatePreview() {
  return (
    <EmptyState align="center">
      <EmptyState.Title>Sin resultados</EmptyState.Title>
      <EmptyState.Description>Prueba otro filtro.</EmptyState.Description>
      <EmptyState.Actions>
        <Button size="sm">Crear item</Button>
      </EmptyState.Actions>
    </EmptyState>
  );
}`;

const SKELETON_PREVIEW_CODE = `import { Skeleton } from "quickit-ui";

export function SkeletonPreview() {
  return <Skeleton shape="line" />;
}`;

const BREADCRUMB_PREVIEW_CODE = `import { Breadcrumb } from "quickit-ui";

export function BreadcrumbPreview() {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Current>Proyectos</Breadcrumb.Current>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
      <Breadcrumb>
        <Breadcrumb.List separator="•">
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Ventas</Breadcrumb.Item>
          <Breadcrumb.Item current>Detalle</Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    </>
  );
}`;

const PAGINATION_PREVIEW_CODE = `import { Pagination } from "quickit-ui";

export function PaginationPreview() {
  return <Pagination count={10} />;
}`;

const PROGRESS_PREVIEW_CODE = `import { Progress } from "quickit-ui";

export function ProgressPreview() {
  return <Progress value={62} />;
}`;

const DRAWER_PREVIEW_CODE = `import { Drawer, Button } from "quickit-ui";

export function DrawerPreview() {
  return (
    <Drawer>
      <Drawer.Trigger>
        <Button>Ver detalles</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Actividad</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          Contenido del drawer.
        </Drawer.Body>
        <Drawer.Actions>
          <Drawer.Action variant="outline">Cerrar</Drawer.Action>
        </Drawer.Actions>
      </Drawer.Content>
    </Drawer>
  );
}`;

const TOASTER_PREVIEW_CODE = `import { Button, Toaster, toast } from "quickit-ui";

export function ToasterPreview() {
  return (
    <>
      <Button
        onClick={() =>
          toast({
            title: "Notificación enviada",
            description: "Se actualizó el estado del proyecto.",
          })
        }
      >
        Mostrar toast
      </Button>
      <Toaster />
    </>
  );
}`;

const LOGIC_SHOW_PREVIEW_CODE = `import { Show } from "quickit-ui";

export function ShowPreview({ isReady }) {
  return (
    <Show when={isReady} fallback="Cargando...">
      Contenido listo
    </Show>
  );
}`;

const LOGIC_SWITCH_PREVIEW_CODE = `import { RenderSwitch, Match, Default } from "quickit-ui";

export function SwitchPreview({ status }) {
  return (
    <RenderSwitch value={status}>
      <Match when="success">Todo bien</Match>
      <Match when="error">Algo falló</Match>
      <Default>En espera</Default>
    </RenderSwitch>
  );
}`;

const LOGIC_FOR_PREVIEW_CODE = `import { For } from "quickit-ui";

export function ForPreview({ items }) {
  return (
    <For each={items} fallback="Sin datos">
      {(item) => <div key={item.id}>{item.label}</div>}
    </For>
  );
}`;

function PropsTable({ props }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800">
      <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1fr)_8rem_minmax(0,1.4fr)] border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-950 md:grid dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
        <span>Prop</span>
        <span>Tipo</span>
        <span>Default</span>
        <span>Descripción</span>
      </div>
      <For each={props}>
        {(prop) => (
          <div
            key={prop.name}
            className="grid gap-3 border-t border-neutral-200 px-4 py-4 first:border-t-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_8rem_minmax(0,1.4fr)] dark:border-neutral-800"
          >
            <div>
              <p className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                {prop.name}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                {prop.type}
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">
                {prop.defaultValue}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {prop.description}
              </p>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}

function parseDocsRoute(pathname) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] !== "docs") {
    return { componentSlug: null, mode: "overview" };
  }

  if (segments[1] === "components" && segments[2]) {
    return { componentSlug: segments[2], mode: "component" };
  }

  return { componentSlug: null, mode: "overview" };
}

function getComponentSections(slug) {
  const doc = COMPONENT_DOCS[slug];
  const reviewNotes = WEBSITE_COMPONENT_REVIEW_NOTES[slug];

  const withReview = (sections) =>
    reviewNotes?.length
      ? [...sections, { id: "notas-revision", label: "Notas de revisión" }]
      : sections;

  if (!doc) {
    return withReview(WEBSITE_COMPONENT_DOC_SECTIONS);
  }

  const exampleChildren =
    doc.examples?.map((example) => ({
      id: example.id,
      label: example.title,
    })) ?? [];

  return withReview([
    { id: "ejemplo-visual", label: "Ejemplo visual y código" },
    { id: "instalacion", label: "Instalación" },
    { id: "uso", label: "Uso" },
    {
      id: "ejemplos",
      label: "Ejemplos",
      children: exampleChildren,
    },
  ]);
}

function ButtonPreviewCanvas() {
  return (
    <div className="flex items-center justify-center">
      <Button color="neutral" size="md">
        Guardar cambios
      </Button>
    </div>
  );
}

function LinkPreviewCanvas() {
  return (
    <div className="flex items-center justify-center">
      <Link href="#">Visitar documentación</Link>
    </div>
  );
}

function BadgePreviewCanvas() {
  return (
    <div className="flex items-center justify-center">
      <span className="inline-flex">
        <Badge color="brand">Nuevo</Badge>
      </span>
    </div>
  );
}

function InputPreviewCanvas() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="doc-input">Correo</Label>
          <Input
            id="doc-input"
            type="email"
            placeholder="tu@email.com"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}

function TextareaPreviewCanvas() {
  return (
    <div className="w-full max-w-md space-y-3">
      <Label htmlFor="doc-textarea">Notas</Label>
      <Textarea id="doc-textarea" placeholder="Escribe algo..." />
    </div>
  );
}

function SelectPreviewCanvas() {
  return (
    <div className="w-full max-w-xs space-y-3">
      <Label htmlFor="doc-select">Estado</Label>
      <Select id="doc-select" placeholder="Selecciona estado">
        <option value="active">Activo</option>
        <option value="paused">Pausado</option>
      </Select>
    </div>
  );
}

function CheckboxPreviewCanvas() {
  return (
    <div className="flex items-center justify-center">
      <Checkbox label="Recordarme" />
    </div>
  );
}

function RadioPreviewCanvas() {
  return (
    <div className="flex items-center justify-center">
      <Radio label="Plan anual" />
    </div>
  );
}

function SwitchPreviewCanvas() {
  return (
    <div className="flex items-center justify-center">
      <Switch defaultChecked label="Modo oscuro" />
    </div>
  );
}

function FormControlPreviewCanvas() {
  return (
    <div className="w-full max-w-md space-y-3">
      <FormControl>
        <Label htmlFor="fc-name">Nombre</Label>
        <Input id="fc-name" placeholder="Elena Ruiz" />
        <FormControl.Description>Se mostrará en tu perfil público.</FormControl.Description>
      </FormControl>
    </div>
  );
}

function InputGroupPreviewCanvas() {
  return (
    <div className="w-full max-w-md space-y-4">
      <InputGroup attached>
        <InputGroup.Addon align="inline-start">https://</InputGroup.Addon>
        <Input placeholder="quickit.dev" />
        <InputGroup.Action>Ir</InputGroup.Action>
      </InputGroup>
    </div>
  );
}

function RangePreviewCanvas() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Valor único
        </p>
        <Range defaultValue={40} />
      </div>
      <Range defaultValue={72} color="brand" />
    </div>
  );
}

function AccordionPreviewCanvas() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Primera sección</Accordion.Trigger>
          <Accordion.Content>Contenido interno.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <Accordion type="multiple" defaultValue={["item-1"]}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Detalles</Accordion.Trigger>
          <Accordion.Content>Incluye componentes base.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Notas</Accordion.Trigger>
          <Accordion.Content>Texto adicional.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

function BreadcrumbPreviewCanvas() {
  return (
    <div className="space-y-4">
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Inicio</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Current>Proyectos</Breadcrumb.Current>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
      <Breadcrumb>
        <Breadcrumb.List separator="•">
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Ventas</Breadcrumb.Item>
          <Breadcrumb.Item current>Detalle</Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    </div>
  );
}

function PaginationPreviewCanvas() {
  return (
    <div className="flex justify-center">
      <Pagination count={8} />
    </div>
  );
}

function ProgressPreviewCanvas() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Progress value={62} />
      <Progress value={32} color="brand" />
    </div>
  );
}

function DrawerPreviewCanvas() {
  return (
    <Drawer>
      <Drawer.Trigger>
        <Button color="neutral">Ver detalles</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Actividad</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>Contenido del drawer.</Drawer.Body>
        <Drawer.Actions>
          <Drawer.Action variant="outline">Cerrar</Drawer.Action>
        </Drawer.Actions>
      </Drawer.Content>
    </Drawer>
  );
}

function ToasterPreviewCanvas() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Button
        color="neutral"
        onClick={() =>
          toast({
            title: "Notificación enviada",
            description: "Se actualizó el estado del proyecto.",
          })
        }
      >
        Mostrar toast
      </Button>
    </div>
  );
}

function TabsPreviewCanvas() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">Resumen</Tabs.Content>
        <Tabs.Content value="stats">Métricas</Tabs.Content>
      </Tabs>
      <Tabs defaultValue="overview" size="sm">
        <Tabs.List>
          <Tabs.Trigger value="overview">Resumen</Tabs.Trigger>
          <Tabs.Trigger value="team">Equipo</Tabs.Trigger>
          <Tabs.Trigger value="billing">Pago</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">Contenido corto.</Tabs.Content>
        <Tabs.Content value="team">Miembros.</Tabs.Content>
        <Tabs.Content value="billing">Metodos.</Tabs.Content>
      </Tabs>
    </div>
  );
}

function DropdownPreviewCanvas() {
  return (
    <Dropdown>
      <Dropdown.Trigger>Acciones</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Editar</Dropdown.Item>
        <Dropdown.Item>Duplicar</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item variant="danger">Eliminar</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}

function PopoverPreviewCanvas() {
  return <Popover content="Detalle rápido">Ver detalle</Popover>;
}

function TooltipPreviewCanvas() {
  return <Tooltip content="Ayuda rápida">Hover aquí</Tooltip>;
}

function ModalPreviewCanvas() {
  return (
    <Modal>
      <Modal.Trigger>Eliminar</Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Eliminar proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta acción no se puede deshacer.</Modal.Body>
        <Modal.Actions>
          <Modal.Action variant="outline">Cancelar</Modal.Action>
          <Modal.Action color="danger">Eliminar</Modal.Action>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
}

function AvatarPreviewCanvas() {
  return (
    <Avatar>
      <Avatar.Image src="https://i.pravatar.cc/120?img=11" alt="Elena Ruiz" />
      <Avatar.Fallback>ER</Avatar.Fallback>
    </Avatar>
  );
}

function EmptyStatePreviewCanvas() {
  return (
    <EmptyState align="center">
      <EmptyState.Title>Sin resultados</EmptyState.Title>
      <EmptyState.Description>Prueba otro filtro.</EmptyState.Description>
      <EmptyState.Actions>
        <Button size="sm">Crear item</Button>
      </EmptyState.Actions>
    </EmptyState>
  );
}

function SkeletonPreviewCanvas() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Skeleton shape="line" />
      <Skeleton shape="line" />
    </div>
  );
}

function LogicShowPreviewCanvas() {
  return (
    <Show when={true} fallback="Cargando...">
      Contenido listo
    </Show>
  );
}

function LogicSwitchPreviewCanvas() {
  return (
    <RenderSwitch value="success">
      <Match when="success">Todo bien</Match>
      <Match when="error">Algo falló</Match>
      <Default>En espera</Default>
    </RenderSwitch>
  );
}

function LogicForPreviewCanvas() {
  return (
    <For each={[{ id: 1, label: "Primero" }, { id: 2, label: "Segundo" }]}>
      {(item) => <div key={item.id}>{item.label}</div>}
    </For>
  );
}

const COMPONENT_DOCS = {};

COMPONENT_DOCS.button = {
  name: "Button",
  description: WEBSITE_BUTTON_DOC.description,
  previewCode: WEBSITE_BUTTON_DOC.previewCode,
  preview: <ButtonPreviewCanvas />,
  installCode: WEBSITE_BUTTON_DOC.installCode,
  usageCode: WEBSITE_BUTTON_DOC.usageCode,
  examples: [
    {
      id: "ejemplos-variantes",
      title: "Variantes",
      description: `Variantes disponibles: ${QUICKIT_BUTTON_VARIANTS.join(", ")}.`,
      preview: (
        <div className="flex flex-wrap gap-3">
          <Button color="neutral">Solid</Button>
          <Button color="neutral" variant="outline">
            Outline
          </Button>
          <Button color="neutral" variant="ghost">
            Ghost
          </Button>
        </div>
      ),
    },
    {
      id: "ejemplos-tamanos",
      title: "Tamaños",
      description: `Tamaños disponibles: ${QUICKIT_CONTROL_SIZES.join(", ")}.`,
      preview: (
        <div className="flex flex-wrap gap-3">
          <Button color="neutral" size="sm">
            Small
          </Button>
          <Button color="neutral" size="md">
            Medium
          </Button>
          <Button color="neutral" size="lg">
            Large
          </Button>
          <Button color="neutral" size="xl">
            XL
          </Button>
          <Button color="neutral" size="2xl">
            2XL
          </Button>
        </div>
      ),
    },
    {
      id: "ejemplos-formas",
      title: "Formas",
      description: `Formas disponibles: ${QUICKIT_BUTTON_SHAPES.join(", ")}.`,
      preview: (
        <div className="flex flex-wrap gap-3">
          <Button color="neutral" shape="default">
            Default
          </Button>
          <Button color="neutral" shape="pill">
            Pill
          </Button>
          <Button color="neutral" shape="square" aria-label="Menu">
            ⋯
          </Button>
          <Button color="neutral" shape="circle" aria-label="Next">
            →
          </Button>
        </div>
      ),
      note:
        "Nota: en `square` y `circle` el `pressEffect=\"transform\"` se desactiva por defecto. Si lo necesitas, fuerza `activeMotion`.",
    },
    {
      id: "ejemplos-colores",
      title: "Colores",
      description: `Colores disponibles: ${QUICKIT_SEMANTIC_COLORS.join(", ")}.`,
      preview: (
        <div className="flex flex-wrap gap-3">
          <Button color="neutral">Neutral</Button>
          <Button color="primary">Primary</Button>
          <Button color="brand">Brand</Button>
          <Button color="success">Success</Button>
          <Button color="danger">Danger</Button>
          <Button color="warning">Warning</Button>
        </div>
      ),
    },
    {
      id: "ejemplos-estados",
      title: "Estados",
      description:
        "Incluye loading, spinner, loadingText, disabled y pressed.",
      preview: (
        <div className="flex flex-wrap gap-3">
          <Button color="neutral" loading>
            Guardando
          </Button>
          <Button color="neutral" loading spinner={false}>
            Enviando
          </Button>
          <Button color="neutral" loading loadingText="Actualizando">
            Guardar
          </Button>
          <Button color="neutral" disabled>
            Deshabilitado
          </Button>
          <Button color="neutral" pressed>
            Presionado
          </Button>
        </div>
      ),
    },
    {
      id: "ejemplos-press-effect",
      title: "Press effect",
      description:
        "`pressEffect` controla el feedback en presión. `ripple` fuerza el efecto por instancia.",
      preview: (
        <div className="flex flex-wrap gap-3">
          <Button color="neutral" pressEffect="transform">
            Transform
          </Button>
          <Button color="neutral" pressEffect="ripple" ripple>
            Ripple
          </Button>
        </div>
      ),
      note:
        "Nota: `pressEffect=\"ripple\"` requiere que el ripple esté habilitado en `QuickitProvider` o que lo actives por instancia con `ripple`.",
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: WEBSITE_BUTTON_DOC.props,
      notes: WEBSITE_BUTTON_DOC.notes,
    },
  ],
};

COMPONENT_DOCS.link = {
  name: "Link",
  description:
    "Link cubre navegación y acciones tipo botón con variantes de texto, subrayado y apariencia de botón.",
  previewCode: LINK_PREVIEW_CODE,
  preview: <LinkPreviewCanvas />,
  installCode: `import { Link } from "quickit-ui";`,
  usageCode: LINK_USAGE_CODE,
  examples: [
    {
      id: "ejemplos-variantes",
      title: "Variantes de texto",
      description: `Variantes disponibles: ${QUICKIT_LINK_TEXT_VARIANTS.join(", ")}.`,
      preview: (
        <div className="flex flex-wrap gap-4">
          <Link href="#">Default</Link>
          <Link href="#" variant="muted">
            Muted
          </Link>
          <Link href="#" variant="subtle">
            Subtle
          </Link>
        </div>
      ),
    },
    {
      id: "ejemplos-underline",
      title: "Subrayado",
      description: `Opciones: ${QUICKIT_LINK_UNDERLINES.join(", ")}.`,
      preview: (
        <div className="flex flex-wrap gap-4">
          <Link href="#" underline="always">
            Siempre
          </Link>
          <Link href="#" underline="hover">
            Hover
          </Link>
          <Link href="#" underline="none">
            Nunca
          </Link>
        </div>
      ),
    },
    {
      id: "ejemplos-boton",
      title: "Apariencia de botón",
      description:
        "`appearance=\"button\"` habilita shape, size y variantes de Button.",
      preview: (
        <div className="flex flex-wrap gap-3">
          <Link href="#" appearance="button" color="neutral">
            Acción
          </Link>
          <Link href="#" appearance="button" color="neutral" variant="outline">
            Secundario
          </Link>
        </div>
      ),
    },
    {
      id: "ejemplos-icono",
      title: "Icon button",
      description: "Cuando solo hay icono, añade aria-label o title.",
      preview: (
        <div className="flex flex-wrap gap-3">
          <Link
            href="#"
            appearance="button"
            shape="circle"
            color="neutral"
            aria-label="Abrir menú"
          >
            ⋯
          </Link>
          <Link
            href="#"
            appearance="button"
            shape="square"
            color="neutral"
            aria-label="Subir"
          >
            ↑
          </Link>
        </div>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "appearance",
          type: `"text" | "button"`,
          defaultValue: `"text"`,
          description: "Define si se renderiza como texto o botón.",
        },
        {
          name: "variant",
          type: "QuickitLinkTextVariant | QuickitButtonVariant",
          defaultValue: `"default"`,
          description:
            "Define la variante de texto o la variante de botón cuando appearance es button.",
        },
        {
          name: "underline",
          type: "QuickitLinkUnderline",
          defaultValue: `"hover"`,
          description: "Controla cuándo se muestra el subrayado.",
        },
        {
          name: "color",
          type: "QuickitSemanticColor",
          defaultValue: `"primary"`,
          description: "Paleta aplicada al texto o botón.",
        },
        {
          name: "shape",
          type: "QuickitButtonShape",
          defaultValue: `"default"`,
          description: "Solo disponible si appearance es button.",
        },
        {
          name: "size",
          type: "QuickitControlSize",
          defaultValue: `"md"`,
          description: "Solo disponible si appearance es button.",
        },
        {
          name: "fullWidth",
          type: "boolean",
          defaultValue: "false",
          description: "Hace el link botón 100% ancho.",
        },
        {
          name: "pressEffect",
          type: "QuickitPressEffect",
          defaultValue: "provider",
          description: "Sobrescribe el press effect global.",
        },
        {
          name: "ripple",
          type: "boolean",
          defaultValue: "provider",
          description: "Activa ripple por instancia.",
        },
        {
          name: "activeMotion",
          type: "boolean",
          defaultValue: "auto",
          description: "Habilita el motion de presión.",
        },
      ],
      notes: [
        "Link acepta atributos nativos de HTMLAnchorElement.",
        "Si appearance es button y shape es square o circle, define aria-label, aria-labelledby o title.",
      ],
    },
  ],
};

COMPONENT_DOCS.badge = {
  name: "Badge",
  description: "Etiqueta compacta para estados, categorías o indicadores.",
  previewCode: BADGE_PREVIEW_CODE,
  preview: <BadgePreviewCanvas />,
  installCode: `import { Badge } from "quickit-ui";`,
  usageCode: BADGE_USAGE_CODE,
  examples: [
    {
      id: "ejemplos-variantes",
      title: "Variantes",
      description: "Variantes: soft, outline, solid.",
      preview: (
        <div className="flex flex-wrap gap-3">
          <Badge color="neutral" variant="soft">
            Soft
          </Badge>
          <Badge color="neutral" variant="outline">
            Outline
          </Badge>
          <Badge color="neutral" variant="solid">
            Solid
          </Badge>
        </div>
      ),
    },
    {
      id: "ejemplos-tamanos",
      title: "Tamaños",
      description: `Tamaños disponibles: ${QUICKIT_COMPACT_CONTROL_SIZES.join(", ")}.`,
      preview: (
        <div className="flex flex-wrap gap-3">
          <Badge color="neutral" size="sm">
            Small
          </Badge>
          <Badge color="neutral" size="md">
            Medium
          </Badge>
        </div>
      ),
    },
    {
      id: "ejemplos-colores",
      title: "Colores",
      description: `Colores disponibles: ${QUICKIT_ACCENT_COLORS.join(", ")}.`,
      preview: (
        <div className="flex flex-wrap gap-3">
          <Badge color="neutral">Neutral</Badge>
          <Badge color="brand">Brand</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="danger">Danger</Badge>
        </div>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "color",
          type: "QuickitAccentColor",
          defaultValue: `"neutral"`,
          description: "Color aplicado al badge.",
        },
        {
          name: "size",
          type: "QuickitCompactControlSize",
          defaultValue: `"md"`,
          description: "Controla altura y tipografía.",
        },
        {
          name: "variant",
          type: `"soft" | "outline" | "solid"`,
          defaultValue: `"soft"`,
          description: "Tratamiento visual del badge.",
        },
      ],
      notes: ["Badge acepta atributos nativos de HTMLSpanElement."],
    },
  ],
};

COMPONENT_DOCS["form-control"] = {
  name: "FormControl",
  description:
    "Contexto compartido para label, descripción y mensajes de estado.",
  previewCode: FORM_CONTROL_PREVIEW_CODE,
  preview: <FormControlPreviewCanvas />,
  installCode: `import { FormControl, Label, Input } from "quickit-ui";`,
  usageCode: `import { FormControl, Label, Input } from "quickit-ui";

export function FormControlUsage() {
  return (
    <FormControl invalid>
      <Label htmlFor="email">Correo</Label>
      <Input id="email" type="email" required />
      <FormControl.Message>El correo no es válido.</FormControl.Message>
    </FormControl>
  );
}`,
  examples: [
    {
      id: "ejemplos-estados",
      title: "Estados",
      description: "disabled, required e invalid se propagan a los hijos.",
      preview: (
        <div className="grid gap-4 sm:grid-cols-2">
          <FormControl required>
            <Label htmlFor="fc-required">Nombre</Label>
            <Input id="fc-required" placeholder="Elena Ruiz" />
            <FormControl.Description>Este campo es obligatorio.</FormControl.Description>
          </FormControl>
          <FormControl disabled>
            <Label htmlFor="fc-disabled">Equipo</Label>
            <Input id="fc-disabled" placeholder="Quickit" />
            <FormControl.Description>Campo deshabilitado.</FormControl.Description>
          </FormControl>
        </div>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Deshabilita todos los campos hijos.",
        },
        {
          name: "invalid",
          type: "boolean",
          defaultValue: "false",
          description: "Marca el control como inválido.",
        },
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
          description: "Propaga el estado required a los hijos.",
        },
        {
          name: "id",
          type: "string",
          defaultValue: "auto",
          description: "Base usada para asociar ids internos.",
        },
      ],
      notes: [
        "FormControl.Description y FormControl.Message son opcionales; equivalen a FormDescription y FormMessage (siguen exportados con nombre).",
        "`useFormControl()` lee el mismo contexto desde inputs o controles personalizados.",
      ],
    },
  ],
};

COMPONENT_DOCS.label = {
  name: "Label",
  description:
    "Etiqueta accesible que se asocia a input, select, textarea o controles.",
  previewCode: `import { Label } from "quickit-ui";

export function LabelPreview() {
  return <Label htmlFor="email">Correo</Label>;
}`,
  preview: (
    <div className="flex items-center justify-center">
      <Label htmlFor="label-preview">Correo</Label>
    </div>
  ),
  installCode: `import { Label } from "quickit-ui";`,
  usageCode: `import { Label, Input } from "quickit-ui";

export function LabelUsage() {
  return (
    <>
      <Label htmlFor="email" requiredIndicator>
        Correo
      </Label>
      <Input id="email" type="email" />
    </>
  );
}`,
  examples: [
    {
      id: "ejemplos-formcontrol",
      title: "Con FormControl",
      description: "El indicador de requerido se activa automáticamente si el campo es required.",
      preview: (
        <FormControl required>
          <Label htmlFor="label-required">Nombre</Label>
          <Input id="label-required" placeholder="Elena Ruiz" />
          <FormControl.Description>Este campo es obligatorio.</FormControl.Description>
        </FormControl>
      ),
    },
    {
      id: "ejemplos-opcional",
      title: "Opcional",
      description: "Usa optional para mostrar el indicador.",
      preview: (
        <div className="flex flex-wrap gap-6">
          <Label optional>Descripción</Label>
          <Label requiredIndicator>Correo</Label>
        </div>
      ),
    },
    {
      id: "ejemplos-custom",
      title: "Control externo",
      description: "Funciona con cualquier control usando htmlFor.",
      preview: (
        <div className="flex items-center gap-3">
          <Checkbox id="label-checkbox" />
          <Label htmlFor="label-checkbox">Acepto términos</Label>
        </div>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "htmlFor",
          type: "string",
          defaultValue: "context",
          description:
            "Asocia el label con un control. Si está dentro de FormControl usa su controlId.",
        },
        {
          name: "optional",
          type: "boolean",
          defaultValue: "false",
          description: "Muestra un indicador de opcional.",
        },
        {
          name: "requiredIndicator",
          type: "boolean",
          defaultValue: "true",
          description:
            "Muestra indicador de requerido cuando FormControl está en required.",
        },
      ],
      notes: [
        "Label acepta atributos nativos de HTMLLabelElement.",
        "Si optional es true, no se renderiza el indicador de requerido.",
      ],
    },
  ],
};

COMPONENT_DOCS.input = {
  name: "Input",
  description:
    "Campo base con soporte para search, password, clear button y elementos laterales.",
  previewCode: INPUT_PREVIEW_CODE,
  preview: <InputPreviewCanvas />,
  installCode: `import { Input } from "quickit-ui";`,
  usageCode: `import { Input } from "quickit-ui";

export function InputUsage() {
  return (
    <Input
      type="search"
      placeholder="Buscar"
      clearButton
      leftElement={<span>@</span>}
    />
  );
}`,
  examples: [
    {
      id: "ejemplos-tamanos",
      title: "Tamaños",
      description: "Sizes disponibles: sm, md, lg.",
      preview: (
        <div className="grid gap-3 sm:grid-cols-2">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </div>
      ),
    },
    {
      id: "ejemplos-elementos",
      title: "Elementos laterales",
      description: "Usa leftElement y rightElement.",
      preview: (
        <div className="grid gap-3 sm:grid-cols-2">
          <Input leftElement={<span>@</span>} placeholder="Usuario" />
          <Input
            rightElement={<span className="text-xs">CTA</span>}
            placeholder="Buscar"
          />
        </div>
      ),
    },
    {
      id: "ejemplos-password",
      title: "Password",
      description: "Activa passwordToggle para mostrar/ocultar.",
      preview: (
        <div className="grid gap-3 sm:grid-cols-2">
          <Input type="password" placeholder="••••••" passwordToggle />
          <Input
            type="password"
            placeholder="••••••"
            passwordToggle
            defaultPasswordVisible
          />
        </div>
      ),
    },
    {
      id: "ejemplos-clear",
      title: "Clear button",
      description: "Ideal para inputs search.",
      preview: (
        <div className="grid gap-3 sm:grid-cols-2">
          <Input type="search" placeholder="Buscar" clearButton />
          <Input
            type="search"
            placeholder="Filtro"
            clearButton
            clearButtonLabel="Limpiar"
          />
        </div>
      ),
    },
    {
      id: "ejemplos-formcontrol",
      title: "Con FormControl",
      description: "Útil para mensajes de error y required.",
      preview: (
        <FormControl invalid required>
          <Label htmlFor="doc-email">Correo</Label>
          <Input id="doc-email" type="email" placeholder="tu@email.com" />
          <FormControl.Message>El correo es obligatorio.</FormControl.Message>
        </FormControl>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "color",
          type: "QuickitSemanticColor",
          defaultValue: `"neutral"`,
          description: "Color del campo.",
        },
        {
          name: "size",
          type: `"sm" | "md" | "lg"`,
          defaultValue: `"md"`,
          description: "Controla altura y padding.",
        },
        {
          name: "shape",
          type: `"square" | "pill"`,
          defaultValue: `"square"`,
          description: "Geometría del input.",
        },
        {
          name: "actionShape",
          type: `"square" | "circle"`,
          defaultValue: `"circle"`,
          description: "Forma de los botones internos.",
        },
        {
          name: "invalid",
          type: "boolean",
          defaultValue: "false",
          description: "Muestra estado inválido.",
        },
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
          description: "Marca el campo como requerido.",
        },
        {
          name: "leftElement",
          type: "ReactNode",
          defaultValue: "undefined",
          description: "Elemento alineado a la izquierda.",
        },
        {
          name: "rightElement",
          type: "ReactNode",
          defaultValue: "undefined",
          description: "Elemento alineado a la derecha.",
        },
        {
          name: "clearButton",
          type: "boolean",
          defaultValue: "false",
          description: "Activa el botón de limpiar.",
        },
        {
          name: "clearButtonLabel",
          type: "string",
          defaultValue: `"Limpiar búsqueda"`,
          description: "Label accesible del botón de limpiar.",
        },
        {
          name: "clearIcon",
          type: "ReactNode",
          defaultValue: "undefined",
          description: "Icono personalizado para el botón clear.",
        },
        {
          name: "onClear",
          type: "() => void",
          defaultValue: "undefined",
          description: "Se dispara al limpiar el input.",
        },
        {
          name: "passwordToggle",
          type: "boolean",
          defaultValue: "false",
          description: "Activa el toggle de contraseña.",
        },
        {
          name: "defaultPasswordVisible",
          type: "boolean",
          defaultValue: "false",
          description: "Define si inicia con la contraseña visible.",
        },
        {
          name: "showPasswordIcon",
          type: "ReactNode",
          defaultValue: "undefined",
          description: "Icono cuando la contraseña está oculta.",
        },
        {
          name: "hidePasswordIcon",
          type: "ReactNode",
          defaultValue: "undefined",
          description: "Icono cuando la contraseña está visible.",
        },
        {
          name: "showPasswordLabel",
          type: "string",
          defaultValue: `"Mostrar contraseña"`,
          description: "Label accesible cuando está oculta.",
        },
        {
          name: "hidePasswordLabel",
          type: "string",
          defaultValue: `"Ocultar contraseña"`,
          description: "Label accesible cuando está visible.",
        },
        {
          name: "onPasswordVisibilityChange",
          type: "(visible: boolean) => void",
          defaultValue: "undefined",
          description: "Se dispara al cambiar visibilidad.",
        },
      ],
      notes: [
        "Input acepta atributos nativos de HTMLInputElement (type, value, onChange, disabled, readOnly, name, autoComplete).",
        "type=\"search\" activa clearButton automáticamente; type=\"password\" activa passwordToggle. Puedes sobrescribirlo con props.",
        "Ctrl + Espacio limpia el input cuando hay contenido.",
      ],
    },
  ],
};

COMPONENT_DOCS["input-group"] = {
  name: "InputGroup",
  description:
    "Agrupa inputs, addons y acciones dentro de un mismo contenedor.",
  previewCode: INPUT_GROUP_PREVIEW_CODE,
  preview: <InputGroupPreviewCanvas />,
  installCode: `import { InputGroup, Input } from "quickit-ui";`,
  usageCode: `import { InputGroup, Input } from "quickit-ui";

export function InputGroupUsage() {
  return (
    <InputGroup attached>
      <InputGroup.Addon align="start">https://</InputGroup.Addon>
      <Input placeholder="quickit.dev" />
      <InputGroup.Action>Ir</InputGroup.Action>
    </InputGroup>
  );
}`,
    examples: [
      {
        id: "ejemplos-layout",
        title: "Layouts",
        description: "Usa layout inline o grid con columns.",
        preview: (
          <div className="grid gap-4">
            <InputGroup layout="inline" attached>
              <InputGroup.Addon align="inline-start">+1</InputGroup.Addon>
              <Input placeholder="Teléfono" />
            </InputGroup>
            <InputGroup layout="grid" columns={2} attached>
              <InputGroup.Item>
                <Input placeholder="Nombre" />
              </InputGroup.Item>
              <InputGroup.Item>
                <Input placeholder="Apellido" />
              </InputGroup.Item>
            </InputGroup>
          </div>
        ),
      },
      {
        id: "ejemplos-acciones",
        title: "Acciones y addons",
        description: "Combina addons y botones internos.",
        preview: (
          <div className="grid gap-4">
            <InputGroup attached>
              <InputGroup.Addon align="inline-start">@</InputGroup.Addon>
              <Input placeholder="usuario" />
              <InputGroup.Action variant="outline">Verificar</InputGroup.Action>
            </InputGroup>
            <InputGroup attached>
              <InputGroup.Addon align="inline-start">https://</InputGroup.Addon>
              <Input placeholder="quickit.dev" />
            </InputGroup>
          </div>
        ),
      },
      {
        id: "ejemplos-props",
        title: "Props",
        props: [
        {
          name: "attached",
          type: "boolean",
          defaultValue: "false",
          description: "Une los elementos en una sola cápsula.",
        },
        {
          name: "layout",
          type: `"inline" | "grid"`,
          defaultValue: `"inline"`,
          description: "Distribuye los hijos.",
        },
        {
          name: "columns",
          type: "number | string",
          defaultValue: "undefined",
          description: "Define columnas para layout grid.",
        },
        {
          name: "color",
          type: "QuickitSemanticColor",
          defaultValue: `"neutral"`,
          description: "Color compartido.",
        },
        {
          name: "size",
          type: `"sm" | "md" | "lg"`,
          defaultValue: `"md"`,
          description: "Tamaño del grupo.",
        },
        {
          name: "shape",
          type: `"square" | "pill"`,
          defaultValue: `"square"`,
          description: "Forma del contenedor.",
        },
        {
          name: "fullWidth",
          type: "boolean",
          defaultValue: "true",
          description: "Hace el grupo 100% ancho.",
        },
      ],
      notes: [
        "InputGroup.Item soporta grow (boolean) y span (number) para layout grid.",
        "InputGroup.Addon soporta align: start | center | end | inline-start | inline-end.",
        "InputGroup.Action es un Button compacto con variant, size y activeMotion (desactivado por defecto). Los nombres planos (InputGroupItem, etc.) siguen exportados.",
      ],
    },
  ],
};

COMPONENT_DOCS.range = {
  name: "Range",
  description:
    "Slider de un solo valor: `input type=\"range\"` estilizado con tokens de color y tamaño.",
  previewCode: RANGE_PREVIEW_CODE,
  preview: <RangePreviewCanvas />,
  installCode: `import { Range } from "quickit-ui";`,
  usageCode: `import { Range } from "quickit-ui";

export function RangeUsage() {
  return <Range defaultValue={50} min={0} max={100} step={5} />;
}`,
  examples: [
    {
      id: "ejemplos-colores",
      title: "Colores",
      description: "Usa tokens semánticos para mantener consistencia.",
      preview: (
        <div className="space-y-3">
          <Range defaultValue={40} color="neutral" />
          <Range defaultValue={60} color="brand" />
          <Range defaultValue={80} color="success" />
        </div>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "color",
          type: "QuickitSemanticColor",
          defaultValue: `"primary"`,
          description: "Color del thumb (accent nativo).",
        },
        {
          name: "size",
          type: `"sm" | "md" | "lg"`,
          defaultValue: `"md"`,
          description: "Altura del slider.",
        },
        {
          name: "min",
          type: "number",
          defaultValue: "0",
          description: "Límite inferior del eje.",
        },
        {
          name: "max",
          type: "number",
          defaultValue: "100",
          description: "Límite superior del eje.",
        },
        {
          name: "step",
          type: "number",
          defaultValue: "1",
          description: "Incremento por paso.",
        },
        {
          name: "value",
          type: "number",
          defaultValue: "undefined",
          description: "Valor controlado.",
        },
        {
          name: "defaultValue",
          type: "number",
          defaultValue: "undefined",
          description: "Valor inicial en modo no controlado.",
        },
        {
          name: "onChange",
          type: "(event) => void",
          defaultValue: "undefined",
          description: "Evento nativo del input.",
        },
      ],
      notes: [
        "El resto de props válidas de `input type=\"range\"` se reenvían al elemento nativo.",
      ],
    },
  ],
};

COMPONENT_DOCS.textarea = {
  name: "Textarea",
  description: "Área de texto multi línea alineada con Input.",
  previewCode: TEXTAREA_PREVIEW_CODE,
  preview: <TextareaPreviewCanvas />,
  installCode: `import { Textarea } from "quickit-ui";`,
  usageCode: `import { Textarea } from "quickit-ui";

export function TextareaUsage() {
  return <Textarea minRows={4} placeholder="Escribe algo..." />;
}`,
  examples: [
    {
      id: "ejemplos-formcontrol",
      title: "Con FormControl",
      description: "Ideal para estados inválidos y descripción.",
      preview: (
        <FormControl invalid required>
          <Label htmlFor="doc-textarea-form">Mensaje</Label>
          <Textarea
            id="doc-textarea-form"
            minRows={4}
            placeholder="Describe el problema..."
          />
          <FormControl.Description>Se enviará al equipo de soporte.</FormControl.Description>
          <FormControl.Message>El mensaje es obligatorio.</FormControl.Message>
        </FormControl>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "color",
          type: "QuickitSemanticColor",
          defaultValue: `"neutral"`,
          description: "Color del campo.",
        },
        {
          name: "minRows",
          type: "number",
          defaultValue: "3",
          description: "Controla la altura mínima.",
        },
        {
          name: "invalid",
          type: "boolean",
          defaultValue: "false",
          description: "Muestra estado inválido.",
        },
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
          description: "Marca como requerido.",
        },
      ],
      notes: ["Textarea acepta atributos nativos de HTMLTextAreaElement."],
    },
  ],
};

COMPONENT_DOCS.select = {
  name: "Select",
  description:
    "Selector composable con trigger y panel flotante basado en opciones nativas.",
  previewCode: SELECT_PREVIEW_CODE,
  preview: <SelectPreviewCanvas />,
  installCode: `import { Select } from "quickit-ui";`,
  usageCode: `import { Select } from "quickit-ui";

export function SelectUsage() {
  return (
    <Select placeholder="Estado">
      <option value="active">Activo</option>
      <option value="paused">Pausado</option>
      <option value="blocked">Bloqueado</option>
    </Select>
  );
}`,
    examples: [
      {
        id: "ejemplos-tamanos",
        title: "Tamaños",
        description: "sm, md, lg.",
        preview: (
          <div className="grid gap-3 sm:grid-cols-2">
            <Select size="sm" placeholder="Small">
              <option value="1">Opción</option>
            </Select>
            <Select size="md" placeholder="Medium">
              <option value="1">Opción</option>
            </Select>
            <Select size="lg" placeholder="Large">
              <option value="1">Opción</option>
            </Select>
          </div>
        ),
      },
    {
      id: "ejemplos-formcontrol",
      title: "Con Label",
      description: "Úsalo dentro de FormControl para estados y mensajes.",
      preview: (
        <FormControl required>
            <div className="mt-3">
              <Label htmlFor="doc-select-form">Estado</Label>
              <Select id="doc-select-form" placeholder="Selecciona estado">
                <option value="active">Activo</option>
                <option value="paused">Pausado</option>
              </Select>
            </div>
            <FormControl.Description>Este dato se usa en reportes.</FormControl.Description>
        </FormControl>
      ),
    },
    {
      id: "ejemplos-disabled",
      title: "Disabled",
      description: "Deshabilita el select para evitar interacción.",
      preview: (
        <Select disabled placeholder="No disponible">
          <option value="1">Opción</option>
        </Select>
      ),
    },
    {
      id: "ejemplos-controlado",
      title: "Controlado",
      description: "Escucha onValueChange cuando necesitas reaccionar.",
      preview: (
        <Select defaultValue="active" onValueChange={(value) => value}>
          <option value="active">Activo</option>
          <option value="paused">Pausado</option>
        </Select>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "color",
          type: "QuickitSemanticColor",
          defaultValue: `"neutral"`,
          description: "Color del select.",
        },
        {
          name: "size",
          type: `"sm" | "md" | "lg"`,
          defaultValue: `"md"`,
          description: "Tamaño del control.",
        },
        {
          name: "defaultValue",
          type: "string | number",
          defaultValue: "undefined",
          description: "Valor inicial cuando es uncontrolled.",
        },
        {
          name: "value",
          type: "string | number",
          defaultValue: "undefined",
          description: "Controla el valor seleccionado.",
        },
        {
          name: "placeholder",
          type: "ReactNode",
          defaultValue: "undefined",
          description: "Texto cuando no hay valor.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Deshabilita el select.",
        },
        {
          name: "invalid",
          type: "boolean",
          defaultValue: "false",
          description: "Muestra estado inválido.",
        },
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
          description: "Marca como requerido.",
        },
        {
          name: "name",
          type: "string",
          defaultValue: "undefined",
          description: "Nombre del campo en formularios.",
        },
        {
          name: "usePortal",
          type: "boolean",
          defaultValue: "true",
          description: "Renderiza el panel en portal.",
        },
        {
          name: "onChange",
          type: "(event) => void",
          defaultValue: "undefined",
          description: "Callback de cambio.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          defaultValue: "undefined",
          description: "Callback con el valor.",
        },
      ],
      notes: ["Select acepta <option> como hijos para definir opciones."],
    },
  ],
};

COMPONENT_DOCS.checkbox = {
  name: "Checkbox",
  description: "Control binario con label y handlers explícitos.",
  previewCode: CHECKBOX_PREVIEW_CODE,
  preview: <CheckboxPreviewCanvas />,
  installCode: `import { Checkbox } from "quickit-ui";`,
  usageCode: `import { Checkbox } from "quickit-ui";

export function CheckboxUsage() {
  return (
    <Checkbox
      label="Acepto términos"
      onCheckedChange={(checked) => console.log(checked)}
    />
  );
}`,
  examples: [
    {
      id: "ejemplos-tamanos",
      title: "Tamaños",
      description: `Tamaños compactos: ${QUICKIT_COMPACT_CONTROL_SIZES.join(", ")}.`,
      preview: (
        <div className="grid gap-2">
          <Checkbox size="sm" label="Small" />
          <Checkbox size="md" label="Medium" />
        </div>
      ),
    },
    {
      id: "ejemplos-colores",
      title: "Colores",
      description: "Aplica colores semánticos.",
      preview: (
        <div className="grid gap-2">
          <Checkbox color="neutral" label="Neutral" defaultChecked />
          <Checkbox color="brand" label="Brand" defaultChecked />
        </div>
      ),
    },
    {
      id: "ejemplos-grupo",
      title: "Grupo con descripción",
      description: "Combina con FormControl, Label y FormControl.Message.",
      preview: (
        <FormControl required>
          <div className="mt-3 grid gap-2">
            <Checkbox
              id="prefs-weekly"
              label="Correos semanales"
              defaultChecked
            />
            <Checkbox id="prefs-alerts" label="Alertas de seguridad" />
          </div>
          <FormControl.Description>Selecciona lo que quieras recibir.</FormControl.Description>
          <FormControl.Message>Este campo es requerido.</FormControl.Message>
        </FormControl>
      ),
    },
    {
      id: "ejemplos-label",
      title: "Label externo",
      description: "Usa Label con htmlFor cuando no quieras la prop label.",
      preview: (
        <div className="flex items-center gap-3">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Acepto los términos</Label>
        </div>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "color",
          type: "QuickitSemanticColor",
          defaultValue: `"neutral"`,
          description: "Color del control.",
        },
        {
          name: "size",
          type: "QuickitCompactControlSize",
          defaultValue: `"md"`,
          description: "Tamaño del checkbox.",
        },
        {
          name: "label",
          type: "ReactNode",
          defaultValue: "undefined",
          description: "Texto descriptivo.",
        },
        {
          name: "invalid",
          type: "boolean",
          defaultValue: "false",
          description: "Muestra estado inválido.",
        },
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
          description: "Marca el campo como requerido.",
        },
        {
          name: "containerClassName",
          type: "string",
          defaultValue: "undefined",
          description: "Clases del contenedor externo.",
        },
        {
          name: "labelClassName",
          type: "string",
          defaultValue: "undefined",
          description: "Clases para el label interno.",
        },
        {
          name: "onCheckedChange",
          type: "(checked, event) => void",
          defaultValue: "undefined",
          description: "Callback de cambio.",
        },
      ],
      notes: [
        "Checkbox acepta atributos nativos de input (checked, defaultChecked, disabled, name, value, onChange).",
      ],
    },
  ],
};

COMPONENT_DOCS.radio = {
  name: "Radio",
  description: "Selección exclusiva con API coherente con Checkbox.",
  previewCode: RADIO_PREVIEW_CODE,
  preview: <RadioPreviewCanvas />,
  installCode: `import { Radio } from "quickit-ui";`,
  usageCode: `import { Radio } from "quickit-ui";

export function RadioUsage() {
  return (
    <Radio
      label="Plan anual"
      onCheckedChange={(checked) => console.log(checked)}
    />
  );
}`,
  examples: [
    {
      id: "ejemplos-tamanos",
      title: "Tamaños",
      description: `Tamaños compactos: ${QUICKIT_COMPACT_CONTROL_SIZES.join(", ")}.`,
      preview: (
        <div className="grid gap-2">
          <Radio size="sm" label="Small" />
          <Radio size="md" label="Medium" />
        </div>
      ),
    },
    {
      id: "ejemplos-colores",
      title: "Colores",
      description: "Aplica colores semánticos.",
      preview: (
        <div className="grid gap-2">
          <Radio color="neutral" label="Neutral" defaultChecked />
          <Radio color="brand" label="Brand" defaultChecked />
        </div>
      ),
    },
    {
      id: "ejemplos-grupo",
      title: "Grupo de opciones",
      description: "Combina varios radios con el mismo name.",
      preview: (
        <FormControl required>
          <div className="mt-3 grid gap-2">
            <Radio id="plan-monthly" name="plan" label="Mensual" />
            <Radio id="plan-annual" name="plan" label="Anual" />
          </div>
          <FormControl.Message>Selecciona una opción.</FormControl.Message>
        </FormControl>
      ),
    },
    {
      id: "ejemplos-label",
      title: "Label externo",
      description: "Usa Label con htmlFor cuando necesites layout custom.",
      preview: (
        <div className="flex items-center gap-3">
          <Radio id="plan-pro" name="plan-2" />
          <Label htmlFor="plan-pro">Plan Pro</Label>
        </div>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "color",
          type: "QuickitSemanticColor",
          defaultValue: `"neutral"`,
          description: "Color del control.",
        },
        {
          name: "size",
          type: "QuickitCompactControlSize",
          defaultValue: `"md"`,
          description: "Tamaño del radio.",
        },
        {
          name: "label",
          type: "ReactNode",
          defaultValue: "undefined",
          description: "Texto descriptivo.",
        },
        {
          name: "invalid",
          type: "boolean",
          defaultValue: "false",
          description: "Muestra estado inválido.",
        },
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
          description: "Marca el campo como requerido.",
        },
        {
          name: "containerClassName",
          type: "string",
          defaultValue: "undefined",
          description: "Clases del contenedor externo.",
        },
        {
          name: "labelClassName",
          type: "string",
          defaultValue: "undefined",
          description: "Clases para el label interno.",
        },
        {
          name: "onCheckedChange",
          type: "(checked, event) => void",
          defaultValue: "undefined",
          description: "Callback de cambio.",
        },
      ],
      notes: [
        "Radio acepta atributos nativos de input (checked, defaultChecked, disabled, name, value, onChange).",
      ],
    },
  ],
};

COMPONENT_DOCS.switch = {
  name: "Switch",
  description: "Toggle visual para estados activado/desactivado.",
  previewCode: SWITCH_PREVIEW_CODE,
  preview: <SwitchPreviewCanvas />,
  installCode: `import { Switch } from "quickit-ui";`,
  usageCode: `import { Switch } from "quickit-ui";

export function SwitchUsage() {
  return (
    <Switch
      defaultChecked
      onCheckedChange={(checked) => console.log(checked)}
    />
  );
}`,
  examples: [
    {
      id: "ejemplos-tamanos",
      title: "Tamaños",
      description: `Tamaños compactos: ${QUICKIT_COMPACT_CONTROL_SIZES.join(", ")}.`,
      preview: (
        <div className="grid gap-2">
          <Switch size="sm" label="Small" />
          <Switch size="md" label="Medium" />
        </div>
      ),
    },
    {
      id: "ejemplos-colores",
      title: "Colores",
      description: "Aplica colores semánticos.",
      preview: (
        <div className="grid gap-2">
          <Switch defaultChecked color="neutral" label="Neutral" />
          <Switch defaultChecked color="brand" label="Brand" />
        </div>
      ),
    },
    {
      id: "ejemplos-formcontrol",
      title: "Con FormControl",
      description: "Útil cuando necesitas descripción y estado.",
      preview: (
        <FormControl>
          <div className="mt-3">
            <Switch defaultChecked label="Modo oscuro" />
          </div>
          <FormControl.Description>Aplica el tema oscuro a toda la app.</FormControl.Description>
        </FormControl>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "checked",
          type: "boolean",
          defaultValue: "undefined",
          description: "Controla el estado.",
        },
        {
          name: "defaultChecked",
          type: "boolean",
          defaultValue: "false",
          description: "Estado inicial.",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean) => void",
          defaultValue: "undefined",
          description: "Callback de cambio.",
        },
        {
          name: "onChange",
          type: "(event) => void",
          defaultValue: "undefined",
          description: "Callback con evento tipo change.",
        },
        {
          name: "color",
          type: "QuickitSemanticColor",
          defaultValue: `"neutral"`,
          description: "Color del switch.",
        },
        {
          name: "size",
          type: "QuickitCompactControlSize",
          defaultValue: `"md"`,
          description: "Tamaño del switch.",
        },
        {
          name: "label",
          type: "ReactNode",
          defaultValue: "undefined",
          description: "Texto descriptivo.",
        },
        {
          name: "invalid",
          type: "boolean",
          defaultValue: "false",
          description: "Muestra estado inválido.",
        },
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
          description: "Marca el campo como requerido.",
        },
        {
          name: "name",
          type: "string",
          defaultValue: "undefined",
          description: "Nombre del campo en formularios.",
        },
        {
          name: "value",
          type: "string",
          defaultValue: `"on"`,
          description: "Valor enviado cuando está checked.",
        },
        {
          name: "containerClassName",
          type: "string",
          defaultValue: "undefined",
          description: "Clases del contenedor externo.",
        },
        {
          name: "labelClassName",
          type: "string",
          defaultValue: "undefined",
          description: "Clases del label interno.",
        },
      ],
      notes: [
        "Switch acepta atributos nativos de button (disabled, onClick).",
      ],
    },
  ],
};

COMPONENT_DOCS.accordion = {
  name: "Accordion",
  description: "Secciones colapsables con soporte single o multiple.",
  previewCode: ACCORDION_PREVIEW_CODE,
  preview: <AccordionPreviewCanvas />,
  installCode: `import { Accordion } from "quickit-ui";`,
  usageCode: `import { Accordion } from "quickit-ui";

export function AccordionUsage() {
  return (
    <Accordion type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>¿Qué incluye?</Accordion.Trigger>
        <Accordion.Content>Incluye componentes base.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}`,
  examples: [
    {
      id: "ejemplos-multiple",
      title: "Multiple",
      description: "Permite abrir más de un panel.",
      preview: (
        <Accordion type="multiple" defaultValue={["item-1"]}>
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Detalles</Accordion.Trigger>
            <Accordion.Content>Contenido 1.</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Notas</Accordion.Trigger>
            <Accordion.Content>Contenido 2.</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "type",
          type: `"single" | "multiple"`,
          defaultValue: `"single"`,
          description: "Define si permite uno o varios items abiertos.",
        },
        {
          name: "collapsible",
          type: "boolean",
          defaultValue: "false",
          description: "Permite cerrar el item activo en modo single.",
        },
        {
          name: "defaultValue",
          type: "string | string[]",
          defaultValue: "undefined",
          description: "Valor inicial para items abiertos.",
        },
        {
          name: "value",
          type: "string | string[] | null",
          defaultValue: "undefined",
          description: "Controla los items abiertos.",
        },
        {
          name: "onValueChange",
          type: "(value) => void",
          defaultValue: "undefined",
          description: "Callback cuando cambia el valor.",
        },
      ],
      notes: [
        "Accordion.Item requiere prop value (también disponible como AccordionItem).",
        "Accordion.Content acepta forceMount; el nombre plano AccordionContent sigue exportado.",
      ],
    },
  ],
};

COMPONENT_DOCS.breadcrumb = {
  name: "Breadcrumb",
  description: "Ruta jerárquica con links y current item.",
  previewCode: BREADCRUMB_PREVIEW_CODE,
  preview: <BreadcrumbPreviewCanvas />,
  installCode: `import { Breadcrumb } from "quickit-ui";`,
  usageCode: `import { Breadcrumb } from "quickit-ui";

export function BreadcrumbUsage() {
  return (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Current>Productos</Breadcrumb.Current>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  );
}`,
  examples: [
    {
      id: "ejemplos-separador",
      title: "Separador automático",
      description: "Breadcrumb.List agrega separadores si no los defines manualmente.",
      preview: (
        <Breadcrumb>
          <Breadcrumb.List separator="•">
            <Breadcrumb.Item href="#">Inicio</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Ventas</Breadcrumb.Item>
            <Breadcrumb.Item current>Detalle</Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "separator",
          type: "ReactNode",
          defaultValue: `" / "`,
          description: "Define el separador en Breadcrumb.List.",
        },
        {
          name: "separatorClassName",
          type: "string",
          defaultValue: "undefined",
          description: "Clases del separador automático.",
        },
        {
          name: "allowLink",
          type: "boolean",
          defaultValue: "false",
          description: "Permite convertir Breadcrumb.Item en link.",
        },
        {
          name: "current",
          type: "boolean",
          defaultValue: "false",
          description: "Marca el item como actual.",
        },
        {
          name: "href",
          type: "string",
          defaultValue: "undefined",
          description: "URL para Breadcrumb.Item cuando allowLink.",
        },
        {
          name: "linkVariant",
          type: "QuickitLinkTextVariant",
          defaultValue: `"muted"`,
          description: "Variante de Link cuando se renderiza como enlace.",
        },
        {
          name: "underline",
          type: "QuickitLinkUnderline",
          defaultValue: `"hover"`,
          description: "Subrayado del Link.",
        },
        {
          name: "contentClassName",
          type: "string",
          defaultValue: "undefined",
          description: "Clases aplicadas al contenido del item.",
        },
        {
          name: "title",
          type: "string",
          defaultValue: "undefined",
          description: "Tooltip nativo opcional.",
        },
      ],
      notes: [
        "Breadcrumb.Item renderiza Link automáticamente si pasas href o allowLink (exports BreadcrumbItem, etc. siguen disponibles).",
        "Breadcrumb.Separator permite separadores manuales cuando necesitas layout custom.",
      ],
    },
  ],
};

COMPONENT_DOCS.pagination = {
  name: "Pagination",
  description: "Paginación controlada o no controlada.",
  previewCode: PAGINATION_PREVIEW_CODE,
  preview: <PaginationPreviewCanvas />,
  installCode: `import { Pagination } from "quickit-ui";`,
  usageCode: `import { Pagination } from "quickit-ui";

export function PaginationUsage() {
  return <Pagination count={12} onPageChange={(page) => console.log(page)} />;
}`,
  examples: [
    {
      id: "ejemplos-controlado",
      title: "Controlado",
      description: "Usa page y onPageChange cuando el estado vive fuera.",
      preview: <Pagination count={10} page={3} onPageChange={() => {}} />,
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        { name: "count", type: "number", defaultValue: "required", description: "Número total de páginas." },
        { name: "page", type: "number", defaultValue: "undefined", description: "Página controlada." },
        { name: "defaultPage", type: "number", defaultValue: "1", description: "Página inicial." },
        { name: "onPageChange", type: "(page: number) => void", defaultValue: "undefined", description: "Callback al cambiar página." },
        { name: "siblingCount", type: "number", defaultValue: "1", description: "Cantidad de páginas adyacentes visibles." },
        { name: "disabled", type: "boolean", defaultValue: "false", description: "Deshabilita la paginación." },
        { name: "color", type: "QuickitSemanticColor", defaultValue: `"neutral"`, description: "Color del control." },
      ],
    },
  ],
};

COMPONENT_DOCS.tabs = {
  name: "Tabs",
  description: "Navegación por paneles con teclado y modo manual.",
  previewCode: TABS_PREVIEW_CODE,
  preview: <TabsPreviewCanvas />,
  installCode: `import { Tabs } from "quickit-ui";`,
  usageCode: `import { Tabs } from "quickit-ui";

export function TabsUsage() {
  return (
    <Tabs defaultValue="overview">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">Resumen</Tabs.Content>
      <Tabs.Content value="stats">Métricas</Tabs.Content>
    </Tabs>
  );
}`,
  examples: [
    {
      id: "ejemplos-orientacion",
      title: "Orientación vertical",
      description: "Tabs puede orientarse verticalmente.",
      preview: (
        <Tabs defaultValue="overview" orientation="vertical">
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview">Resumen</Tabs.Content>
          <Tabs.Content value="stats">Métricas</Tabs.Content>
        </Tabs>
      ),
    },
    {
      id: "ejemplos-manual",
      title: "Activación manual",
      description: "El tab cambia al presionar Enter/Space.",
      preview: (
        <Tabs defaultValue="overview" activationMode="manual">
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview">Resumen</Tabs.Content>
          <Tabs.Content value="stats">Métricas</Tabs.Content>
        </Tabs>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        { name: "defaultValue", type: "string", defaultValue: "undefined", description: "Tab inicial." },
        { name: "value", type: "string", defaultValue: "undefined", description: "Controla el tab activo." },
        { name: "onValueChange", type: "(value: string) => void", defaultValue: "undefined", description: "Callback al cambiar tab." },
        { name: "orientation", type: `"horizontal" | "vertical"`, defaultValue: `"horizontal"`, description: "Orientación de la lista." },
        { name: "activationMode", type: `"automatic" | "manual"`, defaultValue: `"automatic"`, description: "Modo de activación con teclado." },
        { name: "size", type: "QuickitTabSize", defaultValue: `"md"`, description: "Tamaño visual del tab." },
        { name: "color", type: "QuickitSemanticColor", defaultValue: `"neutral"`, description: "Color activo." },
      ],
      notes: [
        "Tabs.Trigger requiere prop value (TabsTrigger sigue exportado con nombre).",
        "Tabs.Content acepta forceMount.",
      ],
    },
  ],
};

COMPONENT_DOCS.dropdown = {
  name: "Dropdown",
  description: "Menú flotante composable con items y separadores.",
  previewCode: DROPDOWN_PREVIEW_CODE,
  preview: <DropdownPreviewCanvas />,
  installCode: `import { Dropdown } from "quickit-ui";`,
  usageCode: `import { Dropdown } from "quickit-ui";

export function DropdownUsage() {
  return (
    <Dropdown>
      <Dropdown.Trigger>Acciones</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Editar</Dropdown.Item>
        <Dropdown.Item>Duplicar</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}`,
  examples: [
    {
      id: "ejemplos-trigger",
      title: "Triggers",
      description: "Puedes usar un botón o cualquier nodo con asChild.",
      preview: (
        <div className="flex flex-wrap gap-3">
          <Dropdown>
            <Dropdown.Trigger>Acciones</Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Editar</Dropdown.Item>
              <Dropdown.Item>Duplicar</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
          <Dropdown>
            <Dropdown.Trigger asChild>
              <Button color="neutral" variant="outline" size="sm">
                Más opciones
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Compartir</Dropdown.Item>
              <Dropdown.Item>Archivar</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      ),
    },
    {
      id: "ejemplos-items",
      title: "Items y variantes",
      description: "Incluye estados disabled, separators y variant danger.",
      preview: (
        <Dropdown>
          <Dropdown.Trigger>Opciones</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Editar</Dropdown.Item>
            <Dropdown.Item disabled>Duplicar</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item variant="danger">Eliminar</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      ),
    },
    {
      id: "ejemplos-links",
      title: "Items con link",
      description: "DropdownItem puede renderizarse como link con href.",
      preview: (
        <Dropdown>
          <Dropdown.Trigger>Ir a</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item href="#perfil">Perfil</Dropdown.Item>
            <Dropdown.Item href="#config">Configuración</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      ),
    },
    {
      id: "ejemplos-placement",
      title: "Placement y offsets",
      description: "Ajusta placement, offsetX y collisionPadding.",
      preview: (
        <Dropdown placement="top-end" offsetX={8} collisionPadding={12}>
          <Dropdown.Trigger>Posición</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Top end</Dropdown.Item>
            <Dropdown.Item>Offset 8</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Estado inicial." },
        { name: "open", type: "boolean", defaultValue: "undefined", description: "Controla el dropdown." },
        { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "undefined", description: "Callback de apertura." },
        { name: "placement", type: "string", defaultValue: `"bottom-end"`, description: "Posición del panel." },
        { name: "offsetX", type: "number", defaultValue: "0", description: "Offset horizontal." },
        { name: "collisionPadding", type: "number", defaultValue: "8", description: "Padding contra bordes." },
        { name: "usePortal", type: "boolean", defaultValue: "true", description: "Renderiza el panel en portal." },
        { name: "closeOnClickOutside", type: "boolean", defaultValue: "true", description: "Cierra al hacer click fuera." },
        { name: "closeOnScroll", type: "boolean", defaultValue: "false", description: "Cierra al hacer scroll." },
        { name: "showArrow", type: "boolean", defaultValue: "true", description: "Muestra flecha del panel." },
      ],
      notes: [
        "Dropdown.Trigger soporta asChild para usar un Button u otro componente.",
        "Dropdown.Item soporta as, href, disabled, closeOnClick y variant=\"danger\".",
      ],
    },
  ],
};

COMPONENT_DOCS.drawer = {
  name: "Drawer",
  description: "Panel lateral o inferior con overlay, header y acciones.",
  previewCode: DRAWER_PREVIEW_CODE,
  preview: <DrawerPreviewCanvas />,
  installCode: `import { Drawer } from "quickit-ui";`,
  usageCode: `import { Drawer, Button } from "quickit-ui";

export function DrawerUsage() {
  return (
    <Drawer placement="right">
      <Drawer.Trigger>
        <Button>Ver detalles</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Actividad</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>Contenido del drawer.</Drawer.Body>
        <Drawer.Actions>
          <Drawer.Action variant="outline">Cerrar</Drawer.Action>
        </Drawer.Actions>
      </Drawer.Content>
    </Drawer>
  );
}`,
  examples: [
    {
      id: "ejemplos-placements",
      title: "Placements",
      description: "Right, left, bottom y top.",
      preview: (
        <div className="grid gap-3 sm:grid-cols-2">
          <Drawer placement="right">
            <Drawer.Trigger>
              <Button size="sm" variant="outline">Right</Button>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Body>Drawer right</Drawer.Body>
            </Drawer.Content>
          </Drawer>
          <Drawer placement="bottom">
            <Drawer.Trigger>
              <Button size="sm" variant="outline">Bottom</Button>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Body>Drawer bottom</Drawer.Body>
            </Drawer.Content>
          </Drawer>
        </div>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "placement",
          type: `"right" | "left" | "bottom" | "top"`,
          defaultValue: `"right"`,
          description: "Ubicación del panel.",
        },
        {
          name: "size",
          type: "string",
          defaultValue: "auto",
          description: "Clase para ancho/alto máximo del panel.",
        },
        {
          name: "open",
          type: "boolean",
          defaultValue: "undefined",
          description: "Controla la apertura.",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          defaultValue: "false",
          description: "Apertura inicial no controlada.",
        },
        {
          name: "onOpenChange",
          type: "(open) => void",
          defaultValue: "undefined",
          description: "Callback al cambiar open.",
        },
        {
          name: "onBeforeClose",
          type: "() => boolean | Promise<boolean | void>",
          defaultValue: "undefined",
          description: "Bloquea el cierre si retorna false.",
        },
        {
          name: "outsideClick",
          type: "boolean",
          defaultValue: "true",
          description: "Cierra al hacer click fuera.",
        },
        {
          name: "zIndex",
          type: "number",
          defaultValue: "auto",
          description: "Override del z-index.",
        },
      ],
      notes: [
        "Drawer.Trigger acepta `asChild` para componer con `Button` u otro elemento sin anidar botones.",
        "Drawer.Header incluye botón de cerrar cuando `outsideClick` es `true`.",
      ],
    },
  ],
};

COMPONENT_DOCS.popover = {
  name: "Popover",
  description: "Capa contextual flotante con trigger click u hover.",
  previewCode: POPOVER_PREVIEW_CODE,
  preview: <PopoverPreviewCanvas />,
  installCode: `import { Popover } from "quickit-ui";`,
  usageCode: `import { Popover } from "quickit-ui";

export function PopoverUsage() {
  return (
    <Popover content="Detalle rápido" trigger="click">
      Ver detalle
    </Popover>
  );
}`,
  examples: [
    {
      id: "ejemplos-trigger",
      title: "Triggers",
      description: "Cambia el trigger a hover.",
      preview: (
        <Popover content="Detalle rápido" trigger="hover">
          Hover aquí
        </Popover>
      ),
    },
    {
      id: "ejemplos-arrow",
      title: "Arrow",
      description: "Personaliza color y tamaño de la flecha.",
      preview: (
        <Popover
          content="Con arrow custom"
          showArrow
          arrowWidth={18}
          arrowHeight={8}
        >
          Arrow custom
        </Popover>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        { name: "content", type: "ReactNode", defaultValue: "required", description: "Contenido del popover." },
        { name: "trigger", type: `"hover" | "click"`, defaultValue: `"hover"`, description: "Modo de activación." },
        { name: "placement", type: "string", defaultValue: `"top"`, description: "Posición flotante." },
        { name: "offset", type: "number", defaultValue: "8", description: "Separación del trigger." },
        { name: "showArrow", type: "boolean", defaultValue: "true", description: "Muestra flecha." },
        { name: "arrowWidth", type: "number", defaultValue: "16", description: "Ancho de la flecha." },
        { name: "arrowHeight", type: "number", defaultValue: "8", description: "Alto de la flecha." },
        { name: "arrowFill", type: "string", defaultValue: "undefined", description: "Color de relleno del arrow." },
        { name: "arrowStroke", type: "string", defaultValue: "undefined", description: "Color del borde del arrow." },
        { name: "arrowStrokeWidth", type: "number", defaultValue: "0.75", description: "Grosor del borde." },
        { name: "arrowTipRadius", type: "number", defaultValue: "2", description: "Radio de la punta." },
        { name: "autoCloseMs", type: "number", defaultValue: "0", description: "Cierra automáticamente después de ms." },
        { name: "color", type: "\"default\" | QuickitSemanticColor", defaultValue: `"default"`, description: "Paleta del floating." },
        { name: "usePortal", type: "boolean", defaultValue: "true", description: "Renderiza en portal." },
        { name: "zIndex", type: "number", defaultValue: "2000", description: "Controla el stacking." },
      ],
    },
  ],
};

COMPONENT_DOCS.tooltip = {
  name: "Tooltip",
  description: "Ayuda contextual breve sobre hover o focus.",
  previewCode: TOOLTIP_PREVIEW_CODE,
  preview: <TooltipPreviewCanvas />,
  installCode: `import { Tooltip } from "quickit-ui";`,
  usageCode: `import { Tooltip } from "quickit-ui";

export function TooltipUsage() {
  return <Tooltip content="Ayuda rápida">Hover aquí</Tooltip>;
}`,
  examples: [
    {
      id: "ejemplos-placement",
      title: "Placement",
      description: "Cambia la posición con placement.",
      preview: (
        <Tooltip content="Ayuda arriba" placement="top">
          Tooltip arriba
        </Tooltip>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        { name: "content", type: "ReactNode", defaultValue: "required", description: "Texto o nodo de tooltip." },
        { name: "trigger", type: `"hover" | "click"`, defaultValue: `"hover"`, description: "Modo de activación." },
        { name: "placement", type: "string", defaultValue: `"top"`, description: "Posición preferida." },
        { name: "offset", type: "number", defaultValue: "8", description: "Separación del trigger." },
        { name: "showArrow", type: "boolean", defaultValue: "true", description: "Muestra flecha." },
        { name: "arrowWidth", type: "number", defaultValue: "12", description: "Ancho de la flecha." },
        { name: "arrowHeight", type: "number", defaultValue: "6", description: "Alto de la flecha." },
        { name: "arrowTipRadius", type: "number", defaultValue: "1.5", description: "Radio de la punta." },
        { name: "arrowStrokeWidth", type: "number", defaultValue: "0.75", description: "Grosor del borde." },
        { name: "arrowFill", type: "string", defaultValue: "undefined", description: "Color de relleno del arrow." },
        { name: "arrowStroke", type: "string", defaultValue: "undefined", description: "Color del borde del arrow." },
        { name: "autoCloseMs", type: "number", defaultValue: "0", description: "Cierra automáticamente después de ms." },
        { name: "color", type: "\"default\" | QuickitSemanticColor", defaultValue: `"default"`, description: "Paleta del floating." },
        { name: "usePortal", type: "boolean", defaultValue: "true", description: "Renderiza en portal." },
        { name: "zIndex", type: "number", defaultValue: "2000", description: "Controla el stacking." },
      ],
    },
  ],
};

COMPONENT_DOCS.modal = {
  name: "Modal",
  description: "Overlay con trigger, contenido y acciones compuestas.",
  previewCode: MODAL_PREVIEW_CODE,
  preview: <ModalPreviewCanvas />,
  installCode: `import { Modal } from "quickit-ui";`,
  usageCode: `import { Modal } from "quickit-ui";

export function ModalUsage() {
  return (
    <Modal>
      <Modal.Trigger>Eliminar</Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Eliminar proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta acción no se puede deshacer.</Modal.Body>
        <Modal.Actions>
          <Modal.Action variant="outline">Cancelar</Modal.Action>
          <Modal.Action color="danger">Eliminar</Modal.Action>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
}`,
  examples: [
    {
      id: "ejemplos-actions",
      title: "Acciones",
      description: "Modal.Action hereda props de Button.",
      preview: (
        <Modal>
          <Modal.Trigger>Confirmar</Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Confirmar</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Deseas continuar?</Modal.Body>
            <Modal.Actions placement="end">
              <Modal.Action variant="outline">Cancelar</Modal.Action>
              <Modal.Action color="brand">Continuar</Modal.Action>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Estado inicial." },
        { name: "open", type: "boolean", defaultValue: "undefined", description: "Controla el modal." },
        { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "undefined", description: "Callback de apertura." },
        { name: "outsideClick", type: "boolean", defaultValue: "true", description: "Cierra al click fuera." },
        { name: "maxWidth", type: "string", defaultValue: `"max-w-md"`, description: "Ancho máximo del panel (clase Tailwind)." },
        { name: "onBeforeClose", type: "() => boolean | Promise<boolean>", defaultValue: "undefined", description: "Hook antes de cerrar (retorna false para cancelar)." },
        { name: "zIndex", type: "number", defaultValue: "undefined", description: "Controla el stacking (auto si no se define)." },
      ],
      notes: [
        "Modal.Action hereda props de Button y acepta closeOnClick.",
      ],
    },
  ],
};

COMPONENT_DOCS.avatar = {
  name: "Avatar",
  description:
    "Avatar base con imagen, fallback, grupo, initials y presencia.",
  previewCode: AVATAR_PREVIEW_CODE,
  preview: <AvatarPreviewCanvas />,
  installCode: `import { Avatar } from "quickit-ui";`,
  usageCode: `import { Avatar } from "quickit-ui";

export function AvatarUsage() {
  return (
    <Avatar size="md" shape="circle">
      <Avatar.Image src="/avatar.png" alt="Elena Ruiz" />
      <Avatar.Fallback>ER</Avatar.Fallback>
    </Avatar>
  );
}`,
    examples: [
    {
      id: "ejemplos-tamanos",
      title: "Tamaños",
      description: "sm, md, lg, xl, 2xl.",
      preview: (
        <div className="flex flex-wrap items-center gap-3">
          <Avatar size="sm">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
          <Avatar size="md">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
          <Avatar size="lg">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
          <Avatar size="xl">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
          <Avatar size="2xl">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
        </div>
      ),
    },
    {
      id: "ejemplos-shapes",
      title: "Formas",
      description: "circle, rounded, square.",
      preview: (
        <div className="flex flex-wrap items-center gap-3">
          <Avatar shape="circle">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
          <Avatar shape="rounded">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
          <Avatar shape="square">
            <Avatar.Fallback>ER</Avatar.Fallback>
          </Avatar>
        </div>
      ),
    },
    {
      id: "ejemplos-group",
      title: "Avatar.Group",
      description: "Agrupa avatares y permite stacking.",
      preview: (
        <Avatar.Group stacked>
          <Avatar>
            <Avatar.Fallback>AR</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>MN</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>RS</Avatar.Fallback>
          </Avatar>
        </Avatar.Group>
      ),
    },
    {
      id: "ejemplos-presence",
      title: "Avatar.Presence",
      description: "Indicador de presencia con status.",
      preview: (
        <div className="flex flex-wrap items-center gap-6">
          <Avatar>
            <Avatar.Fallback>ON</Avatar.Fallback>
            <Avatar.Presence status="online" />
          </Avatar>
          <Avatar>
            <Avatar.Fallback>AW</Avatar.Fallback>
            <Avatar.Presence status="away" />
          </Avatar>
          <Avatar>
            <Avatar.Fallback>BU</Avatar.Fallback>
            <Avatar.Presence status="busy" />
          </Avatar>
          <Avatar>
            <Avatar.Fallback>OF</Avatar.Fallback>
            <Avatar.Presence status="offline" />
          </Avatar>
        </div>
      ),
    },
    {
      id: "ejemplos-combo",
      title: "Avatar con presencia",
      description: "Combina Avatar y Avatar.Presence.",
      preview: (
        <Avatar size="lg">
          <Avatar.Fallback>ER</Avatar.Fallback>
          <Avatar.Presence status="online" />
        </Avatar>
      ),
    },
    {
      id: "ejemplos-initials",
      title: "Avatar.Initials",
      description: "Genera iniciales desde nombre.",
      preview: (
        <div className="flex flex-wrap items-center gap-3">
          <Avatar.Initials name="Elena Ruiz" />
          <Avatar.Initials name="Quickit UI" max={1} />
        </div>
      ),
    },
      {
        id: "ejemplos-userchip",
        title: "Avatar.UserChip",
        description: "Chip con avatar, nombre y trailing.",
        preview: (
          <Avatar.UserChip
            name="Elena Ruiz"
            description="Design lead"
            initials="ER"
            presence="online"
            trailing={<Badge size="sm">Core</Badge>}
          />
        ),
      },
      {
        id: "ejemplos-imagen",
        title: "Imagen y fallback",
        description: "Avatar.Image cae al fallback si no hay imagen.",
        preview: (
          <Avatar>
            <Avatar.Image alt="Sin imagen" />
            <Avatar.Fallback>NA</Avatar.Fallback>
          </Avatar>
        ),
      },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        { name: "shape (Avatar)", type: "QuickitAvatarShape", defaultValue: `"circle"`, description: "Forma del avatar." },
        { name: "size (Avatar)", type: "QuickitAvatarSize", defaultValue: `"md"`, description: "Tamaño del avatar." },
        { name: "stacked (AvatarGroup)", type: "boolean", defaultValue: "false", description: "Activa stacking en AvatarGroup." },
        { name: "status (AvatarPresence)", type: "QuickitPresenceStatus", defaultValue: `"online"`, description: "Estado de presencia." },
        { name: "label (AvatarPresence)", type: "string", defaultValue: "undefined", description: "Label accesible en AvatarPresence." },
        { name: "size (AvatarPresence)", type: "QuickitAvatarSize", defaultValue: `"md"`, description: "Tamaño del indicador de presencia." },
        { name: "name (Initials)", type: "string | number", defaultValue: "required", description: "Nombre para calcular iniciales." },
        { name: "max (Initials)", type: "number", defaultValue: "2", description: "Máximo de letras en Initials." },
        { name: "fallback (Initials)", type: "string", defaultValue: "undefined", description: "Fallback si no hay nombre." },
        { name: "presence (UserChip)", type: "QuickitPresenceStatus", defaultValue: "undefined", description: "Estado de presencia en UserChip." },
        { name: "name (UserChip)", type: "ReactNode", defaultValue: "required", description: "Nombre en UserChip." },
        { name: "description (UserChip)", type: "ReactNode", defaultValue: "undefined", description: "Texto secundario en UserChip." },
        { name: "initials (UserChip)", type: "string", defaultValue: "undefined", description: "Iniciales en UserChip." },
        { name: "src (UserChip)", type: "string", defaultValue: "undefined", description: "Imagen principal en UserChip." },
        { name: "href (UserChip)", type: "string", defaultValue: "undefined", description: "Convierte UserChip en link." },
        { name: "target (UserChip)", type: "string", defaultValue: "undefined", description: "Target del link en UserChip." },
        { name: "rel (UserChip)", type: "string", defaultValue: "undefined", description: "Rel del link en UserChip." },
        { name: "shape (UserChip)", type: "QuickitAvatarShape", defaultValue: `"circle"`, description: "Forma en UserChip." },
        { name: "size (UserChip)", type: "QuickitAvatarSize", defaultValue: `"md"`, description: "Tamaño en UserChip." },
        { name: "trailing (UserChip)", type: "ReactNode", defaultValue: "undefined", description: "Elemento a la derecha en UserChip." },
      ],
      notes: [
        "Avatar.Image acepta props nativas de img (también exportado como AvatarImage).",
        "Avatar.Presence acepta size para el badge; el nombre plano AvatarPresence sigue exportado.",
        "Para la máscara de recorte, renderiza Avatar.Presence como hijo directo de Avatar.",
        "Avatar.UserChip acepta href/target; Initials y UserChip siguen disponibles como exports con nombre.",
      ],
    },
  ],
};

COMPONENT_DOCS.progress = {
  name: "Progress",
  description: "Indicador de progreso lineal con color y tamaño.",
  previewCode: PROGRESS_PREVIEW_CODE,
  preview: <ProgressPreviewCanvas />,
  installCode: `import { Progress } from "quickit-ui";`,
  usageCode: `import { Progress } from "quickit-ui";

export function ProgressUsage() {
  return <Progress value={45} max={100} />;
}`,
  examples: [
    {
      id: "ejemplos-colores",
      title: "Colores",
      description: "Selecciona color por semántica.",
      preview: (
        <div className="space-y-3">
          <Progress value={30} color="neutral" />
          <Progress value={60} color="brand" />
          <Progress value={80} color="success" />
        </div>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "value",
          type: "number",
          defaultValue: "0",
          description: "Valor actual del progreso.",
        },
        {
          name: "min",
          type: "number",
          defaultValue: "0",
          description: "Valor mínimo.",
        },
        {
          name: "max",
          type: "number",
          defaultValue: "100",
          description: "Valor máximo.",
        },
        {
          name: "color",
          type: "QuickitSemanticColor",
          defaultValue: `"primary"`,
          description: "Color de la barra activa.",
        },
        {
          name: "size",
          type: `"sm" | "md" | "lg"`,
          defaultValue: `"md"`,
          description: "Altura del progreso.",
        },
      ],
    },
  ],
};

COMPONENT_DOCS.toaster = {
  name: "Toaster",
  description:
    "Contenedor de toasts con portal; usa la API imperativa `toast()` y `dismiss()`.",
  previewCode: TOASTER_PREVIEW_CODE,
  preview: <ToasterPreviewCanvas />,
  installCode: `import { Toaster, toast, dismiss } from "quickit-ui";`,
  usageCode: `import { Button, Toaster, toast, dismiss } from "quickit-ui";

export function ToasterUsage() {
  return (
    <>
      <Button onClick={() => toast("Guardado correctamente")}>
        Mostrar toast
      </Button>
      <Toaster position="bottom-right" />
    </>
  );
}`,
  examples: [
    {
      id: "ejemplos-action",
      title: "Con acción",
      description: "Incluye un CTA para deshacer o confirmar.",
      preview: (
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast({
              title: "Proyecto eliminado",
              description: "Puedes restaurarlo desde historial.",
              action: { label: "Deshacer", onClick: () => {} },
            })
          }
        >
          Mostrar con acción
        </Button>
      ),
    },
    {
      id: "ejemplos-kind",
      title: "Por tipo (`kind`)",
      description:
        "Valores: `default`, `loading`, `success`, `error`. Hay icono integrado en `loading`, `success` y `error`; `default` no. No existe `info`: usa `default` y `icon` si quieres un pictograma.",
      preview: (
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              toast({ title: "Cambios guardados", kind: "success" })
            }
          >
            Success
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              toast({
                title: "No se pudo conectar",
                description: "Revisa la red e inténtalo de nuevo.",
                kind: "error",
              })
            }
          >
            Error
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              toast({
                title: "Procesando…",
                kind: "loading",
                duration: 0,
              })
            }
          >
            Loading
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              toast({
                title: "Aviso",
                description: "Mensaje neutro sin icono por defecto.",
                kind: "default",
              })
            }
          >
            Default
          </Button>
        </div>
      ),
    },
    {
      id: "ejemplos-promise",
      title: "Promesa",
      description:
        "`toast.promise` muestra estado loading y actualiza a success/error al resolver.",
      preview: (
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast.promise(
              new Promise((resolve) => setTimeout(() => resolve("OK"), 1800)),
              {
                loading: "Guardando…",
                success: (d) => ({ title: "Hecho", description: String(d) }),
                error: "No se pudo guardar",
              },
            )
          }
        >
          Simular guardado
        </Button>
      ),
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "position",
          type: `"top-left" | "top-right" | "bottom-left" | "bottom-right"`,
          defaultValue: `"bottom-right"`,
          description:
            "Esquina del viewport. `z-index` base 10000 por encima de modales.",
        },
        {
          name: "visibleToasts",
          type: "number",
          defaultValue: "3",
          description:
            "Cuántos toasts se ven en stack colapsado (1–10). El resto queda en cola.",
        },
        {
          name: "gap",
          type: "number | { collapsed?, expanded? }",
          defaultValue: "12 / 96 px",
          description:
            "Separación vertical entre tarjetas; un número ajusta colapsado y deriva el expandido.",
        },
        {
          name: "expandOnHover",
          type: "boolean",
          defaultValue: "true",
          description:
            "Al hover/foco: más separación entre los mismos toasts y pausa del auto-cierre. No muestra más de `visibleToasts`; la cola ocupa el hueco al cerrar o expirar.",
        },
        {
          name: "showCloseButton",
          type: "boolean",
          defaultValue: "true",
          description: "Muestra el botón de cerrar en cada toast.",
        },
        {
          name: "defaultIcon",
          type: "ReactNode",
          defaultValue: "undefined",
          description: "Icono por defecto para toasts sin `icon` y `kind` default.",
        },
        {
          name: "icons",
          type: "ToasterKindIcons",
          defaultValue: "undefined",
          description:
            "Iconos por `kind`: `default`, `loading`, `success`, `error` (no hay clave `info`). Sustituyen los del tema.",
        },
        {
          name: "toastClassName",
          type: "string",
          defaultValue: "undefined",
          description: "Clases Tailwind extra en la superficie de cada toast.",
        },
      ],
      notes: [
        "`toast` acepta string u objeto con title, description, action, duration, icon y kind.",
        "`kind`: `default` | `loading` | `success` | `error`. Iconos del paquete para `loading` (spinner), `success` y `error`. `default` no incluye icono salvo que pases `icon` o configures `defaultIcon` / `icons` en `<Toaster />`. No hay `kind: \"info\"`; para informativos usa `default` con `icon` propio.",
        "`toast.promise(promise, { loading, success, error })` — success/error pueden ser string, objeto o función.",
        "`duration: 0` deja el toast hasta cerrar manual o hasta un `update` (p. ej. al terminar la promesa). Sin `duration` en `toast(\"texto\")`, el auto-cierre usa 4000 ms por defecto; `toast.promise` usa 0 en loading, 4000 en success y 5000 en error.",
        "Para cerrar todo: `dismiss()` sin id. Auto-cierre pausado con hover/foco en el área del Toaster.",
        "En pantalla hay como máximo `visibleToasts` (3 por defecto): el resto espera en cola y aparece cuando uno visible se cierra o caduca.",
        "Tope de cola: `MAX_QUEUED_TOASTS` (25).",
        "Exportaciones útiles: `dismiss`, `MAX_VISIBLE_TOASTS` y `MAX_QUEUED_TOASTS` desde `quickit-ui`.",
      ],
    },
  ],
};

COMPONENT_DOCS["empty-state"] = {
  name: "EmptyState",
  description:
    "Estado vacío con título, descripción y acciones (EmptyState.Title, .Description, .Actions).",
  previewCode: EMPTY_STATE_PREVIEW_CODE,
  preview: <EmptyStatePreviewCanvas />,
  installCode: `import { EmptyState, Button } from "quickit-ui";`,
  usageCode: `import { EmptyState, Button } from "quickit-ui";

export function EmptyStateUsage() {
  return (
    <EmptyState align="center">
      <EmptyState.Title>Sin resultados</EmptyState.Title>
      <EmptyState.Description>Prueba otro filtro.</EmptyState.Description>
      <EmptyState.Actions>
        <Button size="sm">Crear item</Button>
      </EmptyState.Actions>
    </EmptyState>
  );
}`,
  examples: [
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "align",
          type: `"center" | "start"`,
          defaultValue: `"center"`,
          description: "Alineación del contenido.",
        },
      ],
      notes: [
        "Usa EmptyState.Title, EmptyState.Description y EmptyState.Actions (o EmptyStateTitle, etc. por nombre).",
      ],
    },
    {
      id: "ejemplos-layout",
      title: "Layout",
      description: "Alinea acciones a la izquierda si align es start.",
      preview: (
        <EmptyState align="start">
          <EmptyState.Title>Sin proyectos</EmptyState.Title>
          <EmptyState.Description>Comienza creando uno nuevo.</EmptyState.Description>
          <EmptyState.Actions>
            <Button size="sm" variant="outline">Explorar</Button>
            <Button size="sm">Crear</Button>
          </EmptyState.Actions>
        </EmptyState>
      ),
    },
  ],
};

COMPONENT_DOCS.skeleton = {
  name: "Skeleton",
  description: "Marcador de carga para line, rect y circle.",
  previewCode: SKELETON_PREVIEW_CODE,
  preview: <SkeletonPreviewCanvas />,
  installCode: `import { Skeleton } from "quickit-ui";`,
  usageCode: `import { Skeleton } from "quickit-ui";

export function SkeletonUsage() {
  return <Skeleton shape="rect" />;
}`,
  examples: [
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "shape",
          type: `"line" | "rect" | "circle"`,
          defaultValue: `"line"`,
          description: "Define la forma del skeleton.",
        },
        {
          name: "animated",
          type: "boolean",
          defaultValue: "true",
          description: "Habilita la animación shimmer.",
        },
      ],
    },
    {
      id: "ejemplos-variantes",
      title: "Variantes",
      description: "Line, rect y circle.",
      preview: (
        <div className="grid gap-3 sm:grid-cols-3">
          <Skeleton shape="line" />
          <Skeleton shape="rect" />
          <Skeleton shape="circle" />
        </div>
      ),
    },
    {
      id: "ejemplos-static",
      title: "Sin animación",
      description: "animated=false para estados estáticos.",
      preview: <Skeleton shape="rect" animated={false} />,
    },
  ],
};

COMPONENT_DOCS.show = {
  name: "Show",
  description: "Render condicional simple con fallback.",
  previewCode: LOGIC_SHOW_PREVIEW_CODE,
  preview: <LogicShowPreviewCanvas />,
  installCode: `import { Show } from "quickit-ui";`,
  usageCode: `import { Show } from "quickit-ui";

export function ShowUsage({ isReady }) {
  return (
    <Show when={isReady} fallback="Cargando...">
      Contenido listo
    </Show>
  );
}`,
  examples: [
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        { name: "when", type: "T", defaultValue: "required", description: "Valor evaluado para render." },
        { name: "children", type: "ReactNode | (value) => ReactNode", defaultValue: "undefined", description: "Contenido cuando se cumple." },
        { name: "fallback", type: "ReactNode | (value) => ReactNode", defaultValue: "undefined", description: "Contenido alterno." },
      ],
    },
  ],
};

COMPONENT_DOCS["render-switch"] = {
  name: "RenderSwitch",
  description: "Control declarativo para varios estados posibles.",
  previewCode: LOGIC_SWITCH_PREVIEW_CODE,
  preview: <LogicSwitchPreviewCanvas />,
  installCode: `import { RenderSwitch, Match, Default } from "quickit-ui";`,
  usageCode: `import { RenderSwitch, Match, Default } from "quickit-ui";

export function SwitchUsage({ status }) {
  return (
    <RenderSwitch value={status}>
      <Match when="success">Todo bien</Match>
      <Match when="error">Algo falló</Match>
      <Default>En espera</Default>
    </RenderSwitch>
  );
}`,
  examples: [
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        { name: "value", type: "T", defaultValue: "required", description: "Valor a evaluar." },
        { name: "fallback", type: "ReactNode", defaultValue: "undefined", description: "Contenido si no hay Match/Default." },
      ],
      notes: [
        "Match acepta when como valor, array o función.",
        "Default define el contenido por defecto.",
      ],
    },
  ],
};

COMPONENT_DOCS.for = {
  name: "For",
  description: "Iteración declarativa con fallback vacío.",
  previewCode: LOGIC_FOR_PREVIEW_CODE,
  preview: <LogicForPreviewCanvas />,
  installCode: `import { For } from "quickit-ui";`,
  usageCode: `import { For } from "quickit-ui";

export function ForUsage({ items }) {
  return (
    <For each={items} fallback="Sin datos">
      {(item) => <div key={item.id}>{item.label}</div>}
    </For>
  );
}`,
  examples: [
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        { name: "each", type: "Iterable<T> | null", defaultValue: "undefined", description: "Colección a iterar." },
        { name: "children", type: "(item, index) => ReactNode", defaultValue: "undefined", description: "Render de cada item." },
        { name: "fallback", type: "ReactNode | (items) => ReactNode", defaultValue: "undefined", description: "Render cuando no hay items." },
      ],
    },
  ],
};

function OverviewPage() {
  return (
    <>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-5xl">
          Quickit UI desde una base simple
        </h1>
        <p className="mt-5 text-base leading-8 text-neutral-600 dark:text-neutral-400 sm:text-lg">
          Quickit UI reúne componentes, hooks y utilidades lógicas para
          construir interfaces consistentes sin levantar un sistema desde cero.
          Esta guía parte del código real de la librería y se enfoca en cómo
          usarla, no en cómo leer la implementación.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={WEBSITE_ROUTES.examples}
            appearance="button"
            color="neutral"
          >
            Ver ejemplos
          </Link>
          <span className="inline-flex items-center rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
            {WEBSITE_COMPONENT_GROUPS.reduce(
              (total, group) => total + group.items.length,
              0,
            )}{" "}
            primitives públicas
          </span>
        </div>
      </div>

      <div className="mt-14 sm:mt-16">
        <WebsiteSection
          id="introduccion"
          title="Introducción"
          description="Quickit está pensado para equipos que necesitan velocidad, consistencia visual y una API suficientemente flexible para adaptar producto real."
        >
          <div className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
            Los primitives compuestos (Accordion, Tabs, Dropdown, Breadcrumb, Modal,
            Drawer, FormControl, InputGroup, Avatar, EmptyState…) exponen subcomponentes
            como <code className="font-mono text-xs">Componente.Subcomponente</code>.
            Los nombres en PascalCase sueltos (<code className="font-mono text-xs">TabsList</code>,{" "}
            <code className="font-mono text-xs">FormMessage</code>, etc.) siguen exportándose
            por compatibilidad.
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Componentes de producto
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Botones, formularios, overlays, navegación, identidad y estados
                vacíos listos para integrarse en apps reales.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Tema y comportamiento
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Proveedor único para tema, focus ring, ripple y press effect, con
                control global y por componente.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800 sm:col-span-2 xl:col-span-1">
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Utilidades lógicas
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                `Show`, `RenderSwitch` y `For` están disponibles para construir
                pantallas más declarativas desde la propia librería.
              </p>
            </div>
          </div>
        </WebsiteSection>

        <WebsiteSection
          id="instalacion"
          title="Instalación"
          description="La integración mínima requiere instalar el paquete, importar estilos y decidir si quieres un provider estático o un controlador de tema persistente."
        >
          <div className="space-y-6">
            <WebsiteCodeBlock code={INSTALL_COMMAND} language="bash" />
            <WebsiteCodeBlock code={STYLES_SNIPPET} language="css" />
          </div>
        </WebsiteSection>

        <WebsiteSection
          id="tema"
          title="Tema"
          description="Usa QuickitProvider cuando tu app ya resuelve el tema por su cuenta. Usa QuickitThemeProvider cuando quieres persistencia, soporte system y helpers de lectura."
        >
          <div className="space-y-10">
            <div className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
              QuickitThemeProvider es un wrapper con estado que controla el tema y
              luego renderiza QuickitProvider por debajo. QuickitProvider solo
              aplica la política visual; no persiste ni muta el tema.
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                Proveedor base
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Usa QuickitProvider si tu app ya controla el tema (por ejemplo,
                con un state propio o un contexto externo).
              </p>
              <div className="mt-4">
                <WebsiteCodeBlock code={QUICKIT_PROVIDER_SNIPPET} language="jsx" />
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                Controlador de tema
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                QuickitThemeProvider añade persistencia, soporte system y un
                hook para leer o cambiar el tema.
              </p>
              <div className="mt-4 space-y-6">
                <WebsiteCodeBlock code={THEME_PROVIDER_SNIPPET} language="jsx" />
                <WebsiteCodeBlock code={THEME_TOGGLE_SNIPPET} language="jsx" />
              </div>
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                useQuickitThemeController debe usarse dentro de QuickitThemeProvider.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                Lectura rápida del tema
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                useQuickitTheme devuelve el modo efectivo (light o dark) para
                ajustar pequeños detalles de UI.
              </p>
              <div className="mt-4">
                <WebsiteCodeBlock code={THEME_READ_SNIPPET} language="jsx" />
              </div>
            </div>
          </div>
        </WebsiteSection>

        <WebsiteSection
          id="comportamiento"
          title="Comportamiento"
          description="Define políticas globales de focus ring, ripple y press effect desde el provider, con posibilidad de sobrescribirlas por componente."
        >
          <div className="space-y-6">
            <WebsiteCodeBlock code={QUICKIT_PROVIDER_SNIPPET} language="jsx" />
            <div className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
              Ajusta focusRing, ripple y pressEffect para toda la app. Luego,
              cada componente puede sobrescribir con sus props específicas si
              lo necesitas.
            </div>
          </div>
        </WebsiteSection>

        <WebsiteSection
          id="tokens"
          title="Tokens"
          description="Listas base de tamaños, colores y radios que Quickit usa para mantener consistencia entre componentes."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Colores semánticos
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {QUICKIT_SEMANTIC_COLORS.map((color) => (
                  <span
                    key={color}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Colores accent
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {QUICKIT_ACCENT_COLORS.map((color) => (
                  <span
                    key={color}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Tamaños de control
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {QUICKIT_CONTROL_SIZES.map((size) => (
                  <span
                    key={size}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Shapes y variants
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {QUICKIT_BUTTON_SHAPES.map((shape) => (
                  <span
                    key={shape}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {shape}
                  </span>
                ))}
                {QUICKIT_BUTTON_VARIANTS.map((variant) => (
                  <span
                    key={variant}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {variant}
                  </span>
                ))}
                {QUICKIT_LINK_TEXT_VARIANTS.map((variant) => (
                  <span
                    key={variant}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {variant}
                  </span>
                ))}
                {QUICKIT_LINK_UNDERLINES.map((variant) => (
                  <span
                    key={variant}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {variant}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </WebsiteSection>

        <WebsiteSection
          id="hooks"
          title="Hooks"
          description="La librería también expone hooks de tema, responsive y comportamiento global para no duplicar lógica en la app consumidora."
        >
          <div className="space-y-8">
            <For each={WEBSITE_HOOKS}>
              {(hook) => (
                <div
                  key={hook.name}
                  className="rounded-3xl border border-neutral-200 p-5 dark:border-neutral-800"
                >
                  <h3
                    id={`hook-${hook.name
                      .replace(/([A-Z])/g, "-$1")
                      .replace(/^-/, "")
                      .toLowerCase()}`}
                    className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
                  >
                    {hook.name}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                    {hook.description}
                  </p>
                  {HOOK_EXAMPLES[hook.name]?.code ? (
                    <div className="mt-4">
                      <WebsiteCodeBlock
                        code={HOOK_EXAMPLES[hook.name].code}
                        language="jsx"
                      />
                    </div>
                  ) : null}
                </div>
              )}
            </For>
          </div>
        </WebsiteSection>

        <WebsiteSection
          id="componentes"
          title="Componentes"
          description="Empieza por los primitives base y después entra a cada página para ver instalación, uso, preview y API. Muchas páginas incluyen además «Notas de revisión» con hallazgos del código (uso, a11y e implementación)."
        >
          <div className="space-y-6">
            <For each={WEBSITE_COMPONENT_GROUPS}>
              {(group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800"
                >
                  <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                    {group.title}
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <For each={group.items}>
                      {(item) => (
                        <a
                          key={item.slug}
                          href={`/docs/components/${item.slug}`}
                          className="rounded-2xl border border-neutral-200 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                        >
                          <p className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                            {item.name}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                            {item.description}
                          </p>
                        </a>
                      )}
                    </For>
                  </div>
                </div>
              )}
            </For>
          </div>
        </WebsiteSection>
      </div>
    </>
  );
}

function ComponentReviewSection({ slug }) {
  const entries = WEBSITE_COMPONENT_REVIEW_NOTES[slug];

  if (!entries?.length) {
    return null;
  }

  return (
    <div className="mt-14 sm:mt-16">
      <WebsiteSection
        id="notas-revision"
        title="Notas de revisión"
        description="Revisión del código fuente de la librería: recomendaciones de uso, accesibilidad, detalles de implementación y mejoras o correcciones relevantes (versión actual del repo)."
      >
        <ul className="space-y-3">
          <For each={entries}>
            {(entry, index) => (
              <li
                key={index}
                className="rounded-2xl border border-neutral-200 px-4 py-3 dark:border-neutral-800"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  {entry.tag}
                </p>
                <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                  {entry.text}
                </p>
              </li>
            )}
          </For>
        </ul>
      </WebsiteSection>
    </div>
  );
}

function ComponentPage({ component }) {
  const doc = COMPONENT_DOCS[component.slug];

  return (
    <>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-5xl">
          {component.name}
        </h1>
        <p className="mt-5 text-base leading-8 text-neutral-600 dark:text-neutral-400 sm:text-lg">
          {doc?.description ?? component.description}
        </p>
      </div>

      <div className="mt-14 sm:mt-16">
        <Show when={doc}>
          <WebsiteSection id="ejemplo-visual" title="Ejemplo visual y código">
            <WebsitePreviewTabs code={doc.previewCode}>
              {doc.preview}
            </WebsitePreviewTabs>
          </WebsiteSection>

          <WebsiteSection id="instalacion" title="Instalación">
            <WebsiteCodeBlock code={doc.installCode} language="jsx" />
          </WebsiteSection>

          <WebsiteSection id="uso" title="Uso">
            <WebsiteCodeBlock code={doc.usageCode} language="jsx" />
          </WebsiteSection>

          <WebsiteSection id="ejemplos" title="Ejemplos">
            <div className="space-y-10">
              {doc.examples?.map((example) => (
                <div key={example.id} className={example.id === "ejemplos-props" ? "pt-2" : undefined}>
                  <h3
                    id={example.id}
                    className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
                  >
                    {example.title}
                  </h3>
                  {example.preview ? (
                    <div className="mt-4">{example.preview}</div>
                  ) : null}
                  {example.description ? (
                    <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                      {example.description}
                    </p>
                  ) : null}
                  {example.note ? (
                    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                      {example.note}
                    </p>
                  ) : null}
                  {example.props ? (
                    <div className="mt-4">
                      <PropsTable props={example.props} />
                    </div>
                  ) : null}
                  {example.notes ? (
                    <div className="mt-6 space-y-3">
                      {example.notes.map((note) => (
                        <div
                          key={note}
                          className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
                        >
                          {note}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </WebsiteSection>
        </Show>

        <Show when={!doc}>
          <WebsiteSection
            id="ejemplo-visual"
            title="Página en construcción"
            description={`La arquitectura ya está lista para ${component.name}. Lo siguiente es documentar este componente con el mismo nivel de detalle que Button: ejemplo visual, instalación, uso y ejemplos completos.`}
          >
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Esta página ya tiene ruta propia, navegación lateral y contexto
                del componente. El siguiente paso es rellenar el contenido
                específico derivado de su implementación en `src/lib`.
              </p>
            </div>
          </WebsiteSection>
        </Show>
      </div>

      <ComponentReviewSection slug={component.slug} />
    </>
  );
}

export default function DocsPage({ currentPath }) {
  const { componentSlug, mode } = parseDocsRoute(currentPath);
  const currentComponent =
    mode === "component" ? WEBSITE_COMPONENT_LOOKUP[componentSlug] : null;
  const sections = currentComponent
    ? getComponentSections(currentComponent.slug)
    : WEBSITE_DOC_OVERVIEW_SECTIONS;

  return (
    <main className={`${WEBSITE_SHELL} pb-20 pt-10 sm:pt-14`}>
      <Toaster />
      <div className="grid gap-12 lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)_14rem] lg:gap-16 min-w-0">
        <WebsiteDocsSidebar
          currentComponentSlug={currentComponent?.slug}
          sections={sections}
          componentGroups={WEBSITE_COMPONENT_GROUPS}
        />

        <article className="min-w-0 w-full max-w-3xl justify-self-center">
          <Show when={currentComponent} fallback={<OverviewPage />}>
            {(component) => <ComponentPage component={component} />}
          </Show>
        </article>

        <WebsitePageToc sections={sections} />
      </div>
    </main>
  );
}
