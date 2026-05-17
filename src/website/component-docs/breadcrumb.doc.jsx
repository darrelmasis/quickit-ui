/* eslint-disable react-refresh/only-export-components */
import { Breadcrumb } from "@/lib";
const HOME_HREF = "/docs/getting-started/installation";
const SALES_HREF = "/examples/flows/checkout";
const SAFE_LINK_PROPS = {
  onClick: (event) => event.preventDefault()
};
const BREADCRUMB_PREVIEW_CODE = `import { Breadcrumb } from "quickit-ui";

export function BreadcrumbPreview() {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item href="/docs/getting-started/installation">Home</Breadcrumb.Item>
          <Breadcrumb.Item current>Proyectos</Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
      <Breadcrumb>
        <Breadcrumb.List separator="•">
          <Breadcrumb.Item href="/docs/getting-started/installation">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/examples/flows/checkout">Ventas</Breadcrumb.Item>
          <Breadcrumb.Item current>Detalle</Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    </>
  );
}`;
function BreadcrumbPreviewCanvas() {
  return <div className="space-y-4">
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
  usageCode: `import { Breadcrumb } from "quickit-ui";

export function BreadcrumbUsage() {
  return (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item href="/docs/getting-started/installation">Home</Breadcrumb.Item>
        <Breadcrumb.Item current>Productos</Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  );
}`,
  examples: [{
    id: "ejemplos-separador",
    title: "Separador automático",
    description: "Breadcrumb.List agrega separadores si no los defines manualmente.",
    preview: <Breadcrumb>
          <Breadcrumb.List separator="•">
            <Breadcrumb.Item href={HOME_HREF} {...SAFE_LINK_PROPS}>Inicio</Breadcrumb.Item>
            <Breadcrumb.Item href={SALES_HREF} {...SAFE_LINK_PROPS}>Ventas</Breadcrumb.Item>
            <Breadcrumb.Item current>Detalle</Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "separator",
      type: "ReactNode",
      defaultValue: "`ChevronRightIcon`",
      description: "Define el separador en Breadcrumb.List."
    }, {
      name: "separatorClassName",
      type: "string",
      defaultValue: "undefined",
      description: "Clases del separador automático."
    }, {
      name: "current",
      type: "boolean",
      defaultValue: "false",
      description: "Marca el item como actual."
    }, {
      name: "href",
      type: "string",
      defaultValue: "undefined",
      description: "Si lo pasas, Breadcrumb.Item se renderiza automáticamente como link."
    }, {
      name: "linkVariant",
      type: "QuickitLinkTextVariant",
      defaultValue: `"muted"`,
      description: "Variante de Link cuando se renderiza como enlace."
    }, {
      name: "underline",
      type: "QuickitLinkUnderline",
      defaultValue: `"hover"`,
      description: "Subrayado del Link."
    }, {
      name: "contentClassName",
      type: "string",
      defaultValue: "undefined",
      description: "Clases aplicadas al contenido del item."
    }, {
      name: "title",
      type: "string",
      defaultValue: "undefined",
      description: "Tooltip nativo opcional."
    }],
    notes: ["La forma recomendada es usar `Breadcrumb.Item` con `href` o `current`; `Breadcrumb.Link` y `Breadcrumb.Current` siguen disponibles para casos más específicos.", "Los ejemplos usan rutas reales pero el preview evita navegar para no sacarte de la página de documentación.", "`allowLink` existe por compatibilidad, pero no es la ruta recomendada frente a `href`.", "Breadcrumb.Separator permite separadores manuales cuando necesitas layout custom."]
  }]
};
