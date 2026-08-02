# Quickit UI Manual Completo

Version documentada: `1.8.1`

Este manual resume la libreria instalable `quickit-ui` y su sistema de documentacion. Esta pensado para que una persona o un agente pueda entender Quickit UI sin leer todo el repositorio.

## 1. Que Es Quickit UI

Quickit UI es una libreria de componentes para React enfocada en interfaces de producto. Incluye componentes visuales, primitives compuestos, hooks, tokens, utilidades de tema, utilidades logicas y estilos empaquetados.

El proyecto contiene dos partes:

| Area | Ruta | Proposito |
| --- | --- | --- |
| Libreria instalable | `src/lib` | Codigo publicado como paquete npm `quickit-ui`. |
| Website/documentacion | `src/website` | Sitio que consume la libreria y documenta ejemplos, props, tokens y migraciones. |

La libreria publica:

| Contrato | Valor |
| --- | --- |
| Paquete | `quickit-ui` |
| Version actual | `1.8.1` |
| Modulo | ESM |
| React peer dependency | `^18.2.0 || ^19.0.0` |
| React DOM peer dependency | `^18.2.0 || ^19.0.0` |
| CSS publico | `quickit-ui/styles.css` |
| Tipos | `dist/quickit-ui.d.ts` |
| CSS distribuido | `dist/styles.css` |

## 2. Instalacion

Instala el paquete:

```bash
npm install quickit-ui
```

Importa los estilos una sola vez en el entry de tu aplicacion:

```jsx
import "quickit-ui/styles.css";
```

Despues importa componentes desde el entry principal:

```jsx
import { Button, Input, QuickitThemeProvider } from "quickit-ui";

export function App() {
  return (
    <QuickitThemeProvider defaultTheme="system">
      <Button color="primary">Guardar</Button>
      <Input placeholder="Correo" />
    </QuickitThemeProvider>
  );
}
```

## 3. Contrato De Estilos

El contrato oficial de estilos es:

```jsx
import "quickit-ui/styles.css";
```

Ese archivo debe bastar para cargar:

| Incluye | Detalle |
| --- | --- |
| Colores de acento | `primary` (blue), `secondary` (purple), `success` (green), `danger` (red), `warning` (amber), `info` (cyan). |
| Utilidades Tailwind usadas por componentes | El CSS publicado ya viene compilado. |
| Variantes dark | Quickit usa selector por clase `.dark`. |
| Estilos auxiliares | Ripple, autofill, toasts, accordion y estilos internos. |

Quickit usa Tailwind CSS 4 en su build, pero el consumidor no necesita compilar el CSS fuente de la libreria. El consumidor solo necesita importar `quickit-ui/styles.css`.

Si tu app tambien usa Tailwind CSS 4:

```css
@import "quickit-ui/styles.css";
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

Orden recomendado:

| Orden | Motivo |
| --- | --- |
| `quickit-ui/styles.css` primero | Carga el contrato base de Quickit: tokens, utilidades compiladas y estilos auxiliares. |
| `tailwindcss` despues | Permite que las utilidades y tokens de tu app queden al final de la cascada. |
| `@theme` al final | Hace que tus tokens ganen sobre los defaults de Quickit. |

Evita documentar como patron base `@import "tailwindcss";` antes de `@import "quickit-ui/styles.css";` en el mismo archivo global, porque Quickit puede quedar despues en la cascada y reintroducir defaults que la app queria sobrescribir.

`@custom-variant dark` solo es necesario para que tus propias clases `dark:*` usen la misma estrategia por clase que Quickit. Los componentes de Quickit ya salen compilados.

## 4. Tema

Quickit maneja dos conceptos:

| Concepto | Descripcion |
| --- | --- |
| Tema efectivo | `light` o `dark`, usado por los componentes para resolver clases. |
| Preferencia de tema | `light`, `dark` o `system`, usada por `QuickitThemeProvider`. |

### QuickitProvider

Usa `QuickitProvider` cuando quieres fijar una politica visual global simple:

```jsx
import { QuickitProvider } from "quickit-ui";

export function Providers({ children }) {
  return (
    <QuickitProvider theme="light" focusRing ripple pressEffect="transform">
      {children}
    </QuickitProvider>
  );
}
```

Props principales:

| Prop | Tipo | Uso |
| --- | --- | --- |
| `theme` | `"light" | "dark"` | Tema efectivo para la UI. |
| `lang` | `"es" | "en"` | Idioma para textos internos (ARIA, placeholders, mensajes). |
| `focusRing` | `boolean | object` | Activa o desactiva anillos de enfoque globales. |
| `ripple` | `boolean | object` | Activa o desactiva ripple para componentes soportados. |
| `pressEffect` | `"transform" | "ripple"` | Define el efecto de presion global. |

> Los textos internos se resuelven desde `QuickitLangContext`. Puedes importar los objetos completos: `import { TXT_ES, TXT_EN } from "quickit-ui"`.

### QuickitThemeProvider

Usa `QuickitThemeProvider` si quieres persistencia y soporte de `system`:

```jsx
import { QuickitThemeProvider } from "quickit-ui";

export function Providers({ children }) {
  return (
    <QuickitThemeProvider defaultTheme="system" storageKey="quickit-ui-theme" lang="es">
      {children}
    </QuickitThemeProvider>
  );
}
```

Este provider:

| Responsabilidad | Detalle |
| --- | --- |
| Persistencia | Guarda la preferencia en `localStorage`. |
| `system` | Lee `prefers-color-scheme`. |
| Clase `.dark` | Aplica o quita `.dark` en `document.documentElement`. |
| Hooks | Alimenta `useQuickitTheme` y `useQuickitThemeController`. |
| i18n | Propaga `lang` via `QuickitLangContext` para textos internos. |

### Evitar FOUC En Tema Oscuro

Para evitar parpadeo entre light/dark antes de hidratar React, coloca un script sincronico en el `<head>`:

```html
<script>
  (function () {
    try {
      var theme = localStorage.getItem("quickit-ui-theme");
      var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (theme === "dark" || ((!theme || theme === "system") && systemDark)) {
        document.documentElement.classList.add("dark");
      }
    } catch (_) {}
  })();
</script>
```

## 5. Comportamiento Global

Quickit tiene politicas visuales globales para interacciones.

### Focus Ring

El focus ring controla los anillos visibles en foco de teclado.

```jsx
<QuickitThemeProvider
  defaultTheme="system"
  focusRing={{ enabled: true, disabledComponents: ["input"] }}
