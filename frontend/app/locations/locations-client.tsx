"use client";

import { useState } from "react";

import { RiskMap } from "@/components/dashboard/risk-map";
import { EmptyState } from "@/components/page-intro";
import { RiskBadge, RiskMeter } from "@/components/risk-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

export function LocationsClient() {
  const [search, setSearch] = useState("");
  const risks = api.getLocationRisks();
  const locations = api.getLocations();
  const commodities = api.getCommodities();
  const snapshots = api.getCommoditySnapshots();

  const filteredRisks = !risks.success
    ? []
    : risks.data.filter((item) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return `${item.stateName} ${item.region}`.toLowerCase().includes(q);
      });

  if (!risks.success || !locations.success || !commodities.success || !snapshots.success) {
    return (
      <EmptyState
        title="Regional intelligence unavailable"
        description="The demonstration data layer could not load location risk."
      />
    );
  }

  const nameOf = (id: string) =>
    commodities.data.find((item) => item.id === id)?.name ?? id;

  return (
    <div className="space-y-4">
      <RiskMap risks={risks.data} />
      <div>
        <label htmlFor="location-search" className="mb-1 block text-xs font-medium">
          Filter states
        </label>
        <Input
          id="location-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Maharashtra, South, Delhi…"
          className="max-w-md"
        />
      </div>
      {filteredRisks.length === 0 ? (
        <EmptyState
          title="No regions match"
          description="Try a different state or region name."
        />
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {filteredRisks.map((risk) => {
            const markets = locations.data.filter(
              (location) => location.stateName === risk.stateName
            );
            const localSnapshots = snapshots.data.filter(
              (item) => item.stateName === risk.stateName
            );
            return (
              <Card key={risk.stateName} className="rounded-lg">
                <CardHeader className="border-b">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle>{risk.stateName}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {risk.region} · {markets.length} monitored market
                        {markets.length === 1 ? "" : "s"}
                      </p>
                    </div>
                    <RiskBadge level={risk.riskLevel} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <RiskMeter score={risk.overallScore} level={risk.riskLevel} />
                  <p className="text-sm">
                    Open alerts:{" "}
                    <span className="font-medium tabular-nums">{risk.alertCount}</span>
                  </p>
                  <div>
                    <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Affected commodities
                    </p>
                    <p className="text-sm">
                      {risk.affectedCommodityIds.map(nameOf).join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Markets
                    </p>
                    <ul className="space-y-1 text-sm">
                      {markets.map((market) => (
                        <li key={market.id}>
                          {market.name}
                          <span className="text-muted-foreground">
                            {" "}
                            · {market.type.toLowerCase()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {localSnapshots[0] ? (
                    <p className="text-xs text-muted-foreground">
                      Highest local score in this mock set:{" "}
                      {localSnapshots
                        .slice()
                        .sort((a, b) => b.risk.riskScore - a.risk.riskScore)[0]
                        .commodity.name}{" "}
                      (
                      {
                        localSnapshots
                          .slice()
                          .sort((a, b) => b.risk.riskScore - a.risk.riskScore)[0]
                          .risk.riskScore
                      }
                      /100)
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
