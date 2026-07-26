import type { ReactNode } from "react";

export interface ToastAction {
  label: string;
  onClick: (event?: React.MouseEvent | React.KeyboardEvent) => void;
}

export interface ToastItem {
  id: string;
  title: string;
  description?: ReactNode;
  action?: ToastAction;
  duration: number;
  kind: string;
  icon?: ReactNode;
  dismissing?: boolean;
}

export interface ToastInput {
  id?: string;
  title?: string;
  description?: ReactNode;
  action?: ToastAction;
  duration?: number;
  kind?: string;
  icon?: ReactNode;
}

export interface ToastPatch {
  title?: string;
  description?: ReactNode;
  action?: ToastAction;
  duration?: number;
  kind?: string;
  icon?: ReactNode;
}

let toastId = 0;
let toasts: ToastItem[] = [];
const listeners = new Set<(toasts: ToastItem[]) => void>();
const timeouts = new Map<string, ReturnType<typeof setTimeout>>();
/** Fin absoluto del auto-cierre por id (timestamp ms). */
const dismissAt = new Map<string, number>();
/** Ms restantes cuando el stack está en hover (pausa). */
const pauseRemaining = new Map<string, number>();
/** Timeouts que quitan del array tras la animación de salida */
const exitTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/** Debe coincidir con la duración de `.qk-toast-surface--out-*` en `index.css`. */
const TOAST_EXIT_MS = 300;
/**
 * Valor por defecto de toasts visibles en colapsado (cada `<Toaster />` puede usar `visibleToasts`).
 * El resto permanece en cola.
 */
export const MAX_VISIBLE_TOASTS = 3;

/** Límite de seguridad en memoria; los más viejos se eliminan sin animación. */
export const MAX_QUEUED_TOASTS = 25;

/** Puntero sobre la zona de toasts: auto-cierre pausado sin reiniciar el contador. */
let stackHoverPaused = false;

function notify() {
  listeners.forEach((listener: (toasts: ToastItem[]) => void) => listener(toasts));
}

export function subscribeToToasts(listener: (toasts: ToastItem[]) => void) {
  listeners.add(listener);
  listener(toasts);

  return () => {
    listeners.delete(listener);
  };
}

function scheduleRemoveAfterExit(id: string) {
  if (exitTimeouts.has(id)) {
    return;
  }

  const exitId = setTimeout(() => {
    exitTimeouts.delete(id);
    toasts = toasts.filter((toast) => toast.id !== id);
    notify();
  }, TOAST_EXIT_MS);

  exitTimeouts.set(id, exitId);
}

function clearTimeoutForId(id: string) {
  const timeoutId = timeouts.get(id);
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeouts.delete(id);
  }
}

/** Limpia temporizador y deadline (p. ej. al cerrar o quitar del stack). */
function clearAutoDismiss(id: string) {
  clearTimeoutForId(id);
  dismissAt.delete(id);
}

function scheduleAutoDismiss(id: string) {
  clearTimeoutForId(id);

  const end = dismissAt.get(id);
  if (end == null) {
    return;
  }

  const remaining = Math.max(0, end - Date.now());
  if (remaining <= 0) {
    dismissToast(id);
    return;
  }

  const timeoutId = setTimeout(() => {
    dismissToast(id);
  }, remaining);

  timeouts.set(id, timeoutId);
}

function scheduleDismissFromDuration(id: string, durationMs: number | null | undefined) {
  clearAutoDismiss(id);
  pauseRemaining.delete(id);
  if (durationMs == null || durationMs <= 0) {
    return;
  }
  if (stackHoverPaused) {
    pauseRemaining.set(id, durationMs);
  } else {
    dismissAt.set(id, Date.now() + durationMs);
    scheduleAutoDismiss(id);
  }
}

/** Pausa los temporizadores guardando el tiempo restante (no reinicia). */
export function pauseToastStackAutoDismiss() {
  if (stackHoverPaused) {
    return;
  }
  stackHoverPaused = true;

  for (const [id, timeoutId] of [...timeouts.entries()]) {
    clearTimeout(timeoutId);
    timeouts.delete(id);
    const end = dismissAt.get(id);
    if (end != null) {
      pauseRemaining.set(id, Math.max(0, end - Date.now()));
      dismissAt.delete(id);
    }
  }
}

