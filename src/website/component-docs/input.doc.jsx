/* eslint-disable react-refresh/only-export-components */
import { FormControl, Input, Label } from "@/lib";
const INPUT_PREVIEW_CODE = `import { Input } from "quickit-ui";

export function InputPreview() {
  return <Input placeholder="tu@email.com" />;
}`;
function InputPreviewCanvas() {
  return <div className="w-full max-w-md space-y-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="doc-input">Correo</Label>
          <Input id="doc-input" type="email" placeholder="tu@email.com" size="md" />
        </div>
      </div>
    </div>;
}
export const inputDoc = {
  name: "Input",
  description: "Campo base con soporte para search, password, clear button y elementos laterales.",
  previewCode: INPUT_PREVIEW_CODE,
  preview: <InputPreviewCanvas />,
  installCode: `import { Input } from "quickit-ui";`,
  usageCode: `import { Input } from "quickit-ui";

export function InputUsage() {
  return (
    <Input
      type="search"
      placeholder="Buscar"
      clearButton
      leftElement={<span>@</span>}
    />
  );
}`,
  examples: [{
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: "Sizes disponibles: sm, md, lg.",
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </div>
  }, {
    id: "ejemplos-elementos",
    title: "Elementos laterales",
    description: "Usa leftElement y rightElement.",
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Input leftElement={<span>@</span>} placeholder="Usuario" />
          <Input rightElement={<span className="text-xs">CTA</span>} placeholder="Buscar" />
        </div>
  }, {
    id: "ejemplos-password",
    title: "Password",
    description: "Activa passwordToggle para mostrar/ocultar.",
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Input type="password" placeholder="••••••" passwordToggle />
          <Input type="password" placeholder="••••••" passwordToggle defaultPasswordVisible />
        </div>
  }, {
    id: "ejemplos-clear",
    title: "Clear button",
    description: "Ideal para inputs search.",
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Input type="search" placeholder="Buscar" clearButton />
          <Input type="search" placeholder="Filtro" clearButton clearButtonLabel="Limpiar" />
        </div>
  }, {
    id: "ejemplos-formcontrol",
    title: "Con FormControl",
    description: "Útil para mensajes de error y required.",
    preview: <FormControl invalid required>
          <Label htmlFor="doc-email">Correo</Label>
          <Input id="doc-email" type="email" placeholder="tu@email.com" />
          <FormControl.Message>El correo es obligatorio.</FormControl.Message>
        </FormControl>
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
    }],
    notes: ["Input acepta atributos nativos de HTMLInputElement (type, value, onChange, disabled, readOnly, name, autoComplete).", "type=\"search\" activa clearButton automáticamente; type=\"password\" activa passwordToggle. Puedes sobrescribirlo con props.", "Ctrl + Espacio limpia el input cuando hay contenido."]
  }]
};
