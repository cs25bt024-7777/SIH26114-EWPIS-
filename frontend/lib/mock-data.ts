import type { Alert, RecommendedAction } from "@/types/alert";
import type { Commodity, CommoditySnapshot } from "@/types/commodity";
import type { DashboardOverview, ForecastSeries, PricePoint } from "@/types/forecast";
import type {
  Location,
  LocationRisk,
  RiskAssessment,
  RiskFactor,
  RiskSummaryCounts,
} from "@/types/risk";
import {
  clampScore,
  riskLevelToColor,
  scoreToRiskLevel,
  warningWindowForLevel,
} from "@/lib/risk";

const DATA_NOTICE =
  "Demonstration data only. Figures are synthetic mock records for UI development and are not official government statistics.";

const REFERENCE_DATE = new Date("2026-08-24T09:30:00+05:30");

export const commodities: Commodity[] = [
  {
    id: "onion",
    name: "Onion",
    category: "VEGETABLE",
    unit: "₹/kg",
    description: "Nationally sensitive vegetable with frequent mandi-driven price spikes.",
  },
  {
    id: "tomato",
    name: "Tomato",
    category: "VEGETABLE",
    unit: "₹/kg",
    description: "Perishable vegetable; arrivals and weather strongly influence prices.",
  },
  {
    id: "potato",
    name: "Potato",
    category: "VEGETABLE",
    unit: "₹/kg",
    description: "Staple vegetable with cold-storage and harvest-cycle effects.",
  },
  {
    id: "rice",
    name: "Rice (Common)",
    category: "CEREAL",
    unit: "₹/quintal",
    description: "Essential cereal monitored for retail and procurement conditions.",
  },
  {
    id: "wheat",
    name: "Wheat",
    category: "CEREAL",
    unit: "₹/quintal",
    description: "Core cereal with buffer-stock and procurement sensitivity.",
  },
  {
    id: "tur",
    name: "Tur (Arhar)",
    category: "PULSE",
    unit: "₹/quintal",
    description: "Pulse with import, sowing, and domestic arrival sensitivity.",
  },
  {
    id: "sugar",
    name: "Sugar",
    category: "SUGAR",
    unit: "₹/kg",
    description: "Processed essential commodity linked to mill release and cane supply.",
  },
  {
    id: "mustard-oil",
    name: "Mustard Oil",
    category: "OIL",
    unit: "₹/litre",
    description: "Edible oil tracked for retail inflation and crushing-season effects.",
  },
];

