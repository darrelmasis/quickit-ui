import { Component, useState } from "react";
import {
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  Combobox,
  CommandPalette,
  DataTable,
  DatePicker,
  Drawer,
  Dropdown,
  EmptyState,
  FormControl,
  Input,
  InputGroup,
  Label,
  Link,
  Modal,
  Pagination,
  Progress,
  Range,
  Select,
  Skeleton,
  Stepper,
  Switch,
  Tabs,
  Textarea,
  TimePicker,
  Toaster,
  Tooltip,
  UserChip,
  toast,
} from "@/lib";
import WebsitePreviewTabs from "../components/WebsitePreviewTabs";

const WEBSITE_SHELL = "mx-auto w-full max-w-7xl px-6 lg:px-8";
const EXAMPLE_CARD = "w-full p-0";
const EXAMPLE_SUBCARD =
  "rounded-[1.5rem] border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950";

const EXAMPLES_NAV = [
  {
    title: "Foundation",
    items: [
      { id: "acceso-registro", label: "Acceso y registro" },
      { id: "mensajes-formulario", label: "Mensajes de formulario" },
      { id: "pricing", label: "Pricing" },
    ],
  },
  {
    title: "Product UI",
    items: [
      { id: "barra-trabajo", label: "Barra de trabajo" },
      { id: "identidad-equipo", label: "Identidad y equipo" },
      { id: "overlays-feedback", label: "Overlays y feedback" },
      { id: "drawer-panel", label: "Drawer" },
      { id: "estados-carga", label: "Estados y carga" },
    ],
  },
  {
    title: "Flows",
    items: [
      { id: "progreso-rango", label: "Progreso y rango" },
      { id: "toasts-ejemplo", label: "Notificaciones" },
      { id: "formularios-avanzados", label: "Controles avanzados" },
    ],
  },
  {
    title: "Layout",
    items: [
      { id: "layout-secciones", label: "Layout y secciones" },
      { id: "navegacion-utilidades", label: "Navegacion y utilidades" },
    ],
  },
];

const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$0",
    subtitle: "Para pruebas internas y proyectos pequenos.",
    badge: "Gratis",
    badgeColor: "neutral",
    buttonColor: "neutral",
    buttonVariant: "outline",
    features: ["3 proyectos", "1 workspace", "Soporte comunitario"],
  },
  {
    name: "Growth",
    price: "$29",
    subtitle: "Para equipos que ya operan flujos reales.",
    badge: "Recomendado",
    badgeColor: "brand",
    buttonColor: "brand",
    buttonVariant: "solid",
    features: ["Proyectos ilimitados", "Roles y permisos", "Analitica"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    subtitle: "Seguridad, SSO y soporte guiado.",
    badge: "Ventas",
    badgeColor: "neutral",
    buttonColor: "neutral",
    buttonVariant: "outline",
    features: ["SSO y SAML", "Ambientes dedicados", "SLA 99.9%"],
  },
];

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Ada Lovelace",
    initials: "AL",
    role: "Systems design",
    presence: "online",
    tag: "Core",
    tagColor: "brand",
  },
  {
    id: 2,
    name: "Grace Hopper",
    initials: "GH",
    role: "Platform engineering",
    presence: "away",
    tag: "Web",
    tagColor: "neutral",
  },
  {
    id: 3,
    name: "Margaret Hamilton",
    initials: "MH",
    role: "Release operations",
    presence: "busy",
    tag: "Ops",
    tagColor: "warning",
  },
];

const WORKSPACE_ROWS = [
  {
    id: 1,
    flow: "Onboarding B2B",
    owner: "Ada Lovelace",
    status: "Activo",
    statusColor: "success",
    completion: "82%",
  },
  {
    id: 2,
    flow: "Portal de facturacion",
    owner: "Grace Hopper",
    status: "Pendiente",
    statusColor: "warning",
    completion: "46%",
  },
  {
    id: 3,
    flow: "Centro de ayuda",
    owner: "Margaret Hamilton",
    status: "Bloqueado",
    statusColor: "danger",
    completion: "18%",
  },
];

const WORKSPACE_COLUMNS = [
  {
    key: "flow",
    header: "Flujo",
    sortable: true,
    render: (row) => (
      <div className="whitespace-normal">
        <p className="font-medium text-neutral-950 dark:text-neutral-50">
          {row.flow}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Responsable: {row.owner}
        </p>
      </div>
    ),
  },
  {
    key: "status",
    header: "Estado",
    render: (row) => (
      <Badge color={row.statusColor} variant="soft">
        {row.status}
      </Badge>
    ),
  },
  {
    key: "completion",
    header: "Avance",
    align: "right",
  },
];

const LOGIN_EXAMPLE_CODE = `import {
  Badge,
  Button,
  Checkbox,
  FormControl,
  Input,
  Label,
  Link,
} from "quickit-ui";

export function LoginExample() {
  return (
    <div className="w-full max-w-md rounded-[2rem] border border-neutral-200 bg-white p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-neutral-500">Acceso seguro</p>
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-950">
            Inicia sesion en tu workspace
          </h3>
        </div>
        <Badge color="brand" variant="soft">SSO Ready</Badge>
      </div>

      <div className="mt-8 space-y-5">
        <FormControl required>
          <Label htmlFor="login-email">Correo electronico</Label>
          <Input id="login-email" type="email" placeholder="ada@quickit.dev" />
        </FormControl>

        <FormControl required>
          <div className="mb-2 flex items-center justify-between gap-3">
            <Label htmlFor="login-password">Contrasena</Label>
            <Link href="#" variant="muted" className="text-xs font-medium">
              Recuperar acceso
            </Link>
          </div>
          <Input id="login-password" type="password" placeholder="••••••••" passwordToggle />
        </FormControl>

        <div className="flex items-center justify-between gap-4">
          <Checkbox label="Mantener sesion iniciada" />
          <p className="text-xs text-neutral-500">2FA habilitado</p>
        </div>

        <Button fullWidth color="brand" size="lg">
          Entrar al panel
        </Button>
      </div>
    </div>
  );
}`;

const SIGNUP_EXAMPLE_CODE = `import {
  Badge,
  Button,
  FormControl,
  Input,
  InputGroup,
  Label,
  Select,
  Switch,
  Textarea,
} from "quickit-ui";

export function SignupExample() {
  return (
    <div className="w-full max-w-xl rounded-[2rem] border border-neutral-200 bg-white p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-neutral-500">Onboarding</p>
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-950">
            Crea tu espacio de trabajo
          </h3>
        </div>
        <Switch defaultChecked label="Trial Pro" size="sm" />
      </div>

      <div className="mt-8 space-y-6">
        <FormControl required>
          <Label htmlFor="workspace-name">Nombre del equipo</Label>
          <Input id="workspace-name" placeholder="Lovelace Lab" />
        </FormControl>

        <InputGroup attached>
          <InputGroup.Addon align="inline-start">quickit.app/</InputGroup.Addon>
          <Input placeholder="quickit-studio" />
        </InputGroup>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormControl>
            <Label htmlFor="workspace-team-size">Tamano</Label>
            <Select id="workspace-team-size" defaultValue="6-15">
              <option value="1-5">1 a 5 personas</option>
              <option value="6-15">6 a 15 personas</option>
              <option value="16-50">16 a 50 personas</option>
            </Select>
          </FormControl>

          <FormControl>
            <Label htmlFor="workspace-sector">Vertical</Label>
            <Select id="workspace-sector" defaultValue="saas">
              <option value="saas">SaaS</option>
              <option value="commerce">Commerce</option>
              <option value="agency">Agency</option>
            </Select>
          </FormControl>
        </div>

        <FormControl>
          <Label htmlFor="workspace-notes">Que necesitas lanzar primero</Label>
          <Textarea
            id="workspace-notes"
            rows={4}
            placeholder="Onboarding de clientes, facturacion y portal de soporte."
          />
        </FormControl>

        <div className="flex flex-wrap items-center gap-3">
          <Badge color="neutral" variant="soft">Setup guiado</Badge>
          <Badge color="brand" variant="soft">Importacion CSV</Badge>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" color="neutral">Guardar borrador</Button>
          <Button color="brand">Crear workspace</Button>
        </div>
      </div>
    </div>
  );
}`;

