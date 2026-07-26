import { flip, offset, shift, useFloating, type Middleware, type Placement } from '@floating-ui/react'

export function useFloatingLayer(options?: { middleware?: Middleware[]; offset?: number; placement?: Placement; shiftPadding?: number }) {
  const {
    middleware = [],
    offset: offsetValue = 10,
    placement = 'bottom-start',
    shiftPadding = 12,
  } = options ?? {}

  return useFloating({
    placement,
    middleware: [
      offset(offsetValue),
      flip(),
      shift({ padding: shiftPadding }),
      ...middleware,
    ],
  })
}
