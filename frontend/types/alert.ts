import type { RiskColor, RiskLevel } from "@/types/risk";

export type AlertStatus = "NEW" | "UNDER_REVIEW" | "ACTION_TAKEN" | "CLOSED";

export interface Alert {
  id: string;
  commodityId: string;
  commodityName: string;
  locationId: string;
  locationName: string;
  stateName: string;
  riskLevel: RiskLevel;
  riskColor: RiskColor;
  riskScore: number;
  shortageProbability: number;
  title: string;
  reason: string;
  warningWindowDays: number;
  status: AlertStatus;
  issuedAt: string;
}

export interface RecommendedAction {
  id: string;
  alertId: string;
  commodityId: string;
  commodityName: string;
  locationId: string;
  locationName: string;
  riskLevel: RiskLevel;
  riskColor: RiskColor;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: AlertStatus;
  summary: string;
  actions: string[];
  rationale: string;
  disclaimer: string;
}
