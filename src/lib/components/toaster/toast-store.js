let toastId = 0;
let toasts = [];
const listeners = new Set();
const timeouts = new Map();
/** Fin absoluto del auto-cierre por id (timestamp ms). */
const dismissAt = new Map();
/** Ms restantes cuando el stack está en hover (pausa). */
const pauseRemaining = new Map();
/** Timeouts que quitan del array tras la animación de salida */
const exitTimeouts = new Map();

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
  listeners.forEach((listener) => listener(toasts));
}

export function subscribeToToasts(listener) {
  listeners.add(listener);
  listener(toasts);

  return () => {
    listeners.delete(listener);
  };
}

function scheduleRemoveAfterExit(id) {
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

function clearTimeoutForId(id) {
  const timeoutId = timeouts.get(id);
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeouts.delete(id);
  }
}

/** Limpia temporizador y deadline (p. ej. al cerrar o quitar del stack). */
function clearAutoDismiss(id) {
  clearTimeoutForId(id);
  dismissAt.delete(id);
}

function scheduleAutoDismiss(id) {
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

function scheduleDismissFromDuration(id, durationMs) {
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

function removeToastImmediately(id) {
  clearAutoDismiss(id);
  pauseRemaining.delete(id);

  const exitId = exitTimeouts.get(id);
  if (exitId) {
    clearTimeout(exitId);
    exitTimeouts.delete(id);
  }

  toasts = toasts.filter((toast) => toast.id !== id);
}

export function dismissToast(id) {
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
export function updateToast(id, patch) {
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

function normalizeToastPayload(payload) {
  if (typeof payload === "string") {
    return { title: payload };
  }
  return payload ?? {};
}

export function toast(input) {
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

function applyToastResult(patch, value) {
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
function toastPromise(promise, messages) {
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
