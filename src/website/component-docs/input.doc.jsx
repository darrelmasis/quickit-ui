/* eslint-disable react-refresh/only-export-components */
import { FormControl, Input, Label } from "@/lib";
import { QUICKIT_SEMANTIC_COLORS, QUICKIT_CONTROL_SIZES } from "@/lib/tokens";

const INPUT_BASICO_CODE = `import { Input, Label } from "quickit-ui";

export function InputBasico() {
  return (
    <div>
      <Label htmlFor="correo">Correo</Label>
      <Input id="correo" type="email" placeholder="tu@email.com" />
    </div>
  );
}`;

function InputBasicoCanvas() {
  return <div className="w-full max-w-md">
      <div>
        <Label htmlFor="doc-input-basico">Correo</Label>
        <Input id="doc-input-basico" type="email" placeholder="tu@email.com" size="md" />
      </div>
    </div>;
}

export const inputDoc = {
  name: "Input",
  description: "Campo base con soporte para number, search, password, clear button y elementos laterales.",
  previewCode: INPUT_BASICO_CODE,
  preview: <InputBasicoCanvas />,
  installCode: `import { Input } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: `Sizes disponibles: ${QUICKIT_CONTROL_SIZES.join(", ")}.`,
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </div>,
    code: `import { Input } from "quickit-ui";

export function InputTamanos() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  );
}`
  }, {
    id: "ejemplos-colores",
    title: "Colores",
    description: `Colores disponibles: ${QUICKIT_SEMANTIC_COLORS.join(", ")}.`,
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Input color="neutral" defaultValue="Neutral" />
          <Input color="primary" defaultValue="Primary" />
          <Input color="success" defaultValue="Success" />
          <Input color="danger" defaultValue="Danger" />
          <Input color="warning" defaultValue="Warning" />
          <Input color="info" defaultValue="Info" />
        </div>,
    code: `import { Input } from "quickit-ui";

export function InputColores() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Input color="neutral" defaultValue="Neutral" />
      <Input color="primary" defaultValue="Primary" />
      <Input color="success" defaultValue="Success" />
      <Input color="danger" defaultValue="Danger" />
      <Input color="warning" defaultValue="Warning" />
      <Input color="info" defaultValue="Info" />
    </div>
  );
}`
  }, {
    id: "ejemplos-estados",
    title: "Estados",
    description: "disabled, readonly e invalid.",
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Input placeholder="Deshabilitado" disabled />
          <Input placeholder="Solo lectura" readOnly defaultValue="Valor fijo" />
          <Input placeholder="Campo inválido" invalid />
        </div>,
    code: `import { Input } from "quickit-ui";

export function InputEstados() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Input placeholder="Deshabilitado" disabled />
      <Input placeholder="Solo lectura" readOnly defaultValue="Valor fijo" />
      <Input placeholder="Campo inválido" invalid />
    </div>
  );
}`
  }, {
    id: "ejemplos-elementos",
    title: "Elementos laterales",
    description: "Usa leftElement y rightElement para íconos, badges o texto adicional.",
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Input leftElement={<span>@</span>} placeholder="Usuario" />
          <Input rightElement={<span className="text-xs">CTA</span>} placeholder="Buscar" />
        </div>,
    code: `import { Input } from "quickit-ui";

export function InputElementos() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Input leftElement={<span>@</span>} placeholder="Usuario" />
      <Input rightElement={<span className="text-xs">CTA</span>} placeholder="Buscar" />
    </div>
  );
}`
  }, {
    id: "ejemplos-password",
    title: "Password",
    description: "Activa passwordToggle para mostrar/ocultar la contraseña.",
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Input type="password" placeholder="••••••" passwordToggle />
          <Input type="password" placeholder="••••••" passwordToggle defaultPasswordVisible />
        </div>,
    code: `import { Input } from "quickit-ui";

export function InputPassword() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Input type="password" placeholder="••••••" passwordToggle />
      <Input type="password" placeholder="••••••" passwordToggle defaultPasswordVisible />
    </div>
  );
}`
  }, {
    id: "ejemplos-clear",
    title: "Search / Clear",
    description: "type=\"search\" activa clearButton automáticamente.",
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Input type="search" placeholder="Buscar" clearButton />
          <Input type="search" placeholder="Filtro" clearButton clearButtonLabel="Limpiar" />
        </div>,
    code: `import { Input } from "quickit-ui";

