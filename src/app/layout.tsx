import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NYXN · Rick & Morty",
  description:
    "Browse and search Rick & Morty characters. Built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: ["Rick and Morty", "characters", "search", "NYXN"],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${orbitron.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-[var(--color-nyxn-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--color-nyxn-bg)]"
        >
          Skip to content
        </a>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
