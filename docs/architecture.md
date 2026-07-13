# Architecture

## Separacion de responsabilidades

- `src/lib`: codigo de la libreria que eventualmente se publica
- `src/docs`: app local de desarrollo y documentacion
- `src/styles`: tokens y estilos base compartidos

## Principios

- cada componente debe tener una API pequena y consistente
- accesibilidad y estados interactivos forman parte de la implementacion inicial
- Floating UI sera la base para overlays y posicionamiento
- la documentacion debe crecer junto con cada componente, no al final
- el contrato publico de estilos es `import "quickit-ui/styles.css"`; el consumidor no debe compilar el CSS fuente de la libreria
- `primary` y `secondary` son acentos reemplazables via `@theme`
- la taxonomia de colores distingue acentos (`primary`, `secondary`), estados (`success`, `danger`, `warning`, `info`) y neutros (`neutral`, `light`, `dark`)

## Estructura por componente

La estructura minima sugerida es:

```text
components/
\- button/
   |- Button.jsx
   \- index.js
```

Si un componente crece, puede sumar archivos para variantes, helpers, tests o historias sin contaminar el resto del arbol.

## Sistema de temas (theme-classes)

### Mapa de colores semánticos

Cada color semántico se mapea a un color nativo de Tailwind v4 para que los consumidores puedan sobrescribirlos via `@theme` sin depender de variables CSS intermedias:

| Semántico  | Color Tailwind |
|------------|---------------|
| `neutral`  | `neutral`     |
| `primary`  | `blue`        |
| `secondary`| `purple`      |
| `success`  | `green`       |
| `danger`   | `red`         |
| `warning`  | `amber`       |
| `info`     | `cyan`        |
| `light`    | `neutral`     |
| `dark`     | `neutral`     |

### Patrón theme-classes

Todo string de clases de Tailwind que dependa del color semántico o del modo oscuro debe vivir en `src/lib/theme/theme-classes/`. Ningún componente JSX debe contener literales como `blue-600`, `hover:bg-red-500`, etc.

Cada archivo exporta un objeto con dos variantes:

```js
export const COMPONENT_THEME_CLASSES = {
  light: { colorName: "clase-para-light ..." },
  dark:  { colorName: "clase-para-dark ..." },
};
```

- **light** — clases para modo claro (ej. `bg-blue-600 text-white`)
- **dark** — clases para modo oscuro (ej. `bg-blue-500 text-white`)

Los componentes reciben el tema actual via hook o prop y eligen el objeto correspondiente:

```js
import { useTheme } from "@/lib/contexts/theme";
import { BUTTON_THEME_CLASSES } from "@/lib/theme/theme-classes/button";

function MyComponent({ color = "primary" }) {
  const { theme } = useTheme();
  const classes = BUTTON_THEME_CLASSES[theme][color];
  return <button className={classes}>...</button>;
}
```

### Archivos existentes

Actualmente hay 31 archivos de theme-classes en `src/lib/theme/theme-classes/`:

```
action-control        checkbox    data-table     form-field        label        progress     skeleton
action-control-active combobox    drawer         form-field-autofill link-text    radio        switch
accordion             date-picker empty-state    input-affix        modal        range        tabs
alert                 breadcrumb  form-control   input-group        popover      select       toaster
avatar                card        badge
```

### Modo oscuro

No se usa `@media (prefers-color-scheme: dark)` ni la clase `.dark` de Tailwind para cambiar colores. En su lugar, cada theme-classes file define explícitamente los valores `light` y `dark`. El `ThemeController` persiste la preferencia y los componentes leen el valor actual para seleccionar el set de clases adecuado. Esto permite temas dinámicos sin depender de selectores CSS de modo oscuro.

### Cómo agregar un nuevo componente con soporte de tema

1. Crear `src/lib/theme/theme-classes/mi-componente.js` con las variantes `light` y `dark` para cada color semántico.
2. Exportarlo desde `src/lib/theme/theme-classes/index.js`.
3. En el componente, importar las clases y seleccionar `CLASES[theme][color]`.
4. Agregar el color semántico a `QUICKIT_SEMANTIC_COLORS` en `src/lib/tokens/index.js` si es necesario.

### Personalización por el consumidor

El usuario final cambia colores sobrescribiendo variables `@theme` en su CSS:

```css
@import "tailwindcss";
@import "quickit-ui/styles.css";

@theme {
  --color-blue-600: oklch(0.5 0.2 240);
  --color-purple-500: oklch(0.6 0.25 280);
}
```

Como `primary` usa `blue`, cambiar `--color-blue-600` actualiza automáticamente todos los componentes con `color="primary"`. No existe una variable `--color-primary` intermedia.
