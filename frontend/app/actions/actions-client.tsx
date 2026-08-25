"use client";

import { useState } from "react";

import { ActionCard } from "@/components/actions/action-card";
import { RecommendationCard } from "@/components/actions/recommendation-card";
import { EmptyState } from "@/components/page-intro";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import type { AlertStatus } from "@/types/alert";
import type { RiskLevel } from "@/types/risk";

export function ActionsClient() {
  const [search, setSearch] = useState("");
  const [riskLevel, setRiskLevel] = useState<RiskLevel | "ALL">("ALL");
  const [status, setStatus] = useState<AlertStatus | "ALL">("ALL");
  const result = api.getRecommendedActions();

  const rows = !result.success
    ? []
    : result.data.filter((item) => {
        const haystack =
          `${item.commodityName} ${item.locationName} ${item.summary}`.toLowerCase();
        const matchesSearch = haystack.includes(search.trim().toLowerCase());
        const matchesRisk = riskLevel === "ALL" || item.riskLevel === riskLevel;
        const matchesStatus = status === "ALL" || item.status === status;
        return matchesSearch && matchesRisk && matchesStatus;
      });

  if (!result.success) {
    return (
      <EmptyState
        title="Action centre unavailable"
        description="The demonstration data layer could not load recommended actions."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[var(--risk-watch-border)] bg-[var(--risk-watch-bg)] p-3 text-sm">
        These recommendations are decision-support options for authorised
        officers. They are not government orders and are not executed by this
        system.
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        <div>
          <label htmlFor="action-search" className="mb-1 block text-xs font-medium">
            Search
          </label>
          <Input
            id="action-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Onion, Delhi…"
          />
        </div>
        <div>
          <p className="mb-1 text-xs font-medium">Risk</p>
          <Select
            value={riskLevel}
            onValueChange={(value) => {
              if (value) setRiskLevel(value as RiskLevel | "ALL");
            }}
          >
            <SelectTrigger className="w-full" aria-label="Filter actions by risk">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All levels</SelectItem>
              <SelectItem value="CRITICAL">RED · Critical</SelectItem>
              <SelectItem value="MODERATE">ORANGE · Moderate</SelectItem>
              <SelectItem value="WATCH">YELLOW · Watch</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium">Status</p>
          <Select
            value={status}
            onValueChange={(value) => {
              if (value) setStatus(value as AlertStatus | "ALL");
            }}
          >
            <SelectTrigger className="w-full" aria-label="Filter actions by status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All statuses</SelectItem>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="UNDER_REVIEW">Under review</SelectItem>
              <SelectItem value="ACTION_TAKEN">Action taken</SelectItem>
              <SelectItem value="CLOSED">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {rows.length === 0 ? (
        <EmptyState
          title="No recommended actions in this view"
          description="Adjust filters to see decision-support items from the mock register."
        />
      ) : (
        <div className="space-y-4">
          {rows.map((action) => (
            <div key={action.id} className="grid gap-3 xl:grid-cols-2">
              <ActionCard action={action} />
              <RecommendationCard action={action} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
