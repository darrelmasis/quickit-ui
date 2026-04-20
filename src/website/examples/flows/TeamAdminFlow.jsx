import { Avatar, Badge, Button, Drawer, Dropdown } from "@/lib";

export function TeamAdminFlow() {
  const users = [
    { id: 1, name: "Ada Lovelace", role: "Owner", initials: "AL" },
    { id: 2, name: "Grace Hopper", role: "Editor", initials: "GH" },
    { id: 3, name: "Margaret Hamilton", role: "Viewer", initials: "MH" },
  ];

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Administración de equipo</h3>
        <Button size="sm" color="brand">
          Invitar miembro
        </Button>
      </div>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-xl border border-neutral-200 px-3 py-2 dark:border-neutral-800"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <Avatar.Fallback>{user.initials}</Avatar.Fallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{user.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge size="sm" variant="soft" color="neutral">
                {user.role}
              </Badge>
              <Dropdown>
                <Dropdown.Trigger asChild>
                  <Button size="sm" color="neutral" variant="outline">
                    Acciones
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Item>Editar rol</Dropdown.Item>
                  <Dropdown.Item>Reenviar invitación</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>
        ))}
      </div>
      <Drawer placement="right">
        <Drawer.Trigger asChild>
          <Button variant="outline" color="neutral">
            Ver permisos avanzados
          </Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Permisos por módulo</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            Owner: lectura/escritura completa. Editor: edición parcial. Viewer:
            solo lectura.
          </Drawer.Body>
        </Drawer.Content>
      </Drawer>
    </div>
  );
}
