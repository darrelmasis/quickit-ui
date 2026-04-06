import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  AvatarPresence,
  Badge,
  Button,
  Default,
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateTitle,
  For,
  Initials,
  Link,
  Match,
  QUICKIT_SEMANTIC_COLORS,
  RenderSwitch,
  Skeleton,
  Show,
  UserChip,
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
  initials: [
    { prop: "name", type: "string | number", defaultValue: "required", description: "Nombre o identificador desde el que se calculan las iniciales." },
    { prop: "max", type: "number", defaultValue: "2", description: "Cantidad máxima de caracteres generados." },
    { prop: "fallback", type: "string", defaultValue: "\"?\"", description: "Valor usado cuando no hay nombre válido." },
  ],
  avatarPresence: [
    { prop: "status", type: "online | away | busy | offline", defaultValue: "online", description: "Estado visual del indicador de presencia." },
    { prop: "size", type: "sm | md | lg | xl | 2xl", defaultValue: "avatar size", description: "Si se usa dentro de `Avatar`, hereda el tamaño automáticamente." },
    { prop: "label", type: "string", defaultValue: "status label", description: "Texto accesible expuesto vía `aria-label`." },
  ],
  userChip: [
    { prop: "name", type: "ReactNode", defaultValue: "required", description: "Nombre principal de la identidad." },
    { prop: "description", type: "ReactNode", defaultValue: "undefined", description: "Texto secundario, cargo o contexto." },
    { prop: "src / initials", type: "string / string", defaultValue: "undefined / generado", description: "Imagen opcional y fallback de iniciales." },
    { prop: "presence", type: "online | away | busy | offline", defaultValue: "undefined", description: "Agrega `AvatarPresence` integrado sobre el avatar." },
    { prop: "href", type: "string", defaultValue: "undefined", description: "Convierte el chip en un enlace compacto." },
    { prop: "trailing", type: "ReactNode", defaultValue: "undefined", description: "Slot para badge, acción o metadato al lado derecho." },
  ],
  link: [
    { prop: "appearance", type: "text | button", defaultValue: "text", description: "Cambia entre enlace de texto y enlace con apariencia de botón." },
    { prop: "variant", type: "default | muted | subtle | solid | outline | ghost", defaultValue: "default", description: "En `text` controla el tono del enlace. En `button` define la variante visual del botón." },
    { prop: "color", type: "neutral | slate | zinc | primary | brand | success | danger | warning | info | light | dark | black", defaultValue: "primary", description: "Color semántico disponible cuando `appearance=\"button\"`. `neutral` mantiene la base premium; `slate`, `zinc`, `dark` y `black` cubren escalas neutras más explícitas." },
    { prop: "size", type: "sm | md | lg | xl | 2xl", defaultValue: "md", description: "Tamaño del enlace cuando `appearance=\"button\"`." },
    { prop: "shape", type: "default | square | pill", defaultValue: "default", description: "Comparte la misma geometría de `Button` cuando `appearance=\"button\"`." },
    { prop: "fullWidth", type: "boolean", defaultValue: "false", description: "Expande el enlace a `w-full` cuando usa apariencia de botón." },
    { prop: "activeMotion", type: "boolean", defaultValue: "true", description: "Desactiva la animación nativa de presión cuando `appearance=\"button\"`." },
    { prop: "underline", type: "always | hover | none", defaultValue: "hover", description: "Controla el subrayado." },
    { prop: "disabled", type: "boolean", defaultValue: "false", description: "Deshabilita interacción." },
  ],
  badge: [
    { prop: "variant", type: "soft | outline | solid", defaultValue: "soft", description: "Tratamiento visual del badge." },
    { prop: "color", type: "neutral | slate | zinc | primary | brand | success | danger | warning | info", defaultValue: "neutral", description: "Color semántico del badge." },
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
  show: [
    { prop: "when", type: "any", defaultValue: "-", description: "Condición o valor a evaluar. Si es truthy renderiza el contenido principal." },
    { prop: "fallback", type: "ReactNode | (value) => ReactNode", defaultValue: "null", description: "Contenido alterno cuando `when` es falsy." },
    { prop: "children", type: "ReactNode | (value) => ReactNode", defaultValue: "-", description: "Acepta JSX directo o una render function que recibe el valor de `when`." },
  ],
  renderSwitch: [
    { prop: "value", type: "any", defaultValue: "-", description: "Valor de entrada sobre el que se resuelven los `Match`." },
    { prop: "fallback", type: "ReactNode | (value) => ReactNode", defaultValue: "null", description: "Fallback opcional cuando no hay `Match` ni `Default`." },
    { prop: "Match.when", type: "any | any[] | (value) => boolean", defaultValue: "-", description: "Acepta comparación exacta, varios valores o un predicado." },
    { prop: "Match.children", type: "ReactNode | (value) => ReactNode", defaultValue: "-", description: "Bloque renderizado cuando el caso coincide." },
    { prop: "Default", type: "subcomponente", defaultValue: "-", description: "Caso final cuando ningún `Match` coincide." },
  ],
  for: [
    { prop: "each", type: "Iterable", defaultValue: "[]", description: "Colección a iterar. Acepta arrays y cualquier iterable." },
    { prop: "children", type: "(item, index) => ReactNode", defaultValue: "-", description: "Render function para cada item de la colección." },
    { prop: "fallback", type: "ReactNode | (items) => ReactNode", defaultValue: "null", description: "Contenido alterno cuando `each` está vacío o no existe." },
  ],
};

