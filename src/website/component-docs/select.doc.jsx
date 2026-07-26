/* eslint-disable react-refresh/only-export-components */
import { FormControl, Label, Select } from "@/lib";
import { QUICKIT_CONTROL_SIZES, QUICKIT_SEMANTIC_COLORS } from "@/lib/tokens";
import { useState } from "react";
const SELECT_PREVIEW_CODE = `import { Select } from "quickit-ui";

export function SelectPreview() {
  return (
    <Select placeholder="Selecciona estado">
      <option value="active">Activo</option>
      <option value="paused">Pausado</option>
    </Select>
  );
}`;
function SelectPreviewCanvas() {
  return <div className="w-full max-w-xs flex flex-col gap-3">
      <Label htmlFor="doc-select">Estado</Label>
      <Select id="doc-select" placeholder="Selecciona estado">
        <option value="active">Activo</option>
        <option value="paused">Pausado</option>
      </Select>
    </div>;
}
function ControlledSelectPreview() {
  const [value, setValue] = useState("active");
  return <div className="flex flex-col gap-2">
      <Select value={value} onValueChange={setValue}>
        <option value="active">Activo</option>
        <option value="paused">Pausado</option>
      </Select>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">Valor actual: {value}</p>
    </div>;
}
export const selectDoc = {
  name: "Select",
  description: "Selector composable con trigger y panel flotante basado en opciones nativas.",
  previewCode: SELECT_PREVIEW_CODE,
  preview: <SelectPreviewCanvas />,
  installCode: `import { Select } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-registro",
    title: "Formulario de registro",
    description: "Ejemplo realista de formulario de registro con selección de país.",
    preview: <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="registro-pais">País</Label>
          <Select id="registro-pais" placeholder="Selecciona tu país">
            <option value="mx">México</option>
            <option value="es">España</option>
            <option value="ar">Argentina</option>
            <option value="co">Colombia</option>
            <option value="pe">Perú</option>
            <option value="cl">Chile</option>
            <option value="other">Otro</option>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="registro-idioma">Idioma preferido</Label>
          <Select id="registro-idioma" placeholder="Selecciona idioma">
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="pt">Portugués</option>
          </Select>
        </div>
      </div>,
    code: `import { Label, Select } from "quickit-ui";

export function SelectRegistro() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="registro-pais">País</Label>
        <Select id="registro-pais" placeholder="Selecciona tu país">
          <option value="mx">México</option>
          <option value="es">España</option>
          <option value="ar">Argentina</option>
          <option value="co">Colombia</option>
          <option value="pe">Perú</option>
          <option value="cl">Chile</option>
          <option value="other">Otro</option>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="registro-idioma">Idioma preferido</Label>
        <Select id="registro-idioma" placeholder="Selecciona idioma">
          <option value="es">Español</option>
          <option value="en">Inglés</option>
          <option value="pt">Portugués</option>
        </Select>
      </div>
    </div>
  );
}`
  }, {
    id: "ejemplos-configuracion",
    title: "Configuración de usuario",
    description: "Ejemplo realista de configuración con selección de rol y categoría.",
    preview: <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="config-rol">Rol del usuario</Label>
          <Select id="config-rol" placeholder="Selecciona rol">
            <option value="admin">Administrador</option>
            <option value="editor">Editor</option>
            <option value="viewer">Visualizador</option>
            <option value="guest">Invitado</option>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="config-categoria">Categoría</Label>
          <Select id="config-categoria" placeholder="Selecciona categoría">
            <option value="tech">Tecnología</option>
            <option value="design">Diseño</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Ventas</option>
          </Select>
        </div>
      </div>,
    code: `import { Label, Select } from "quickit-ui";

