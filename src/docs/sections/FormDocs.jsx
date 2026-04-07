import {
  Button,
  Checkbox,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
  FormControl,
  FormDescription,
  FormMessage,
  Input,
  InputGroup,
  InputGroupAction,
  InputGroupAddon,
  InputGroupItem,
  Label,
  Radio,
  Select,
  Switch,
  Textarea,
} from "@/lib";
import { CodeExample, PreviewPanel, PropsTable, SectionCard, SectionHeading } from "@/docs/components/DocsPrimitives";

const fieldColors = ["neutral", "slate", "zinc", "primary", "brand", "success", "danger", "warning", "info", "light", "dark", "black"];
const apis = {
  formControl: [
    { prop: "id", type: "string", defaultValue: "auto", description: "Base para conectar label, descripción, mensaje y control." },
    { prop: "invalid", type: "boolean", defaultValue: "false", description: "Marca el campo como inválido y propaga `aria-invalid`." },
    { prop: "required", type: "boolean", defaultValue: "false", description: "Marca el campo como requerido para `Label` y controles." },
    { prop: "disabled", type: "boolean", defaultValue: "false", description: "Deshabilita visualmente el grupo y sus controles conectados." },
  ],
  label: [
    { prop: "htmlFor", type: "string", defaultValue: "contexto actual", description: "Conecta manualmente el label con un control específico." },
    { prop: "optional", type: "boolean", defaultValue: "false", description: "Muestra indicador de campo opcional." },
    { prop: "requiredIndicator", type: "boolean", defaultValue: "true", description: "Oculta el asterisco cuando el campo es requerido." },
  ],
  input: [
    { prop: "size", type: "sm | md | lg", defaultValue: "md", description: "Controla altura y padding interno del campo." },
    { prop: "shape", type: "square | pill", defaultValue: "square", description: "Cambia la geometría del input. `square` usa el radio actual del sistema y `pill` lo vuelve totalmente redondeado." },
    { prop: "color", type: "neutral | slate | zinc | primary | brand | success | danger | warning | info | light | dark | black", defaultValue: "neutral", description: "Cambia borde, fondo y focus ring del campo. `neutral` mantiene la base premium; `slate`, `zinc`, `dark` y `black` cubren escalas neutras más explícitas." },
    { prop: "type", type: "string", defaultValue: "text", description: "Tipo nativo del input. `search` activa clear automático y `password` activa toggle de visibilidad." },
    { prop: "leftElement / rightElement", type: "ReactNode", defaultValue: "undefined", description: "Permite inyectar iconos o contenido visual en el lado izquierdo o derecho del campo sin salir del propio componente." },
    { prop: "clearButton / onClear / clearButtonLabel", type: "boolean / () => void / string", defaultValue: "auto en search / undefined / \"Limpiar búsqueda\"", description: "Permite mostrar, controlar y etiquetar el botón interno para limpiar búsquedas." },
    { prop: "passwordToggle / onPasswordVisibilityChange", type: "boolean / (visible) => void", defaultValue: "auto en password / undefined", description: "Permite mostrar u ocultar el toggle interno para contraseñas y escuchar cambios de visibilidad." },
    { prop: "actionShape", type: "square | circle", defaultValue: "circle", description: "Cambia la forma del botón interno de clear o visibility toggle. `circle` es la opción recomendada para icon buttons." },
    { prop: "clearIcon / showPasswordIcon / hidePasswordIcon", type: "ReactNode", defaultValue: "SVG interno / SVG interno / SVG interno", description: "Permite reemplazar el contenido visual del botón interno, por ejemplo con SVGs propios." },
    { prop: "invalid", type: "boolean", defaultValue: "false", description: "Aplica estado visual inválido fuera de `FormControl`." },
    { prop: "disabled", type: "boolean", defaultValue: "false", description: "Deshabilita interacción." },
  ],
  inputGroup: [
    { prop: "attached", type: "boolean", defaultValue: "false", description: "Fusiona los segmentos visualmente para que el grupo se vea como un solo campo dividido." },
    { prop: "layout", type: "inline | grid", defaultValue: "inline", description: "Permite trabajar tanto en fila como en grid para composiciones tipo tarjeta o campos segmentados." },
    { prop: "columns", type: "number | string", defaultValue: "undefined", description: "Define columnas cuando `layout=\"grid\"`, por ejemplo para tarjetas, fechas o OTP." },
    { prop: "size / shape / color", type: "sm | md | lg / square | pill / QuickitSemanticColor", defaultValue: "md / square / neutral", description: "Sirve como contexto visual para `Input`, `InputGroupAddon` y `InputGroupAction` dentro del grupo." },
    { prop: "fullWidth", type: "boolean", defaultValue: "true", description: "Expande el grupo a `w-full` para componer campos y acciones en una misma fila." },
    { prop: "children", type: "ReactNode", defaultValue: "-", description: "Contenido libre para agrupar `Input`, `InputGroupItem`, `InputGroupAddon` e `InputGroupAction`." },
  ],
  inputGroupItem: [
    { prop: "span", type: "number", defaultValue: "undefined", description: "Hace que el item ocupe varias columnas cuando el grupo está en `layout=\"grid\"`." },
    { prop: "grow", type: "boolean", defaultValue: "true", description: "Permite que el item crezca en layouts inline. Útil para inputs que deben ocupar el espacio principal." },
    { prop: "children", type: "ReactNode", defaultValue: "-", description: "Segmento libre para `Input` u otros elementos dentro del grupo." },
  ],
  inputGroupAddon: [
    { prop: "align", type: "start | center | end | inline-start | inline-end", defaultValue: "start", description: "Alinea el contenido pasivo dentro del segmento, por ejemplo iconos, prefijos o contadores." },
    { prop: "color / size / shape", type: "QuickitSemanticColor / sm | md | lg / square | pill", defaultValue: "heredado del grupo", description: "Permite sobrescribir la apariencia del addon respecto al contexto de `InputGroup`." },
    { prop: "children", type: "ReactNode", defaultValue: "-", description: "Contenido no interactivo como iconos, texto, prefijos o resultados. Si el segmento debe responder a click o teclado, usa `InputGroupAction`." },
  ],
  inputGroupAction: [
    { prop: "variant", type: "solid | outline | ghost", defaultValue: "solid", description: "Define el estilo visual de la acción cuando se usa como segmento interactivo del grupo. `InputGroupAction` reutiliza `Button` y renderiza un `<button>` real." },
    { prop: "color / size / shape", type: "QuickitSemanticColor / sm | md | lg / square | pill", defaultValue: "heredado del grupo", description: "Permite adaptar la acción al mismo sistema visual del resto del grupo." },
    { prop: "activeMotion", type: "boolean", defaultValue: "false", description: "Viene desactivado por defecto para que el grupo attached se sienta más estable." },
    { prop: "type / onClick / disabled", type: "\"button\" | \"submit\" | \"reset\" / (event) => void / boolean", defaultValue: "\"button\" / undefined / false", description: "Se comporta como cualquier botón nativo: participa en foco, teclado, submit de formularios y estados disabled." },
    { prop: "children", type: "ReactNode", defaultValue: "-", description: "Contenido interactivo del segmento, normalmente texto corto o un icono SVG." },
  ],
  textarea: [
    { prop: "minRows", type: "number", defaultValue: "4", description: "Define las filas iniciales del textarea." },
    { prop: "color", type: "neutral | slate | zinc | primary | brand | success | danger | warning | info | light | dark | black", defaultValue: "neutral", description: "Cambia borde, fondo y focus ring del textarea. `neutral` mantiene la base premium; `slate`, `zinc`, `dark` y `black` cubren escalas neutras más explícitas." },
    { prop: "invalid", type: "boolean", defaultValue: "false", description: "Aplica estado visual inválido." },
    { prop: "disabled", type: "boolean", defaultValue: "false", description: "Deshabilita interacción." },
  ],
  select: [
    { prop: "size", type: "sm | md | lg", defaultValue: "md", description: "Controla altura y densidad del trigger." },
    { prop: "color", type: "neutral | slate | zinc | primary | brand | success | danger | warning | info | light | dark | black", defaultValue: "neutral", description: "Cambia borde, fondo y focus ring del trigger. `neutral` mantiene la base premium; `slate`, `zinc`, `dark` y `black` cubren escalas neutras más explícitas." },
    { prop: "value / defaultValue", type: "string", defaultValue: "primer option disponible", description: "Permite modo controlado o no controlado." },
    { prop: "onValueChange", type: "(value: string) => void", defaultValue: "undefined", description: "Devuelve el valor seleccionado de forma directa." },
    { prop: "onChange", type: "(event) => void", defaultValue: "undefined", description: "Emite un evento compatible con formularios cuando cambia la selección." },
    { prop: "placeholder", type: "string", defaultValue: "\"Selecciona una opción\"", description: "Texto mostrado cuando no hay una opción seleccionada." },
    { prop: "invalid", type: "boolean", defaultValue: "false", description: "Aplica estado visual inválido." },
    { prop: "disabled / required / name", type: "boolean / boolean / string", defaultValue: "false / false / undefined", description: "Soporte para formularios nativos y validación." },
    { prop: "usePortal", type: "boolean", defaultValue: "true", description: "Controla si el panel se monta en portal." },
  ],
  checkbox: [
    { prop: "size", type: "sm | md", defaultValue: "md", description: "Ajusta el tamaño visual del box y del checkmark." },
    { prop: "color", type: "neutral | slate | zinc | primary | brand | success | danger | warning | info | light | dark | black", defaultValue: "neutral", description: "Controla el color del estado checked, manteniendo la misma familia visual que `Input`, `Select` y `Textarea`." },
    { prop: "checked / defaultChecked", type: "boolean", defaultValue: "false", description: "Modo controlado o no controlado usando la API nativa del input." },
    { prop: "onChange / onCheckedChange", type: "(event) => void / (checked, event) => void", defaultValue: "undefined", description: "Soporta el `onChange` nativo y un callback explícito con el valor booleano." },
    { prop: "label", type: "ReactNode", defaultValue: "undefined", description: "Renderiza internamente un `Label` asociado al checkbox." },
    { prop: "labelClassName", type: "string", defaultValue: "undefined", description: "Permite ajustar el estilo del label interno." },
    { prop: "containerClassName", type: "string", defaultValue: "undefined", description: "Ajusta el wrapper cuando control y label se renderizan juntos." },
    { prop: "invalid", type: "boolean", defaultValue: "false", description: "Prioriza el estado visual de error." },
    { prop: "disabled / required", type: "boolean / boolean", defaultValue: "false / false", description: "Estados soportados por el control." },
  ],
  radio: [
    { prop: "size", type: "sm | md", defaultValue: "md", description: "Ajusta el tamaño visual del radio y del punto interno." },
    { prop: "color", type: "neutral | slate | zinc | primary | brand | success | danger | warning | info | light | dark | black", defaultValue: "neutral", description: "Controla el color del punto activo con la misma semántica cromática de los demás fields." },
    { prop: "checked / defaultChecked / name", type: "boolean / boolean / string", defaultValue: "false / false / undefined", description: "Soporte para grupos nativos y modo controlado o no controlado." },
    { prop: "onChange / onCheckedChange", type: "(event) => void / (checked, event) => void", defaultValue: "undefined", description: "Soporta el `onChange` nativo y un callback explícito con el valor booleano." },
    { prop: "label", type: "ReactNode", defaultValue: "undefined", description: "Renderiza internamente un `Label` asociado al radio." },
    { prop: "labelClassName", type: "string", defaultValue: "undefined", description: "Permite ajustar el estilo del label interno." },
    { prop: "containerClassName", type: "string", defaultValue: "undefined", description: "Ajusta el wrapper cuando control y label se renderizan juntos." },
    { prop: "invalid", type: "boolean", defaultValue: "false", description: "Prioriza el estado visual de error." },
    { prop: "disabled / required", type: "boolean / boolean", defaultValue: "false / false", description: "Estados soportados por el control." },
  ],
  switch: [
    { prop: "size", type: "sm | md", defaultValue: "md", description: "Ajusta el tamaño del track y el thumb." },
    { prop: "color", type: "neutral | slate | zinc | primary | brand | success | danger | warning | info | light | dark | black", defaultValue: "neutral", description: "Controla el color del estado activo y se alinea con el resto de la paleta de formularios." },
    { prop: "label", type: "ReactNode", defaultValue: "undefined", description: "Renderiza internamente un `Label` asociado al switch." },
    { prop: "labelClassName", type: "string", defaultValue: "undefined", description: "Permite ajustar el estilo del label interno." },
    { prop: "containerClassName", type: "string", defaultValue: "undefined", description: "Ajusta el wrapper cuando control y label se renderizan juntos." },
    { prop: "checked / defaultChecked", type: "boolean", defaultValue: "false", description: "Modo controlado o no controlado." },
    { prop: "onChange / onCheckedChange", type: "(event) => void / (checked: boolean) => void", defaultValue: "undefined", description: "Expone un evento estructurado de cambio y un callback directo con el valor booleano." },
    { prop: "invalid / disabled / required / name", type: "boolean / boolean / boolean / string", defaultValue: "false / false / false / undefined", description: "Estados y compatibilidad con formularios nativos." },
  ],
};

