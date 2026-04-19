import { useState } from "react";
import {
  Accordion,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  Combobox,
  CommandPalette,
  DataTable,
  DatePicker,
  Default,
  Drawer,
  Dropdown,
  EmptyState,
  FormControl,
  For,
  Input,
  InputGroup,
  InputGroupItem,
  Label,
  Link,
  Match,
  Modal,
  Pagination,
  Popover,
  Progress,
  Radio,
  Range,
  RenderSwitch,
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
  toast,
} from "@/lib";
import { WEBSITE_SHELL } from "@/website/site-config";
import WebsitePreviewTabs from "@/website/components/WebsitePreviewTabs";

const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$12",
    badge: "Popular",
    description: "Para equipos pequeños que necesitan velocidad.",
    features: [
      "Componentes base",
      "Tema light/dark",
      "Actualizaciones mensuales",
    ],
  },
  {
    name: "Pro",
    price: "$32",
    badge: "Recomendado",
    description: "Ideal para producto en produccion.",
    features: [
      "Todo en Starter",
      "Overlays y formularios",
      "Soporte prioritario",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    badge: "Equipo",
    description: "Seguridad y soporte para organizacion grande.",
    features: ["SLA dedicado", "Roadmap compartido", "Onboarding guiado"],
  },
];

const LOGIN_EXAMPLE_CODE = `import { Badge, Button, Checkbox, FormControl, Input, Label, Link } from "quickit-ui";

export function LoginCard() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
            Iniciar sesion
          </h3>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Usa tu cuenta principal.
          </p>
        </div>
        <Badge color="brand">Seguro</Badge>
      </div>
      <div className="mt-6 space-y-4">
        <FormControl>
          <Label htmlFor="login-email">Correo</Label>
          <Input id="login-email" type="email" placeholder="usuario@quickit.dev" />
        </FormControl>
        <FormControl>
          <Label htmlFor="login-password">Contraseña</Label>
          <Input
            id="login-password"
            type="password"
            placeholder="••••••••"
            passwordToggle
            autoComplete="current-password"
          />
        </FormControl>
        <div className="flex items-center justify-between text-sm">
          <Checkbox id="login-remember" label="Recordarme" />
          <Link href="#" variant="muted">Olvide mi contraseña</Link>
        </div>
        <Button color="neutral" fullWidth>Entrar</Button>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          No tienes cuenta? <Link href="#" underline="always">Crear cuenta</Link>
        </p>
      </div>
    </div>
  );
}`;

const SIGNUP_EXAMPLE_CODE = `import { Button, Checkbox, FormControl, Input, InputGroup, InputGroupItem, Label, Radio, Select, Switch, Textarea } from "quickit-ui";

export function SignupCard() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
            Crear cuenta
          </h3>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Empieza con un plan flexible.
          </p>
        </div>
        <Switch defaultChecked size="sm" label="Trial" />
      </div>
      <div className="mt-6 space-y-4">
        <FormControl required>
          <Label>Nombre completo</Label>
          <InputGroup attached>
            <InputGroupItem><Input placeholder="Nombre" /></InputGroupItem>
            <InputGroupItem><Input placeholder="Apellido" /></InputGroupItem>
          </InputGroup>
        </FormControl>
        <FormControl required>
          <Label htmlFor="signup-role">Rol</Label>
          <Select id="signup-role" placeholder="Selecciona rol">
            <option value="design">Design</option>
            <option value="dev">Development</option>
            <option value="product">Product</option>
          </Select>
        </FormControl>
        <FormControl>
          <Label htmlFor="signup-bio">Bio</Label>
          <Textarea id="signup-bio" minRows={3} placeholder="Cuentales de ti" />
        </FormControl>
        <div className="space-y-2 space-x-2 text-sm">
          <Radio name="plan" label="Plan mensual" defaultChecked />
          <Radio name="plan" label="Plan anual" />
        </div>
        <Checkbox id="signup-terms" label="Acepto terminos y condiciones" />
        <Button fullWidth color="neutral">Crear cuenta</Button>
      </div>
    </div>
  );
}`;

const FORM_MESSAGES_EXAMPLE_CODE = `import { FormControl, Input, Label } from "quickit-ui";

export function FormMessageExample() {
  return (
    <FormControl invalid required>
      <Label htmlFor="project-name">Nombre del proyecto</Label>
      <Input id="project-name" placeholder="Quickit Revamp" />
      <FormControl.Description>
        Se mostrara en el dashboard principal.
      </FormControl.Description>
      <FormControl.Message>Este nombre ya esta en uso.</FormControl.Message>
    </FormControl>
  );
}`;

const PRICING_EXAMPLE_CODE = `import { Badge, Button, For } from "quickit-ui";

const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$12",
    badge: "Popular",
    description: "Para equipos pequeños que necesitan velocidad.",
    features: ["Componentes base", "Tema light/dark", "Actualizaciones mensuales"],
  },
  {
    name: "Pro",
    price: "$32",
    badge: "Recomendado",
    description: "Ideal para producto en produccion.",
    features: ["Todo en Starter", "Overlays y formularios", "Soporte prioritario"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    badge: "Equipo",
    description: "Seguridad y soporte para organizacion grande.",
    features: ["SLA dedicado", "Roadmap compartido", "Onboarding guiado"],
  },
];

export function PricingCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <For each={PRICING_TIERS}>
        {(tier) => (
          <div
            key={tier.name}
            className="flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                  {tier.name}
                </h3>
                <Badge color="neutral" variant="soft">{tier.badge}</Badge>
              </div>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                {tier.description}
              </p>
              <p className="mt-4 text-3xl font-semibold text-neutral-950 dark:text-neutral-50">
                {tier.price}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <For each={tier.features}>
                  {(feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                      {feature}
                    </li>
                  )}
                </For>
              </ul>
            </div>
            <Button className="mt-6" color="neutral" fullWidth>
              Elegir plan
            </Button>
          </div>
        )}
      </For>
    </div>
  );
}`;

