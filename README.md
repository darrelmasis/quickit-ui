# Quickit UI

Quickit UI es una libreria de componentes React reutilizables construida con React, Vite, JavaScript, Tailwind CSS y Floating UI. El repositorio incluye dos partes:

- la libreria publicable en `src/lib`
- la aplicacion de documentacion en `src/docs`

## Empezar

### Requisitos

- Node.js 18 o superior
- npm 9 o superior

### Instalacion local

```bash
npm install
```

### Ejecutar la documentacion en desarrollo

```bash
npm run dev
```

Esto levanta la app de documentacion local para desarrollar, revisar y probar los componentes.

### Build de la libreria

```bash
npm run build
```

La salida se genera en `dist/`.

### Build de la documentacion

```bash
npm run build:docs
```

La salida se genera en `dist-docs/`.

## Uso rapido

Quickit UI expone los componentes desde el entry principal y los estilos desde `quickit-ui/styles.css`.

```jsx
import { Button, QuickitProvider } from "quickit-ui";
import "quickit-ui/styles.css";

export function App() {
  return (
    <QuickitProvider theme="dark">
      <Button color="neutral">Continuar</Button>
    </QuickitProvider>
  );
}
```

## Tema

La libreria soporta `light` y `dark` mediante `QuickitProvider`.

```jsx
import { QuickitProvider, Button } from "quickit-ui";

export function Example() {
  return (
    <QuickitProvider theme="light">
      <Button color="neutral">Claro</Button>
    </QuickitProvider>
  );
}
```

Valores soportados:

- `light`
- `dark`

## Scripts

- `npm run dev`: abre la documentacion/playground local
- `npm run build`: genera la libreria en `dist/`
- `npm run build:docs`: genera la app de documentacion en `dist-docs/`
- `npm run lint`: ejecuta ESLint
- `npm run pack:check`: valida el contenido que se publicaria en npm

## Estructura

```text
quickit-ui/
|- docs/
|  |- architecture.md
|  \- getting-started.md
|- src/
|  |- docs/
|  |- lib/
|  |  |- components/
|  |  |- hooks/
|  |  |- theme/
|  |  \- utils/
|  |- styles/
|  \- main.jsx
|- package.json
|- vercel.json
\- vite.config.js
```

## Convenciones

- `src/lib` contiene solo codigo publicable
- `src/docs` contiene la aplicacion interna de documentacion
- la libreria usa Tailwind utilities, sin CSS custom por componente
- React y React DOM son `peerDependencies`
- `QuickitProvider` resuelve tema claro y oscuro

## Publicacion en npm

Antes de publicar, verifica que el nombre del paquete siga disponible en npm.

```bash
npm install
npm run lint
npm run build
npm run pack:check
npm publish
```

Notas:

- `prepublishOnly` ya ejecuta `lint` y `build`
- el paquete publica solo `dist/`
- los estilos se consumen desde `quickit-ui/styles.css`

## Despliegue de la documentacion en Vercel

El proyecto ya incluye [vercel.json](./vercel.json) con esta configuracion:

- `buildCommand`: `npm run build:docs`
- `outputDirectory`: `dist-docs`

Flujo sugerido:

```bash
npm install
npm run build:docs
```

Luego importa el repositorio en Vercel y usa la configuracion incluida.
