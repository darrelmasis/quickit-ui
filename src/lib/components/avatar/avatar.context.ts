import { createSafeContext } from "@/lib/utils/create-safe-context";

export interface AvatarContextValue {
  setStatus: (status: "loading" | "error" | "loaded") => void;
  shape: string;
  size: string;
  status: string;
  theme: string;
}

export const [AvatarContext, useAvatarContext] = createSafeContext<AvatarContextValue>("Avatar");
