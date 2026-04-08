import { flip, offset, shift, useFloating } from '@floating-ui/react'

export function useFloatingLayer(options = {}) {
  const {
    middleware = [],
    offset: offsetValue = 10,
    placement = 'bottom-start',
    shiftPadding = 12,
    ...restOptions
  } = options

  return useFloating({
    // Entregamos una configuración razonable por defecto para overlays simples,
    // pero permitimos inyectar middleware extra desde cada componente.
    placement,
    middleware: [
      offset(offsetValue),
      flip(),
      shift({ padding: shiftPadding }),
      ...middleware,
    ],
    ...restOptions,
  })
}
