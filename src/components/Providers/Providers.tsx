"use client";

import { CharacterCacheProvider } from "@/contexts";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CharacterCacheProvider>{children}</CharacterCacheProvider>;
}