>
  <App />
</QuickitThemeProvider>
```

Hooks relacionados:

| Hook | Uso |
| --- | --- |
| `useQuickitFocusRing(component?)` | Devuelve si el componente debe mostrar focus ring. |
| `useQuickitFocusRingConfig()` | Devuelve la configuracion global normalizada. |

### Press Effect

`pressEffect` define el feedback fisico de click/tap:

| Valor | Resultado |
| --- | --- |
| `transform` | Ligero movimiento/escala en controles compatibles. |
| `ripple` | Onda visual en componentes compatibles. |

### Ripple Global

Para activar ripple globalmente debes activar `pressEffect="ripple"`:

```jsx
<QuickitThemeProvider
  defaultTheme="system"
  ripple
  pressEffect="ripple"
>
  <App />
</QuickitThemeProvider>
```

Importante:

| Caso | Resultado |
| --- | --- |
| `ripple={true}` + `pressEffect="transform"` | No se ve ripple. |
| `ripple={true}` + `pressEffect="ripple"` | Se ve ripple en componentes soportados. |
| `ripple={{ disabledComponents: ["link"] }}` | Desactiva ripple para componentes concretos. |

Componentes con ripple integrado: `Button`, `Link` con `appearance="button"`.

## 6. Tokens

Quickit exporta tokens para que wrappers, galerias y apps consumidoras usen la misma taxonomia que la libreria.

### Colores Compatibles

La union para props `color` se llama `QuickitSemanticColor`.

```js
import { QUICKIT_SEMANTIC_COLORS } from "quickit-ui";
```

Valores:

```txt
neutral, primary, secondary, success, danger, warning, info, light, dark
```

Conceptualmente, la taxonomia actual separa:

| Coleccion | Export | Valores | Uso |
| --- | --- | --- | --- |
| Acentos de producto | `QUICKIT_ACCENT_COLORS` | `neutral`, `primary`, `secondary`, `success`, `danger`, `warning`, `info` | Gama cromatica completa para componentes compactos como `Badge`. |
| Estados | `QUICKIT_STATUS_COLORS` | `success`, `danger`, `warning`, `info` | Feedback semantico. |
| Neutrales | `QUICKIT_NEUTRAL_COLORS` | `neutral`, `light`, `dark` | Superficies y jerarquia visual. |
| Compatibilidad | `QUICKIT_SEMANTIC_COLORS` | `neutral`, `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark` | Props publicas `color`. |

### Colores de acento

Los colores `primary` y `secondary` se mapean directamente a colores nativos de Tailwind:

| Semantico | Color Tailwind |
| --- | --- |
| `primary` | blue |
| `secondary` | purple |
| `success` | green |
| `danger` | red |
| `warning` | amber |
| `info` | cyan |

Para personalizar, sobrescribe el color Tailwind subyacente en `@theme`:

```css
@import "quickit-ui/styles.css";
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-blue-600: oklch(0.5 0.2 250);
  --color-purple-500: oklch(0.55 0.18 290);
}
```

### Tamanos, Variantes Y Shapes

Exports:

| Export | Valores |
| --- | --- |
| `QUICKIT_CONTROL_SIZES` | `sm`, `md`, `lg`, `xl`, `2xl` |
| `QUICKIT_COMPACT_CONTROL_SIZES` | `sm`, `md` |
| `QUICKIT_BUTTON_VARIANTS` | `solid`, `outline`, `ghost`, `soft` |
| `QUICKIT_BUTTON_SHAPES` | `default`, `square`, `circle`, `pill` |
| `QUICKIT_AVATAR_SHAPES` | `circle`, `rounded`, `square` |
| `QUICKIT_AVATAR_SIZES` | `sm`, `md`, `lg`, `xl`, `2xl` |
| `QUICKIT_LINK_TEXT_VARIANTS` | `default`, `muted`, `subtle` |
| `QUICKIT_LINK_UNDERLINES` | `always`, `hover`, `none` |
| `QUICKIT_TAB_SIZES` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` |
| `QUICKIT_BREAKPOINTS` | `sm:640`, `md:768`, `lg:1024`, `xl:1280`, `2xl:1536` |

### Helpers De Tokens

```js
import {
  isQuickitTokenValue,
  resolveQuickitToken,
  QUICKIT_SEMANTIC_COLORS,
} from "quickit-ui";

const color = resolveQuickitToken(
  QUICKIT_SEMANTIC_COLORS,
  userColor,
  "neutral",
);
```

| Helper | Uso |
| --- | --- |
| `isQuickitTokenValue(collection, value)` | Verifica si `value` pertenece a una coleccion. |
| `resolveQuickitToken(collection, value, fallback)` | Devuelve `value` si es valido; si no, `fallback`. |

## 7. Utilidades Publicas

| Utilidad | Uso |
| --- | --- |
| `cn(...classes)` | Combina clases con `clsx` y `tailwind-merge`. |
| `getControlRadius(size)` | Devuelve radio visual para controles. |
| `getAvatarRadius(shape, size)` | Devuelve radio visual para avatares. |
| `lockAppScroll()` | Bloquea scroll del documento para overlays custom. |
| `unlockAppScroll()` | Libera scroll bloqueado. |
| `useMergeRefs(...refs)` | Une refs internas y externas en un componente. |
| `resolveQuickitThemeMode(value)` | Normaliza tema efectivo a `light` o `dark`. |

Ejemplo:

```jsx
import { cn, getControlRadius } from "quickit-ui";

export function CardButton({ active }) {
  return (
    <button
      className={cn(
        "border p-4 transition-colors",
        getControlRadius("lg"),
        active ? "border-primary-500 bg-primary-50" : "border-neutral-200",
      )}
    >
      Accion
    </button>
  );
}
```

## 8. Hooks

### Hooks De Tema

| Hook | Retorno/Uso |
| --- | --- |
| `useQuickitTheme()` | Lee el tema efectivo `light` o `dark`. |
| `useQuickitThemeController()` | Lee/cambia `theme`, `resolvedTheme`, `systemTheme`, `setTheme`, `toggleTheme`. |
| `useQuickitLang()` | Lee el idioma actual (`"es"` \| `"en"`). |
| `useTXT()` | Devuelve el objeto de textos traducidos según el `lang` actual. |

```jsx
import { Button, useQuickitThemeController } from "quickit-ui";

export function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme } = useQuickitThemeController();

  return (
    <Button onClick={toggleTheme}>
      {theme} / {resolvedTheme}
    </Button>
  );
}
```

