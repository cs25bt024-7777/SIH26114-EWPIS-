"use client";

import { useState } from "react";

import { AlertCard } from "@/components/alerts/alert-card";
import { AlertFilters, type AlertFilterValue } from "@/components/alerts/alert-filters";
import { EmptyState } from "@/components/page-intro";
import { api } from "@/lib/api";

export function AlertsClient() {
  const commodities = api.getCommodities();
  const locations = api.getLocations();
  const [filters, setFilters] = useState<AlertFilterValue>({
    search: "",
    riskLevel: "ALL",
    commodityId: "ALL",
    locationId: "ALL",
    status: "ALL",
  });

  const alerts = api.getAlerts({
    search: filters.search,
    riskLevel: filters.riskLevel,
    commodityId: filters.commodityId,
    locationId: filters.locationId,
    status: filters.status,
  });

  if (!commodities.success || !locations.success || !alerts.success) {
    return (
      <EmptyState
        title="Alert register unavailable"
        description="The demonstration data layer could not load alerts."
      />
    );
  }

  return (
    <div className="space-y-4">
      <AlertFilters
        value={filters}
        onChange={setFilters}
        commodities={commodities.data}
        locations={locations.data}
      />
      <p className="text-xs text-muted-foreground">
        {alerts.data.length} alert{alerts.data.length === 1 ? "" : "s"} in the current view.
      </p>
      {alerts.data.length === 0 ? (
        <EmptyState
          title="No alerts match these filters"
          description="Clear risk, commodity, location or status filters to return to the full register."
        />
      ) : (
        <div className="space-y-3">
          {alerts.data.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  );
}
