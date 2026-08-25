import type { RiskAssessment } from "@/types/risk";

export interface Commodity {
  id: string;
  name: string;
  category: "VEGETABLE" | "CEREAL" | "PULSE" | "OIL" | "SUGAR";
  unit: string;
  description: string;
}

export interface CommodityPrice {
  id: string;
  commodityId: string;
  locationId: string;
  date: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  mandiArrivalsTonnes: number;
}

export interface CommoditySnapshot {
  commodity: Commodity;
  locationId: string;
  locationName: string;
  stateName: string;
  currentPrice: number;
  previousPrice: number;
  priceChangePercentage: number;
  forecastPrice: number;
  forecastHorizonDays: number;
  risk: RiskAssessment;
}
