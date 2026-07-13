# Migración

## 1.2.0 - 13 de julio de 2026

Esta guía cubre la migración principal desde `0.2.4` hasta `1.2.0`. El salto sigue siendo directo en la mayoría de proyectos, pero conviene alinear tu código con las APIs y patrones que ahora quedan documentados como camino oficial.

### Cambios a revisar

- `Instalación y versión del paquete`
  Sube directamente a `quickit-ui@1.2.0`.
  Esta versión reúne la API estable de `1.0.0`, los ajustes posteriores de accesibilidad/docs, el empaquetado final del entry de estilos, una pasada compatible de hardening sobre tokens/forms/componentes complejos y la guía actualizada de orden de imports con Tailwind CSS 4.

- `Breadcrumb`, `Tabs` y APIs compuestas
  La documentación prioriza el uso de subcomponentes compuestos y casos comunes simplificados.
  Si vienes de ejemplos viejos o wrappers propios, revisa `Breadcrumb.Item`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`, `FormControl.Description` y `FormControl.Message`.

- `CommandPalette`
  Eliminado del paquete. Si dependías de este componente, implementa tu propia paleta de búsqueda o usa un input tipo search en el header de tu app.

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

- `Tokens de color`
  `QuickitSemanticColor` incluye acentos (`primary`, `secondary`), estados (`success`, `danger`, `warning`, `info`) y neutros (`neutral`, `light`, `dark`).
  Puedes usar `QUICKIT_STATUS_COLORS`, `QUICKIT_ACCENT_COLORS` y `QUICKIT_NEUTRAL_COLORS` para galerías o wrappers más precisos.

- `Range`
  En modo doble, si pasas `name`, Quickit ahora serializa dos hidden inputs: `name` para el valor inicial y `endName` para el valor final.
  Si dependías de que `Range range` no enviara valores en formularios HTML, omite `name` o controla la serialización manualmente.

- `Combobox`
  `label` puede ser un nodo React sin convertirse a `"[object Object]"`.
  Si el label no es texto plano, define `textValue` para búsqueda y para el texto visible del input.

- `Switch`
  `onCheckedChange` recibe un segundo argumento `event` compatible con el evento sintético de `onChange`.
  El primer argumento `checked` no cambia, así que los handlers existentes siguen funcionando.

### Pasos sugeridos

1. Actualiza el paquete:

```bash
npm install quickit-ui@1.2.0
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

4. Si usas `EmptyState`, revisa el layout mobile-first y el icono superior:

```jsx
<EmptyState>
  <EmptyState.Icon>
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
      <path
        d="M5 8h14M8 5h8M7 11h10v8H7z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
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
