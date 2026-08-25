import { RiskBadge } from "@/components/risk-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RecommendedAction } from "@/types/alert";

const PRIORITY_LABEL: Record<RecommendedAction["priority"], string> = {
  LOW: "Low priority",
  MEDIUM: "Medium priority",
  HIGH: "High priority",
  URGENT: "Urgent review",
};

const STATUS_LABEL: Record<RecommendedAction["status"], string> = {
  NEW: "New",
  UNDER_REVIEW: "Under review",
  ACTION_TAKEN: "Action taken",
  CLOSED: "Closed",
};

export function ActionCard({ action }: { action: RecommendedAction }) {
  return (
    <Card className="rounded-lg">
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle>
              {action.commodityName} · {action.locationName}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{action.summary}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <RiskBadge level={action.riskLevel} />
            <Badge variant="outline">{PRIORITY_LABEL[action.priority]}</Badge>
            <Badge variant="secondary">{STATUS_LABEL[action.status]}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">{action.rationale}</p>
      </CardContent>
    </Card>
  );
}