const TOOLBAR_EXAMPLE_CODE = `import { Breadcrumb, Button, Dropdown, Input, InputGroup, Select, Tabs } from "quickit-ui";

export function ToolbarExample() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <Breadcrumb>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Current>Proyectos</Breadcrumb.Current>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb>
          <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
            Proyectos activos
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <Dropdown>
            <Dropdown.Trigger>Acciones</Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Duplicar</Dropdown.Item>
              <Dropdown.Item>Compartir</Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Item variant="danger">Archivar</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
          <Button color="neutral">Nuevo proyecto</Button>
        </div>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="todos" size="sm">
          <Tabs.List>
            <Tabs.Trigger value="todos">Todos</Tabs.Trigger>
            <Tabs.Trigger value="activos">Activos</Tabs.Trigger>
            <Tabs.Trigger value="archivados">Archivados</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="todos">
            <div className="mt-4 grid gap-3 lg:grid-cols-[200px_minmax(0,1fr)_auto]">
              <Select placeholder="Todos los equipos">
                <option value="design">Design</option>
                <option value="product">Product</option>
                <option value="dev">Dev</option>
              </Select>
              <InputGroup attached>
                <InputGroup.Addon align="inline-start">Buscar</InputGroup.Addon>
                <Input placeholder="Nombre o etiqueta" />
                <InputGroup.Action variant="outline">Aplicar</InputGroup.Action>
              </InputGroup>
              <Button color="neutral" variant="outline">Exportar</Button>
            </div>
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  );
}`;

const TEAM_EXAMPLE_CODE = `import { Avatar, Badge } from "quickit-ui";

export function TeamExample() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
          Equipo principal
        </h3>
        <Avatar.Group stacked>
          <Avatar>
            <Avatar.Image src="https://i.pravatar.cc/120?img=12" alt="Ana" />
            <Avatar.Fallback>AR</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Image src="https://i.pravatar.cc/120?img=22" alt="Luis" />
            <Avatar.Fallback>LS</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>QT</Avatar.Fallback>
          </Avatar>
        </Avatar.Group>
      </div>
      <div className="mt-5 space-y-4">
        <Avatar.UserChip
          name="Elena Ruiz"
          description="Design lead"
          initials="ER"
          presence="online"
          trailing={<Badge size="sm">Core</Badge>}
        />
        <Avatar.UserChip
          name="Quickit Team"
          description="Sistema de diseño"
          initials="QT"
          presence="away"
        />
      </div>
    </div>
  );
}`;

const PRESENCE_EXAMPLE_CODE = `import { Avatar } from "quickit-ui";

export function PresenceExample() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
        Presencia
      </h3>
      <div className="mt-4 flex items-center gap-6">
        <Avatar size="lg">
          <Avatar.Fallback>DM</Avatar.Fallback>
          <Avatar.Presence status="online" />
        </Avatar>
        <Avatar size="lg">
          <Avatar.Initials name="Quickit UI" />
          <Avatar.Presence status="busy" />
        </Avatar>
      </div>
    </div>
  );
}`;

const OVERLAYS_EXAMPLE_CODE = `import { Button, Modal, Popover, Tooltip } from "quickit-ui";

export function OverlayExample() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex flex-wrap items-center gap-3">
        <Tooltip content="Acceso rapido">
          <Button color="neutral" variant="outline">Tooltip</Button>
        </Tooltip>
        <Popover content="Detalle rapido" trigger="click">
          <Button color="neutral" variant="outline">Popover</Button>
        </Popover>
        <Modal>
          <Modal.Trigger>
            <Button color="neutral">Abrir modal</Button>
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Confirmar accion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Esta accion no se puede deshacer.</Modal.Body>
            <Modal.Actions placement="end">
              <Modal.Action variant="outline">Cancelar</Modal.Action>
              <Modal.Action color="danger">Eliminar</Modal.Action>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
}`;

const DRAWER_EXAMPLE_CODE = `import { Button, Drawer } from "quickit-ui";

export function DrawerExample() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <Drawer placement="right">
        <Drawer.Trigger asChild>
          <Button color="neutral" variant="outline">
            Abrir drawer
          </Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Detalle del elemento</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <p className="text-sm leading-relaxed">
              Panel lateral con scroll, cierre por overlay o Escape. Ideal para filtros,
              detalle de fila o formularios largos sin ocupar el viewport completo.
            </p>
          </Drawer.Body>
          <Drawer.Actions>
            <Drawer.Action variant="outline" color="neutral">
              Cancelar
            </Drawer.Action>
            <Drawer.Action color="neutral">Guardar</Drawer.Action>
          </Drawer.Actions>
        </Drawer.Content>
      </Drawer>
    </div>
  );
}`;

