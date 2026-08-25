"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, Search } from "lucide-react";

import { api } from "@/lib/api";
import { cn, formatRelativeTime } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS, Sidebar } from "@/components/layout/sidebar";
import { RiskBadge } from "@/components/risk-badge";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PAGE_COPY: Record<string, { title: string; context: string }> = {
  "/dashboard": {
    title: "National situation overview",
    context: "Price, supply and shortage risk across monitored markets",
  },
  "/commodities": {
    title: "Commodity intelligence",
    context: "Current prices, risk scores and short-horizon forecasts",
  },
  "/alerts": {
    title: "Early warning alerts",
    context: "Active and historical risk alerts requiring officer attention",
  },
  "/locations": {
    title: "Regional intelligence",
    context: "State and district risk picture for authorised monitoring",
  },
  "/actions": {
    title: "Decision support",
    context: "Recommended options for review — not automatic government orders",
  },
  "/settings": {
    title: "Workspace settings",
    context: "Profile, notification preferences and system information",
  },
};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const copy = PAGE_COPY[pathname] ?? {
    title: "EWPIS",
    context: "Essential Commodities Early Warning & Intelligence System",
  };

  const notificationResult = api.getAlerts({ status: "NEW" });
  const notifications = notificationResult.success
    ? notificationResult.data.filter(
        (item) => item.riskLevel === "CRITICAL" || item.riskLevel === "MODERATE"
      )
    : [];

  function onSearch(event: React.FormEvent) {
    event.preventDefault();
    const next = query.trim();
    if (!next) {
      router.push("/commodities");
      return;
    }
    router.push(`/commodities?q=${encodeURIComponent(next)}`);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-3 px-3 py-2.5 md:px-6">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="w-[16.5rem] p-0" showCloseButton>
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Primary application sections</SheetDescription>
            </SheetHeader>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="min-w-0 flex-1">
          <p className="font-heading text-sm font-semibold text-foreground md:text-base">
            {copy.title}
          </p>
          <p className="hidden truncate text-xs text-muted-foreground sm:block">
            {copy.context}
          </p>
        </div>

        <form onSubmit={onSearch} className="hidden max-w-sm flex-1 md:block">
          <label className="sr-only" htmlFor="header-search">
            Search commodities or locations
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="header-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search commodity or market"
              className="pl-8"
            />
          </div>
        </form>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="icon" className="relative" />
            }
          >
            <Bell />
            <span className="sr-only">Notifications</span>
            {notifications.length > 0 ? (
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                {notifications.length}
              </span>
            ) : null}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Open high-priority alerts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                No new moderate or critical alerts.
              </div>
            ) : (
              notifications.slice(0, 5).map((alert) => (
                <DropdownMenuItem
                  key={alert.id}
                  className="flex flex-col items-start gap-1 py-2"
                  onClick={() => router.push("/alerts")}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="font-medium">{alert.commodityName}</span>
                    <RiskBadge level={alert.riskLevel} />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {alert.locationName} · {formatRelativeTime(alert.issuedAt)}
                  </span>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/alerts" />}>
              Open alerts register
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="gap-2 px-1.5 md:px-2" />}
          >
            <Avatar size="sm">
              <AvatarFallback>GO</AvatarFallback>
            </Avatar>
            <span className="hidden text-left text-sm md:block">
              <span className="block leading-tight font-medium">Duty officer</span>
              <span className="block text-xs text-muted-foreground">
                Demo session
              </span>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Authorised officer (demo)</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/settings" />}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Sign out (not enabled)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex gap-1 overflow-x-auto border-t border-border px-3 py-1.5 lg:hidden">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-2 py-1 text-xs whitespace-nowrap",
                active ? "bg-muted font-medium" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <Badge variant="outline" className="ml-auto">
          Mock
        </Badge>
      </div>
    </header>
  );
}
