/* eslint-disable react-refresh/only-export-components */
import { Button, CommandPalette } from "@/lib";
import { useState } from "react";
function CommandPaletteDocPreview() {
  const [open, setOpen] = useState(false);
  return <div className="flex flex-col gap-3">
      <Button type="button" onClick={() => setOpen(true)}>
        Abrir paleta (o Ctrl+K)
      </Button>
      <CommandPalette open={open} onOpenChange={setOpen} shortcutEnabled={false} groups={[{
      heading: "Acciones",
      items: [{ id: "home", label: "Ir al inicio", onSelect: () => {} }, { id: "search", label: "Buscar", keywords: ["find", "buscar"], onSelect: () => {} }]
    }]} />
    </div>;
}
function CommandPaletteBasicoEjemplo() {
  const [open, setOpen] = useState(false);
  return <div className="flex flex-col gap-3">
      <Button type="button" onClick={() => setOpen(true)}>Abrir paleta</Button>
      <CommandPalette open={open} onOpenChange={setOpen} shortcutEnabled={false} groups={[{
      heading: "Acciones",
      items: [{ id: "home", label: "Ir al inicio", onSelect: () => {} }, { id: "search", label: "Buscar", onSelect: () => {} }]
    }]} />
    </div>;
}
export const commandPaletteDoc = {
  name: "CommandPalette",
  description: "Paleta de comandos con búsqueda basada en Modal. Atajo Ctrl+K / Cmd+K.",
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
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Paleta de comandos con grupos e items.",
    preview: <CommandPaletteBasicoEjemplo />,
    code: `import { useState } from "react";
import { Button, CommandPalette } from "quickit-ui";

export function CommandPaletteBasico() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Button type="button" onClick={() => setOpen(true)}>
        Abrir paleta
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={[
          {
            heading: "Acciones",
            items: [
              { id: "home", label: "Ir al inicio", onSelect: () => {} },
              { id: "search", label: "Buscar", onSelect: () => {} },
            ],
          },
        ]}
      />
    </div>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "open / onOpenChange",
      type: "boolean / función",
      defaultValue: "undefined",
      description: "Control del modal."
    }, {
      name: "groups",
      type: "{ heading?, items: { id, label, keywords?, onSelect? }[] }[]",
      defaultValue: "[]",
      description: "Comandos agrupados y filtrables."
    }, {
      name: "title",
      type: "ReactNode",
      defaultValue: `"Comandos"`,
      description: "Título del header."
    }, {
      name: "placeholder",
      type: "string",
      defaultValue: `"Buscar comando…"`,
      description: "Placeholder del input."
    }, {
      name: "emptyText",
      type: "string",
      defaultValue: `"Sin resultados"`,
      description: "Texto sin coincidencias."
    }, {
      name: "shortcutEnabled",
      type: "boolean",
      defaultValue: "true",
      description: "Registra atajo global Ctrl+K."
    }, {
      name: "autoFocusOnOpen",
      type: "boolean",
      defaultValue: "true",
      description: "Enfoca input al abrir."
    }],
    notes: ["El atajo global se registra mientras el componente está montado.", "Usa shortcutEnabled={false} en instancias secundarias.", "Recomendación: una sola paleta global por página."]
  }]
};
