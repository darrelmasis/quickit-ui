import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Pagination,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib";
import {
  PreviewPanel,
  PropsTable,
  SectionCard,
  SectionHeading,
} from "@/docs/components/DocsPrimitives";

const apis = {
  tabs: [
    { prop: "defaultValue", type: "string", defaultValue: "undefined", description: "Tab inicial en modo no controlado." },
    { prop: "value / onValueChange", type: "string / (value) => void", defaultValue: "no controlado", description: "Modo controlado opcional." },
    { prop: "orientation", type: "horizontal | vertical", defaultValue: "horizontal", description: "Dirección del tabs list y de la navegación por teclado." },
    { prop: "activationMode", type: "automatic | manual", defaultValue: "automatic", description: "Controla si el foco activa el tab automáticamente o si solo cambia con click / Enter / Espacio." },
  ],
  accordion: [
    { prop: "type", type: "single | multiple", defaultValue: "single", description: "Permite uno o varios items abiertos." },
    { prop: "collapsible", type: "boolean", defaultValue: "true", description: "Permite cerrar el item activo en modo single." },
    { prop: "defaultValue", type: "string | string[]", defaultValue: "undefined", description: "Valor inicial de los items abiertos." },
  ],
  breadcrumb: [
    { prop: "BreadcrumbLink", type: "subcomponente", defaultValue: "-", description: "Enlace navegable dentro de la ruta." },
    { prop: "BreadcrumbCurrent", type: "subcomponente", defaultValue: "-", description: "Representa el nodo actual no interactivo." },
  ],
  pagination: [
    { prop: "count", type: "number", defaultValue: "required", description: "Total de páginas disponibles." },
    { prop: "page / defaultPage", type: "number", defaultValue: "1", description: "Modo controlado o no controlado." },
    { prop: "siblingCount", type: "number", defaultValue: "1", description: "Cantidad de páginas visibles a cada lado." },
    { prop: "color", type: "neutral | primary | success | danger | warning | info | light | dark", defaultValue: "neutral", description: "Color aplicado a la paginación." },
  ],
};

const isVisible = (visibleIds, id) => !visibleIds || visibleIds.has(id);

