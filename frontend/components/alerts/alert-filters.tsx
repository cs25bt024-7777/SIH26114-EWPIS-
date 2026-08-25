"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AlertStatus } from "@/types/alert";
import type { Commodity } from "@/types/commodity";
import type { Location, RiskLevel } from "@/types/risk";

export interface AlertFilterValue {
  search: string;
  riskLevel: RiskLevel | "ALL";
  commodityId: string;
  locationId: string;
  status: AlertStatus | "ALL";
}

export function AlertFilters({
  value,
  onChange,
  commodities,
  locations,
}: {
  value: AlertFilterValue;
  onChange: (next: AlertFilterValue) => void;
  commodities: Commodity[];
  locations: Location[];
}) {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">
      <div className="xl:col-span-1">
        <label htmlFor="alert-search" className="mb-1 block text-xs font-medium">
          Search
        </label>
        <Input
          id="alert-search"
          value={value.search}
          onChange={(event) => onChange({ ...value, search: event.target.value })}
          placeholder="Commodity, market or reason"
        />
      </div>
      <FilterSelect
        label="Risk level"
        value={value.riskLevel}
        onChange={(riskLevel) =>
          onChange({ ...value, riskLevel: riskLevel as AlertFilterValue["riskLevel"] })
        }
        options={[
          { value: "ALL", label: "All levels" },
          { value: "CRITICAL", label: "RED · Critical" },
          { value: "MODERATE", label: "ORANGE · Moderate" },
          { value: "WATCH", label: "YELLOW · Watch" },
          { value: "STABLE", label: "GREEN · Stable" },
        ]}
      />
      <FilterSelect
        label="Commodity"
        value={value.commodityId}
        onChange={(commodityId) => onChange({ ...value, commodityId })}
        options={[
          { value: "ALL", label: "All commodities" },
          ...commodities.map((item) => ({ value: item.id, label: item.name })),
        ]}
      />
      <FilterSelect
        label="Location"
        value={value.locationId}
        onChange={(locationId) => onChange({ ...value, locationId })}
        options={[
          { value: "ALL", label: "All markets" },
          ...locations.map((item) => ({
            value: item.id,
            label: `${item.name}, ${item.stateName}`,
          })),
        ]}
      />
      <FilterSelect
        label="Status"
        value={value.status}
        onChange={(status) =>
          onChange({ ...value, status: status as AlertFilterValue["status"] })
        }
        options={[
          { value: "ALL", label: "All statuses" },
          { value: "NEW", label: "New" },
          { value: "UNDER_REVIEW", label: "Under review" },
          { value: "ACTION_TAKEN", label: "Action taken" },
          { value: "CLOSED", label: "Closed" },
        ]}
      />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium">{label}</p>
      <Select
        value={value}
        onValueChange={(next) => {
          if (next) onChange(next);
        }}
      >
        <SelectTrigger className="w-full" aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