### Hooks Responsive

| Hook | Uso |
| --- | --- |
| `useBreakpoint(options?)` | Devuelve breakpoint actual, width, flags y ready. |
| `useMediaQuery(query, options?)` | Evalua una media query. |

`useBreakpoint` devuelve:

| Campo | Tipo |
| --- | --- |
| `breakpoint` | `xs | sm | md | lg | xl | 2xl` |
| `width` | `number | null` |
| `isMobile` | `boolean` |
| `isTablet` | `boolean` |
| `isDesktop` | `boolean` |
| `ready` | `boolean` |

### Hooks De Formulario Y Componentes

| Hook | Uso |
| --- | --- |
| `useFormControl()` | Lee contexto de `FormControl`: ids, invalid, disabled, required. |
| `useTabs()` | Lee contexto de `Tabs` dentro de subcomponentes custom. |
| `useDropdown()` | Lee contexto de `Dropdown` para items/triggers personalizados. |
| `useModal()` | Permite cerrar un modal desde descendientes profundos. |
| `useFloatingLayer(options?)` | Wrapper avanzado sobre Floating UI para posicionamiento. |

### Hooks De Comportamiento

| Hook | Uso |
| --- | --- |
| `useQuickitFocusRing(component?)` | Consulta si focus ring aplica a un componente. |
| `useQuickitFocusRingConfig()` | Devuelve configuracion global de focus ring. |
| `useQuickitPressEffect()` | Devuelve `transform` o `ripple`. |
| `useQuickitRipple(component?)` | Consulta si ripple aplica a un componente. |
| `useQuickitRippleConfig()` | Devuelve configuracion global de ripple. |

## 9. Convenciones De API

Quickit intenta mantener una API consistente:

| Convencion | Uso |
| --- | --- |
| `variant` | Tratamiento visual: `solid`, `outline`, `ghost`, `soft`, etc. |
| `color` | Paleta compatible: `QuickitSemanticColor` o `"default"` en algunos overlays. |
| `size` | Escala visual. |
| `shape` | Geometria: `default`, `square`, `circle`, `pill`. |
| `disabled` | Desactiva interaccion. |
| `invalid` | Estado de error en formularios. |
| `required` | Estado requerido en formularios. |
| `value` / `defaultValue` | Controlado/no controlado. |
| `onValueChange` | Callback semantico de valor. |
| `onChange` | Evento estilo DOM o evento nativo segun componente. |
| `className` | Clases del nodo principal. |
| `containerClassName` | Clases del wrapper externo cuando existe. |
| `labelClassName` | Clases del label cuando el componente lo renderiza. |
| `usePortal` | Renderiza overlays/listas fuera del arbol local. |

## 10. Acciones

### Button

Componente base para acciones, triggers, CTA e icon buttons.

Import:

```jsx
import { Button } from "quickit-ui";
```

Uso:

```jsx
<Button size="lg">
  Guardar cambios
</Button>

<Button shape="circle" aria-label="Cerrar">
  X
</Button>
```

Props relevantes:

| Prop | Tipo | Default | Descripcion |
| --- | --- | --- | --- |
| `variant` | `solid | outline | ghost | soft` | `soft` | Tratamiento visual. Soft: borde + fondo sutil en reposo, sólido en hover. |
| `color` | `QuickitSemanticColor` | `neutral` | Paleta aplicada. |
| `size` | `sm | md | lg | xl | 2xl` | `md` | Tamanno visual. |
| `shape` | `default | square | circle | pill` | `default` | Geometria. |
| `type` | `button | submit | reset` | `button` | Tipo nativo. |
| `loading` | `boolean` | `false` | Deshabilita y muestra spinner. |
| `loadingText` | `ReactNode` | - | Texto durante loading. |
| `spinner` | `boolean` | `true` | Muestra spinner. |
| `fullWidth` | `boolean` | `false` | Ocupa ancho completo. |
| `active` | `boolean` | `false` | Fuerza estado visual activo. |
| `pressed` | `boolean` | `false` | Activa `aria-pressed`. |
| `pressEffect` | `transform | ripple` | provider | Override por instancia. |
| `ripple` | `boolean` | provider | Override por instancia. |

Notas:

| Tema | Recomendacion |
| --- | --- |
| Icon button | Si `shape="square"` o `shape="circle"` sin texto visible, usa `aria-label`, `aria-labelledby` o `title`. |
| Loading | `loading` tambien deshabilita click. |
| Ripple | Para ripple visible, la politica global debe usar `pressEffect="ripple"` o el boton debe forzarlo. |

### Link

Enlace de texto o enlace con apariencia de boton.

```jsx
import { Link } from "quickit-ui";

<Link href="/docs">Documentacion</Link>

<Link href="/docs" appearance="button" color="primary">
  Abrir docs
</Link>
```

Props relevantes:

| Prop | Tipo | Default | Descripcion |
| --- | --- | --- | --- |
| `appearance` | `text | button` | `text` | Decide si renderiza estilo enlace o boton. |
| `variant` | `default | muted | subtle` en texto; variantes de boton en button | `soft` | Tratamiento visual. |
| `underline` | `always | hover | none` | `hover` | Subrayado en modo texto. |
| `color` | `QuickitSemanticColor` | `neutral` | Paleta. |
| `size` | `xs | sm | md | lg` o escala de boton | `md` | Tamanno. |
| `disabled` | `boolean` | `false` | Aplica `aria-disabled` y evita interaccion. |
| `target` | string | - | Si `_blank`, agrega `noopener noreferrer`. |

## 11. Formularios

### FormControl

Agrupa label, control, descripcion y mensaje. Propaga `invalid`, `disabled`, `required` e ids accesibles.

```jsx
import { FormControl, Label, Input } from "quickit-ui";

<FormControl controlId="email" required invalid>
  <Label>Correo</Label>
  <Input type="email" />
  <FormControl.Description>Usa tu correo principal.</FormControl.Description>
  <FormControl.Message>El correo es obligatorio.</FormControl.Message>
</FormControl>
```

Subcomponentes:

| Subcomponente | Uso |
| --- | --- |
| `FormControl.Description` | Texto de ayuda conectado por `aria-describedby`. |
| `FormControl.Message` | Mensaje de validacion conectado cuando `invalid`. |

Exports compatibles: `FormDescription`, `FormMessage`.

### Label

Etiqueta accesible para inputs y controles.

```jsx
<Label htmlFor="email">Correo</Label>
```

Dentro de `FormControl`, puede conectarse con el `controlId`.