export function SelectConfiguracion() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="config-rol">Rol del usuario</Label>
        <Select id="config-rol" placeholder="Selecciona rol">
          <option value="admin">Administrador</option>
          <option value="editor">Editor</option>
          <option value="viewer">Visualizador</option>
          <option value="guest">Invitado</option>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="config-categoria">Categoría</Label>
        <Select id="config-categoria" placeholder="Selecciona categoría">
          <option value="tech">Tecnología</option>
          <option value="design">Diseño</option>
          <option value="marketing">Marketing</option>
          <option value="sales">Ventas</option>
        </Select>
      </div>
    </div>
  );
}`
  }, {
    id: "ejemplos-filtros",
    title: "Filtros de búsqueda",
    description: "Ejemplo realista de filtros de búsqueda con múltiples selects.",
    preview: <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="filtro-categoria">Categoría</Label>
          <Select id="filtro-categoria" placeholder="Todas las categorías">
            <option value="all">Todas</option>
            <option value="electronics">Electrónicos</option>
            <option value="clothing">Ropa</option>
            <option value="home">Hogar</option>
            <option value="sports">Deportes</option>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="filtro-precio">Rango de precio</Label>
          <Select id="filtro-precio" placeholder="Cualquier precio">
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200+">$200+</option>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="filtro-orden">Ordenar por</Label>
          <Select id="filtro-orden" placeholder="Relevancia">
            <option value="relevance">Relevancia</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="newest">Más recientes</option>
          </Select>
        </div>
      </div>,
    code: `import { Label, Select } from "quickit-ui";

export function SelectFiltros() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="filtro-categoria">Categoría</Label>
        <Select id="filtro-categoria" placeholder="Todas las categorías">
          <option value="all">Todas</option>
          <option value="electronics">Electrónicos</option>
          <option value="clothing">Ropa</option>
          <option value="home">Hogar</option>
          <option value="sports">Deportes</option>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="filtro-precio">Rango de precio</Label>
        <Select id="filtro-precio" placeholder="Cualquier precio">
          <option value="0-50">$0 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value="200+">$200+</option>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="filtro-orden">Ordenar por</Label>
        <Select id="filtro-orden" placeholder="Relevancia">
          <option value="relevance">Relevancia</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="newest">Más recientes</option>
        </Select>
      </div>
    </div>
  );
}`
  }, {
    id: "ejemplos-basico",
    title: "Básico",
    description: "Select simple con placeholder.",
    preview: <div className="w-full max-w-xs">
        <Select placeholder="Selecciona estado">
          <option value="active">Activo</option>
          <option value="paused">Pausado</option>
          <option value="blocked">Bloqueado</option>
        </Select>
      </div>,
    code: `import { Select } from "quickit-ui";

export function SelectBasico() {
  return (
    <Select placeholder="Selecciona estado">
      <option value="active">Activo</option>
      <option value="paused">Pausado</option>
      <option value="blocked">Bloqueado</option>
    </Select>
  );
}`
  }, {
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: `Sizes disponibles: ${QUICKIT_CONTROL_SIZES.join(", ")}.`,
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Select size="sm" placeholder="Small">
            <option value="1">Opción</option>
          </Select>
          <Select size="md" placeholder="Medium">
            <option value="1">Opción</option>
          </Select>
          <Select size="lg" placeholder="Large">
            <option value="1">Opción</option>
          </Select>
        </div>,
    code: `import { Select } from "quickit-ui";

export function SelectTamanos() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Select size="sm" placeholder="Small">
        <option value="1">Opción</option>
      </Select>
      <Select size="md" placeholder="Medium">
        <option value="1">Opción</option>
      </Select>
      <Select size="lg" placeholder="Large">
        <option value="1">Opción</option>
      </Select>
    </div>
  );
}`
  }, {
    id: "ejemplos-colores",
    title: "Colores",
    description: `Colores disponibles: ${QUICKIT_SEMANTIC_COLORS.join(", ")}.`,
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Select color="neutral" placeholder="Neutral">
            <option value="1">Opción</option>
          </Select>
          <Select color="primary" placeholder="Primary">
            <option value="1">Opción</option>
          </Select>
          <Select color="secondary" placeholder="Secondary">
            <option value="1">Opción</option>
          </Select>
          <Select color="danger" placeholder="Danger">
            <option value="1">Opción</option>
          </Select>
        </div>,
    code: `import { Select } from "quickit-ui";

