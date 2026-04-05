import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Badge,
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateTitle,
  Link,
  Skeleton,
} from "@/lib";
import {
  PreviewPanel,
  PropsTable,
  SectionCard,
  SectionHeading,
} from "@/docs/components/DocsPrimitives";

const apis = {
  avatar: [
    { prop: "size", type: "sm | md | lg | xl | 2xl", defaultValue: "md", description: "Controla el tamaño del avatar base." },
    { prop: "shape", type: "circle | rounded | square", defaultValue: "circle", description: "Permite cambiar la geometría del avatar." },
    { prop: "AvatarImage / AvatarFallback / AvatarGroup", type: "subcomponentes", defaultValue: "-", description: "Partes disponibles para construir el avatar." },
  ],
  link: [
    { prop: "variant", type: "default | muted | subtle", defaultValue: "default", description: "Variante visual del enlace." },
    { prop: "underline", type: "always | hover | none", defaultValue: "hover", description: "Controla el subrayado." },
    { prop: "disabled", type: "boolean", defaultValue: "false", description: "Deshabilita interacción." },
  ],
  badge: [
    { prop: "variant", type: "soft | outline | solid", defaultValue: "soft", description: "Tratamiento visual del badge." },
    { prop: "color", type: "neutral | primary | success | danger | warning | info", defaultValue: "neutral", description: "Color semántico del badge." },
    { prop: "size", type: "sm | md", defaultValue: "sm", description: "Ajusta la densidad visual." },
  ],
  skeleton: [
    { prop: "shape", type: "line | rect | circle", defaultValue: "line", description: "Morfología del placeholder." },
    { prop: "animated", type: "boolean", defaultValue: "true", description: "Activa la animación de carga." },
  ],
  emptyState: [
    { prop: "align", type: "center | start", defaultValue: "center", description: "Alinea el contenido principal del estado vacío." },
    { prop: "EmptyStateActions", type: "subcomponente", defaultValue: "-", description: "Agrupa botones o links de acción." },
  ],
};

const isVisible = (visibleIds, id) => !visibleIds || visibleIds.has(id);

