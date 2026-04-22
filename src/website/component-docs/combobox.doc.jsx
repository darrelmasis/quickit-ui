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
export const comboboxDoc = {
  name: "Combobox",
  description: "Campo de texto con lista filtrable y selección; útil cuando hay muchas opciones o búsqueda.",
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
  usageCode: `import { Combobox } from "quickit-ui";

export function ComboboxUsage() {
  return (
    <Combobox
      options={[
        { value: "a", label: "Opción A" },
        { value: "b", label: "Opción B" },
      ]}
      onInputChange={(query) => console.log("query", query)}
      onValueChange={(value) => console.log("value", value)}
      placeholder="Escribe para filtrar"
    />
  );
}`,
  examples: [{
    id: "ejemplos-props",
    title: "Props principales",
    props: [{
      name: "options",
      type: "{ value, label, disabled? }[]",
      defaultValue: "[]",
      description: "Opciones mostradas y filtrables por texto."
    }, {
      name: "value / defaultValue",
      type: "string",
      defaultValue: "undefined",
      description: "Valor controlado o inicial."
    }, {
      name: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "undefined",
      description: "Callback al elegir una opción."
    }, {
      name: "onInputChange",
      type: "(query: string, event) => void",
      defaultValue: "undefined",
      description: "Se ejecuta al escribir en el input; úsalo para analytics o filtrado remoto."
    }, {
      name: "name",
      type: "string",
      defaultValue: "undefined",
      description: "Serializa el valor seleccionado mediante hidden input."
    }, {
      name: "emptyText",
      type: "string",
      defaultValue: `"Sin resultados"`,
      description: "Mensaje cuando el filtro no coincide."
    }, {
      name: "clearButton",
      type: "boolean",
      defaultValue: "true",
      description: "Muestra un botón para limpiar la selección actual."
    }, {
      name: "onClear",
      type: "() => void",
      defaultValue: "undefined",
      description: "Se ejecuta cuando el usuario limpia manualmente el combobox."
    }],
    notes: ["`onInputChange` y `onValueChange` no significan lo mismo: el primero refleja texto escrito; el segundo, la opción finalmente seleccionada.", "El filtrado es por subcadena insensible a mayúsculas en `label`.", "Integración con `FormControl` para `id`, invalid y mensajes."]
  }]
};