### Input

Campo base para texto, email, search, password y composicion con elementos laterales.

```jsx
<Input placeholder="Buscar" type="search" clearButton />

<Input
  type="password"
  passwordToggle
  showPasswordLabel="Mostrar"
  hidePasswordLabel="Ocultar"
/>
```

Props comunes:

| Prop | Uso |
| --- | --- |
| `color` | Paleta visual del campo. |
| `size` | `sm`, `md`, `lg`, `xl`, `2xl`. |
| `shape` | Radio visual. |
| `invalid` | Estado de error. |
| `clearButton` | Boton para limpiar en campos compatibles. |
| `passwordToggle` | Muestra/oculta password. |
| `leftElement` / `rightElement` | Elementos decorativos o interactivos laterales. |
| `leftAddon` / `rightAddon` | Addons acoplados. |
| `leftAction` / `rightAction` | Acciones acopladas. |

### InputGroup

Contenedor para componer inputs, addons y acciones.

```jsx
<InputGroup attached shape="pill">
  <InputGroupAddon align="inline-start">https://</InputGroupAddon>
  <Input placeholder="quickit.dev" />
  <InputGroupAction variant="outline">Ir</InputGroupAction>
</InputGroup>
```

Subcomponentes:

| Subcomponente | Uso |
| --- | --- |
| `InputGroup` | Contenedor y contexto visual. |
| `InputGroupItem` | Item con span/layout. |
| `InputGroupAddon` | Texto o contenido auxiliar. |
| `InputGroupAction` | Boton integrado. |

### Textarea

Area de texto multilinea alineada con `Input`.

```jsx
<Textarea placeholder="Notas" minRows={4} />
```

Props:

| Prop | Uso |
| --- | --- |
| `color` | Paleta del campo. |
| `size` | `sm`, `md`, `lg`, `xl`, `2xl`. Controla tipografía y radio. |
| `shape` | Radio. |
| `minRows` | Filas iniciales cuando no pasas `rows`; no hace autosize. |
| `rows` | Atributo nativo. |
| `invalid`, `required`, `disabled` | Estados de formulario. |
| `InputGroup` | Si se usa dentro de `InputGroup`, hereda `color`, `shape` y `size` del contexto. |

### Select

Selector composable con trigger y panel flotante.

```jsx
<Select defaultValue="docs" onValueChange={(value) => console.log(value)}>
  <option value="docs">Docs</option>
  <option value="tokens">Tokens</option>
</Select>
```

Props:

| Prop | Uso |
| --- | --- |
| `value` / `defaultValue` | Valor controlado/no controlado. |
| `onValueChange(value)` | Callback semantico. |
| `onChange(event)` | Evento sintetico estilo DOM con `target.value`. |
| `name` | Hidden input para formularios. |
| `placeholder` | Contenido cuando no hay valor. |
| `maxHeight` | Altura máxima del dropdown (CSS string, ej. `"200px"`, `"30rem"`). Si no se pasa, aplica `max-h-72 sm:max-h-96`. |
| `color`, `size`, `invalid`, `required`, `disabled` | Visual y estado. |
| `usePortal` | Renderiza lista en portal. |

### DatePicker

Selector de fecha con calendario en popover.

```jsx
<DatePicker
  name="startDate"
  defaultValue={new Date()}
  onChange={(date) => console.log(date)}
/>

<DatePicker
  selectionMode="between"
  onChange={(range) => console.log(range.from, range.to)}
/>
```

Props destacadas:

| Prop | Uso |
| --- | --- |
| `value` / `defaultValue` | Fecha o rango controlado/no controlado. |
| `selectionMode` | `single` o `between`. |
| `onChange` | Devuelve `Date` en single o `{ from, to }` en range. |
| `minDate` / `maxDate` | Limites. |
| `calendarColor` | Color del calendario/rango. |
| `name` | Serializacion del input. |
| `placeholder` | Texto visible cuando no hay valor. |

### TimePicker

Selector de hora con listas de hora/minuto y soporte 12h/24h.

```jsx
<TimePicker
  defaultValue="09:30"
  minuteStep={15}
  hourCycle="24h"
  onChange={(value) => console.log(value)}
/>
```

Props:

| Prop | Uso |
| --- | --- |
| `value` / `defaultValue` | Hora en formato normalizado. |
| `onChange(value)` | Devuelve string `HH:mm` o `null` al limpiar. |
| `hourCycle` | `12h` o `24h`. |
| `minuteStep` | Intervalo de minutos. |
| `minTime` / `maxTime` | Limites. |
| `clearButton` | Permite limpiar. |
| `clearButtonLabel` | Label accesible del boton limpiar. |
| `name` | Hidden input para formularios. |

### Checkbox

Control binario con label opcional.

```jsx
<Checkbox
  label="Acepto terminos"
  defaultChecked
  onCheckedChange={(checked, event) => console.log(checked)}
/>
```

Props:

| Prop | Uso |
| --- | --- |
| `checked` / `defaultChecked` | Controlado/no controlado. |
| `onCheckedChange(checked, event)` | Callback semantico. |
| `onChange(event)` | Evento nativo. |
| `label` | Label integrado. |
| `name`, `value` | Formularios. |
| `color`, `size`, `invalid`, `required` | Visual/estado. |

### Radio

Control de seleccion exclusiva.

```jsx
<Radio name="plan" value="pro" label="Pro" />
```

Notas:

| Tema | Detalle |
| --- | --- |
| Grupo | Usa el mismo `name` para opciones mutuamente excluyentes. |
| Callback | `onCheckedChange(checked, event)` entrega estado y evento. |
| Accesibilidad | Puede usar `label` integrado o `aria-labelledby`. |

### Switch

Toggle visual basado en `button[role="switch"]`.

```jsx
<Switch
  label="Notificaciones"
  name="notifications"
  onCheckedChange={(checked, event) => console.log(checked)}
/>
```

Notas:

| Tema | Detalle |
| --- | --- |
| Formulario | Si pasas `name`, agrega checkbox oculto para submit HTML. |
| Callback | `onCheckedChange(checked, event)` se alinea con Checkbox y Radio. |
| Accesibilidad | Usa `role="switch"` y `aria-checked`. |

### Range

Slider nativo estilizado con modo simple y modo doble.

```jsx
<Range defaultValue={40} min={0} max={100} />

<Range
  range
  name="priceMin"
  endName="priceMax"
  defaultValue={[20, 80]}
  startLabel="Precio minimo"
  endLabel="Precio maximo"
/>
```

