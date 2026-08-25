import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { RiskFactor } from "@/types/risk";

export function RiskFactors({ factors }: { factors: RiskFactor[] }) {
  return (
    <Card className="rounded-lg">
      <CardHeader className="border-b">
        <CardTitle>Contributing risk factors</CardTitle>
        <CardDescription>
          Why the assessment is elevated. These are structured demonstration
          factors, not live ML explanations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {factors.map((factor) => (
          <div key={factor.id} className="rounded-md border border-border p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium">{factor.factor}</p>
              <span
                className={cn(
                  "rounded-md border px-1.5 py-0.5 text-[11px] font-medium",
                  factor.impact === "HIGH" &&
                    "border-[var(--risk-critical-border)] bg-[var(--risk-critical-bg)] text-[var(--risk-critical-fg)]",
                  factor.impact === "MEDIUM" &&
                    "border-[var(--risk-moderate-border)] bg-[var(--risk-moderate-bg)] text-[var(--risk-moderate-fg)]",
                  factor.impact === "LOW" &&
                    "border-[var(--risk-stable-border)] bg-[var(--risk-stable-bg)] text-[var(--risk-stable-fg)]"
                )}
              >
                Impact {factor.impact}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {factor.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