const FORM_MESSAGES_EXAMPLE_CODE = `import {
  Alert,
  Badge,
  Button,
  FormControl,
  Input,
  InputGroup,
  Label,
} from "quickit-ui";

export function FormMessagesExample() {
  return (
    <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
      <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-neutral-500">Verificacion DNS</p>
            <h3 className="text-xl font-semibold tracking-tight text-neutral-950">
              Conecta tu dominio principal
            </h3>
          </div>
          <Badge color="warning" variant="soft">Accion requerida</Badge>
        </div>

        <FormControl invalid required className="mt-6">
          <Label htmlFor="domain-input">Dominio principal</Label>
          <InputGroup attached>
            <InputGroup.Addon align="inline-start">https://</InputGroup.Addon>
            <Input id="domain-input" placeholder="ada.quickit.dev" />
            <InputGroup.Action color="neutral" variant="outline">
              Verificar
            </InputGroup.Action>
          </InputGroup>
          <FormControl.Description>
            Usa el mismo dominio que compartes con clientes.
          </FormControl.Description>
          <FormControl.Message>
            El registro TXT aun no esta visible para la verificacion.
          </FormControl.Message>
        </FormControl>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge color="success" variant="soft">SSL activo</Badge>
          <Badge color="warning" variant="soft">TXT pendiente</Badge>
          <Badge color="neutral" variant="soft">Webhook listo</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <Alert color="warning" variant="outline" dismissible>
          <Alert.Title>La configuracion sigue pendiente</Alert.Title>
          <Alert.Description>
            La propagacion DNS puede tardar unos minutos mas. Puedes guardar y volver mas tarde.
          </Alert.Description>
          <Alert.Actions>
            <Button size="sm" color="warning" variant="outline">Despues</Button>
            <Button size="sm" color="warning">Intentar otra vez</Button>
          </Alert.Actions>
        </Alert>

        <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
          <p className="text-sm font-medium text-neutral-500">Siguiente paso</p>
          <p className="mt-2 text-sm text-neutral-600">
            Anade el registro TXT en tu proveedor DNS y vuelve a comprobar la configuracion.
          </p>
          <Button className="mt-4" size="sm" variant="outline" color="neutral">
            Abrir guia DNS
          </Button>
        </div>
      </div>
    </div>
  );
}`;

const PRICING_EXAMPLE_CODE = `import { Badge, Button } from "quickit-ui";

const tiers = [
  { name: "Starter", price: "$0", badge: "Gratis" },
  { name: "Growth", price: "$29", badge: "Recomendado" },
  { name: "Enterprise", price: "Custom", badge: "Ventas" },
];

export function PricingExample() {
  return (
    <div className="grid w-full gap-6 lg:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className="rounded-[2rem] border border-neutral-200 bg-white p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold">{tier.name}</h3>
            <Badge color={tier.name === "Growth" ? "brand" : "neutral"} variant="soft">
              {tier.badge}
            </Badge>
          </div>

          <p className="mt-6 text-4xl font-semibold tracking-tight text-neutral-950">
            {tier.price}
          </p>

          <ul className="mt-6 space-y-3 text-sm text-neutral-600">
            <li>Proyectos y flujos listos para lanzar</li>
            <li>Controles coherentes con tu design system</li>
            <li>Documentacion mantenible</li>
          </ul>

          <Button
            fullWidth
            className="mt-8"
            color={tier.name === "Growth" ? "brand" : "neutral"}
            variant={tier.name === "Growth" ? "solid" : "outline"}
          >
            {tier.name === "Enterprise" ? "Hablar con ventas" : "Empezar"}
          </Button>
        </div>
      ))}
    </div>
  );
}`;

const TOOLBAR_EXAMPLE_CODE = `import {
  Badge,
  Breadcrumb,
  Button,
  Combobox,
  DataTable,
  Dropdown,
  Input,
  InputGroup,
  Tooltip,
} from "quickit-ui";

const columns = [
  { key: "flow", header: "Flujo" },
  { key: "status", header: "Estado" },
  { key: "completion", header: "Avance", align: "right" },
];

const data = [
  { id: 1, flow: "Onboarding B2B", status: "Activo", completion: "82%" },
  { id: 2, flow: "Portal de facturacion", status: "Pendiente", completion: "46%" },
];

export function ToolbarExample() {
  return (
    <div className="w-full rounded-[2rem] border border-neutral-200 bg-white p-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Breadcrumb>
              <Breadcrumb.List>
                <Breadcrumb.Item href="#">Workspace</Breadcrumb.Item>
                <Breadcrumb.Item current>Automation hub</Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-semibold tracking-tight text-neutral-950">
                Flujos operativos
              </h3>
              <Badge color="brand" variant="soft">12 activos</Badge>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Tooltip content="Crea un flujo desde una plantilla probada">
              <Button variant="outline" color="neutral">Plantillas</Button>
            </Tooltip>
            <Dropdown>
              <Dropdown.Trigger asChild>
                <Button color="brand">Nuevo flujo</Button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Item>Nuevo onboarding</Dropdown.Item>
                <Dropdown.Item>Nuevo portal</Dropdown.Item>
                <Dropdown.Separator />
                <Dropdown.Item variant="danger">Vaciar borradores</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <InputGroup attached>
            <InputGroup.Addon align="inline-start">Buscar</InputGroup.Addon>
            <Input placeholder="Onboarding, facturacion, soporte..." />
          </InputGroup>
          <Combobox
            placeholder="Responsable"
            options={[
              { value: "al", label: "Ada Lovelace" },
              { value: "gh", label: "Grace Hopper" },
              { value: "mh", label: "Margaret Hamilton" },
            ]}
          />
        </div>

        <DataTable color="neutral" columns={columns} data={data} />
      </div>
    </div>
  );
}`;

