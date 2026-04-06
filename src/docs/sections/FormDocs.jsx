import { Checkbox, FormControl, FormDescription, FormMessage, Input, Label, Radio, Select, Switch, Textarea } from "@/lib";
import { CodeExample, PreviewPanel, PropsTable, SectionCard, SectionHeading } from "@/docs/components/DocsPrimitives";

const colors = ["neutral", "primary", "brand", "success", "danger", "warning", "info"];
const fieldColors = ["neutral", "primary", "brand", "success", "danger", "warning", "info", "light", "dark"];
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
    { prop: "color", type: "neutral | primary | brand | success | danger | warning | info | light | dark", defaultValue: "neutral", description: "Cambia borde, fondo y focus ring del campo." },
    { prop: "invalid", type: "boolean", defaultValue: "false", description: "Aplica estado visual inválido fuera de `FormControl`." },
    { prop: "disabled", type: "boolean", defaultValue: "false", description: "Deshabilita interacción." },
    { prop: "type", type: "string", defaultValue: "text", description: "Tipo nativo del input." },
  ],
  textarea: [
    { prop: "minRows", type: "number", defaultValue: "4", description: "Define las filas iniciales del textarea." },
    { prop: "color", type: "neutral | primary | brand | success | danger | warning | info | light | dark", defaultValue: "neutral", description: "Cambia borde, fondo y focus ring del textarea." },
    { prop: "invalid", type: "boolean", defaultValue: "false", description: "Aplica estado visual inválido." },
    { prop: "disabled", type: "boolean", defaultValue: "false", description: "Deshabilita interacción." },
  ],
  select: [
    { prop: "size", type: "sm | md | lg", defaultValue: "md", description: "Controla altura y densidad del trigger." },
    { prop: "color", type: "neutral | primary | brand | success | danger | warning | info | light | dark", defaultValue: "neutral", description: "Cambia borde, fondo y focus ring del trigger." },
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
    { prop: "color", type: "neutral | primary | brand | success | danger | warning | info", defaultValue: "neutral", description: "Controla el color del estado checked." },
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
    { prop: "color", type: "neutral | primary | brand | success | danger | warning | info", defaultValue: "neutral", description: "Controla el color del punto activo." },
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
    { prop: "color", type: "neutral | primary | brand | success | danger | warning | info", defaultValue: "neutral", description: "Controla el color del estado activo." },
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

      {isVisible(visibleIds, "input") ? <SectionCard id="input" className={ui.divider}><SectionHeading category="Formularios" title="Input" description="Campo de texto base con tamaños, estado inválido y soporte automático para `FormControl`." ui={ui} /><div className="mt-6 space-y-4"><PreviewPanel ui={ui} title="Tamaños" code={`<div className="flex flex-wrap items-center gap-3">\n  <Input size="sm" placeholder="Small input" className="max-w-[180px]" />\n  <Input size="md" placeholder="Medium input" className="max-w-[200px]" />\n  <Input size="lg" placeholder="Large input" className="max-w-[220px]" />\n</div>`}><div className="flex flex-wrap items-center gap-3"><Input size="sm" placeholder="Small input" className="max-w-[180px]" /><Input size="md" placeholder="Medium input" className="max-w-[200px]" /><Input size="lg" placeholder="Large input" className="max-w-[220px]" /></div></PreviewPanel><PreviewPanel ui={ui} title="Colores y focus ring" className="grid gap-3 md:grid-cols-3" code={`<div className="grid gap-3 md:grid-cols-3">\n  <Input color="neutral" defaultValue="neutral" />\n  <Input color="primary" defaultValue="primary" />\n  <Input color="brand" defaultValue="brand" />\n  <Input color="success" defaultValue="success" />\n  <Input color="danger" defaultValue="danger" />\n  <Input color="warning" defaultValue="warning" />\n  <Input color="info" defaultValue="info" />\n  <Input color="light" defaultValue="light" />\n  <Input color="dark" defaultValue="dark" />\n</div>`}><div className="grid gap-3 md:grid-cols-3">{fieldColors.map((color) => <Input key={color} color={color} defaultValue={color} />)}</div></PreviewPanel><PreviewPanel ui={ui} title="Con FormControl e invalid" className="grid gap-4 md:grid-cols-2" code={`<FormControl>\n  <Label>Usuario</Label>\n  <Input placeholder="@quickit" />\n</FormControl>\n\n<FormControl invalid>\n  <Label>Correo</Label>\n  <Input type="email" placeholder="correo@dominio.com" />\n  <FormMessage>Ingresa un correo válido.</FormMessage>\n</FormControl>`}><FormControl><Label>Usuario</Label><Input placeholder="@quickit" /></FormControl><FormControl invalid><Label>Correo</Label><Input type="email" placeholder="correo@dominio.com" /><FormMessage>Ingresa un correo válido.</FormMessage></FormControl></PreviewPanel><PreviewPanel ui={ui} title="Tipos comunes" className="grid gap-4 md:grid-cols-2" code={`<FormControl>\n  <Label>Buscar componente</Label>\n  <Input type="search" placeholder="Button, Modal, Input..." />\n</FormControl>\n\n<FormControl>\n  <Label>Clave temporal</Label>\n  <Input type="password" placeholder="••••••••" />\n</FormControl>`}><FormControl><Label>Buscar componente</Label><Input type="search" placeholder="Button, Modal, Input..." /></FormControl><FormControl><Label>Clave temporal</Label><Input type="password" placeholder="••••••••" /></FormControl></PreviewPanel></div><div className="mt-8 space-y-6"><div><p className={`text-sm font-semibold ${ui.title}`}>API</p><PropsTable rows={apis.input} ui={ui} /></div><CodeExample ui={ui} code={`<FormControl>\n  <Label>Usuario</Label>\n  <Input placeholder="@quickit" />\n</FormControl>\n\n<FormControl>\n  <Label>Buscar componente</Label>\n  <Input type="search" placeholder="Button, Modal, Input..." />\n</FormControl>`} /></div></SectionCard> : null}

      {isVisible(visibleIds, "textarea") ? <SectionCard id="textarea" className={ui.divider}><SectionHeading category="Formularios" title="Textarea" description="Campo multilínea para notas, descripciones y bloques de texto más largos." ui={ui} /><div className="mt-6 space-y-4"><PreviewPanel ui={ui} title="Uso editorial" className="max-w-2xl" code={`<FormControl>\n  <Label>Descripción</Label>\n  <Textarea minRows={5} placeholder="Describe el objetivo de este componente o flujo." />\n  <FormDescription>Ideal para briefs, feedback o notas editoriales.</FormDescription>\n</FormControl>`}><FormControl><Label>Descripción</Label><Textarea minRows={5} placeholder="Describe el objetivo de este componente o flujo." /><FormDescription>Ideal para briefs, feedback o notas editoriales.</FormDescription></FormControl></PreviewPanel><PreviewPanel ui={ui} title="Variantes de color" className="grid gap-3 md:grid-cols-3" code={`<div className="grid gap-3 md:grid-cols-3">\n  <Textarea color="neutral" minRows={3} defaultValue="neutral" />\n  <Textarea color="primary" minRows={3} defaultValue="primary" />\n  <Textarea color="brand" minRows={3} defaultValue="brand" />\n  <Textarea color="success" minRows={3} defaultValue="success" />\n  <Textarea color="danger" minRows={3} defaultValue="danger" />\n  <Textarea color="warning" minRows={3} defaultValue="warning" />\n  <Textarea color="info" minRows={3} defaultValue="info" />\n  <Textarea color="light" minRows={3} defaultValue="light" />\n  <Textarea color="dark" minRows={3} defaultValue="dark" />\n</div>`}><div className="grid gap-3 md:grid-cols-3">{fieldColors.map((color) => <Textarea key={color} color={color} minRows={3} defaultValue={color} />)}</div></PreviewPanel><PreviewPanel ui={ui} title="Estado inválido" className="max-w-2xl" code={`<FormControl invalid>\n  <Label>Notas de publicación</Label>\n  <Textarea minRows={4} defaultValue="Pendiente de completar los casos de uso." />\n  <FormMessage>Antes de publicar, detalla el alcance del componente.</FormMessage>\n</FormControl>`}><FormControl invalid><Label>Notas de publicación</Label><Textarea minRows={4} defaultValue="Pendiente de completar los casos de uso." /><FormMessage>Antes de publicar, detalla el alcance del componente.</FormMessage></FormControl></PreviewPanel><PreviewPanel ui={ui} title="Disabled" className="max-w-2xl" code={`<Textarea disabled placeholder="Estado disabled" />`}><Textarea disabled placeholder="Estado disabled" /></PreviewPanel></div><div className="mt-8 space-y-6"><div><p className={`text-sm font-semibold ${ui.title}`}>API</p><PropsTable rows={apis.textarea} ui={ui} /></div><CodeExample ui={ui} code={`<FormControl>\n  <Label>Descripción</Label>\n  <Textarea minRows={5} placeholder="Describe el objetivo." />\n  <FormDescription>Ideal para briefs o notas editoriales.</FormDescription>\n</FormControl>`} /></div></SectionCard> : null}

      {isVisible(visibleIds, "select") ? <SectionCard id="select" className={ui.divider}><SectionHeading category="Formularios" title="Select" description="Select custom con trigger y lista desplegable personalizada. Mantiene una API simple con `<option>`, pero visualmente usa un listbox propio." ui={ui} /><div className="mt-6 space-y-4"><div className="grid gap-4 md:grid-cols-2"><PreviewPanel ui={ui} title="Uso base" code={`<FormControl>\n  <Label>Tema de documentación</Label>\n  <Select defaultValue="system">\n    <option value="system">System</option>\n    <option value="light">Light</option>\n    <option value="dark">Dark</option>\n  </Select>\n</FormControl>`}><FormControl><Label>Tema de documentación</Label><Select defaultValue="system"><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></Select></FormControl></PreviewPanel><PreviewPanel ui={ui} title="Con placeholder e invalid" code={`<FormControl invalid>\n  <Label>Estado</Label>\n  <Select placeholder="Selecciona un estado">\n    <option value="draft">Draft</option>\n    <option value="review">Review</option>\n    <option value="published">Published</option>\n  </Select>\n  <FormMessage>Debes elegir un estado.</FormMessage>\n</FormControl>`}><FormControl invalid><Label>Estado</Label><Select placeholder="Selecciona un estado"><option value="draft">Draft</option><option value="review">Review</option><option value="published">Published</option></Select><FormMessage>Debes elegir un estado.</FormMessage></FormControl></PreviewPanel></div><PreviewPanel ui={ui} title="Colores del trigger" code={`<div className="grid gap-4 md:grid-cols-3">\n  <Select color="neutral" defaultValue="neutral">\n    <option value="neutral">neutral</option>\n  </Select>\n  <Select color="primary" defaultValue="primary">\n    <option value="primary">primary</option>\n  </Select>\n  <Select color="brand" defaultValue="brand">\n    <option value="brand">brand</option>\n  </Select>\n  <Select color="success" defaultValue="success">\n    <option value="success">success</option>\n  </Select>\n  <Select color="danger" defaultValue="danger">\n    <option value="danger">danger</option>\n  </Select>\n  <Select color="warning" defaultValue="warning">\n    <option value="warning">warning</option>\n  </Select>\n  <Select color="info" defaultValue="info">\n    <option value="info">info</option>\n  </Select>\n  <Select color="light" defaultValue="light">\n    <option value="light">light</option>\n  </Select>\n  <Select color="dark" defaultValue="dark">\n    <option value="dark">dark</option>\n  </Select>\n</div>`}><div className="grid gap-4 md:grid-cols-3">{fieldColors.map((color) => <Select key={color} color={color} defaultValue={color}><option value={color}>{color}</option></Select>)}</div></PreviewPanel><PreviewPanel ui={ui} title="Tamaños" code={`<div className="grid gap-4 md:grid-cols-3">\n  <FormControl>\n    <Label>Tamaño sm</Label>\n    <Select size="sm" defaultValue="compacto">\n      <option value="compacto">Compacto</option>\n      <option value="medio">Medio</option>\n    </Select>\n  </FormControl>\n  <FormControl>\n    <Label>Tamaño md</Label>\n    <Select size="md" defaultValue="medio">\n      <option value="compacto">Compacto</option>\n      <option value="medio">Medio</option>\n    </Select>\n  </FormControl>\n  <FormControl>\n    <Label>Tamaño lg</Label>\n    <Select size="lg" defaultValue="grande">\n      <option value="medio">Medio</option>\n      <option value="grande">Grande</option>\n    </Select>\n  </FormControl>\n</div>`}><div className="grid gap-4 md:grid-cols-3"><FormControl><Label>Tamaño sm</Label><Select size="sm" defaultValue="compacto"><option value="compacto">Compacto</option><option value="medio">Medio</option></Select></FormControl><FormControl><Label>Tamaño md</Label><Select size="md" defaultValue="medio"><option value="compacto">Compacto</option><option value="medio">Medio</option></Select></FormControl><FormControl><Label>Tamaño lg</Label><Select size="lg" defaultValue="grande"><option value="medio">Medio</option><option value="grande">Grande</option></Select></FormControl></div></PreviewPanel><PreviewPanel ui={ui} title="Sin portal y con onValueChange" className="max-w-2xl" code={`<FormControl>\n  <Label>Vista</Label>\n  <Select defaultValue="list" usePortal={false} onValueChange={(value) => console.log(value)}>\n    <option value="list">List</option>\n    <option value="grid">Grid</option>\n    <option value="compact">Compact</option>\n  </Select>\n</FormControl>`}><FormControl><Label>Vista</Label><Select defaultValue="list" usePortal={false} onValueChange={() => {}}><option value="list">List</option><option value="grid">Grid</option><option value="compact">Compact</option></Select></FormControl></PreviewPanel></div><div className="mt-8 space-y-6"><div><p className={`text-sm font-semibold ${ui.title}`}>API</p><PropsTable rows={apis.select} ui={ui} /></div><CodeExample ui={ui} code={`<FormControl>\n  <Label>Vista</Label>\n  <Select defaultValue="grid" onValueChange={(value) => console.log(value)}>\n    <option value="list">List</option>\n    <option value="grid">Grid</option>\n    <option value="compact">Compact</option>\n  </Select>\n</FormControl>`} /></div></SectionCard> : null}

      {isVisible(visibleIds, "checkbox") ? (
        <SectionCard id="checkbox" className={ui.divider}>
          <SectionHeading
            category="Formularios"
            title="Checkbox"
            description="Checkbox custom con render consistente en light y dark mode, más colores semánticos opcionales sobre un default neutral."
            ui={ui}
          />
          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Tamaños"
              code={`<div className="flex flex-wrap items-center gap-6">
  <Checkbox id="checkbox-size-sm" size="sm" defaultChecked label="Small" />
  <Checkbox id="checkbox-size-md" size="md" defaultChecked label="Medium" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                <Checkbox id="checkbox-size-sm-preview" size="sm" defaultChecked label="Small" labelClassName={`text-sm ${ui.body}`} />
                <Checkbox id="checkbox-size-md-preview" size="md" defaultChecked label="Medium" labelClassName={`text-sm ${ui.body}`} />
              </div>
            </PreviewPanel>
            <PreviewPanel
              ui={ui}
              title="Colores"
              code={`<div className="flex flex-wrap items-center gap-6">
  <Checkbox id="checkbox-neutral" defaultChecked color="neutral" label="neutral" />
  <Checkbox id="checkbox-primary" defaultChecked color="primary" label="primary" />
  <Checkbox id="checkbox-brand" defaultChecked color="brand" label="brand" />
  <Checkbox id="checkbox-success" defaultChecked color="success" label="success" />
  <Checkbox id="checkbox-danger" defaultChecked color="danger" label="danger" />
  <Checkbox id="checkbox-warning" defaultChecked color="warning" label="warning" />
  <Checkbox id="checkbox-info" defaultChecked color="info" label="info" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                {colors.map((color) => {
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
  <Checkbox id="checkbox-invalid" invalid defaultChecked label="Invalid" />
  <Checkbox id="checkbox-disabled" disabled defaultChecked label="Disabled" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                <Checkbox id="checkbox-default-preview" label="Neutral" labelClassName={`text-sm ${ui.body}`} />
                <Checkbox id="checkbox-invalid-preview" invalid defaultChecked label="Invalid" labelClassName={`text-sm ${ui.body}`} />
                <Checkbox id="checkbox-disabled-preview" disabled defaultChecked label="Disabled" labelClassName={`text-sm ${ui.body}`} />
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
            description="Radio custom alineado con `Checkbox`, con apariencia consistente entre temas y color opcional para el estado seleccionado."
            ui={ui}
          />
          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Tamaños"
              code={`<div className="flex flex-wrap items-center gap-6">
  <Radio id="radio-size-sm" name="radio-sizes" size="sm" defaultChecked label="Small" />
  <Radio id="radio-size-md" name="radio-sizes" size="md" label="Medium" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                <Radio id="radio-size-sm-preview" name="radio-sizes-preview" size="sm" defaultChecked label="Small" labelClassName={`text-sm ${ui.body}`} />
                <Radio id="radio-size-md-preview" name="radio-sizes-preview" size="md" label="Medium" labelClassName={`text-sm ${ui.body}`} />
              </div>
            </PreviewPanel>
            <PreviewPanel
              ui={ui}
              title="Colores"
              code={`<div className="flex flex-wrap items-center gap-6">
  <Radio id="radio-neutral" name="radio-colors" defaultChecked color="neutral" label="neutral" />
  <Radio id="radio-primary" name="radio-colors" color="primary" label="primary" />
  <Radio id="radio-brand" name="radio-colors" color="brand" label="brand" />
  <Radio id="radio-success" name="radio-colors" color="success" label="success" />
  <Radio id="radio-danger" name="radio-colors" color="danger" label="danger" />
  <Radio id="radio-warning" name="radio-colors" color="warning" label="warning" />
  <Radio id="radio-info" name="radio-colors" color="info" label="info" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                {colors.map((color) => {
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
  <Radio id="radio-default" name="radio-states" defaultChecked label="Default" />
  <Radio id="radio-invalid" name="radio-states" invalid label="Invalid" />
  <Radio id="radio-disabled" name="radio-disabled" disabled defaultChecked label="Disabled" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                <Radio id="radio-default-preview" name="radio-states-preview" defaultChecked label="Default" labelClassName={`text-sm ${ui.body}`} />
                <Radio id="radio-invalid-preview" name="radio-states-preview" invalid label="Invalid" labelClassName={`text-sm ${ui.body}`} />
                <Radio id="radio-disabled-preview" name="radio-disabled-preview" disabled defaultChecked label="Disabled" labelClassName={`text-sm ${ui.body}`} />
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
  <Switch id="switch-size-sm" size="sm" defaultChecked label="Small" />
  <Switch id="switch-size-md" size="md" defaultChecked label="Medium" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                <Switch id="switch-size-sm-preview" size="sm" defaultChecked label="Small" labelClassName={`text-sm ${ui.body}`} />
                <Switch id="switch-size-md-preview" size="md" defaultChecked label="Medium" labelClassName={`text-sm ${ui.body}`} />
              </div>
            </PreviewPanel>
            <PreviewPanel
              ui={ui}
              title="Colores"
              code={`<div className="flex flex-wrap items-center gap-6">
  <Switch id="switch-neutral" color="neutral" defaultChecked label="neutral" />
  <Switch id="switch-primary" color="primary" defaultChecked label="primary" />
  <Switch id="switch-brand" color="brand" defaultChecked label="brand" />
  <Switch id="switch-success" color="success" defaultChecked label="success" />
  <Switch id="switch-danger" color="danger" defaultChecked label="danger" />
  <Switch id="switch-warning" color="warning" defaultChecked label="warning" />
  <Switch id="switch-info" color="info" defaultChecked label="info" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                {colors.map((color) => {
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