const isVisible = (visibleIds, id) => !visibleIds || visibleIds.has(id);

export function FormDocs({ ui, visibleIds }) {
  return (
    <>
      {isVisible(visibleIds, "form-control") ? <SectionCard id="form-control" className={ui.divider}><SectionHeading category="Formularios" title="FormControl" description="Contenedor de contexto para enlazar `Label`, descripciones, mensajes y controles mediante ids accesibles." ui={ui} /><div className="mt-6"><PreviewPanel ui={ui} title="Campo conectado con descripción y error" className="max-w-xl" code={`<FormControl invalid required>\n  <Label>Correo del equipo</Label>\n  <Input type="email" placeholder="equipo@quickit.dev" />\n  <FormDescription>\n    Usa un correo compartido para notificaciones del proyecto.\n  </FormDescription>\n  <FormMessage>Este campo es obligatorio.</FormMessage>\n</FormControl>`}><FormControl invalid required><Label>Correo del equipo</Label><Input type="email" placeholder="equipo@quickit.dev" /><FormDescription>Usa un correo compartido para notificaciones del proyecto.</FormDescription><FormMessage>Este campo es obligatorio.</FormMessage></FormControl></PreviewPanel></div><div className="mt-8"><p className={`text-sm font-semibold ${ui.title}`}>API</p><PropsTable rows={apis.formControl} ui={ui} /></div></SectionCard> : null}

      {isVisible(visibleIds, "label") ? <SectionCard id="label" className={ui.divider}><SectionHeading category="Formularios" title="Label" description="Etiqueta base para campos, compatible tanto con ids manuales como con `FormControl`." ui={ui} /><PreviewPanel ui={ui} title="Label manual y con contexto" className="mt-6" code={`<div className="space-y-2">\n  <Label htmlFor="docs-label-basic">Nombre</Label>\n  <Input id="docs-label-basic" placeholder="Quickit UI" />\n</div>\n\n<FormControl required>\n  <Label>Proyecto</Label>\n  <Input placeholder="Dashboard interno" />\n</FormControl>`}><div className="flex flex-wrap items-center gap-6"><div className="space-y-2"><Label htmlFor="docs-label-basic">Nombre</Label><Input id="docs-label-basic" placeholder="Quickit UI" /></div><div className="space-y-2"><FormControl required><Label>Proyecto</Label><Input placeholder="Dashboard interno" /></FormControl></div></div></PreviewPanel><div className="mt-8 space-y-6"><div><p className={`text-sm font-semibold ${ui.title}`}>API</p><PropsTable rows={apis.label} ui={ui} /></div><CodeExample ui={ui} code={`<Label htmlFor="project-name">Proyecto</Label>\n<Input id="project-name" placeholder="Quickit UI" />`} /></div></SectionCard> : null}

      {isVisible(visibleIds, "input") ? (
        <SectionCard id="input" className={ui.divider}>
          <SectionHeading
            category="Formularios"
            title="Input"
            description="Campo de texto base con tamaños, estado inválido y soporte automático para `FormControl`."
            ui={ui}
          />
          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Tamaños"
              code={`<div className="flex flex-wrap items-center gap-3">\n  <Input size="sm" placeholder="Input pequeño" className="max-w-[180px]" />\n  <Input size="md" placeholder="Input mediano" className="max-w-[200px]" />\n  <Input size="lg" placeholder="Input grande" className="max-w-[220px]" />\n</div>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Input size="sm" placeholder="Input pequeño" className="max-w-[180px]" />
                <Input size="md" placeholder="Input mediano" className="max-w-[200px]" />
                <Input size="lg" placeholder="Input grande" className="max-w-[220px]" />
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Colores y focus ring"
              className="grid gap-3 md:grid-cols-3"
              code={`<div className="grid gap-3 md:grid-cols-3">\n  <Input color="neutral" defaultValue="neutral" />\n  <Input color="slate" defaultValue="slate" />\n  <Input color="zinc" defaultValue="zinc" />\n  <Input color="primary" defaultValue="primary" />\n  <Input color="brand" defaultValue="brand" />\n  <Input color="success" defaultValue="success" />\n  <Input color="danger" defaultValue="danger" />\n  <Input color="warning" defaultValue="warning" />\n  <Input color="info" defaultValue="info" />\n  <Input color="light" defaultValue="light" />\n  <Input color="dark" defaultValue="dark" />\n  <Input color="black" defaultValue="black" />\n</div>`}
            >
              <div className="grid gap-3 md:grid-cols-3">
                {fieldColors.map((color) => (
                  <Input key={color} color={color} defaultValue={color} />
                ))}
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Con FormControl e inválido"
              className="grid gap-4 md:grid-cols-2"
              code={`<FormControl>\n  <Label>Usuario</Label>\n  <Input placeholder="@quickit" />\n</FormControl>\n\n<FormControl invalid>\n  <Label>Correo</Label>\n  <Input type="email" placeholder="correo@dominio.com" />\n  <FormMessage>Ingresa un correo válido.</FormMessage>\n</FormControl>`}
            >
              <FormControl>
                <Label>Usuario</Label>
                <Input placeholder="@quickit" />
              </FormControl>

              <FormControl invalid>
                <Label>Correo</Label>
                <Input type="email" placeholder="correo@dominio.com" />
                <FormMessage>Ingresa un correo válido.</FormMessage>
              </FormControl>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Tipos comunes"
              className="grid gap-4 md:grid-cols-2"
              code={`<FormControl>\n  <Label>Buscar componente</Label>\n  <Input type="search" placeholder="Button, Modal, Input..." />\n</FormControl>\n\n<FormControl>\n  <Label>Clave temporal</Label>\n  <Input type="password" placeholder="••••••••" />\n</FormControl>`}
            >
              <FormControl>
                <Label>Buscar componente</Label>
                <Input type="search" placeholder="Button, Modal, Input..." />
              </FormControl>

              <FormControl>
                <Label>Clave temporal</Label>
                <Input type="password" placeholder="••••••••" />
              </FormControl>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Input type=search con clear"
              className="grid gap-4 md:grid-cols-2"
              code={`<FormControl>\n  <Label>Buscar en la librería</Label>\n  <Input type="search" defaultValue="Modal" placeholder="Busca por nombre o categoría" />\n</FormControl>\n\n<FormControl>\n  <Label>Búsqueda con botón de icono</Label>\n  <Input type="search" color="brand" actionShape="circle" defaultValue="Avatar" placeholder="Busca un componente" />\n</FormControl>`}
            >
              <FormControl>
                <Label>Buscar en la librería</Label>
                <Input type="search" defaultValue="Modal" placeholder="Busca por nombre o categoría" />
              </FormControl>

              <FormControl>
                <Label>Búsqueda con botón de icono</Label>
                <Input type="search" color="brand" actionShape="circle" defaultValue="Avatar" placeholder="Busca un componente" />
              </FormControl>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Input type=password con toggle"
              className="grid gap-4 md:grid-cols-2"
              code={`<FormControl>\n  <Label>Contraseña</Label>\n  <Input type="password" placeholder="••••••••" />\n</FormControl>\n\n<FormControl>\n  <Label>Acceso administrativo</Label>\n  <Input type="password" color="dark" actionShape="circle" placeholder="••••••••" />\n</FormControl>`}
            >
              <FormControl>
                <Label>Contraseña</Label>
                <Input type="password" placeholder="••••••••" />
              </FormControl>

              <FormControl>
                <Label>Acceso administrativo</Label>
                <Input type="password" color="dark" actionShape="circle" placeholder="••••••••" />
              </FormControl>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Shape e iconos"
              className="space-y-4"
              code={`<div className="space-y-4">\n  <Input\n    type="search"\n    shape="pill"\n    placeholder="Buscar en AVA"\n    leftElement={\n      <svg viewBox="0 0 20 20" fill="none" className="size-4">\n        <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />\n        <path d="M13.2 13.2 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />\n      </svg>\n    }\n  />\n\n  <Input\n    type="text"\n    color="slate"\n    placeholder="Proyecto actual"\n    leftElement={<span className="text-xs font-semibold">AVA</span>}\n    rightElement={<span className="text-xs">v0.1.17</span>}\n  />\n</div>`}
            >
              <div className="space-y-4">
                <Input
                  type="search"
                  shape="pill"
                  placeholder="Buscar en AVA"
                  leftElement={
                    <svg viewBox="0 0 20 20" fill="none" className="size-4">
                      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M13.2 13.2 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  }
                />

                <Input
                  type="text"
                  color="slate"
                  placeholder="Proyecto actual"
                  leftElement={<span className="text-xs font-semibold">AVA</span>}
                  rightElement={<span className="text-xs">v0.1.17</span>}
                />
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="InputGroup attached: addons pasivos y botones reales"
              className="space-y-4"
              code={`<div className="space-y-4">\n  <InputGroup attached shape="pill" color="dark">\n    <InputGroupAddon>\n      <svg viewBox="0 0 20 20" fill="none" className="size-4">\n        <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />\n        <path d="M13.2 13.2 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />\n      </svg>\n    </InputGroupAddon>\n    <Input type="search" placeholder="Buscar en AVA" />\n    <InputGroupAddon align="inline-end">12 resultados</InputGroupAddon>\n  </InputGroup>\n\n  <InputGroup attached color="zinc">\n    <InputGroupAddon>https://</InputGroupAddon>\n    <Input placeholder="quickit.dev" />\n    <InputGroupAction color="brand" onClick={() => console.log("ir")}>\n      Ir\n    </InputGroupAction>\n  </InputGroup>\n</div>`}
            >
              <div className="space-y-4">
                <InputGroup attached shape="pill" color="dark">
                  <InputGroupAddon>
                    <svg viewBox="0 0 20 20" fill="none" className="size-4">
                      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M13.2 13.2 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </InputGroupAddon>
                  <Input type="search" placeholder="Buscar en AVA" />
                  <InputGroupAddon align="inline-end">12 resultados</InputGroupAddon>
                </InputGroup>

                <InputGroup attached color="zinc">
                  <InputGroupAddon>https://</InputGroupAddon>
                  <Input placeholder="quickit.dev" />
                  <InputGroupAction color="brand" onClick={() => {}}>
                    Ir
                  </InputGroupAction>
                </InputGroup>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="InputGroup: toolbar, botones y grid"
              className="space-y-4"
              code={`<div className="space-y-4">\n  <InputGroup attached>\n    <InputGroupAction variant="outline" onClick={() => console.log("todo")}>\n      Todo\n    </InputGroupAction>\n    <Input placeholder="Filtra por nombre o etiqueta" />\n    <InputGroupAction variant="outline" onClick={() => console.log("estado")}>\n      Estado\n    </InputGroupAction>\n  </InputGroup>\n\n  <InputGroup attached layout="grid" columns={2} className="max-w-md">\n    <InputGroupItem span={2}>\n      <Input placeholder="Número de tarjeta" />\n    </InputGroupItem>\n    <InputGroupItem>\n      <Input placeholder="MM / YY" />\n    </InputGroupItem>\n    <InputGroupItem>\n      <Input placeholder="CVC" />\n    </InputGroupItem>\n  </InputGroup>\n</div>`}
            >
              <div className="space-y-4">
                <InputGroup attached>
                  <InputGroupAction variant="outline" onClick={() => {}}>
                    Todo
                  </InputGroupAction>
                  <Input placeholder="Filtra por nombre o etiqueta" />
                  <InputGroupAction variant="outline" onClick={() => {}}>
                    Estado
                  </InputGroupAction>
                </InputGroup>

                <InputGroup attached layout="grid" columns={2} className="max-w-md">
                  <InputGroupItem span={2}>
                    <Input placeholder="Número de tarjeta" />
                  </InputGroupItem>
                  <InputGroupItem>
                    <Input placeholder="MM / YY" />
                  </InputGroupItem>
                  <InputGroupItem>
                    <Input placeholder="CVC" />
                  </InputGroupItem>
                </InputGroup>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="InputGroup combinado con Dropdown"
              className="space-y-4"
              code={`<div className="space-y-4">\n  <InputGroup attached>\n    <Dropdown>\n      <DropdownTrigger asChild>\n        <InputGroupAction variant="outline">Estado</InputGroupAction>\n      </DropdownTrigger>\n      <DropdownContent className="w-44">\n        <DropdownItem>Todos</DropdownItem>\n        <DropdownItem>Activo</DropdownItem>\n        <DropdownItem>Pausado</DropdownItem>\n      </DropdownContent>\n    </Dropdown>\n    <Input placeholder="Filtra por nombre o etiqueta" />\n    <Dropdown>\n      <DropdownTrigger asChild>\n        <InputGroupAction variant="outline">Ordenar</InputGroupAction>\n      </DropdownTrigger>\n      <DropdownContent className="w-44">\n        <DropdownItem>Recientes</DropdownItem>\n        <DropdownItem>Nombre</DropdownItem>\n        <DropdownItem>Uso</DropdownItem>\n      </DropdownContent>\n    </Dropdown>\n  </InputGroup>\n\n  <InputGroup attached shape="pill" color="dark">\n    <Dropdown>\n      <DropdownTrigger asChild>\n        <InputGroupAction variant="outline">Componentes</InputGroupAction>\n      </DropdownTrigger>\n      <DropdownContent className="w-48">\n        <DropdownItem>Todos</DropdownItem>\n        <DropdownItem>Core</DropdownItem>\n        <DropdownItem>Formularios</DropdownItem>\n        <DropdownSeparator />\n        <DropdownItem variant="danger">Limpiar filtro</DropdownItem>\n      </DropdownContent>\n    </Dropdown>\n    <Input type="search" placeholder="Buscar en documentación" />\n  </InputGroup>\n</div>`}
            >
              <div className="space-y-4">
                <InputGroup attached>
                  <Dropdown>
                    <DropdownTrigger asChild>
                      <InputGroupAction variant="outline">Estado</InputGroupAction>
                    </DropdownTrigger>
                    <DropdownContent className="w-44">
                      <DropdownItem>Todos</DropdownItem>
                      <DropdownItem>Activo</DropdownItem>
                      <DropdownItem>Pausado</DropdownItem>
                    </DropdownContent>
                  </Dropdown>
                  <Input placeholder="Filtra por nombre o etiqueta" />
                  <Dropdown>
                    <DropdownTrigger asChild>
                      <InputGroupAction variant="outline">Ordenar</InputGroupAction>
                    </DropdownTrigger>
                    <DropdownContent className="w-44">
                      <DropdownItem>Recientes</DropdownItem>
                      <DropdownItem>Nombre</DropdownItem>
                      <DropdownItem>Uso</DropdownItem>
                    </DropdownContent>
                  </Dropdown>
                </InputGroup>

                <InputGroup attached shape="pill" color="dark">
                  <Dropdown>
                    <DropdownTrigger asChild>
                      <InputGroupAction variant="outline">Componentes</InputGroupAction>
                    </DropdownTrigger>
                    <DropdownContent className="w-48">
                      <DropdownItem>Todos</DropdownItem>
                      <DropdownItem>Core</DropdownItem>
                      <DropdownItem>Formularios</DropdownItem>
                      <DropdownSeparator />
                      <DropdownItem variant="danger">Limpiar filtro</DropdownItem>
                    </DropdownContent>
                  </Dropdown>
                  <Input type="search" placeholder="Buscar en documentación" />
                </InputGroup>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="InputGroup combinado con Select"
              className="space-y-4"
              code={`<div className="space-y-4">\n  <InputGroup>\n    <InputGroupItem className="w-[220px]" grow={false}>\n      <Select defaultValue="all" usePortal={false}>\n        <option value="all">Todos los componentes</option>\n        <option value="core">Core</option>\n        <option value="forms">Formularios</option>\n        <option value="overlays">Overlays</option>\n      </Select>\n    </InputGroupItem>\n    <Input placeholder="Busca por nombre, alias o etiqueta" />\n    <InputGroupAction color="brand">Aplicar</InputGroupAction>\n  </InputGroup>\n\n  <InputGroup attached>\n    <InputGroupItem className="w-[240px]" grow={false}>\n      <Select defaultValue="all">\n        <option value="all">Todos los componentes</option>\n        <option value="core">Core</option>\n        <option value="forms">Formularios</option>\n      </Select>\n    </InputGroupItem>\n    <Input type="search" placeholder="Buscar por nombre o alias" />\n    <InputGroupAction variant="outline">Ir</InputGroupAction>\n  </InputGroup>\n\n  <InputGroup>\n    <InputGroupItem className="w-[180px]" grow={false}>\n      <Select defaultValue="recent" usePortal={false}>\n        <option value="recent">Más recientes</option>\n        <option value="name">Nombre</option>\n        <option value="usage">Uso</option>\n      </Select>\n    </InputGroupItem>\n    <InputGroupItem className="w-[180px]" grow={false}>\n      <Select defaultValue="active" color="slate" usePortal={false}>\n        <option value="active">Activo</option>\n        <option value="draft">Borrador</option>\n        <option value="archived">Archivado</option>\n      </Select>\n    </InputGroupItem>\n    <Input placeholder="Filtra por responsable o funcionalidad" />\n  </InputGroup>\n</div>`}
            >
              <div className="space-y-4">
                <InputGroup>
                  <InputGroupItem className="w-[220px]" grow={false}>
                    <Select defaultValue="all" usePortal={false}>
                      <option value="all">Todos los componentes</option>
                      <option value="core">Core</option>
                      <option value="forms">Formularios</option>
                      <option value="overlays">Overlays</option>
                    </Select>
                  </InputGroupItem>
                  <Input placeholder="Busca por nombre, alias o etiqueta" />
                  <InputGroupAction color="brand">Aplicar</InputGroupAction>
                </InputGroup>

                <InputGroup attached>
                  <InputGroupItem className="w-[240px]" grow={false}>
                    <Select defaultValue="all">
                      <option value="all">Todos los componentes</option>
                      <option value="core">Core</option>
                      <option value="forms">Formularios</option>
                    </Select>
                  </InputGroupItem>
                  <Input type="search" placeholder="Buscar por nombre o alias" />
                  <InputGroupAction variant="outline">Ir</InputGroupAction>
                </InputGroup>

                <InputGroup>
                  <InputGroupItem className="w-[180px]" grow={false}>
                    <Select defaultValue="recent" usePortal={false}>
                      <option value="recent">Más recientes</option>
                      <option value="name">Nombre</option>
                      <option value="usage">Uso</option>
                    </Select>
                  </InputGroupItem>
                  <InputGroupItem className="w-[180px]" grow={false}>
                    <Select defaultValue="active" color="slate" usePortal={false}>
                      <option value="active">Activo</option>
                      <option value="draft">Borrador</option>
                      <option value="archived">Archivado</option>
                    </Select>
                  </InputGroupItem>
                  <Input placeholder="Filtra por responsable o funcionalidad" />
                </InputGroup>
              </div>
            </PreviewPanel>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>API</p>
              <PropsTable rows={apis.input} ui={ui} />
            </div>

            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>InputGroup</p>
              <PropsTable rows={apis.inputGroup} ui={ui} />
            </div>

            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>InputGroupItem</p>
              <PropsTable rows={apis.inputGroupItem} ui={ui} />
            </div>

            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>InputGroupAddon</p>
              <PropsTable rows={apis.inputGroupAddon} ui={ui} />
            </div>

            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>InputGroupAction</p>
              <PropsTable rows={apis.inputGroupAction} ui={ui} />
            </div>

            <CodeExample
              ui={ui}
              code={`<InputGroup attached shape="pill" color="dark">\n  <InputGroupAddon>\n    <svg viewBox="0 0 20 20" fill="none" className="size-4">\n      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />\n      <path d="M13.2 13.2 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />\n    </svg>\n  </InputGroupAddon>\n  <Input type="search" placeholder="Buscar en AVA" />\n  <InputGroupAddon align="inline-end">12 resultados</InputGroupAddon>\n</InputGroup>\n\n<InputGroup attached>\n  <Dropdown>\n    <DropdownTrigger asChild>\n      <InputGroupAction variant="outline">Estado</InputGroupAction>\n    </DropdownTrigger>\n    <DropdownContent className="w-44">\n      <DropdownItem>Todos</DropdownItem>\n      <DropdownItem>Activo</DropdownItem>\n      <DropdownItem>Pausado</DropdownItem>\n    </DropdownContent>\n  </Dropdown>\n  <Input placeholder="Filtra por nombre o etiqueta" />\n  <Dropdown>\n    <DropdownTrigger asChild>\n      <InputGroupAction variant="outline">Ordenar</InputGroupAction>\n    </DropdownTrigger>\n    <DropdownContent className="w-44">\n      <DropdownItem>Recientes</DropdownItem>\n      <DropdownItem>Nombre</DropdownItem>\n      <DropdownItem>Uso</DropdownItem>\n    </DropdownContent>\n  </Dropdown>\n</InputGroup>\n\n<InputGroup attached>\n  <InputGroupItem className="w-[240px]" grow={false}>\n    <Select defaultValue="all">\n      <option value="all">Todos los componentes</option>\n      <option value="core">Core</option>\n      <option value="forms">Formularios</option>\n    </Select>\n  </InputGroupItem>\n  <Input type="search" placeholder="Buscar por nombre o alias" />\n  <InputGroupAction variant="outline">Ir</InputGroupAction>\n</InputGroup>\n\n<InputGroup attached layout="grid" columns={2} className="max-w-md">\n  <InputGroupItem span={2}>\n    <Input placeholder="Número de tarjeta" />\n  </InputGroupItem>\n  <InputGroupItem>\n    <Input placeholder="MM / YY" />\n  </InputGroupItem>\n  <InputGroupItem>\n    <Input placeholder="CVC" />\n  </InputGroupItem>\n</InputGroup>`}
            />
            <p className={`text-sm ${ui.body}`}>
              Cuando `InputGroup` usa `attached`, el grupo recorta su contenido para conservar el borde exterior. `Dropdown` y `Select` deben renderizar su panel en portal para salir del clipping; el trigger de `Select` sí puede fusionarse dentro del grupo porque forma parte del mismo campo.
            </p>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "textarea") ? <SectionCard id="textarea" className={ui.divider}><SectionHeading category="Formularios" title="Textarea" description="Campo multilínea para notas, descripciones y bloques de texto más largos." ui={ui} /><div className="mt-6 space-y-4"><PreviewPanel ui={ui} title="Uso editorial" className="max-w-2xl" code={`<FormControl>\n  <Label>Descripción</Label>\n  <Textarea minRows={5} placeholder="Describe el objetivo de este componente o flujo." />\n  <FormDescription>Ideal para briefs, feedback o notas editoriales.</FormDescription>\n</FormControl>`}><FormControl><Label>Descripción</Label><Textarea minRows={5} placeholder="Describe el objetivo de este componente o flujo." /><FormDescription>Ideal para briefs, feedback o notas editoriales.</FormDescription></FormControl></PreviewPanel><PreviewPanel ui={ui} title="Variantes de color" className="grid gap-3 md:grid-cols-3" code={`<div className="grid gap-3 md:grid-cols-3">\n  <Textarea color="neutral" minRows={3} defaultValue="neutral" />\n  <Textarea color="slate" minRows={3} defaultValue="slate" />\n  <Textarea color="zinc" minRows={3} defaultValue="zinc" />\n  <Textarea color="primary" minRows={3} defaultValue="primary" />\n  <Textarea color="brand" minRows={3} defaultValue="brand" />\n  <Textarea color="success" minRows={3} defaultValue="success" />\n  <Textarea color="danger" minRows={3} defaultValue="danger" />\n  <Textarea color="warning" minRows={3} defaultValue="warning" />\n  <Textarea color="info" minRows={3} defaultValue="info" />\n  <Textarea color="light" minRows={3} defaultValue="light" />\n  <Textarea color="dark" minRows={3} defaultValue="dark" />\n  <Textarea color="black" minRows={3} defaultValue="black" />\n</div>`}><div className="grid gap-3 md:grid-cols-3">{fieldColors.map((color) => <Textarea key={color} color={color} minRows={3} defaultValue={color} />)}</div></PreviewPanel><PreviewPanel ui={ui} title="Estado inválido" className="max-w-2xl" code={`<FormControl invalid>\n  <Label>Notas de publicación</Label>\n  <Textarea minRows={4} defaultValue="Pendiente de completar los casos de uso." />\n  <FormMessage>Antes de publicar, detalla el alcance del componente.</FormMessage>\n</FormControl>`}><FormControl invalid><Label>Notas de publicación</Label><Textarea minRows={4} defaultValue="Pendiente de completar los casos de uso." /><FormMessage>Antes de publicar, detalla el alcance del componente.</FormMessage></FormControl></PreviewPanel><PreviewPanel ui={ui} title="Deshabilitado" className="max-w-2xl" code={`<Textarea disabled placeholder="Estado deshabilitado" />`}><Textarea disabled placeholder="Estado deshabilitado" /></PreviewPanel></div><div className="mt-8 space-y-6"><div><p className={`text-sm font-semibold ${ui.title}`}>API</p><PropsTable rows={apis.textarea} ui={ui} /></div><CodeExample ui={ui} code={`<FormControl>\n  <Label>Descripción</Label>\n  <Textarea minRows={5} placeholder="Describe el objetivo." />\n  <FormDescription>Ideal para briefs o notas editoriales.</FormDescription>\n</FormControl>`} /></div></SectionCard> : null}

      {isVisible(visibleIds, "select") ? <SectionCard id="select" className={ui.divider}><SectionHeading category="Formularios" title="Select" description="Select custom con trigger y lista desplegable personalizada. Mantiene una API simple con `<option>`, pero visualmente usa un listbox propio." ui={ui} /><div className="mt-6 space-y-4"><div className="grid gap-4 md:grid-cols-2"><PreviewPanel ui={ui} title="Uso base" code={`<FormControl>\n  <Label>Tema de documentación</Label>\n  <Select defaultValue="system">\n    <option value="system">Sistema</option>\n    <option value="light">Claro</option>\n    <option value="dark">Oscuro</option>\n  </Select>\n</FormControl>`}><FormControl><Label>Tema de documentación</Label><Select defaultValue="system"><option value="system">Sistema</option><option value="light">Claro</option><option value="dark">Oscuro</option></Select></FormControl></PreviewPanel><PreviewPanel ui={ui} title="Con placeholder e inválido" code={`<FormControl invalid>\n  <Label>Estado</Label>\n  <Select placeholder="Selecciona un estado">\n    <option value="draft">Borrador</option>\n    <option value="review">En revisión</option>\n    <option value="published">Publicado</option>\n  </Select>\n  <FormMessage>Debes elegir un estado.</FormMessage>\n</FormControl>`}><FormControl invalid><Label>Estado</Label><Select placeholder="Selecciona un estado"><option value="draft">Borrador</option><option value="review">En revisión</option><option value="published">Publicado</option></Select><FormMessage>Debes elegir un estado.</FormMessage></FormControl></PreviewPanel></div><PreviewPanel ui={ui} title="Colores del trigger" code={`<div className="grid gap-4 md:grid-cols-3">\n  <Select color="neutral" defaultValue="neutral">\n    <option value="neutral">neutral</option>\n  </Select>\n  <Select color="slate" defaultValue="slate">\n    <option value="slate">slate</option>\n  </Select>\n  <Select color="zinc" defaultValue="zinc">\n    <option value="zinc">zinc</option>\n  </Select>\n  <Select color="primary" defaultValue="primary">\n    <option value="primary">primary</option>\n  </Select>\n  <Select color="brand" defaultValue="brand">\n    <option value="brand">brand</option>\n  </Select>\n  <Select color="success" defaultValue="success">\n    <option value="success">success</option>\n  </Select>\n  <Select color="danger" defaultValue="danger">\n    <option value="danger">danger</option>\n  </Select>\n  <Select color="warning" defaultValue="warning">\n    <option value="warning">warning</option>\n  </Select>\n  <Select color="info" defaultValue="info">\n    <option value="info">info</option>\n  </Select>\n  <Select color="light" defaultValue="light">\n    <option value="light">light</option>\n  </Select>\n  <Select color="dark" defaultValue="dark">\n    <option value="dark">dark</option>\n  </Select>\n  <Select color="black" defaultValue="black">\n    <option value="black">black</option>\n  </Select>\n</div>`}><div className="grid gap-4 md:grid-cols-3">{fieldColors.map((color) => <Select key={color} color={color} defaultValue={color}><option value={color}>{color}</option></Select>)}</div></PreviewPanel><PreviewPanel ui={ui} title="Tamaños" code={`<div className="grid gap-4 md:grid-cols-3">\n  <FormControl>\n    <Label>Tamaño sm</Label>\n    <Select size="sm" defaultValue="compacto">\n      <option value="compacto">Compacto</option>\n      <option value="medio">Medio</option>\n    </Select>\n  </FormControl>\n  <FormControl>\n    <Label>Tamaño md</Label>\n    <Select size="md" defaultValue="medio">\n      <option value="compacto">Compacto</option>\n      <option value="medio">Medio</option>\n    </Select>\n  </FormControl>\n  <FormControl>\n    <Label>Tamaño lg</Label>\n    <Select size="lg" defaultValue="grande">\n      <option value="medio">Medio</option>\n      <option value="grande">Grande</option>\n    </Select>\n  </FormControl>\n</div>`}><div className="grid gap-4 md:grid-cols-3"><FormControl><Label>Tamaño sm</Label><Select size="sm" defaultValue="compacto"><option value="compacto">Compacto</option><option value="medio">Medio</option></Select></FormControl><FormControl><Label>Tamaño md</Label><Select size="md" defaultValue="medio"><option value="compacto">Compacto</option><option value="medio">Medio</option></Select></FormControl><FormControl><Label>Tamaño lg</Label><Select size="lg" defaultValue="grande"><option value="medio">Medio</option><option value="grande">Grande</option></Select></FormControl></div></PreviewPanel><PreviewPanel ui={ui} title="Sin portal y con onValueChange" className="max-w-2xl" code={`<FormControl>\n  <Label>Vista</Label>\n  <Select defaultValue="list" usePortal={false} onValueChange={(value) => console.log(value)}>\n    <option value="list">Lista</option>\n    <option value="grid">Cuadrícula</option>\n    <option value="compact">Compacta</option>\n  </Select>\n</FormControl>`}><FormControl><Label>Vista</Label><Select defaultValue="list" usePortal={false} onValueChange={() => {}}><option value="list">Lista</option><option value="grid">Cuadrícula</option><option value="compact">Compacta</option></Select></FormControl></PreviewPanel></div><div className="mt-8 space-y-6"><div><p className={`text-sm font-semibold ${ui.title}`}>API</p><PropsTable rows={apis.select} ui={ui} /></div><CodeExample ui={ui} code={`<FormControl>\n  <Label>Vista</Label>\n  <Select defaultValue="grid" onValueChange={(value) => console.log(value)}>\n    <option value="list">Lista</option>\n    <option value="grid">Cuadrícula</option>\n    <option value="compact">Compacta</option>\n  </Select>\n</FormControl>`} /></div></SectionCard> : null}

      {isVisible(visibleIds, "checkbox") ? (
        <SectionCard id="checkbox" className={ui.divider}>
          <SectionHeading
            category="Formularios"
            title="Checkbox"
            description="Checkbox custom con render consistente en light y dark mode, más colores semánticos opcionales sobre un default neutral y foco visible real al navegar con teclado."
            ui={ui}
          />
          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Tamaños"
              code={`<div className="flex flex-wrap items-center gap-6">
  <Checkbox id="checkbox-size-sm" size="sm" defaultChecked label="Pequeño" />
  <Checkbox id="checkbox-size-md" size="md" defaultChecked label="Mediano" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                <Checkbox id="checkbox-size-sm-preview" size="sm" defaultChecked label="Pequeño" labelClassName={`text-sm ${ui.body}`} />
                <Checkbox id="checkbox-size-md-preview" size="md" defaultChecked label="Mediano" labelClassName={`text-sm ${ui.body}`} />
              </div>
            </PreviewPanel>
            <PreviewPanel
              ui={ui}
              title="Colores"
              code={`<div className="flex flex-wrap items-center gap-6">
  <Checkbox id="checkbox-neutral" defaultChecked color="neutral" label="neutral" />
  <Checkbox id="checkbox-slate" defaultChecked color="slate" label="slate" />
  <Checkbox id="checkbox-zinc" defaultChecked color="zinc" label="zinc" />
  <Checkbox id="checkbox-primary" defaultChecked color="primary" label="primary" />
  <Checkbox id="checkbox-brand" defaultChecked color="brand" label="brand" />
  <Checkbox id="checkbox-success" defaultChecked color="success" label="success" />
  <Checkbox id="checkbox-danger" defaultChecked color="danger" label="danger" />
  <Checkbox id="checkbox-warning" defaultChecked color="warning" label="warning" />
  <Checkbox id="checkbox-info" defaultChecked color="info" label="info" />
  <Checkbox id="checkbox-light" defaultChecked color="light" label="light" />
  <Checkbox id="checkbox-dark" defaultChecked color="dark" label="dark" />
  <Checkbox id="checkbox-black" defaultChecked color="black" label="black" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                {fieldColors.map((color) => {
                  const id = `checkbox-color-${color}`;
                  return (
                    <Checkbox
                      key={color}
                      id={id}
                      defaultChecked
                      color={color}
                      label={color}
                      labelClassName={`text-sm ${ui.body}`}
                    />
                  );
                })}
              </div>
            </PreviewPanel>
            <PreviewPanel
              ui={ui}
              title="Estados"
              code={`<div className="flex flex-wrap items-center gap-6">
  <Checkbox id="checkbox-default" label="Neutral" />
  <Checkbox id="checkbox-invalid" invalid defaultChecked label="Inválido" />
  <Checkbox id="checkbox-disabled" disabled defaultChecked label="Deshabilitado" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                <Checkbox id="checkbox-default-preview" label="Neutral" labelClassName={`text-sm ${ui.body}`} />
                <Checkbox id="checkbox-invalid-preview" invalid defaultChecked label="Inválido" labelClassName={`text-sm ${ui.body}`} />
                <Checkbox id="checkbox-disabled-preview" disabled defaultChecked label="Deshabilitado" labelClassName={`text-sm ${ui.body}`} />
              </div>
            </PreviewPanel>
            <PreviewPanel
              ui={ui}
              title="Grupo de preferencias"
              className="max-w-2xl"
              code={`<FormControl>
  <Label optional>Preferencias de publicación</Label>
  <div className="space-y-3">
    <div className="inline-flex items-center gap-3">
      <Checkbox id="publish-changelog" defaultChecked />
      <Label htmlFor="publish-changelog">Publicar en changelog interno</Label>
    </div>
    <div className="inline-flex items-center gap-3">
      <Checkbox id="email-notify" />
      <Label htmlFor="email-notify">Notificar al equipo por correo</Label>
    </div>
    <div className="inline-flex items-center gap-3">
      <Checkbox id="sync-production" disabled />
      <Label htmlFor="sync-production">Sincronizar con producción</Label>
    </div>
  </div>
</FormControl>`}
            >
              <FormControl>
                <Label optional>Preferencias de publicación</Label>
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-3">
                    <Checkbox id="publish-changelog-preview" defaultChecked />
                    <Label htmlFor="publish-changelog-preview" className={`text-sm ${ui.body}`}>
                      Publicar en changelog interno
                    </Label>
                  </div>
                  <div className="inline-flex items-center gap-3">
                    <Checkbox id="email-notify-preview" />
                    <Label htmlFor="email-notify-preview" className={`text-sm ${ui.body}`}>
                      Notificar al equipo por correo
                    </Label>
                  </div>
                  <div className="inline-flex items-center gap-3">
                    <Checkbox id="sync-production-preview" disabled />
                    <Label htmlFor="sync-production-preview" className={`text-sm ${ui.body}`}>
                      Sincronizar con producción
                    </Label>
                  </div>
                </div>
              </FormControl>
            </PreviewPanel>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>API</p>
              <PropsTable rows={apis.checkbox} ui={ui} />
            </div>
            <CodeExample
              ui={ui}
              code={`<FormControl>
  <Label optional>Preferencias de publicación</Label>
  <Checkbox
    id="publish-changelog"
    defaultChecked
    label="Publicar en changelog interno"
    onCheckedChange={(checked) => console.log("checkbox", checked)}
  />
</FormControl>`}
            />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "radio") ? (
        <SectionCard id="radio" className={ui.divider}>
          <SectionHeading
            category="Formularios"
            title="Radio"
            description="Radio custom alineado con `Checkbox`, con apariencia consistente entre temas, color opcional para el estado seleccionado y foco visible real al navegar con teclado."
            ui={ui}
          />
          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Tamaños"
              code={`<div className="flex flex-wrap items-center gap-6">
  <Radio id="radio-size-sm" name="radio-sizes" size="sm" defaultChecked label="Pequeño" />
  <Radio id="radio-size-md" name="radio-sizes" size="md" label="Mediano" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                <Radio id="radio-size-sm-preview" name="radio-sizes-preview" size="sm" defaultChecked label="Pequeño" labelClassName={`text-sm ${ui.body}`} />
                <Radio id="radio-size-md-preview" name="radio-sizes-preview" size="md" label="Mediano" labelClassName={`text-sm ${ui.body}`} />
              </div>
            </PreviewPanel>
            <PreviewPanel
              ui={ui}
              title="Colores"
              code={`<div className="flex flex-wrap items-center gap-6">
  <Radio id="radio-neutral" name="radio-colors" defaultChecked color="neutral" label="neutral" />
  <Radio id="radio-slate" name="radio-colors" color="slate" label="slate" />
  <Radio id="radio-zinc" name="radio-colors" color="zinc" label="zinc" />
  <Radio id="radio-primary" name="radio-colors" color="primary" label="primary" />
  <Radio id="radio-brand" name="radio-colors" color="brand" label="brand" />
  <Radio id="radio-success" name="radio-colors" color="success" label="success" />
  <Radio id="radio-danger" name="radio-colors" color="danger" label="danger" />
  <Radio id="radio-warning" name="radio-colors" color="warning" label="warning" />
  <Radio id="radio-info" name="radio-colors" color="info" label="info" />
  <Radio id="radio-light" name="radio-colors" color="light" label="light" />
  <Radio id="radio-dark" name="radio-colors" color="dark" label="dark" />
  <Radio id="radio-black" name="radio-colors" color="black" label="black" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                {fieldColors.map((color) => {
                  const id = `radio-color-${color}`;
                  return (
                    <Radio
                      key={color}
                      id={id}
                      name="radio-colors-preview"
                      defaultChecked={color === "neutral"}
                      color={color}
                      label={color}
                      labelClassName={`text-sm ${ui.body}`}
                    />
                  );
                })}
              </div>
            </PreviewPanel>
            <PreviewPanel
              ui={ui}
              title="Estados"
              code={`<div className="flex flex-wrap items-center gap-6">
  <Radio id="radio-default" name="radio-states" defaultChecked label="Predeterminado" />
  <Radio id="radio-invalid" name="radio-states" invalid label="Inválido" />
  <Radio id="radio-disabled" name="radio-disabled" disabled defaultChecked label="Deshabilitado" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                <Radio id="radio-default-preview" name="radio-states-preview" defaultChecked label="Predeterminado" labelClassName={`text-sm ${ui.body}`} />
                <Radio id="radio-invalid-preview" name="radio-states-preview" invalid label="Inválido" labelClassName={`text-sm ${ui.body}`} />
                <Radio id="radio-disabled-preview" name="radio-disabled-preview" disabled defaultChecked label="Deshabilitado" labelClassName={`text-sm ${ui.body}`} />
              </div>
            </PreviewPanel>
            <PreviewPanel
              ui={ui}
              title="Grupo de selección"
              className="max-w-2xl"
              code={`<FormControl>
  <Label>Visibilidad del proyecto</Label>
  <div className="space-y-3">
    <div className="inline-flex items-center gap-3">
      <Radio id="visibility-team" name="visibility-docs" defaultChecked />
      <Label htmlFor="visibility-team">Equipo interno</Label>
    </div>
    <div className="inline-flex items-center gap-3">
      <Radio id="visibility-stakeholders" name="visibility-docs" />
      <Label htmlFor="visibility-stakeholders">Solo stakeholders</Label>
    </div>
    <div className="inline-flex items-center gap-3">
      <Radio id="visibility-public" name="visibility-docs" />
      <Label htmlFor="visibility-public">Público</Label>
    </div>
  </div>
</FormControl>`}
            >
              <FormControl>
                <Label>Visibilidad del proyecto</Label>
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-3">
                    <Radio id="visibility-team-preview" name="visibility-docs-preview" defaultChecked />
                    <Label htmlFor="visibility-team-preview" className={`text-sm ${ui.body}`}>
                      Equipo interno
                    </Label>
                  </div>
                  <div className="inline-flex items-center gap-3">
                    <Radio id="visibility-stakeholders-preview" name="visibility-docs-preview" />
                    <Label htmlFor="visibility-stakeholders-preview" className={`text-sm ${ui.body}`}>
                      Solo stakeholders
                    </Label>
                  </div>
                  <div className="inline-flex items-center gap-3">
                    <Radio id="visibility-public-preview" name="visibility-docs-preview" />
                    <Label htmlFor="visibility-public-preview" className={`text-sm ${ui.body}`}>
                      Público
                    </Label>
                  </div>
                </div>
              </FormControl>
            </PreviewPanel>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>API</p>
              <PropsTable rows={apis.radio} ui={ui} />
            </div>
            <CodeExample
              ui={ui}
              code={`<FormControl>
  <Label>Visibilidad del proyecto</Label>
  <Radio
    id="privacy-team"
    name="privacy"
    size="sm"
    defaultChecked
    label="Equipo interno"
    onCheckedChange={(checked) => console.log("radio", checked)}
  />
</FormControl>`}
            />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "switch") ? (
        <SectionCard id="switch" className={ui.divider}>
          <SectionHeading
            category="Formularios"
            title="Switch"
            description="Switch para toggles binarios con tamaños `sm` y `md`, además de colores semánticos opcionales."
            ui={ui}
          />
          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Tamaños"
              code={`<div className="flex flex-wrap items-center gap-6">
  <Switch id="switch-size-sm" size="sm" defaultChecked label="Pequeño" />
  <Switch id="switch-size-md" size="md" defaultChecked label="Mediano" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                <Switch id="switch-size-sm-preview" size="sm" defaultChecked label="Pequeño" labelClassName={`text-sm ${ui.body}`} />
                <Switch id="switch-size-md-preview" size="md" defaultChecked label="Mediano" labelClassName={`text-sm ${ui.body}`} />
              </div>
            </PreviewPanel>
            <PreviewPanel
              ui={ui}
              title="Colores"
              code={`<div className="flex flex-wrap items-center gap-6">
  <Switch id="switch-neutral" color="neutral" defaultChecked label="neutral" />
  <Switch id="switch-slate" color="slate" defaultChecked label="slate" />
  <Switch id="switch-zinc" color="zinc" defaultChecked label="zinc" />
  <Switch id="switch-primary" color="primary" defaultChecked label="primary" />
  <Switch id="switch-brand" color="brand" defaultChecked label="brand" />
  <Switch id="switch-success" color="success" defaultChecked label="success" />
  <Switch id="switch-danger" color="danger" defaultChecked label="danger" />
  <Switch id="switch-warning" color="warning" defaultChecked label="warning" />
  <Switch id="switch-info" color="info" defaultChecked label="info" />
  <Switch id="switch-light" color="light" defaultChecked label="light" />
  <Switch id="switch-dark" color="dark" defaultChecked label="dark" />
  <Switch id="switch-black" color="black" defaultChecked label="black" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                {fieldColors.map((color) => {
                  const id = `switch-color-${color}`;
                  return (
                    <Switch
                      key={color}
                      id={id}
                      color={color}
                      defaultChecked
                      label={color}
                      labelClassName={`text-sm ${ui.body}`}
                    />
                  );
                })}
              </div>
            </PreviewPanel>
            <PreviewPanel
              ui={ui}
              title="En contexto"
              className="max-w-2xl"
              code={`<div className="space-y-3">
  <div className="flex items-center justify-between gap-4 rounded-[1rem] border px-4 py-3">
    <div>
      <p className="text-sm font-medium">Notificaciones del proyecto</p>
      <p className="text-sm text-neutral-500">Recibe alertas cuando cambien componentes críticos.</p>
    </div>
    <Switch id="project-notifications" defaultChecked />
  </div>
  <div className="flex items-center justify-between gap-4 rounded-[1rem] border px-4 py-3">
    <div>
      <p className="text-sm font-medium">Modo revisión</p>
      <p className="text-sm text-neutral-500">Activa comentarios y aprobaciones antes de publicar.</p>
    </div>
    <Switch id="review-mode" size="sm" />
  </div>
</div>`}
            >
              <div className="space-y-3">
                <div className={`flex items-center justify-between gap-4 rounded-[1rem] border px-4 py-3 ${ui.preview}`}>
                  <div>
                    <p className={`text-sm font-medium ${ui.title}`}>Notificaciones del proyecto</p>
                    <p className={`text-sm ${ui.body}`}>Recibe alertas cuando cambien componentes críticos.</p>
                  </div>
                  <Switch id="project-notifications-preview" defaultChecked />
                </div>
                <div className={`flex items-center justify-between gap-4 rounded-[1rem] border px-4 py-3 ${ui.preview}`}>
                  <div>
                    <p className={`text-sm font-medium ${ui.title}`}>Modo revisión</p>
                    <p className={`text-sm ${ui.body}`}>Activa comentarios y aprobaciones antes de publicar.</p>
                  </div>
                  <Switch id="review-mode-preview" size="sm" />
                </div>
              </div>
            </PreviewPanel>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>API</p>
              <PropsTable rows={apis.switch} ui={ui} />
            </div>
            <CodeExample
              ui={ui}
              code={`<div className="flex items-center justify-between gap-4">
  <div>
    <p className="text-sm font-medium">Notificaciones del proyecto</p>
    <p className="text-sm text-neutral-500">Recibe alertas cuando cambien componentes críticos.</p>
  </div>
  <Switch
    id="project-notifications"
    defaultChecked
    onCheckedChange={(checked) => console.log("switch", checked)}
  />
</div>`}
            />
          </div>
        </SectionCard>
      ) : null}
    </>
  );
}

export default FormDocs;





