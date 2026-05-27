"use client";

import { Code2, ExternalLink, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="footer-section relative z-10 mt-12 w-full"
    >
      <div className="footer-top-bar relative h-[2px] w-full overflow-hidden">
        <div className="footer-scanline absolute inset-y-0 w-1/3" aria-hidden="true" />
      </div>

      <div className="footer-content">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-4">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
              <div
                className="absolute inset-0 rounded-full border border-nyxn-accent/40"
                style={{ animation: "spin-slow 8s linear infinite" }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-[3px] rounded-full border border-nyxn-accent/20"
                style={{ animation: "spin-slow 14s linear infinite reverse" }}
                aria-hidden="true"
              />
              <div
                className="relative z-10 h-2 w-2 rounded-full bg-nyxn-accent"
                style={{ boxShadow: "0 0 10px var(--color-nyxn-accent), 0 0 20px rgba(0,200,240,0.4)" }}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-baseline gap-2">
                <span
                  className="font-display text-sm font-black tracking-widest text-nyxn-text"
                  style={{ fontFamily: "var(--font-display, Orbitron, monospace)" }}
                >
                  NYXN
                </span>
                <span className="font-mono text-[9px] tracking-[0.22em] text-nyxn-muted">
                  GALACTIC DB
                </span>
              </div>
              <p className="font-mono text-[10px] leading-relaxed tracking-wide text-nyxn-muted">
                Interdimensional registry · Rick &amp; Morty API · C-137
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusChip label="SYS"    value="ONLINE" tone="accent" />
            <StatusChip label="PORTAL" value="STABLE" tone="alive"  />
            <StatusChip label="API"    value="R&M v3" tone="muted"  />
          </div>
        </div>

        <div
          className="my-6 h-px opacity-20"
          style={{ background: "linear-gradient(90deg, transparent, var(--color-nyxn-accent), transparent)" }}
          aria-hidden="true"
        />

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[9px] tracking-[0.2em] text-nyxn-muted">
            © {year}{" "}
            <span className="text-nyxn-text-dim">NYXN</span>
            {" · DIMENSION C-137 · "}
            <span className="text-nyxn-accent/60">BUILT FOR TECHNICAL CHALLENGE</span>
          </p>
          <div className="flex items-center gap-6">
            <FooterLink
              href="https://rickandmortyapi.com"
              icon={<Radio size={11} />}
              label="RICKANDMORTYAPI.COM"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function StatusChip({ label, value, tone }: { label: string; value: string; tone: "accent" | "alive" | "muted" }) {
  const chipBg = tone === "accent" ? "bg-nyxn-accent/10 border-nyxn-accent/25"
    : tone === "alive" ? "bg-nyxn-alive/10 border-nyxn-alive/25"
    : "bg-nyxn-surface-2 border-nyxn-border";
  const dotClass = tone === "alive" ? "bg-nyxn-alive status-alive-dot"
    : tone === "accent" ? "bg-nyxn-accent" : "bg-nyxn-muted";
  const valueClass = tone === "accent" ? "text-nyxn-accent"
    : tone === "alive" ? "text-nyxn-alive" : "text-nyxn-text-dim";

  return (
    <div className={cn("flex items-center gap-2 rounded-lg border px-3 py-1.5", chipBg)}>
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotClass)} aria-hidden="true" />
      <span className="font-mono text-[9px] tracking-widest text-nyxn-muted">{label}</span>
      <span className={cn("font-mono text-[10px] font-semibold tracking-widest", valueClass)}>{value}</span>
    </div>
  );
}

function FooterLink({ href, icon, label, external }: { href: string; icon: React.ReactNode; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={external ? `${label} (opens in new tab)` : label}
      className="group inline-flex items-center gap-1.5 rounded font-mono text-[10px] tracking-widest text-nyxn-text-dim transition-colors duration-200 hover:text-nyxn-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nyxn-accent"
    >
      <span className="transition-colors duration-200 group-hover:text-nyxn-accent">{icon}</span>
      {label}
      {external && <ExternalLink size={8} className="opacity-50 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />}
    </a>
  );
}
