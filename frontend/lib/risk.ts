import type { RiskColor, RiskLevel } from "@/types/risk";

export const RISK_THRESHOLDS = {
  stableMax: 25,
  watchMax: 50,
  moderateMax: 75,
  criticalMax: 100,
} as const;

export const RISK_LEVELS: RiskLevel[] = [
  "STABLE",
  "WATCH",
  "MODERATE",
  "CRITICAL",
];

export function scoreToRiskLevel(score: number): RiskLevel {
  if (score <= RISK_THRESHOLDS.stableMax) return "STABLE";
  if (score <= RISK_THRESHOLDS.watchMax) return "WATCH";
  if (score <= RISK_THRESHOLDS.moderateMax) return "MODERATE";
  return "CRITICAL";
}

export function riskLevelToColor(level: RiskLevel): RiskColor {
  switch (level) {
    case "STABLE":
      return "GREEN";
    case "WATCH":
      return "YELLOW";
    case "MODERATE":
      return "ORANGE";
    case "CRITICAL":
      return "RED";
  }
}

export function riskLevelLabel(level: RiskLevel): string {
  switch (level) {
    case "STABLE":
      return "Stable";
    case "WATCH":
      return "Watch";
    case "MODERATE":
      return "Moderate";
    case "CRITICAL":
      return "Critical";
  }
}

export function riskLevelDescription(level: RiskLevel): string {
  switch (level) {
    case "STABLE":
      return "Price and supply conditions are within expected seasonal range.";
    case "WATCH":
      return "Early warning. Emerging risk that requires monitoring (about 15–30 days).";
    case "MODERATE":
      return "Developing risk. Preparation and possible intervention (about 7–14 days).";
    case "CRITICAL":
      return "Severe or imminent shortage/price risk (typically under 7 days).";
  }
}

export function warningWindowForLevel(level: RiskLevel): number {
  switch (level) {
    case "STABLE":
      return 30;
    case "WATCH":
      return 21;
    case "MODERATE":
      return 10;
    case "CRITICAL":
      return 5;
  }
}

export function riskBadgeClass(level: RiskLevel): string {
  switch (level) {
    case "STABLE":
      return "border-[var(--risk-stable-border)] bg-[var(--risk-stable-bg)] text-[var(--risk-stable-fg)]";
    case "WATCH":
      return "border-[var(--risk-watch-border)] bg-[var(--risk-watch-bg)] text-[var(--risk-watch-fg)]";
    case "MODERATE":
      return "border-[var(--risk-moderate-border)] bg-[var(--risk-moderate-bg)] text-[var(--risk-moderate-fg)]";
    case "CRITICAL":
      return "border-[var(--risk-critical-border)] bg-[var(--risk-critical-bg)] text-[var(--risk-critical-fg)]";
  }
}

export function riskBarClass(level: RiskLevel): string {
  switch (level) {
    case "STABLE":
      return "bg-[var(--risk-stable-fg)]";
    case "WATCH":
      return "bg-[var(--risk-watch-fg)]";
    case "MODERATE":
      return "bg-[var(--risk-moderate-fg)]";
    case "CRITICAL":
      return "bg-[var(--risk-critical-fg)]";
  }
}

export function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}
