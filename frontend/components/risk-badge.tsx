import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { riskBadgeClass, riskLevelLabel, riskLevelToColor } from "@/lib/risk";
import type { RiskLevel } from "@/types/risk";

export function RiskBadge({
  level,
  className,
  showColor = true,
}: {
  level: RiskLevel;
  className?: string;
  showColor?: boolean;
}) {
  const color = riskLevelToColor(level);
  return (
    <Badge
      variant="outline"
      className={cn("rounded-md font-medium", riskBadgeClass(level), className)}
    >
      <span className="sr-only">Risk level</span>
      {showColor ? `${color} · ${riskLevelLabel(level)}` : riskLevelLabel(level)}
    </Badge>
  );
}

export function RiskMeter({
  score,
  level,
}: {
  score: number;
  level: RiskLevel;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Risk score</span>
        <span className="font-medium tabular-nums">
          {score}/100 · {riskLevelLabel(level)}
        </span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-muted"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
        aria-label={`Risk score ${score} of 100, ${riskLevelLabel(level)}`}
      >
        <div
          className={cn("h-full", {
            "bg-[var(--risk-stable-fg)]": level === "STABLE",
            "bg-[var(--risk-watch-fg)]": level === "WATCH",
            "bg-[var(--risk-moderate-fg)]": level === "MODERATE",
            "bg-[var(--risk-critical-fg)]": level === "CRITICAL",
          })}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
