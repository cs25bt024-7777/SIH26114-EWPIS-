"use client";

import { useState } from "react";

import { RiskBadge, RiskMeter } from "@/components/risk-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { LocationRisk } from "@/types/risk";

const BOARD: Array<{
  id: string;
  label: string;
  x: string;
  y: string;
}> = [
  { id: "Punjab", label: "PB", x: "32%", y: "8%" },
  { id: "Haryana", label: "HR", x: "36%", y: "16%" },
  { id: "Delhi", label: "DL", x: "40%", y: "22%" },
  { id: "Rajasthan", label: "RJ", x: "22%", y: "28%" },
  { id: "Uttar Pradesh", label: "UP", x: "48%", y: "28%" },
  { id: "Gujarat", label: "GJ", x: "16%", y: "46%" },
  { id: "Madhya Pradesh", label: "MP", x: "38%", y: "44%" },
  { id: "Maharashtra", label: "MH", x: "30%", y: "60%" },
  { id: "West Bengal", label: "WB", x: "68%", y: "42%" },
  { id: "Karnataka", label: "KA", x: "32%", y: "76%" },
  { id: "Andhra Pradesh", label: "AP", x: "48%", y: "72%" },
  { id: "Tamil Nadu", label: "TN", x: "42%", y: "88%" },
];

function fillFor(level: LocationRisk["riskLevel"]): string {
  switch (level) {
    case "STABLE":
      return "var(--risk-stable-bg)";
    case "WATCH":
      return "var(--risk-watch-bg)";
    case "MODERATE":
      return "var(--risk-moderate-bg)";
    case "CRITICAL":
      return "var(--risk-critical-bg)";
  }
}

export function RiskMap({ risks }: { risks: LocationRisk[] }) {
  const [selectedId, setSelectedId] = useState(risks[0]?.stateName ?? "");
  const selected = risks.find((item) => item.stateName === selectedId) ?? risks[0];
  const commodities = api.getCommodities();
  const commodityName = (id: string) =>
    commodities.success
      ? commodities.data.find((item) => item.id === id)?.name ?? id
      : id;

  const byState = new Map(risks.map((item) => [item.stateName, item]));

  return (
    <Card className="rounded-lg">
      <CardHeader className="border-b">
        <CardTitle>India regional risk board</CardTitle>
        <CardDescription>
          Schematic view for this prototype — not an official boundary map.
          Positions are indicative and structured so geographic layers can be
          connected later.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-[320px] overflow-hidden rounded-md border border-border bg-[var(--map-canvas)]">
          <svg viewBox="0 0 200 260" className="absolute inset-0 h-full w-full opacity-25" aria-hidden="true">
            <path
              d="M70 18 L92 12 L118 28 L140 40 L158 78 L168 110 L150 150 L162 190 L140 230 L110 248 L88 236 L70 210 L48 180 L38 140 L30 100 L42 60 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          {BOARD.map((cell) => {
            const risk = byState.get(cell.id);
            const active = selected?.stateName === cell.id;
            return (
              <button
                key={cell.id}
                type="button"
                onClick={() => setSelectedId(cell.id)}
                className={cn(
                  "absolute flex size-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-md border text-[10px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active ? "ring-2 ring-foreground" : "border-border"
                )}
                style={{
                  left: cell.x,
                  top: cell.y,
                  background: risk ? fillFor(risk.riskLevel) : "var(--muted)",
                }}
                aria-pressed={active}
                aria-label={`${cell.id}${risk ? `, ${risk.riskLevel}` : ", no assessment"}`}
              >
                {cell.label}
              </button>
            );
          })}
        </div>
        <div>
          {selected ? (
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">{selected.region} region</p>
                <h3 className="font-heading text-lg font-semibold">{selected.stateName}</h3>
              </div>
              <RiskBadge level={selected.riskLevel} />
              <RiskMeter score={selected.overallScore} level={selected.riskLevel} />
              <p className="text-sm">
                Open alerts in this state:{" "}
                <span className="font-medium tabular-nums">{selected.alertCount}</span>
              </p>
              <div>
                <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Affected commodities
                </p>
                <ul className="space-y-1 text-sm">
                  {selected.affectedCommodityIds.map((id) => (
                    <li key={id}>{commodityName(id)}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No regional assessments available.</p>
          )}
          <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <li>GREEN · Stable</li>
            <li>YELLOW · Watch</li>
            <li>ORANGE · Moderate</li>
            <li>RED · Critical</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
