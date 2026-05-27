"use client";

import { SearchField } from "@heroui/react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  resultCount?: number;
  isLoading?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Type a character name…",
  className,
  resultCount,
  isLoading,
}: SearchBarProps) {
  const hasValue = Boolean(value);

  return (
    <div className={cn("w-full", className)}>

      <div className="relative">
      <SearchField
        id="character-search"
        value={value}
        onChange={onChange}
        fullWidth
        aria-label="Search characters by name"
        aria-controls="character-grid"
        aria-describedby="character-search-hint"
      >
        <SearchField.Group
          className={cn(
            "search-field-group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 sm:px-5 sm:py-4",
            "border-2 transition-all duration-300",
            hasValue
              ? "search-field-active border-nyxn-accent"
              : "search-field-idle border-nyxn-accent/35"
          )}
        >
          {isLoading ? (
            <Loader2
              size={20}
              className="shrink-0 animate-spin text-nyxn-accent"
              aria-hidden="true"
            />
          ) : (
            <Search
              size={20}
              className={cn(
                "shrink-0 transition-colors duration-300",
                hasValue ? "text-nyxn-accent" : "text-nyxn-text-dim"
              )}
              aria-hidden="true"
            />
          )}

          <SearchField.Input
            id="character-search-input"
            placeholder={placeholder}
            autoComplete="off"
            spellCheck={false}
            className={cn(
              "min-w-0 flex-1 bg-transparent outline-none",
              "font-mono text-sm tracking-wide text-nyxn-text sm:text-base sm:tracking-widest",
              "placeholder:text-nyxn-text-dim/45 placeholder:tracking-wide sm:placeholder:tracking-[0.1em]"
            )}
          />

          {!isLoading && hasValue && resultCount !== undefined && (
            <span
              className={cn(
                "hidden shrink-0 rounded-md px-2.5 py-1 font-mono text-[10px] font-medium tracking-widest sm:inline",
                resultCount > 0
                  ? "bg-nyxn-accent/15 text-nyxn-accent ring-1 ring-nyxn-accent/30"
                  : "bg-nyxn-dead/15 text-nyxn-dead ring-1 ring-nyxn-dead/30"
              )}
            >
              {resultCount} FOUND
            </span>
          )}

          {hasValue && (
            <SearchField.ClearButton
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                "border border-nyxn-accent/40 text-nyxn-accent/70",
                "transition-all duration-200",
                "hover:border-nyxn-accent hover:bg-nyxn-accent/10 hover:text-nyxn-accent",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nyxn-accent"
              )}
              aria-label="Clear search"
            >
              <X size={13} />
            </SearchField.ClearButton>
          )}
        </SearchField.Group>
      </SearchField>

      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {hasValue && resultCount !== undefined
          ? `${resultCount} character${resultCount !== 1 ? "s" : ""} found`
          : ""}
      </div>
    </div>
  );
}