export function SelectColores() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Select color="neutral" placeholder="Neutral">
        <option value="1">Opción</option>
      </Select>
      <Select color="primary" placeholder="Primary">
        <option value="1">Opción</option>
      </Select>
      <Select color="secondary" placeholder="Secondary">
        <option value="1">Opción</option>
      </Select>
      <Select color="danger" placeholder="Danger">
        <option value="1">Opción</option>
      </Select>
    </div>
  );
}`
  }, {
    id: "ejemplos-estados",
    title: "Estados",
    description: "disabled, invalid.",
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Select disabled placeholder="No disponible">
            <option value="1">Opción</option>
          </Select>
          <Select invalid placeholder="Campo inválido">
            <option value="1">Opción</option>
          </Select>
        </div>,
    code: `import { Select } from "quickit-ui";

export function SelectEstados() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Select disabled placeholder="No disponible">
        <option value="1">Opción</option>
      </Select>
      <Select invalid placeholder="Campo inválido">
        <option value="1">Opción</option>
      </Select>
    </div>
  );
}`
  }, {
    id: "ejemplos-controlado",
    title: "Controlado",
    description: "Escucha onValueChange cuando necesitas reaccionar al valor.",
    preview: <ControlledSelectPreview />,
    code: `import { Select } from "quickit-ui";
import { useState } from "react";

export function SelectControlado() {
  const [value, setValue] = useState("active");
  return (
    <div className="flex flex-col gap-2">
      <Select value={value} onValueChange={setValue}>
        <option value="active">Activo</option>
        <option value="paused">Pausado</option>
      </Select>
      <p className="text-xs text-neutral-500">
        Valor actual: {value}
      </p>
    </div>
  );
}`
  }, {
    id: "ejemplos-formcontrol",
    title: "Con FormControl",
    description: "Usa FormControl para label, descripción y estado.",
    preview: <FormControl controlId="doc-select-form" required>
          <Label>Estado</Label>
          <Select placeholder="Selecciona estado">
            <option value="active">Activo</option>
            <option value="paused">Pausado</option>
          </Select>
          <FormControl.Description>Este dato se usa en reportes.</FormControl.Description>
        </FormControl>,
    code: `import { FormControl, Label, Select } from "quickit-ui";

export function SelectFormControl() {
  return (
    <FormControl controlId="estado" required>
      <Label>Estado</Label>
      <Select placeholder="Selecciona estado">
        <option value="active">Activo</option>
        <option value="paused">Pausado</option>
      </Select>
      <FormControl.Description>Este dato se usa en reportes.</FormControl.Description>
    </FormControl>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "Color del select."
    }, {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      defaultValue: `"md"`,
      description: "Tamaño del control."
    }, {
      name: "defaultValue",
      type: "string | number",
      defaultValue: "undefined",
      description: "Valor inicial cuando es uncontrolled."
    }, {
      name: "value",
      type: "string | number",
      defaultValue: "undefined",
      description: "Controla el valor seleccionado."
    }, {
      name: "placeholder",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Texto cuando no hay valor."
    }, {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Deshabilita el select."
    }, {
      name: "invalid",
      type: "boolean",
      defaultValue: "false",
      description: "Muestra estado inválido."
    }, {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Marca como requerido."
    }, {
      name: "name",
      type: "string",
      defaultValue: "undefined",
      description: "Nombre del campo en formularios."
    }, {
      name: "usePortal",
      type: "boolean",
      defaultValue: "true",
      description: "Renderiza el panel en portal."
    }, {
      name: "onChange",
      type: "(event) => void",
      defaultValue: "undefined",
      description: "Evento sintético con `{ target: { id, name, value } }` para integraciones tipo formulario."
    }, {
      name: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "undefined",
      description: "Callback con el valor."
    }],
    notes: ["Select acepta <option> como hijos para definir opciones.", "Dentro de FormControl, usa `controlId` y deja que el Label se asocie por contexto.", "Si pasas `name`, el valor se serializa con un hidden input.", "Para lógica de negocio usa `onValueChange`; deja `onChange` para adaptadores."]
  }]
};
