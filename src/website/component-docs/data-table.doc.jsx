/* eslint-disable react-refresh/only-export-components */
import { Badge, Button, DataTable } from "@/lib";
const MEMBERS_COLUMNS = [{
  key: "member",
  header: "Member",
  sortable: true,
  render: (row) => <div className="whitespace-normal">
      <p className="font-medium text-neutral-950 dark:text-neutral-50">{row.member}</p>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">{row.email}</p>
    </div>
}, {
  key: "plan",
  header: "Plan"
}, {
  key: "usage",
  header: "Usage",
  sortable: true,
  align: "right",
  render: (row) => `${row.usage}%`
}, {
  key: "status",
  header: "Status",
  render: (row) => <Badge color={row.statusColor} variant={row.statusColor === "warning" ? "soft" : "solid"}>{row.status}</Badge>
}];
const MEMBERS_DATA = [{ id: 1, member: "Elena Ruiz", email: "elena@quickit.dev", plan: "Scale", usage: 92, status: "Needs review", statusColor: "warning" }, { id: 2, member: "Ana García", email: "ana@quickit.dev", plan: "Scale", usage: 48, status: "Healthy", statusColor: "success" }, { id: 3, member: "Luis Ortega", email: "luis@quickit.dev", plan: "Starter", usage: 31, status: "Healthy", statusColor: "success" }, { id: 4, member: "Paula Vega", email: "paula@quickit.dev", plan: "Scale", usage: 76, status: "At risk", statusColor: "danger" }];
const USERS_COLUMNS = [{
  key: "user",
  header: "Usuario",
  sortable: true,
  render: (row) => <div className="flex items-center gap-3">
      <div className="size-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xs font-medium text-neutral-600 dark:text-neutral-300">
        {row.name.charAt(0)}
      </div>
      <div>
        <p className="font-medium text-neutral-950 dark:text-neutral-50">{row.name}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{row.email}</p>
      </div>
    </div>
}, {
  key: "role",
  header: "Rol",
  render: (row) => <Badge color="neutral" variant="outline">{row.role}</Badge>
}, {
  key: "status",
  header: "Estado",
  render: (row) => <Badge color={row.status === "Activo" ? "success" : "neutral"} variant="soft">{row.status}</Badge>
}, {
  key: "actions",
  header: "Acciones",
  render: () => <div className="flex gap-2">
      <Button size="xs" variant="ghost">Editar</Button>
      <Button size="xs" variant="ghost" color="danger">Eliminar</Button>
    </div>
}];
const USERS_DATA = [{ id: 1, name: "María López", email: "maria@ejemplo.com", role: "Admin", status: "Activo" }, { id: 2, name: "Carlos Ruiz", email: "carlos@ejemplo.com", role: "Editor", status: "Activo" }, { id: 3, name: "Ana Martínez", email: "ana@ejemplo.com", role: "Viewer", status: "Inactivo" }];
const ORDERS_COLUMNS = [{
  key: "order",
  header: "Pedido",
  sortable: true,
  render: (row) => <div>
      <p className="font-medium text-neutral-950 dark:text-neutral-50">#{row.id}</p>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">{row.date}</p>
    </div>
}, {
  key: "customer",
  header: "Cliente",
  sortable: true
}, {
  key: "total",
  header: "Total",
  sortable: true,
  align: "right",
  render: (row) => `$${row.total}`
}, {
  key: "status",
  header: "Estado",
  render: (row) => <Badge color={row.statusColor} variant="soft">{row.status}</Badge>
}];
const ORDERS_DATA = [{ id: "12345", date: "15 Ene 2024", customer: "Juan Pérez", total: "1,250.00", status: "Entregado", statusColor: "success" }, { id: "12346", date: "16 Ene 2024", customer: "María García", total: "890.50", status: "En proceso", statusColor: "primary" }, { id: "12347", date: "17 Ene 2024", customer: "Pedro López", total: "2,100.00", status: "Pendiente", statusColor: "warning" }];
function DataTablePreviewCanvas() {
  return <div className="w-full min-w-0">
      <DataTable color="primary" columns={MEMBERS_COLUMNS} data={MEMBERS_DATA} rowKey={(row) => row.id} />
    </div>;
}
export const dataTableDoc = {
  name: "DataTable",
  description: "Tabla responsive con sorting opcional y celdas personalizadas.",
  previewCode: `import { Badge, DataTable } from "quickit-ui";

const columns = [
  { key: "member", header: "Member", sortable: true, render: (row) => (
    <div className="whitespace-normal">
      <p className="font-medium">{row.member}</p>
      <p className="text-xs opacity-70">{row.email}</p>
    </div>
  )},
  { key: "plan", header: "Plan" },
  { key: "usage", header: "Usage", sortable: true, align: "right", render: (row) => \`\${row.usage}%\` },
  { key: "status", header: "Status", render: (row) => <Badge color={row.statusColor}>{row.status}</Badge> },
];
const data = [{ id: 1, member: "Elena Ruiz", email: "elena@quickit.dev", plan: "Scale", usage: 92, status: "Needs review", statusColor: "warning" }];

export function DataTablePreview() {
  return <div className="w-full min-w-0"><DataTable color="primary" columns={columns} data={data} rowKey={(row) => row.id} /></div>;
}`,
  preview: <DataTablePreviewCanvas />,
  installCode: `import { DataTable } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-usuarios",
    title: "Tabla de usuarios",
    description: "Ejemplo realista de tabla de usuarios con acciones.",
    preview: <div className="w-full min-w-0">
        <DataTable color="primary" columns={USERS_COLUMNS} data={USERS_DATA} rowKey={(row) => row.id} />
      </div>,
    code: `import { Badge, Button, DataTable } from "quickit-ui";

const columns = [
  { 
    key: "user", 
    header: "Usuario", 
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xs font-medium">
          {row.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs opacity-70">{row.email}</p>
        </div>
      </div>
    )
  },
  { 
    key: "role", 
    header: "Rol",
    render: (row) => <Badge color="neutral" variant="outline">{row.role}</Badge>
  },
  { 
    key: "status", 
    header: "Estado",
    render: (row) => <Badge color={row.status === "Activo" ? "success" : "neutral"} variant="soft">{row.status}</Badge>
  },
  { 
    key: "actions", 
    header: "Acciones",
    render: () => (
      <div className="flex gap-2">
        <Button size="xs" variant="ghost">Editar</Button>
        <Button size="xs" variant="ghost" color="danger">Eliminar</Button>
      </div>
    )
  }
];

const data = [
  { id: 1, name: "María López", email: "maria@ejemplo.com", role: "Admin", status: "Activo" },
  { id: 2, name: "Carlos Ruiz", email: "carlos@ejemplo.com", role: "Editor", status: "Activo" },
  { id: 3, name: "Ana Martínez", email: "ana@ejemplo.com", role: "Viewer", status: "Inactivo" }
];

export function DataTableUsuarios() {
  return <DataTable color="primary" columns={columns} data={data} rowKey={(row) => row.id} />;
}`
  }, {
    id: "ejemplos-pedidos",
    title: "Tabla de pedidos",
    description: "Ejemplo realista de tabla de pedidos con estados.",
    preview: <div className="w-full min-w-0">
        <DataTable color="secondary" columns={ORDERS_COLUMNS} data={ORDERS_DATA} rowKey={(row) => row.id} />
      </div>,
    code: `import { Badge, DataTable } from "quickit-ui";

const columns = [
  { 
    key: "order", 
    header: "Pedido", 
    sortable: true,
    render: (row) => (
      <div>
        <p className="font-medium">#{row.id}</p>
        <p className="text-xs opacity-70">{row.date}</p>
      </div>
    )
  },
  { key: "customer", header: "Cliente", sortable: true },
  { 
    key: "total", 
    header: "Total", 
    sortable: true, 
    align: "right",
    render: (row) => \`$\${row.total}\`
  },
  { 
    key: "status", 
    header: "Estado",
    render: (row) => <Badge color={row.statusColor} variant="soft">{row.status}</Badge>
  }
];

const data = [
  { id: "12345", date: "15 Ene 2024", customer: "Juan Pérez", total: "1,250.00", status: "Entregado", statusColor: "success" },
  { id: "12346", date: "16 Ene 2024", customer: "María García", total: "890.50", status: "En proceso", statusColor: "primary" },
  { id: "12347", date: "17 Ene 2024", customer: "Pedro López", total: "2,100.00", status: "Pendiente", statusColor: "warning" }
];

export function DataTablePedidos() {
  return <DataTable color="secondary" columns={columns} data={data} rowKey={(row) => row.id} />;
}`
  }, {
    id: "ejemplos-basico",
    title: "Básico",
    description: "DataTable con sorting y celdas personalizadas.",
    preview: <div className="w-full min-w-0">
        <DataTable color="primary" columns={MEMBERS_COLUMNS} data={MEMBERS_DATA} rowKey={(row) => row.id} />
      </div>,
    code: `import { Badge, DataTable } from "quickit-ui";

const columns = [
  { key: "member", header: "Member", sortable: true, render: (row) => (
    <div className="whitespace-normal">
      <p className="font-medium">{row.member}</p>
      <p className="text-xs opacity-70">{row.email}</p>
    </div>
  )},
  { key: "plan", header: "Plan" },
  { key: "usage", header: "Usage", sortable: true, align: "right", render: (row) => \`\${row.usage}%\` },
  { key: "status", header: "Status", render: (row) => (
    <Badge color={row.statusColor} variant={row.statusColor === "warning" ? "soft" : "solid"}>{row.status}</Badge>
  )},
];
const data = [
  { id: 1, member: "Elena Ruiz", email: "elena@quickit.dev", plan: "Scale", usage: 92, status: "Needs review", statusColor: "warning" },
  { id: 2, member: "Ana García", email: "ana@quickit.dev", plan: "Scale", usage: 48, status: "Healthy", statusColor: "success" },
];

export function DataTableBasico() {
  return <DataTable color="primary" columns={columns} data={data} rowKey={(row) => row.id} />;
}`
  }, {
    id: "ejemplos-colores",
    title: "Colores del sistema",
    description: "Adapta la tabla al contexto visual.",
    preview: <div className="flex flex-col gap-6">
          <DataTable color="secondary" columns={MEMBERS_COLUMNS} data={MEMBERS_DATA.slice(0, 2)} rowKey={(row) => row.id} stickyHeader={false} />
          <DataTable color="success" columns={MEMBERS_COLUMNS} data={MEMBERS_DATA.slice(2)} rowKey={(row) => row.id} stickyHeader={false} />
        </div>,
    code: `import { DataTable } from "quickit-ui";

export function DataTableColores() {
  return (
    <div className="flex flex-col gap-6">
      <DataTable color="secondary" columns={columns} data={data.slice(0, 2)} rowKey={(row) => row.id} stickyHeader={false} />
      <DataTable color="success" columns={columns} data={data.slice(2)} rowKey={(row) => row.id} stickyHeader={false} />
    </div>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "Color semántico de borde, cabecera y hover."
    }, {
      name: "columns",
      type: "DataTableColumn[]",
      defaultValue: "[]",
      description: "Columnas con header, sortable, render, align."
    }, {
      name: "data",
      type: "Row[]",
      defaultValue: "[]",
      description: "Datos de la tabla."
    }, {
      name: "sort / defaultSort",
      type: "{ column, dir } | null",
      defaultValue: "null",
      description: "Estado de orden."
    }, {
      name: "stickyHeader",
      type: "boolean",
      defaultValue: "true",
      description: "Header fijo al hacer scroll."
    }],
    notes: ["Usa render para celdas con badges o varios textos.", "cellClassName y headerClassName ajustan wrapping por columna.", "Columnas sortable tienen aria-sort integrado."]
  }]
};
