# Getting Started

## Objetivo

Quickit UI nace como una libreria de componentes reutilizables para productos React. La prioridad inicial es construir una base consistente, escalable y facil de documentar antes de ampliar el catalogo de componentes.

## Flujo de trabajo

1. desarrollar el componente dentro de `src/lib/components`
2. exponerlo desde `src/lib/index.js`
3. documentarlo visualmente en `src/docs/DocsApp.jsx` o en futuras paginas dedicadas
4. validar `npm run lint` y `npm run build`

## Distribucion

La build principal genera una libreria ES module en `dist/` junto con la hoja de estilos compilada. La documentacion se construye aparte con `npm run build:docs`.
