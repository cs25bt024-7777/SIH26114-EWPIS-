import { RiskBadge, RiskMeter } from "@/components/risk-badge";
import { Badge } from "@/components/ui/badge";
import { formatProbability, formatRelativeTime } from "@/lib/utils";
import type { Alert } from "@/types/alert";

const STATUS_LABEL: Record<Alert["status"], string> = {
  NEW: "New",
  UNDER_REVIEW: "Under review",
  ACTION_TAKEN: "Action taken",
  CLOSED: "Closed",
};

export function AlertCard({ alert }: { alert: Alert }) {
  const critical = alert.riskLevel === "CRITICAL";

  return (
    <article
      className={
        critical
          ? "rounded-lg border border-[var(--risk-critical-border)] bg-[var(--risk-critical-bg)] p-4"
          : "rounded-lg border border-border bg-card p-4"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-heading text-sm font-semibold">{alert.title}</h3>
          <p className="text-xs text-muted-foreground">
            {alert.commodityName} · {alert.locationName}, {alert.stateName}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <RiskBadge level={alert.riskLevel} />
          <Badge variant="outline">{STATUS_LABEL[alert.status]}</Badge>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed">{alert.reason}</p>
      <div className="mt-3">
        <RiskMeter score={alert.riskScore} level={alert.riskLevel} />
      </div>
      <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-3">
        <div>
          <dt className="text-muted-foreground">Shortage probability</dt>
          <dd className="font-medium tabular-nums">
            {formatProbability(alert.shortageProbability)}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Warning window</dt>
          <dd className="font-medium">~{alert.warningWindowDays} days</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Issued</dt>
          <dd className="font-medium">{formatRelativeTime(alert.issuedAt)}</dd>
        </div>
      </dl>
    </article>
  );
}
