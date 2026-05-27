import { MapPin, Radio } from "lucide-react";
import { Card } from "@heroui/react";
import { cn } from "@/lib/utils";
import type { Character } from "@/types";

interface CharacterCardProps {
  character: Character;
  className?: string;
  index?: number;
}

const statusConfig = {
  Alive: {
    bar: "bg-[var(--color-nyxn-alive)]",
    dot: "bg-[var(--color-nyxn-alive)] status-alive-dot",
    text: "text-[var(--color-nyxn-alive)]",
    label: "ALIVE",
  },
  Dead: {
    bar: "bg-[var(--color-nyxn-dead)]",
    dot: "bg-[var(--color-nyxn-dead)]",
    text: "text-[var(--color-nyxn-dead)]",
    label: "DEAD",
  },
  unknown: {
    bar: "bg-[var(--color-nyxn-unknown)]",
    dot: "bg-[var(--color-nyxn-unknown)]",
    text: "text-[var(--color-nyxn-unknown)]",
    label: "UNKNOWN",
  },
};

export function CharacterCard({ character, className, index = 0 }: CharacterCardProps) {
  const status = statusConfig[character.status];

  return (
    <Card
      variant="transparent"
      className={cn(
        "card-animate glass-card group relative overflow-hidden rounded-lg",
        "cursor-default transition-all duration-300 ease-out",
        className
      )}
      style={{ "--card-index": index } as React.CSSProperties}
      aria-label={`Entity: ${character.name}`}
    >
      <div className={cn("absolute left-0 top-0 bottom-0 w-[3px] z-10 rounded-l-lg", status.bar)} />

      <div className="relative h-48 w-full overflow-hidden ml-[3px]" style={{ width: "calc(100% - 3px)" }}>
        <img
          src={character.image}
          alt={character.name}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,9,16,0.08) 0%, rgba(6,9,16,0.0) 35%, rgba(6,9,16,0.85) 100%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,200,240,0.04) 3px, rgba(0,200,240,0.04) 4px)",
          }}
        />

        <div className="absolute top-2.5 left-2.5 glass-surface rounded px-2 py-0.5 font-mono text-[9px] tracking-widest text-[var(--color-nyxn-accent)]/80">
          #{String(character.id).padStart(4, "0")}
        </div>

        <div className="absolute top-2.5 right-2.5 glass-surface flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[9px] tracking-wide text-[var(--color-nyxn-text-dim)]">
          <Radio size={8} aria-hidden="true" className="text-[var(--color-nyxn-accent)]/60" />
          {character.episode.length}EP
        </div>
      </div>

      <div
        className="space-y-2.5"
        style={{ padding: "0.875rem 1rem 1rem 1.375rem" }}
      >
        <h3
          className="text-sm font-bold tracking-wide leading-tight line-clamp-1 text-[var(--color-nyxn-text)] transition-colors duration-200 group-hover:text-[var(--color-nyxn-accent)]"
          style={{ fontFamily: "var(--font-display, Orbitron, monospace)" }}
          title={character.name}
        >
          {character.name.toUpperCase()}
        </h3>

        <div className="space-y-1.5 font-mono text-[10px] tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-14 shrink-0 text-[var(--color-nyxn-muted)]">STATUS</span>
            <span className="text-[var(--color-nyxn-border-bright)]">·</span>
            <div className="flex items-center gap-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", status.dot)} />
              <span className={cn("font-medium", status.text)}>{status.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-14 shrink-0 text-[var(--color-nyxn-muted)]">SPECIES</span>
            <span className="text-[var(--color-nyxn-border-bright)]">·</span>
            <span className="line-clamp-1 text-[var(--color-nyxn-text-dim)]">
              {character.species.toUpperCase()}
              {character.type ? ` [${character.type.toUpperCase()}]` : ""}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-14 shrink-0 text-[var(--color-nyxn-muted)]">ORIGIN</span>
            <span className="text-[var(--color-nyxn-border-bright)]">·</span>
            <span className="flex items-center gap-1 line-clamp-1 text-[var(--color-nyxn-text-dim)]">
              <MapPin size={8} className="shrink-0 text-[var(--color-nyxn-accent)]/50" aria-hidden="true" />
              {character.location.name.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-[3px] right-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, var(--color-nyxn-accent), transparent 80%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,200,240,0.08) 0%, transparent 65%)",
        }}
      />
    </Card>
  );
}