const PROGRESS_RANGE_EXAMPLE_CODE = `import { Label, Progress, Range } from "quickit-ui";
import { useState } from "react";

export function ProgressRangeExample() {
  const [level, setLevel] = useState(45);
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
        Progreso y rango
      </h3>
      <div className="mt-4 max-w-md space-y-2">
        <Label htmlFor="demo-range">Intensidad ({level}%)</Label>
        <Range
          id="demo-range"
          min={0}
          max={100}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        />
      </div>
      <div className="mt-6 max-w-md space-y-4">
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Subida de archivo</p>
          <Progress value={72} color="success" size="sm" className="mt-1" />
        </div>
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Vinculado al slider</p>
          <Progress value={level} color="brand" className="mt-1" />
        </div>
      </div>
    </div>
  );
}`;

const TOAST_EXAMPLE_CODE = `import { Button, Toaster, toast } from "quickit-ui";

export function ToastExample() {
  return (
    <>
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
          Notificaciones
        </h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          API imperativa; monta el Toaster una vez en la raíz.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast({ title: "Cambios guardados", kind: "success" })}
          >
            Éxito
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              toast({
                title: "No se pudo guardar",
                kind: "error",
                description: "Revisa la conexión.",
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
                title: "Proyecto archivado",
                action: { label: "Deshacer", onClick: () => {} },
              })
            }
          >
            Con accion
          </Button>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}`;

const EMPTY_STATE_EXAMPLE_CODE = `import { Button, EmptyState } from "quickit-ui";

export function EmptyStateExample() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <EmptyState align="start">
        <EmptyState.Title>Sin resultados</EmptyState.Title>
        <EmptyState.Description>Prueba ajustando tus filtros.</EmptyState.Description>
        <EmptyState.Actions>
          <Button size="sm" variant="outline">Cambiar filtros</Button>
          <Button size="sm">Crear item</Button>
        </EmptyState.Actions>
      </EmptyState>
    </div>
  );
}`;

const SKELETON_EXAMPLE_CODE = `import { Show, Skeleton } from "quickit-ui";

export function SkeletonExample() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="space-y-3">
        <Skeleton shape="line" />
        <Skeleton shape="line" />
        <Skeleton shape="rect" />
      </div>
      <div className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
        <Show when={false} fallback="Cargando...">
          Contenido listo
        </Show>
      </div>
    </div>
  );
}`;

const NAV_EXAMPLE_CODE = `import { Accordion, Pagination } from "quickit-ui";

export function NavigationExample() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Qué incluye</Accordion.Trigger>
          <Accordion.Content>Tokens, componentes y hooks.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Roadmap</Accordion.Trigger>
          <Accordion.Content>Nuevos overlays y data components.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <div className="mt-6 flex justify-center">
        <Pagination count={8} />
      </div>
    </div>
  );
}`;

const SWITCH_EXAMPLE_CODE = `import { Badge, Default, Match, RenderSwitch } from "quickit-ui";

export function RenderSwitchExample() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <RenderSwitch value="warning">
        <Match when="success">Todo correcto</Match>
        <Match when="warning">
          <div className="space-y-2">
            <Badge color="warning">Atención</Badge>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Hay pendientes por revisar.
            </p>
          </div>
        </Match>
        <Default>Estado desconocido</Default>
      </RenderSwitch>
    </div>
  );
}`;

const EXAMPLES_NAV = [
  {
    title: "Flujos",
    items: [
      { id: "acceso-registro", label: "Acceso y registro" },
      { id: "mensajes-formulario", label: "Mensajes de formulario" },
      { id: "pricing", label: "Pricing" },
      { id: "barra-trabajo", label: "Barra de trabajo" },
    ],
  },
  {
    title: "Identidad",
    items: [{ id: "identidad-equipo", label: "Identidad y equipo" }],
  },
  {
    title: "Overlays",
    items: [
      { id: "overlays-feedback", label: "Overlays y feedback" },
      { id: "drawer-panel", label: "Drawer" },
    ],
  },
  {
    title: "Estados",
    items: [
      { id: "estados-carga", label: "Estados y carga" },
      { id: "progreso-rango", label: "Progreso y rango" },
      { id: "toasts-ejemplo", label: "Toasts" },
      { id: "formularios-avanzados", label: "Combobox, fecha y datos" },
    ],
  },
  {
    title: "Organización",
    items: [
      { id: "layout-secciones", label: "Layout y Secciones" },
      { id: "navegacion-utilidades", label: "Navegación y utilidades" },
    ],
  },
];