Props:

| Prop | Uso |
| --- | --- |
| `range` | Activa dos thumbs. |
| `value` / `defaultValue` | Numero o tuple `[start, end]`. |
| `onValueChange(value)` | Devuelve numero o tuple. |
| `onChange(event)` | Evento del input interno. |
| `name` | En simple serializa valor; en doble serializa valor inicial. |
| `startName` | Nombre del hidden input inicial en modo doble. |
| `endName` | Nombre del hidden input final; por defecto `${name}End`. |
| `startLabel` / `endLabel` | Labels accesibles de thumbs en modo doble. |
| `orientation` | `horizontal` o `vertical`. |
| `allowWheel` | Permite rueda del mouse. |
| `showValueTooltip` | Muestra tooltip de valor. |
| `tooltipFormatter` | Formatea tooltip. |
| `getAriaValueText` | Texto accesible del valor. |

## 12. Navegacion

### Accordion

Secciones colapsables.

```jsx
<Accordion type="single" defaultValue="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Pregunta</Accordion.Trigger>
    <Accordion.Content>Respuesta</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

Uso:

| Parte | Descripcion |
| --- | --- |
| `Accordion` | Controla modo single/multiple. |
| `Accordion.Item` | Define una seccion. |
| `Accordion.Trigger` | Boton que abre/cierra. |
| `Accordion.Content` | Panel colapsable. |

### Breadcrumb

Ruta jerarquica.

```jsx
<Breadcrumb>
  <Breadcrumb.List>
    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
    <Breadcrumb.Item current>Productos</Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>
```

Tambien existen primitives mas verbosos como `Breadcrumb.Link`, `Breadcrumb.Current` y `Breadcrumb.Separator`.

### Pagination

Paginacion controlada o no controlada.

```jsx
<Pagination
  count={12}
  defaultPage={1}
  onPageChange={(page) => console.log(page)}
/>
```

Props tipicas:

| Prop | Uso |
| --- | --- |
| `count` | Numero total de paginas. |
| `page` / `defaultPage` | Controlado/no controlado. |
| `onPageChange(page)` | Cambio de pagina. |
| `siblingCount` | Paginas alrededor de la actual. |
| `boundaryCount` | Paginas en extremos. |
| `color`, `size`, `shape` | Visual. |

### Tabs

Navegacion por paneles con teclado.

```jsx
<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">Resumen</Tabs.Content>
  <Tabs.Content value="settings">Ajustes</Tabs.Content>
</Tabs>
```

Props:

| Prop | Uso |
| --- | --- |
| `value` / `defaultValue` | Tab activo controlado/no controlado. |
| `onValueChange(value)` | Callback. |
| `orientation` | `horizontal` o `vertical`. |
| `activationMode` | `automatic` o `manual`. |
| `size` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`. |
| `color` | Color del tab activo. |

### Stepper

Pasos numerados para flujos guiados.

```jsx
<Stepper
  activeStep={1}
  steps={[
    { title: "Cuenta", description: "Datos basicos" },
    { title: "Pago", description: "Metodo de pago" },
  ]}
/>
```

Props:

| Prop | Uso |
| --- | --- |
| `steps` | Lista de pasos. |
| `activeStep` | Paso activo. |
| `onStepChange(index)` | Cambio de paso. |
| `orientation` | `horizontal` o `vertical`. |

## 13. Overlays

### Modal

Dialogo modal con overlay, trigger, contenido y acciones.

```jsx
<Modal>
  <Modal.Trigger asChild>
    <Button>Abrir</Button>
  </Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Confirmar</Modal.Title>
      <Modal.Description>Esta accion no se puede deshacer.</Modal.Description>
    </Modal.Header>
    <Modal.Body>Contenido</Modal.Body>
    <Modal.Actions>
      <Modal.Cancel>Cancelar</Modal.Cancel>
      <Modal.Action color="danger">Eliminar</Modal.Action>
    </Modal.Actions>
  </Modal.Content>
</Modal>
```

Props comunes:

| Prop | Uso |
| --- | --- |
| `open` / `defaultOpen` | Controlado/no controlado. |
| `onOpenChange(open)` | Callback. |
| `closeOnEscape` | Cierra con Escape. |
| `outsideClick` | Cierra al click fuera. |
| `showCloseButton` | Muestra boton cerrar. |

### Drawer

Panel lateral o inferior con overlay y acciones.

```jsx
<Drawer placement="right">
  <Drawer.Trigger asChild>
    <Button>Abrir panel</Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Filtros</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>Contenido</Drawer.Body>
  </Drawer.Content>
</Drawer>
```

Props similares a `Modal`, con `placement` para lado.

### Dropdown

Menu flotante composable.

```jsx
<Dropdown>
  <Dropdown.Trigger asChild>
    <Button variant="outline">Opciones</Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item onSelect={() => {}}>Editar</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item variant="danger">Eliminar</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>
```

Subcomponentes:

| Subcomponente | Uso |
| --- | --- |
| `Dropdown.Trigger` | Trigger del menu. |
| `Dropdown.Content` | Panel flotante. |
| `Dropdown.Item` | Accion, link o item custom. |
| `Dropdown.Separator` | Separador visual. |

### Popover

Capa contextual para contenido informativo o interactivo.

```jsx
<Popover
  trigger="click"
  interactive
  content={<Button size="sm">Accion</Button>}
>
  <Button variant="outline">Abrir</Button>
</Popover>
```

Props:

| Prop | Uso |
| --- | --- |
| `content` | Contenido del popover. |
| `trigger` | `hover`, `click` o `manual`. |
| `open` / `onOpenChange` | Controlado. |
| `interactive` | Activa semantica/foco para contenido accionable. |
| `placement` | Posicion preferida. |
| `offset` | Separacion. |
| `showArrow` | Flecha. |
| `autoCloseMs` | Cierre automatico. |
| `color` | `"default" | QuickitSemanticColor`. |
| `usePortal` | Portal. |

### Tooltip

Ayuda breve no interactiva.

```jsx
<Tooltip content="Crear nuevo elemento">
  <Button shape="circle" aria-label="Agregar">+</Button>
</Tooltip>
```

Tooltip fuerza un patron de ayuda breve. Para contenido accionable usa `Popover`.

### Toaster

Sistema de toasts con API imperativa.

```jsx
import { Toaster, toast, dismiss } from "quickit-ui";

function App() {
  return <Toaster position="bottom-right" />;
}

toast("Guardado");
toast({ title: "Listo", kind: "success" });
toast({ title: "No se pudo guardar", kind: "error" });
dismiss();
```

