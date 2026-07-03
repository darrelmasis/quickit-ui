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
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Paginación no controlada.",
    preview: <div className="flex justify-center">
          <Pagination count={10} />
        </div>,
    code: `import { Pagination } from "quickit-ui";

export function PaginationBasico() {
  return <Pagination count={10} />;
}`
  }, {
    id: "ejemplos-controlado",
    title: "Controlado",
    description: "Usa page y onPageChange.",
    preview: <div className="flex justify-center">
          <Pagination count={10} page={3} onPageChange={() => {}} />
        </div>,
    code: `import { Pagination } from "quickit-ui";

export function PaginationControlado() {
  return <Pagination count={10} page={3} onPageChange={(page) => console.log(page)} />;
}`
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
      description: "Páginas adyacentes visibles."
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
    notes: ["count, page y defaultPage deben representar un rango válido.", "siblingCount debe ser >= 0."]
  }]
};