export const locations: Location[] = [
  {
    id: "loc-delhi",
    name: "Delhi",
    type: "NCT",
    stateName: "Delhi",
    stateCode: "DL",
    parentId: null,
    region: "North",
    latitude: 28.6139,
    longitude: 77.209,
  },
  {
    id: "loc-mh-nashik",
    name: "Nashik",
    type: "DISTRICT",
    stateName: "Maharashtra",
    stateCode: "MH",
    parentId: "st-mh",
    region: "West",
    latitude: 19.9975,
    longitude: 73.7898,
  },
  {
    id: "loc-mh-pune",
    name: "Pune",
    type: "DISTRICT",
    stateName: "Maharashtra",
    stateCode: "MH",
    parentId: "st-mh",
    region: "West",
    latitude: 18.5204,
    longitude: 73.8567,
  },
  {
    id: "loc-ka-bengaluru",
    name: "Bengaluru Urban",
    type: "DISTRICT",
    stateName: "Karnataka",
    stateCode: "KA",
    parentId: "st-ka",
    region: "South",
    latitude: 12.9716,
    longitude: 77.5946,
  },
  {
    id: "loc-ka-belagavi",
    name: "Belagavi",
    type: "DISTRICT",
    stateName: "Karnataka",
    stateCode: "KA",
    parentId: "st-ka",
    region: "South",
    latitude: 15.8497,
    longitude: 74.4977,
  },
  {
    id: "loc-up-lucknow",
    name: "Lucknow",
    type: "DISTRICT",
    stateName: "Uttar Pradesh",
    stateCode: "UP",
    parentId: "st-up",
    region: "North",
    latitude: 26.8467,
    longitude: 80.9462,
  },
  {
    id: "loc-up-agra",
    name: "Agra",
    type: "DISTRICT",
    stateName: "Uttar Pradesh",
    stateCode: "UP",
    parentId: "st-up",
    region: "North",
    latitude: 27.1767,
    longitude: 78.0081,
  },
  {
    id: "loc-tn-chennai",
    name: "Chennai",
    type: "DISTRICT",
    stateName: "Tamil Nadu",
    stateCode: "TN",
    parentId: "st-tn",
    region: "South",
    latitude: 13.0827,
    longitude: 80.2707,
  },
  {
    id: "loc-gj-ahmedabad",
    name: "Ahmedabad",
    type: "DISTRICT",
    stateName: "Gujarat",
    stateCode: "GJ",
    parentId: "st-gj",
    region: "West",
    latitude: 23.0225,
    longitude: 72.5714,
  },
  {
    id: "loc-rj-jaipur",
    name: "Jaipur",
    type: "DISTRICT",
    stateName: "Rajasthan",
    stateCode: "RJ",
    parentId: "st-rj",
    region: "North",
    latitude: 26.9124,
    longitude: 75.7873,
  },
  {
    id: "loc-pb-amritsar",
    name: "Amritsar",
    type: "DISTRICT",
    stateName: "Punjab",
    stateCode: "PB",
    parentId: "st-pb",
    region: "North",
    latitude: 31.634,
    longitude: 74.8723,
  },
  {
    id: "loc-ap-guntur",
    name: "Guntur",
    type: "DISTRICT",
    stateName: "Andhra Pradesh",
    stateCode: "AP",
    parentId: "st-ap",
    region: "South",
    latitude: 16.3067,
    longitude: 80.4365,
  },
  {
    id: "loc-mp-indore",
    name: "Indore",
    type: "DISTRICT",
    stateName: "Madhya Pradesh",
    stateCode: "MP",
    parentId: "st-mp",
    region: "Central",
    latitude: 22.7196,
    longitude: 75.8577,
  },
  {
    id: "loc-hr-hisar",
    name: "Hisar",
    type: "DISTRICT",
    stateName: "Haryana",
    stateCode: "HR",
    parentId: "st-hr",
    region: "North",
    latitude: 29.1492,
    longitude: 75.7217,
  },
  {
    id: "loc-wb-kolkata",
    name: "Kolkata",
    type: "DISTRICT",
    stateName: "West Bengal",
    stateCode: "WB",
    parentId: "st-wb",
    region: "East",
    latitude: 22.5726,
    longitude: 88.3639,
  },
];

function isoDaysAgo(days: number, hour = 10): string {
  const d = new Date(REFERENCE_DATE);
  d.setDate(d.getDate() - days);
  d.setHours(hour, 15, 0, 0);
  return d.toISOString();
}

