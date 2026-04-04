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

## Estructura por componente

La estructura minima sugerida es:

```text
components/
\- button/
   |- Button.jsx
   \- index.js
```

Si un componente crece, puede sumar archivos para variantes, helpers, tests o historias sin contaminar el resto del arbol.
