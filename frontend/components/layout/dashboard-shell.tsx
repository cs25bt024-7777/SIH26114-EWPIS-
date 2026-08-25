import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:shrink-0">
        <Sidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <div className="border-b border-border bg-[var(--gov-band)] px-3 py-1.5 text-[11px] text-[var(--gov-band-fg)] md:px-6">
          SIH26114 · Essential Commodity Price &amp; Shortage Early Warning
          System · Demonstration workspace using mock records
        </div>
        <main className="flex-1 px-3 py-4 md:px-6 md:py-6">{children}</main>
      </div>
    </div>
  );
}