function isoDaysAhead(days: number): string {
  const d = new Date(REFERENCE_DATE);
  d.setDate(d.getDate() + days);
  d.setHours(9, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function isoDate(daysOffset: number): string {
  const d = new Date(REFERENCE_DATE);
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().slice(0, 10);
}

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildFactors(
  commodityName: string,
  locationName: string,
  level: ReturnType<typeof scoreToRiskLevel>
): RiskFactor[] {
  const base: RiskFactor[] = [
    {
      id: `${commodityName}-price`,
      factor: "Price anomaly",
      impact: level === "CRITICAL" || level === "MODERATE" ? "HIGH" : "MEDIUM",
      description:
        level === "STABLE"
          ? `${commodityName} modal price in ${locationName} is within the expected seasonal band.`
          : `${commodityName} modal price in ${locationName} is outside the expected seasonal range.`,
    },
    {
      id: `${commodityName}-arrivals`,
      factor: "Mandi arrivals",
      impact: level === "CRITICAL" ? "HIGH" : level === "WATCH" ? "MEDIUM" : "MEDIUM",
      description:
        level === "STABLE"
          ? "Arrivals are consistent with recent seasonal averages."
          : "Mandi arrivals have declined relative to the same period last year.",
    },
    {
      id: `${commodityName}-weather`,
      factor: "Weather signal",
      impact: level === "CRITICAL" ? "HIGH" : "LOW",
      description:
        level === "CRITICAL"
          ? "Rainfall/temperature anomalies are consistent with supply stress in origin belts."
          : "No severe weather anomaly is dominating the current assessment.",
    },
    {
      id: `${commodityName}-logistics`,
      factor: "Logistics / supply",
      impact: level === "MODERATE" || level === "CRITICAL" ? "MEDIUM" : "LOW",
      description:
        level === "STABLE"
          ? "No material transport disruption reported in this demonstration set."
          : "Inward movement and storage indicators suggest tighter local availability.",
    },
  ];
  return base;
}

interface AssessmentSeed {
  id: string;
  commodityId: string;
  locationId: string;
  score: number;
  priceChangePercentage: number;
  anomalyScore: number;
  shortageProbability: number;
}

const assessmentSeeds: AssessmentSeed[] = [
  { id: "ra-onion-delhi", commodityId: "onion", locationId: "loc-delhi", score: 88, priceChangePercentage: 22.4, anomalyScore: 3.4, shortageProbability: 0.86 },
  { id: "ra-onion-nashik", commodityId: "onion", locationId: "loc-mh-nashik", score: 81, priceChangePercentage: 18.1, anomalyScore: 3.1, shortageProbability: 0.79 },
  { id: "ra-tomato-bengaluru", commodityId: "tomato", locationId: "loc-ka-bengaluru", score: 76, priceChangePercentage: 16.8, anomalyScore: 2.9, shortageProbability: 0.74 },
  { id: "ra-tomato-delhi", commodityId: "tomato", locationId: "loc-delhi", score: 64, priceChangePercentage: 11.2, anomalyScore: 2.1, shortageProbability: 0.61 },
  { id: "ra-potato-agra", commodityId: "potato", locationId: "loc-up-agra", score: 58, priceChangePercentage: 9.4, anomalyScore: 1.8, shortageProbability: 0.54 },
  { id: "ra-tur-chennai", commodityId: "tur", locationId: "loc-tn-chennai", score: 71, priceChangePercentage: 13.6, anomalyScore: 2.4, shortageProbability: 0.68 },
  { id: "ra-mustard-jaipur", commodityId: "mustard-oil", locationId: "loc-rj-jaipur", score: 47, priceChangePercentage: 6.1, anomalyScore: 1.4, shortageProbability: 0.41 },
  { id: "ra-sugar-pune", commodityId: "sugar", locationId: "loc-mh-pune", score: 39, priceChangePercentage: 4.2, anomalyScore: 1.1, shortageProbability: 0.33 },
  { id: "ra-wheat-hisar", commodityId: "wheat", locationId: "loc-hr-hisar", score: 21, priceChangePercentage: 1.4, anomalyScore: 0.6, shortageProbability: 0.18 },
  { id: "ra-rice-kolkata", commodityId: "rice", locationId: "loc-wb-kolkata", score: 24, priceChangePercentage: 1.8, anomalyScore: 0.7, shortageProbability: 0.2 },
  { id: "ra-wheat-amritsar", commodityId: "wheat", locationId: "loc-pb-amritsar", score: 18, priceChangePercentage: 0.6, anomalyScore: 0.4, shortageProbability: 0.14 },
  { id: "ra-potato-indore", commodityId: "potato", locationId: "loc-mp-indore", score: 44, priceChangePercentage: 5.7, anomalyScore: 1.3, shortageProbability: 0.38 },
  { id: "ra-onion-ahmedabad", commodityId: "onion", locationId: "loc-gj-ahmedabad", score: 69, priceChangePercentage: 12.9, anomalyScore: 2.3, shortageProbability: 0.66 },
  { id: "ra-rice-lucknow", commodityId: "rice", locationId: "loc-up-lucknow", score: 28, priceChangePercentage: 2.4, anomalyScore: 0.9, shortageProbability: 0.24 },
  { id: "ra-tomato-guntur", commodityId: "tomato", locationId: "loc-ap-guntur", score: 52, priceChangePercentage: 8.3, anomalyScore: 1.7, shortageProbability: 0.49 },
  { id: "ra-tur-ahmedabad", commodityId: "tur", locationId: "loc-gj-ahmedabad", score: 35, priceChangePercentage: 3.8, anomalyScore: 1.0, shortageProbability: 0.31 },
];

function locationById(id: string): Location {
  const found = locations.find((item) => item.id === id);
  if (!found) {
    throw new Error(`Unknown location ${id}`);
  }
  return found;
}

function commodityById(id: string): Commodity {
  const found = commodities.find((item) => item.id === id);
  if (!found) {
    throw new Error(`Unknown commodity ${id}`);
  }
  return found;
}

export const riskAssessments: RiskAssessment[] = assessmentSeeds.map((seed) => {
  const score = clampScore(seed.score);
  const riskLevel = scoreToRiskLevel(score);
  const location = locationById(seed.locationId);
  const commodity = commodityById(seed.commodityId);
  return {
    id: seed.id,
    commodityId: seed.commodityId,
    locationId: seed.locationId,
    riskScore: score,
    shortageProbability: seed.shortageProbability,
    riskLevel,
    riskColor: riskLevelToColor(riskLevel),
    priceChangePercentage: seed.priceChangePercentage,
    anomalyScore: seed.anomalyScore,
    warningWindowDays: warningWindowForLevel(riskLevel),
    factors: buildFactors(commodity.name, location.name, riskLevel),
    assessedAt: isoDaysAgo(0, 8),
  };
});

const BASE_PRICES: Record<string, number> = {
  onion: 42,
  tomato: 38,
  potato: 24,
  rice: 3250,
  wheat: 2480,
  tur: 11200,
  sugar: 44,
  "mustard-oil": 148,
};

export const commoditySnapshots: CommoditySnapshot[] = riskAssessments.map((risk) => {
  const commodity = commodityById(risk.commodityId);
  const location = locationById(risk.locationId);
  const currentPrice = Math.round(
    BASE_PRICES[commodity.id] * (1 + risk.priceChangePercentage / 200)
  );
  const previousPrice = Math.round(
    currentPrice / (1 + risk.priceChangePercentage / 100)
  );
  const forecastPrice = Math.round(
    currentPrice * (1 + Math.max(0, risk.priceChangePercentage) / 280)
  );
  return {
    commodity,
    locationId: location.id,
    locationName: location.name,
    stateName: location.stateName,
    currentPrice,
    previousPrice,
    priceChangePercentage: risk.priceChangePercentage,
    forecastPrice,
    forecastHorizonDays: Math.min(30, Math.max(7, risk.warningWindowDays + 7)),
    risk,
  };
});

function buildSeries(
  snapshot: CommoditySnapshot,
  historyDays = 60,
  forecastDays = 14
): ForecastSeries {
  const rand = mulberry32(hashSeed(`${snapshot.commodity.id}-${snapshot.locationId}`));
  const historical: PricePoint[] = [];
  const start = snapshot.previousPrice * 0.92;
  for (let i = historyDays - 1; i >= 0; i -= 1) {
    const t = (historyDays - i) / historyDays;
    const trend = start + (snapshot.currentPrice - start) * t;
    const noise = (rand() - 0.48) * snapshot.currentPrice * 0.035;
    const price = Math.max(1, Math.round(trend + noise));
    const arrivalsBase =
      snapshot.commodity.category === "CEREAL" ? 420 : snapshot.commodity.category === "PULSE" ? 90 : 180;
    historical.push({
      date: isoDate(-i),
      price,
      kind: "HISTORICAL",
      mandiArrivalsTonnes: Math.round(arrivalsBase * (1.15 - t * 0.35) + (rand() - 0.5) * 18),
    });
  }
  const forecast: PricePoint[] = [];
  for (let i = 1; i <= forecastDays; i += 1) {
    const t = i / forecastDays;
    const end = snapshot.forecastPrice;
    const price = Math.round(snapshot.currentPrice + (end - snapshot.currentPrice) * t);
    const band = Math.max(2, Math.round(price * 0.08));
    forecast.push({
      date: isoDaysAhead(i),
      price,
      kind: "FORECAST",
      lowerBound: price - band,
      upperBound: price + band,
    });
  }
  return {
    id: `fc-${snapshot.commodity.id}-${snapshot.locationId}`,
    commodityId: snapshot.commodity.id,
    locationId: snapshot.locationId,
    model: "ENSEMBLE",
    horizonDays: forecastDays,
    generatedAt: isoDaysAgo(0, 7),
    historical,
    forecast,
  };
}

export const forecastSeries: ForecastSeries[] = commoditySnapshots.map((snapshot) =>
  buildSeries(snapshot)
);

export const alerts: Alert[] = [
  {
    id: "al-001",
    commodityId: "onion",
    commodityName: "Onion",
    locationId: "loc-delhi",
    locationName: "Delhi",
    stateName: "Delhi",
    riskLevel: "CRITICAL",
    riskColor: "RED",
    riskScore: 88,
    shortageProbability: 0.86,
    title: "Sharp onion price rise with tight retail availability",
    reason:
      "Modal prices have moved well above the seasonal band while inbound arrivals from western origin markets remain weak.",
    warningWindowDays: 5,
    status: "NEW",
    issuedAt: isoDaysAgo(0, 7),
  },
  {
    id: "al-002",
    commodityId: "onion",
    commodityName: "Onion",
    locationId: "loc-mh-nashik",
    locationName: "Nashik",
    stateName: "Maharashtra",
    riskLevel: "CRITICAL",
    riskColor: "RED",
    riskScore: 81,
    shortageProbability: 0.79,
    title: "Origin-belt onion arrivals below expected levels",
    reason:
      "Nashik mandi arrivals are lower than the comparable week last year, coinciding with elevated farm-gate prices.",
    warningWindowDays: 5,
    status: "UNDER_REVIEW",
    issuedAt: isoDaysAgo(1, 11),
  },
  {
    id: "al-003",
    commodityId: "tomato",
    commodityName: "Tomato",
    locationId: "loc-ka-bengaluru",
    locationName: "Bengaluru Urban",
    stateName: "Karnataka",
    riskLevel: "CRITICAL",
    riskColor: "RED",
    riskScore: 76,
    shortageProbability: 0.74,
    title: "Tomato prices elevated in Bengaluru markets",
    reason:
      "Perishable supply is tight and weather-linked disruption in producing districts is lifting retail prices.",
    warningWindowDays: 5,
    status: "NEW",
    issuedAt: isoDaysAgo(0, 12),
  },
  {
    id: "al-004",
    commodityId: "tur",
    commodityName: "Tur (Arhar)",
    locationId: "loc-tn-chennai",
    locationName: "Chennai",
    stateName: "Tamil Nadu",
    riskLevel: "MODERATE",
    riskColor: "ORANGE",
    riskScore: 71,
    shortageProbability: 0.68,
    title: "Tur prices firming in Chennai",
    reason:
      "Retail pulse prices are rising faster than the seasonal baseline; domestic arrivals remain uneven.",
    warningWindowDays: 10,
    status: "UNDER_REVIEW",
    issuedAt: isoDaysAgo(2, 9),
  },
  {
    id: "al-005",
    commodityId: "onion",
    commodityName: "Onion",
    locationId: "loc-gj-ahmedabad",
    locationName: "Ahmedabad",
    stateName: "Gujarat",
    riskLevel: "MODERATE",
    riskColor: "ORANGE",
    riskScore: 69,
    shortageProbability: 0.66,
    title: "Onion price pressure in Ahmedabad",
    reason:
      "Western-region movement is constrained and wholesale quotes have increased over successive sessions.",
    warningWindowDays: 10,
    status: "NEW",
    issuedAt: isoDaysAgo(1, 16),
  },
  {
    id: "al-006",
    commodityId: "tomato",
    commodityName: "Tomato",
    locationId: "loc-delhi",
    locationName: "Delhi",
    stateName: "Delhi",
    riskLevel: "MODERATE",
    riskColor: "ORANGE",
    riskScore: 64,
    shortageProbability: 0.61,
    title: "Tomato watch upgraded to moderate in Delhi",
    reason:
      "Retail tomato prices have accelerated; overnight arrivals at Azadpur-equivalent flows are below recent averages in this mock set.",
    warningWindowDays: 10,
    status: "ACTION_TAKEN",
    issuedAt: isoDaysAgo(3, 8),
  },
  {
    id: "al-007",
    commodityId: "potato",
    commodityName: "Potato",
    locationId: "loc-up-agra",
    locationName: "Agra",
    stateName: "Uttar Pradesh",
    riskLevel: "MODERATE",
    riskColor: "ORANGE",
    riskScore: 58,
    shortageProbability: 0.54,
    title: "Potato prices rising in Agra belt",
    reason:
      "Cold-store release appears slower than usual for the season, lifting wholesale quotes.",
    warningWindowDays: 10,
    status: "NEW",
    issuedAt: isoDaysAgo(2, 14),
  },
  {
    id: "al-008",
    commodityId: "tomato",
    commodityName: "Tomato",
    locationId: "loc-ap-guntur",
    locationName: "Guntur",
    stateName: "Andhra Pradesh",
    riskLevel: "MODERATE",
    riskColor: "ORANGE",
    riskScore: 52,
    shortageProbability: 0.49,
    title: "Tomato supply tightness in Guntur",
    reason: "Arrivals have softened while demand from neighbouring urban markets remains firm.",
    warningWindowDays: 10,
    status: "CLOSED",
    issuedAt: isoDaysAgo(8, 10),
  },
  {
    id: "al-009",
    commodityId: "mustard-oil",
    commodityName: "Mustard Oil",
    locationId: "loc-rj-jaipur",
    locationName: "Jaipur",
    stateName: "Rajasthan",
    riskLevel: "WATCH",
    riskColor: "YELLOW",
    riskScore: 47,
    shortageProbability: 0.41,
    title: "Mustard oil early warning in Jaipur",
    reason:
      "Crushing-season quotes are firmer than the 5-year weekly median. Situation requires monitoring, not immediate intervention.",
    warningWindowDays: 21,
    status: "NEW",
    issuedAt: isoDaysAgo(1, 18),
  },
  {
    id: "al-010",
    commodityId: "potato",
    commodityName: "Potato",
    locationId: "loc-mp-indore",
    locationName: "Indore",
    stateName: "Madhya Pradesh",
    riskLevel: "WATCH",
    riskColor: "YELLOW",
    riskScore: 44,
    shortageProbability: 0.38,
    title: "Potato early warning in Indore",
    reason: "Mild upward drift versus seasonal expectation with no confirmed shortage signal.",
    warningWindowDays: 21,
    status: "UNDER_REVIEW",
    issuedAt: isoDaysAgo(4, 9),
  },
  {
    id: "al-011",
    commodityId: "sugar",
    commodityName: "Sugar",
    locationId: "loc-mh-pune",
    locationName: "Pune",
    stateName: "Maharashtra",
    riskLevel: "WATCH",
    riskColor: "YELLOW",
    riskScore: 39,
    shortageProbability: 0.33,
    title: "Sugar prices slightly above seasonal baseline",
    reason: "Mill-release timing in this demonstration set is tighter than the prior fortnight.",
    warningWindowDays: 21,
    status: "NEW",
    issuedAt: isoDaysAgo(5, 11),
  },
  {
    id: "al-012",
    commodityId: "rice",
    commodityName: "Rice (Common)",
    locationId: "loc-up-lucknow",
    locationName: "Lucknow",
    stateName: "Uttar Pradesh",
    riskLevel: "WATCH",
    riskColor: "YELLOW",
    riskScore: 28,
    shortageProbability: 0.24,
    title: "Rice watch in Lucknow",
    reason: "Minor firming in common-grade rice; still close to the stable band.",
    warningWindowDays: 21,
    status: "CLOSED",
    issuedAt: isoDaysAgo(12, 9),
  },
];

const DISCLAIMER =
  "Decision support only. These are demonstration recommendations and do not constitute government orders or automatic interventions.";

export const recommendedActions: RecommendedAction[] = [
  {
    id: "rec-001",
    alertId: "al-001",
    commodityId: "onion",
    commodityName: "Onion",
    locationId: "loc-delhi",
    locationName: "Delhi",
    riskLevel: "CRITICAL",
    riskColor: "RED",
    priority: "URGENT",
    status: "NEW",
    summary: "Review buffer, arrivals and retail availability for onion in Delhi.",
    actions: [
      "Intensify daily monitoring of wholesale and retail onion prices in Delhi markets.",
      "Review buffer-stock availability and the feasibility of calibrated release.",
      "Track inbound trucks and mandi arrivals from western origin belts.",
      "Assess whether a time-bound intervention review is required by authorised officers.",
    ],
    rationale:
      "Critical risk score with a short warning window. The mock assessment indicates both a price anomaly and weak arrivals.",
    disclaimer: DISCLAIMER,
  },
  {
    id: "rec-002",
    alertId: "al-002",
    commodityId: "onion",
    commodityName: "Onion",
    locationId: "loc-mh-nashik",
    locationName: "Nashik",
    riskLevel: "CRITICAL",
    riskColor: "RED",
    priority: "URGENT",
    status: "UNDER_REVIEW",
    summary: "Origin-market onion supply requires close monitoring in Nashik.",
    actions: [
      "Monitor Nashik mandi arrivals against last-year comparable week.",
      "Review storage and dispatch from major origin markets.",
      "Coordinate information with destination markets showing elevated retail prices.",
      "Prepare an options brief for authorised officials; do not treat this as an order.",
    ],
    rationale: "Origin-belt tightness can propagate quickly to metro retail prices.",
    disclaimer: DISCLAIMER,
  },
  {
    id: "rec-003",
    alertId: "al-003",
    commodityId: "tomato",
    commodityName: "Tomato",
    locationId: "loc-ka-bengaluru",
    locationName: "Bengaluru Urban",
    riskLevel: "CRITICAL",
    riskColor: "RED",
    priority: "HIGH",
    status: "NEW",
    summary: "Tomato retail stress in Bengaluru should be reviewed with producing districts.",
    actions: [
      "Monitor daily tomato arrivals and wastage in Bengaluru markets.",
      "Review weather and harvest reports from supplying districts.",
      "Assess short-haul logistics constraints.",
      "Keep a decision brief ready if the price path continues above the forecast band.",
    ],
    rationale: "Perishable commodities can deteriorate from watch to critical within a short window.",
    disclaimer: DISCLAIMER,
  },
  {
    id: "rec-004",
    alertId: "al-004",
    commodityId: "tur",
    commodityName: "Tur (Arhar)",
    locationId: "loc-tn-chennai",
    locationName: "Chennai",
    riskLevel: "MODERATE",
    riskColor: "ORANGE",
    priority: "HIGH",
    status: "UNDER_REVIEW",
    summary: "Prepare pulse-market monitoring for tur in Chennai.",
    actions: [
      "Track tur wholesale and retail spreads.",
      "Review domestic arrival and import-availability indicators in this demonstration set.",
      "Monitor stock-limit compliance information if later authorised.",
      "Schedule a 7–14 day review unless prices revert to the seasonal band.",
    ],
    rationale: "Moderate risk with a 7–14 day preparation window in the product specification.",
    disclaimer: DISCLAIMER,
  },
  {
    id: "rec-005",
    alertId: "al-005",
    commodityId: "onion",
    commodityName: "Onion",
    locationId: "loc-gj-ahmedabad",
    locationName: "Ahmedabad",
    riskLevel: "MODERATE",
    riskColor: "ORANGE",
    priority: "MEDIUM",
    status: "NEW",
    summary: "Maintain heightened onion monitoring in Ahmedabad.",
    actions: [
      "Compare Ahmedabad quotes with Delhi and Nashik to detect contagion.",
      "Monitor mandi arrivals and retail complaints.",
      "Keep buffer-review notes updated for authorised officers.",
    ],
    rationale: "Western-region onion tightness is visible in more than one market in the mock set.",
    disclaimer: DISCLAIMER,
  },
  {
    id: "rec-006",
    alertId: "al-006",
    commodityId: "tomato",
    commodityName: "Tomato",
    locationId: "loc-delhi",
    locationName: "Delhi",
    riskLevel: "MODERATE",
    riskColor: "ORANGE",
    priority: "MEDIUM",
    status: "ACTION_TAKEN",
    summary: "Continue follow-up after initial tomato monitoring in Delhi.",
    actions: [
      "Verify whether arrivals have recovered after the recorded action.",
      "Close the item only if prices revert and stay inside the watch band.",
      "Retain the case in the action register for audit of decision support.",
    ],
    rationale: "Status is Action Taken in this demonstration workflow.",
    disclaimer: DISCLAIMER,
  },
  {
    id: "rec-007",
    alertId: "al-007",
    commodityId: "potato",
    commodityName: "Potato",
    locationId: "loc-up-agra",
    locationName: "Agra",
    riskLevel: "MODERATE",
    riskColor: "ORANGE",
    priority: "MEDIUM",
    status: "NEW",
    summary: "Review potato cold-store release information for the Agra belt.",
    actions: [
      "Monitor cold-store dispatch versus seasonal norms.",
      "Track wholesale quotes in Agra and destination markets.",
      "Assess whether closer monitoring of stock position is warranted.",
    ],
    rationale: "Potato risk in this mock set is linked more to storage release than to weather.",
    disclaimer: DISCLAIMER,
  },
  {
    id: "rec-008",
    alertId: "al-009",
    commodityId: "mustard-oil",
    commodityName: "Mustard Oil",
    locationId: "loc-rj-jaipur",
    locationName: "Jaipur",
    riskLevel: "WATCH",
    riskColor: "YELLOW",
    priority: "LOW",
    status: "NEW",
    summary: "Keep mustard oil on an early-warning watchlist in Jaipur.",
    actions: [
      "Continue weekly price and crushing-margin observation.",
      "No intervention briefing is required unless the score crosses the moderate threshold.",
      "Reassess in 15–30 days per the early-warning window.",
    ],
    rationale: "Watch / yellow is an emerging risk, not an imminent shortage in the specification.",
    disclaimer: DISCLAIMER,
  },
];

export function getLocationRisks(): LocationRisk[] {
  const grouped = new Map<string, RiskAssessment[]>();
  for (const assessment of riskAssessments) {
    const location = locationById(assessment.locationId);
    const key = location.stateName;
    const list = grouped.get(key) ?? [];
    list.push(assessment);
    grouped.set(key, list);
  }

  const rows: LocationRisk[] = [];
  for (const [stateName, list] of grouped) {
    const max = list.reduce((best, item) =>
      item.riskScore > best.riskScore ? item : best
    );
    const location = locationById(max.locationId);
    const commodityIds = [...new Set(list.map((item) => item.commodityId))];
    const alertCount = alerts.filter(
      (alert) => alert.stateName === stateName && alert.status !== "CLOSED"
    ).length;
    rows.push({
      locationId: location.id,
      locationName: stateName,
      stateName,
      region: location.region,
      overallScore: max.riskScore,
      riskLevel: max.riskLevel,
      riskColor: max.riskColor,
      affectedCommodityIds: commodityIds,
      alertCount,
    });
  }
  return rows.sort((a, b) => b.overallScore - a.overallScore);
}

export function getRiskSummary(): RiskSummaryCounts {
  const total = riskAssessments.length;
  const stable = riskAssessments.filter((item) => item.riskLevel === "STABLE").length;
  const watch = riskAssessments.filter((item) => item.riskLevel === "WATCH").length;
  const moderate = riskAssessments.filter((item) => item.riskLevel === "MODERATE").length;
  const critical = riskAssessments.filter((item) => item.riskLevel === "CRITICAL").length;
  const pct = (n: number) => (total === 0 ? 0 : Math.round((n / total) * 100));
  return {
    totalCommodities: commodities.length,
    stable,
    watch,
    moderate,
    critical,
    stablePercent: pct(stable),
    watchPercent: pct(watch),
    moderatePercent: pct(moderate),
    criticalPercent: pct(critical),
  };
}

export function getDashboardOverview(): DashboardOverview {
  return {
    generatedAt: REFERENCE_DATE.toISOString(),
    dataNotice: DATA_NOTICE,
    totalCommodities: commodities.length,
    monitoredLocations: locations.length,
    criticalAlerts: alerts.filter((item) => item.riskLevel === "CRITICAL" && item.status !== "CLOSED").length,
    moderateAlerts: alerts.filter((item) => item.riskLevel === "MODERATE" && item.status !== "CLOSED").length,
    earlyWarnings: alerts.filter((item) => item.riskLevel === "WATCH" && item.status !== "CLOSED").length,
    stableAssessments: riskAssessments.filter((item) => item.riskLevel === "STABLE").length,
    openActions: recommendedActions.filter((item) => item.status !== "CLOSED").length,
  };
}

export const mockMeta = {
  source: "mock" as const,
  notice: DATA_NOTICE,
  generatedAt: REFERENCE_DATE.toISOString(),
};
