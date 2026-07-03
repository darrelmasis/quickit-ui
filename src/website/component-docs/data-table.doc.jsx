/* eslint-disable react-refresh/only-export-components */
import { Badge, DataTable } from "@/lib";
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
function DataTablePreviewCanvas() {
  return <div className="w-full min-w-0">
      <DataTable color="brand" columns={MEMBERS_COLUMNS} data={MEMBERS_DATA} rowKey={(row) => row.id} />
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
  return <div className="w-full min-w-0"><DataTable color="brand" columns={columns} data={data} rowKey={(row) => row.id} /></div>;
}`,
  preview: <DataTablePreviewCanvas />,
  installCode: `import { DataTable } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "DataTable con sorting y celdas personalizadas.",
    preview: <div className="w-full min-w-0">
        <DataTable color="brand" columns={MEMBERS_COLUMNS} data={MEMBERS_DATA} rowKey={(row) => row.id} />
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
  return <DataTable color="brand" columns={columns} data={data} rowKey={(row) => row.id} />;
}`
  }, {
    id: "ejemplos-colores",
    title: "Colores del sistema",
    description: "Adapta la tabla al contexto visual.",
    preview: <div className="space-y-6">
          <DataTable color="success" columns={MEMBERS_COLUMNS} data={MEMBERS_DATA.slice(0, 2)} rowKey={(row) => row.id} stickyHeader={false} />
          <DataTable color="danger" columns={MEMBERS_COLUMNS} data={MEMBERS_DATA.slice(2)} rowKey={(row) => row.id} stickyHeader={false} />
        </div>,
    code: `import { DataTable } from "quickit-ui";

export function DataTableColores() {
  return (
    <div className="space-y-6">
      <DataTable color="success" columns={columns} data={data.slice(0, 2)} rowKey={(row) => row.id} stickyHeader={false} />
      <DataTable color="danger" columns={columns} data={data.slice(2)} rowKey={(row) => row.id} stickyHeader={false} />
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
