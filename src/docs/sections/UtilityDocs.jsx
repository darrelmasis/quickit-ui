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
    { prop: "stacked", type: "boolean", defaultValue: "true", description: "En `AvatarGroup` activa el overlap con mask adaptado por `shape` y `size`." },
    { prop: "AvatarImage / AvatarFallback / AvatarGroup", type: "subcomponentes", defaultValue: "-", description: "Partes disponibles para construir el avatar. `AvatarGroup` adapta el overlap y el mask al `shape` y `size` de cada item." },
  ],
  link: [
    { prop: "appearance", type: "text | button", defaultValue: "text", description: "Cambia entre enlace de texto y enlace con apariencia de botón." },
    { prop: "variant", type: "default | muted | subtle | solid | outline | ghost", defaultValue: "default", description: "En `text` controla el tono del enlace. En `button` define la variante visual del botón." },
    { prop: "color", type: "neutral | primary | brand | success | danger | warning | info | light | dark", defaultValue: "primary", description: "Color semántico disponible cuando `appearance=\"button\"`. `brand` está pensado para la paleta de marca del producto." },
    { prop: "size", type: "sm | md | lg | xl | 2xl", defaultValue: "md", description: "Tamaño del enlace cuando `appearance=\"button\"`." },
    { prop: "fullWidth", type: "boolean", defaultValue: "false", description: "Expande el enlace a `w-full` cuando usa apariencia de botón." },
    { prop: "activeMotion", type: "boolean", defaultValue: "true", description: "Desactiva la animación nativa de presión cuando `appearance=\"button\"`." },
    { prop: "underline", type: "always | hover | none", defaultValue: "hover", description: "Controla el subrayado." },
    { prop: "disabled", type: "boolean", defaultValue: "false", description: "Deshabilita interacción." },
  ],
  badge: [
    { prop: "variant", type: "soft | outline | solid", defaultValue: "soft", description: "Tratamiento visual del badge." },
    { prop: "color", type: "neutral | primary | brand | success | danger | warning | info", defaultValue: "neutral", description: "Color semántico del badge." },
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

const linkButtonColors = [
  "neutral",
  "primary",
  "brand",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];

const badgeColors = [
  { color: "neutral", label: "Neutral" },
  { color: "primary", label: "Primary" },
  { color: "brand", label: "Brand" },
  { color: "success", label: "Activo" },
  { color: "warning", label: "Pendiente" },
  { color: "danger", label: "Error" },
  { color: "info", label: "Info" },
];

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
  <Avatar size="lg"><AvatarFallback>TK</AvatarFallback></Avatar>
  <Avatar size="lg"><AvatarFallback>+3</AvatarFallback></Avatar>
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

            <PreviewPanel
              ui={ui}
              title="Group por shape"
              code={`<div className="flex flex-wrap items-center gap-6">
  <AvatarGroup>
    <Avatar size="lg" shape="circle"><AvatarFallback>CI</AvatarFallback></Avatar>
    <Avatar size="lg" shape="circle"><AvatarFallback>RS</AvatarFallback></Avatar>
    <Avatar size="lg" shape="circle"><AvatarFallback>TK</AvatarFallback></Avatar>
  </AvatarGroup>

  <AvatarGroup>
    <Avatar size="lg" shape="rounded"><AvatarFallback>RO</AvatarFallback></Avatar>
    <Avatar size="lg" shape="rounded"><AvatarFallback>MV</AvatarFallback></Avatar>
    <Avatar size="lg" shape="rounded"><AvatarFallback>QA</AvatarFallback></Avatar>
  </AvatarGroup>

  <AvatarGroup>
    <Avatar size="lg" shape="square"><AvatarFallback>SQ</AvatarFallback></Avatar>
    <Avatar size="lg" shape="square"><AvatarFallback>UI</AvatarFallback></Avatar>
    <Avatar size="lg" shape="square"><AvatarFallback>DS</AvatarFallback></Avatar>
  </AvatarGroup>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-6">
                <AvatarGroup>
                  <Avatar size="lg" shape="circle"><AvatarFallback>CI</AvatarFallback></Avatar>
                  <Avatar size="lg" shape="circle"><AvatarFallback>RS</AvatarFallback></Avatar>
                  <Avatar size="lg" shape="circle"><AvatarFallback>TK</AvatarFallback></Avatar>
                </AvatarGroup>

                <AvatarGroup>
                  <Avatar size="lg" shape="rounded"><AvatarFallback>RO</AvatarFallback></Avatar>
                  <Avatar size="lg" shape="rounded"><AvatarFallback>MV</AvatarFallback></Avatar>
                  <Avatar size="lg" shape="rounded"><AvatarFallback>QA</AvatarFallback></Avatar>
                </AvatarGroup>

                <AvatarGroup>
                  <Avatar size="lg" shape="square"><AvatarFallback>SQ</AvatarFallback></Avatar>
                  <Avatar size="lg" shape="square"><AvatarFallback>UI</AvatarFallback></Avatar>
                  <Avatar size="lg" shape="square"><AvatarFallback>DS</AvatarFallback></Avatar>
                </AvatarGroup>
              </div>
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
          <SectionHeading category="Acciones" title="Link" description="Enlace base para navegación. Puede usarse como texto o con apariencia completa de botón cuando la acción debe seguir siendo un enlace." ui={ui} />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Variantes"
              code={`<div className="flex flex-wrap items-center gap-4">
  <Link href="#">Default link</Link>
  <Link href="#" variant="muted">Muted link</Link>
  <Link href="#" variant="subtle" underline="always">Always underline</Link>
  <Link href="#" variant="default" underline="none">No underline</Link>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-4">
                <Link href="#">Default link</Link>
                <Link href="#" variant="muted">Muted link</Link>
                <Link href="#" variant="subtle" underline="always">Always underline</Link>
                <Link href="#" variant="default" underline="none">No underline</Link>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Como botón"
              code={`<div className="flex flex-wrap items-center gap-3">
  <Link href="#" appearance="button" color="neutral">
    Abrir guía
  </Link>
  <Link href="#" appearance="button" color="brand">
    Brand kit
  </Link>
  <Link href="#" appearance="button" variant="outline" color="neutral">
    Ver ejemplo
  </Link>
  <Link href="#" appearance="button" variant="ghost" color="neutral">
    Ver modal
  </Link>
  <Link href="#" appearance="button" color="neutral" activeMotion={false}>
    Sin active motion
  </Link>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Link href="#" appearance="button" color="neutral">
                  Abrir guía
                </Link>
                <Link href="#" appearance="button" color="brand">
                  Brand kit
                </Link>
                <Link href="#" appearance="button" variant="outline" color="neutral">
                  Ver ejemplo
                </Link>
                <Link href="#" appearance="button" variant="ghost" color="neutral">
                  Ver modal
                </Link>
                <Link href="#" appearance="button" color="neutral" activeMotion={false}>
                  Sin active motion
                </Link>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Button sizes y colores"
              code={`<div className="space-y-4">
  <div className="flex flex-wrap items-center gap-3">
    <Link href="#" appearance="button" size="sm" color="neutral">Small</Link>
    <Link href="#" appearance="button" size="md" color="neutral">Medium</Link>
    <Link href="#" appearance="button" size="lg" color="neutral">Large</Link>
    <Link href="#" appearance="button" size="xl" color="neutral">XL</Link>
    <Link href="#" appearance="button" size="2xl" color="neutral">2XL</Link>
  </div>
  <div className="flex flex-wrap items-center gap-3">
    <Link href="#" appearance="button" variant="outline" color="neutral">neutral</Link>
    <Link href="#" appearance="button" variant="outline" color="primary">primary</Link>
    <Link href="#" appearance="button" variant="outline" color="brand">brand</Link>
    <Link href="#" appearance="button" variant="outline" color="success">success</Link>
    <Link href="#" appearance="button" variant="outline" color="danger">danger</Link>
    <Link href="#" appearance="button" variant="outline" color="warning">warning</Link>
    <Link href="#" appearance="button" variant="outline" color="info">info</Link>
    <Link href="#" appearance="button" variant="outline" color="light">light</Link>
    <Link href="#" appearance="button" variant="outline" color="dark">dark</Link>
  </div>
</div>`}
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="#" appearance="button" size="sm" color="neutral">Small</Link>
                  <Link href="#" appearance="button" size="md" color="neutral">Medium</Link>
                  <Link href="#" appearance="button" size="lg" color="neutral">Large</Link>
                  <Link href="#" appearance="button" size="xl" color="neutral">XL</Link>
                  <Link href="#" appearance="button" size="2xl" color="neutral">2XL</Link>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {linkButtonColors.map((color) => (
                    <Link key={color} href="#" appearance="button" variant="outline" color={color}>
                      {color}
                    </Link>
                  ))}
                </div>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Inline"
              code={`<p>
  Puedes usar <Link href="#" underline="always">Link</Link> dentro de párrafos.
</p>`}
            >
              <p className={`text-sm leading-7 ${ui.body}`}>
                Puedes usar <Link href="#" underline="always">Link</Link> dentro de párrafos,
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
  <Badge color="neutral">Neutral</Badge>
  <Badge color="primary">Primary</Badge>
  <Badge color="brand">Brand</Badge>
  <Badge color="success">Activo</Badge>
  <Badge color="warning">Pendiente</Badge>
  <Badge color="danger">Error</Badge>
  <Badge color="info">Info</Badge>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                {badgeColors.map((item) => (
                  <Badge key={item.color} color={item.color}>{item.label}</Badge>
                ))}
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
              title="Shapes"
              className="max-w-xl space-y-3"
              code={`<div className="flex items-center gap-3">
  <Skeleton shape="circle" />
  <div className="flex-1 space-y-2">
    <Skeleton className="w-1/3" />
    <Skeleton className="w-2/3" />
  </div>
  <Skeleton shape="rect" className="h-16 w-28" />
</div>`}
            >
              <div className="flex items-center gap-3">
                <Skeleton shape="circle" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-1/3" />
                  <Skeleton className="w-2/3" />
                </div>
                <Skeleton shape="rect" className="h-16 w-28" />
              </div>
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
  <div className="grid gap-3 md:grid-cols-3">
    <Skeleton shape="rect" className="h-24" />
    <Skeleton shape="rect" className="h-24" />
    <Skeleton shape="rect" className="h-24" />
  </div>
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
    Crea tu primer proyecto para empezar a documentar componentes, estados y casos de uso dentro de Quickit UI.
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
    Ajusta tus filtros o cambia el criterio de búsqueda para seguir explorando.
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
