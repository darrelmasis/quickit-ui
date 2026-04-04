# Quickit UI

Quickit UI es una libreria de componentes React reutilizables construida con Vite, JavaScript y Tailwind CSS v4. El proyecto arranca con dos objetivos separados desde el inicio:

- una libreria publicable de componentes
- una app local de documentacion y playground para desarrollo

## Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Floating UI
- ESLint 9

## Estructura inicial

```text
quickit-ui/
|- docs/
|  |- architecture.md
|  \- getting-started.md
|- src/
|  |- docs/
|  |  \- DocsApp.jsx
|  |- lib/
|  |  |- components/
|  |  |  \- button/
|  |  |- hooks/
|  |  |- theme/
|  |  |- utils/
|  |  \- index.js
|  |- styles/
|  |  \- index.css
|  \- main.jsx
|- jsconfig.json
|- package.json
\- vite.config.js
```

## Scripts

- `npm run dev`: abre la documentacion/playground local
- `npm run build`: genera la libreria en `dist/`
- `npm run build:docs`: genera la app de documentacion
- `npm run lint`: ejecuta ESLint
- `npm run pack:check`: valida el contenido que se publicaria en npm

## Convenciones base

- `src/lib` contiene solo codigo publicable
- `src/docs` contiene la app interna para mostrar componentes, estados y ejemplos
- `src/styles/index.css` solo carga Tailwind para la build de la libreria
- cada componente nuevo vive en su propia carpeta y se estiliza con utilities de Tailwind
- React y React DOM quedan como `peerDependencies`
- la libreria soporta tema claro y oscuro con `QuickitProvider`

## Temas

Quickit UI usa Tailwind como unica capa de estilos. Para forzar el tema en un arbol de componentes:

```jsx
import { QuickitProvider, Button } from "quickit-ui";

<QuickitProvider theme="dark">
  <Button>Dark button</Button>
</QuickitProvider>
```

## Publicacion en npm

Antes de publicar, verifica que el nombre del paquete siga disponible en npm. El flujo recomendado para esta base es:

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

El proyecto ya incluye [vercel.json](./vercel.json) para desplegar la documentacion con:

- `buildCommand`: `npm run build:docs`
- `outputDirectory`: `dist-docs`

Flujo sugerido:

```bash
npm install
npm run build:docs
```

Luego importa el repositorio en Vercel y usa la configuracion incluida.

## Siguiente fase sugerida

1. consolidar tokens de color, tipografia, spacing y radios
2. definir el contrato base de `Button`, `Link` y `IconButton`
3. crear primitivas overlay sobre Floating UI para `Popover`, `Tooltip` y `Dropdown`
4. documentar API, variantes, accesibilidad y ejemplos por componente
