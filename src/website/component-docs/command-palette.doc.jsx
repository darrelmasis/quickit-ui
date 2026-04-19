/* eslint-disable react-refresh/only-export-components */
import { Button, CommandPalette } from "@/lib";
import { useState } from "react";
function CommandPaletteDocPreview() {
  const [open, setOpen] = useState(false);
  return <div className="space-y-3">
      <Button type="button" onClick={() => setOpen(true)}>
        Abrir paleta (o Ctrl+K)
      </Button>
      <CommandPalette open={open} onOpenChange={setOpen} groups={[{
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
  description: "Paleta de comandos con búsqueda, basada en `Modal`. Registra atajo Ctrl+K / Cmd+K.",
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
  usageCode: `import { CommandPalette } from "quickit-ui";

export function CommandPaletteUsage() {
  return (
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
      name: "shortcutLabel",
      type: "string",
      defaultValue: `"Ctrl+K"`,
      description: "Texto mostrado junto al título (solo informativo)."
    }],
    notes: ["El atajo global se registra mientras el componente está montado.", "Evita montar varias paletas a la vez con el mismo atajo."]
  }]
};