const ADVANCED_CONTROLS_CODE = `import { useState } from "react";
import {
  Button,
  Combobox,
  CommandPalette,
  DataTable,
  DatePicker,
  Stepper,
  TimePicker,
} from "quickit-ui";

export function AdvancedControlsDemo() {
  const [lang, setLang] = useState("es");
  const [step, setStep] = useState(1);
  const [paletteOpen, setPaletteOpen] = useState(false);
  return (
    <div className="space-y-6">
      <Stepper
        activeStep={step}
        onStepChange={setStep}
        steps={[
          { title: "Cuenta" },
          { title: "Plan" },
          { title: "Listo" },
        ]}
      />
      <Combobox
        value={lang}
        onValueChange={setLang}
        options={[
          { value: "es", label: "Español" },
          { value: "en", label: "English" },
        ]}
        placeholder="Idioma"
      />
      <DatePicker placeholder="Fecha" />
      <TimePicker placeholder="Hora" minuteStep={15} />
      <DataTable
        rowKey={(r) => r.id}
        columns={[
          { key: "name", header: "Nombre", sortable: true },
          { key: "qty", header: "Cant." },
        ]}
        data={[
          { id: 1, name: "Teclado", qty: 2 },
          { id: 2, name: "Mouse", qty: 5 },
        ]}
      />
      <Button type="button" onClick={() => setPaletteOpen(true)}>
        Paleta
      </Button>
      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        groups={[
          {
            heading: "Demo",
            items: [{ id: "1", label: "Cerrar", onSelect: () => {} }],
          },
        ]}
      />
    </div>
  );
}`;

const HEADER_EXAMPLE_CODE = `import { Avatar, Badge, Button, Input, Link } from "quickit-ui";

export function AppHeader() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b bg-white px-6 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 font-bold text-neutral-950 dark:text-neutral-50">
          <div className="size-6 rounded-lg bg-sky-600" />
          <span>Quickit</span>
        </div>
        
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="#" className="px-3 py-2 text-sm font-medium">Dashboard</Link>
          <Link href="#" variant="muted" className="px-3 py-2 text-sm font-medium">Proyectos</Link>
          <Link href="#" variant="muted" className="px-3 py-2 text-sm font-medium">Equipo</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Input className="hidden max-w-[180px] md:flex" placeholder="Buscar..." size="sm" />
        <div className="flex items-center gap-3">
          <Button variant="ghost" shape="square" size="sm" color="neutral">
            <span className="sr-only">Notificaciones</span>
            <Badge size="xs" color="danger" className="absolute right-0.5 top-0.5" />
          </Button>
          <Avatar size="sm">
            <Avatar.Fallback>AD</Avatar.Fallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}`;

const FOOTER_EXAMPLE_CODE = `import { Button, Input, Link } from "quickit-ui";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-neutral-50 py-12 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <p className="font-bold text-neutral-950 dark:text-neutral-50">Quickit UI</p>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Sistema de diseño moderno para construir aplicaciones web rápidas y accesibles.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase">Docs</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" variant="muted">Componentes</Link></li>
              <li><Link href="#" variant="muted">Ejemplos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" variant="muted">Privacidad</Link></li>
              <li><Link href="#" variant="muted">Términos</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase">Suscríbete</h4>
            <div className="flex gap-2">
              <Input size="sm" placeholder="tu@correo.com" />
              <Button size="sm">Ir</Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}`;

