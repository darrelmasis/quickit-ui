import { useMemo, useState } from "react";
import { Badge, Button, Checkbox, Input, Progress, Select, Textarea } from "@/lib";

const WEBSITE_SHELL = "mx-auto w-full max-w-7xl px-6 lg:px-8";

function ExampleBlock({ id, title, description, children }) {
  return (
    <section id={id} className="scroll-mt-28 space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          {title}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
      </div>
      {children}
    </section>
  );
}

function ExampleSidebar() {
  const nav = useMemo(
    () => [
      { id: "acceso", label: "Acceso y registro" },
      { id: "mensajes", label: "Mensajes y estados" },
      { id: "equipo", label: "Equipo y presencia" },
      { id: "progreso", label: "Progreso y seguimiento" },
      { id: "controles", label: "Controles avanzados" },
      { id: "layout", label: "Layout y secciones" },
    ],
    [],
  );

  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 self-start">
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Ejemplos</p>
        <div className="mt-3 space-y-1">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="block rounded-lg px-2 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

function LoginExampleCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-4 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Inicio de sesion</h3>
          <Badge color="brand" variant="soft">SSO</Badge>
        </div>
        <Input placeholder="Correo" type="email" />
        <Input placeholder="Contrasena" type="password" passwordToggle />
        <div className="flex items-center justify-between">
          <Checkbox label="Recordarme" />
          <a href="#" className="text-xs text-brand-600 hover:underline">Recuperar acceso</a>
        </div>
        <Button color="brand" fullWidth>Entrar</Button>
      </div>
      <div className="space-y-4 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <h3 className="font-semibold">Registro rapido</h3>
        <Input placeholder="Nombre del equipo" />
        <Select defaultValue="saas">
          <option value="saas">SaaS</option>
          <option value="commerce">Commerce</option>
          <option value="agency">Agency</option>
        </Select>
        <Textarea rows={4} placeholder="Cuéntanos qué quieres lanzar primero." />
        <Button variant="outline" color="neutral" fullWidth>Crear workspace</Button>
      </div>
    </div>
  );
}

function StatusExampleCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-emerald-300/60 bg-emerald-50/60 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/20">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Success</p>
        <p className="mt-2 text-sm">Cambios guardados correctamente.</p>
      </div>
      <div className="rounded-2xl border border-amber-300/60 bg-amber-50/60 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Warning</p>
        <p className="mt-2 text-sm">Falta validar un paso del flujo.</p>
      </div>
      <div className="rounded-2xl border border-rose-300/60 bg-rose-50/60 p-4 dark:border-rose-900/60 dark:bg-rose-950/20">
        <p className="text-xs font-semibold uppercase tracking-wide text-rose-700 dark:text-rose-300">Error</p>
        <p className="mt-2 text-sm">No se pudo enviar la configuracion.</p>
      </div>
    </div>
  );
}

function TeamExampleCard() {
  const members = [
    { name: "Ada Lovelace", role: "Systems design", status: "Online" },
    { name: "Grace Hopper", role: "Platform engineering", status: "Away" },
    { name: "Margaret Hamilton", role: "Release operations", status: "Busy" },
  ];

  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div key={member.name} className="flex items-center justify-between rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
          <div>
            <p className="font-medium text-neutral-950 dark:text-neutral-50">{member.name}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{member.role}</p>
          </div>
          <Badge variant="soft" color={member.status === "Online" ? "success" : member.status === "Away" ? "warning" : "danger"}>
            {member.status}
          </Badge>
        </div>
      ))}
    </div>
  );
}

function ProgressExampleCard() {
  const [value, setValue] = useState(72);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Cobertura de onboarding</p>
        <Badge color="brand" variant="soft">{value}%</Badge>
      </div>
      <Progress value={value} color="brand" />
      <input
        className="w-full accent-sky-600"
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
    </div>
  );
}

function ControlsExampleCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-3">
        <label className="text-sm text-neutral-600 dark:text-neutral-400">Canal principal</label>
        <Select defaultValue="email">
          <option value="email">Email</option>
          <option value="chat">In-app chat</option>
          <option value="webhook">Webhook</option>
        </Select>
      </div>
      <div className="space-y-3">
        <label className="text-sm text-neutral-600 dark:text-neutral-400">Responsable</label>
        <Input placeholder="Buscar owner" />
      </div>
      <div className="sm:col-span-2 space-y-3">
        <label className="text-sm text-neutral-600 dark:text-neutral-400">Notas</label>
        <Textarea rows={4} placeholder="Comparte alcance, riesgos y criterio de salida." />
      </div>
      <div className="sm:col-span-2 flex items-center justify-between">
        <Checkbox label="Notificar al equipo por email" />
        <Button color="brand">Programar</Button>
      </div>
    </div>
  );
}

function LayoutExampleCard() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge color="brand" variant="soft">Nuevo release</Badge>
            <h3 className="mt-2 text-xl font-semibold text-neutral-950 dark:text-neutral-50">
              Quickit UI para paneles en produccion
            </h3>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" color="neutral">Ver changelog</Button>
            <Button color="brand">Instalar</Button>
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Release</p>
          <p className="mt-1 text-2xl font-semibold">1.0.0</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Docs</p>
          <p className="mt-1 text-2xl font-semibold">Unificadas</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Setup</p>
          <p className="mt-1 text-2xl font-semibold">Minutos</p>
        </div>
      </div>
    </div>
  );
}

export default function ExamplesPage() {
  return (
    <main className={`${WEBSITE_SHELL} pb-20 pt-10 sm:pt-14`}>
      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <ExampleSidebar />

        <div className="space-y-8">
          <header className="space-y-3">
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Documentacion</p>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">
              Flujos reales con Quickit UI
            </h1>
            <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
              Esta pagina fue reconstruida para mantener una experiencia estable en
              produccion. Los ejemplos priorizan confiabilidad y composicion simple.
            </p>
          </header>

          <ExampleBlock
            id="acceso"
            title="Acceso y registro"
            description="Plantillas base para autenticacion y creación de workspace."
          >
            <LoginExampleCard />
          </ExampleBlock>

          <ExampleBlock
            id="mensajes"
            title="Mensajes y estados"
            description="Estados visuales para feedback de operaciones."
          >
            <StatusExampleCard />
          </ExampleBlock>

          <ExampleBlock
            id="equipo"
            title="Equipo y presencia"
            description="Listado de responsables y estado operativo."
          >
            <TeamExampleCard />
          </ExampleBlock>

          <ExampleBlock
            id="progreso"
            title="Progreso y seguimiento"
            description="Monitoreo simple del avance de un flujo."
          >
            <ProgressExampleCard />
          </ExampleBlock>

          <ExampleBlock
            id="controles"
            title="Controles avanzados"
            description="Formulario de planeacion con datos mínimos."
          >
            <ControlsExampleCard />
          </ExampleBlock>

          <ExampleBlock
            id="layout"
            title="Layout y secciones"
            description="Cabecera de producto y métricas de contexto."
          >
            <LayoutExampleCard />
          </ExampleBlock>
        </div>
      </div>
    </main>
  );
}