Props de `Toaster`:

| Prop | Uso |
| --- | --- |
| `position` | `top-left`, `top-right`, `bottom-left`, `bottom-right`. |
| `visibleToasts` | Maximo visible en stack colapsado. |
| `gap` | Separacion. |
| `expandOnHover` | Expande/pausa al hover o foco. |
| `showCloseButton` | Boton de cierre. |
| `defaultIcon` | Icono default. |
| `icons` | Iconos por kind. |
| `toastClassName` | Clases de tarjeta. |

Kinds:

```txt
default, loading, success, error
```

No existen helpers publicos tipo `toast.success(...)` o `toast.error(...)`.
Usa `toast({ kind: "success" })`, `toast({ kind: "error" })` o `toast.promise(...)`.
Tampoco existe `kind: "info"` como icono incorporado; usa `default` con `icon` propio.

## 14. Tables

### DataTable

Tabla con columnas, ordenacion y estilos por color.

```jsx
<DataTable
  columns={[
    { key: "name", header: "Nombre", sortable: true },
    { key: "status", header: "Estado" },
  ]}
  data={[
    { id: 1, name: "Quickit", status: "Activo" },
  ]}
  rowKey={(row) => row.id}
/>
```

Columnas:

| Campo | Uso |
| --- | --- |
| `key` | Clave de datos. |
| `header` | Header visible. |
| `render(row)` | Render custom. |
| `sortable` | Activa ordenacion. |
| `headerClassName` | Clases del header. |
| `cellClassName` | Clases de celda. |

Props:

| Prop | Uso |
| --- | --- |
| `columns` | Definicion de columnas. |
| `data` | Filas. |
| `rowKey` | Key estable. |
| `caption` | Caption accesible. |
| `stickyHeader` | Header sticky. |
| `color` | Tratamiento visual. |

## 15. Estado E Identidad

### Alert

Mensaje inline con variantes y dismiss.

```jsx
<Alert
  color="warning"
  title="Espacio casi lleno"
  description="Revisa tu almacenamiento."
  dismissible
  autoDismiss={4000}
/>
```

Props:

| Prop | Uso |
| --- | --- |
| `color` | Paleta. |
| `variant` | `soft`, `outline`. |
| `title`, `description` | Contenido. |
| `dismissible` | Cierre manual. |
| `autoDismiss` | Tiempo en ms. |
| `pauseOnHover` | Pausa cierre. |
| `open`, `onOpenChange` | Controlado. |
| `onDismiss(reason)` | Cierre manual/automatico. |

### Badge

Etiqueta compacta para estado, categoria o conteo.

```jsx
<Badge color="success" variant="soft">Activo</Badge>
```

Props:

| Prop | Uso |
| --- | --- |
| `color` | `QuickitAccentColor`. |
| `variant` | `solid`, `soft`, `outline`, `ghost`. |
| `size` | Tamanno compacto. |

### EmptyState

Estado vacio componible.

```jsx
<EmptyState>
  <EmptyState.Icon>
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" />
  </EmptyState.Icon>
  <EmptyState.Title>Sin resultados</EmptyState.Title>
  <EmptyState.Description>No hay elementos por mostrar.</EmptyState.Description>
  <EmptyState.Actions>
    <Button>Recargar</Button>
  </EmptyState.Actions>
</EmptyState>
```

Subcomponentes:

| Subcomponente | Uso |
| --- | --- |
| `EmptyState.Icon` | Icono superior. |
| `EmptyState.Title` | Titulo. |
| `EmptyState.Description` | Texto de apoyo. |
| `EmptyState.Actions` | Acciones mobile-first de ancho completo en movil. |

### Skeleton

Marcador de carga.

```jsx
<Skeleton variant="line" />
<Skeleton variant="rect" className="h-24" />
<Skeleton variant="circle" className="size-10" />
```

### Progress

Indicador lineal de progreso.

```jsx
<Progress value={60} max={100} />
```

Props:

| Prop | Uso |
| --- | --- |
| `value` | Valor actual. |
| `min` / `max` | Rango. |
| `color` | Paleta. |
| `size` | Altura. |
| `label` | Label accesible. |

### Avatar

Sistema de identidad visual.

```jsx
<Avatar size="lg" shape="rounded">
  <Avatar.Image src="/user.jpg" alt="Elena Ruiz" />
  <Avatar.Fallback>ER</Avatar.Fallback>
  <Avatar.Presence status="online" />
</Avatar>
```

Exports relacionados:

| Export | Uso |
| --- | --- |
| `Avatar` | Componente compuesto principal. |
| `AvatarRoot` | Root explicito. |
| `AvatarImage` | Imagen. |
| `AvatarFallback` | Fallback. |
| `AvatarPresence` | Estado online/away/busy/offline. |
| `AvatarGroup` | Agrupa avatares. |
| `Initials` | Renderiza iniciales. |
| `UserChip` | Avatar + texto descriptivo. |
| `getInitials(name)` | Utilidad para iniciales. |

Notas:

| Tema | Detalle |
| --- | --- |
| Presence | Decorativo por defecto. Si quieres anuncio en lectores de pantalla, pasa `label`. |
| Shapes | `circle`, `rounded`, `square`. |
| Sizes | `sm`, `md`, `lg`, `xl`, `2xl`. |

## 16. Utilidades Logicas

### Show

Render condicional.

```jsx
<Show when={user} fallback={<p>Sin usuario</p>}>
  {(currentUser) => <p>{currentUser.name}</p>}
</Show>
```

### For

Iteracion declarativa.

```jsx
<For each={items} fallback={<p>Sin items</p>}>
  {(item) => <span key={item.id}>{item.name}</span>}
</For>
```

### RenderSwitch, Match Y Default

Control declarativo de estados.

```jsx
<RenderSwitch value={status}>
  <Match when="loading">Cargando</Match>
  <Match when="success">Listo</Match>
  <Default>Estado desconocido</Default>
</RenderSwitch>
```

## 17. Arquitectura De Componentes

Quickit favorece primitives compuestos cuando el componente tiene partes internas:

| Patron | Ejemplos |
| --- | --- |
| `Component.Subcomponent` | `Tabs.List`, `Modal.Content`, `EmptyState.Title`. |
| Exports sueltos compatibles | `TabsList`, `ModalContent`, `FormMessage` cuando existen. |
| Contexto interno | `FormControl`, `Tabs`, `Dropdown`, `Modal`, `Avatar`. |
| Controlled/uncontrolled | `open/defaultOpen`, `value/defaultValue`, `checked/defaultChecked`. |