export function UtilityDocs({ ui, visibleIds }) {
  return (
    <>
      {isVisible(visibleIds, "avatar") ? (
        <SectionCard id="avatar" className={ui.divider}>
          <SectionHeading category="Identidad" title="Avatar" description="Representación compacta de usuarios, equipos o entidades con imagen, fallback y agrupación." ui={ui} />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Tamaños"
              code={`<div className="flex flex-wrap items-center gap-4">
  <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
  <Avatar size="md"><AvatarFallback>MD</AvatarFallback></Avatar>
  <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-4">
                <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
                <Avatar size="md"><AvatarFallback>MD</AvatarFallback></Avatar>
                <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
                <Avatar size="xl"><AvatarFallback>XL</AvatarFallback></Avatar>
                <Avatar size="2xl"><AvatarFallback>2X</AvatarFallback></Avatar>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Shapes"
              code={`<div className="flex flex-wrap items-center gap-4">
  <Avatar shape="circle"><AvatarFallback>CI</AvatarFallback></Avatar>
  <Avatar shape="rounded"><AvatarFallback>RO</AvatarFallback></Avatar>
  <Avatar shape="square"><AvatarFallback>SQ</AvatarFallback></Avatar>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-4">
                <Avatar shape="circle"><AvatarFallback>CI</AvatarFallback></Avatar>
                <Avatar shape="rounded"><AvatarFallback>RO</AvatarFallback></Avatar>
                <Avatar shape="square"><AvatarFallback>SQ</AvatarFallback></Avatar>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Group"
              code={`<AvatarGroup>
  <Avatar size="lg">
    <AvatarImage src="https://i.pravatar.cc/80?img=15" alt="Elena" />
    <AvatarFallback>EL</AvatarFallback>
  </Avatar>
  <Avatar size="lg"><AvatarFallback>RS</AvatarFallback></Avatar>
</AvatarGroup>`}
            >
              <AvatarGroup>
                <Avatar size="lg">
                  <AvatarImage src="https://i.pravatar.cc/80?img=15" alt="Elena" />
                  <AvatarFallback>EL</AvatarFallback>
                </Avatar>
                <Avatar size="lg"><AvatarFallback>RS</AvatarFallback></Avatar>
                <Avatar size="lg"><AvatarFallback>TK</AvatarFallback></Avatar>
                <Avatar size="lg"><AvatarFallback>+3</AvatarFallback></Avatar>
              </AvatarGroup>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.avatar} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "link") ? (
        <SectionCard id="link" className={ui.divider}>
          <SectionHeading category="Acciones" title="Link" description="Enlace de texto para acciones secundarias y navegación ligera, con variantes suaves y control de subrayado." ui={ui} />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Variantes"
              code={`<div className="flex flex-wrap items-center gap-4">
  <Link href="#button">Default link</Link>
  <Link href="#input" variant="muted">Muted link</Link>
  <Link href="#accordion" variant="subtle" underline="always">Always underline</Link>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-4">
                <Link href="#button">Default link</Link>
                <Link href="#input" variant="muted">Muted link</Link>
                <Link href="#accordion" variant="subtle" underline="always">Always underline</Link>
                <Link href="#badge" variant="default" underline="none">No underline</Link>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Inline"
              code={`<p>
  Puedes usar <Link href="#modal" underline="always">Link</Link> dentro de párrafos.
</p>`}
            >
              <p className={`text-sm leading-7 ${ui.body}`}>
                Puedes usar <Link href="#modal" underline="always">Link</Link> dentro de párrafos,
                documentación o acciones secundarias sin tener que recurrir a estilos ad hoc.
              </p>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.link} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "badge") ? (
        <SectionCard id="badge" className={ui.divider}>
          <SectionHeading category="Feedback" title="Badge" description="Etiqueta compacta para estados, categorías y pequeños metadatos." ui={ui} />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Variantes neutras"
              code={`<div className="flex flex-wrap items-center gap-3">
  <Badge color="neutral">Soft</Badge>
  <Badge variant="outline" color="neutral">Outline</Badge>
  <Badge variant="solid" color="neutral">Solid</Badge>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge color="neutral">Soft</Badge>
                <Badge variant="outline" color="neutral">Outline</Badge>
                <Badge variant="solid" color="neutral">Solid</Badge>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Tamaños"
              code={`<div className="flex flex-wrap items-center gap-3">
  <Badge size="sm" color="neutral">Small</Badge>
  <Badge size="md" color="neutral">Medium</Badge>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge size="sm" color="neutral">Small</Badge>
                <Badge size="md" color="neutral">Medium</Badge>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Colores semánticos"
              code={`<div className="flex flex-wrap items-center gap-3">
  <Badge color="success">Activo</Badge>
  <Badge color="warning">Pendiente</Badge>
  <Badge color="danger">Error</Badge>
  <Badge color="info">Info</Badge>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge color="success">Activo</Badge>
                <Badge color="warning">Pendiente</Badge>
                <Badge color="danger">Error</Badge>
                <Badge color="info">Info</Badge>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Colores por variante"
              code={`<div className="flex flex-wrap items-center gap-3">
  <Badge variant="soft" color="primary">Soft</Badge>
  <Badge variant="outline" color="primary">Outline</Badge>
  <Badge variant="solid" color="primary">Solid</Badge>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="soft" color="primary">Soft</Badge>
                <Badge variant="outline" color="primary">Outline</Badge>
                <Badge variant="solid" color="primary">Solid</Badge>
              </div>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.badge} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "skeleton") ? (
        <SectionCard id="skeleton" className={ui.divider}>
          <SectionHeading category="Feedback" title="Skeleton" description="Placeholder visual para cargas iniciales de listas, cards o detalle." ui={ui} />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Simple"
              className="max-w-xl space-y-3"
              code={`<div className="flex items-center gap-3">
  <Skeleton shape="circle" />
  <div className="flex-1 space-y-2">
    <Skeleton className="w-1/3" />
    <Skeleton className="w-2/3" />
  </div>
</div>`}
            >
              <div className="flex items-center gap-3">
                <Skeleton shape="circle" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-1/3" />
                  <Skeleton className="w-2/3" />
                </div>
              </div>
              <Skeleton shape="rect" className="h-32" />
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Layout compuesto"
              className="space-y-4"
              code={`<div className="space-y-4">
  <div className="flex items-center gap-3">
    <Skeleton shape="circle" className="size-10" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
  <Skeleton shape="rect" className="h-56 rounded-[1.5rem]" />
</div>`}
            >
              <div className="flex items-center gap-3">
                <Skeleton shape="circle" className="size-10" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <Skeleton shape="rect" className="h-56 rounded-[1.5rem]" />
              <div className="grid gap-3 md:grid-cols-3">
                <Skeleton shape="rect" className="h-24" />
                <Skeleton shape="rect" className="h-24" />
                <Skeleton shape="rect" className="h-24" />
              </div>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.skeleton} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "empty-state") ? (
        <SectionCard id="empty-state" className={ui.divider}>
          <SectionHeading category="Feedback" title="EmptyState" description="Estado vacío para primeros usos, resultados sin datos o vistas pendientes de configurar." ui={ui} />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Centered"
              className="max-w-2xl"
              code={`<EmptyState>
  <EmptyStateTitle>No hay proyectos publicados</EmptyStateTitle>
  <EmptyStateDescription>
    Crea tu primer proyecto para empezar a documentar componentes.
  </EmptyStateDescription>
  <EmptyStateActions>
    <Button variant="ghost" color="neutral">Ver guía</Button>
    <Button color="neutral">Crear proyecto</Button>
  </EmptyStateActions>
</EmptyState>`}
            >
              <EmptyState>
                <EmptyStateTitle>No hay proyectos publicados</EmptyStateTitle>
                <EmptyStateDescription>
                  Crea tu primer proyecto para empezar a documentar componentes, estados y casos de uso dentro de Quickit UI.
                </EmptyStateDescription>
                <EmptyStateActions>
                  <Button variant="ghost" color="neutral">Ver guía</Button>
                  <Button color="neutral">Crear proyecto</Button>
                </EmptyStateActions>
              </EmptyState>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Start aligned"
              className="max-w-2xl"
              code={`<EmptyState align="start">
  <EmptyStateTitle>No hay resultados</EmptyStateTitle>
  <EmptyStateDescription>
    Ajusta tus filtros o cambia el criterio de búsqueda.
  </EmptyStateDescription>
  <EmptyStateActions>
    <Button variant="outline" color="neutral">Limpiar filtros</Button>
  </EmptyStateActions>
</EmptyState>`}
            >
              <EmptyState align="start">
                <EmptyStateTitle>No hay resultados</EmptyStateTitle>
                <EmptyStateDescription>
                  Ajusta tus filtros o cambia el criterio de búsqueda para seguir explorando.
                </EmptyStateDescription>
                <EmptyStateActions>
                  <Button variant="outline" color="neutral">Limpiar filtros</Button>
                </EmptyStateActions>
              </EmptyState>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.emptyState} ui={ui} />
          </div>
        </SectionCard>
      ) : null}
    </>
  );
}

export default UtilityDocs;
