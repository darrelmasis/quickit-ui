const shortcutOwners = [];
let globalListenerAttached = false;

function isEditableTarget(target) {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target?.isContentEditable
  );
}

function handleGlobalShortcut(event) {
  if (isEditableTarget(event.target)) {
    return;
  }

  if (!((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k")) {
    return;
  }

  const owner = shortcutOwners[0];
  if (!owner) {
    return;
  }

  event.preventDefault();
  owner.toggle();
}

function ensureGlobalShortcutListener() {
  if (globalListenerAttached) {
    return;
  }

  window.addEventListener("keydown", handleGlobalShortcut);
  globalListenerAttached = true;
}

function removeGlobalShortcutListenerIfIdle() {
  if (shortcutOwners.length > 0 || !globalListenerAttached) {
    return;
  }

  window.removeEventListener("keydown", handleGlobalShortcut);
  globalListenerAttached = false;
}

export function registerCommandPaletteShortcut(ownerId, toggle) {
  shortcutOwners.push({ id: ownerId, toggle });
  ensureGlobalShortcutListener();
}

export function unregisterCommandPaletteShortcut(ownerId) {
  const index = shortcutOwners.findIndex((owner) => owner.id === ownerId);
  if (index !== -1) {
    shortcutOwners.splice(index, 1);
  }
  removeGlobalShortcutListenerIfIdle();
}