const TEAM_EXAMPLE_CODE = `import { Avatar, Badge, Button } from "quickit-ui";

const members = [
  { id: 1, name: "Ada Lovelace", role: "Systems design", initials: "AL", presence: "online" },
  { id: 2, name: "Grace Hopper", role: "Platform engineering", initials: "GH", presence: "away" },
  { id: 3, name: "Margaret Hamilton", role: "Release operations", initials: "MH", presence: "busy" },
];

export function TeamExample() {
  return (
    <div className="w-full rounded-[2rem] border border-neutral-200 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-neutral-500">Equipo principal</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">
            Colaboracion diaria
          </h3>
        </div>
        <AvatarGroup stacked>
          <Avatar><Avatar.Fallback>ER</Avatar.Fallback></Avatar>
          <Avatar><Avatar.Fallback>MS</Avatar.Fallback></Avatar>
          <Avatar><Avatar.Fallback>PV</Avatar.Fallback></Avatar>
        </AvatarGroup>
      </div>

      <div className="mt-8 space-y-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="rounded-[1.5rem] border border-neutral-200 bg-white p-4"
          >
            <UserChip
              name={member.name}
              description={member.role}
              initials={member.initials}
              presence={member.presence}
              trailing={<Badge size="sm" variant="soft">Core</Badge>}
            />
          </div>
        ))}
      </div>

      <Button className="mt-6" fullWidth variant="outline" color="neutral">
        Invitar colaborador
      </Button>
    </div>
  );
}`;

const PRESENCE_EXAMPLE_CODE = `import { Alert, Avatar, Badge, Tabs } from "quickit-ui";

export function PresenceExample() {
  return (
    <div className="w-full rounded-[2rem] border border-neutral-200 bg-white p-6">
      <Tabs defaultValue="support" color="brand">
        <Tabs.List>
          <Tabs.Trigger value="support">Soporte</Tabs.Trigger>
          <Tabs.Trigger value="ops">Ops</Tabs.Trigger>
          <Tabs.Trigger value="success">Success</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="support" className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-[1.5rem] border border-neutral-200 bg-white p-4">
            <UserChip
              name="Margaret Hamilton"
              description="Cubriendo conversaciones prioritarias"
              initials="MH"
              presence="online"
              trailing={<Badge color="success" variant="soft">Disponible</Badge>}
            />
          </div>

          <Alert color="info">
            <Alert.Title>Tiempo de respuesta saludable</Alert.Title>
            <Alert.Description>
              El equipo esta respondiendo en 6 minutos promedio.
            </Alert.Description>
          </Alert>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}`;

const OVERLAYS_EXAMPLE_CODE = `import { Button, CommandPalette, Dropdown, Modal } from "quickit-ui";
import { useState } from "react";

const groups = [
  {
    heading: "General",
    items: [
      { id: "dashboard", label: "Ir al dashboard" },
      { id: "billing", label: "Abrir facturacion" },
      { id: "support", label: "Ver conversaciones" },
    ],
  },
];

export function OverlaysExample() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div className="grid w-full gap-6 lg:grid-cols-3">
      <div className="rounded-[2rem] border border-neutral-200 bg-white p-6">
        <p className="text-sm font-medium text-neutral-500">Paleta de comandos</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950">
          Atajos para flujos densos
        </h3>
        <Button className="mt-6" color="brand" onClick={() => setPaletteOpen(true)}>
          Abrir paleta
        </Button>
        <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} groups={groups} />
      </div>

      <div className="rounded-[2rem] border border-neutral-200 bg-white p-6">
        <p className="text-sm font-medium text-neutral-500">Acciones rapidas</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950">
          Menus compactos
        </h3>
        <Dropdown>
          <Dropdown.Trigger asChild>
            <Button className="mt-6" variant="outline" color="neutral">
              Abrir acciones
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Duplicar vista</Dropdown.Item>
            <Dropdown.Item>Compartir con equipo</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item variant="danger">Eliminar</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </div>

      <div className="rounded-[2rem] border border-neutral-200 bg-white p-6">
        <p className="text-sm font-medium text-neutral-500">Confirmacion</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950">
          Decisiones con contexto
        </h3>
        <Modal>
          <Modal.Trigger>Eliminar workspace</Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Eliminar workspace</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Esta accion elimina accesos, automatizaciones y reportes compartidos.
            </Modal.Body>
            <Modal.Actions>
              <Modal.Action variant="outline">Cancelar</Modal.Action>
              <Modal.Action color="danger">Eliminar</Modal.Action>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
}`;

const DRAWER_EXAMPLE_CODE = `import { Badge, Button, Drawer } from "quickit-ui";

export function DrawerExample() {
  return (
    <Drawer placement="right">
      <Drawer.Trigger asChild>
        <Button color="brand">Ver panel lateral</Button>
      </Drawer.Trigger>

      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Resumen del proyecto</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          <div className="space-y-5">
            <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-neutral-500">Lanzamiento</p>
                  <p className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">
                    Portal de clientes
                  </p>
                </div>
                <Badge color="success" variant="soft">En curso</Badge>
              </div>
            </div>
          </div>
        </Drawer.Body>

        <Drawer.Actions>
          <Drawer.Action variant="outline">Cerrar</Drawer.Action>
          <Drawer.Action color="brand">Guardar cambios</Drawer.Action>
        </Drawer.Actions>
      </Drawer.Content>
    </Drawer>
  );
}`;

const EMPTY_STATE_EXAMPLE_CODE = `import { Button, EmptyState } from "quickit-ui";

export function EmptyStateExample() {
  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-white p-6">
      <EmptyState align="center">
        <EmptyState.Title>No hay flujos creados</EmptyState.Title>
        <EmptyState.Description>
          Empieza con una plantilla de onboarding, facturacion o soporte.
        </EmptyState.Description>
        <EmptyState.Actions>
          <Button size="sm" variant="outline" color="neutral">Explorar plantillas</Button>
          <Button size="sm" color="brand">Crear flujo</Button>
        </EmptyState.Actions>
      </EmptyState>
    </div>
  );
}`;

const SKELETON_EXAMPLE_CODE = `import { Skeleton } from "quickit-ui";

export function SkeletonExample() {
  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-white p-6">
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <Skeleton shape="circle" className="size-12" />
          <div className="flex-1 space-y-2">
            <Skeleton shape="line" className="h-4 w-2/3" />
            <Skeleton shape="line" className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton shape="rect" className="h-32 w-full rounded-2xl" />
        <div className="grid gap-3 sm:grid-cols-3">
          <Skeleton shape="rect" className="h-20 rounded-2xl" />
          <Skeleton shape="rect" className="h-20 rounded-2xl" />
          <Skeleton shape="rect" className="h-20 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}`;

const PROGRESS_RANGE_EXAMPLE_CODE = `import { Badge, Progress, Range, Stepper } from "quickit-ui";
import { useState } from "react";

export function ProgressRangeExample() {
  const [coverage, setCoverage] = useState(72);
  const handleCoverageChange = (nextValue) => {
    if (typeof nextValue === "number") {
      setCoverage(nextValue);
    }
  };

  return (
    <div className="w-full rounded-[2rem] border border-neutral-200 bg-white p-6">
      <Stepper
        activeStep={1}
        steps={[
          { title: "Cuenta", description: "Datos base" },
          { title: "Automatizacion", description: "Reglas y canales" },
          { title: "Revision", description: "Checklist final" },
        ]}
      />

      <div className="mt-8 space-y-6">
        <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-neutral-500">Cobertura del onboarding</p>
            <Badge color="brand" variant="soft">{coverage}%</Badge>
          </div>
          <Progress className="mt-4" color="brand" value={coverage} />
          <Range
            className="mt-5"
            min={0}
            max={100}
            step={5}
            value={coverage}
            onValueChange={handleCoverageChange}
            color="brand"
            showValueTooltip
          />
        </div>
      </div>
    </div>
  );
}`;

