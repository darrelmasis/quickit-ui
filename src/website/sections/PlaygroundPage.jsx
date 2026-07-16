import { useMemo, useState } from "react";
import {
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Combobox,
  Container,
  DataTable,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  EmptyState,
  For,
  FormControl,
  Input,
  Label,
  Link,
  Modal,
  Pagination,
  Popover,
  Progress,
  Radio,
  Range,
  Select,
  Show,
  Skeleton,
  Stepper,
  Switch,
  Tabs,
  Textarea,
  TimePicker,
  Toaster,
  Tooltip,
  UserChip,
} from "@/lib";
import { normalizeQuickitRadius } from "@/lib/theme/radius";
import { toast } from "@/lib/components/toaster/toast-store";
import { PlusIcon } from "@/lib/assets/icons";
import { cn } from "@/lib/utils";
import WebsiteLayout from "@/website/components/WebsiteLayout";
import { WEBSITE_COMPONENT_GROUPS } from "@/website/docs-content";
import WebsiteCodeBlock from "@/website/components/WebsiteCodeBlock";

const SIZE_OPTIONS_FULL = ["xs", "sm", "md", "lg", "xl", "2xl"];
const SIZE_OPTIONS_LG = ["sm", "md", "lg"];
const SIZE_OPTIONS_MD = ["sm", "md"];
const RADIUS_OPTIONS = ["sharp", "xs", "sm", "md", "lg", "xl", "2xl"];
const SHAPE_OPTIONS_BUTTON = ["default", "square", "circle", "pill"];
const SHAPE_OPTIONS_INPUT = ["square", "pill"];
const SHAPE_OPTIONS_AVATAR = ["circle", "rounded", "square"];
const VARIANT_OPTIONS_SOG = ["solid", "outline", "soft", "ghost"];
const VARIANT_OPTIONS_SOSG = ["soft", "outline", "solid"];
const VARIANT_OPTIONS_SO = ["soft", "outline"];
const PLACEMENT_TOOLTIP = ["top", "bottom", "left", "right"];
const PLACEMENT_DROPDOWN = [
  "bottom-start",
  "bottom-end",
  "top-start",
  "top-end",
];
const PLACEMENT_DRAWER = ["right", "left", "bottom", "top"];
const PLACEMENT_TOASTER = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
];

const COLOR_SWATCH_MAP = {
  primary: "bg-blue-500",
  secondary: "bg-purple-500",
  neutral: "bg-neutral-500",
  success: "bg-green-500",
  danger: "bg-red-500",
  warning: "bg-amber-500",
  info: "bg-cyan-500",
  light: "bg-neutral-100 border border-neutral-300",
  dark: "bg-neutral-800",
};

const PROP_GROUPS = {
  appearance: { label: "Apariencia", props: ["size", "color", "variant", "shape", "orientation", "appearance", "underline", "presence", "hourCycle"] },
  state: { label: "Estado", props: ["disabled", "loading", "fullWidth", "invalid", "required", "indeterminate"] },
  behavior: { label: "Comportamiento", props: ["clearButton", "passwordToggle", "dismissible", "showValueTooltip", "stickyHeader", "closeOnScroll", "showCloseButton", "interactive", "showArrow", "collapsible", "center", "animated", "placement", "position", "type", "trigger", "outsideClick", "closeOnEscape", "selectionMode", "optional"] },
};

function getPropGroups(propNames) {
  const groups = { appearance: [], state: [], behavior: [] };
  propNames.forEach((name) => {
    if (PROP_GROUPS.appearance.props.includes(name)) groups.appearance.push(name);
    else if (PROP_GROUPS.state.props.includes(name)) groups.state.push(name);
    else groups.behavior.push(name);
  });
  return Object.entries(groups).filter(([, items]) => items.length > 0);
}