export default function ExamplesPage() {
  const [rangeLevel, setRangeLevel] = useState(45);
  const [exampleLang, setExampleLang] = useState("es");
  const [exampleStep, setExampleStep] = useState(1);
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <main className={`${WEBSITE_SHELL} pb-20 pt-10 sm:pt-14`}>
      <div className="grid items-start gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden self-start lg:sticky lg:top-24 lg:block lg:h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-3 lg:[scrollbar-width:thin] lg:[scrollbar-color:rgb(163_163_163)_transparent] lg:[&::-webkit-scrollbar]:w-2 lg:[&::-webkit-scrollbar-track]:bg-transparent lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:[&::-webkit-scrollbar-thumb]:border-2 lg:[&::-webkit-scrollbar-thumb]:border-transparent lg:[&::-webkit-scrollbar-thumb]:bg-neutral-300 lg:[&::-webkit-scrollbar-thumb]:bg-clip-content lg:[&::-webkit-scrollbar-thumb:hover]:bg-neutral-400 dark:lg:[scrollbar-color:rgb(115_115_115)_transparent] dark:lg:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:lg:[&::-webkit-scrollbar-thumb:hover]:bg-neutral-600">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                Ejemplos
              </p>
              <div className="mt-4 space-y-6">
                <For each={EXAMPLES_NAV}>
                  {(group, groupIndex) => (
                    <div key={`${group.title}-${groupIndex}`}>
                      <p className="px-3 text-xs font-medium text-neutral-500 dark:text-neutral-500">
                        {group.title}
                      </p>
                      <div className="mt-2 space-y-1 px-3">
                        <For each={group.items}>
                          {(item, itemIndex) => (
                            <a
                              key={`${item.id}-${itemIndex}`}
                              href={`#${item.id}`}
                              className="block rounded-lg px-2 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                            >
                              {item.label}
                            </a>
                          )}
                        </For>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-16">
          <header className="space-y-4">
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Ejemplos
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">
              Flujos reales con Quickit UI
            </h1>
            <p className="max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
              Cada bloque usa componentes reales de la libreria. Ajusta texto,
              color y layout sin salirte de la API principal.
            </p>
          </header>

          <section id="acceso-registro" className="scroll-mt-28 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
              Acceso y registro
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Login y signup usando FormControl, Input, Checkbox y Switch.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <WebsitePreviewTabs code={LOGIN_EXAMPLE_CODE}>
              <div className="w-full max-w-md">
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                        Iniciar sesion
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        Usa tu cuenta principal.
                      </p>
                    </div>
                    <Badge color="brand">Seguro</Badge>
                  </div>
                  <div className="mt-6 space-y-4">
                    <FormControl>
                      <Label htmlFor="login-email">Correo</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="usuario@quickit.dev"
                      />
                    </FormControl>
                    <FormControl>
                      <Label htmlFor="login-password">Contraseña</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        passwordToggle
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <div className="flex items-center justify-between text-sm">
                      <Checkbox id="login-remember" label="Recordarme" />
                      <Link href="#" variant="muted">
                        Olvide mi contraseña
                      </Link>
                    </div>
                    <Button color="neutral" fullWidth>
                      Entrar
                    </Button>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      No tienes cuenta?{" "}
                      <Link href="#" underline="always">
                        Crear cuenta
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </WebsitePreviewTabs>

            <WebsitePreviewTabs code={SIGNUP_EXAMPLE_CODE}>
              <div className="w-full max-w-md">
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                        Crear cuenta
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        Empieza con un plan flexible.
                      </p>
                    </div>
                    <Switch defaultChecked size="sm" label="Trial" />
                  </div>
                  <div className="mt-6 space-y-4">
                    <FormControl required>
                      <Label>Nombre completo</Label>
                      <InputGroup attached>
                        <InputGroupItem>
                          <Input placeholder="Nombre" />
                        </InputGroupItem>
                        <InputGroupItem>
                          <Input placeholder="Apellido" />
                        </InputGroupItem>
                      </InputGroup>
                    </FormControl>
                    <FormControl required>
                      <Label htmlFor="signup-role">Rol</Label>
                      <Select id="signup-role" placeholder="Selecciona rol">
                        <option value="design">Design</option>
                        <option value="dev">Development</option>
                        <option value="product">Product</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <Label htmlFor="signup-bio">Bio</Label>
                      <Textarea
                        id="signup-bio"
                        minRows={3}
                        placeholder="Cuentales de ti"
                      />
                    </FormControl>
                    <div className="space-y-2 space-x-2 text-sm">
                      <Radio name="plan" label="Plan mensual" defaultChecked />
                      <Radio name="plan" label="Plan anual" />
                    </div>
                    <Checkbox
                      id="signup-terms"
                      label="Acepto terminos y condiciones"
                    />
                    <Button fullWidth color="neutral">
                      Crear cuenta
                    </Button>
                  </div>
                </div>
              </div>
            </WebsitePreviewTabs>
          </div>
        </section>

          <section id="mensajes-formulario" className="scroll-mt-28 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
              Mensajes de formulario
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Descripciones y errores con FormControl.Description y FormControl.Message.
            </p>
          </div>
          <WebsitePreviewTabs code={FORM_MESSAGES_EXAMPLE_CODE}>
            <div className="w-full max-w-md">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <FormControl invalid required>
                  <Label htmlFor="project-name">Nombre del proyecto</Label>
                  <Input id="project-name" placeholder="Quickit Revamp" />
                  <FormControl.Description>
                    Se mostrara en el dashboard principal.
                  </FormControl.Description>
                  <FormControl.Message>Este nombre ya esta en uso.</FormControl.Message>
                </FormControl>
              </div>
            </div>
          </WebsitePreviewTabs>
        </section>

          <section id="pricing" className="scroll-mt-28 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
              Pricing
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Cards con Badge, Button, List y estados.
            </p>
          </div>
          <WebsitePreviewTabs code={PRICING_EXAMPLE_CODE}>
            <div className="w-full">
              <div className="grid gap-6 lg:grid-cols-3">
                <For each={PRICING_TIERS}>
                  {(tier) => (
                    <div
                      key={tier.name}
                      className="flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                            {tier.name}
                          </h3>
                          <Badge color="neutral" variant="soft">
                            {tier.badge}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                          {tier.description}
                        </p>
                        <p className="mt-4 text-3xl font-semibold text-neutral-950 dark:text-neutral-50">
                          {tier.price}
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <For each={tier.features}>
                            {(feature) => (
                              <li
                                key={feature}
                                className="flex items-center gap-2"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                                {feature}
                              </li>
                            )}
                          </For>
                        </ul>
                      </div>
                      <Button className="mt-6" color="neutral" fullWidth>
                        Elegir plan
                      </Button>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </WebsitePreviewTabs>
        </section>

          <section id="barra-trabajo" className="scroll-mt-28 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
              Barra de trabajo
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Navegacion, filtros y acciones principales.
            </p>
          </div>
          <WebsitePreviewTabs code={TOOLBAR_EXAMPLE_CODE}>
            <div className="w-full">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-2">
                    <Breadcrumb>
                      <Breadcrumb.List>
                        <Breadcrumb.Item>
                          <Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                          <Breadcrumb.Current>Proyectos</Breadcrumb.Current>
                        </Breadcrumb.Item>
                      </Breadcrumb.List>
                    </Breadcrumb>
                    <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                      Proyectos activos
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <Dropdown>
                      <Dropdown.Trigger>Acciones</Dropdown.Trigger>
                      <Dropdown.Content>
                        <Dropdown.Item>Duplicar</Dropdown.Item>
                        <Dropdown.Item>Compartir</Dropdown.Item>
                        <Dropdown.Separator />
                        <Dropdown.Item variant="danger">Archivar</Dropdown.Item>
                      </Dropdown.Content>
                    </Dropdown>
                    <Button color="neutral">Nuevo proyecto</Button>
                  </div>
                </div>

                <div className="mt-6">
                  <Tabs defaultValue="todos" size="sm">
                    <Tabs.List>
                      <Tabs.Trigger value="todos">Todos</Tabs.Trigger>
                      <Tabs.Trigger value="activos">Activos</Tabs.Trigger>
                      <Tabs.Trigger value="archivados">Archivados</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="todos">
                      <div className="mt-4 grid gap-3 lg:grid-cols-[200px_minmax(0,1fr)_auto]">
                        <Select placeholder="Todos los equipos">
                          <option value="design">Design</option>
                          <option value="product">Product</option>
                          <option value="dev">Dev</option>
                        </Select>
                        <InputGroup attached>
                          <InputGroup.Addon align="inline-start">
                            Buscar
                          </InputGroup.Addon>
                          <Input placeholder="Nombre o etiqueta" />
                          <InputGroup.Action variant="outline">
                            Aplicar
                          </InputGroup.Action>
                        </InputGroup>
                        <Button color="neutral" variant="outline">
                          Exportar
                        </Button>
                      </div>
                    </Tabs.Content>
                    <Tabs.Content value="activos">
                      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                        Filtra solo los activos.
                      </p>
                    </Tabs.Content>
                    <Tabs.Content value="archivados">
                      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                        Filtra solo los archivados.
                      </p>
                    </Tabs.Content>
                  </Tabs>
                </div>
              </div>
            </div>
          </WebsitePreviewTabs>
        </section>

          <section id="identidad-equipo" className="scroll-mt-28 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
              Identidad y equipo
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Avatar, grupos, presencia e initials.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <WebsitePreviewTabs code={TEAM_EXAMPLE_CODE}>
              <div className="w-full">
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                      Equipo principal
                    </h3>
                    <Avatar.Group stacked>
                      <Avatar>
                        <Avatar.Image
                          src="https://i.pravatar.cc/120?img=12"
                          alt="Ana"
                        />
                        <Avatar.Fallback>AR</Avatar.Fallback>
                      </Avatar>
                      <Avatar>
                        <Avatar.Image
                          src="https://i.pravatar.cc/120?img=22"
                          alt="Luis"
                        />
                        <Avatar.Fallback>LS</Avatar.Fallback>
                      </Avatar>
                      <Avatar>
                        <Avatar.Fallback>QT</Avatar.Fallback>
                      </Avatar>
                    </Avatar.Group>
                  </div>
                  <div className="mt-5 space-y-4">
                    <Avatar.UserChip
                      name="Elena Ruiz"
                      description="Design lead"
                      initials="ER"
                      presence="online"
                      trailing={<Badge size="sm">Core</Badge>}
                    />
                    <Avatar.UserChip
                      name="Quickit Team"
                      description="Sistema de diseño"
                      initials="QT"
                      presence="away"
                    />
                  </div>
                </div>
              </div>
            </WebsitePreviewTabs>
            <WebsitePreviewTabs code={PRESENCE_EXAMPLE_CODE}>
              <div className="w-full">
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                    Presencia
                  </h3>
                  <div className="mt-4 flex items-center gap-6">
                    <Avatar size="lg">
                      <Avatar.Fallback>DM</Avatar.Fallback>
                      <Avatar.Presence status="online" />
                    </Avatar>
                    <Avatar size="lg">
                      <Avatar.Initials name="Quickit UI" />
                      <Avatar.Presence status="busy" />
                    </Avatar>
                  </div>
                </div>
              </div>
            </WebsitePreviewTabs>
          </div>
        </section>

          <section id="overlays-feedback" className="scroll-mt-28 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
              Overlays y feedback
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Dropdown, Tooltip, Popover y Modal en un mismo bloque.
            </p>
          </div>
          <WebsitePreviewTabs code={OVERLAYS_EXAMPLE_CODE}>
            <div className="w-full">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <div className="flex flex-wrap items-center gap-3">
                  <Tooltip content="Acceso rapido">
                    <Button color="neutral" variant="outline">
                      Tooltip
                    </Button>
                  </Tooltip>
                  <Popover content="Detalle rapido" trigger="click">
                    <Button color="neutral" variant="outline">
                      Popover
                    </Button>
                  </Popover>
                  <Modal>
                    <Modal.Trigger asChild>
                      <Button color="neutral">Abrir modal</Button>
                    </Modal.Trigger>
                    <Modal.Content>
                      <Modal.Header>
                        <Modal.Title>Confirmar accion</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Esta accion no se puede deshacer.</Modal.Body>
                      <Modal.Actions placement="end">
                        <Modal.Action variant="outline">Cancelar</Modal.Action>
                        <Modal.Action color="danger">Eliminar</Modal.Action>
                      </Modal.Actions>
                    </Modal.Content>
                  </Modal>
                </div>
              </div>
            </div>
          </WebsitePreviewTabs>
        </section>

          <section id="drawer-panel" className="scroll-mt-28 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
                Drawer
              </h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Panel lateral con portal, scroll en el cuerpo y acciones al pie.
              </p>
            </div>
            <WebsitePreviewTabs code={DRAWER_EXAMPLE_CODE}>
              <div className="w-full max-w-xl">
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <Drawer placement="right">
                    <Drawer.Trigger asChild>
                      <Button color="neutral" variant="outline">
                        Abrir drawer
                      </Button>
                    </Drawer.Trigger>
                    <Drawer.Content>
                      <Drawer.Header>
                        <Drawer.Title>Detalle del elemento</Drawer.Title>
                      </Drawer.Header>
                      <Drawer.Body>
                        <p className="text-sm leading-relaxed">
                          Panel lateral con scroll, cierre por overlay o Escape.
                          Ideal para filtros, detalle de fila o formularios largos
                          sin ocupar el viewport completo.
                        </p>
                      </Drawer.Body>
                      <Drawer.Actions>
                        <Drawer.Action variant="outline" color="neutral">
                          Cancelar
                        </Drawer.Action>
                        <Drawer.Action color="neutral">Guardar</Drawer.Action>
                      </Drawer.Actions>
                    </Drawer.Content>
                  </Drawer>
                </div>
              </div>
            </WebsitePreviewTabs>
          </section>

          <section id="estados-carga" className="scroll-mt-28 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
              Estados y carga
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              EmptyState, Skeleton y estados de render condicional.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <WebsitePreviewTabs code={EMPTY_STATE_EXAMPLE_CODE}>
              <div className="w-full">
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <EmptyState align="start">
                    <EmptyState.Title>Sin resultados</EmptyState.Title>
                    <EmptyState.Description>
                      Prueba ajustando tus filtros.
                    </EmptyState.Description>
                    <EmptyState.Actions>
                      <Button size="sm" variant="outline">
                        Cambiar filtros
                      </Button>
                      <Button size="sm">Crear item</Button>
                    </EmptyState.Actions>
                  </EmptyState>
                </div>
              </div>
            </WebsitePreviewTabs>
            <WebsitePreviewTabs code={SKELETON_EXAMPLE_CODE}>
              <div className="w-full">
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <div className="space-y-3">
                    <Skeleton shape="line" />
                    <Skeleton shape="line" />
                    <Skeleton shape="rect" />
                  </div>
                  <div className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
                    <Show when={false} fallback="Cargando...">
                      Contenido listo
                    </Show>
                  </div>
                </div>
              </div>
            </WebsitePreviewTabs>
          </div>
        </section>

          <section id="progreso-rango" className="scroll-mt-28 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
                Progreso y rango
              </h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Barra de progreso determinista y control deslizante con tema y
                tamaños.
              </p>
            </div>
            <WebsitePreviewTabs code={PROGRESS_RANGE_EXAMPLE_CODE}>
              <div className="w-full max-w-xl">
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                    Progreso y rango
                  </h3>
                  <div className="mt-4 max-w-md space-y-2">
                    <Label htmlFor="examples-range">
                      Intensidad ({rangeLevel}%)
                    </Label>
                    <Range
                      id="examples-range"
                      min={0}
                      max={100}
                      value={rangeLevel}
                      onChange={(e) =>
                        setRangeLevel(Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="mt-6 max-w-md space-y-4">
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Subida de archivo
                      </p>
                      <Progress
                        value={72}
                        color="success"
                        size="sm"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Vinculado al slider
                      </p>
                      <Progress
                        value={rangeLevel}
                        color="brand"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </WebsitePreviewTabs>
          </section>

          <section id="toasts-ejemplo" className="scroll-mt-28 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
                Toasts
              </h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Notificaciones con <code className="text-neutral-700 dark:text-neutral-300">toast()</code>; el contenedor{" "}
                <code className="text-neutral-700 dark:text-neutral-300">&lt;Toaster /&gt;</code>{" "}
                va en la raíz de la app (aqui solo en esta pagina de ejemplos).
              </p>
            </div>
            <WebsitePreviewTabs code={TOAST_EXAMPLE_CODE}>
              <div className="w-full max-w-xl">
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                    Notificaciones
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    API imperativa; monta el Toaster una vez en la raíz.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        toast({ title: "Cambios guardados", kind: "success" })
                      }
                    >
                      Éxito
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        toast({
                          title: "No se pudo guardar",
                          kind: "error",
                          description: "Revisa la conexión.",
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
                          title: "Proyecto archivado",
                          action: {
                            label: "Deshacer",
                            onClick: () => {},
                          },
                        })
                      }
                    >
                      Con acción
                    </Button>
                  </div>
                </div>
              </div>
            </WebsitePreviewTabs>
          </section>

          <section id="formularios-avanzados" className="scroll-mt-28 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
                Combobox, fecha, tabla y paleta
              </h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Componentes nuevos para formularios densos, datos tabulares y
                atajos de productividad.
              </p>
            </div>
            <WebsitePreviewTabs code={ADVANCED_CONTROLS_CODE}>
              <div className="w-full max-w-2xl space-y-6">
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <Stepper
                    activeStep={exampleStep}
                    onStepChange={setExampleStep}
                    steps={[
                      { title: "Cuenta", description: "Datos básicos" },
                      { title: "Plan", description: "Elige plan" },
                      { title: "Listo", description: "Confirmación" },
                    ]}
                  />
                  <div className="mt-6 space-y-4">
                    <Combobox
                      value={exampleLang}
                      onValueChange={setExampleLang}
                      options={[
                        { value: "es", label: "Español" },
                        { value: "en", label: "English" },
                        { value: "fr", label: "Français" },
                      ]}
                      placeholder="Idioma de interfaz"
                    />
                    <DatePicker placeholder="Fecha de inicio" />
                    <TimePicker placeholder="Hora de inicio" minuteStep={15} />
                    <DataTable
                      rowKey={(row) => row.id}
                      columns={[
                        { key: "name", header: "Producto", sortable: true },
                        { key: "qty", header: "Cant." },
                      ]}
                      data={[
                        { id: 1, name: "Teclado", qty: 2 },
                        { id: 2, name: "Mouse", qty: 5 },
                        { id: 3, name: "Monitor", qty: 1 },
                      ]}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPaletteOpen(true)}
                    >
                      Abrir paleta de comandos
                    </Button>
                  </div>
                </div>
                <CommandPalette
                  open={paletteOpen}
                  onOpenChange={setPaletteOpen}
                  groups={[
                    {
                      heading: "Ejemplo",
                      items: [
                        {
                          id: "toast",
                          label: "Mostrar toast de prueba",
                          onSelect: () =>
                            toast({ title: "Desde la paleta", kind: "success" }),
                        },
                        {
                          id: "close",
                          label: "Solo cerrar",
                          onSelect: () => {},
                        },
                      ],
                    },
                  ]}
                />
              </div>
            </WebsitePreviewTabs>
          </section>
          <section id="layout-secciones" className="scroll-mt-28 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
                Secciones y Layout
              </h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Componentes de estructura real como cabeceras y pies de página.
              </p>
            </div>
            
            <div className="space-y-8">
              <WebsitePreviewTabs code={HEADER_EXAMPLE_CODE}>
                <div className="w-full">
                  <header className="flex h-16 w-full items-center justify-between border-b border-neutral-200 bg-white px-6 dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2 font-bold text-neutral-950 dark:text-neutral-50">
                        <div className="size-6 rounded-lg bg-sky-600" />
                        <span>Quickit</span>
                      </div>
                      
                      <nav className="hidden items-center gap-1 md:flex">
                        <Link href="#" className="px-3 py-2 text-sm font-medium">Dashboard</Link>
                        <Link href="#" variant="muted" className="px-3 py-2 text-sm font-medium">Proyectos</Link>
                        <Link href="#" variant="muted" className="px-3 py-2 text-sm font-medium">Equipo</Link>
                      </nav>
                    </div>

                    <div className="flex items-center gap-4">
                      <Input className="hidden max-w-[180px] md:flex" placeholder="Buscar..." size="sm" />
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" shape="square" size="sm" color="neutral">
                          <span className="sr-only">Notificaciones</span>
                          <Badge size="xs" color="danger" className="absolute right-0.5 top-0.5" />
                        </Button>
                        <Avatar size="sm">
                          <Avatar.Fallback>AD</Avatar.Fallback>
                        </Avatar>
                      </div>
                    </div>
                  </header>
                </div>
              </WebsitePreviewTabs>

              <WebsitePreviewTabs code={FOOTER_EXAMPLE_CODE}>
                <div className="w-full">
                  <footer className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-10 dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="mx-auto max-w-7xl px-6">
                      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-4">
                          <p className="font-bold text-neutral-950 dark:text-neutral-50">Quickit UI</p>
                          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                            Sistema de diseño moderno para aplicaciones rápidas y accesibles.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase">Docs</h4>
                          <ul className="mt-4 space-y-2">
                            <li><Link href="#" variant="muted">Componentes</Link></li>
                            <li><Link href="#" variant="muted">Ejemplos</Link></li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase">Legal</h4>
                          <ul className="mt-4 space-y-2 text-sm">
                            <li><Link href="#" variant="muted">Privacidad</Link></li>
                            <li><Link href="#" variant="muted">Términos</Link></li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase">Suscríbete</h4>
                          <div className="flex gap-2">
                            <Input size="sm" placeholder="tu@correo.com" />
                            <Button size="sm">Ir</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </footer>
                </div>
              </WebsitePreviewTabs>
            </div>
          </section>

          <section id="navegacion-utilidades" className="scroll-mt-28 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
              Navegación y utilidades
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Accordion, Pagination y RenderSwitch.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <WebsitePreviewTabs code={NAV_EXAMPLE_CODE}>
              <div className="w-full">
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <Accordion type="single" collapsible>
                    <Accordion.Item value="item-1">
                      <Accordion.Trigger>Qué incluye</Accordion.Trigger>
                      <Accordion.Content>
                        Tokens, componentes y hooks.
                      </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="item-2">
                      <Accordion.Trigger>Roadmap</Accordion.Trigger>
                      <Accordion.Content>
                        Nuevos overlays y data components.
                      </Accordion.Content>
                    </Accordion.Item>
                  </Accordion>
                  <div className="mt-6 flex justify-center">
                    <Pagination count={8} />
                  </div>
                </div>
              </div>
            </WebsitePreviewTabs>
            <WebsitePreviewTabs code={SWITCH_EXAMPLE_CODE}>
              <div className="w-full">
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <RenderSwitch value="warning">
                    <Match when="success">Todo correcto</Match>
                    <Match when="warning">
                      <div className="space-y-2">
                        <Badge color="warning">Atención</Badge>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Hay pendientes por revisar.
                        </p>
                      </div>
                    </Match>
                    <Default>Estado desconocido</Default>
                  </RenderSwitch>
                </div>
              </div>
            </WebsitePreviewTabs>
          </div>
        </section>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </main>
  );
}
