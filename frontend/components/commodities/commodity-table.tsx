import { EmptyState } from "@/components/page-intro";
import { RiskBadge } from "@/components/risk-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatInr, formatPercent, formatProbability } from "@/lib/utils";
import { riskLevelLabel } from "@/lib/risk";
import type { CommoditySnapshot } from "@/types/commodity";

export function CommodityTable({ rows }: { rows: CommoditySnapshot[] }) {
  if (rows.length === 0) {
    return (
      <EmptyState
        title="No commodities match the current filters"
        description="Adjust search, risk level or market filters to see intelligence rows."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Commodity</TableHead>
          <TableHead>Market</TableHead>
          <TableHead>Current price</TableHead>
          <TableHead>Change</TableHead>
          <TableHead>Forecast</TableHead>
          <TableHead>Risk</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Shortage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={`${row.commodity.id}-${row.locationId}`}>
            <TableCell>
              <div className="font-medium">{row.commodity.name}</div>
              <div className="text-xs text-muted-foreground">{row.commodity.category}</div>
            </TableCell>
            <TableCell>
              <div>{row.locationName}</div>
              <div className="text-xs text-muted-foreground">{row.stateName}</div>
            </TableCell>
            <TableCell className="tabular-nums">
              {formatInr(row.currentPrice)}
              <div className="text-xs text-muted-foreground">{row.commodity.unit}</div>
            </TableCell>
            <TableCell className="tabular-nums">
              {formatPercent(row.priceChangePercentage)}
            </TableCell>
            <TableCell className="tabular-nums">
              {formatInr(row.forecastPrice)}
              <div className="text-xs text-muted-foreground">{row.forecastHorizonDays} days</div>
            </TableCell>
            <TableCell>
              <RiskBadge level={row.risk.riskLevel} />
              <span className="sr-only">{riskLevelLabel(row.risk.riskLevel)}</span>
            </TableCell>
            <TableCell className="tabular-nums">{row.risk.riskScore}</TableCell>
            <TableCell className="tabular-nums">
              {formatProbability(row.risk.shortageProbability)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
