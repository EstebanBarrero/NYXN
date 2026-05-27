"use client";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "./useDebounce";
import { characterService } from "@/services";
import { ApiError } from "@/services/httpClient";
import { useCharacterCache } from "@/contexts";
import { DEBOUNCE_MS } from "@/constants";
import type { Character, PageInfo } from "@/types";

export type FetchError = "NOT_FOUND" | "RATE_LIMITED" | "NETWORK_ERROR";

interface UseCharactersReturn {
  characters: Character[];
  query: string;
  setQuery: (q: string) => void;
  isLoading: boolean;
  error: FetchError | null;
  page: number;
  setPage: (p: number) => void;
  pageInfo: PageInfo | null;
}

export function useCharacters(initialData: Character[]): UseCharactersReturn {
  const cache = useCharacterCache();

  const [query, setQueryState] = useState("");
  const [characters, setCharacters] = useState<Character[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FetchError | null>(null);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);

  const isHydrating = useRef(initialData.length > 0);

  const debouncedQuery = useDebounce(query, DEBOUNCE_MS);
  const debouncedPage = useDebounce(page, 350);

  const setQuery = (nextQuery: string) => {
    setQueryState(nextQuery);
    setPage(1);
  };

  useEffect(() => {
    let cancelled = false;

    const fetchCharacters = async () => {
      const cacheKey = `${debouncedQuery}:${debouncedPage}`;

      const cached = cache.get(cacheKey);
      if (cached) {
        if (!cancelled) {
          setCharacters(cached.results);
          setPageInfo(cached.info);
          setError(null);
        }
        return;
      }

      if (!isHydrating.current) setIsLoading(true);
      isHydrating.current = false;
      setError(null);

      try {
        const data = await characterService.getAll(debouncedQuery, debouncedPage);

        if (!cancelled) {
          setCharacters(data.results);
          setPageInfo(data.info);
          cache.set(cacheKey, { results: data.results, info: data.info });
        }
      } catch (err) {
        if (!cancelled) {
          let errorType: FetchError = "NETWORK_ERROR";

          if (err instanceof ApiError) {
            if (err.status === 429) errorType = "RATE_LIMITED";
            else if (err.status === 404) errorType = "NOT_FOUND";
          }

          setError(errorType);
          setCharacters([]);
          setPageInfo(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchCharacters();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, debouncedPage]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    characters,
    query,
    setQuery,
    isLoading,
    error,
    page,
    setPage,
    pageInfo,
  };
}