const PROP_TYPES = {
  size: { label: "Tamaño", options: SIZE_OPTIONS_FULL },
  color: {
    label: "Color",
    options: [
      "primary",
      "secondary",
      "neutral",
      "success",
      "warning",
      "danger",
      "info",
      "light",
      "dark",
    ],
  },
  variant: { label: "Variante", options: VARIANT_OPTIONS_SOG },
  shape: { label: "Forma", options: SHAPE_OPTIONS_BUTTON },
  disabled: { label: "Desactivado", type: "boolean" },
  fullWidth: { label: "Ancho completo", type: "boolean" },
  loading: { label: "Cargando", type: "boolean" },
  orientation: { label: "Orientación", options: ["horizontal", "vertical"] },
  appearance: { label: "Apariencia", options: ["text", "button"] },
  underline: { label: "Subrayado", options: ["always", "hover", "none"] },
  presence: {
    label: "Presencia",
    options: ["off", "online", "away", "busy", "offline"],
  },
  clearButton: { label: "Botón limpiar", type: "boolean" },
  passwordToggle: { label: "Toggle contraseña", type: "boolean" },
  invalid: { label: "Inválido", type: "boolean" },
  required: { label: "Requerido", type: "boolean" },
  indeterminate: { label: "Indeterminado", type: "boolean" },
  showValueTooltip: { label: "Tooltip valor", type: "boolean" },
  dismissible: { label: "Descartable", type: "boolean" },
  hourCycle: { label: "Formato hora", options: ["12h", "24h"] },
  stickyHeader: { label: "Cabecera fija", type: "boolean" },
  closeOnScroll: { label: "Cerrar al scroll", type: "boolean" },
  showCloseButton: { label: "Botón cerrar", type: "boolean" },
  interactive: { label: "Interactivo", type: "boolean" },
  showArrow: { label: "Mostrar flecha", type: "boolean" },
  collapsible: { label: "Colapsable", type: "boolean" },
  center: { label: "Centrado", type: "boolean" },
  animated: { label: "Animado", type: "boolean" },
  placement: { label: "Posición", options: PLACEMENT_TOOLTIP },
  position: { label: "Posición", options: PLACEMENT_TOASTER },
  type: { label: "Tipo", options: ["single", "multiple"] },
  trigger: { label: "Trigger", options: ["click", "hover"] },
  outsideClick: { label: "Cerrar al exterior", type: "boolean" },
  closeOnEscape: { label: "Cerrar con Escape", type: "boolean" },
  selectionMode: { label: "Modo selección", options: ["single", "between"] },
  optional: { label: "Opcional", type: "boolean" },
};

const DEFAULTS = {
  size: "md",
  color: "neutral",
  variant: "soft",
  shape: "default",
  disabled: false,
  fullWidth: false,
  loading: false,
  invalid: false,
  required: false,
  indeterminate: false,
  clearButton: true,
  passwordToggle: false,
  dismissible: false,
  showValueTooltip: true,
  stickyHeader: false,
  closeOnScroll: false,
  showCloseButton: true,
  interactive: false,
  showArrow: true,
  collapsible: true,
  type: "single",
  hourCycle: "12h",
  orientation: "horizontal",
  appearance: "text",
  underline: "hover",
  presence: "off",
  center: false,
  animated: true,
  outsideClick: true,
  closeOnEscape: true,
  selectionMode: "single",
  optional: false,
};

const CHILDREN_EXAMPLES = {
  button: "Botón",
  badge: "Etiqueta",
  "button-group": `<Button>Uno</Button>\n<Button>Dos</Button>\n<Button>Tres</Button>`,
  link: "Texto del enlace",
  select: `<option value="1">Opción A</option>\n<option value="2">Opción B</option>`,
  breadcrumb:
    `<Breadcrumb.Item href="#">Inicio</Breadcrumb.Item>\n` +
    `<Breadcrumb.Item href="#">Sección</Breadcrumb.Item>`,
  avatar: `<Avatar.Fallback>UI</Avatar.Fallback>`,
  tooltip: `<Button>Pasa el mouse</Button>`,
  popover: `<div className="p-3">Contenido del popover.</div>`,
  accordion:
    `<Accordion.Item value="1">\n` +
    `  <Accordion.Trigger>Sección 1</Accordion.Trigger>\n` +
    `  <Accordion.Content>Contenido de la sección.</Accordion.Content>\n` +
    `</Accordion.Item>`,
  tabs:
    `<Tabs.List>\n` +
    `  <Tabs.Trigger value="tab1">Pestaña 1</Tabs.Trigger>\n` +
    `</Tabs.List>\n` +
    `<Tabs.Content value="tab1">Contenido.</Tabs.Content>`,
  dropdown:
    `<Dropdown.Trigger>\n` +
    `  <Button>Abrir menú</Button>\n` +
    `</Dropdown.Trigger>\n` +
    `<Dropdown.Content>\n` +
    `  <Dropdown.Item>Perfil</Dropdown.Item>\n` +
    `</Dropdown.Content>`,
  modal:
    `<Modal.Trigger>\n` +
    `  <Button>Abrir modal</Button>\n` +
    `</Modal.Trigger>\n` +
    `<Modal.Content>\n` +
    `  <Modal.Header>\n` +
    `    <Modal.Title>Título</Modal.Title>\n` +
    `  </Modal.Header>\n` +
    `  <Modal.Body>Contenido.</Modal.Body>\n` +
    `</Modal.Content>`,
  drawer:
    `<Drawer.Trigger>\n` +
    `  <Button>Abrir panel</Button>\n` +
    `</Drawer.Trigger>\n` +
    `<Drawer.Content>\n` +
    `  <Drawer.Header>\n` +
    `    <Drawer.Title>Título</Drawer.Title>\n` +
    `  </Drawer.Header>\n` +
    `  <Drawer.Body>Contenido.</Drawer.Body>\n` +
    `</Drawer.Content>`,
  "form-control": `<Label>Nombre</Label>\n<Input placeholder="Ingresa tu nombre" />`,
  label: "Texto de etiqueta",
  container: "Contenido del contenedor",
  card:
    `<Card.Header>Título</Card.Header>\n` +
    `<Card.Body>Contenido</Card.Body>\n` +
    `<Card.Footer>Pie</Card.Footer>`,
  divider: "",
};

