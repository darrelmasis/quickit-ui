import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  Button,
  Checkbox,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateTitle,
  FormControl,
  FormDescription,
  Input,
  Label,
  Link,
  Modal,
  ModalAction,
  ModalActions,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Pagination,
  Popover,
  Radio,
  Select,
  Skeleton,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
} from "@/lib";
import { cn } from "@/lib/utils";
import {
  PreviewPanel,
  SectionCard,
  SectionHeading,
} from "@/docs/components/DocsPrimitives";
import { EXAMPLE_GROUPS } from "@/docs/config";

const isVisible = (visibleIds, id) => !visibleIds || visibleIds.has(id);
const EXAMPLE_VIEWPORTS = [
  { id: "mobile", label: "Móvil", width: 390 },
  { id: "tablet", label: "Tablet", width: 768 },
  { id: "desktop", label: "Escritorio", width: null },
];

function ExampleFrame({ children }) {
  const iframeRef = useRef(null);
  const [mountNode, setMountNode] = useState(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (!iframe) {
      return undefined;
    }

    const documentElement = iframe.contentDocument;

    if (!documentElement) {
      return undefined;
    }

    documentElement.open();
    documentElement.write(`<!doctype html>
      <html>
        <head></head>
        <body>
          <div id="example-root"></div>
        </body>
      </html>`);
    documentElement.close();

    const copiedNodes = [];
    document.head
      .querySelectorAll('style, link[rel="stylesheet"]')
      .forEach((node) => {
        const clone = node.cloneNode(true);
        clone.setAttribute("data-docs-preview-style", "");
        documentElement.head.appendChild(clone);
        copiedNodes.push(clone);
      });

    const syncDocumentTheme = () => {
      documentElement.documentElement.className = document.documentElement.className;
      documentElement.documentElement.style.cssText =
        document.documentElement.style.cssText;
      documentElement.body.className = document.body.className;
      documentElement.body.style.margin = "0";
      documentElement.body.style.background = "transparent";
    };

    syncDocumentTheme();

    const observer = new MutationObserver(syncDocumentTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    setMountNode(documentElement.getElementById("example-root"));

    return () => {
      observer.disconnect();
      copiedNodes.forEach((node) => node.remove());
      setMountNode(null);
    };
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    const documentElement = iframe?.contentDocument;

    if (!iframe || !documentElement || !mountNode) {
      return undefined;
    }

    const updateHeight = () => {
      const nextHeight = Math.max(
        mountNode.scrollHeight,
        documentElement.body.scrollHeight,
        documentElement.documentElement.scrollHeight,
      );

      iframe.style.height = `${nextHeight}px`;
    };

    const frameWindow = documentElement.defaultView;
    const observer = new ResizeObserver(() => {
      frameWindow?.requestAnimationFrame(updateHeight);
    });

    observer.observe(mountNode);
    observer.observe(documentElement.body);
    observer.observe(documentElement.documentElement);
    frameWindow?.addEventListener("resize", updateHeight);
    updateHeight();

    return () => {
      observer.disconnect();
      frameWindow?.removeEventListener("resize", updateHeight);
    };
  }, [mountNode]);

  return (
    <>
      <iframe
        ref={iframeRef}
        title="Vista previa responsive"
        className="block w-full overflow-hidden rounded-[1.25rem] border-0 bg-transparent"
      />
      {mountNode ? createPortal(children, mountNode) : null}
    </>
  );
}