const TOAST_EXAMPLE_CODE = `import { Button, Toaster, toast } from "quickit-ui";

export function ToastExample() {
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          color="success"
          onClick={() =>
            toast({
              title: "Cambios guardados",
              description: "La configuracion ya esta activa.",
              kind: "success",
            })
          }
        >
          Success
        </Button>

        <Button
          color="neutral"
          variant="outline"
          onClick={() =>
            toast({
              title: "Procesando importacion",
              description: "Subimos 48 registros.",
              kind: "loading",
              duration: 0,
            })
          }
        >
          Loading
        </Button>

        <Button
          color="danger"
          variant="outline"
          onClick={() =>
            toast({
              title: "No se pudo completar",
              description: "Revisa tu conexion e intentalo de nuevo.",
              kind: "error",
            })
          }
        >
          Error
        </Button>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}`;

const ADVANCED_CONTROLS_CODE = `import {
  Badge,
  Button,
  Checkbox,
  Combobox,
  DatePicker,
  FormControl,
  Label,
  Select,
  Textarea,
  TimePicker,
} from "quickit-ui";

export function AdvancedControlsExample() {
  return (
    <div className="w-full rounded-[2rem] border border-neutral-200 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-neutral-500">Programacion</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">
            Agenda una ventana de lanzamiento
          </h3>
        </div>
        <Badge color="brand" variant="soft">Release</Badge>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <FormControl>
          <Label>Fecha</Label>
          <DatePicker placeholder="Selecciona fecha" />
        </FormControl>

        <FormControl>
          <Label>Hora</Label>
          <TimePicker placeholder="Selecciona hora" minuteStep={15} />
        </FormControl>

        <FormControl>
          <Label>Canal principal</Label>
          <Select defaultValue="email">
            <option value="email">Email</option>
            <option value="chat">In-app chat</option>
            <option value="webhook">Webhook</option>
          </Select>
        </FormControl>

        <FormControl>
          <Label>Responsable</Label>
          <Combobox
            placeholder="Buscar owner"
            options={[
              { value: "al", label: "Ada Lovelace" },
              { value: "gh", label: "Grace Hopper" },
              { value: "mh", label: "Margaret Hamilton" },
            ]}
          />
        </FormControl>
      </div>

      <FormControl className="mt-4">
        <Label>Notas</Label>
        <Textarea rows={4} placeholder="Comparte alcance, riesgos y criterio de salida." />
      </FormControl>

      <div className="mt-5 flex items-center justify-between gap-4">
        <Checkbox label="Notificar al equipo cuando cambie la hora" />
        <Button color="brand">Programar lanzamiento</Button>
      </div>
    </div>
  );
}`;

const HEADER_EXAMPLE_CODE = `import { Badge, Button, Tabs } from "quickit-ui";

export function HeaderExample() {
  return (
    <div className="w-full rounded-[2rem] border border-neutral-200 bg-white p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <Badge color="brand" variant="soft">Nuevo release</Badge>
          <div className="space-y-3">
            <h3 className="text-3xl font-semibold tracking-tight text-neutral-950">
              Quickit UI para paneles que se sienten listos para producir
            </h3>
            <p className="max-w-2xl text-sm text-neutral-600">
              Combina formularios, overlays, tablas y layout con un lenguaje consistente.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" color="neutral">Ver changelog</Button>
          <Button color="brand">Instalar ahora</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-8">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="components">Componentes</Tabs.Trigger>
          <Tabs.Trigger value="guides">Guias</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview" className="pt-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
              <p className="text-sm font-medium text-neutral-500">Release estable</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">1.0.0</p>
            </div>
            <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
              <p className="text-sm font-medium text-neutral-500">Cobertura visual</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">Docs unificadas</p>
            </div>
            <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
              <p className="text-sm font-medium text-neutral-500">Tiempo de setup</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">Minutos</p>
            </div>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}`;

const FOOTER_EXAMPLE_CODE = `import { Badge, Link } from "quickit-ui";

export function FooterExample() {
  return (
    <div className="w-full rounded-[2rem] border border-neutral-200 bg-white p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))]">
        <div className="space-y-4">
          <Badge color="neutral" variant="soft">Quickit UI</Badge>
          <p className="max-w-sm text-sm text-neutral-600">
            Componentes para apps internas, portales de clientes y documentacion consistente.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-neutral-950">Producto</p>
          <Link href="#" variant="muted">Componentes</Link>
          <Link href="#" variant="muted">Hooks</Link>
          <Link href="#" variant="muted">Ejemplos</Link>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-neutral-950">Recursos</p>
          <Link href="#" variant="muted">Changelog</Link>
          <Link href="#" variant="muted">Migracion</Link>
          <Link href="#" variant="muted">GitHub</Link>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-neutral-950">Soporte</p>
          <Link href="#" variant="muted">Documentacion</Link>
          <Link href="#" variant="muted">Issues</Link>
          <Link href="#" variant="muted">Contacto</Link>
        </div>
      </div>
    </div>
  );
}`;

const NAVIGATION_EXAMPLE_CODE = `import { Accordion, Breadcrumb, Pagination } from "quickit-ui";
import { useState } from "react";

export function NavigationExample() {
  const [page, setPage] = useState(4);

  return (
    <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="rounded-[2rem] border border-neutral-200 bg-white p-6">
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item href="#">Workspace</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Billing</Breadcrumb.Item>
            <Breadcrumb.Item current>Historial</Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>

        <Accordion type="single" collapsible className="mt-6">
          <Accordion.Item value="faq-1">
            <Accordion.Trigger>Como conecto mi dominio?</Accordion.Trigger>
            <Accordion.Content>
              Anade el registro TXT, verifica la propagacion y vuelve a comprobar desde configuracion.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="faq-2">
            <Accordion.Trigger>Que incluye el plan Growth?</Accordion.Trigger>
            <Accordion.Content>
              Roles, permisos, analitica y soporte prioritario para equipos en produccion.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="rounded-[2rem] border border-neutral-200 bg-white p-6">
        <p className="text-sm font-medium text-neutral-500">Listado paginado</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
          Cuentas verificadas
        </p>
        <p className="mt-2 text-sm text-neutral-500">Pagina actual: {page}</p>
        <div className="mt-8">
          <Pagination count={12} page={page} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}`;

function LoginPreviewCanvas() {
  return (
    <div className="w-full max-w-md">
      <div className={EXAMPLE_CARD}>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-neutral-500">Acceso seguro</p>
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
              Inicia sesion en tu workspace
            </h3>
          </div>
          <Badge color="brand" variant="soft">
            SSO Ready
          </Badge>
        </div>

        <div className="mt-8 space-y-5">
          <FormControl required>
            <Label htmlFor="login-email-preview">Correo electronico</Label>
            <Input
              id="login-email-preview"
              type="email"
              placeholder="ada@quickit.dev"
            />
          </FormControl>

          <FormControl required>
            <div className="mb-2 flex items-center justify-between gap-3">
              <Label htmlFor="login-password-preview">Contrasena</Label>
              <Link href="#" variant="muted" className="text-xs font-medium">
                Recuperar acceso
              </Link>
            </div>
            <Input
              id="login-password-preview"
              type="password"
              placeholder="••••••••"
              passwordToggle
            />
          </FormControl>

          <div className="flex items-center justify-between gap-4">
            <Checkbox label="Mantener sesion iniciada" />
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              2FA habilitado
            </p>
          </div>

          <Button fullWidth color="brand" size="lg">
            Entrar al panel
          </Button>
        </div>
      </div>
    </div>
  );
}

