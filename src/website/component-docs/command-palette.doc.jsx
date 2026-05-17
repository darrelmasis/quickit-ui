/* eslint-disable react-refresh/only-export-components */
import { Button, CommandPalette } from "@/lib";
import { useState } from "react";
function CommandPaletteDocPreview() {
  const [open, setOpen] = useState(false);
  return <div className="space-y-3">
      <Button type="button" onClick={() => setOpen(true)}>
        Abrir paleta (o Ctrl+K)
      </Button>
      <CommandPalette open={open} onOpenChange={setOpen} shortcutEnabled={false} groups={[{
      heading: "Acciones",
      items: [{
        id: "home",
        label: "Ir al inicio",
        onSelect: () => {}
      }, {
        id: "search",
        label: "Buscar",
        keywords: ["find", "buscar"],
        onSelect: () => {}
      }]
    }]} />
    </div>;
}
export const commandPaletteDoc = {
  name: "CommandPalette",
  description: "Paleta de comandos con búsqueda, basada en `Modal`. Puede registrar atajo Ctrl+K / Cmd+K como paleta principal de la página.",
  previewCode: `import { CommandPalette } from "quickit-ui";

export function CommandPalettePreview() {
  return (
    <CommandPalette
      open={false}
      onOpenChange={() => {}}
      groups={[{ heading: "General", items: [{ id: "1", label: "Inicio" }] }]}
    />
  );
}`,
  preview: <CommandPaletteDocPreview />,
  installCode: `import { CommandPalette } from "quickit-ui";`,
  usageCode: `import { useState } from "react";
import { Button, CommandPalette } from "quickit-ui";

export function CommandPaletteUsage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir paleta</Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={[
          {
            heading: "Acciones",
            items: [{ id: "x", label: "Salir", onSelect: () => {} }],
          },
        ]}
      />
    </>
  );
}`,
  examples: [{
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "open / onOpenChange",
      type: "boolean / función",
      defaultValue: "undefined",
      description: "Control del modal de la paleta."
    }, {
      name: "groups",
      type: "{ heading?, items: { id, label, keywords?, onSelect? }[] }[]",
      defaultValue: "[]",
      description: "Comandos agrupados y filtrables por texto o keywords."
    }, {
      name: "title",
      type: "ReactNode",
      defaultValue: `"Comandos"`,
      description: "Título del modal en el header de la paleta."
    }, {
      name: "placeholder",
      type: "string",
      defaultValue: `"Buscar comando…"`,
      description: "Placeholder del input de búsqueda."
    }, {
      name: "emptyText",
      type: "string",
      defaultValue: `"Sin resultados"`,
      description: "Texto mostrado cuando ningún item coincide con la búsqueda."
    }, {
      name: "headerTrailing",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Contenido opcional alineado a la derecha del header."
    }, {
      name: "shortcutLabel",
      type: "string",
      defaultValue: `"Ctrl+K"`,
      description: "Texto mostrado junto al título (solo informativo)."
    }, {
      name: "shortcutEnabled",
      type: "boolean",
      defaultValue: "true",
      description: "Registra el atajo global Ctrl+K / Cmd+K. Desactívalo en instancias secundarias o demos embebidas."
    }, {
      name: "autoFocusOnOpen",
      type: "boolean",
      defaultValue: "true",
      description: "Enfoca y selecciona el input de búsqueda al abrir la paleta."
    }],
    notes: ["El atajo global se registra mientras el componente está montado.", "La librería evita que se abran todas a la vez: solo una instancia dueña del shortcut responde al atajo global.", "Cada instancia genera IDs internos únicos para `aria-controls` y `aria-activedescendant`, incluso si repites ids de comandos en grupos distintos.", "Aun así, la recomendación práctica es tener una sola paleta global por página y usar `shortcutEnabled={false}` en instancias secundarias o previews.", "En demos embebidas dentro de docs o dashboards con varios overlays, suele convenir abrirla con un botón y desactivar el shortcut global localmente."]
  }]
};