function ExampleViewport({ children, ui, defaultViewport = "desktop" }) {
  const viewportCanvasRef = useRef(null);
  const dragCleanupRef = useRef(null);
  const [availableWidth, setAvailableWidth] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const defaultViewportConfig =
    EXAMPLE_VIEWPORTS.find((item) => item.id === defaultViewport) ??
    EXAMPLE_VIEWPORTS[2];
  const [currentWidth, setCurrentWidth] = useState(defaultViewportConfig.width);

  useEffect(() => {
    const canvasElement = viewportCanvasRef.current;

    if (!canvasElement) {
      return undefined;
    }

    const updateAvailableWidth = () => {
      setAvailableWidth(Math.max(320, canvasElement.clientWidth));
    };

    const observer = new ResizeObserver(updateAvailableWidth);
    observer.observe(canvasElement);
    updateAvailableWidth();

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(
    () => () => {
      dragCleanupRef.current?.();
    },
    [],
  );

  const resolvedWidth = currentWidth ?? availableWidth ?? 320;
  const clampedWidth = availableWidth
    ? Math.min(Math.max(resolvedWidth, 320), availableWidth)
    : Math.max(resolvedWidth, 320);
  const renderedWidth = currentWidth === null ? availableWidth : clampedWidth;

  const handlePointerDown = (event) => {
    const canvasElement = viewportCanvasRef.current;
    const handleElement = event.currentTarget;

    if (!canvasElement) {
      return;
    }

    event.preventDefault();
    setIsDragging(true);

    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
    event.currentTarget.setPointerCapture?.(event.pointerId);

    const canvasRect = canvasElement.getBoundingClientRect();

    const updateWidthFromPointer = (clientX) => {
      const nextWidth = Math.min(
        Math.max(clientX - canvasRect.left, 320),
        canvasRect.width,
      );

      setCurrentWidth(Math.round(nextWidth));
    };

    updateWidthFromPointer(event.clientX);

    const handlePointerMove = (moveEvent) => {
      updateWidthFromPointer(moveEvent.clientX);
    };

    let cleanedUp = false;
    const cleanupDrag = () => {
      if (cleanedUp) {
        return;
      }

      cleanedUp = true;
      setIsDragging(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      handleElement.releasePointerCapture?.(event.pointerId);
      handleElement.removeEventListener("pointermove", handlePointerMove);
      handleElement.removeEventListener("pointerup", cleanupDrag);
      handleElement.removeEventListener("pointercancel", cleanupDrag);
      handleElement.removeEventListener("lostpointercapture", cleanupDrag);
      window.removeEventListener("blur", cleanupDrag);
      dragCleanupRef.current = null;
    };

    dragCleanupRef.current?.();
    dragCleanupRef.current = cleanupDrag;

    handleElement.addEventListener("pointermove", handlePointerMove);
    handleElement.addEventListener("pointerup", cleanupDrag, {
      once: true,
    });
    handleElement.addEventListener("pointercancel", cleanupDrag, {
      once: true,
    });
    handleElement.addEventListener("lostpointercapture", cleanupDrag, {
      once: true,
    });
    window.addEventListener("blur", cleanupDrag, { once: true });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {EXAMPLE_VIEWPORTS.map((viewport) => {
            const isActive =
              viewport.width === null
                ? currentWidth === null
                : currentWidth === viewport.width;

            return (
              <Button
                key={viewport.id}
                size="sm"
                color="neutral"
                variant={isActive ? "solid" : "outline"}
                activeMotion={false}
                onClick={() => setCurrentWidth(viewport.width)}
              >
                {viewport.label}
              </Button>
            );
          })}
          <Button
            size="sm"
            color="neutral"
            variant={currentWidth === null ? "solid" : "outline"}
            activeMotion={false}
            onClick={() => setCurrentWidth(null)}
          >
            Fluido
          </Button>
        </div>

        <p className={`text-xs ${ui.body}`}>
          Base: {defaultViewportConfig.width ? `${defaultViewportConfig.width}px` : "100%"}.
          Actual: {renderedWidth ? `${renderedWidth}px` : "100%"}. Arrastra el
          borde derecho para ajustar con precisión.
        </p>
      </div>

      <div ref={viewportCanvasRef} className="w-full overflow-visible">
        <div className="flex justify-start">
          <div
            className={cn(
              "relative rounded-[1.5rem] border border-dashed p-3 sm:p-4",
              !isDragging && "transition-[width] duration-150",
              ui.preview,
            )}
            style={{
              width: currentWidth === null ? "100%" : `${clampedWidth}px`,
              maxWidth: "100%",
            }}
          >
            <ExampleFrame key={defaultViewportConfig.id}>
              {children}
            </ExampleFrame>
            <button
              type="button"
              aria-label="Ajustar ancho del ejemplo"
              className="absolute inset-y-0 -right-6 z-10 flex w-12 cursor-ew-resize touch-none items-center justify-center rounded-full bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60"
              onPointerDown={handlePointerDown}
            >
              <span className="h-24 w-2 rounded-full border border-white/10 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExamplesOverview({ ui }) {
  return (
    <SectionCard id="examples" className={ui.divider}>
      <SectionHeading
        category="Ejemplos"
        title="Biblioteca de ejemplos"
        description="Colección de pantallas y organismos reales para ver cómo se combinan los componentes de Quickit en flujos completos."
        ui={ui}
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {EXAMPLE_GROUPS.map((group) => (
          <div
            key={group.label}
            className={cn(
              "rounded-[1.5rem] border p-5",
              ui.panel,
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${ui.accent}`}>
                {group.label}
              </p>
              <Badge color="neutral" variant="outline">
                {group.items.length}
              </Badge>
            </div>
            <p className={`mt-3 text-sm leading-6 ${ui.body}`}>
              {group.id === "acceso"
                ? "Patrones de inicio de sesión, registro y recuperación listos para flujos de identidad."
                : group.id === "formularios"
                  ? "Formularios, configuración y capturas de datos con jerarquía clara entre campos y acciones."
                  : "Pantallas de producto con navegación, estados, planes y paneles internos listos para combinar componentes."}
            </p>
            <div className="mt-5 space-y-2">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  appearance="button"
                  color="neutral"
                  variant="outline"
                  fullWidth
                  className="justify-start"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function ExamplesDocs({ ui, visibleIds }) {
  return (
    <>
      {isVisible(visibleIds, "examples") ? <ExamplesOverview ui={ui} /> : null}

      {isVisible(visibleIds, "login-example") ? (
        <SectionCard id="login-example" className={ui.divider}>
          <SectionHeading
            category="Ejemplos"
            title="Inicio de sesión"
            description="Ejemplo de organismo para autenticación con un bloque principal, acción primaria en `brand` y alternativas secundarias."
            ui={ui}
          />

          <div className="mt-6">
            <PreviewPanel
              ui={ui}
              title="Acceso básico"
              className="w-full !border-transparent !bg-transparent !p-0"
              code={`<div className="mx-auto max-w-md rounded-[1.5rem] border p-5 sm:p-6">
  <Badge variant="outline" color="brand">Quickit</Badge>
  <h3 className="mt-4 text-xl font-semibold">Inicia sesión</h3>
  <p className="mt-2 text-sm leading-6 text-neutral-500">
    Accede a tu panel de componentes, revisiones y documentación interna.
  </p>

  <div className="mt-6 space-y-4">
    <FormControl>
      <Label>Correo</Label>
      <Input type="email" color="primary" placeholder="equipo@quickit.dev" />
    </FormControl>

    <FormControl>
      <Label>Contraseña</Label>
      <Input type="password" color="brand" placeholder="••••••••" />
    </FormControl>

    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Checkbox
        id="login-remember"
        defaultChecked
        label="Recordarme"
      />
      <Link href="#" variant="muted">
        ¿Olvidaste tu contraseña?
      </Link>
    </div>

    <Button color="brand" fullWidth>
      Entrar
    </Button>

    <Button color="neutral" variant="outline" fullWidth>
      Continuar con SSO
    </Button>
  </div>
</div>`}
            >
              <ExampleViewport ui={ui} defaultViewport="mobile">
                <div
                  className={`mx-auto max-w-md rounded-[1.5rem] border p-5 sm:p-6 ${ui.introCard}`}
                >
                  <Badge variant="outline" color="brand">
                    Quickit
                  </Badge>
                  <h3 className={`mt-4 text-xl font-semibold ${ui.title}`}>
                    Inicia sesión
                  </h3>
                  <p className={`mt-2 text-sm leading-6 ${ui.body}`}>
                    Accede a tu panel de componentes, revisiones y documentación
                    interna.
                  </p>

                  <div className="mt-6 space-y-4">
                    <FormControl>
                      <Label>Correo</Label>
                      <Input type="email" color="primary" placeholder="equipo@quickit.dev" />
                    </FormControl>

                    <FormControl>
                      <Label>Contraseña</Label>
                      <Input type="password" color="brand" placeholder="••••••••" />
                    </FormControl>

                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Checkbox
                        id="login-remember-preview"
                        defaultChecked
                        label="Recordarme"
                        labelClassName={`leading-5 ${ui.body}`}
                      />
                      <Link href="#" variant="muted">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>

                    <Button color="brand" fullWidth>
                      Entrar
                    </Button>

                    <Button color="neutral" variant="outline" fullWidth>
                      Continuar con SSO
                    </Button>
                  </div>
                </div>
              </ExampleViewport>
            </PreviewPanel>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "signup-example") ? (
        <SectionCard id="signup-example" className={ui.divider}>
          <SectionHeading
            category="Ejemplos"
            title="Registro"
            description="Flujo de alta con identidad de marca, confirmación de contraseña y consentimiento antes de crear el espacio de trabajo."
            ui={ui}
          />

          <div className="mt-6">
            <PreviewPanel
              ui={ui}
              title="Registro de cuenta"
              className="w-full !border-transparent !bg-transparent !p-0"
              code={`<div className="mx-auto max-w-lg rounded-[1.5rem] border p-5 sm:p-6">
  <Badge color="brand" variant="soft">Nuevo workspace</Badge>
  <h3 className="mt-4 text-xl font-semibold">Crea tu cuenta</h3>

  <div className="mt-6 grid gap-4 md:grid-cols-2">
    <FormControl>
      <Label>Nombre</Label>
      <Input placeholder="Ada" />
    </FormControl>

    <FormControl>
      <Label>Apellido</Label>
      <Input placeholder="Lovelace" />
    </FormControl>
  </div>

  <FormControl className="mt-4">
    <Label>Correo de trabajo</Label>
    <Input type="email" placeholder="equipo@empresa.com" />
  </FormControl>

  <div className="mt-4 grid gap-4 md:grid-cols-2">
    <FormControl>
      <Label>Contraseña</Label>
      <Input type="password" placeholder="••••••••" />
    </FormControl>

    <FormControl>
      <Label>Confirmar</Label>
      <Input type="password" placeholder="••••••••" />
    </FormControl>
  </div>

  <Checkbox
    id="signup-terms"
    defaultChecked
    label="Acepto términos y notificaciones clave"
    containerClassName="mt-4"
  />

  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
    <Button color="brand" className="w-full sm:w-48">Crear cuenta</Button>
    <Button color="neutral" variant="outline" className="w-full sm:w-48">Invitación existente</Button>
  </div>
</div>`}
            >
              <ExampleViewport ui={ui} defaultViewport="mobile">
                <div
                  className={`mx-auto max-w-lg rounded-[1.5rem] border p-5 sm:p-6 ${ui.introCard}`}
                >
                  <Badge color="brand" variant="soft">
                    Nuevo workspace
                  </Badge>
                  <h3 className={`mt-4 text-xl font-semibold ${ui.title}`}>
                    Crea tu cuenta
                  </h3>
                  <p className={`mt-2 text-sm leading-6 ${ui.body}`}>
                    Empieza con un formulario de alta claro, con copy directo y
                    una acción principal visible para convertir mejor.
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <FormControl>
                      <Label>Nombre</Label>
                      <Input placeholder="Ada" />
                    </FormControl>

                    <FormControl>
                      <Label>Apellido</Label>
                      <Input placeholder="Lovelace" />
                    </FormControl>
                  </div>

                  <FormControl className="mt-4">
                    <Label>Correo de trabajo</Label>
                    <Input type="email" placeholder="equipo@empresa.com" />
                  </FormControl>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <FormControl>
                      <Label>Contraseña</Label>
                      <Input type="password" placeholder="••••••••" />
                    </FormControl>

                    <FormControl>
                      <Label>Confirmar</Label>
                      <Input type="password" placeholder="••••••••" />
                    </FormControl>
                  </div>

                  <Checkbox
                    id="signup-terms-preview"
                    defaultChecked
                    label="Acepto términos, privacidad y notificaciones clave."
                    containerClassName="mt-4"
                    labelClassName={`leading-5 ${ui.body}`}
                  />

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button color="brand" className="w-full sm:w-48">
                      Crear cuenta
                    </Button>
                    <Button
                      color="neutral"
                      variant="outline"
                      className="w-full sm:w-48"
                    >
                      Invitación existente
                    </Button>
                  </div>
                </div>
              </ExampleViewport>
            </PreviewPanel>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "contact-form-example") ? (
        <SectionCard id="contact-form-example" className={ui.divider}>
          <SectionHeading
            category="Ejemplos"
            title="Formulario de contacto"
            description="Ejemplo de formulario más completo con select, textarea, consentimiento y una jerarquía clara de acciones."
            ui={ui}
          />

          <div className="mt-6">
            <PreviewPanel
              ui={ui}
              title="Contacto"
              className="w-full !border-transparent !bg-transparent !p-0"
              code={`<div className="rounded-[1.5rem] border p-5 sm:p-6">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <h3 className="text-xl font-semibold">Hablemos de tu producto</h3>
      <p className="mt-2 max-w-2xl text-sm text-neutral-500">
        Usa este patrón para soporte, demos comerciales o formularios de ventas.
      </p>
    </div>
    <Badge color="brand" variant="soft">Respuesta en 24h</Badge>
  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2">
    <FormControl>
      <Label>Nombre</Label>
      <Input placeholder="Tu nombre" />
    </FormControl>

    <FormControl>
      <Label>Correo</Label>
      <Input type="email" placeholder="nombre@empresa.com" />
    </FormControl>
  </div>

  <FormControl className="mt-4">
    <Label>Motivo</Label>
    <Select defaultValue="demo">
      <option value="demo">Solicitar demo</option>
      <option value="support">Soporte</option>
      <option value="partnership">Partnership</option>
    </Select>
  </FormControl>

  <FormControl className="mt-4">
    <Label>Mensaje</Label>
    <Textarea minRows={5} placeholder="Cuéntanos qué necesitas" />
  </FormControl>

  <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <Checkbox
      id="contact-follow-up"
      defaultChecked
      label="Acepto recibir seguimiento por correo"
    />

    <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
      <Button color="neutral" variant="ghost" className="w-full sm:w-40">Limpiar</Button>
      <Button color="brand" className="w-full sm:w-52">Enviar mensaje</Button>
    </div>
  </div>
</div>`}
            >
              <ExampleViewport ui={ui} defaultViewport="tablet">
                <div className={`rounded-[1.5rem] border p-5 sm:p-6 ${ui.introCard}`}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h3 className={`text-xl font-semibold ${ui.title}`}>
                        Hablemos de tu producto
                      </h3>
                      <p
                        className={`mt-2 max-w-2xl text-sm leading-6 ${ui.body}`}
                      >
                        Usa este patrón para soporte, demos comerciales o
                        formularios de ventas con una estructura clara y
                        reusable.
                      </p>
                    </div>
                    <Badge color="brand" variant="soft">
                      Respuesta en 24h
                    </Badge>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <FormControl>
                      <Label>Nombre</Label>
                      <Input placeholder="Tu nombre" />
                    </FormControl>

                    <FormControl>
                      <Label>Correo</Label>
                      <Input type="email" placeholder="nombre@empresa.com" />
                    </FormControl>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <FormControl>
                      <Label>Motivo</Label>
                      <Select defaultValue="demo">
                        <option value="demo">Solicitar demo</option>
                        <option value="support">Soporte</option>
                        <option value="partnership">Partnership</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <Label>Equipo</Label>
                      <Input placeholder="Producto, diseño, ingeniería..." />
                    </FormControl>
                  </div>

                  <FormControl className="mt-4">
                    <Label>Mensaje</Label>
                    <Textarea
                      minRows={5}
                      placeholder="Cuéntanos qué flujo quieres construir o qué problema intentas resolver."
                    />
                    <FormDescription>
                      Entre más contexto compartas, más útil será la respuesta.
                    </FormDescription>
                  </FormControl>

                  <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <Checkbox
                      id="contact-follow-up"
                      defaultChecked
                      label="Acepto recibir seguimiento por correo"
                      labelClassName={`leading-5 ${ui.body}`}
                    />

                    <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                      <Button
                        color="neutral"
                        variant="ghost"
                        className="w-full sm:w-40"
                      >
                        Limpiar
                      </Button>
                      <Button color="brand" className="w-full sm:w-52">
                        Enviar mensaje
                      </Button>
                    </div>
                  </div>
                </div>
              </ExampleViewport>
            </PreviewPanel>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "profile-settings-example") ? (
        <SectionCard id="profile-settings-example" className={ui.divider}>
          <SectionHeading
            category="Ejemplos"
            title="Configuración de perfil"
            description="Pantalla de ajustes para actualizar identidad, rol y biografía sin perder jerarquía visual entre campos y acciones."
            ui={ui}
          />

          <div className="mt-6">
            <PreviewPanel
              ui={ui}
              title="Perfil de usuario"
              className="w-full !border-transparent !bg-transparent !p-0"
              code={`<div className="rounded-[1.5rem] border p-5 sm:p-6">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <h3 className="text-xl font-semibold">Perfil del workspace</h3>
      <p className="mt-2 text-sm text-neutral-500">
        Mantén tus datos visibles y tu rol actualizado.
      </p>
    </div>
    <Badge variant="outline" color="neutral">Guardado automático</Badge>
  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2">
    <FormControl>
      <Label>Nombre visible</Label>
      <Input defaultValue="Ada Lovelace" />
    </FormControl>

    <FormControl>
      <Label>Rol</Label>
      <Select defaultValue="engineering">
        <option value="engineering">Ingeniería</option>
        <option value="design">Diseño</option>
        <option value="product">Producto</option>
      </Select>
    </FormControl>
  </div>

  <FormControl className="mt-4">
    <Label>Biografía</Label>
    <Textarea minRows={4} />
  </FormControl>

  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
    <Button color="neutral" className="w-full sm:w-48">Guardar cambios</Button>
    <Button color="neutral" variant="ghost" className="w-full sm:w-40">Cancelar</Button>
  </div>
</div>`}
            >
              <ExampleViewport ui={ui} defaultViewport="tablet">
                <div className={`rounded-[1.5rem] border p-5 sm:p-6 ${ui.introCard}`}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h3 className={`text-xl font-semibold ${ui.title}`}>
                        Perfil del workspace
                      </h3>
                      <p className={`mt-2 text-sm leading-6 ${ui.body}`}>
                        Mantén tus datos visibles, tu rol actualizado y un
                        bloque biográfico limpio para paneles internos.
                      </p>
                    </div>
                    <Badge variant="outline" color="neutral">
                      Guardado automático
                    </Badge>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <FormControl>
                      <Label>Nombre visible</Label>
                      <Input defaultValue="Ada Lovelace" />
                    </FormControl>

                    <FormControl>
                      <Label>Rol</Label>
                      <Select defaultValue="engineering">
                        <option value="engineering">Ingeniería</option>
                        <option value="design">Diseño</option>
                        <option value="product">Producto</option>
                      </Select>
                    </FormControl>
                  </div>

                  <FormControl className="mt-4">
                    <Label>Biografía</Label>
                    <Textarea
                      minRows={4}
                      defaultValue="Trabajo en diseño de sistemas y componentes reutilizables para productos internos."
                    />
                    <FormDescription>
                      Usa este espacio para contexto corto y consistente.
                    </FormDescription>
                  </FormControl>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button color="neutral" className="w-full sm:w-48">
                      Guardar cambios
                    </Button>
                    <Button
                      color="neutral"
                      variant="ghost"
                      className="w-full sm:w-40"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </ExampleViewport>
            </PreviewPanel>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "recovery-example") ? (
        <SectionCard id="recovery-example" className={ui.divider}>
          <SectionHeading
            category="Ejemplos"
            title="Recuperar acceso"
            description="Organismo compacto para recuperación de acceso o reenvío de enlaces mágicos con una acción principal y contexto auxiliar."
            ui={ui}
          />

          <div className="mt-6">
            <PreviewPanel
              ui={ui}
              title="Recuperación"
              className="w-full !border-transparent !bg-transparent !p-0"
              code={`<div className="mx-auto max-w-md rounded-[1.5rem] border p-5 sm:p-6">
  <Badge variant="soft" color="brand">Seguridad</Badge>
  <h3 className="mt-4 text-xl font-semibold">Recupera tu acceso</h3>

  <FormControl className="mt-6">
    <Label>Correo</Label>
    <Input type="email" placeholder="equipo@quickit.dev" />
  </FormControl>

  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
    <Button color="brand" className="w-full sm:w-48">Enviar enlace</Button>
    <Button color="neutral" variant="outline" className="w-full sm:w-40">Volver</Button>
  </div>
</div>`}
            >
              <ExampleViewport ui={ui} defaultViewport="mobile">
                <div
                  className={`mx-auto max-w-md rounded-[1.5rem] border p-5 sm:p-6 ${ui.introCard}`}
                >
                  <Badge variant="soft" color="brand">
                    Seguridad
                  </Badge>
                  <h3 className={`mt-4 text-xl font-semibold ${ui.title}`}>
                    Recupera tu acceso
                  </h3>
                  <p className={`mt-2 text-sm leading-6 ${ui.body}`}>
                    Te enviaremos un enlace temporal para que restablezcas tu
                    sesión sin depender de soporte manual.
                  </p>

                  <FormControl className="mt-6">
                    <Label>Correo</Label>
                    <Input type="email" placeholder="equipo@quickit.dev" />
                    <FormDescription>
                      Usa el correo con el que creaste tu espacio de trabajo.
                    </FormDescription>
                  </FormControl>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button color="brand" className="w-full sm:w-48">
                      Enviar enlace
                    </Button>
                    <Button
                      color="neutral"
                      variant="outline"
                      className="w-full sm:w-40"
                    >
                      Volver
                    </Button>
                  </div>
                </div>
              </ExampleViewport>
            </PreviewPanel>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "plan-selector-example") ? (
        <SectionCard id="plan-selector-example" className={ui.divider}>
          <SectionHeading
            category="Ejemplos"
            title="Selección de plan"
            description="Organismo para pricing o upgrade con comparación breve, radios claros y una acción principal contextual."
            ui={ui}
          />

          <div className="mt-6">
            <PreviewPanel
              ui={ui}
              title="Elegir plan"
              className="w-full !border-transparent !bg-transparent !p-0"
              code={`<div className="rounded-[1.5rem] border p-5 sm:p-6">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <h3 className="text-xl font-semibold">Selecciona un plan</h3>
      <p className="mt-2 text-sm text-neutral-500">
        Cambia de nivel según el volumen de tu equipo.
      </p>
    </div>
    <Badge color="brand" variant="soft">Ahorro anual</Badge>
  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    <Label htmlFor="plan-starter" className="block h-full rounded-[1.25rem] border p-4">
      <div className="flex items-start gap-3">
        <Radio id="plan-starter" name="plan" defaultChecked />
        <div className="min-w-0 flex-1">
          <p className="pt-0.5 font-semibold leading-5">Starter</p>
          <p className="mt-1 text-sm text-neutral-500">Hasta 5 usuarios</p>
          <p className="mt-2 text-lg font-semibold">$19</p>
        </div>
      </div>
    </Label>
    <Label htmlFor="plan-growth" className="block h-full rounded-[1.25rem] border p-4">
      <div className="flex items-start gap-3">
        <Radio id="plan-growth" name="plan" />
        <div className="min-w-0 flex-1">
          <p className="pt-0.5 font-semibold leading-5">Growth</p>
          <p className="mt-1 text-sm text-neutral-500">Hasta 20 usuarios</p>
          <p className="mt-2 text-lg font-semibold">$59</p>
        </div>
      </div>
    </Label>
    <Label htmlFor="plan-scale" className="block h-full rounded-[1.25rem] border p-4">
      <div className="flex items-start gap-3">
        <Radio id="plan-scale" name="plan" />
        <div className="min-w-0 flex-1">
          <p className="pt-0.5 font-semibold leading-5">Scale</p>
          <p className="mt-1 text-sm text-neutral-500">Usuarios ilimitados</p>
          <p className="mt-2 text-lg font-semibold">Personalizado</p>
        </div>
      </div>
    </Label>
  </div>

  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
    <Button color="brand" className="w-full sm:w-48">Continuar</Button>
    <Button color="neutral" variant="outline" className="w-full sm:w-52">Hablar con ventas</Button>
  </div>
</div>`}
            >
              <ExampleViewport ui={ui} defaultViewport="desktop">
                <div className={`rounded-[1.5rem] border p-5 sm:p-6 ${ui.introCard}`}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h3 className={`text-xl font-semibold ${ui.title}`}>
                        Selecciona un plan
                      </h3>
                      <p className={`mt-2 text-sm leading-6 ${ui.body}`}>
                        Cambia de nivel según el volumen del equipo, el número
                        de workspaces y el soporte que necesitas.
                      </p>
                    </div>
                    <Badge color="brand" variant="soft">
                      Ahorro anual
                    </Badge>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <Label
                      htmlFor="plan-starter-preview"
                      className={cn(
                        "block h-full rounded-[1.25rem] border p-4",
                        ui.panel,
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Radio
                          id="plan-starter-preview"
                          name="plan"
                          defaultChecked
                        />
                        <div className="min-w-0 flex-1">
                          <p className={`pt-0.5 font-semibold leading-5 ${ui.title}`}>
                            Starter
                          </p>
                          <p className={`mt-1 text-sm ${ui.body}`}>
                            Hasta 5 usuarios
                          </p>
                          <p
                            className={`mt-2 text-lg font-semibold ${ui.title}`}
                          >
                            $19
                          </p>
                        </div>
                      </div>
                    </Label>

                    <Label
                      htmlFor="plan-growth-preview"
                      className={cn(
                        "block h-full rounded-[1.25rem] border p-4",
                        ui.panel,
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Radio id="plan-growth-preview" name="plan" />
                        <div className="min-w-0 flex-1">
                          <p className={`pt-0.5 font-semibold leading-5 ${ui.title}`}>
                            Growth
                          </p>
                          <p className={`mt-1 text-sm ${ui.body}`}>
                            Hasta 20 usuarios
                          </p>
                          <p
                            className={`mt-2 text-lg font-semibold ${ui.title}`}
                          >
                            $59
                          </p>
                        </div>
                      </div>
                    </Label>

                    <Label
                      htmlFor="plan-scale-preview"
                      className={cn(
                        "block h-full rounded-[1.25rem] border p-4",
                        ui.panel,
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Radio id="plan-scale-preview" name="plan" />
                        <div className="min-w-0 flex-1">
                          <p className={`pt-0.5 font-semibold leading-5 ${ui.title}`}>
                            Scale
                          </p>
                          <p className={`mt-1 text-sm ${ui.body}`}>
                            Usuarios ilimitados
                          </p>
                          <p
                            className={`mt-2 text-lg font-semibold ${ui.title}`}
                          >
                            Personalizado
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button color="brand" className="w-full sm:w-48">
                      Continuar
                    </Button>
                    <Button
                      color="neutral"
                      variant="outline"
                      className="w-full sm:w-52"
                    >
                      Hablar con ventas
                    </Button>
                  </div>
                </div>
              </ExampleViewport>
            </PreviewPanel>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "dashboard-example") ? (
        <SectionCard id="dashboard-example" className={ui.divider}>
          <SectionHeading
            category="Ejemplos"
            title="Panel de revisiones"
            description="Patrón de panel interno que combina navegación contextual, filtros, tabs, overlays ligeros y paginación."
            ui={ui}
          />

          <div className="mt-6">
            <PreviewPanel
              ui={ui}
              title="Panel con navegación y filtros"
              className="w-full !border-transparent !bg-transparent !p-0"
              code={`<div className="rounded-[1.5rem] border p-5 sm:p-6">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem allowLink href="#">Workspace</BreadcrumbItem>
          <BreadcrumbItem allowLink href="#">Revisiones</BreadcrumbItem>
          <BreadcrumbItem current>Sprint 14</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h3 className="text-xl font-semibold">Estado del sprint</h3>
        <p className="mt-2 max-w-2xl text-sm text-neutral-500">
          Revisa incidencias abiertas, aprobaciones pendientes y handoff entre diseño y desarrollo.
        </p>
      </div>
    </div>

    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <AvatarGroup>
        <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>MV</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>QS</AvatarFallback></Avatar>
      </AvatarGroup>

      <Dropdown>
        <DropdownTrigger asChild>
          <Button color="neutral" variant="outline" className="w-full sm:w-auto">
            Acciones
          </Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Filtrar aprobadas</DropdownItem>
          <DropdownItem>Asignar reviewer</DropdownItem>
          <DropdownSeparator />
          <DropdownItem variant="danger">Cerrar sprint</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  </div>

  <Tabs defaultValue="overview" color="brand" className="mt-6">
    <TabsList>
      <TabsTrigger value="overview">Resumen</TabsTrigger>
      <TabsTrigger value="queue">Pendientes</TabsTrigger>
      <TabsTrigger value="team">Equipo</TabsTrigger>
    </TabsList>

    <TabsContent value="overview">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.25rem] border p-4">
          <p className="text-sm text-neutral-500">Pendientes</p>
          <p className="mt-2 text-2xl font-semibold">18</p>
        </div>
        <div className="rounded-[1.25rem] border p-4">
          <p className="text-sm text-neutral-500">Aprobadas</p>
          <p className="mt-2 text-2xl font-semibold">42</p>
        </div>
        <div className="rounded-[1.25rem] border p-4">
          <p className="text-sm text-neutral-500">Bloqueadas</p>
          <p className="mt-2 text-2xl font-semibold">3</p>
        </div>
      </div>
    </TabsContent>

    <TabsContent value="queue">
      <div className="space-y-3">
        <div className="rounded-[1.25rem] border p-4">Card de revisión</div>
        <div className="rounded-[1.25rem] border p-4">Card de revisión</div>
      </div>
    </TabsContent>

    <TabsContent value="team">
      <div className="rounded-[1.25rem] border p-4">
        <p className="font-medium">Equipo del sprint</p>
      </div>
    </TabsContent>
  </Tabs>

  <div className="mt-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip content="Crea una nueva revisión para el sprint actual">
        <Button color="brand" className="w-full sm:w-44">Nueva revisión</Button>
      </Tooltip>
      <Popover
        trigger="click"
        placement="bottom-start"
        color="neutral"
        content={<p className="max-w-xs text-sm">Comparte este panel con diseño, QA y producto usando el mismo estado del sprint.</p>}
      >
        <Button color="neutral" variant="outline" className="w-full sm:w-40">
          Compartir
        </Button>
      </Popover>
    </div>

    <Pagination count={8} defaultPage={3} color="brand" />
  </div>
</div>`}
            >
              <ExampleViewport ui={ui} defaultViewport="desktop">
                <div className={`rounded-[1.5rem] border p-5 sm:p-6 ${ui.introCard}`}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-4">
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem allowLink href="#">
                            Workspace
                          </BreadcrumbItem>
                          <BreadcrumbItem allowLink href="#">
                            Revisiones
                          </BreadcrumbItem>
                          <BreadcrumbItem current>Sprint 14</BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>

                      <div>
                        <h3 className={`text-xl font-semibold ${ui.title}`}>
                          Estado del sprint
                        </h3>
                        <p className={`mt-2 max-w-2xl text-sm leading-6 ${ui.body}`}>
                          Revisa incidencias abiertas, aprobaciones pendientes y
                          handoff entre diseño y desarrollo.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <AvatarGroup>
                        <Avatar>
                          <AvatarFallback>AL</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback>MV</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback>QS</AvatarFallback>
                        </Avatar>
                      </AvatarGroup>

                      <Dropdown>
                        <DropdownTrigger asChild>
                          <Button
                            color="neutral"
                            variant="outline"
                            className="w-full sm:w-auto"
                          >
                            Acciones
                          </Button>
                        </DropdownTrigger>
                        <DropdownContent>
                          <DropdownItem>Filtrar aprobadas</DropdownItem>
                          <DropdownItem>Asignar reviewer</DropdownItem>
                          <DropdownSeparator />
                          <DropdownItem variant="danger">
                            Cerrar sprint
                          </DropdownItem>
                        </DropdownContent>
                      </Dropdown>
                    </div>
                  </div>

                  <Tabs defaultValue="overview" color="brand" className="mt-6">
                    <TabsList>
                      <TabsTrigger value="overview">Resumen</TabsTrigger>
                      <TabsTrigger value="queue">Pendientes</TabsTrigger>
                      <TabsTrigger value="team">Equipo</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                      <div className="grid gap-4 md:grid-cols-3">
                        {[
                          ["Pendientes", "18"],
                          ["Aprobadas", "42"],
                          ["Bloqueadas", "3"],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className={`rounded-[1.25rem] border p-4 ${ui.panel}`}
                          >
                            <p className={`text-sm ${ui.body}`}>{label}</p>
                            <p className={`mt-2 text-2xl font-semibold ${ui.title}`}>
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="queue">
                      <div className="space-y-3">
                        {[
                          "QA para panel de métricas",
                          "Aprobación final de tabla responsive",
                        ].map((item) => (
                          <div
                            key={item}
                            className={`rounded-[1.25rem] border p-4 ${ui.panel}`}
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className={`font-medium ${ui.title}`}>{item}</p>
                                <p className={`mt-1 text-sm ${ui.body}`}>
                                  Pendiente de revisión por producto.
                                </p>
                              </div>
                              <Badge color="warning" variant="soft">
                                Pendiente
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="team">
                      <div className={`rounded-[1.25rem] border p-4 ${ui.panel}`}>
                        <p className={`font-medium ${ui.title}`}>Equipo del sprint</p>
                        <p className={`mt-2 text-sm leading-6 ${ui.body}`}>
                          Diseño, QA y desarrollo trabajando con el mismo flujo
                          de aprobación y seguimiento.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                      <Tooltip content="Crea una nueva revisión para el sprint actual">
                        <Button color="brand" className="w-full sm:w-44">
                          Nueva revisión
                        </Button>
                      </Tooltip>
                      <Popover
                        trigger="click"
                        placement="bottom-start"
                        color="neutral"
                        content={
                          <p className="max-w-xs text-sm">
                            Comparte este panel con diseño, QA y producto usando
                            el mismo estado del sprint.
                          </p>
                        }
                      >
                        <Button
                          color="neutral"
                          variant="outline"
                          className="w-full sm:w-40"
                        >
                          Compartir
                        </Button>
                      </Popover>
                    </div>

                    <Pagination count={8} defaultPage={3} color="brand" />
                  </div>
                </div>
              </ExampleViewport>
            </PreviewPanel>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "help-center-example") ? (
        <SectionCard id="help-center-example" className={ui.divider}>
          <SectionHeading
            category="Ejemplos"
            title="Centro de ayuda"
            description="Ejemplo de preguntas frecuentes y preferencias con `Accordion`, `Switch` y un flujo de `Modal` para confirmar cambios."
            ui={ui}
          />

          <div className="mt-6">
            <PreviewPanel
              ui={ui}
              title="Preguntas frecuentes y preferencias"
              className="w-full !border-transparent !bg-transparent !p-0"
              code={`<div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
  <div className="rounded-[1.5rem] border p-5 sm:p-6">
    <h3 className="text-xl font-semibold">Centro de ayuda</h3>
    <Accordion defaultValue="item-1" className="mt-4">
      <AccordionItem value="item-1">
        <AccordionTrigger>¿Cómo invito revisores?</AccordionTrigger>
        <AccordionContent>
          Invita personas desde el panel del sprint y asígnales permisos por flujo.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>¿Cómo cierro una revisión?</AccordionTrigger>
        <AccordionContent>
          Usa el menú contextual o la acción final de la revisión.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>

  <div className="rounded-[1.5rem] border p-5 sm:p-6">
    <h3 className="text-lg font-semibold">Preferencias</h3>
    <div className="mt-4 space-y-4">
      <Switch defaultChecked color="brand" label="Recibir digest semanal" />
      <Switch color="neutral" label="Mostrar tareas cerradas" />
    </div>

    <Modal>
      <Modal.Trigger asChild>
        <Button color="brand" className="mt-6 w-full">Guardar cambios</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <ModalTitle>Guardar preferencias</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          ¿Quieres aplicar esta configuración a todo tu workspace?
        </Modal.Body>
        <Modal.Actions placement="end">
          <Modal.Action variant="ghost" color="neutral">Cancelar</Modal.Action>
          <Modal.Action color="brand">Confirmar</Modal.Action>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  </div>
</div>`}
            >
              <ExampleViewport ui={ui} defaultViewport="tablet">
                <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                  <div className={`rounded-[1.5rem] border p-5 sm:p-6 ${ui.introCard}`}>
                    <h3 className={`text-xl font-semibold ${ui.title}`}>
                      Centro de ayuda
                    </h3>
                    <p className={`mt-2 text-sm leading-6 ${ui.body}`}>
                      Documenta dudas frecuentes y deja visibles las
                      preferencias clave del equipo en un solo panel.
                    </p>

                    <Accordion defaultValue="item-1" className="mt-4">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          ¿Cómo invito revisores?
                        </AccordionTrigger>
                        <AccordionContent>
                          Invita personas desde el panel del sprint y asígnales
                          permisos por flujo, diseño o aprobación final.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          ¿Cómo cierro una revisión?
                        </AccordionTrigger>
                        <AccordionContent>
                          Usa el menú contextual de la revisión o la acción
                          final del tablero cuando ya no haya pendientes.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          ¿Cómo comparto el panel?
                        </AccordionTrigger>
                        <AccordionContent>
                          Comparte el enlace del sprint con permisos de lectura
                          o usa el resumen exportable para stakeholders.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className={`rounded-[1.5rem] border p-5 sm:p-6 ${ui.introCard}`}>
                    <h3 className={`text-lg font-semibold ${ui.title}`}>
                      Preferencias
                    </h3>
                    <div className="mt-4 space-y-4">
                      <Switch
                        defaultChecked
                        color="brand"
                        label="Recibir digest semanal"
                        containerClassName="w-full justify-between"
                      />
                      <Switch
                        color="neutral"
                        label="Mostrar tareas cerradas"
                        containerClassName="w-full justify-between"
                      />
                      <Switch
                        defaultChecked
                        color="neutral"
                        label="Enviar alertas urgentes"
                        containerClassName="w-full justify-between"
                      />
                    </div>

                    <Modal>
                      <Modal.Trigger asChild>
                        <Button color="brand" className="mt-6 w-full">
                          Guardar cambios
                        </Button>
                      </Modal.Trigger>
                      <Modal.Content>
                        <ModalHeader>
                          <ModalTitle>Guardar preferencias</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                          Aplica esta configuración al workspace actual y
                          mantiene el resto de integraciones sin cambios.
                        </ModalBody>
                        <ModalActions placement="end">
                          <ModalAction variant="ghost" color="neutral">
                            Cancelar
                          </ModalAction>
                          <ModalAction color="brand">Confirmar</ModalAction>
                        </ModalActions>
                      </Modal.Content>
                    </Modal>
                  </div>
                </div>
              </ExampleViewport>
            </PreviewPanel>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "states-example") ? (
        <SectionCard id="states-example" className={ui.divider}>
          <SectionHeading
            category="Ejemplos"
            title="Carga y estado vacío"
            description="Patrón para alternar entre loading, contenido vacío y una acción clara de recuperación o creación."
            ui={ui}
          />

          <div className="mt-6">
            <PreviewPanel
              ui={ui}
              title="Estados de datos"
              className="w-full !border-transparent !bg-transparent !p-0"
              code={`<div className="grid gap-6 lg:grid-cols-2">
  <div className="rounded-[1.5rem] border p-5 sm:p-6">
    <p className="text-lg font-semibold">Cargando actividad</p>
    <div className="mt-5 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton shape="circle" className="size-10" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton shape="rect" className="h-28" />
      <Skeleton shape="rect" className="h-28" />
    </div>
  </div>

  <EmptyState>
    <EmptyStateTitle>No hay revisiones activas</EmptyStateTitle>
    <EmptyStateDescription>
      Empieza creando tu primera revisión o importando tareas desde tu backlog.
    </EmptyStateDescription>
    <EmptyStateActions>
      <Button color="brand" className="w-full sm:w-44">Nueva revisión</Button>
      <Button color="neutral" variant="outline" className="w-full sm:w-40">Importar</Button>
    </EmptyStateActions>
  </EmptyState>
</div>`}
            >
              <ExampleViewport ui={ui} defaultViewport="desktop">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className={`rounded-[1.5rem] border p-5 sm:p-6 ${ui.introCard}`}>
                    <p className={`text-lg font-semibold ${ui.title}`}>
                      Cargando actividad
                    </p>
                    <div className="mt-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <Skeleton shape="circle" className="size-10" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                      <Skeleton shape="rect" className="h-28" />
                      <Skeleton shape="rect" className="h-28" />
                    </div>
                  </div>

                  <EmptyState>
                    <EmptyStateTitle>No hay revisiones activas</EmptyStateTitle>
                    <EmptyStateDescription>
                      Empieza creando tu primera revisión o importando tareas
                      desde tu backlog.
                    </EmptyStateDescription>
                    <EmptyStateActions>
                      <Button color="brand" className="w-full sm:w-44">
                        Nueva revisión
                      </Button>
                      <Button
                        color="neutral"
                        variant="outline"
                        className="w-full sm:w-40"
                      >
                        Importar
                      </Button>
                    </EmptyStateActions>
                  </EmptyState>
                </div>
              </ExampleViewport>
            </PreviewPanel>
          </div>
        </SectionCard>
      ) : null}
    </>
  );
}

export default ExamplesDocs;
