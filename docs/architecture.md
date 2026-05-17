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
- `brand` es un slot de acento reemplazable via `@theme`, no un color semantico de estado
- las colecciones historicas se mantienen por compatibilidad, pero la documentacion debe preferir taxonomias precisas: acentos, estados y neutros

## Estructura por componente

La estructura minima sugerida es:

```text
components/
\- button/
   |- Button.jsx
   \- index.js
```

Si un componente crece, puede sumar archivos para variantes, helpers, tests o historias sin contaminar el resto del arbol.
