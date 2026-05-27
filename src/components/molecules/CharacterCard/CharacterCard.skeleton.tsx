import { Skeleton } from "@heroui/react";

export function CharacterCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <div
      className="glass-card relative overflow-hidden rounded-lg"
      style={{ animationDelay: `${index * 40}ms` }}
      aria-hidden="true"
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg bg-[var(--color-nyxn-border-bright)]/40" />

      <div className="ml-[3px] h-48 w-[calc(100%-3px)] overflow-hidden">
        <Skeleton
          className="h-full w-full rounded-none"
          style={{ background: "rgba(10,15,30,0.8)" }}
        />
      </div>

      <div className="pl-5 pr-4 py-4 space-y-3">
        <Skeleton
          className="h-3.5 w-3/4 rounded"
          style={{ background: "rgba(26,40,72,0.8)", animationDelay: `${index * 40 + 80}ms` }}
        />

        <div className="space-y-2">
          <Skeleton
            className="h-2.5 w-full rounded"
            style={{ background: "rgba(26,40,72,0.6)", animationDelay: `${index * 40 + 120}ms` }}
          />
          <Skeleton
            className="h-2.5 w-4/5 rounded"
            style={{ background: "rgba(26,40,72,0.6)", animationDelay: `${index * 40 + 160}ms` }}
          />
          <Skeleton
            className="h-2.5 w-2/3 rounded"
            style={{ background: "rgba(26,40,72,0.6)", animationDelay: `${index * 40 + 200}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
