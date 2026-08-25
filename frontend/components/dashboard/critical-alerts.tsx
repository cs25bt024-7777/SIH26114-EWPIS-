import Link from "next/link";

import { EmptyState } from "@/components/page-intro";
import { RiskBadge } from "@/components/risk-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatProbability, formatRelativeTime } from "@/lib/utils";
import type { Alert } from "@/types/alert";

export function CriticalAlerts({ alerts }: { alerts: Alert[] }) {
  const critical = alerts.filter(
    (item) => item.riskLevel === "CRITICAL" && item.status !== "CLOSED"
  );

  return (
    <Card className="rounded-lg">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Critical alerts</CardTitle>
            <CardDescription>
              Severe or imminent shortage/price-risk conditions. Colour is not
              the only indicator — each row includes the RED / Critical label.
            </CardDescription>
          </div>
          <Button size="sm" variant="outline" render={<Link href="/alerts" />}>
            All alerts
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {critical.length === 0 ? (
          <EmptyState
            title="No open critical alerts"
            description="No RED / Critical items are currently open in the demonstration register."
          />
        ) : (
          critical.map((alert) => (
            <article
              key={alert.id}
              className="rounded-md border border-[var(--risk-critical-border)] bg-[var(--risk-critical-bg)] p-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-heading text-sm font-semibold">{alert.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {alert.commodityName} · {alert.locationName}, {alert.stateName}
                  </p>
                </div>
                <RiskBadge level={alert.riskLevel} />
              </div>
              <p className="mt-2 text-sm leading-relaxed">{alert.reason}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Score {alert.riskScore}/100 · Shortage probability{" "}
                {formatProbability(alert.shortageProbability)} · Window {"<"}
                {alert.warningWindowDays} days · {formatRelativeTime(alert.issuedAt)}
              </p>
            </article>
          ))
        )}
      </CardContent>
    </Card>
  );
}