Reglas de integracion:

| Regla | Motivo |
| --- | --- |
| Usa `onValueChange` para negocio | Evita depender de eventos sinteticos cuando solo necesitas el valor. |
| Usa `onChange` para adapters | Util si una libreria espera evento tipo DOM. |
| Pasa labels accesibles en icon buttons | Evita controles sin nombre. |
| Usa `FormControl` para forms complejos | Centraliza ids, mensajes y estados. |
| Monta un solo `Toaster` | Evita duplicar stacks globales. |
| `CommandPalette` eliminado | Usa un input de búsqueda personalizado en su lugar. |

## 18. Accesibilidad

Quickit incorpora varias decisiones de accesibilidad:

| Area | Implementacion |
| --- | --- |
| Forms | `FormControl` conecta label, descripcion y mensaje. |
| Switch | Usa `button role="switch"` y `aria-checked`. |
| Range dual | Cada thumb tiene label accesible configurable. |
| CommandPalette | Eliminado del paquete. |
| DatePicker/TimePicker | Popovers con `role="dialog"` y labels. |
| Modal/Drawer | Manejo de foco, escape, overlay y acciones. |
| AvatarPresence | Decorativo por defecto para no anunciar ruido. |
| Button icon-only | Warning de desarrollo si falta nombre accesible. |

Buenas practicas:

| Caso | Recomendacion |
| --- | --- |
| Icon buttons | Siempre `aria-label`, `aria-labelledby` o `title`. |
| Tooltips | Mantener contenido corto y no interactivo. |
| Popovers interactivos | Usar `interactive` y trigger `click` o `manual`. |
| Formularios HTML | Revisar `name`, hidden inputs y callbacks. |
| Rango doble | Usar `startLabel`, `endLabel`, `name`, `endName`. |

## 19. Public API Resumida Por Familia

### Acciones

```js
import { Button, Link } from "quickit-ui";
```

También exporta componentes compuestos como `ButtonGroup`, `DropdownItem`, `DropdownContent`, `TabsList`, `TabsTrigger`, `TabsContent`, `ModalContent`, `EmptyStateIcon`, `AccordionItem`, etc.

### Formularios

```js
import {
  FormControl,
  Label,
  Input,
  InputGroup,
  InputGroupItem,
  InputGroupAddon,
  InputGroupAction,
  Textarea,
  Select,
  DatePicker,
  TimePicker,
  Checkbox,
  Radio,
  Switch,
  Range,
} from "quickit-ui";
```

### Navegacion

```js
import {
  Accordion,
  Breadcrumb,
  Pagination,
  Tabs,
  Stepper,
} from "quickit-ui";
```

### Overlays

```js
import {
  Modal,
  Drawer,
  Dropdown,
  Popover,
  Tooltip,
  Toaster,
  toast,
  dismiss,
} from "quickit-ui";
```

### Datos, Estado E Identidad

```js
import {
  DataTable,
  Alert,
  Badge,
  EmptyState,
  Skeleton,
  Progress,
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarPresence,
  AvatarGroup,
  Initials,
  UserChip,
  getInitials,
} from "quickit-ui";
```

### Logica

```js
import {
  Show,
  For,
  RenderSwitch,
  Match,
  Default,
} from "quickit-ui";
```

### Hooks

```js
import {
  useBreakpoint,
  useMediaQuery,
  useFloatingLayer,
  useQuickitTheme,
  useQuickitThemeController,
  useQuickitFocusRing,
  useQuickitFocusRingConfig,
  useQuickitPressEffect,
  useQuickitRipple,
  useQuickitRippleConfig,
  useFormControl,
  useTabs,
  useDropdown,
  useModal,
  useQuickitLang,
  useTXT,
} from "quickit-ui";
```

### Tokens Y Utils

```js
import {
  QUICKIT_SEMANTIC_COLORS,
  QUICKIT_STATUS_COLORS,
  QUICKIT_ACCENT_COLORS,
  QUICKIT_NEUTRAL_COLORS,
  QUICKIT_CONTROL_SIZES,
  QUICKIT_BUTTON_VARIANTS,
  QUICKIT_BUTTON_SHAPES,
  cn,
  getControlRadius,
  getAvatarRadius,
  getCheckboxRadius,
  lockAppScroll,
  unlockAppScroll,
  useMergeRefs,
  resolveQuickitToken,
  isQuickitTokenValue,
  TXT_ES,
  TXT_EN,
} from "quickit-ui";
```

## 20. Migracion

### De 1.7.1 a 1.8.0

| Cambio | Detalle |
| --- | --- |
| `arrowPosition` | Nueva prop en `Dropdown`, `Popover` y `Tooltip` (`"left" \| "center" \| "right"`) para controlar la posición horizontal de la flecha. |
| Flecha | El color y borde de la flecha ahora se derivan en runtime del panel que la contiene (coinciden siempre con el fondo y borde del elemento flotante, en cualquier tema/color). |
| Playground | El radio global ahora también se aplica a los componentes flotantes (portal). |

Comando:

```bash
npm install quickit-ui@1.8.0
```

### De 1.7.0 a 1.7.1

| Cambio | Detalle |
| --- | --- |
| `Dropdown`/`Popover` | Corregida la flecha (`FloatingArrow`) duplicada: los estilos CSS se aplicaban a los dos `<path>`. Ahora el relleno va al path principal y el `stroke` solo al path con `clip-path`. |

Comando:

```bash
npm install quickit-ui@1.7.1
```

### De 1.6.0 a 1.7.0

| Cambio | Detalle |
| --- | --- |
| `Dropdown` | Corregida la flecha (`FloatingArrow`) que era recortada por el `overflow-y-auto` de la superficie flotante. El scroll ahora vive en un contenedor interno, por lo que la flecha se muestra correctamente. |

Comando:

```bash
npm install quickit-ui@1.7.0
```

### De 1.5.0 a 1.6.0

| Cambio | Detalle |
| --- | --- |
| `Select.maxHeight` | Nuevo prop `maxHeight` (string CSS) permite personalizar la altura máxima del dropdown. Por defecto `max-h-72 sm:max-h-96`. |
| `Dropdown` | Añadido `max-h-72 overflow-y-auto` en la superficie flotante para limitar altura con muchas opciones. |

Comando:

```bash
npm install quickit-ui@1.6.0
```

