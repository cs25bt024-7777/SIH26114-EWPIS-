export type RiskColor = "GREEN" | "YELLOW" | "ORANGE" | "RED";

export type RiskLevel = "STABLE" | "WATCH" | "MODERATE" | "CRITICAL";

export type LocationType = "STATE" | "DISTRICT" | "CITY" | "NCT";

export interface Location {
  id: string;
  name: string;
  type: LocationType;
  stateName: string;
  stateCode: string;
  parentId: string | null;
  region: string;
  latitude: number;
  longitude: number;
}

export interface RiskFactor {
  id: string;
  factor: string;
  impact: "LOW" | "MEDIUM" | "HIGH";
  description: string;
}

export interface RiskAssessment {
  id: string;
  commodityId: string;
  locationId: string;
  riskScore: number;
  shortageProbability: number;
  riskLevel: RiskLevel;
  riskColor: RiskColor;
  priceChangePercentage: number;
  anomalyScore: number;
  warningWindowDays: number;
  factors: RiskFactor[];
  assessedAt: string;
}

export interface LocationRisk {
  locationId: string;
  locationName: string;
  stateName: string;
  region: string;
  overallScore: number;
  riskLevel: RiskLevel;
  riskColor: RiskColor;
  affectedCommodityIds: string[];
  alertCount: number;
}

export interface RiskSummaryCounts {
  totalCommodities: number;
  stable: number;
  watch: number;
  moderate: number;
  critical: number;
  stablePercent: number;
  watchPercent: number;
  moderatePercent: number;
  criticalPercent: number;
}
