# Quickit UI 🚀

[![NPM Version](https://img.shields.io/npm/v/quickit-ui?color=brand&labelB=111&style=flat-square)](https://www.npmjs.com/package/quickit-ui)
[![License](https://img.shields.io/npm/l/quickit-ui?color=brand&labelB=111&style=flat-square)](https://github.com/darrelmasis/quickit-ui/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

**Quickit UI v0.2.0** es una librería de componentes de alto rendimiento para React 19, diseñada para equipos que necesitan velocidad, consistencia visual premium y una API declarativa sin la complejidad de configurar un sistema desde cero.

---

## ✨ Características principales

- **React 19 Native**: Aprovecha las últimas capacidades de React para máxima eficiencia.
- **Tailwind 4 Ready**: Arquitectura optimizada para la nueva generación de Tailwind CSS.
- **Tema Dinámico**: Sistema de tematización `light`, `dark` y `system` con persistencia automática.
- **Micro-animaciones**: Integración fluida con Framer Motion para efectos de interacción (ripple, press effects).
- **Lógica Declarativa**: Primitives como `Show`, `For` y `RenderSwitch` para un código más limpio.
- **Documentación Premium**: Nuevo sistema de documentación de múltiples páginas para una mejor referencia.

---

## 🚀 Instalación

```bash
npm install quickit-ui react react-dom
```

### Configuración de Estilos (Tailwind 4)

Importa los estilos en tu CSS global. Quickit expone una arquitectura que evita colisiones con tus utilidades locales:

```css
@import "quickit-ui/styles.css";
@import "tailwindcss";

/* Sincroniza el modo oscuro de Quickit con tus utilidades dark: */
@custom-variant dark (&:where(.dark, .dark *));
```

---

## 🛠️ Uso rápido

Envuelve tu aplicación con el provider para habilitar el motor de temas y comportamientos globales:

```jsx
import "quickit-ui/styles.css";
import { Button, Input, QuickitThemeProvider } from "quickit-ui";

export default function App() {
  return (
    <QuickitThemeProvider storageKey="my-app-theme">
      <main className="flex flex-col items-center gap-4 p-12">
        <h1 className="text-2xl font-bold">Bienvenido</h1>
        <Input color="neutral" placeholder="Correo electrónico" />
        <Button color="brand" variant="solid">Continuar</Button>
      </main>
    </QuickitThemeProvider>
  );
}
```

---

## 🎨 Componentes Disponibles

Quickit ofrece una colección creciente de más de 35 primitives organizadas por categorías:

| Categoría | Componentes |
|-----------|-------------|
| **Base** | `Button`, `Link`, `Badge`, `Label`, `Skeleton`, `Progress` |
| **Formularios** | `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`, `Switch`, `Range`, `FormControl` |
| **Overlays** | `Modal`, `Drawer`, `Popover`, `Tooltip`, `Dropdown`, `Toaster` |
| **Navegación** | `Tabs`, `Accordion`, `Breadcrumb`, `Pagination` |
| **Identidad** | `Avatar`, `AvatarGroup`, `UserChip`, `Initials` |
| **Lógica** | `Show`, `For`, `RenderSwitch`, `Match`, `Default` |
| **Feedback** | `EmptyState`, `FormDescription`, `FormMessage` |

---

## 🧠 Hooks y Controladores

Controla el comportamiento de tu app con hooks de primer nivel:

- **`useQuickitThemeController()`**: Control total sobre el tema (set, toggle, resolvedTheme).
- **`useBreakpoint()`**: Utilidad responsiva sincronizada con los tokens de Quickit.
- **`useMediaQuery()`**: Media queries personalizadas fáciles de usar.
- **`useQuickitTheme()`**: Lee el tema efectivo actual en cualquier componente.

---

## 📖 Documentación Completa

Hemos rediseñado nuestra documentación para que cada componente y hook tenga su propio espacio dedicado:

1.  Corre el entorno de desarrollo: `npm run dev`
2.  Accede a `/docs` para ver la nueva guía multi-página con:
    - Ejemplo de uso interactivo e instalación por componente.
    - Tablas de Props detalladas.
    - Documentación técnica de Hooks (Parámetros, Retornos).

---

## 📜 Licencia

Distribuido bajo la licencia [MIT](https://github.com/darrelmasis/quickit-ui/blob/main/LICENSE). Desarrollado por [Darrel Masis](https://github.com/darrelmasis).
