import { Badge, Button, Combobox, DataTable, Input, InputGroup, Pagination, Select, Skeleton } from "@/lib";
import { useMemo, useState } from "react";

export function DashboardTableFlow() {
  const [page, setPage] = useState(1);
  const [owner, setOwner] = useState("all");
  const rows = useMemo(
    () => [
      { id: 1, flow: "Onboarding B2B", owner: "Ada", status: "Activo" },
      { id: 2, flow: "Billing portal", owner: "Grace", status: "Pendiente" },
      { id: 3, flow: "Support hub", owner: "Margaret", status: "Bloqueado" },
    ],
    [],
  );
  const columns = [
    { key: "flow", header: "Flujo" },
    { key: "owner", header: "Owner" },
    {
      key: "status",
      header: "Estado",
      render: (row) => (
        <Badge
          size="sm"
          variant="soft"
          color={row.status === "Activo" ? "success" : row.status === "Pendiente" ? "warning" : "danger"}
        >
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <div className="grid gap-3 lg:grid-cols-[1.2fr_0.9fr_0.7fr_auto]">
          <InputGroup attached>
            <InputGroup.Addon align="inline-start">Buscar</InputGroup.Addon>
            <Input placeholder="onboarding, billing, support..." />
          </InputGroup>
          <Combobox
            value={owner}
            onValueChange={setOwner}
            placeholder="Responsable"
            options={[
              { value: "all", label: "Todos" },
              { value: "ada", label: "Ada" },
              { value: "grace", label: "Grace" },
            ]}
          />
          <Select defaultValue="all">
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="blocked">Bloqueados</option>
          </Select>
          <Button color="primary">Nuevo flujo</Button>
        </div>
      </div>

      <DataTable columns={columns} data={rows} rowKey={(row) => row.id} />

      <div className="flex items-center justify-between rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <Pagination page={page} count={6} onPageChange={setPage} />
        <Button size="sm" variant="outline" color="neutral">
          Exportar CSV
        </Button>
        <Button color="primary">Nuevo flujo</Button>
      </div>

      <div className="grid gap-2 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <p className="text-sm font-medium">Estado loading (tabla)</p>
        <Skeleton shape="line" className="h-4 w-full" />
        <Skeleton shape="line" className="h-4 w-4/5" />
        <Skeleton shape="line" className="h-4 w-2/3" />
      </div>
    </div>
  );
}