export function NavigationDocs({ ui, visibleIds }) {
  return (
    <>
      {isVisible(visibleIds, "tabs") ? (
        <SectionCard id="tabs" className={ui.divider}>
          <SectionHeading
            category="Navegación"
            title="Tabs"
            description="Navegación por paneles con orientación horizontal o vertical. La activación principal es por click y mantiene soporte de teclado integrado."
            ui={ui}
          />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Tabs horizontales"
              code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="api">API</TabsTrigger>
    <TabsTrigger value="states">States</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Panel principal con resumen del componente.</TabsContent>
  <TabsContent value="api">Panel con props y notas de integración.</TabsContent>
  <TabsContent value="states">Panel con variantes y estados visibles.</TabsContent>
</Tabs>`}
            >
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                  <TabsTrigger value="states">States</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">Panel principal con resumen del componente.</TabsContent>
                <TabsContent value="api">Panel con props y notas de integración.</TabsContent>
                <TabsContent value="states">Panel con variantes y estados visibles.</TabsContent>
              </Tabs>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Orientación vertical"
              className="max-w-3xl"
              code={`<Tabs
  defaultValue="tokens"
  orientation="vertical"
  className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]"
>
  <TabsList className="w-full">
    <TabsTrigger value="tokens">Tokens</TabsTrigger>
    <TabsTrigger value="motion">Motion</TabsTrigger>
    <TabsTrigger value="usage">Usage</TabsTrigger>
  </TabsList>
  <TabsContent value="tokens">Puedes usar orientación vertical para side settings o docs internas.</TabsContent>
  <TabsContent value="motion">La navegación por teclado se mantiene activa.</TabsContent>
  <TabsContent value="usage">También soporta \`activationMode="manual"\`.</TabsContent>
</Tabs>`}
            >
              <Tabs
                defaultValue="tokens"
                orientation="vertical"
                className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]"
              >
                <TabsList className="w-full">
                  <TabsTrigger value="tokens">Tokens</TabsTrigger>
                  <TabsTrigger value="motion">Motion</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                </TabsList>
                <TabsContent value="tokens">Puedes usar orientación vertical para side settings o docs internas.</TabsContent>
                <TabsContent value="motion">La navegación por teclado se mantiene activa.</TabsContent>
                <TabsContent value="usage">También soporta `activationMode="manual"`.</TabsContent>
              </Tabs>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Activación manual"
              code={`<Tabs defaultValue="usage" activationMode="manual">
  <TabsList>
    <TabsTrigger value="usage">Uso</TabsTrigger>
    <TabsTrigger value="accessibility">Accesibilidad</TabsTrigger>
    <TabsTrigger value="patterns">Patrones</TabsTrigger>
  </TabsList>
  <TabsContent value="usage">El panel cambia con click o confirmando con Enter o Espacio.</TabsContent>
  <TabsContent value="accessibility">Útil cuando el contenido es pesado.</TabsContent>
  <TabsContent value="patterns">Ideal para settings y documentación.</TabsContent>
</Tabs>`}
            >
              <Tabs defaultValue="usage" activationMode="manual">
                <TabsList>
                  <TabsTrigger value="usage">Uso</TabsTrigger>
                  <TabsTrigger value="accessibility">Accesibilidad</TabsTrigger>
                  <TabsTrigger value="patterns">Patrones</TabsTrigger>
                </TabsList>
                <TabsContent value="usage">En modo manual, el foco no activa el panel; el cambio ocurre con click o confirmando con Enter o Espacio.</TabsContent>
                <TabsContent value="accessibility">Útil cuando el contenido es pesado o disparas analíticas al cambiar de tab.</TabsContent>
                <TabsContent value="patterns">Funciona bien para documentación, settings y paneles de configuración.</TabsContent>
              </Tabs>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.tabs} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "accordion") ? (
        <SectionCard id="accordion" className={ui.divider}>
          <SectionHeading
            category="Navegación"
            title="Accordion"
            description="Contenedor desplegable para FAQs, settings y contenido denso por secciones."
            ui={ui}
          />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Single"
              className="max-w-2xl"
              code={`<Accordion defaultValue="architecture">
  <AccordionItem value="architecture">
    <AccordionTrigger>Arquitectura base</AccordionTrigger>
    <AccordionContent>Contenido...</AccordionContent>
  </AccordionItem>
</Accordion>`}
            >
              <Accordion defaultValue="architecture">
                <AccordionItem value="architecture">
                  <AccordionTrigger>Arquitectura base</AccordionTrigger>
                  <AccordionContent>Quickit UI se apoya en React, Tailwind y Floating UI, con documentación integrada en la misma base del proyecto.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="theme">
                  <AccordionTrigger>Sistema de tema</AccordionTrigger>
                  <AccordionContent>Todos los componentes consumen `QuickitProvider` para resolver light y dark mode de forma consistente.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Multiple"
              className="max-w-2xl"
              code={`<Accordion type="multiple" defaultValue={["first", "second"]}>
  <AccordionItem value="first">...</AccordionItem>
  <AccordionItem value="second">...</AccordionItem>
</Accordion>`}
            >
              <Accordion type="multiple" defaultValue={["first", "second"]}>
                <AccordionItem value="first">
                  <AccordionTrigger>Múltiple 1</AccordionTrigger>
                  <AccordionContent>Se pueden abrir varios ítems a la vez.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="second">
                  <AccordionTrigger>Múltiple 2</AccordionTrigger>
                  <AccordionContent>Útil para FAQs o filtros extensos.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="FAQ"
              className="max-w-2xl"
              code={`<Accordion defaultValue="shipping">
  <AccordionItem value="shipping">
    <AccordionTrigger>¿Cuándo usar Accordion?</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>`}
            >
              <Accordion defaultValue="shipping">
                <AccordionItem value="shipping">
                  <AccordionTrigger>¿Cuándo usar Accordion?</AccordionTrigger>
                  <AccordionContent>Cuando el contenido es denso y no quieres mostrarlo todo al mismo tiempo, por ejemplo FAQs, filtros avanzados o ajustes secundarios.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="keyboard">
                  <AccordionTrigger>¿Qué soporte de teclado tiene?</AccordionTrigger>
                  <AccordionContent>Los triggers son accesibles y mantienen estados ARIA básicos para mejorar navegación y lectura por asistentes.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="layout">
                  <AccordionTrigger>¿Puedo usarlo dentro de formularios?</AccordionTrigger>
                  <AccordionContent>Sí. Funciona bien para agrupar configuraciones opcionales o bloques de ayuda contextual.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.accordion} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "breadcrumb") ? (
        <SectionCard id="breadcrumb" className={ui.divider}>
          <SectionHeading
            category="Navegación"
            title="Breadcrumb"
            description="Ruta jerárquica para ubicar al usuario dentro de estructuras profundas."
            ui={ui}
          />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Ruta corta"
              code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#getting-started">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbCurrent>Input</BreadcrumbCurrent>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
            >
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#getting-started">Docs</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#input">Forms</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbCurrent>Input</BreadcrumbCurrent>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Ruta profunda"
              code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#getting-started">Quickit UI</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbCurrent>Tooltip</BreadcrumbCurrent>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
            >
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#getting-started">Quickit UI</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#modal">Overlays</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#popover">Popover</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbCurrent>Tooltip</BreadcrumbCurrent>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.breadcrumb} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "pagination") ? (
        <SectionCard id="pagination" className={ui.divider}>
          <SectionHeading
            category="Navegación"
            title="Pagination"
            description="Navegación paginada para tablas, listados y vistas de exploración."
            ui={ui}
          />

          <div className="mt-6 space-y-4">
            <PreviewPanel ui={ui} title="Base" code={`<Pagination count={12} defaultPage={4} />`}>
              <Pagination count={12} defaultPage={4} />
            </PreviewPanel>

            <PreviewPanel ui={ui} title="Más vecinos" code={`<Pagination count={24} defaultPage={10} siblingCount={2} />`}>
              <Pagination count={24} defaultPage={10} siblingCount={2} />
            </PreviewPanel>

            <PreviewPanel ui={ui} title="Compacta" code={`<Pagination count={8} defaultPage={2} siblingCount={0} />`}>
              <div className="space-y-3">
                <p className={`text-sm ${ui.body}`}>Para listados cortos puedes usar menos vecinos visibles y mantener la navegación más compacta.</p>
                <Pagination count={8} defaultPage={2} siblingCount={0} />
              </div>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.pagination} ui={ui} />
          </div>
        </SectionCard>
      ) : null}
    </>
  );
}

export default NavigationDocs;