/** Reanuda con el mismo tiempo pendiente que al pausar. */
export function resumeToastStackAutoDismiss() {
  if (!stackHoverPaused) {
    return;
  }
  stackHoverPaused = false;

  for (const [id, remaining] of [...pauseRemaining.entries()]) {
    if (!toasts.some((t) => t.id === id && !t.dismissing)) {
      pauseRemaining.delete(id);
      continue;
    }
    dismissAt.set(id, Date.now() + remaining);
    scheduleAutoDismiss(id);
  }
  pauseRemaining.clear();
}

function removeToastImmediately(id: string) {
  clearAutoDismiss(id);
  pauseRemaining.delete(id);

  const exitId = exitTimeouts.get(id);
  if (exitId) {
    clearTimeout(exitId);
    exitTimeouts.delete(id);
  }

  toasts = toasts.filter((toast) => toast.id !== id);
}

export function dismissToast(id?: string) {
  if (!id) {
    exitTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    exitTimeouts.clear();
    toasts = [];
    timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    timeouts.clear();
    dismissAt.clear();
    pauseRemaining.clear();
    stackHoverPaused = false;
    notify();
    return;
  }

  clearAutoDismiss(id);
  pauseRemaining.delete(id);

  const entry = toasts.find((t) => t.id === id);
  if (!entry) {
    return;
  }

  if (entry.dismissing) {
    return;
  }

  toasts = toasts.map((t) =>
    t.id === id ? { ...t, dismissing: true } : t,
  );
  notify();
  scheduleRemoveAfterExit(id);
}

export const dismiss = dismissToast;

/**
 * Actualiza un toast existente (p. ej. transición loading → success en `toast.promise`).
 * `duration` en el patch reprograma el auto-cierre; `0` o ausente tras merge sin número > 0 no programa.
 */
export function updateToast(id: string, patch: ToastPatch) {
  const existing = toasts.find((t) => t.id === id);
  if (!existing || existing.dismissing) {
    return;
  }

  const merged = { ...existing, ...patch };
  toasts = toasts.map((t) => (t.id === id ? merged : t));
  notify();

  const duration =
    patch.duration !== undefined ? patch.duration : merged.duration;
  scheduleDismissFromDuration(id, duration);
}

function normalizeToastPayload(payload: string | ToastInput | undefined | null): ToastInput {
  if (typeof payload === "string") {
    return { title: payload };
  }
  return payload ?? {};
}

export function toast(input: string | ToastInput): string {
  const payload = normalizeToastPayload(input);
  toastId += 1;

  const id = payload.id ?? `toast-${toastId}`;
  const duration = payload.duration ?? 4000;
  const toastItem = {
    id,
    title: payload.title ?? "Notificación",
    description: payload.description,
    action: payload.action,
    duration,
    kind: payload.kind ?? "default",
    icon: payload.icon,
  };

  toasts = [...toasts, toastItem];

  while (toasts.length > MAX_QUEUED_TOASTS) {
    removeToastImmediately(toasts[0].id);
  }

  notify();
  scheduleDismissFromDuration(id, duration);

  return id;
}

function applyToastResult(
  patch: string | ToastInput | ((value: unknown) => string | ToastInput) | undefined | null,
  value: unknown,
): ToastInput {
  if (patch == null) {
    return {};
  }
  if (typeof patch === "function") {
    return normalizeToastPayload(patch(value));
  }
  return normalizeToastPayload(patch);
}

/**
 * Muestra loading y sustituye por success/error al resolver la promesa.
 */
function toastPromise(
  promise: Promise<unknown>,
  messages: {
    loading: string | ToastInput;
    success?: string | ToastInput | ((data: unknown) => string | ToastInput);
    error?: string | ToastInput | ((error: unknown) => string | ToastInput);
  },
) {
  const loadingPayload = normalizeToastPayload(messages.loading);
  const id = toast({
    ...loadingPayload,
    kind: "loading",
    duration: loadingPayload.duration ?? 0,
  });

  Promise.resolve(promise).then(
    (data) => {
      const next = applyToastResult(messages.success, data);
      updateToast(id, {
        ...next,
        title: next.title ?? "Listo",
        kind: "success",
        duration: next.duration ?? 4000,
      });
    },
    (error) => {
      const next = applyToastResult(messages.error, error);
      const fallback =
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Error";
      updateToast(id, {
        ...next,
        title: next.title ?? fallback,
        kind: "error",
        duration: next.duration ?? 5000,
      });
    },
  );

  return id;
}

toast.promise = toastPromise;
