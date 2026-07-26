/* eslint-disable react-refresh/only-export-components */
import { Breadcrumb } from "@/lib";
const HOME_HREF = "/docs/getting-started/installation";
const SALES_HREF = "/examples/flows/checkout";
const SAFE_LINK_PROPS = { onClick: (event) => event.preventDefault() };
const BREADCRUMB_PREVIEW_CODE = `import { Breadcrumb } from "quickit-ui";

export function BreadcrumbPreview() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item href="#">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item current>Proyectos</Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
      <Breadcrumb>
        <Breadcrumb.List separator="•">
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Ventas</Breadcrumb.Item>
          <Breadcrumb.Item current>Detalle</Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    </div>
  );
}`;
function BreadcrumbPreviewCanvas() {
  return <div className="flex flex-col gap-4">
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item href={HOME_HREF} {...SAFE_LINK_PROPS}>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item current>Proyectos</Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
      <Breadcrumb>
        <Breadcrumb.List separator="•">
          <Breadcrumb.Item href={HOME_HREF} {...SAFE_LINK_PROPS}>Home</Breadcrumb.Item>
          <Breadcrumb.Item href={SALES_HREF} {...SAFE_LINK_PROPS}>Ventas</Breadcrumb.Item>
          <Breadcrumb.Item current>Detalle</Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    </div>;
}
export const breadcrumbDoc = {
  name: "Breadcrumb",
  description: "Ruta jerárquica con links y current item.",
  previewCode: BREADCRUMB_PREVIEW_CODE,
  preview: <BreadcrumbPreviewCanvas />,
  installCode: `import { Breadcrumb } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Items con href y current.",
    preview: <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item href={HOME_HREF} {...SAFE_LINK_PROPS}>Inicio</Breadcrumb.Item>
            <Breadcrumb.Item current>Proyectos</Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>,
    code: `import { Breadcrumb } from "quickit-ui";

export function BreadcrumbBasico() {
  return (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item href="#">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item current>Proyectos</Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  );
}`
  }, {
    id: "ejemplos-separador",
    title: "Separador personalizado",
    description: "Breadcrumb.List acepta separator.",
    preview: <Breadcrumb>
          <Breadcrumb.List separator="•">
            <Breadcrumb.Item href={HOME_HREF} {...SAFE_LINK_PROPS}>Inicio</Breadcrumb.Item>
            <Breadcrumb.Item href={SALES_HREF} {...SAFE_LINK_PROPS}>Ventas</Breadcrumb.Item>
            <Breadcrumb.Item current>Detalle</Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>,
    code: `import { Breadcrumb } from "quickit-ui";

export function BreadcrumbSeparador() {
  return (
    <Breadcrumb>
      <Breadcrumb.List separator="•">
        <Breadcrumb.Item href="#">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Ventas</Breadcrumb.Item>
        <Breadcrumb.Item current>Detalle</Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "separator",
      type: "ReactNode",
      defaultValue: "`ChevronRightIcon`",
      description: "Separa los items automáticamente."
    }, {
      name: "separatorClassName",
      type: "string",
      defaultValue: "undefined",
      description: "Clases del separador automático."
    }, {
      name: "current",
      type: "boolean",
      defaultValue: "false",
      description: "Marca el item como actual (no link)."
    }, {
      name: "href",
      type: "string",
      defaultValue: "undefined",
      description: "Convierte el item en link."
    }],
    notes: ["Breadcrumb.Item con href se renderiza como link automáticamente.", "Breadcrumb.Link y Breadcrumb.Current se mantienen por compatibilidad.", "Breadcrumb.Separator permite separadores manuales."]
  }]
};