### De 1.4.0 a 1.5.0

| Cambio | Detalle |
| --- | --- |
| Dropdown | Añadido `max-h-72 overflow-y-auto` en la superficie flotante para limitar altura y habilitar scroll con muchas opciones. |

Comando:

```bash
npm install quickit-ui@1.5.0
```

### De 1.3.0 a 1.4.0

| Cambio | Detalle |
| --- | --- |
| i18n | Nuevo sistema de internacionalización. `QuickitProvider` y `QuickitThemeProvider` aceptan `lang="es"` \| `"en"`. Los textos internos se traducen automáticamente. |
| Tipos públicos | `EmptyStateIcon`, `dismissToast()`, `getCheckboxRadius()`, props faltantes de `Input` y `Textarea` ahora están declarados. |
| Textarea + InputGroup | `Textarea` dentro de `InputGroup` hereda `color`, `shape` y `size` del contexto. |
| Website | Los 3 sidebars del sitio ahora comparten diseño unificado. |

Comando:

```bash
npm install quickit-ui@1.4.0
```

### De 1.2.0 a 1.3.0

| Cambio | Detalle |
| --- | --- |
| `ghost` variant | Nueva variante `ghost` disponible en `Badge` y `Alert`. Muestra solo texto sin fondo ni borde, con fondo sutil en hover. |
| Textarea font-size | `Textarea` ahora escala la tipografía según `size`: `lg` usa `text-base`, `xl`/`2xl` usan `text-lg`. |
| Select color prop | El menú desplegable de `Select` ahora respeta el `color` prop para los items, en vez de usar siempre `neutral`. |
| Fallback colors | Todos los componentes ahora usan `"neutral"` como color de fallback cuando se pasa un valor inválido (antes algunos usaban `"info"` o `"primary"`). |
| Disabled opacity | `Tabs.Trigger` deshabilitado usa `opacity-60` (consistente con el resto de componentes, antes usaba `opacity-50`). |

Comando:

```bash
npm install quickit-ui@1.3.0
```

### De 1.1.0 a 1.2.0

| Cambio | Detalle |
| --- | --- |
| `secondary` | Nuevo color semántico mapeado a purple. Disponible en todos los componentes con prop `color`. |
| `CommandPalette` | Eliminado del paquete. Implementa tu propia paleta de búsqueda o usa un input search. |

Comando:

```bash
npm install quickit-ui@1.2.0
```

### Legacy: De 0.2.4 a 1.2.0

Comando:

```bash
npm install quickit-ui@1.2.0
```

Cambios a revisar:

| Area | Accion |
| --- | --- |
| Estilos | Usar `import "quickit-ui/styles.css"`. |
| Colores | `primary` (blue), `secondary` (purple). Reemplazables via `@theme`. |
| Breadcrumb | Preferir `Breadcrumb.Item href/current`. |
| Tabs/FormControl | Preferir API compuesta `Tabs.List`, `FormControl.Description`, etc. |
| CommandPalette | Eliminado del paquete en 1.2.0. |
| EmptyState | Usar `EmptyState.Icon` y `EmptyState.Actions`. |
| Range | Si usas `range` + `name`, ahora serializa ambos extremos. |
| Switch | `onCheckedChange` recibe `(checked, event)`. |

Checklist:

```bash
npm run lint
npm run test
npm run test:types
npm run build
npm run build:docs
npm run pack:check
```

## 21. Guia Para Agentes O Implementadores

Si usas este manual como contexto para un agente:

| Tarea | Regla |
| --- | --- |
| Cambiar UI | Mantener props compatibles y no romper `QuickitSemanticColor`. |
| Documentar ejemplos | Alinear snippets con runtime real, no con API deseada. |
| Tocar estilos | Recordar que el contrato minimo es `quickit-ui/styles.css`; si la app usa Tailwind, Quickit va antes de `tailwindcss`. |
| Tocar tokens | `primary` y `secondary` son acentos reemplazables via `@theme`. Estados: `success/danger/warning/info`. |
| Tocar forms | Revisar `FormControl`, `name`, hidden inputs y `aria-describedby`. |
| Tocar overlays | Revisar foco, Escape, outside click, roles, portal y scroll lock. |
| CommandPalette | Eliminado en 1.2.0; migrar a input search propio. |
| Tocar tipos | Actualizar `src/lib/quickit-ui.d.ts` y `tests/types/public-api.tsx`. |
| Tocar defaults | `variant` ahora default a `"soft"`, `color` a `"neutral"` en todos los componentes. |
| Tocar variante soft | Borde + fondo sutil del color seleccionado en reposo, sólido en hover. |

Validacion minima antes de publicar:

```bash
npm run lint
npm run build
npm run test
npm run test:types
npm run pack:check
```

## 22. Limitaciones Y Deuda Tecnica Conocida

| Tema | Estado |
| --- | --- |
| Tipos manuales | `src/lib/quickit-ui.d.ts` es manual; conviene generar tipos automaticamente en una futura version. |
| Docs bundle | `build:docs` puede advertir chunk grande; conviene code splitting futuro. |
| Nombres historicos | `QuickitSemanticColor` conserva valores no estrictamente semanticos por compatibilidad. |
| Tailwind `@theme` | Es la forma recomendada con Tailwind 4; consumidores sin Tailwind deben sobreescribir variables CSS equivalentes. |
| Overlays | `Modal` y `Drawer` comparten mucha logica conceptual; podrian extraer primitives internos en el futuro. |

## 23. Resumen Mental Rapido

Quickit UI se entiende mejor asi:

| Capa | Resumen |
| --- | --- |
| Estilos | Sin Tailwind: un import `quickit-ui/styles.css`; con Tailwind: Quickit primero, Tailwind despues. |
| Tema | `QuickitThemeProvider` controla `light/dark/system` y `.dark`. |
| Comportamiento | `focusRing`, `ripple`, `pressEffect`. |
| Tokens | `QuickitSemanticColor` incluye acentos (`primary`, `secondary`), estados (`success`, `danger`, `warning`, `info`) y neutros (`neutral`, `light`, `dark`). |
| Defaults globales | Todos los componentes: `variant="soft"`, `color="neutral"`. |
| Forms | `FormControl` coordina accesibilidad; controles aceptan estados coherentes. |
| Overlays | Basados en primitives compuestos, portal, foco y cierre. |
| Docs | Website consume la libreria real y debe mantenerse alineado con runtime. |
| Publicacion | Build genera JS, CSS, tipos y `styles.css` empaquetado. |
