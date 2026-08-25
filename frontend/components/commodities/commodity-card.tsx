import Link from "next/link";

import { RiskBadge, RiskMeter } from "@/components/risk-badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatInr, formatPercent, formatProbability } from "@/lib/utils";
import type { CommoditySnapshot } from "@/types/commodity";

export function CommodityCard({ snapshot }: { snapshot: CommoditySnapshot }) {
  return (
    <Card className="rounded-lg">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle>{snapshot.commodity.name}</CardTitle>
            <p className="text-xs text-muted-foreground">
              {snapshot.locationName}, {snapshot.stateName}
            </p>
          </div>
          <RiskBadge level={snapshot.risk.riskLevel} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Current price</p>
            <p className="font-heading text-lg font-semibold tabular-nums">
              {formatInr(snapshot.currentPrice)}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                {snapshot.commodity.unit}
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Change</p>
            <p className="font-heading text-lg font-semibold tabular-nums">
              {formatPercent(snapshot.priceChangePercentage)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Forecast ({snapshot.forecastHorizonDays}d)</p>
            <p className="font-medium tabular-nums">{formatInr(snapshot.forecastPrice)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Shortage probability</p>
            <p className="font-medium tabular-nums">
              {formatProbability(snapshot.risk.shortageProbability)}
            </p>
          </div>
        </div>
        <RiskMeter score={snapshot.risk.riskScore} level={snapshot.risk.riskLevel} />
      </CardContent>
      <CardFooter className="justify-between text-xs text-muted-foreground">
        <span>Warning window ~{snapshot.risk.warningWindowDays} days</span>
        <Link href="/alerts" className="text-foreground underline-offset-4 hover:underline">
          Related alerts
        </Link>
      </CardFooter>
    </Card>
  );
}
