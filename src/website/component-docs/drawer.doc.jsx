/* eslint-disable react-refresh/only-export-components */
import { Button, Drawer } from "@/lib";
const DRAWER_PREVIEW_CODE = `import { Drawer, Button } from "quickit-ui";

export function DrawerPreview() {
  return (
    <Drawer>
      <Drawer.Trigger>
        <Button>Ver detalles</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Actividad</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>Contenido del drawer.</Drawer.Body>
        <Drawer.Actions>
          <Drawer.Action variant="outline">Cerrar</Drawer.Action>
        </Drawer.Actions>
      </Drawer.Content>
    </Drawer>
  );
}`;
function DrawerPreviewCanvas() {
  return <Drawer>
      <Drawer.Trigger asChild>
        <Button color="neutral">Ver detalles</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Actividad</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>Contenido del drawer.</Drawer.Body>
        <Drawer.Actions>
          <Drawer.Action variant="outline">Cerrar</Drawer.Action>
        </Drawer.Actions>
      </Drawer.Content>
    </Drawer>;
}
export const drawerDoc = {
  name: "Drawer",
  description: "Panel lateral o inferior con overlay, header y acciones.",
  previewCode: DRAWER_PREVIEW_CODE,
  preview: <DrawerPreviewCanvas />,
  installCode: `import { Drawer } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-configuracion",
    title: "Panel de configuración",
    description: "Ejemplo realista de panel de configuración lateral.",
    preview: <Drawer placement="right" size="w-96">
          <Drawer.Trigger asChild>
            <Button color="neutral">Configuración</Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Configuración</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Modo oscuro</span>
                  <div className="w-10 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notificaciones</span>
                  <div className="w-10 h-6 rounded-full bg-neutral-900 dark:bg-white" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sonido</span>
                  <div className="w-10 h-6 rounded-full bg-neutral-900 dark:bg-white" />
                </div>
              </div>
            </Drawer.Body>
            <Drawer.Actions>
              <Drawer.Action variant="outline">Cancelar</Drawer.Action>
              <Drawer.Action color="primary">Guardar</Drawer.Action>
            </Drawer.Actions>
          </Drawer.Content>
        </Drawer>,
    code: `import { Button, Drawer } from "quickit-ui";

export function DrawerConfiguracion() {
  return (
    <Drawer placement="right" size="w-96">
      <Drawer.Trigger asChild>
        <Button color="neutral">Configuración</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Configuración</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Modo oscuro</span>
              <div className="w-10 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Notificaciones</span>
              <div className="w-10 h-6 rounded-full bg-neutral-900 dark:bg-white" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Sonido</span>
              <div className="w-10 h-6 rounded-full bg-neutral-900 dark:bg-white" />
            </div>
          </div>
        </Drawer.Body>
        <Drawer.Actions>
          <Drawer.Action variant="outline">Cancelar</Drawer.Action>
          <Drawer.Action color="primary">Guardar</Drawer.Action>
        </Drawer.Actions>
      </Drawer.Content>
    </Drawer>
  );
}`
  }, {
    id: "ejemplos-filtros",
    title: "Panel de filtros móvil",
    description: "Ejemplo realista de panel de filtros inferior para móvil.",
    preview: <Drawer placement="bottom" size="h-[80vh]">
          <Drawer.Trigger asChild>
            <Button color="neutral">Filtros</Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Filtrar productos</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Categoría</label>
                  <select className="rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
                    <option>Todas</option>
                    <option>Electrónicos</option>
                    <option>Ropa</option>
                    <option>Hogar</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Precio máximo</label>
                  <input type="range" className="w-full" />
                  <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span>$0</span>
                    <span>$500</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Calificación</label>
                  <div className="flex gap-2">
                    <span className="text-sm">⭐⭐⭐⭐⭐</span>
                    <span className="text-sm">⭐⭐⭐⭐</span>
                    <span className="text-sm">⭐⭐⭐</span>
                  </div>
                </div>
              </div>
            </Drawer.Body>
            <Drawer.Actions>
              <Drawer.Action variant="outline">Limpiar</Drawer.Action>
              <Drawer.Action color="primary">Aplicar (12)</Drawer.Action>
            </Drawer.Actions>
          </Drawer.Content>
        </Drawer>,
    code: `import { Button, Drawer } from "quickit-ui";

export function DrawerFiltros() {
  return (
    <Drawer placement="bottom" size="h-[80vh]">
      <Drawer.Trigger asChild>
        <Button color="neutral">Filtros</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Filtrar productos</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Categoría</label>
              <select className="rounded-lg border px-3 py-2 text-sm">
                <option>Todas</option>
                <option>Electrónicos</option>
                <option>Ropa</option>
                <option>Hogar</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Precio máximo</label>
              <input type="range" className="w-full" />
              <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span>$0</span>
                <span>$500</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Calificación</label>
              <div className="flex gap-2">
                <span className="text-sm">⭐⭐⭐⭐⭐</span>
                <span className="text-sm">⭐⭐⭐⭐</span>
                <span className="text-sm">⭐⭐⭐</span>
              </div>
            </div>
          </div>
        </Drawer.Body>
        <Drawer.Actions>
          <Drawer.Action variant="outline">Limpiar</Drawer.Action>
          <Drawer.Action color="primary">Aplicar (12)</Drawer.Action>
        </Drawer.Actions>
      </Drawer.Content>
    </Drawer>
  );
}`
  }, {
    id: "ejemplos-navegacion",
    title: "Navegación lateral",
    description: "Ejemplo realista de navegación lateral para dashboard.",
    preview: <Drawer placement="left" size="w-72">
          <Drawer.Trigger asChild>
            <Button color="neutral">Menú</Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Navegación</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-900 dark:text-neutral-50 bg-neutral-100 dark:bg-neutral-800">
                  <span>🏠</span> Dashboard
                </a>
                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                  <span>📊</span> Analíticas
                </a>
                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                  <span>👥</span> Usuarios
                </a>
                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                  <span>⚙️</span> Configuración
                </a>
              </nav>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer>,
    code: `import { Button, Drawer } from "quickit-ui";

export function DrawerNavegacion() {
  return (
    <Drawer placement="left" size="w-72">
      <Drawer.Trigger asChild>
        <Button color="neutral">Menú</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Navegación</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <nav className="flex flex-col gap-1">
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-neutral-100 dark:bg-neutral-800">
              <span>🏠</span> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900">
              <span>📊</span> Analíticas
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900">
              <span>👥</span> Usuarios
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900">
              <span>⚙️</span> Configuración
            </a>
          </nav>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  );
}`
  }, {
    id: "ejemplos-placements",
    title: "Placements",
    description: "Right, left, bottom y top.",
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Drawer placement="right">
            <Drawer.Trigger asChild><Button size="sm" variant="outline" color="neutral">Right</Button></Drawer.Trigger>
            <Drawer.Content><Drawer.Body>Drawer right</Drawer.Body></Drawer.Content>
          </Drawer>
          <Drawer placement="bottom">
            <Drawer.Trigger asChild><Button size="sm" variant="outline" color="neutral">Bottom</Button></Drawer.Trigger>
            <Drawer.Content><Drawer.Body>Drawer bottom</Drawer.Body></Drawer.Content>
          </Drawer>
        </div>,
    code: `import { Button, Drawer } from "quickit-ui";

export function DrawerPlacements() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Drawer placement="right">
        <Drawer.Trigger>
          <Button size="sm" variant="outline" color="neutral">Right</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Body>Drawer right</Drawer.Body>
        </Drawer.Content>
      </Drawer>
      <Drawer placement="bottom">
        <Drawer.Trigger>
          <Button size="sm" variant="outline" color="neutral">Bottom</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Body>Drawer bottom</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    </div>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "placement",
      type: `"right" | "left" | "bottom" | "top"`,
      defaultValue: `"right"`,
      description: "Ubicación del panel."
    }, {
      name: "size",
      type: "string",
      defaultValue: "auto",
      description: "Clase para ancho/alto máximo."
    }, {
      name: "open",
      type: "boolean",
      defaultValue: "undefined",
      description: "Controla la apertura."
    }, {
      name: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Apertura inicial."
    }, {
      name: "onOpenChange",
      type: "(open) => void",
      defaultValue: "undefined",
      description: "Callback de apertura."
    }, {
      name: "closeOnEscape",
      type: "boolean",
      defaultValue: "true",
      description: "Cerrar con Escape."
    }, {
      name: "outsideClick",
      type: "boolean",
      defaultValue: "true",
      description: "Cierra al click fuera."
    }, {
      name: "showCloseButton",
      type: "boolean",
      defaultValue: "true",
      description: "Botón de cierre."
    }, {
      name: "onBeforeClose",
      type: "() => boolean | Promise<boolean | void>",
      defaultValue: "undefined",
      description: "Bloquea cierre si retorna false."
    }],
    notes: ["Drawer.Trigger acepta asChild para componer con Button.", "Para navegación lateral usa placement right/left; para sheet móvil usa bottom/top."]
  }]
};
