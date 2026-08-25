import { CommodityCard } from "@/components/commodities/commodity-card";
import { RiskFactors } from "@/components/commodities/risk-factors";
import { CriticalAlerts } from "@/components/dashboard/critical-alerts";
import { ForecastChart } from "@/components/dashboard/forecast-chart";
import { PriceChart } from "@/components/dashboard/price-chart";
import { RiskMap } from "@/components/dashboard/risk-map";
import { RiskSummary } from "@/components/dashboard/risk-summary";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageIntro } from "@/components/page-intro";
import { api } from "@/lib/api";
import { formatDateTime } from "@/lib/utils";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  const overviewResult = api.getDashboardOverview();
  const summaryResult = api.getRiskSummary();
  const alertsResult = api.getAlerts();
  const risksResult = api.getLocationRisks();
  const snapshotsResult = api.getCommoditySnapshots();
  const forecastResult = api.getDefaultForecast();

  if (
    !overviewResult.success ||
    !summaryResult.success ||
    !alertsResult.success ||
    !risksResult.success ||
    !snapshotsResult.success
  ) {
    return (
      <DashboardShell>
        <PageIntro
          kicker="Situation room"
          title="Dashboard unavailable"
          description="The demonstration data layer could not assemble the national overview."
        />
      </DashboardShell>
    );
  }

  const prioritySnapshots = [...snapshotsResult.data]
    .sort((a, b) => b.risk.riskScore - a.risk.riskScore)
    .slice(0, 3);
  const topFactors = prioritySnapshots[0]?.risk.factors ?? [];

  return (
    <DashboardShell>
      <PageIntro
        kicker="National situation room"
        title="Commodity price and shortage intelligence"
        description={`${overviewResult.data.dataNotice} Last assembled ${formatDateTime(overviewResult.data.generatedAt)}.`}
      />
      <div className="space-y-6">
        <RiskSummary summary={summaryResult.data} overview={overviewResult.data} />
        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <RiskMap risks={risksResult.data} />
          <CriticalAlerts alerts={alertsResult.data} />
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          <PriceChart series={forecastResult.success ? forecastResult.data : null} />
          <ForecastChart series={forecastResult.success ? forecastResult.data : null} />
        </div>
        <section aria-labelledby="priority-heading" className="space-y-3">
          <div>
            <h2 id="priority-heading" className="font-heading text-base font-semibold">
              Priority commodity assessments
            </h2>
            <p className="text-sm text-muted-foreground">
              Highest risk scores in the current mock assessment set, including
              location and forecast context.
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            {prioritySnapshots.map((snapshot) => (
              <CommodityCard
                key={`${snapshot.commodity.id}-${snapshot.locationId}`}
                snapshot={snapshot}
              />
            ))}
          </div>
        </section>
        {topFactors.length > 0 ? <RiskFactors factors={topFactors} /> : null}
      </div>
    </DashboardShell>
  );
}
