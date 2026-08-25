import type { Alert, AlertStatus, RecommendedAction } from "@/types/alert";
import type { Commodity, CommoditySnapshot } from "@/types/commodity";
import type { DashboardOverview, ForecastSeries } from "@/types/forecast";
import type {
  Location,
  LocationRisk,
  RiskAssessment,
  RiskLevel,
  RiskSummaryCounts,
} from "@/types/risk";
import {
  alerts as mockAlerts,
  commodities as mockCommodities,
  commoditySnapshots as mockSnapshots,
  forecastSeries as mockForecasts,
  getDashboardOverview as buildDashboardOverview,
  getLocationRisks,
  getRiskSummary,
  locations as mockLocations,
  mockMeta,
  recommendedActions as mockActions,
  riskAssessments as mockAssessments,
} from "@/lib/mock-data";

export interface ApiSuccess<T> {
  success: true;
  data: T;
  source: "mock";
  notice: string;
}

export interface ApiFailure {
  success: false;
  error: {
    code: string;
    message: string;
  };
  source: "mock";
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export interface AlertQuery {
  status?: AlertStatus | "ALL";
  riskLevel?: RiskLevel | "ALL";
  commodityId?: string | "ALL";
  locationId?: string | "ALL";
  search?: string;
}

function ok<T>(data: T): ApiSuccess<T> {
  return {
    success: true,
    data,
    source: mockMeta.source,
    notice: mockMeta.notice,
  };
}

function fail(code: string, message: string): ApiFailure {
  return {
    success: false,
    error: { code, message },
    source: mockMeta.source,
  };
}

/**
 * Frontend data access boundary.
 * This phase reads local mock data only.
 * Later, replace function bodies with `fetch` to FastAPI (`/api/...`)
 * without rewriting page/component data usage.
 */
export const api = {
  getDashboardOverview(): ApiResult<DashboardOverview> {
    return ok(buildDashboardOverview());
  },

  getRiskSummary(): ApiResult<RiskSummaryCounts> {
    return ok(getRiskSummary());
  },

  getCommodities(): ApiResult<Commodity[]> {
    return ok(mockCommodities);
  },

  getCommoditySnapshots(filters?: {
    search?: string;
    riskLevel?: RiskLevel | "ALL";
    commodityId?: string | "ALL";
    locationId?: string | "ALL";
  }): ApiResult<CommoditySnapshot[]> {
    let rows = mockSnapshots;
    if (filters?.commodityId && filters.commodityId !== "ALL") {
      rows = rows.filter((row) => row.commodity.id === filters.commodityId);
    }
    if (filters?.locationId && filters.locationId !== "ALL") {
      rows = rows.filter((row) => row.locationId === filters.locationId);
    }
    if (filters?.riskLevel && filters.riskLevel !== "ALL") {
      rows = rows.filter((row) => row.risk.riskLevel === filters.riskLevel);
    }
    if (filters?.search?.trim()) {
      const q = filters.search.trim().toLowerCase();
      rows = rows.filter((row) =>
        `${row.commodity.name} ${row.locationName} ${row.stateName}`
          .toLowerCase()
          .includes(q)
      );
    }
    return ok(rows);
  },

  getLocations(): ApiResult<Location[]> {
    return ok(mockLocations);
  },

  getLocationRisks(): ApiResult<LocationRisk[]> {
    return ok(getLocationRisks());
  },

  getRiskAssessments(): ApiResult<RiskAssessment[]> {
    return ok(mockAssessments);
  },

  getRiskAssessment(commodityId: string, locationId: string): ApiResult<RiskAssessment> {
    const found = mockAssessments.find(
      (item) => item.commodityId === commodityId && item.locationId === locationId
    );
    if (!found) {
      return fail("NOT_FOUND", "No risk assessment is available for this commodity and location.");
    }
    return ok(found);
  },

  getAlerts(query: AlertQuery = {}): ApiResult<Alert[]> {
    let rows = mockAlerts;
    if (query.status && query.status !== "ALL") {
      rows = rows.filter((row) => row.status === query.status);
    }
    if (query.riskLevel && query.riskLevel !== "ALL") {
      rows = rows.filter((row) => row.riskLevel === query.riskLevel);
    }
    if (query.commodityId && query.commodityId !== "ALL") {
      rows = rows.filter((row) => row.commodityId === query.commodityId);
    }
    if (query.locationId && query.locationId !== "ALL") {
      rows = rows.filter((row) => row.locationId === query.locationId);
    }
    if (query.search?.trim()) {
      const q = query.search.trim().toLowerCase();
      rows = rows.filter((row) =>
        `${row.title} ${row.reason} ${row.commodityName} ${row.locationName}`
          .toLowerCase()
          .includes(q)
      );
    }
    return ok(rows);
  },

  getAlert(id: string): ApiResult<Alert> {
    const found = mockAlerts.find((item) => item.id === id);
    if (!found) {
      return fail("NOT_FOUND", "Alert not found.");
    }
    return ok(found);
  },

  getForecast(commodityId: string, locationId: string): ApiResult<ForecastSeries> {
    const found = mockForecasts.find(
      (item) => item.commodityId === commodityId && item.locationId === locationId
    );
    if (!found) {
      return fail("NOT_FOUND", "No forecast series is available for this selection.");
    }
    return ok(found);
  },

  getDefaultForecast(): ApiResult<ForecastSeries> {
    const preferred = mockForecasts.find(
      (item) => item.commodityId === "onion" && item.locationId === "loc-delhi"
    );
    if (!preferred) {
      return fail("NOT_FOUND", "Default forecast series is unavailable.");
    }
    return ok(preferred);
  },

  getRecommendedActions(): ApiResult<RecommendedAction[]> {
    return ok(mockActions);
  },

  getRecommendationsForAlert(alertId: string): ApiResult<RecommendedAction[]> {
    return ok(mockActions.filter((item) => item.alertId === alertId));
  },
};

export type EwpisApi = typeof api;
