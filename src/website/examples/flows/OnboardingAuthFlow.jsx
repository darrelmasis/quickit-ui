import { Alert, Badge, Button, Checkbox, FormControl, Input, Label } from "@/lib";

export function OnboardingAuthFlow() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Login de workspace</h3>
          <Badge color="brand" variant="soft">
            2FA
          </Badge>
        </div>
        <FormControl required>
          <Label htmlFor="login-email">Correo</Label>
          <Input id="login-email" type="email" placeholder="team@quickit.dev" />
        </FormControl>
        <FormControl required invalid>
          <Label htmlFor="login-password">Contrasena</Label>
          <Input id="login-password" type="password" passwordToggle placeholder="••••••••" />
          <FormControl.Message>Credenciales no coinciden</FormControl.Message>
        </FormControl>
        <div className="flex items-center justify-between">
          <Checkbox label="Recordarme por 30 dias" />
          <a href="#" className="text-xs text-brand-600 hover:underline">
            Recuperar acceso
          </a>
        </div>
        <Button color="brand" fullWidth>
          Entrar
        </Button>
      </div>

      <div className="space-y-4 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <h3 className="font-semibold">Alta de nuevo workspace</h3>
        <Input placeholder="Nombre del equipo" />
        <Input placeholder="Subdominio" />
        <Input placeholder="Correo principal" type="email" />
        <Button color="neutral" variant="outline" fullWidth>
          Crear cuenta
        </Button>
        <Alert
          color="warning"
          title="Falta verificar email"
          description="Enviamos un enlace para activar la cuenta."
        />
      </div>
    </div>
  );
}
