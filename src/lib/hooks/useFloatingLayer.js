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