function SignupPreviewCanvas() {
  return (
    <div className="w-full max-w-xl">
      <div className={EXAMPLE_CARD}>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-neutral-500">Onboarding</p>
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
              Crea tu espacio de trabajo
            </h3>
          </div>
          <Switch defaultChecked label="Trial Pro" size="sm" />
        </div>

        <div className="mt-8 space-y-6">
          <FormControl required>
            <Label htmlFor="workspace-name-preview">Nombre del equipo</Label>
            <Input
              id="workspace-name-preview"
              placeholder="Lovelace Lab"
            />
          </FormControl>

          <InputGroup attached>
            <InputGroup.Addon align="inline-start">
              quickit.app/
            </InputGroup.Addon>
            <Input placeholder="quickit-studio" />
          </InputGroup>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormControl>
              <Label htmlFor="workspace-size-preview">Tamano</Label>
              <Select id="workspace-size-preview" defaultValue="6-15">
                <option value="1-5">1 a 5 personas</option>
                <option value="6-15">6 a 15 personas</option>
                <option value="16-50">16 a 50 personas</option>
              </Select>
            </FormControl>

            <FormControl>
              <Label htmlFor="workspace-sector-preview">Vertical</Label>
              <Select id="workspace-sector-preview" defaultValue="saas">
                <option value="saas">SaaS</option>
                <option value="commerce">Commerce</option>
                <option value="agency">Agency</option>
              </Select>
            </FormControl>
          </div>

          <FormControl>
            <Label htmlFor="workspace-notes-preview">
              Que necesitas lanzar primero
            </Label>
            <Textarea
              id="workspace-notes-preview"
              rows={4}
              placeholder="Onboarding de clientes, facturacion y portal de soporte."
            />
          </FormControl>

          <div className="flex flex-wrap items-center gap-3">
            <Badge color="neutral" variant="soft">
              Setup guiado
            </Badge>
            <Badge color="brand" variant="soft">
              Importacion CSV
            </Badge>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" color="neutral">
              Guardar borrador
            </Button>
            <Button color="brand">Crear workspace</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormMessagesPreviewCanvas() {
  return (
    <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
      <div className={EXAMPLE_SUBCARD}>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-neutral-500">
              Verificacion DNS
            </p>
            <h3 className="text-xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
              Conecta tu dominio principal
            </h3>
          </div>
          <Badge color="warning" variant="soft">
            Accion requerida
          </Badge>
        </div>

        <FormControl invalid required className="mt-6">
          <Label htmlFor="domain-input-preview">Dominio principal</Label>
          <InputGroup attached>
            <InputGroup.Addon align="inline-start">https://</InputGroup.Addon>
            <Input id="domain-input-preview" placeholder="ada.quickit.dev" />
            <InputGroup.Action color="neutral" variant="outline">
              Verificar
            </InputGroup.Action>
          </InputGroup>
          <FormControl.Description>
            Usa el mismo dominio que compartes con clientes.
          </FormControl.Description>
          <FormControl.Message>
            El registro TXT aun no esta visible para la verificacion.
          </FormControl.Message>
        </FormControl>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge color="success" variant="soft">
            SSL activo
          </Badge>
          <Badge color="warning" variant="soft">
            TXT pendiente
          </Badge>
          <Badge color="neutral" variant="soft">
            Webhook listo
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <Alert color="warning" variant="outline" dismissible>
          <Alert.Title>La configuracion sigue pendiente</Alert.Title>
          <Alert.Description>
            La propagacion DNS puede tardar unos minutos mas. Puedes guardar y
            volver mas tarde.
          </Alert.Description>
          <Alert.Actions>
            <Button size="sm" color="warning" variant="outline">
              Despues
            </Button>
            <Button size="sm" color="warning">
              Intentar otra vez
            </Button>
          </Alert.Actions>
        </Alert>

        <div className={EXAMPLE_SUBCARD}>
          <p className="text-sm font-medium text-neutral-500">Siguiente paso</p>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Anade el registro TXT en tu proveedor DNS y vuelve a comprobar la
            configuracion.
          </p>
          <Button className="mt-4" size="sm" variant="outline" color="neutral">
            Abrir guia DNS
          </Button>
        </div>
      </div>
    </div>
  );
}

function PricingPreviewCanvas() {
  return (
    <div className="grid w-full gap-6 lg:grid-cols-3">
      {PRICING_TIERS.map((tier) => (
        <div key={tier.name} className={EXAMPLE_CARD}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
              {tier.name}
            </h3>
            <Badge color={tier.badgeColor} variant="soft">
              {tier.badge}
            </Badge>
          </div>

          <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
            {tier.subtitle}
          </p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
            {tier.price}
          </p>

          <div className="mt-6 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
            {tier.features.map((feature) => (
              <p key={feature}>{feature}</p>
            ))}
          </div>

          <Button
            fullWidth
            className="mt-8"
            color={tier.buttonColor}
            variant={tier.buttonVariant}
          >
            {tier.name === "Enterprise" ? "Hablar con ventas" : "Empezar"}
          </Button>
        </div>
      ))}
    </div>
  );
}

function ToolbarPreviewCanvas() {
  return (
    <div className="w-full">
      <div className={EXAMPLE_CARD}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <Breadcrumb>
                <Breadcrumb.List>
                  <Breadcrumb.Item href="#">Workspace</Breadcrumb.Item>
                  <Breadcrumb.Item current>Automation hub</Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
                  Flujos operativos
                </h3>
                <Badge color="brand" variant="soft">
                  12 activos
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Tooltip content="Crea un flujo desde una plantilla probada">
                <Button variant="outline" color="neutral">
                  Plantillas
                </Button>
              </Tooltip>
              <Dropdown>
                <Dropdown.Trigger asChild>
                  <Button color="brand">Nuevo flujo</Button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Item>Nuevo onboarding</Dropdown.Item>
                  <Dropdown.Item>Nuevo portal</Dropdown.Item>
                  <Dropdown.Separator />
                  <Dropdown.Item variant="danger">
                    Vaciar borradores
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <InputGroup attached>
              <InputGroup.Addon align="inline-start">Buscar</InputGroup.Addon>
              <Input placeholder="Onboarding, facturacion, soporte..." />
            </InputGroup>
            <Combobox
              placeholder="Responsable"
              options={[
                { value: "al", label: "Ada Lovelace" },
                { value: "gh", label: "Grace Hopper" },
                { value: "mh", label: "Margaret Hamilton" },
              ]}
            />
          </div>

          <DataTable
            color="neutral"
            columns={WORKSPACE_COLUMNS}
            data={WORKSPACE_ROWS}
          />
        </div>
      </div>
    </div>
  );
}

function TeamPreviewCanvas() {
  return (
    <div className="w-full">
      <div className={EXAMPLE_CARD}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-neutral-500">
              Equipo principal
            </p>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
              Colaboracion diaria
            </h3>
          </div>
          <AvatarGroup stacked>
            <Avatar>
              <Avatar.Fallback>ER</Avatar.Fallback>
            </Avatar>
            <Avatar>
              <Avatar.Fallback>MS</Avatar.Fallback>
            </Avatar>
            <Avatar>
              <Avatar.Fallback>PV</Avatar.Fallback>
            </Avatar>
          </AvatarGroup>
        </div>

        <div className="mt-8 space-y-3">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className={EXAMPLE_SUBCARD}>
              <UserChip
                name={member.name}
                description={member.role}
                initials={member.initials}
                presence={member.presence}
                trailing={
                  <Badge color={member.tagColor} size="sm" variant="soft">
                    {member.tag}
                  </Badge>
                }
              />
            </div>
          ))}
        </div>

        <Button className="mt-6" fullWidth variant="outline" color="neutral">
          Invitar colaborador
        </Button>
      </div>
    </div>
  );
}

