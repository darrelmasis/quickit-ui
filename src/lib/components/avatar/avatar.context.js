import { createContext, useContext } from "react";

export const AvatarContext = createContext(null);

export function useAvatarContext(componentName) {
  const context = useContext(AvatarContext);

  if (!context) {
    throw new Error(`${componentName} debe usarse dentro de <Avatar>.`);
  }

  return context;
}
