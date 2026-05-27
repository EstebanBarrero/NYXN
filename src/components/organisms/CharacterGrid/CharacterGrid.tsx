"use client";

import { AlertCircle, SearchX, ChevronLeft, ChevronRight } from "lucide-react";
import {
  CharacterCard,
  CharacterCardSkeleton,
  SearchBar,
} from "@/components/molecules";
import { useCharacters } from "@/hooks";
import type { Character } from "@/types";

interface CharacterGridProps {
  initialData: Character[];
}

const SKELETON_COUNT = 20;

export function CharacterGrid({ initialData }: CharacterGridProps) {
  const {
    characters,
    query,
    setQuery,
    isLoading,
    error,
    page,
    setPage,
    pageInfo,
  } = useCharacters(initialData);

  return (
    <section aria-label="Character browser" className="w-full">
      <div className="search-dock -mx-1 px-1 sm:-mx-0 sm:px-0">
        <SearchBar
          value={query}
          onChange={setQuery}
          resultCount={characters.length}
          isLoading={isLoading}
          placeholder="Search entity by name…"
        />
      </div>

      <div
        id="character-grid"
        aria-live="polite"
        aria-label="Characters list"
        aria-busy={isLoading}
      >
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 sm:gap-4 lg:gap-5">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <CharacterCardSkeleton key={i} index={i} />
            ))}
          </div>
        ) : error ? (
          <div className="glass-card flex flex-col items-center justify-center rounded-xl py-20 px-8 text-center">
            {error === "RATE_LIMITED" ? (
              <>
                <AlertCircle size={36} className="mb-4 text-[var(--color-nyxn-accent)]" aria-hidden="true" />
                <p
                  className="text-sm font-bold tracking-widest text-[var(--color-nyxn-text)]"
                  style={{ fontFamily: "var(--font-display, Orbitron, monospace)" }}
                >
                  RATE LIMITED
                </p>
                <p className="mt-2 font-mono text-xs tracking-widest text-[var(--color-nyxn-muted)]">
                  API THROTTLE ACTIVE · SLOW DOWN · RETRY IN A MOMENT
                </p>
              </>
            ) : error === "NOT_FOUND" || query ? (
              <>
                <SearchX size={36} className="mb-4 text-[var(--color-nyxn-muted)]" aria-hidden="true" />
                <p
                  className="text-sm font-bold tracking-widest text-[var(--color-nyxn-text)]"
                  style={{ fontFamily: "var(--font-display, Orbitron, monospace)" }}
                >
                  NO ENTITY FOUND
                </p>
                <p className="mt-2 font-mono text-xs tracking-widest text-[var(--color-nyxn-muted)]">
                  QUERY: &ldquo;{query.toUpperCase()}&rdquo; · 0 RESULTS
                </p>
              </>
            ) : (
              <>
                <AlertCircle size={36} className="mb-4 text-[var(--color-nyxn-dead)]" aria-hidden="true" />
                <p
                  className="text-sm font-bold tracking-widest text-[var(--color-nyxn-text)]"
                  style={{ fontFamily: "var(--font-display, Orbitron, monospace)" }}
                >
                  CONNECTION FAILED
                </p>
                <p className="mt-2 font-mono text-xs tracking-widest text-[var(--color-nyxn-muted)]">
                  CHECK PORTAL GUN · RETRY SCAN
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 sm:gap-4 lg:gap-5">
            {characters.map((character, i) => (
              <CharacterCard key={character.id} character={character} index={i} />
            ))}
          </div>
        )}
      </div>

      {pageInfo && !error && !isLoading && (
        <div className="mt-14 mb-10 flex flex-col items-center gap-5">

          <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-nyxn-muted)]">
            PAGE{" "}
            <span className="text-[var(--color-nyxn-accent)]">{page}</span>
            {" "}OF{" "}
            <span className="text-[var(--color-nyxn-text-dim)]">{pageInfo.pages}</span>
            {" · "}
            <span className="text-[var(--color-nyxn-text-dim)]">{pageInfo.count.toLocaleString()}</span>
            {" ENTITIES"}
          </p>

          <nav aria-label="Pagination" className="pagination-bar flex items-center gap-0 rounded-2xl p-1.5">

            <button
              type="button"
              onClick={() => setPage(page - 1)}
              disabled={!pageInfo.prev}
              aria-label="Previous page"
              className="pagination-nav flex items-center gap-1.5 rounded-xl px-3 py-2.5 font-mono text-[11px] tracking-widest"
            >
              <ChevronLeft size={13} aria-hidden="true" />
              <span className="hidden sm:inline">PREV</span>
            </button>

            <div className="pagination-sep mx-1 h-5 w-px" aria-hidden="true" />

            {(() => {
              const total = pageInfo.pages;
              const current = page;
              const getPages = (): (number | "…")[] => {
                if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
                const pages: (number | "…")[] = [1];
                if (current > 3) pages.push("…");
                for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p);
                if (current < total - 2) pages.push("…");
                pages.push(total);
                return pages;
              };

              return getPages().map((p, i) =>
                p === "…" ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="flex h-9 w-7 items-end justify-center pb-1 font-mono text-sm text-[var(--color-nyxn-muted)]"
                    aria-hidden="true"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p as number)}
                    aria-label={`Page ${p}`}
                    aria-current={p === current ? "page" : undefined}
                    className={
                      p === current
                        ? "pagination-page-active flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl font-mono text-sm font-black tracking-wider transition-all duration-200"
                        : "pagination-page flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl font-mono text-sm font-bold tracking-wider transition-all duration-200"
                    }
                  >
                    {p}
                  </button>
                )
              );
            })()}

            <div className="pagination-sep mx-1 h-5 w-px" aria-hidden="true" />

            <button
              type="button"
              onClick={() => setPage(page + 1)}
              disabled={!pageInfo.next}
              aria-label="Next page"
              className="pagination-nav flex items-center gap-1.5 rounded-xl px-3 py-2.5 font-mono text-[11px] tracking-widest"
            >
              <span className="hidden sm:inline">NEXT</span>
              <ChevronRight size={13} aria-hidden="true" />
            </button>
          </nav>
        </div>
      )}
    </section>
  );
}