function PresencePreviewCanvas() {
  const [activeTeam, setActiveTeam] = useState("support");

  return (
    <div className="w-full">
      <div className={EXAMPLE_CARD}>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            color={activeTeam === "support" ? "brand" : "neutral"}
            variant={activeTeam === "support" ? "solid" : "outline"}
            onClick={() => setActiveTeam("support")}
          >
            Soporte
          </Button>
          <Button
            size="sm"
            color={activeTeam === "ops" ? "brand" : "neutral"}
            variant={activeTeam === "ops" ? "solid" : "outline"}
            onClick={() => setActiveTeam("ops")}
          >
            Ops
          </Button>
          <Button
            size="sm"
            color={activeTeam === "success" ? "brand" : "neutral"}
            variant={activeTeam === "success" ? "solid" : "outline"}
            onClick={() => setActiveTeam("success")}
          >
            Success
          </Button>
        </div>

        <div className="pt-6">
          {activeTeam === "support" ? (
            <div className="space-y-4">
              <div className={EXAMPLE_SUBCARD}>
                <UserChip
                  name="Margaret Hamilton"
                  description="Cubriendo conversaciones prioritarias"
                  initials="MH"
                  presence="online"
                  trailing={
                    <Badge color="success" variant="soft">
                      Disponible
                    </Badge>
                  }
                />
              </div>

              <Alert
                color="info"
                title="Tiempo de respuesta saludable"
                description="El equipo esta respondiendo en 6 minutos promedio."
              />
            </div>
          ) : null}

          {activeTeam === "ops" ? (
            <div className="grid gap-3">
              <div className={EXAMPLE_SUBCARD}>
                <UserChip
                  name="Grace Hopper"
                  description="Integraciones y deploy"
                  initials="GH"
                  presence="away"
                  trailing={
                    <Badge color="warning" variant="soft">
                      En revision
                    </Badge>
                  }
                />
              </div>
            </div>
          ) : null}

          {activeTeam === "success" ? (
            <div className={EXAMPLE_SUBCARD}>
              <UserChip
                name="Ada Lovelace"
                description="Plantillas y onboarding"
                initials="AL"
                presence="online"
                trailing={
                  <Badge color="brand" variant="soft">
                    Responsable
                  </Badge>
                }
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function OverlaysPreviewCanvas() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div className="grid w-full gap-6 lg:grid-cols-3">
      <div className={EXAMPLE_CARD}>
        <p className="text-sm font-medium text-neutral-500">Paleta de comandos</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          Atajos para flujos densos
        </h3>
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          Ideal para docs, paneles internos y apps con mucha navegacion.
        </p>
        <Button className="mt-6" color="brand" onClick={() => setPaletteOpen(true)}>
          Abrir paleta
        </Button>
        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          groups={[
            {
              heading: "General",
              items: [
                { id: "dashboard", label: "Ir al dashboard" },
                { id: "billing", label: "Abrir facturacion" },
                { id: "support", label: "Ver conversaciones" },
              ],
            },
          ]}
        />
      </div>

      <div className={EXAMPLE_CARD}>
        <p className="text-sm font-medium text-neutral-500">Acciones rapidas</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          Menus compactos
        </h3>
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          Usa dropdowns para acciones secundarias y mantener foco visual.
        </p>
        <Dropdown>
          <Dropdown.Trigger asChild>
            <Button className="mt-6" variant="outline" color="neutral">
              Abrir acciones
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Duplicar vista</Dropdown.Item>
            <Dropdown.Item>Compartir con equipo</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item variant="danger">Eliminar</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </div>

      <div className={EXAMPLE_CARD}>
        <p className="text-sm font-medium text-neutral-500">Confirmacion</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          Decisiones con contexto
        </h3>
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          Los modales deben ser claros, breves y accionables.
        </p>
        <div className="mt-6">
          <Modal>
            <Modal.Trigger>Eliminar workspace</Modal.Trigger>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Eliminar workspace</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Esta accion elimina accesos, automatizaciones y reportes
                compartidos.
              </Modal.Body>
              <Modal.Actions>
                <Modal.Action variant="outline">Cancelar</Modal.Action>
                <Modal.Action color="danger">Eliminar</Modal.Action>
              </Modal.Actions>
            </Modal.Content>
          </Modal>
        </div>
      </div>
    </div>
  );
}

function DrawerPreviewCanvas() {
  return (
    <div className="flex w-full justify-center">
      <Drawer placement="right">
        <Drawer.Trigger asChild>
          <Button color="brand">Ver panel lateral</Button>
        </Drawer.Trigger>

        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Resumen del proyecto</Drawer.Title>
          </Drawer.Header>

          <Drawer.Body>
            <div className="space-y-5">
              <div className={EXAMPLE_SUBCARD}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">
                      Lanzamiento
                    </p>
                    <p className="mt-1 text-xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
                      Portal de clientes
                    </p>
                  </div>
                  <Badge color="success" variant="soft">
                    En curso
                  </Badge>
                </div>
              </div>

              <div className={EXAMPLE_SUBCARD}>
                <p className="text-sm font-medium text-neutral-500">
                  Siguientes pasos
                </p>
                <div className="mt-4 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <p>1. Revisar textos transaccionales</p>
                  <p>2. Validar webhook de billing</p>
                  <p>3. Programar comunicacion final</p>
                </div>
              </div>
            </div>
          </Drawer.Body>

          <Drawer.Actions>
            <Drawer.Action variant="outline">Cerrar</Drawer.Action>
            <Drawer.Action color="brand">Guardar cambios</Drawer.Action>
          </Drawer.Actions>
        </Drawer.Content>
      </Drawer>
    </div>
  );
}

function EmptyStateCard() {
  return (
    <div className="w-full p-4">
      <div className={EXAMPLE_CARD}>
        <EmptyState align="center">
          <EmptyState.Title>No hay flujos creados</EmptyState.Title>
          <EmptyState.Description>
            Empieza con una plantilla de onboarding, facturacion o soporte.
          </EmptyState.Description>
          <EmptyState.Actions>
            <Button size="sm" variant="outline" color="neutral">
              Explorar plantillas
            </Button>
            <Button size="sm" color="brand">
              Crear flujo
            </Button>
          </EmptyState.Actions>
        </EmptyState>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="w-full p-4">
      <div className={EXAMPLE_CARD}>
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <Skeleton shape="circle" className="size-12" />
            <div className="flex-1 space-y-2">
              <Skeleton shape="line" className="h-4 w-2/3" />
              <Skeleton shape="line" className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton shape="rect" className="h-32 w-full rounded-2xl" />
          <div className="grid gap-3 sm:grid-cols-3">
            <Skeleton shape="rect" className="h-20 rounded-2xl" />
            <Skeleton shape="rect" className="h-20 rounded-2xl" />
            <Skeleton shape="rect" className="h-20 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressPreviewCanvas() {
  const [coverage, setCoverage] = useState(72);
  const handleCoverageChange = (nextValue) => {
    if (typeof nextValue === "number") {
      setCoverage(nextValue);
    }
  };

  return (
    <div className="w-full">
      <div className={EXAMPLE_CARD}>
        <Stepper
          activeStep={1}
          steps={[
            { title: "Cuenta", description: "Datos base" },
            { title: "Automatizacion", description: "Reglas y canales" },
            { title: "Revision", description: "Checklist final" },
          ]}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-6">
            <div className={EXAMPLE_SUBCARD}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-neutral-500">
                  Cobertura del onboarding
                </p>
                <Badge color="brand" variant="soft">
                  {coverage}%
                </Badge>
              </div>
              <Progress className="mt-4" color="brand" value={coverage} />
              <Range
                className="mt-5"
                min={0}
                max={100}
                step={5}
                value={coverage}
                onValueChange={handleCoverageChange}
                color="brand"
                showValueTooltip
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className={EXAMPLE_SUBCARD}>
                <p className="text-sm font-medium text-neutral-500">
                  Correos listos
                </p>
                <Progress className="mt-4" color="success" value={88} />
              </div>
              <div className={EXAMPLE_SUBCARD}>
                <p className="text-sm font-medium text-neutral-500">
                  Webhooks validados
                </p>
                <Progress className="mt-4" color="warning" value={54} />
              </div>
            </div>
          </div>

          <div className={EXAMPLE_SUBCARD}>
            <p className="text-sm font-medium text-neutral-500">
              Estado actual
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
              {coverage}%
            </p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Ajusta el slider para simular como se siente el avance dentro del
              flujo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToastPreviewCanvas() {
  return (
    <div className="flex w-full max-w-3xl flex-wrap justify-center gap-3">
      <Button
        color="success"
        onClick={() =>
          toast({
            title: "Cambios guardados",
            description: "La configuracion ya esta activa.",
            kind: "success",
          })
        }
      >
        Success
      </Button>

      <Button
        color="neutral"
        variant="outline"
        onClick={() =>
          toast({
            title: "Procesando importacion",
            description: "Subimos 48 registros.",
            kind: "loading",
            duration: 0,
          })
        }
      >
        Loading
      </Button>

      <Button
        color="danger"
        variant="outline"
        onClick={() =>
          toast({
            title: "No se pudo completar",
            description: "Revisa tu conexion e intentalo de nuevo.",
            kind: "error",
          })
        }
      >
        Error
      </Button>

      <Button
        color="brand"
        variant="outline"
        onClick={() =>
          toast({
            title: "Invitacion enviada",
            description: "El enlace ya esta listo para compartir.",
            action: { label: "Copiar", onClick: () => {} },
          })
        }
      >
        Con accion
      </Button>
    </div>
  );
}

function AdvancedControlsPreviewCanvas() {
  const [owner, setOwner] = useState("gh");

  return (
    <div className="w-full">
      <div className={EXAMPLE_CARD}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-neutral-500">Programacion</p>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
              Agenda una ventana de lanzamiento
            </h3>
          </div>
          <Badge color="brand" variant="soft">
            Release
          </Badge>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <FormControl>
            <Label>Fecha</Label>
            <DatePicker placeholder="Selecciona fecha" />
          </FormControl>

          <FormControl>
            <Label>Hora</Label>
            <TimePicker placeholder="Selecciona hora" minuteStep={15} />
          </FormControl>

          <FormControl>
            <Label>Canal principal</Label>
            <Select defaultValue="email">
              <option value="email">Email</option>
              <option value="chat">In-app chat</option>
              <option value="webhook">Webhook</option>
            </Select>
          </FormControl>

          <FormControl>
            <Label>Responsable</Label>
            <Combobox
              value={owner}
              onValueChange={setOwner}
              placeholder="Buscar owner"
              options={[
                { value: "al", label: "Ada Lovelace" },
                { value: "gh", label: "Grace Hopper" },
                { value: "mh", label: "Margaret Hamilton" },
              ]}
            />
          </FormControl>
        </div>

        <FormControl className="mt-4">
          <Label htmlFor="release-notes-preview">Notas</Label>
          <Textarea
            id="release-notes-preview"
            rows={4}
            placeholder="Comparte alcance, riesgos y criterio de salida."
          />
        </FormControl>

        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Checkbox label="Notificar al equipo cuando cambie la hora" />
          <Button color="brand">Programar lanzamiento</Button>
        </div>
      </div>
    </div>
  );
}

function HeaderPreviewCanvas() {
  return (
    <div className="w-full">
      <div className={EXAMPLE_CARD}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Badge color="brand" variant="soft">
              Nuevo release
            </Badge>
            <div className="space-y-3">
              <h3 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
                Quickit UI para paneles que se sienten listos para producir
              </h3>
              <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
                Combina formularios, overlays, tablas y layout con un lenguaje
                consistente.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" color="neutral">
              Ver changelog
            </Button>
            <Button color="brand">Instalar ahora</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mt-8">
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="components">Componentes</Tabs.Trigger>
            <Tabs.Trigger value="guides">Guias</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview" className="pt-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className={EXAMPLE_SUBCARD}>
                <p className="text-sm font-medium text-neutral-500">
                  Release estable
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
                  1.0.0
                </p>
              </div>
              <div className={EXAMPLE_SUBCARD}>
                <p className="text-sm font-medium text-neutral-500">
                  Cobertura visual
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
                  Docs unificadas
                </p>
              </div>
              <div className={EXAMPLE_SUBCARD}>
                <p className="text-sm font-medium text-neutral-500">
                  Tiempo de setup
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
                  Minutos
                </p>
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content value="components" className="pt-6">
            <div className={EXAMPLE_SUBCARD}>
              Formularios, overlays, tablas, navegacion y hooks para acelerar
              producto.
            </div>
          </Tabs.Content>
          <Tabs.Content value="guides" className="pt-6">
            <div className={EXAMPLE_SUBCARD}>
              Incluye instalacion, migracion y ejemplos de composicion real.
            </div>
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  );
}

function FooterPreviewCanvas() {
  return (
    <div className="w-full">
      <div className={EXAMPLE_CARD}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))]">
          <div className="space-y-4">
            <Badge color="neutral" variant="soft">
              Quickit UI
            </Badge>
            <p className="max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
              Componentes para apps internas, portales de clientes y
              documentacion consistente.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
              Producto
            </p>
            <Link href="#" variant="muted">
              Componentes
            </Link>
            <Link href="#" variant="muted">
              Hooks
            </Link>
            <Link href="#" variant="muted">
              Ejemplos
            </Link>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
              Recursos
            </p>
            <Link href="#" variant="muted">
              Changelog
            </Link>
            <Link href="#" variant="muted">
              Migracion
            </Link>
            <Link href="#" variant="muted">
              GitHub
            </Link>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
              Soporte
            </p>
            <Link href="#" variant="muted">
              Documentacion
            </Link>
            <Link href="#" variant="muted">
              Issues
            </Link>
            <Link href="#" variant="muted">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavigationPreviewCanvas() {
  const [page, setPage] = useState(4);

  return (
    <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className={EXAMPLE_CARD}>
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item href="#">Workspace</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Billing</Breadcrumb.Item>
            <Breadcrumb.Item current>Historial</Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>

        <Accordion type="single" collapsible className="mt-6">
          <Accordion.Item value="faq-1">
            <Accordion.Trigger>Como conecto mi dominio?</Accordion.Trigger>
            <Accordion.Content>
              Anade el registro TXT, verifica la propagacion y vuelve a
              comprobar desde configuracion.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="faq-2">
            <Accordion.Trigger>Que incluye el plan Growth?</Accordion.Trigger>
            <Accordion.Content>
              Roles, permisos, analitica y soporte prioritario para equipos en
              produccion.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className={EXAMPLE_CARD}>
        <p className="text-sm font-medium text-neutral-500">
          Listado paginado
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          Cuentas verificadas
        </p>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Pagina actual: {page}
        </p>
        <div className="mt-8">
          <Pagination count={12} page={page} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}

class ExampleSectionBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Keeps diagnostics visible in production without crashing the full page.
    console.error(`[ExamplesPage] section render failed: ${this.props.title}`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={EXAMPLE_SUBCARD}>
          <p className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
            Esta seccion no pudo renderizarse.
          </p>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Revisa la consola para ver el componente exacto que fallo en
            produccion.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

function ExampleSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 space-y-6">
      <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
        {title}
      </h2>
      <ExampleSectionBoundary title={title}>{children}</ExampleSectionBoundary>
    </section>
  );
}

export default function ExamplesPage() {
  return (
    <main className={`${WEBSITE_SHELL} pb-20 pt-10 sm:pt-14`}>
      <div className="grid items-start gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden self-start lg:sticky lg:top-24 lg:block lg:h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-3 lg:[scrollbar-width:thin] lg:[scrollbar-color:rgb(163_163_163)_transparent] lg:[&::-webkit-scrollbar]:w-2 lg:[&::-webkit-scrollbar-track]:bg-transparent lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:[&::-webkit-scrollbar-thumb]:border-2 lg:[&::-webkit-scrollbar-thumb]:border-transparent lg:[&::-webkit-scrollbar-thumb]:bg-neutral-300 lg:[&::-webkit-scrollbar-thumb]:bg-clip-content lg:[&::-webkit-scrollbar-thumb:hover]:bg-neutral-400 dark:lg:[scrollbar-color:rgb(115_115_115)_transparent] dark:lg:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:lg:[&::-webkit-scrollbar-thumb:hover]:bg-neutral-600">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Ejemplos
              </p>
              <div className="mt-4 space-y-6">
                {EXAMPLES_NAV.map((group) => (
                  <div key={group.title}>
                    <p className="px-3 text-xs font-medium text-neutral-500">
                      {group.title}
                    </p>
                    <div className="mt-2 space-y-1 px-3">
                      {group.items.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block rounded-lg px-2 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-16">
          <header className="space-y-4">
            <p className="text-sm font-medium text-neutral-500">
              Documentacion
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">
              Flujos reales con Quickit UI
            </h1>
            <p className="max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
              Cada bloque esta construido con la API real de la libreria. Los
              previews y los snippets ahora describen la misma UI y estan
              pensados como producto, no como placeholders.
            </p>
          </header>

          <ExampleSection id="acceso-registro" title="Acceso y registro">
            <div className="grid gap-6 lg:grid-cols-2">
              <WebsitePreviewTabs code={LOGIN_EXAMPLE_CODE}>
                <LoginPreviewCanvas />
              </WebsitePreviewTabs>
              <WebsitePreviewTabs code={SIGNUP_EXAMPLE_CODE}>
                <SignupPreviewCanvas />
              </WebsitePreviewTabs>
            </div>
          </ExampleSection>

          <ExampleSection
            id="mensajes-formulario"
            title="Mensajes de formulario"
          >
            <WebsitePreviewTabs code={FORM_MESSAGES_EXAMPLE_CODE}>
              <FormMessagesPreviewCanvas />
            </WebsitePreviewTabs>
          </ExampleSection>

          <ExampleSection id="pricing" title="Pricing">
            <WebsitePreviewTabs code={PRICING_EXAMPLE_CODE}>
              <PricingPreviewCanvas />
            </WebsitePreviewTabs>
          </ExampleSection>

          <ExampleSection id="barra-trabajo" title="Barra de trabajo">
            <WebsitePreviewTabs code={TOOLBAR_EXAMPLE_CODE}>
              <ToolbarPreviewCanvas />
            </WebsitePreviewTabs>
          </ExampleSection>

          <ExampleSection id="identidad-equipo" title="Identidad y equipo">
            <div className="grid gap-6 lg:grid-cols-2">
              <WebsitePreviewTabs code={TEAM_EXAMPLE_CODE}>
                <TeamPreviewCanvas />
              </WebsitePreviewTabs>
              <WebsitePreviewTabs code={PRESENCE_EXAMPLE_CODE}>
                <PresencePreviewCanvas />
              </WebsitePreviewTabs>
            </div>
          </ExampleSection>

          <ExampleSection id="overlays-feedback" title="Overlays y feedback">
            <WebsitePreviewTabs code={OVERLAYS_EXAMPLE_CODE}>
              <OverlaysPreviewCanvas />
            </WebsitePreviewTabs>
          </ExampleSection>

          <ExampleSection id="drawer-panel" title="Drawer">
            <WebsitePreviewTabs code={DRAWER_EXAMPLE_CODE}>
              <DrawerPreviewCanvas />
            </WebsitePreviewTabs>
          </ExampleSection>

          <ExampleSection id="estados-carga" title="Estados y carga">
            <div className="grid gap-6 lg:grid-cols-2">
              <WebsitePreviewTabs code={EMPTY_STATE_EXAMPLE_CODE}>
                <EmptyStateCard />
              </WebsitePreviewTabs>
              <WebsitePreviewTabs code={SKELETON_EXAMPLE_CODE}>
                <SkeletonCard />
              </WebsitePreviewTabs>
            </div>
          </ExampleSection>

          <ExampleSection id="progreso-rango" title="Progreso y rango">
            <WebsitePreviewTabs code={PROGRESS_RANGE_EXAMPLE_CODE}>
              <ProgressPreviewCanvas />
            </WebsitePreviewTabs>
          </ExampleSection>

          <ExampleSection id="toasts-ejemplo" title="Notificaciones">
            <WebsitePreviewTabs code={TOAST_EXAMPLE_CODE}>
              <ToastPreviewCanvas />
            </WebsitePreviewTabs>
          </ExampleSection>

          <ExampleSection
            id="formularios-avanzados"
            title="Controles avanzados"
          >
            <WebsitePreviewTabs code={ADVANCED_CONTROLS_CODE}>
              <AdvancedControlsPreviewCanvas />
            </WebsitePreviewTabs>
          </ExampleSection>

          <ExampleSection id="layout-secciones" title="Layout y secciones">
            <div className="space-y-8">
              <WebsitePreviewTabs code={HEADER_EXAMPLE_CODE}>
                <HeaderPreviewCanvas />
              </WebsitePreviewTabs>
              <WebsitePreviewTabs code={FOOTER_EXAMPLE_CODE}>
                <FooterPreviewCanvas />
              </WebsitePreviewTabs>
            </div>
          </ExampleSection>

          <ExampleSection
            id="navegacion-utilidades"
            title="Navegacion y utilidades"
          >
            <WebsitePreviewTabs code={NAVIGATION_EXAMPLE_CODE}>
              <NavigationPreviewCanvas />
            </WebsitePreviewTabs>
          </ExampleSection>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </main>
  );
}
