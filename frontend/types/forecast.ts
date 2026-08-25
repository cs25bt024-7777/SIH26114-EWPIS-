export type SeriesKind = "HISTORICAL" | "FORECAST";

export interface PricePoint {
  date: string;
  price: number;
  kind: SeriesKind;
  lowerBound?: number;
  upperBound?: number;
  mandiArrivalsTonnes?: number;
}

export interface ForecastSeries {
  id: string;
  commodityId: string;
  locationId: string;
  model: "Prophet" | "LightGBM" | "ENSEMBLE";
  horizonDays: number;
  generatedAt: string;
  historical: PricePoint[];
  forecast: PricePoint[];
}

export interface DashboardOverview {
  generatedAt: string;
  dataNotice: string;
  totalCommodities: number;
  monitoredLocations: number;
  criticalAlerts: number;
  moderateAlerts: number;
  earlyWarnings: number;
  stableAssessments: number;
  openActions: number;
}
