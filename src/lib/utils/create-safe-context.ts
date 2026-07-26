import { createContext, useContext } from "react";

export function createSafeContext<T>(rootName: string) {
  const Context = createContext<T | null>(null);

  function useSafeContext(componentName: string): T {
    const context = useContext(Context);
    if (!context) {
      throw new Error(
        `${componentName} must be used within <${rootName}>.`
      );
    }
    return context;
  }

  return [Context, useSafeContext] as const;
}
