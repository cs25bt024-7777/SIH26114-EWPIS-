"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  LayoutDashboard,
  MapPinned,
  Package,
  Settings,
  ShieldAlert,
  Siren,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/commodities", label: "Commodities", icon: Package },
  { href: "/alerts", label: "Alerts", icon: Siren },
  { href: "/locations", label: "Locations", icon: MapPinned },
  { href: "/actions", label: "Actions", icon: ShieldAlert },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-[16.5rem] shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground",
        className
      )}
    >
      <div className="border-b border-sidebar-border px-4 py-4">
        <Link href="/dashboard" className="block" onClick={onNavigate}>
          <p className="font-heading text-[11px] font-semibold tracking-[0.16em] text-sidebar-foreground/70 uppercase">
            Government of India
          </p>
          <p className="mt-1 font-heading text-lg leading-tight font-semibold text-sidebar-foreground">
            EWPIS
          </p>
          <p className="mt-1 text-xs leading-snug text-sidebar-foreground/70">
            Essential Commodities Early Warning &amp; Intelligence System
          </p>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Primary">
        {NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-sidebar-border p-4">
        <p className="flex items-start gap-2 text-xs leading-snug text-sidebar-foreground/70">
          <Bell className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Demonstration interface. Mock data is not official statistics.
        </p>
      </div>
    </aside>
  );
}
