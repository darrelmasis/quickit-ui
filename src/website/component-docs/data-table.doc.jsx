/* eslint-disable react-refresh/only-export-components */
import { Badge, DataTable } from "@/lib";

const MEMBERS_COLUMNS = [
  {
    key: "member",
    header: "Member",
    sortable: true,
    render: (row) => (
      <div className="whitespace-normal">
        <p className="font-medium text-neutral-950 dark:text-neutral-50">
          {row.member}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {row.email}
        </p>
      </div>
    ),
  },
  {
    key: "plan",
    header: "Plan",
  },
  {
    key: "usage",
    header: "Usage",
    sortable: true,
    align: "right",
    render: (row) => `${row.usage}%`,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <Badge
        color={row.statusColor}
        variant={row.statusColor === "warning" ? "soft" : "solid"}
      >
        {row.status}
      </Badge>
    ),
  },
];

const MEMBERS_DATA = [
  {
    id: 1,
    member: "Elena Ruiz",
    email: "elena@quickit.dev",
    plan: "Scale",
    usage: 92,
    status: "Needs review",
    statusColor: "warning",
  },
  {
    id: 2,
    member: "Ana García",
    email: "ana@quickit.dev",
    plan: "Scale",
    usage: 48,
    status: "Healthy",
    statusColor: "success",
  },
  {
    id: 3,
    member: "Luis Ortega",
    email: "luis@quickit.dev",
    plan: "Starter",
    usage: 31,
    status: "Healthy",
    statusColor: "success",
  },
  {
    id: 4,
    member: "Paula Vega",
    email: "paula@quickit.dev",
    plan: "Scale",
    usage: 76,
    status: "At risk",
    statusColor: "danger",
  },
];

function DataTablePreviewCanvas() {
  return (
    <div className="w-full max-w-5xl min-w-0">
      <DataTable
        color="brand"
        columns={MEMBERS_COLUMNS}
        data={MEMBERS_DATA}
        rowKey={(row) => row.id}
      />
    </div>
  );
}

export const dataTableDoc = {
  name: "DataTable",
  description:
    "Tabla responsive con sorting opcional, colores semánticos y celdas personalizadas por columna.",
  previewCode: `import { Badge, DataTable } from "quickit-ui";

const columns = [
  {
    key: "member",
    header: "Member",
    sortable: true,
    render: (row) => (
      <div className="whitespace-normal">
        <p className="font-medium">{row.member}</p>
        <p className="text-xs opacity-70">{row.email}</p>
      </div>
    ),
  },
  { key: "plan", header: "Plan" },
  {
    key: "usage",
    header: "Usage",
    sortable: true,
    align: "right",
    render: (row) => \`\${row.usage}%\`,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <Badge color={row.statusColor}>
        {row.status}
      </Badge>
    ),
  },
];

const data = [
  {
    id: 1,
    member: "Elena Ruiz",
    email: "elena@quickit.dev",
    plan: "Scale",
    usage: 92,
    status: "Needs review",
    statusColor: "warning",
  },
];

export function DataTablePreview() {
  return (
    <div className="w-full max-w-5xl min-w-0">
      <DataTable color="brand" columns={columns} data={data} rowKey={(row) => row.id} />
    </div>
  );
}`,
  preview: <DataTablePreviewCanvas />,
  installCode: `import { Badge, DataTable } from "quickit-ui";`,
  usageCode: `import { Badge, DataTable } from "quickit-ui";

export function SeatsTable() {
  return (
    <DataTable
      color="slate"
      defaultSort={{ column: "usage", dir: "desc" }}
      columns={[
        { key: "member", header: "Member", sortable: true },
        { key: "plan", header: "Plan" },
        {
          key: "status",
          header: "Status",
          render: (row) => (
            <Badge color={row.active ? "success" : "danger"}>
              {row.active ? "Active" : "Blocked"}
            </Badge>
          ),
        },
      ]}
      data={[
        { id: 1, member: "Elena Ruiz", plan: "Scale", active: true },
        { id: 2, member: "Paula Vega", plan: "Starter", active: false },
      ]}
      rowKey={(row) => row.id}
    />
  );
}`,
  examples: [
    {
      id: "ejemplos-colores",
      title: "Colores semánticos",
      description:
        "Usa color para adaptar la tabla al contexto visual de la pantalla sin tener que reestilar el componente.",
      preview: (
        <div className="space-y-6">
          <DataTable
            color="success"
            columns={MEMBERS_COLUMNS}
            data={MEMBERS_DATA.slice(0, 2)}
            rowKey={(row) => row.id}
            stickyHeader={false}
          />
          <DataTable
            color="danger"
            columns={MEMBERS_COLUMNS}
            data={MEMBERS_DATA.slice(2)}
            rowKey={(row) => row.id}
            stickyHeader={false}
          />
        </div>
      ),
    },
    {
      id: "ejemplos-celdas",
      title: "Celdas personalizadas",
      description:
        "render, align y cellClassName te permiten mezclar contenido denso, badges y texto multilínea.",
      preview: (
        <div className="w-full max-w-5xl min-w-0">
          <DataTable
            color="slate"
            columns={[
              {
                key: "issue",
                header: "Issue",
                sortable: true,
                cellClassName: "whitespace-normal",
                render: (row) => (
                  <div className="space-y-1 whitespace-normal">
                    <p className="font-medium text-neutral-950 dark:text-neutral-50">
                      {row.issue}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {row.summary}
                    </p>
                  </div>
                ),
              },
              {
                key: "severity",
                header: "Severity",
                render: (row) => (
                  <Badge color={row.severityColor} variant="soft">
                    {row.severity}
                  </Badge>
                ),
              },
              {
                key: "owner",
                header: "Owner",
              },
            ]}
            data={[
              {
                id: 1,
                issue: "Webhook delivery retries too late",
                summary: "Retry interval is causing delayed sync on high-traffic accounts.",
                severity: "Warning",
                severityColor: "warning",
                owner: "Platform",
              },
              {
                id: 2,
                issue: "Billing webhook signature invalid",
                summary: "Production environment is rejecting events from the new endpoint.",
                severity: "Critical",
                severityColor: "danger",
                owner: "Billing",
              },
            ]}
            rowKey={(row) => row.id}
            stickyHeader={false}
          />
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
          description: "Aplica un tratamiento semántico al borde, cabecera y hover de filas.",
        },
        {
          name: "columns",
          type: "DataTableColumn[]",
          defaultValue: "[]",
          description: "Define encabezados, sorting y render personalizado por columna.",
        },
        {
          name: "data",
          type: "Row[]",
          defaultValue: "[]",
          description: "Filas mostradas por la tabla.",
        },
        {
          name: "sort / defaultSort",
          type: "{ column, dir } | null",
          defaultValue: "null",
          description: "Estado de orden controlado o valor inicial en modo no controlado.",
        },
        {
          name: "stickyHeader",
          type: "boolean",
          defaultValue: "true",
          description: "Mantiene visible la cabecera al hacer scroll dentro del contenedor.",
        },
      ],
      notes: [
        "Usa render cuando la celda necesite badges, varios textos o formatos especiales.",
        "cellClassName y headerClassName permiten ajustar wrapping y densidad por columna.",
        "Las columnas `sortable` se renderizan con interacción de teclado y `aria-sort`; evita duplicar esa lógica fuera del componente.",
      ],
    },
  ],
};
