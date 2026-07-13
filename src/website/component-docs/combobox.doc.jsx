/* eslint-disable react-refresh/only-export-components */
import { Combobox } from "@/lib";
import { useState } from "react";
function ComboboxDocPreview() {
  const [value, setValue] = useState("es");
  return <Combobox value={value} onValueChange={setValue} options={[{
    value: "es",
    label: "Español"
  }, {
    value: "en",
    label: "English"
  }, {
    value: "fr",
    label: "Français"
  }]} placeholder="Idioma" />;
}
function ComboboxBasicoEjemplo() {
  const [value, setValue] = useState("");
  return <Combobox value={value} onValueChange={setValue} options={[
    { value: "es", label: "Español" },
    { value: "en", label: "English" },
    { value: "fr", label: "Français" },
  ]} placeholder="Selecciona un idioma" />;
}
export const comboboxDoc = {
  name: "Combobox",
  description: "Campo de texto con lista filtrable y selección.",
  previewCode: `import { Combobox } from "quickit-ui";

export function ComboboxPreview() {
  return (
    <Combobox
      placeholder="Buscar idioma"
      options={[
        { value: "es", label: "Español" },
        { value: "en", label: "English" },
      ]}
    />
  );
}`,
  preview: <ComboboxDocPreview />,
  installCode: `import { Combobox } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Combobox controlado con options.",
    preview: <ComboboxBasicoEjemplo />,
    code: `import { Combobox } from "quickit-ui";
import { useState } from "react";

export function ComboboxBasico() {
  const [value, setValue] = useState("");
  return (
    <Combobox
      value={value}
      onValueChange={setValue}
      options={[
        { value: "es", label: "Español" },
        { value: "en", label: "English" },
        { value: "fr", label: "Français" },
      ]}
      placeholder="Selecciona un idioma"
    />
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "options",
      type: "{ value, label, textValue?, disabled? }[]",
      defaultValue: "[]",
      description: "Lista de opciones."
    }, {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      defaultValue: `"md"`,
      description: "Tamaño del input."
    }, {
      name: "color",
      type: `"primary" | "secondary" | "neutral" | "success" | "warning" | "danger" | "info" | "light" | "dark"`,
      defaultValue: `"neutral"`,
      description: "Color del input."
    }, {
      name: "value / defaultValue",
      type: "string",
      defaultValue: "undefined",
      description: "Valor controlado o inicial."
    }, {
      name: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "undefined",
      description: "Callback al seleccionar."
    }, {
      name: "onInputChange",
      type: "(query: string, event) => void",
      defaultValue: "undefined",
      description: "Callback al escribir."
    }, {
      name: "placeholder",
      type: "string",
      defaultValue: "undefined",
      description: "Placeholder del input."
    }, {
      name: "emptyText",
      type: "string",
      defaultValue: `"Sin resultados"`,
      description: "Mensaje sin coincidencias."
    }, {
      name: "clearButton",
      type: "boolean",
      defaultValue: "true",
      description: "Botón para limpiar."
    }, {
      name: "usePortal",
      type: "boolean",
      defaultValue: "true",
      description: "Renderiza lista en portal."
    }],
    notes: ["label puede ser ReactNode. Si no es texto plano, usa textValue para búsqueda.", "onInputChange y onValueChange son distintos: el primero es texto escrito, el segundo opción seleccionada.", "Integración con FormControl para id, invalid y mensajes."]
  }]
};
