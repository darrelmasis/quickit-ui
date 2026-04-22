/* eslint-disable react-refresh/only-export-components */
import { Pagination } from "@/lib";
const PAGINATION_PREVIEW_CODE = `import { Pagination } from "quickit-ui";

export function PaginationPreview() {
  return <Pagination count={10} />;
}`;
function PaginationPreviewCanvas() {
  return <div className="flex justify-center">
      <Pagination count={8} />
    </div>;
}
export const paginationDoc = {
  name: "Pagination",
  description: "Paginación controlada o no controlada.",
  previewCode: PAGINATION_PREVIEW_CODE,
  preview: <PaginationPreviewCanvas />,
  installCode: `import { Pagination } from "quickit-ui";`,
  usageCode: `import { Pagination } from "quickit-ui";

export function PaginationUsage() {
  return <Pagination count={12} onPageChange={(page) => console.log(page)} />;
}`,
  examples: [{
    id: "ejemplos-controlado",
    title: "Controlado",
    description: "Usa page y onPageChange cuando el estado vive fuera.",
    preview: <Pagination count={10} page={3} onPageChange={() => {}} />
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "count",
      type: "number",
      defaultValue: "required",
      description: "Número total de páginas."
    }, {
      name: "page",
      type: "number",
      defaultValue: "undefined",
      description: "Página controlada."
    }, {
      name: "defaultPage",
      type: "number",
      defaultValue: "1",
      description: "Página inicial."
    }, {
      name: "onPageChange",
      type: "(page: number) => void",
      defaultValue: "undefined",
      description: "Callback al cambiar página."
    }, {
      name: "siblingCount",
      type: "number",
      defaultValue: "1",
      description: "Cantidad de páginas adyacentes visibles."
    }, {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Deshabilita la paginación."
    }, {
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "Color del control."
    }],
    notes: ["`count`, `page` y `defaultPage` deben representar un rango válido; valores fuera de rango se ajustan internamente.", "`siblingCount` debe ser mayor o igual a 0."]
  }]
};
