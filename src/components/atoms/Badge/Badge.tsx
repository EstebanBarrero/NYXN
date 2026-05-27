import { cn } from "@/lib/utils";
import type { CharacterStatus } from "@/types";

interface BadgeProps {
  status: CharacterStatus;
  className?: string;
}

const statusConfig: Record<
  CharacterStatus,
  { dot: string; text: string; bg: string; label: string }
> = {
  Alive: {
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10 border border-emerald-400/20",
    label: "Alive",
  },
  Dead: {
    dot: "bg-red-400",
    text: "text-red-400",
    bg: "bg-red-400/10 border border-red-400/20",
    label: "Dead",
  },
  unknown: {
    dot: "bg-[var(--color-nyxn-muted)]",
    text: "text-[var(--color-nyxn-muted)]",
    bg: "bg-white/5 border border-white/10",
    label: "Unknown",
  },
};

export function Badge({ status, className }: BadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
      aria-label={`Status: ${config.label}`}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", config.dot)}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}
