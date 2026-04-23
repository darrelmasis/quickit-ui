# Migración

## 1.0.9 - 22 de abril de 2026

Esta guía cubre la migración principal desde `0.2.4` hasta `1.0.9`. El salto sigue siendo directo en la mayoría de proyectos, pero conviene alinear tu código con las APIs y patrones que ahora quedan documentados como camino oficial.

### Cambios a revisar

- `Instalación y versión del paquete`
  Sube directamente a `quickit-ui@1.0.9`.
  Esta versión reúne la API estable de `1.0.0` y los ajustes posteriores de accesibilidad, docs, shortcuts y tema.

- `Breadcrumb`, `Tabs` y APIs compuestas
  La documentación prioriza el uso de subcomponentes compuestos y casos comunes simplificados.
  Si vienes de ejemplos viejos o wrappers propios, revisa `Breadcrumb.Item`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`, `FormControl.Description` y `FormControl.Message`.

- `CommandPalette`
  Solo una instancia responde al atajo global `Ctrl+K` / `Cmd+K`.
  Si montas varias paletas en la misma vista, deja una sola como principal y usa `shortcutEnabled={false}` en las secundarias o demos embebidas.

- `AvatarPresence`
  Ahora es decorativo por defecto.
  Si necesitas que lectores de pantalla anuncien el estado, pasa `label`.

- `EmptyState`
  `EmptyState.Actions` ahora usa un layout mobile-first: ocupa todo el ancho y apila acciones en pantallas pequeñas.
  Además puedes usar `EmptyState.Icon` para componer un icono superior de forma explícita.

- `FormControl`, formularios y selección
  La documentación y el contrato se alinean en torno a `controlId`.
  Si estabas usando `id` como base semántica del control hijo, revisa tus wrappers personalizados.

- `Select`, `Combobox`, `DatePicker`, `TimePicker`, `Range`
  La documentación y los ejemplos ahora reflejan mejor los contratos de serialización, accesibilidad y callbacks.
  Si tienes integraciones de formularios HTML o adapters de eventos, revisa los ejemplos actualizados.

### Pasos sugeridos

1. Actualiza el paquete:

```bash
npm install quickit-ui@1.0.9
```

2. Revisa el uso de APIs compuestas y simplificadas:

```jsx
// Antes
<Breadcrumb>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Current>Productos</Breadcrumb.Current>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>

// Ahora
<Breadcrumb>
  <Breadcrumb.List>
    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
    <Breadcrumb.Item current>Productos</Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>
```

3. Alinea `FormControl` con sus subcomponentes documentados:

```jsx
// Antes
<FormControl invalid required>
  <Label htmlFor="email">Correo</Label>
  <Input id="email" type="email" />
  <FormDescription>Usa tu correo principal.</FormDescription>
  <FormMessage>El correo es obligatorio.</FormMessage>
</FormControl>

// Ahora
<FormControl invalid required>
  <Label htmlFor="email">Correo</Label>
  <Input id="email" type="email" />
  <FormControl.Description>
    Usa tu correo principal.
  </FormControl.Description>
  <FormControl.Message>
    El correo es obligatorio.
  </FormControl.Message>
</FormControl>
```

4. Si tienes varias `CommandPalette`, deja una sola con shortcut activo:

```jsx
<CommandPalette />
<CommandPalette shortcutEnabled={false} />
```

5. Si usas `EmptyState`, revisa el layout mobile-first y el icono superior:

```jsx
<EmptyState>
  <EmptyState.Icon>
    <CopyIcon />
  </EmptyState.Icon>
  <EmptyState.Title>Sin resultados</EmptyState.Title>
  <EmptyState.Description>
    No hay elementos por mostrar.
  </EmptyState.Description>
  <EmptyState.Actions>
    <Button>Recargar</Button>
  </EmptyState.Actions>
</EmptyState>
```

### Checklist recomendada

```bash
npm run test
npm run test:types
npm run build
npm run build:docs
npm run pack:check
```
