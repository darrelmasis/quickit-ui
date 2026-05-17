/* eslint-disable react-refresh/only-export-components */
import { Tabs } from "@/lib";
const TABS_PREVIEW_CODE = `import { Tabs } from "quickit-ui";

export function TabsPreview() {
  return (
    <>
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">Resumen</Tabs.Content>
        <Tabs.Content value="stats">Métricas</Tabs.Content>
      </Tabs>
      <Tabs defaultValue="overview" size="sm">
        <Tabs.List>
          <Tabs.Trigger value="overview">Resumen</Tabs.Trigger>
          <Tabs.Trigger value="team">Equipo</Tabs.Trigger>
          <Tabs.Trigger value="billing">Pago</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">Contenido corto.</Tabs.Content>
        <Tabs.Content value="team">Miembros.</Tabs.Content>
        <Tabs.Content value="billing">Métodos.</Tabs.Content>
      </Tabs>
    </>
  );
}`;
function TabsPreviewCanvas() {
  return <div className="w-full max-w-md">
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">Resumen</Tabs.Content>
        <Tabs.Content value="stats">Métricas</Tabs.Content>
      </Tabs>
      <Tabs defaultValue="overview" size="sm">
        <Tabs.List>
          <Tabs.Trigger value="overview">Resumen</Tabs.Trigger>
          <Tabs.Trigger value="team">Equipo</Tabs.Trigger>
          <Tabs.Trigger value="billing">Pago</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">Contenido corto.</Tabs.Content>
        <Tabs.Content value="team">Miembros.</Tabs.Content>
        <Tabs.Content value="billing">Métodos.</Tabs.Content>
      </Tabs>
    </div>;
}
export const tabsDoc = {
  name: "Tabs",
  description: "Navegación por paneles con teclado y modo manual.",
  previewCode: TABS_PREVIEW_CODE,
  preview: <TabsPreviewCanvas />,
  installCode: `import { Tabs } from "quickit-ui";`,
  usageCode: `import { Tabs } from "quickit-ui";

export function TabsUsage() {
  return (
    <Tabs defaultValue="overview">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">Resumen</Tabs.Content>
      <Tabs.Content value="stats">Métricas</Tabs.Content>
    </Tabs>
  );
}`,
  examples: [{
    id: "ejemplos-orientacion",
    title: "Orientación vertical",
    description: "Tabs puede orientarse verticalmente.",
    preview: <Tabs defaultValue="overview" orientation="vertical">
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview">Resumen</Tabs.Content>
          <Tabs.Content value="stats">Métricas</Tabs.Content>
        </Tabs>
  }, {
    id: "ejemplos-manual",
    title: "Activación manual",
    description: "El tab cambia al presionar Enter/Space.",
    preview: <Tabs defaultValue="overview" activationMode="manual">
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview">Resumen</Tabs.Content>
          <Tabs.Content value="stats">Métricas</Tabs.Content>
        </Tabs>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "defaultValue",
      type: "string",
      defaultValue: "undefined",
      description: "Tab inicial."
    }, {
      name: "value",
      type: "string",
      defaultValue: "undefined",
      description: "Controla el tab activo."
    }, {
      name: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "undefined",
      description: "Callback al cambiar tab."
    }, {
      name: "orientation",
      type: `"horizontal" | "vertical"`,
      defaultValue: `"horizontal"`,
      description: "Orientación de la lista."
    }, {
      name: "activationMode",
      type: `"automatic" | "manual"`,
      defaultValue: `"automatic"`,
      description: "Modo de activación con teclado."
    }, {
      name: "size",
      type: "QuickitTabSize",
      defaultValue: `"md"`,
      description: "Tamaño visual del tab."
    }, {
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "Color activo."
    }],
    notes: ["Tabs.Trigger requiere prop value (TabsTrigger sigue exportado con nombre).", "Tabs.Content acepta forceMount.", "Pasa siempre `defaultValue` o `value` para que exista un tab seleccionado desde el primer render.", "Si necesitas handlers o atributos nativos extra en `Tabs.Trigger`, comprueba la versión de runtime que estás consumiendo porque la superficie HTML aún se está consolidando."]
  }]
};
