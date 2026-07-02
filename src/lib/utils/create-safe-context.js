import { createContext, useContext } from "react";

export function createSafeContext(rootName) {
  const Context = createContext(null);

  function useSafeContext(componentName) {
    const context = useContext(Context);
    if (!context) {
      throw new Error(
        `${componentName} debe usarse dentro de <${rootName}>.`
      );
    }
    return context;
  }

  return [Context, useSafeContext];
}
