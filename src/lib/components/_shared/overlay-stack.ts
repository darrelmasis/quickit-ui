export function isTriggerDisabled(element: { props?: Record<string, unknown> } | null | undefined): boolean {
  return Boolean(
    element?.props?.disabled || element?.props?.["aria-disabled"] === true,
  );
}

export function createOverlayStack(name: string, startIndex: number) {
  let zIndexCounter = startIndex;
  const stack: string[] = [];

  function addToStack(id: string): void {
    if (!stack.includes(id)) {
      stack.push(id);
    }
  }

  function removeFromStack(id: string): void {
    const index = stack.indexOf(id);
    if (index !== -1) {
      stack.splice(index, 1);
    }
  }

  function isTopmost(id: string): boolean {
    return stack.at(-1) === id;
  }

  function incrementZIndex(customZIndex?: number): number {
    if (customZIndex) {
      return customZIndex;
    }

    zIndexCounter += 10;
    return zIndexCounter;
  }

  function decrementZIndex(customZIndex?: number): void {
    if (!customZIndex && zIndexCounter > startIndex) {
      zIndexCounter -= 10;
    }
  }

  return {
    addToStack,
    removeFromStack,
    isTopmost,
    incrementZIndex,
    decrementZIndex,
  };
}
