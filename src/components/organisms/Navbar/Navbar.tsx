import Link from "next/link";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header
      className="glass-nav fixed inset-x-0 top-0 z-50 w-full"
      style={{ minHeight: "var(--nav-height)" }}
      role="banner"
    >
      <div
        className={cn(
          "flex w-full items-center gap-2 px-3 sm:gap-4 sm:px-5 lg:px-8 xl:px-12",
          "min-h-[var(--nav-height)] py-2.5 md:py-0"
        )}
      >
        <Link
          href="/"
          className="group flex min-w-0 shrink-0 items-center gap-2.5 focus-visible:outline-none sm:gap-3"
          aria-label="NYXN Home"
        >
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9">
            <div
              className="absolute inset-0 rounded-full border border-nyxn-accent/35"
              style={{ animation: "spin-slow 8s linear infinite" }}
            />
            <div
              className="absolute inset-[3px] rounded-full border border-nyxn-accent/18 sm:inset-[4px]"
              style={{ animation: "spin-slow 12s linear infinite reverse" }}
            />
            <div
              className="relative z-10 h-2 w-2 rounded-full bg-nyxn-accent sm:h-2.5 sm:w-2.5"
              style={{
                boxShadow:
                  "0 0 10px var(--color-nyxn-accent), 0 0 22px rgba(0,200,240,0.4)",
              }}
            />
          </div>

          <div className="flex min-w-0 flex-col leading-none">
            <span
              className="truncate font-display text-sm font-black tracking-widest text-nyxn-text transition-colors duration-200 group-hover:text-nyxn-accent sm:text-base lg:text-lg"
              style={{ fontFamily: "var(--font-display, Orbitron, monospace)" }}
            >
              NYXN
            </span>
            <span className="mt-0.5 hidden font-mono text-[8px] tracking-[0.18em] text-nyxn-muted sm:inline">
              GALACTIC DB
            </span>
          </div>
        </Link>

        <NavDivider className="hidden sm:block" />

        <div className="flex min-w-0 flex-1 flex-col items-center justify-center px-1 text-center">
          <h1
            className="font-display text-sm font-black leading-tight tracking-widest text-nyxn-text sm:text-base lg:text-lg"
            style={{ fontFamily: "var(--font-display, Orbitron, monospace)" }}
          >
            <span className="whitespace-nowrap">
              RICK &amp;{" "}
              <span
                className="text-nyxn-accent"
                style={{
                  textShadow:
                    "0 0 20px rgba(0,200,240,0.7), 0 0 40px rgba(0,200,240,0.25)",
                }}
              >
                MORTY
              </span>
            </span>
          </h1>

        </div>

        <NavDivider className="hidden lg:block" />

        <div className="hidden shrink-0 flex-col items-end leading-none lg:flex">
          <span
            className="font-display text-lg font-black text-nyxn-accent"
            style={{ fontFamily: "var(--font-display, Orbitron, monospace)" }}
          >
            826
          </span>
          <span className="font-mono text-[8px] tracking-[0.18em] text-nyxn-muted">
            ENTITIES
          </span>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-25"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-nyxn-accent) 30%, var(--color-nyxn-accent) 70%, transparent)",
        }}
        aria-hidden="true"
      />
    </header>
  );
}

function NavDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("mx-2 h-8 w-px shrink-0 sm:mx-4 sm:h-9", className)}
      style={{
        background:
          "linear-gradient(180deg, transparent, var(--color-nyxn-border-bright), transparent)",
      }}
      aria-hidden="true"
    />
  );
}
