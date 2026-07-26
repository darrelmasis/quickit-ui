/* eslint-disable react-refresh/only-export-components */
import { Tabs } from "@/lib";
import { QUICKIT_CONTROL_SIZES, QUICKIT_SEMANTIC_COLORS } from "@/lib/tokens";
const TABS_PREVIEW_CODE = `import { Tabs } from "quickit-ui";

export function TabsPreview() {
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
    </div>;
}
export const tabsDoc = {
  name: "Tabs",
  description: "Navegación por paneles con teclado y modo manual.",
  previewCode: TABS_PREVIEW_CODE,
  preview: <TabsPreviewCanvas />,
  installCode: `import { Tabs } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-dashboard",
    title: "Dashboard",
    description: "Ejemplo realista de tabs en un dashboard.",
    preview: <div className="w-full max-w-lg">
        <Tabs defaultValue="overview">
          <Tabs.List>
            <Tabs.Trigger value="overview">Resumen</Tabs.Trigger>
            <Tabs.Trigger value="analytics">Analíticas</Tabs.Trigger>
            <Tabs.Trigger value="reports">Reportes</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview">
            <div className="p-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Vista general de tu actividad reciente.</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                  <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">1,234</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Visitas hoy</p>
                </div>
                <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                  <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">89</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Nuevos usuarios</p>
                </div>
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content value="analytics">
            <div className="p-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Análisis detallado de métricas y tendencias.</p>
            </div>
          </Tabs.Content>
          <Tabs.Content value="reports">
            <div className="p-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Reportes generados y exportaciones.</p>
            </div>
          </Tabs.Content>
        </Tabs>
      </div>,
    code: `import { Tabs } from "quickit-ui";

export function TabsDashboard() {
  return (
    <Tabs defaultValue="overview">
      <Tabs.List>
        <Tabs.Trigger value="overview">Resumen</Tabs.Trigger>
        <Tabs.Trigger value="analytics">Analíticas</Tabs.Trigger>
        <Tabs.Trigger value="reports">Reportes</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">
        <div className="p-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Vista general de tu actividad reciente.</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">1,234</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Visitas hoy</p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">89</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Nuevos usuarios</p>
            </div>
          </div>
        </div>
      </Tabs.Content>
      <Tabs.Content value="analytics">
        <div className="p-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Análisis detallado de métricas y tendencias.</p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="reports">
        <div className="p-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Reportes generados y exportaciones.</p>
        </div>
      </Tabs.Content>
    </Tabs>
  );
}`
  }, {
    id: "ejemplos-configuracion",
    title: "Configuración",
    description: "Ejemplo realista de tabs en configuración de cuenta.",
    preview: <div className="w-full max-w-lg">
        <Tabs defaultValue="perfil">
          <Tabs.List>
            <Tabs.Trigger value="perfil">Perfil</Tabs.Trigger>
            <Tabs.Trigger value="seguridad">Seguridad</Tabs.Trigger>
            <Tabs.Trigger value="notificaciones">Notificaciones</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="perfil">
            <div className="p-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-50">Juan Pérez</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">juan@ejemplo.com</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Nombre completo</label>
                  <input type="text" defaultValue="Juan Pérez" className="rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100" />
                </div>
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content value="seguridad">
            <div className="p-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Configura tu contraseña y autenticación de dos factores.</p>
            </div>
          </Tabs.Content>
          <Tabs.Content value="notificaciones">
            <div className="p-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Administra tus preferencias de notificaciones.</p>
            </div>
          </Tabs.Content>
        </Tabs>
      </div>,
    code: `import { Tabs } from "quickit-ui";

export function TabsConfiguracion() {
  return (
    <Tabs defaultValue="perfil">
      <Tabs.List>
        <Tabs.Trigger value="perfil">Perfil</Tabs.Trigger>
        <Tabs.Trigger value="seguridad">Seguridad</Tabs.Trigger>
        <Tabs.Trigger value="notificaciones">Notificaciones</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="perfil">
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-full bg-neutral-200 dark:bg-neutral-700" />
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">Juan Pérez</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">juan@ejemplo.com</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Nombre completo</label>
              <input type="text" defaultValue="Juan Pérez" className="rounded-lg border px-3 py-2 text-sm" />
            </div>
          </div>
        </div>
      </Tabs.Content>
      <Tabs.Content value="seguridad">
        <div className="p-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Configura tu contraseña y autenticación de dos factores.</p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="notificaciones">
        <div className="p-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Administra tus preferencias de notificaciones.</p>
        </div>
      </Tabs.Content>
    </Tabs>
  );
}`
  }, {
    id: "ejemplos-basico",
    title: "Básico",
    description: "Tabs simples con contenido.",
    preview: <div className="w-full max-w-md">
        <Tabs defaultValue="overview">
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview">Resumen de la cuenta.</Tabs.Content>
          <Tabs.Content value="stats">Métricas de uso.</Tabs.Content>
        </Tabs>
      </div>,
    code: `import { Tabs } from "quickit-ui";

export function TabsBasico() {
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
}`
  }, {
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: `Sizes disponibles: ${QUICKIT_CONTROL_SIZES.join(", ")}.`,
    preview: <div className="flex flex-col gap-4">
          <Tabs defaultValue="a" size="xs">
            <Tabs.List><Tabs.Trigger value="a">Extra small</Tabs.Trigger><Tabs.Trigger value="b">Tabs</Tabs.Trigger></Tabs.List>
            <Tabs.Content value="a">Contenido xs.</Tabs.Content>
            <Tabs.Content value="b">Segundo panel.</Tabs.Content>
          </Tabs>
          <Tabs defaultValue="a" size="sm">
            <Tabs.List><Tabs.Trigger value="a">Small</Tabs.Trigger><Tabs.Trigger value="b">Tabs</Tabs.Trigger></Tabs.List>
            <Tabs.Content value="a">Contenido small.</Tabs.Content>
            <Tabs.Content value="b">Segundo panel.</Tabs.Content>
          </Tabs>
          <Tabs defaultValue="a" size="md">
            <Tabs.List><Tabs.Trigger value="a">Medium</Tabs.Trigger><Tabs.Trigger value="b">Tabs</Tabs.Trigger></Tabs.List>
            <Tabs.Content value="a">Contenido medium.</Tabs.Content>
            <Tabs.Content value="b">Segundo panel.</Tabs.Content>
          </Tabs>
          <Tabs defaultValue="a" size="lg">
            <Tabs.List><Tabs.Trigger value="a">Large</Tabs.Trigger><Tabs.Trigger value="b">Tabs</Tabs.Trigger></Tabs.List>
            <Tabs.Content value="a">Contenido large.</Tabs.Content>
            <Tabs.Content value="b">Segundo panel.</Tabs.Content>
          </Tabs>
          <Tabs defaultValue="a" size="xl">
            <Tabs.List><Tabs.Trigger value="a">Extra large</Tabs.Trigger><Tabs.Trigger value="b">Tabs</Tabs.Trigger></Tabs.List>
            <Tabs.Content value="a">Contenido xl.</Tabs.Content>
            <Tabs.Content value="b">Segundo panel.</Tabs.Content>
          </Tabs>
          <Tabs defaultValue="a" size="2xl">
            <Tabs.List><Tabs.Trigger value="a">2X large</Tabs.Trigger><Tabs.Trigger value="b">Tabs</Tabs.Trigger></Tabs.List>
            <Tabs.Content value="a">Contenido 2xl.</Tabs.Content>
            <Tabs.Content value="b">Segundo panel.</Tabs.Content>
          </Tabs>
        </div>,
    code: `import { Tabs } from "quickit-ui";

export function TabsTamanos() {
  return (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue="a" size="xs">
        <Tabs.List>
          <Tabs.Trigger value="a">Extra small</Tabs.Trigger>
          <Tabs.Trigger value="b">Tabs</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Contenido xs.</Tabs.Content>
        <Tabs.Content value="b">Segundo panel.</Tabs.Content>
      </Tabs>
      <Tabs defaultValue="a" size="sm">
        <Tabs.List>
          <Tabs.Trigger value="a">Small</Tabs.Trigger>
          <Tabs.Trigger value="b">Tabs</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Contenido small.</Tabs.Content>
        <Tabs.Content value="b">Segundo panel.</Tabs.Content>
      </Tabs>
      <Tabs defaultValue="a" size="md">
        <Tabs.List>
          <Tabs.Trigger value="a">Medium</Tabs.Trigger>
          <Tabs.Trigger value="b">Tabs</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Contenido medium.</Tabs.Content>
        <Tabs.Content value="b">Segundo panel.</Tabs.Content>
      </Tabs>
      <Tabs defaultValue="a" size="lg">
        <Tabs.List>
          <Tabs.Trigger value="a">Large</Tabs.Trigger>
          <Tabs.Trigger value="b">Tabs</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Contenido large.</Tabs.Content>
        <Tabs.Content value="b">Segundo panel.</Tabs.Content>
      </Tabs>
      <Tabs defaultValue="a" size="xl">
        <Tabs.List>
          <Tabs.Trigger value="a">Extra large</Tabs.Trigger>
          <Tabs.Trigger value="b">Tabs</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Contenido xl.</Tabs.Content>
        <Tabs.Content value="b">Segundo panel.</Tabs.Content>
      </Tabs>
      <Tabs defaultValue="a" size="2xl">
        <Tabs.List>
          <Tabs.Trigger value="a">2X large</Tabs.Trigger>
          <Tabs.Trigger value="b">Tabs</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Contenido 2xl.</Tabs.Content>
        <Tabs.Content value="b">Segundo panel.</Tabs.Content>
      </Tabs>
    </div>
  );
}`
  }, {
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
        </Tabs>,
    code: `import { Tabs } from "quickit-ui";

export function TabsVertical() {
  return (
    <Tabs defaultValue="overview" orientation="vertical">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">Resumen</Tabs.Content>
      <Tabs.Content value="stats">Métricas</Tabs.Content>
    </Tabs>
  );
}`
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
        </Tabs>,
    code: `import { Tabs } from "quickit-ui";

export function TabsManual() {
  return (
    <Tabs defaultValue="overview" activationMode="manual">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">Resumen</Tabs.Content>
      <Tabs.Content value="stats">Métricas</Tabs.Content>
    </Tabs>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "defaultValue", type: "string", defaultValue: "undefined", description: "Tab inicial."
    }, {
      name: "value", type: "string", defaultValue: "undefined", description: "Controla el tab activo."
    }, {
      name: "onValueChange", type: "(value) => void", defaultValue: "undefined", description: "Callback al cambiar tab."
    }, {
      name: "orientation", type: `"horizontal" | "vertical"`, defaultValue: `"horizontal"`, description: "Orientación."
    }, {
      name: "activationMode", type: `"automatic" | "manual"`, defaultValue: `"automatic"`, description: "Modo de activación con teclado."
    }, {
      name: "size", type: "QuickitTabSize", defaultValue: `"md"`, description: "Tamaño visual."
    }, {
      name: "color", type: "QuickitSemanticColor", defaultValue: `"neutral"`, description: "Color activo."
    }],
    notes: ["Tabs.Trigger requiere prop value.", "Tabs.Content acepta forceMount.", "Pasa siempre defaultValue o value para que exista un tab seleccionado desde el primer render."]
  }]
};