export function InputSearch() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Input type="search" placeholder="Buscar" clearButton />
      <Input type="search" placeholder="Filtro" clearButton clearButtonLabel="Limpiar" />
    </div>
  );
}`
  }, {
    id: "ejemplos-number",
    title: "Number",
    description: "Con numberButtons muestra botones de incremento/decremento. numberLayout controla la posición.",
    preview: <div className="grid gap-4 sm:grid-cols-2">
          <Input type="number" numberButtons numberLayout="horizontal" placeholder="0" defaultValue="5" />
          <Input type="number" numberButtons numberLayout="vertical" placeholder="0" defaultValue="5" />
        </div>,
    code: `import { Input } from "quickit-ui";

export function InputNumber() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Input
        type="number"
        numberButtons
        numberLayout="horizontal"
        defaultValue="5"
      />
      <Input
        type="number"
        numberButtons
        numberLayout="vertical"
        defaultValue="5"
      />
    </div>
  );
}`
  }, {
    id: "ejemplos-formcontrol",
    title: "Con FormControl",
    description: "Integración con FormControl para labels y mensajes de error.",
    preview: <div className="w-full max-w-md">
          <FormControl controlId="doc-email" invalid required>
            <Label>Correo</Label>
            <Input type="email" placeholder="tu@email.com" />
            <FormControl.Message>El correo es obligatorio.</FormControl.Message>
          </FormControl>
        </div>,
    code: `import { FormControl, Input, Label } from "quickit-ui";

export function InputFormControl() {
  return (
    <FormControl controlId="email" invalid required>
      <Label>Correo</Label>
      <Input type="email" placeholder="tu@email.com" />
      <FormControl.Message>El correo es obligatorio.</FormControl.Message>
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
      description: "Color del campo."
    }, {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      defaultValue: `"md"`,
      description: "Controla altura y padding."
    }, {
      name: "shape",
      type: `"square" | "pill"`,
      defaultValue: `"square"`,
      description: "Geometría del input."
    }, {
      name: "actionShape",
      type: `"square" | "circle"`,
      defaultValue: `"circle"`,
      description: "Forma de los botones internos."
    }, {
      name: "invalid",
      type: "boolean",
      defaultValue: "false",
      description: "Muestra estado inválido."
    }, {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Marca el campo como requerido."
    }, {
      name: "leftElement",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Elemento alineado a la izquierda."
    }, {
      name: "rightElement",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Elemento alineado a la derecha."
    }, {
      name: "clearButton",
      type: "boolean",
      defaultValue: "false",
      description: "Activa el botón de limpiar."
    }, {
      name: "clearButtonLabel",
      type: "string",
      defaultValue: `"Limpiar búsqueda"`,
      description: "Label accesible del botón de limpiar."
    }, {
      name: "clearIcon",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Icono personalizado para el botón clear."
    }, {
      name: "onClear",
      type: "() => void",
      defaultValue: "undefined",
      description: "Se dispara al limpiar el input."
    }, {
      name: "passwordToggle",
      type: "boolean",
      defaultValue: "false",
      description: "Activa el toggle de contraseña."
    }, {
      name: "defaultPasswordVisible",
      type: "boolean",
      defaultValue: "false",
      description: "Define si inicia con la contraseña visible."
    }, {
      name: "showPasswordIcon",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Icono cuando la contraseña está oculta."
    }, {
      name: "hidePasswordIcon",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Icono cuando la contraseña está visible."
    }, {
      name: "showPasswordLabel",
      type: "string",
      defaultValue: `"Mostrar contraseña"`,
      description: "Label accesible cuando está oculta."
    }, {
      name: "hidePasswordLabel",
      type: "string",
      defaultValue: `"Ocultar contraseña"`,
      description: "Label accesible cuando está visible."
    }, {
      name: "onPasswordVisibilityChange",
      type: "(visible: boolean) => void",
      defaultValue: "undefined",
      description: "Se dispara al cambiar visibilidad."
    }, {
      name: "numberButtons",
      type: "boolean",
      defaultValue: "false",
      description: "Muestra botones +/- en type=\"number\"."
    }, {
      name: "numberLayout",
      type: `"horizontal" | "vertical"`,
      defaultValue: `"horizontal"`,
      description: "Posición de los botones number."
    }, {
      name: "onIncrement",
      type: "(value: number) => void",
      defaultValue: "undefined",
      description: "Se dispara al incrementar."
    }, {
      name: "onDecrement",
      type: "(value: number) => void",
      defaultValue: "undefined",
      description: "Se dispara al decrementar."
    }],
    notes: ["Input acepta atributos nativos de HTMLInputElement (type, value, onChange, disabled, readOnly, name, autoComplete).", "Dentro de FormControl, prefiere `controlId` + `<Label>` sin repetir manualmente `htmlFor`/`id`.", "type=\"search\" activa clearButton; type=\"password\" activa passwordToggle. Sobrescribible con props explícitas.", "Ctrl + Espacio limpia el input cuando hay contenido."]
  }]
};