const COMPONENT_CONFIG = {
  button: {
    props: [
      "size",
      "color",
      "variant",
      "shape",
      "fullWidth",
      "loading",
      "disabled",
    ],
    sizeOptions: SIZE_OPTIONS_FULL,
    variantOptions: VARIANT_OPTIONS_SOG,
    shapeOptions: SHAPE_OPTIONS_BUTTON,
    preview: (p) => (
      <div className="flex flex-wrap items-center gap-3">
        <Button {...p}>Botón</Button>
        <Button {...p}><PlusIcon className="size-4" />Icono</Button>
        <Button {...p} shape="square" aria-label="Añadir"><PlusIcon className="size-4" /></Button>
      </div>
    ),
  },
  badge: {
    props: ["size", "color", "variant"],
    sizeOptions: SIZE_OPTIONS_MD,
    variantOptions: VARIANT_OPTIONS_SOSG,
    preview: (p) => <Badge {...p}>Etiqueta</Badge>,
  },
  "button-group": {
    props: ["size", "color", "variant", "orientation", "fullWidth"],
    sizeOptions: SIZE_OPTIONS_FULL,
    variantOptions: VARIANT_OPTIONS_SOG,
    preview: (p) => (
      <ButtonGroup {...p}>
        <Button>Uno</Button>
        <Button>Dos</Button>
        <Button>Tres</Button>
      </ButtonGroup>
    ),
  },
  link: {
    props: ["color", "appearance", "underline", "disabled"],
    preview: (p) => (
      <Link {...p} href="#" onClick={(e) => e.preventDefault()}>
        Texto del enlace
      </Link>
    ),
  },
  input: {
    props: [
      "size",
      "color",
      "shape",
      "clearButton",
      "passwordToggle",
      "disabled",
    ],
    sizeOptions: SIZE_OPTIONS_LG,
    shapeOptions: SHAPE_OPTIONS_INPUT,
    preview: (p) => <Input {...p} placeholder="Escribe algo..." />,
  },
  textarea: {
    props: ["size", "color", "shape", "disabled"],
    sizeOptions: SIZE_OPTIONS_LG,
    shapeOptions: SHAPE_OPTIONS_INPUT,
    preview: (p) => <Textarea {...p} placeholder="Texto multilínea..." />,
  },
  select: {
    props: ["size", "color", "disabled"],
    sizeOptions: SIZE_OPTIONS_LG,
    preview: (p) => (
      <Select {...p} placeholder="Seleccionar...">
        <option value="1">Opción A</option>
        <option value="2">Opción B</option>
        <option value="3">Opción C</option>
      </Select>
    ),
  },
  combobox: {
    props: ["size", "color", "clearButton", "disabled"],
    sizeOptions: SIZE_OPTIONS_LG,
    preview: (p) => (
      <Combobox
        {...p}
        placeholder="Buscar..."
        options={[
          { value: "apple", label: "Manzana" },
          { value: "banana", label: "Plátano" },
          { value: "cherry", label: "Cereza" },
        ]}
      />
    ),
  },
  checkbox: {
    props: ["size", "color", "indeterminate", "disabled"],
    sizeOptions: SIZE_OPTIONS_MD,
    preview: (p) => <Checkbox {...p} label="Casilla" />,
  },
  radio: {
    props: ["size", "color", "disabled"],
    sizeOptions: SIZE_OPTIONS_MD,
    preview: (p) => (
      <div className="flex flex-col gap-2">
        <Radio
          {...p}
          name="pg-radio"
          value="a"
          defaultChecked
          label="Opción A"
        />
        <Radio {...p} name="pg-radio" value="b" label="Opción B" />
        <Radio {...p} name="pg-radio" value="c" label="Opción C" />
      </div>
    ),
  },
  switch: {
    props: ["size", "color", "disabled"],
    sizeOptions: SIZE_OPTIONS_MD,
    preview: (p) => <Switch {...p} label="Interruptor" />,
  },
  range: {
    props: ["color", "disabled", "orientation"],
    preview: (p) => <Range {...p} />,
  },
  avatar: {
    props: ["size", "shape", "presence"],
    sizeOptions: SIZE_OPTIONS_FULL,
    shapeOptions: SHAPE_OPTIONS_AVATAR,
    preview: ({ presence, ...p }) => (
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <Avatar {...p}>
            <Avatar.Fallback>UI</Avatar.Fallback>
            {presence !== "off" && <Avatar.Presence status={presence} />}
          </Avatar>
          <UserChip
            {...p}
            name="Elena Ruiz"
            description="elenaruiz@email.com"
            presence={presence !== "off" ? presence : undefined}
          />
        </div>
        <AvatarGroup>
          <Avatar size="sm" shape="circle">
            <Avatar.Fallback>AN</Avatar.Fallback>
          </Avatar>
          <Avatar size="sm" shape="circle">
            <Avatar.Fallback>BR</Avatar.Fallback>
          </Avatar>
          <Avatar size="sm" shape="circle">
            <Avatar.Fallback>CL</Avatar.Fallback>
          </Avatar>
          <Avatar size="sm" shape="circle">
            <Avatar.Fallback>DM</Avatar.Fallback>
          </Avatar>
        </AvatarGroup>
      </div>
    ),
  },
  progress: {
    props: ["size", "color"],
    sizeOptions: SIZE_OPTIONS_LG,
    preview: (p) => <Progress {...p} value={60} />,
  },
  skeleton: {
    props: [],
    preview: () => (
      <div className="flex flex-col gap-3" style={{ width: 200 }}>
        <Skeleton shape="circle" className="size-10" />
        <Skeleton shape="line" className="h-4" />
        <Skeleton shape="line" className="h-4 w-3/4" />
      </div>
    ),
  },
  alert: {
    props: ["color", "variant", "dismissible"],
    variantOptions: VARIANT_OPTIONS_SO,
    colorOptions: ["neutral", "info", "success", "danger", "warning"],
    preview: (p) => (
      <Alert
        {...p}
        title="Título de alerta"
        description="Este es un mensaje de alerta."
      />
    ),
  },
  "empty-state": {
    props: [],
    preview: () => (
      <EmptyState
        title="Sin resultados"
        description="Ajusta la búsqueda o los filtros."
      />
    ),
  },
  breadcrumb: {
    props: [],
    preview: () => (
      <Breadcrumb>
        <Breadcrumb.Item href="#">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Sección</Breadcrumb.Item>
        <Breadcrumb.Item current>Página</Breadcrumb.Item>
      </Breadcrumb>
    ),
  },
  card: {
    props: ["color"],
    preview: (p) => (
      <Card {...p} className="max-w-sm">
        <Card.Header>Título de tarjeta</Card.Header>
        <Card.Body>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Contenido de la tarjeta.
          </p>
        </Card.Body>
        <Card.Footer>Pie de tarjeta</Card.Footer>
      </Card>
    ),
  },
  divider: {
    props: [],
    preview: () => (
      <div className="w-full max-w-[400px]">
        <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
          Texto antes del divisor
        </p>
        <Divider />
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          Texto después del divisor
        </p>
      </div>
    ),
  },
  stepper: {
    props: ["color", "orientation"],
    preview: (p) => (
      <Stepper
        {...p}
        steps={[
          { title: "Paso 1", description: "Completado" },
          { title: "Paso 2", description: "En progreso" },
          { title: " Paso 3", description: "Pendiente" },
        ]}
        activeStep={1}
      />
    ),
  },
  tooltip: {
    props: ["placement"],
    placementOptions: PLACEMENT_TOOLTIP,
    preview: (p) => (
      <Tooltip {...p} content="Contenido del tooltip">
        <Button>Pasa el mouse</Button>
      </Tooltip>
    ),
  },
  popover: {
    props: ["placement", "trigger", "interactive", "showArrow"],
    placementOptions: PLACEMENT_TOOLTIP,
    preview: (p) => (
      <Popover
        {...p}
        content={
          <div className="p-1 text-sm text-neutral-600 dark:text-neutral-400">
            Contenido del popover.
          </div>
        }
      >
        <Button>Abrir popover</Button>
      </Popover>
    ),
  },
  accordion: {
    props: ["type", "collapsible"],
    preview: (p) => (
      <div className="w-full max-w-[400px]">
        <Accordion {...p} defaultValue="1">
          <Accordion.Item value="1">
            <Accordion.Trigger>Sección 1</Accordion.Trigger>
            <Accordion.Content>
              <p>Contenido de la primera sección del acordeón.</p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="2">
            <Accordion.Trigger>Sección 2</Accordion.Trigger>
            <Accordion.Content>
              <p>Contenido de la segunda sección del acordeón.</p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="3">
            <Accordion.Trigger>Sección 3</Accordion.Trigger>
            <Accordion.Content>
              <p>Contenido de la tercera sección del acordeón.</p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    ),
  },
  tabs: {
    props: ["size", "color", "orientation"],
    sizeOptions: SIZE_OPTIONS_FULL,
    preview: (p) => (
      <div style={{ width: 400 }}>
        <Tabs {...p} defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Pestaña 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Pestaña 2</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Pestaña 3</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Contenido de pestaña 1</Tabs.Content>
          <Tabs.Content value="tab2">Contenido de pestaña 2</Tabs.Content>
          <Tabs.Content value="tab3">Contenido de pestaña 3</Tabs.Content>
        </Tabs>
      </div>
    ),
  },
  pagination: {
    props: ["color", "disabled"],
    preview: (p) => <Pagination {...p} count={10} defaultPage={1} />,
  },
  dropdown: {
    props: ["color", "placement", "trigger", "closeOnScroll", "showArrow"],
    placementOptions: PLACEMENT_DROPDOWN,
    preview: (p) => (
      <Dropdown {...p}>
        <Dropdown.Trigger>
          <Button>Abrir menú</Button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Perfil</Dropdown.Item>
          <Dropdown.Item>Configuración</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item>Cerrar sesión</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    ),
  },
  modal: {
    props: ["closeOnEscape", "outsideClick", "showCloseButton"],
    preview: (p) => (
      <Modal {...p}>
        <Modal.Trigger>
          <Button>Abrir modal</Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Título del modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Contenido del modal.
            </p>
          </Modal.Body>
          <Modal.Actions>
            <Modal.Action>Cerrar</Modal.Action>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    ),
  },
  drawer: {
    props: ["placement", "showCloseButton", "closeOnEscape", "outsideClick"],
    placementOptions: PLACEMENT_DRAWER,
    preview: (p) => (
      <Drawer {...p}>
        <Drawer.Trigger>
          <Button>Abrir panel</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Título del panel</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Contenido del panel.
            </p>
          </Drawer.Body>
          <Drawer.Actions>
            <Drawer.Action>Cerrar</Drawer.Action>
          </Drawer.Actions>
        </Drawer.Content>
      </Drawer>
    ),
  },
  "date-picker": {
    props: ["size", "color", "disabled"],
    sizeOptions: SIZE_OPTIONS_LG,
    preview: (p) => <DatePicker {...p} />,
  },
  "time-picker": {
    props: ["size", "color", "hourCycle", "clearButton", "disabled"],
    sizeOptions: SIZE_OPTIONS_LG,
    preview: (p) => <TimePicker {...p} />,
  },
  "data-table": {
    props: ["color", "stickyHeader", "loading"],
    preview: (p) => (
      <DataTable
        {...p}
        columns={[
          { key: "name", header: "Nombre", sortable: true },
          { key: "role", header: "Rol" },
        ]}
        data={[
          { id: 1, name: "Ana", role: "Ingeniera" },
          { id: 2, name: "Roberto", role: "Diseñador" },
          { id: 3, name: "Carlos", role: "Gerente" },
        ]}
        rowKey={(r) => r.id}
      />
    ),
  },
  "form-control": {
    props: ["disabled", "invalid", "required"],
    preview: (p) => (
      <FormControl {...p}>
        <Label>Nombre</Label>
        <Input placeholder="Ingresa tu nombre" />
      </FormControl>
    ),
  },
  label: {
    props: ["size", "optional"],
    sizeOptions: SIZE_OPTIONS_MD,
    preview: (p) => <Label {...p}>Texto de etiqueta</Label>,
  },
  container: {
    props: ["size", "center"],
    sizeOptions: SIZE_OPTIONS_FULL,
    preview: (p) => (
      <Container
        {...p}
        className="rounded-xl border border-dashed border-neutral-300 p-4 text-center text-sm text-neutral-500 dark:border-neutral-700"
      >
        Contenido del contenedor
      </Container>
    ),
  },
  toaster: {
    props: ["position"],
    preview: (p) => (
      <div className="flex flex-col items-center gap-3">
        <Toaster {...p} />
        <Button onClick={() => toast("¡Hola desde el playground!")}>
          Mostrar toast
        </Button>
        <Button
          color="success"
          variant="outline"
          onClick={() =>
            toast({
              title: "Éxito",
              description: "Operación completada.",
              kind: "success",
            })
          }
        >
          Toast de éxito
        </Button>
      </div>
    ),
  },
  "user-chip": {
    props: ["size", "color"],
    sizeOptions: SIZE_OPTIONS_MD,
    preview: (p) => (
      <div className="flex flex-col items-center gap-4">
        <UserChip {...p} name="Elena Ruiz" description="elenaruiz@email.com" />
        <UserChip {...p} name="Carlos López" description="carlos@email.com" presence="online" />
      </div>
    ),
  },
};

