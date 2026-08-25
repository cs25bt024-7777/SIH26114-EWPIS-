import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { riskLevelDescription, riskLevelLabel } from "@/lib/risk";
import { cn } from "@/lib/utils";
import type { RiskSummaryCounts } from "@/types/risk";
import type { DashboardOverview } from "@/types/forecast";

const TILES: Array<{
  key: keyof Pick<RiskSummaryCounts, "stable" | "watch" | "moderate" | "critical">;
  percentKey: keyof Pick<
    RiskSummaryCounts,
    "stablePercent" | "watchPercent" | "moderatePercent" | "criticalPercent"
  >;
  level: "STABLE" | "WATCH" | "MODERATE" | "CRITICAL";
  color: string;
}> = [
  { key: "stable", percentKey: "stablePercent", level: "STABLE", color: "var(--risk-stable-fg)" },
  { key: "watch", percentKey: "watchPercent", level: "WATCH", color: "var(--risk-watch-fg)" },
  { key: "moderate", percentKey: "moderatePercent", level: "MODERATE", color: "var(--risk-moderate-fg)" },
  { key: "critical", percentKey: "criticalPercent", level: "CRITICAL", color: "var(--risk-critical-fg)" },
];

export function RiskSummary({
  summary,
  overview,
}: {
  summary: RiskSummaryCounts;
  overview: DashboardOverview;
}) {
  return (
    <section aria-labelledby="risk-summary-heading" className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 id="risk-summary-heading" className="font-heading text-base font-semibold">
            Risk overview
          </h2>
          <p className="text-sm text-muted-foreground">
            {summary.totalCommodities} commodities · {overview.monitoredLocations} markets
            · counts are assessment records in this demonstration set
          </p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {TILES.map((tile) => (
          <Card key={tile.key} size="sm" className="rounded-lg">
            <CardHeader className="border-b">
              <CardDescription className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-sm"
                  style={{ background: tile.color }}
                  aria-hidden="true"
                />
                {riskLevelLabel(tile.level)}
              </CardDescription>
              <CardTitle className="flex items-baseline justify-between gap-2 text-2xl tabular-nums">
                {summary[tile.key]}
                <span className="text-sm font-normal text-muted-foreground">
                  {summary[tile.percentKey]}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {riskLevelDescription(tile.level)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Critical alerts (open)" value={overview.criticalAlerts} tone="critical" />
        <Stat label="Moderate alerts (open)" value={overview.moderateAlerts} tone="moderate" />
        <Stat label="Early warnings (open)" value={overview.earlyWarnings} tone="watch" />
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "critical" | "moderate" | "watch";
}) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn("font-heading text-xl font-semibold tabular-nums", {
          "text-[var(--risk-critical-fg)]": tone === "critical",
          "text-[var(--risk-moderate-fg)]": tone === "moderate",
          "text-[var(--risk-watch-fg)]": tone === "watch",
        })}
      >
        {value}
      </p>
    </div>
  );
}
