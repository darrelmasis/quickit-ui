import { useMemo, useState } from "react";
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Checkbox,
  Combobox,
  CommandPalette,
  Container,
  DataTable,
  DatePicker,
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
} from "@/lib";
import { toast } from "@/lib/components/toaster/toast-store";
import { cn } from "@/lib/utils";
import { WEBSITE_COMPONENT_GROUPS } from "@/website/docs-content";
import WebsiteCodeBlock from "@/website/components/WebsiteCodeBlock";

const SIZE_OPTIONS_FULL = ["sm", "md", "lg", "xl", "2xl"];
const SIZE_OPTIONS_LG = ["sm", "md", "lg"];
const SIZE_OPTIONS_MD = ["sm", "md"];
const VARIANT_OPTIONS_SOG = ["solid", "outline", "ghost", "soft"];
const VARIANT_OPTIONS_SOS = ["soft", "outline", "solid"];

const PROP_TYPES = {
  size: { label: "Tamaño", options: SIZE_OPTIONS_FULL },
  color: {
    label: "Color",
    options: [
      "primary",
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
  disabled: { label: "Desactivado", type: "boolean" },
};

const DEFAULTS = {
  size: "md",
  color: "neutral",
  variant: "soft",
  disabled: false,
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
};

const COMPONENT_CONFIG = {
  button: {
    props: ["size", "color", "variant", "disabled"],
    sizeOptions: SIZE_OPTIONS_FULL,
    variantOptions: VARIANT_OPTIONS_SOG,
    preview: (p) => <Button {...p}>Botón</Button>,
  },
  badge: {
    props: ["size", "color", "variant"],
    sizeOptions: SIZE_OPTIONS_MD,
    variantOptions: VARIANT_OPTIONS_SOS,
    preview: (p) => <Badge {...p}>Etiqueta</Badge>,
  },
  "button-group": {
    props: ["size", "color", "variant"],
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
    props: ["size", "color"],
    sizeOptions: SIZE_OPTIONS_FULL,
    preview: (p) => (
      <Link {...p} href="#" onClick={(e) => e.preventDefault()}>
        Texto del enlace
      </Link>
    ),
  },
  input: {
    props: ["size", "disabled"],
    sizeOptions: SIZE_OPTIONS_LG,
    preview: (p) => <Input {...p} placeholder="Escribe algo..." />,
  },
  textarea: {
    props: ["size", "disabled"],
    sizeOptions: SIZE_OPTIONS_LG,
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
    props: ["size", "color", "disabled"],
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
    props: ["size", "disabled"],
    sizeOptions: SIZE_OPTIONS_MD,
    preview: (p) => <Checkbox {...p} label="Casilla" />,
  },
  radio: {
    props: ["size", "disabled"],
    sizeOptions: SIZE_OPTIONS_MD,
    preview: (p) => <Radio {...p} label="Opción" />,
  },
  switch: {
    props: ["size", "disabled"],
    sizeOptions: SIZE_OPTIONS_MD,
    preview: (p) => <Switch {...p} label="Interruptor" />,
  },
  range: {
    props: ["size", "color", "disabled"],
    sizeOptions: SIZE_OPTIONS_LG,
    preview: (p) => <Range {...p} />,
  },
  avatar: {
    props: ["size"],
    sizeOptions: SIZE_OPTIONS_FULL,
    preview: (p) => (
      <Avatar {...p}>
        <Avatar.Fallback>UI</Avatar.Fallback>
      </Avatar>
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
    props: ["color", "variant"],
    variantOptions: VARIANT_OPTIONS_SOS,
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
    props: ["size"],
    sizeOptions: SIZE_OPTIONS_FULL,
    preview: (p) => (
      <Breadcrumb {...p}>
        <Breadcrumb.Item href="#">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Sección</Breadcrumb.Item>
        <Breadcrumb.Item current>Página</Breadcrumb.Item>
      </Breadcrumb>
    ),
  },
  stepper: {
    props: [],
    preview: () => (
      <Stepper
        steps={[
          { title: "Paso 1", description: "Completado" },
          { title: "Paso 2", description: "En progreso" },
          { title: "Paso 3", description: "Pendiente" },
        ]}
        activeStep={1}
      />
    ),
  },
  tooltip: {
    props: [],
    preview: () => (
      <Tooltip content="Contenido del tooltip">
        <Button>Pasa el mouse</Button>
      </Tooltip>
    ),
  },
  popover: {
    props: [],
    preview: () => (
      <Popover
        trigger={<Button>Abrir popover</Button>}
        heading="Título del popover"
      >
        <div className="p-3 text-sm text-neutral-600 dark:text-neutral-400">
          Contenido del popover.
        </div>
      </Popover>
    ),
  },
  accordion: {
    props: [],
    preview: () => (
      <div className="w-full max-w-[400px]">
        <Accordion type="single" collapsible defaultValue="1">
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
    props: ["size", "color"],
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
    props: ["size", "color"],
    sizeOptions: SIZE_OPTIONS_FULL,
    preview: (p) => <Pagination {...p} count={10} defaultPage={1} />,
  },
  dropdown: {
    props: [],
    preview: () => (
      <Dropdown defaultOpen trigger="click">
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
    props: [],
    preview: () => (
      <Modal>
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
    props: [],
    preview: () => (
      <Drawer>
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
    props: ["size", "color"],
    sizeOptions: SIZE_OPTIONS_LG,
    preview: (p) => <DatePicker {...p} />,
  },
  "time-picker": {
    props: ["size", "color"],
    sizeOptions: SIZE_OPTIONS_LG,
    preview: (p) => <TimePicker {...p} />,
  },
  "data-table": {
    props: ["color"],
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
    props: ["disabled"],
    preview: (p) => (
      <FormControl {...p}>
        <Label>Nombre</Label>
        <Input placeholder="Ingresa tu nombre" />
      </FormControl>
    ),
  },
  label: {
    props: ["size"],
    sizeOptions: SIZE_OPTIONS_MD,
    preview: (p) => <Label {...p}>Texto de etiqueta</Label>,
  },
  container: {
    props: ["size"],
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
    props: [],
    preview: () => (
      <div className="flex flex-col items-center gap-3">
        <Toaster />
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
  "command-palette": {
    props: [],
    preview: () => <CommandPalettePreview />,
  },
};

function CommandPalettePreview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <Button onClick={() => setOpen(true)}>Abrir paleta de comandos</Button>
      <span className="text-xs text-neutral-500">(o presiona Ctrl+K)</span>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={[
          {
            heading: "Páginas",
            items: [
              { label: "Panel", href: "#" },
              { label: "Configuración", href: "#" },
              { label: "Perfil", href: "#" },
            ],
          },
        ]}
        placeholder="Buscar comandos..."
        emptyText="Sin resultados"
      />
    </div>
  );
}

const LOGIC_COMPONENTS = new Set([
  "show",
  "for",
  "render-switch",
  "input-group",
]);

const ALL_ITEMS = WEBSITE_COMPONENT_GROUPS.flatMap((g) =>
  g.items.map((item) => ({
    ...item,
    group: g.title,
    hasPreview: !!COMPONENT_CONFIG[item.slug],
  })),
).sort((a, b) => a.name.localeCompare(b.name));

function PropControls({ config, currentProps, onChange, onReset }) {
  return (
    <Show when={config?.props?.length > 0}>
      <div className="flex flex-wrap items-end gap-4 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
        <For each={config.props}>
          {(propName) => {
            const schema = PROP_TYPES[propName];
            const value = currentProps[propName] ?? DEFAULTS[propName];
            const options =
              propName === "size"
                ? config.sizeOptions
                : propName === "variant"
                  ? config.variantOptions
                  : undefined;

            if (schema.type === "boolean") {
              return (
                <Checkbox
                  key={propName}
                  checked={value}
                  onCheckedChange={(checked) => onChange(propName, checked)}
                  label={schema.label || propName}
                />
              );
            }

            return (
              <label
                key={propName}
                className="flex flex-col gap-1 text-xs text-neutral-500"
              >
                {schema.label || propName}
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
              </label>
            );
          }}
        </For>
        <Button
          size="sm"
          variant="ghost"
          color="neutral"
          onClick={onReset}
          activeMotion={false}
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
    <main className="pb-16">
      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] min-w-0">
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
                          und
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

        <Container
          size="full"
          center={false}
          className="min-w-0 px-4 sm:px-6 lg:col-start-2 pt-6 lg:pt-10"
        >
          <div className="mx-auto max-w-5xl flex flex-col gap-8">
            {/* <Combobox
              value={selected}
              onValueChange={selectComponent}
              options={ALL_ITEMS.map((item) => ({
                value: item.slug,
                label: item.name,
                disabled: !item.hasPreview,
              }))}
              placeholder="Buscar o seleccionar un componente…"
              emptyText="No hay componentes que coincidan"
              className="w-full"
              size="lg"
            /> */}

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
                    <div className="flex min-h-[200px] items-center justify-center overflow-auto rounded-xl border-2 border-dashed border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950">
                      {config.preview(currentProps)}
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
                />

                <Show when={config && !isLogic}>
                  <WebsiteCodeBlock code={generatedCode} language="jsx" />
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
        </Container>
      </div>
    </main>
  );
}