const LOGIC_COMPONENTS = new Set([
  "show",
  "for",
  "render-switch",
  "input-group",
]);

const NO_RADIUS_SLUGS = new Set([
  "radio",
  "switch",
  "range",
  "progress",
  "stepper",
  "breadcrumb",
  "divider",
  "label",
  "skeleton",
  "container",
]);

const ALL_ITEMS = WEBSITE_COMPONENT_GROUPS.flatMap((g) =>
  g.items.map((item) => ({
    ...item,
    group: g.title,
    hasPreview: !!COMPONENT_CONFIG[item.slug],
  })),
).sort((a, b) => a.name.localeCompare(b.name));

function PropControls({ config, currentProps, onChange, onReset, globalRadius, onGlobalRadiusChange, hasRadiusSupport }) {
  const groups = getPropGroups(config?.props ?? []);
  return (
    <Show when={config?.props?.length > 0 || config}>
      <div className="flex flex-col gap-6 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
        <For each={groups}>
          {([groupKey, items]) => {
            const selectItems = items.filter((n) => PROP_TYPES[n]?.type !== "boolean");
            const checkboxItems = items.filter((n) => PROP_TYPES[n]?.type === "boolean");
            return (
              <div key={groupKey} className="flex flex-col gap-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  {PROP_GROUPS[groupKey].label}
                </h4>
                <Show when={selectItems.length > 0}>
                  <div className="flex flex-wrap items-end gap-4">
                    <For each={selectItems}>
                      {(propName) => {
                        const schema = PROP_TYPES[propName];
                        const value = currentProps[propName] ?? DEFAULTS[propName];
                        const options =
                          propName === "size"
                            ? config.sizeOptions
                            : propName === "variant"
                              ? config.variantOptions
                              : propName === "color"
                                ? config.colorOptions
                                : propName === "shape"
                                  ? config.shapeOptions
                                  : propName === "placement"
                                    ? config.placementOptions
                                    : undefined;

                        return (
                          <label
                            key={propName}
                            className="flex flex-col gap-1 text-xs text-neutral-500"
                          >
                            {schema.label || propName}
                            {propName === "color" ? (
                              <div className="flex flex-wrap items-center gap-1.5">
                                {(options ?? schema.options).map((opt) => (
                                  <Tooltip key={opt} content={opt} placement="top" showArrow={false}>
                                    <button
                                      type="button"
                                      onClick={() => onChange(propName, opt)}
                                      className={cn(
                                        "size-6 rounded-full transition-all duration-150",
                                        COLOR_SWATCH_MAP[opt] || "bg-neutral-500",
                                        value === opt
                                          ? "ring-2 ring-neutral-400 ring-offset-2 dark:ring-neutral-500 dark:ring-offset-neutral-950"
                                          : "ring-1 ring-transparent hover:ring-neutral-300 dark:hover:ring-neutral-600",
                                      )}
                                    />
                                  </Tooltip>
                                ))}
                              </div>
                            ) : (
                              <Select
                                value={value}
                                onValueChange={(v) => onChange(propName, v)}
                                className="min-w-[8rem]"
                              >
                                {(options ?? schema.options).map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </Select>
                            )}
                          </label>
                        );
                      }}
                    </For>
                  </div>
                </Show>
                <Show when={checkboxItems.length > 0}>
                  <div className="flex flex-wrap items-center gap-4">
                    <For each={checkboxItems}>
                      {(propName) => {
                        const schema = PROP_TYPES[propName];
                        const value = currentProps[propName] ?? DEFAULTS[propName];
                        return (
                          <Checkbox
                            key={propName}
                            checked={value}
                            onCheckedChange={(checked) => onChange(propName, checked)}
                            label={schema.label || propName}
                          />
                        );
                      }}
                    </For>
                  </div>
                </Show>
              </div>
            );
          }}
        </For>
        <Show when={hasRadiusSupport}>
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Global
            </h4>
            <div className="flex flex-wrap items-end gap-4">
              <label className="flex flex-col gap-1 text-xs text-neutral-500">
                Radio (border-radius)
                <Select
                  value={globalRadius}
                  onValueChange={(v) => onGlobalRadiusChange(v)}
                  className="min-w-[8rem]"
                >
                  {RADIUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Select>
              </label>
            </div>
          </div>
        </Show>
        <Button
          size="sm"
          variant="soft"
          color="neutral"
          onClick={onReset}
          activeMotion={false}
          className="self-start"
        >
          Restablecer
        </Button>
      </div>
    </Show>
  );
}

export default function PlaygroundPage() {
  const [selected, setSelected] = useState(() => {
    if (typeof window === "undefined") return "button";
    const hash = window.location.hash.slice(1);
    return hash && COMPONENT_CONFIG[hash] ? hash : "button";
  });
  const [props, setProps] = useState({});
  const [globalRadius, setGlobalRadius] = useState("sm");
  const [previewTheme, setPreviewTheme] = useState("system");

  const selectComponent = (slug) => {
    setSelected(slug);
    setProps({});
    if (slug) window.location.hash = slug;
  };

  const resetProps = () => setProps({});

  const config = COMPONENT_CONFIG[selected];
  const componentInfo = WEBSITE_COMPONENT_GROUPS.flatMap((g) => g.items).find(
    (i) => i.slug === selected,
  );
  const isLogic = LOGIC_COMPONENTS.has(selected);

  const currentProps = useMemo(() => {
    const merged = { ...DEFAULTS, ...props };
    const result = {};
    if (!config) return result;
    config.props.forEach((name) => {
      const schema = PROP_TYPES[name];
      if (schema && merged[name] !== undefined) {
        result[name] = merged[name];
      }
    });
    return result;
  }, [config, props]);

  const [filter, setFilter] = useState("");
  const filteredGroups = useMemo(() => {
    const withPreview = (item) => ({
      ...item,
      hasPreview: !!COMPONENT_CONFIG[item.slug],
    });
    if (!filter)
      return WEBSITE_COMPONENT_GROUPS.map((g) => ({
        ...g,
        items: g.items
          .filter((item) => COMPONENT_CONFIG[item.slug])
          .map(withPreview),
      })).filter((g) => g.items.length > 0);
    const q = filter.toLowerCase();
    return WEBSITE_COMPONENT_GROUPS.map((g) => ({
      ...g,
      items: g.items
        .filter(
          (item) =>
            item.name.toLowerCase().includes(q) || item.slug.includes(q),
        )
        .map(withPreview),
    })).filter((g) => g.items.length > 0);
  }, [filter]);

  const updateProp = (name, value) =>
    setProps((prev) => ({ ...prev, [name]: value }));

  const generatedCode = useMemo(() => {
    const info = componentInfo;
    const tagName = info?.name || selected;
    const visibleProps = Object.entries(currentProps);
    const propsStr = visibleProps
      .map(([k, v]) => {
        if (v === true) return k;
        return `${k}="${v}"`;
      })
      .join(" ");
    const hasChildren = CHILDREN_EXAMPLES[selected];
    if (hasChildren) {
      const childrenText = hasChildren
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n");
      return `import { ${tagName} } from "quickit-ui"\n\n<${tagName}${propsStr ? ` ${propsStr}` : ""}>\n${childrenText}\n</${tagName}>`;
    }
    return `import { ${tagName} } from "quickit-ui"\n\n<${tagName}${propsStr ? ` ${propsStr}` : ""} />`;
  }, [selected, currentProps, componentInfo]);

  return (
    <WebsiteLayout
      sidebar={
        <aside className="hidden border-r border-neutral-200 dark:border-neutral-800 lg:fixed lg:top-14 lg:block lg:h-[calc(100vh-3.5rem)] lg:w-60 lg:overflow-y-auto scrollbar-hidden [mask-image:linear-gradient(transparent_0px,#000_32px,#000_calc(100%-32px),transparent)]">
          <div className="p-3 pb-8 pt-8">
            <div className="mb-4">
              <Input
                type="search"
                placeholder="Filtrar componentes..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                clearButton
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Show when={!!filter && filteredGroups.length === 0}>
                <p className="px-3 py-2 text-sm text-neutral-400 dark:text-neutral-500">
                  Sin resultados
                </p>
              </Show>
              <For each={filteredGroups}>
                {(group, gIdx) => (
                  <div key={gIdx} className="flex flex-col gap-0.5">
                    <p className="px-3 py-2 text-[0.6875rem] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                      {group.title}
                    </p>
                    <For each={group.items}>
                      {(item, iIdx) => (
                        <Link
                          key={`${item.slug}-${iIdx}`}
                          href={`#${item.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            selectComponent(item.slug);
                          }}
                          className={cn(
                            "relative flex h-8 items-center rounded-md px-3 text-[0.8125rem] transition-colors no-underline",
                            selected === item.slug
                              ? "bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
                              : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
                            !item.hasPreview && "cursor-not-allowed opacity-40",
                          )}
                        >
                          <span className="flex items-center gap-2">
                            {item.name}
                          </span>
                        </Link>
                      )}
                    </For>
                  </div>
                )}
              </For>
            </div>
          </div>
        </aside>
      }
    >
      <div className="mx-auto max-w-5xl flex flex-col gap-8">
        {componentInfo ? (
          <>
            <header className="flex flex-col gap-2">
              <h1 className="scroll-m-20 text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
                {componentInfo.name}
              </h1>
              <Show when={componentInfo.description}>
                <p className="text-base leading-7 text-neutral-500 dark:text-neutral-400">
                  {componentInfo.description}
                </p>
              </Show>
            </header>

            <Show
              when={!isLogic}
              fallback={
                <Alert
                  color="neutral"
                  variant="soft"
                  title="Componente lógico"
                  description={`${componentInfo.name} no tiene vista previa. Úsalo de forma declarativa en tu JSX.`}
                />
              }
            >
              {config ? (
                <div className="relative">
                  <div
                    className={cn(
                      "flex min-h-[200px] items-center justify-center overflow-auto rounded-xl border-2 border-dashed p-8",
                      previewTheme === "dark"
                        ? "border-neutral-800 bg-neutral-950"
                        : "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950",
                    )}
                    style={{ "--qi-radius": normalizeQuickitRadius(globalRadius) }}
                  >
                    <div className={cn(previewTheme === "dark" && "dark")}>
                      {config.preview(currentProps)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewTheme((t) =>
                        t === "dark" ? "system" : "dark",
                      )
                    }
                    className="absolute right-3 top-3 z-10 flex size-7 items-center justify-center rounded-md border border-neutral-200 bg-white/80 text-neutral-500 backdrop-blur transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-400 dark:hover:bg-neutral-700"
                    title={previewTheme === "dark" ? "Tema: oscuro" : "Tema: del sistema"}
                  >
                    {previewTheme === "dark" ? (
                      <svg aria-hidden="true" viewBox="0 0 384 512" className="size-3.5">
                        <path fill="currentColor" d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                      </svg>
                    ) : (
                      <svg aria-hidden="true" viewBox="0 0 512 512" className="size-3.5">
                        <path fill="currentColor" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391l-19.9 107.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121l19.9-107.9c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6z" />
                      </svg>
                    )}
                  </button>
                </div>
              ) : (
                <EmptyState
                  title="Sin vista previa"
                  description={`${componentInfo.name} tiene una API compleja o necesita contexto de ejecución. Revisa la documentación.`}
                />
              )}
            </Show>

            <PropControls
              config={config}
              currentProps={currentProps}
              onChange={updateProp}
              onReset={resetProps}
              globalRadius={globalRadius}
              onGlobalRadiusChange={setGlobalRadius}
              hasRadiusSupport={!NO_RADIUS_SLUGS.has(selected)}
            />

            <Show when={config && !isLogic}>
              <WebsiteCodeBlock code={generatedCode} language="jsx" />
            </Show>

            <Show when={config?.props?.length > 0}>
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                  Documentación de props
                </h2>
                <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
                        <th className="px-4 py-3 font-semibold text-neutral-700 dark:text-neutral-300">Prop</th>
                        <th className="px-4 py-3 font-semibold text-neutral-700 dark:text-neutral-300">Tipo</th>
                        <th className="px-4 py-3 font-semibold text-neutral-700 dark:text-neutral-300">Descripción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <For each={config.props}>
                        {(propName) => {
                          const schema = PROP_TYPES[propName];
                          if (!schema) return null;
                          return (
                            <tr key={propName} className="border-b border-neutral-100 last:border-0 dark:border-neutral-800">
                              <td className="px-4 py-2.5 font-mono text-xs text-neutral-900 dark:text-neutral-50">
                                {propName}
                              </td>
                              <td className="px-4 py-2.5 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                                {schema.type || (schema.options ? schema.options.map(o => `"${o}"`).join(" | ") : schema.label)}
                              </td>
                              <td className="px-4 py-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                                {schema.label || propName}
                              </td>
                            </tr>
                          );
                        }}
                      </For>
                    </tbody>
                  </table>
                </div>
              </div>
            </Show>
          </>
        ) : (
          <EmptyState
            title="Selecciona un componente"
            description="Elige un componente del buscador de arriba para ver su vista previa, configurar sus propiedades y copiar el código generado."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-400"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            }
          />
        )}
      </div>
    </WebsiteLayout>
  );
}
