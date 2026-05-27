import { Footer, Navbar } from "@/components/organisms";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-nyxn-bg">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,200,240,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,240,0.022) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,200,240,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,240,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed left-1/2 top-0 z-0 h-[500px] w-[1200px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(0,200,240,0.07) 0%, rgba(0,200,240,0.02) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Navbar />

      <main
        id="main-content"
        className={cn(
          "relative z-10 w-full flex-1",
          "px-3 pb-16 sm:px-5 lg:px-8 xl:px-12",
          className
        )}
        style={{ paddingTop: "calc(var(--nav-height) + 2rem)" }}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
