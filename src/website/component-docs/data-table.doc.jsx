/* eslint-disable react-refresh/only-export-components */
import { DataTable } from "@/lib";
function DataTablePreviewCanvas() {
  return <div className="w-full max-w-5xl min-w-0">
      <DataTable columns={[{
      key: "name",
      header: "Nombre",
      sortable: true
    }, {
      key: "role",
      header: "Rol"
    }, {
      key: "dept",
      header: "Equipo"
    }, {
      key: "status",
      header: "Estado"
    }]} data={[{
      id: 1,
      name: "Ana García",
      role: "Admin",
      dept: "Plataforma",
      status: "Activo"
    }, {
      id: 2,
      name: "Luis Ortega",
      role: "Editor",
      dept: "Contenido",
      status: "Activo"
    }, {
      id: 3,
      name: "María Núñez",
      role: "Viewer",
      dept: "Datos",
      status: "Invitado"
    }, {
      id: 4,
      name: "Carlos Ruiz",
      role: "Editor",
      dept: "Contenido",
      status: "Activo"
    }, {
      id: 5,
      name: "Elena Soto",
      role: "Admin",
      dept: "Plataforma",
      status: "Activo"
    }, {
      id: 6,
      name: "Javier Moya",
      role: "Viewer",
      dept: "Datos",
      status: "Invitado"
    }, {
      id: 7,
      name: "Paula Vega",
      role: "Editor",
      dept: "Marketing",
      status: "Activo"
    }, {
      id: 8,
      name: "Diego Gil",
      role: "Viewer",
      dept: "Soporte",
      status: "Invitado"
    }]} rowKey={row => row.id} />
    </div>;
}
export const dataTableDoc = {
  name: "DataTable",
  description: "Tabla responsive con cabecera sticky opcional y columnas ordenables.",
  previewCode: `import { DataTable } from "quickit-ui";

const columns = [
  { key: "name", header: "Nombre", sortable: true },
  { key: "role", header: "Rol" },
  { key: "dept", header: "Equipo" },
  { key: "status", header: "Estado" },
];

const data = [
  { id: 1, name: "Ana García", role: "Admin", dept: "Plataforma", status: "Activo" },
  { id: 2, name: "Luis Ortega", role: "Editor", dept: "Contenido", status: "Activo" },
  { id: 3, name: "María Núñez", role: "Viewer", dept: "Datos", status: "Invitado" },
  { id: 4, name: "Carlos Ruiz", role: "Editor", dept: "Contenido", status: "Activo" },
  { id: 5, name: "Elena Soto", role: "Admin", dept: "Plataforma", status: "Activo" },
  { id: 6, name: "Javier Moya", role: "Viewer", dept: "Datos", status: "Invitado" },
  { id: 7, name: "Paula Vega", role: "Editor", dept: "Marketing", status: "Activo" },
  { id: 8, name: "Diego Gil", role: "Viewer", dept: "Soporte", status: "Invitado" },
];

export function DataTablePreview() {
  return (
    <div className="w-full max-w-5xl min-w-0">
      <DataTable columns={columns} data={data} rowKey={(row) => row.id} />
    </div>
  );
}`,
  preview: <DataTablePreviewCanvas />,
  installCode: `import { DataTable } from "quickit-ui";`,
  usageCode: `import { DataTable } from "quickit-ui";

export function DataTableUsage() {
  return (
    <DataTable
      sort={{ column: "name", dir: "asc" }}
      onSortChange={(s) => {}}
      columns={[{ key: "name", header: "Nombre", sortable: true }]}
      data={[{ name: "Ejemplo" }]}
    />
  );
}`,
  examples: [{
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "columns",
      type: "DataTableColumn[]",
      defaultValue: "[]",
      description: "Definición de columnas; `sortable` activa orden en cabecera."
    }, {
      name: "data",
      type: "filas",
      defaultValue: "[]",
      description: "Filas mostradas; deben incluir las keys de columnas o usar `render`."
    }, {
      name: "sort / defaultSort",
      type: "{ column, dir } | null",
      defaultValue: "null",
      description: "Estado de orden controlado o inicial."
    }, {
      name: "onSortChange",
      type: "(sort) => void",
      defaultValue: "undefined",
      description: "Notificación al alternar orden (asc → desc → sin orden)."
    }],
    notes: ["Usa `render` para celdas personalizadas o formatos."]
  }]
};
