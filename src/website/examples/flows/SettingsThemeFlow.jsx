import { Alert, Button, Modal, Radio, Select, Switch } from "@/lib";
import { useState } from "react";

export function SettingsThemeFlow() {
  const [density, setDensity] = useState("comfortable");
  const [themeMode, setThemeMode] = useState("system");
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <h3 className="font-semibold">Preferencias de interfaz</h3>
        <div className="space-y-3">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Modo de tema</p>
          <div className="flex gap-4">
            <Radio
              name="theme"
              value="light"
              label="Light"
              checked={themeMode === "light"}
              onChange={() => setThemeMode("light")}
            />
            <Radio
              name="theme"
              value="dark"
              label="Dark"
              checked={themeMode === "dark"}
              onChange={() => setThemeMode("dark")}
            />
            <Radio
              name="theme"
              value="system"
              label="System"
              checked={themeMode === "system"}
              onChange={() => setThemeMode("system")}
            />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Densidad</p>
          <Select value={density} onValueChange={setDensity}>
            <option value="compact">Compacta</option>
            <option value="comfortable">Cómoda</option>
            <option value="relaxed">Amplia</option>
          </Select>
        </div>
        <Switch
          checked={emailUpdates}
          onCheckedChange={setEmailUpdates}
          label="Notificaciones por email"
        />
      </div>

      <div className="space-y-4 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <h3 className="font-semibold">Acciones</h3>
        <Alert
          color="info"
          title="Preview activo"
          description={`Tema: ${themeMode}, densidad: ${density}`}
        />
        <Modal>
          <Modal.Trigger asChild>
            <Button color="neutral" variant="outline" fullWidth>
              Reiniciar ajustes
            </Button>
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Restaurar configuración</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Se resetearán tema, densidad y notificaciones a valores por defecto.
            </Modal.Body>
            <Modal.Actions>
              <Modal.Action variant="outline">Cancelar</Modal.Action>
              <Modal.Action color="danger">Confirmar reset</Modal.Action>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
        <Button color="brand" fullWidth>
          Guardar cambios
        </Button>
      </div>
    </div>
  );
}