const linkButtonColors = QUICKIT_SEMANTIC_COLORS;

const badgeColors = [
  { color: "neutral", label: "Neutral" },
  { color: "slate", label: "Slate" },
  { color: "zinc", label: "Zinc" },
  { color: "primary", label: "Primary" },
  { color: "brand", label: "Brand" },
  { color: "success", label: "Activo" },
  { color: "warning", label: "Pendiente" },
  { color: "danger", label: "Error" },
  { color: "info", label: "Info" },
];

const exampleUser = {
  name: "Elena Ruiz",
  role: "Design lead",
  initials: "ER",
  avatar: "https://i.pravatar.cc/80?img=15",
};

const releaseCandidates = [
  { id: 1, name: "Landing page", owner: "ER", status: "Review" },
  { id: 2, name: "Billing form", owner: "TK", status: "Ready" },
  { id: 3, name: "Invite flow", owner: "RS", status: "Blocked" },
];

const presenceStates = ["online", "away", "busy", "offline"];

const isVisible = (visibleIds, id) => !visibleIds || visibleIds.has(id);

export function UtilityDocs({ ui, visibleIds }) {
  return (
    <>
      {isVisible(visibleIds, "show") ? (
        <SectionCard id="show" className={ui.divider}>
          <SectionHeading category="Logica" title="Show" description="Utilidad para renderizado condicional simple. Sirve para reemplazar ternarios largos y permite usar children o fallback como render functions." ui={ui} />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Estado simple con fallback"
              code={`<Show
  when={true}
  fallback={<Badge color="danger">Sin acceso</Badge>}
>
  <Badge color="success">Acceso concedido</Badge>
</Show>`}
            >
              <Show
                when
                fallback={<Badge color="danger">Sin acceso</Badge>}
              >
                <Badge color="success">Acceso concedido</Badge>
              </Show>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Render function con valor"
              className="max-w-2xl"
              code={`const currentUser = {
  name: "Elena Ruiz",
  role: "Design lead",
  initials: "ER",
  avatar: "https://i.pravatar.cc/80?img=15",
};

<Show
  when={currentUser}
  fallback={
    <EmptyState align="start">
      <EmptyStateTitle>No hay usuario activo</EmptyStateTitle>
      <EmptyStateDescription>
        Inicia sesión para ver el perfil actual.
      </EmptyStateDescription>
    </EmptyState>
  }
>
  {(user) => (
    <div className="flex items-center gap-3 rounded-[1.25rem] border p-4">
      <Avatar size="lg">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.initials}</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <p className="text-sm font-semibold">{user.name}</p>
        <p className="text-sm text-zinc-500">{user.role}</p>
      </div>
    </div>
  )}
</Show>`}
            >
              <Show
                when={exampleUser}
                fallback={
                  <EmptyState align="start">
                    <EmptyStateTitle>No hay usuario activo</EmptyStateTitle>
                    <EmptyStateDescription>
                      Inicia sesión para ver el perfil actual.
                    </EmptyStateDescription>
                  </EmptyState>
                }
              >
                {(user) => (
                  <div className={`flex items-center gap-3 rounded-[1.25rem] border p-4 ${ui.divider}`}>
                    <Avatar size="lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className={`text-sm font-semibold ${ui.title}`}>{user.name}</p>
                      <p className={`text-sm ${ui.body}`}>{user.role}</p>
                    </div>
                  </div>
                )}
              </Show>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.show} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "render-switch") ? (
        <SectionCard id="render-switch" className={ui.divider}>
          <SectionHeading category="Logica" title="RenderSwitch" description="Controla varios caminos de render a partir de un valor. Se llama `RenderSwitch` para no colisionar con el `Switch` de formularios de la libreria." ui={ui} />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Casos por valor"
              code={`const status = "review";

<RenderSwitch value={status}>
  <Match when="draft">
    <Badge color="neutral">Draft</Badge>
  </Match>
  <Match when="review">
    <Badge color="warning">En revision</Badge>
  </Match>
  <Match when="published">
    <Badge color="success">Publicado</Badge>
  </Match>
  <Default>
    <Badge color="info">Archivado</Badge>
  </Default>
</RenderSwitch>`}
            >
              <RenderSwitch value="review">
                <Match when="draft">
                  <Badge color="neutral">Draft</Badge>
                </Match>
                <Match when="review">
                  <Badge color="warning">En revision</Badge>
                </Match>
                <Match when="published">
                  <Badge color="success">Publicado</Badge>
                </Match>
                <Default>
                  <Badge color="info">Archivado</Badge>
                </Default>
              </RenderSwitch>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Arrays y predicados"
              code={`const score = 17;

<RenderSwitch value={score}>
  <Match when={(value) => value < 0}>
    <Badge color="danger">Invalido</Badge>
  </Match>
  <Match when={[0, 1, 2, 3]}>
    <Badge color="neutral">Muy bajo</Badge>
  </Match>
  <Match when={(value) => value < 10}>
    <Badge color="warning">Medio</Badge>
  </Match>
  <Default>
    {(value) => <Badge color="success">Alto: {value}</Badge>}
  </Default>
</RenderSwitch>`}
            >
              <RenderSwitch value={17}>
                <Match when={(value) => value < 0}>
                  <Badge color="danger">Invalido</Badge>
                </Match>
                <Match when={[0, 1, 2, 3]}>
                  <Badge color="neutral">Muy bajo</Badge>
                </Match>
                <Match when={(value) => value < 10}>
                  <Badge color="warning">Medio</Badge>
                </Match>
                <Default>
                  {(value) => <Badge color="success">Alto: {value}</Badge>}
                </Default>
              </RenderSwitch>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.renderSwitch} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "for") ? (
        <SectionCard id="for" className={ui.divider}>
          <SectionHeading category="Logica" title="For" description="Itera colecciones con una API declarativa y un fallback integrado para estados vacios." ui={ui} />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Lista declarativa"
              className="space-y-3"
              code={`const releases = [
  { id: 1, name: "Landing page", owner: "ER", status: "Review" },
  { id: 2, name: "Billing form", owner: "TK", status: "Ready" },
  { id: 3, name: "Invite flow", owner: "RS", status: "Blocked" },
];

<div className="space-y-3">
  <For each={releases}>
    {(release, index) => (
      <div
        key={release.id}
        className="flex items-center justify-between rounded-[1.25rem] border p-4"
      >
        <div>
          <p className="text-sm font-semibold">
            {index + 1}. {release.name}
          </p>
          <p className="text-sm text-zinc-500">
            Owner: {release.owner}
          </p>
        </div>
        <Badge color="neutral">{release.status}</Badge>
      </div>
    )}
  </For>
</div>`}
            >
              <div className="space-y-3">
                <For each={releaseCandidates}>
                  {(release, index) => (
                    <div
                      key={release.id}
                      className={`flex items-center justify-between rounded-[1.25rem] border p-4 ${ui.divider}`}
                    >
                      <div>
                        <p className={`text-sm font-semibold ${ui.title}`}>
                          {index + 1}. {release.name}
                        </p>
                        <p className={`text-sm ${ui.body}`}>
                          Owner: {release.owner}
                        </p>
                      </div>
                      <Badge color="neutral">{release.status}</Badge>
                    </div>
                  )}
                </For>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Fallback vacio"
              className="max-w-2xl"
              code={`<For
  each={[]}
  fallback={
    <EmptyState align="start">
      <EmptyStateTitle>No hay aprobaciones pendientes</EmptyStateTitle>
      <EmptyStateDescription>
        Cuando la colección está vacía puedes devolver un estado vacío completo.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button variant="outline" color="neutral">Actualizar</Button>
      </EmptyStateActions>
    </EmptyState>
  }
>
  {(item) => <div key={item.id}>{item.name}</div>}
</For>`}
            >
              <For
                each={[]}
                fallback={
                  <EmptyState align="start">
                    <EmptyStateTitle>No hay aprobaciones pendientes</EmptyStateTitle>
                    <EmptyStateDescription>
                      Cuando la colección está vacía puedes devolver un estado vacío completo.
                    </EmptyStateDescription>
                    <EmptyStateActions>
                      <Button variant="outline" color="neutral">Actualizar</Button>
                    </EmptyStateActions>
                  </EmptyState>
                }
              >
                {(item) => <div key={item.id}>{item.name}</div>}
              </For>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.for} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

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
              title="Fallback por error de imagen"
              code={`<Avatar size="lg">
  <AvatarImage src="https://example.com/avatar-no-existe.png" alt="Elena Ruiz" />
  <AvatarFallback>ER</AvatarFallback>
</Avatar>`}
            >
              <Avatar size="lg">
                <AvatarImage src="https://example.com/avatar-no-existe.png" alt="Elena Ruiz" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
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
            <p className={`text-sm font-semibold ${ui.title}`}>Avatar API</p>
            <PropsTable rows={apis.avatar} ui={ui} />
          </div>

        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "initials") ? (
        <SectionCard id="initials" className={ui.divider}>
          <SectionHeading category="Identidad" title="Initials" description="Generador mínimo de iniciales para fallbacks de avatar, chips de equipo o entidades sin imagen." ui={ui} />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Casos base"
              code={`<div className="flex flex-wrap items-center gap-4">
  <Initials name="Elena Ruiz" />
  <Initials name="Quickit UI" />
  <Initials name="Plataforma de diseño" max={3} />
  <Initials name="" fallback="NA" />
</div>`}
            >
              <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                <Initials name="Elena Ruiz" />
                <Initials name="Quickit UI" />
                <Initials name="Plataforma de diseño" max={3} />
                <Initials name="" fallback="NA" />
              </div>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.initials} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "avatar-presence") ? (
        <SectionCard id="avatar-presence" className={ui.divider}>
          <SectionHeading category="Identidad" title="AvatarPresence" description="Indicador compacto de presencia para online, away, busy u offline. Puede vivir dentro del `Avatar` y heredar su tamaño." ui={ui} />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Estados"
              code={`<div className="flex flex-wrap items-center gap-4">
  <Avatar size="lg">
    <AvatarFallback>ER</AvatarFallback>
    <AvatarPresence status="online" />
  </Avatar>
  <Avatar size="lg">
    <AvatarFallback>RS</AvatarFallback>
    <AvatarPresence status="away" />
  </Avatar>
  <Avatar size="lg">
    <AvatarFallback>TK</AvatarFallback>
    <AvatarPresence status="busy" />
  </Avatar>
  <Avatar size="lg">
    <AvatarFallback>QA</AvatarFallback>
    <AvatarPresence status="offline" />
  </Avatar>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-4">
                {presenceStates.map((status) => (
                  <Avatar key={status} size="lg">
                    <AvatarFallback>{status.slice(0, 2)}</AvatarFallback>
                    <AvatarPresence status={status} />
                  </Avatar>
                ))}
              </div>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.avatarPresence} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "user-chip") ? (
        <SectionCard id="user-chip" className={ui.divider}>
          <SectionHeading category="Identidad" title="UserChip" description="Composición compacta de identidad con avatar, nombre, descripción, presencia y slot trailing para badges o acciones." ui={ui} />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Casos base"
              className="flex flex-col items-start gap-3"
              code={`<div className="flex flex-col items-start gap-3">
  <UserChip
    name="Elena Ruiz"
    description="Design lead"
    src="https://i.pravatar.cc/80?img=15"
    presence="online"
  />

  <UserChip
    href="#"
    name="Quickit Team"
    description="Sistema de diseño"
    initials="QT"
    shape="rounded"
    trailing={<Badge color="brand">Core</Badge>}
  />
</div>`}
            >
              <div className="flex flex-col items-start gap-3">
                <UserChip
                  name="Elena Ruiz"
                  description="Design lead"
                  src="https://i.pravatar.cc/80?img=15"
                  presence="online"
                />

                <UserChip
                  href="#"
                  name="Quickit Team"
                  description="Sistema de diseño"
                  initials="QT"
                  shape="rounded"
                  trailing={<Badge color="brand">Core</Badge>}
                />
              </div>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>API</p>
            <PropsTable rows={apis.userChip} ui={ui} />
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
              title="Shapes compartidos con Button"
              code={`<div className="flex flex-wrap items-center gap-3">
  <Link href="#" appearance="button" color="neutral">Default</Link>
  <Link href="#" appearance="button" shape="pill" color="neutral">Pill</Link>
  <Link
    href="#"
    appearance="button"
    shape="square"
    color="neutral"
    aria-label="Abrir panel"
    title="Abrir panel"
  >
    +
  </Link>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Link href="#" appearance="button" color="neutral">Default</Link>
                <Link href="#" appearance="button" shape="pill" color="neutral">Pill</Link>
                <Link
                  href="#"
                  appearance="button"
                  shape="square"
                  color="neutral"
                  aria-label="Abrir panel"
                  title="Abrir panel"
                >
                  +
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
    <Link href="#" appearance="button" variant="outline" color="slate">slate</Link>
    <Link href="#" appearance="button" variant="outline" color="zinc">zinc</Link>
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
  <Badge color="slate">Slate</Badge>
  <Badge color="zinc">Zinc</Badge>
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
