"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { CommodityCard } from "@/components/commodities/commodity-card";
import { CommodityTable } from "@/components/commodities/commodity-table";
import { RiskFactors } from "@/components/commodities/risk-factors";
import { EmptyState } from "@/components/page-intro";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import type { RiskLevel } from "@/types/risk";

export function CommoditiesClient() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [riskLevel, setRiskLevel] = useState<RiskLevel | "ALL">("ALL");
  const [commodityId, setCommodityId] = useState("ALL");
  const [locationId, setLocationId] = useState("ALL");

  const commodities = api.getCommodities();
  const locations = api.getLocations();
  const snapshots = api.getCommoditySnapshots({
    search,
    riskLevel,
    commodityId,
    locationId,
  });

  if (!commodities.success || !locations.success || !snapshots.success) {
    return (
      <EmptyState
        title="Commodity intelligence unavailable"
        description="The demonstration data layer could not load commodity snapshots."
      />
    );
  }

  const highlighted = snapshots.data[0];

  return (
    <div className="space-y-4">
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label htmlFor="commodity-search" className="mb-1 block text-xs font-medium">
            Search
          </label>
          <Input
            id="commodity-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Onion, Delhi, Nashik…"
          />
        </div>
        <div>
          <p className="mb-1 text-xs font-medium">Risk level</p>
          <Select
            value={riskLevel}
            onValueChange={(value) => {
              if (value) setRiskLevel(value as RiskLevel | "ALL");
            }}
          >
            <SelectTrigger className="w-full" aria-label="Filter by risk level">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All levels</SelectItem>
              <SelectItem value="CRITICAL">RED · Critical</SelectItem>
              <SelectItem value="MODERATE">ORANGE · Moderate</SelectItem>
              <SelectItem value="WATCH">YELLOW · Watch</SelectItem>
              <SelectItem value="STABLE">GREEN · Stable</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium">Commodity</p>
          <Select
            value={commodityId}
            onValueChange={(value) => {
              if (value) setCommodityId(value);
            }}
          >
            <SelectTrigger className="w-full" aria-label="Filter by commodity">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All commodities</SelectItem>
              {commodities.data.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium">Market</p>
          <Select
            value={locationId}
            onValueChange={(value) => {
              if (value) setLocationId(value);
            }}
          >
            <SelectTrigger className="w-full" aria-label="Filter by market">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All markets</SelectItem>
              {locations.data.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}, {item.stateName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {snapshots.data.length} assessment
        {snapshots.data.length === 1 ? "" : "s"} from the mock register.
      </p>

      <Tabs defaultValue="table">
        <TabsList>
          <TabsTrigger value="table">Register</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
        </TabsList>
        <TabsContent value="table" className="rounded-lg border border-border bg-card">
          <CommodityTable rows={snapshots.data} />
        </TabsContent>
        <TabsContent value="cards">
          {snapshots.data.length === 0 ? (
            <EmptyState
              title="No matching assessments"
              description="Try clearing filters to return to the full commodity register."
            />
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {snapshots.data.map((snapshot) => (
                <CommodityCard
                  key={`${snapshot.commodity.id}-${snapshot.locationId}`}
                  snapshot={snapshot}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {highlighted ? <RiskFactors factors={highlighted.risk.factors} /> : null}
    </div>
  );
}
