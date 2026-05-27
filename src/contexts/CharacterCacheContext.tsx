"use client";

import { createContext, useContext, useRef } from "react";
import type { Character, PageInfo } from "@/types";

export interface CacheEntry {
  results: Character[];
  info: PageInfo;
}

interface CharacterCacheContextValue {
  get: (key: string) => CacheEntry | undefined;
  set: (key: string, entry: CacheEntry) => void;
  has: (key: string) => boolean;
}

const CharacterCacheContext = createContext<CharacterCacheContextValue | null>(null);

export function CharacterCacheProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cacheRef = useRef(new Map<string, CacheEntry>());

  const ctx: CharacterCacheContextValue = {
    get: (key) => cacheRef.current.get(key),
    set: (key, entry) => cacheRef.current.set(key, entry),
    has: (key) => cacheRef.current.has(key),
  };

  return (
    <CharacterCacheContext.Provider value={ctx}>
      {children}
    </CharacterCacheContext.Provider>
  );
}

export function useCharacterCache(): CharacterCacheContextValue {
  const ctx = useContext(CharacterCacheContext);
  if (!ctx) {
    throw new Error(
      "useCharacterCache must be called inside <CharacterCacheProvider>"
    );
  }
  return ctx;
}
