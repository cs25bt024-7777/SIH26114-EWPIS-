"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { EmptyState } from "@/components/page-intro";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateShort, formatInr } from "@/lib/utils";
import type { ForecastSeries } from "@/types/forecast";

export function ForecastChart({ series }: { series: ForecastSeries | null }) {
  if (!series) {
    return (
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Price forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No forecast"
            description="A forecast series is not available for the current selection."
          />
        </CardContent>
      </Card>
    );
  }

  const lastHistorical = series.historical.slice(-10);
  const data = [
    ...lastHistorical.map((point) => ({
      date: point.date,
      Historical: point.price,
      Forecast: undefined as number | undefined,
      Lower: undefined as number | undefined,
      Upper: undefined as number | undefined,
    })),
    {
      date: series.historical.at(-1)?.date,
      Historical: series.historical.at(-1)?.price,
      Forecast: series.historical.at(-1)?.price,
      Lower: series.historical.at(-1)?.price,
      Upper: series.historical.at(-1)?.price,
    },
    ...series.forecast.map((point) => ({
      date: point.date,
      Historical: undefined as number | undefined,
      Forecast: point.price,
      Lower: point.lowerBound,
      Upper: point.upperBound,
    })),
  ];

  return (
    <Card className="rounded-lg">
      <CardHeader className="border-b">
        <CardTitle>Forecast visualization</CardTitle>
        <CardDescription>
          Ensemble demonstration path ({series.model}), {series.horizonDays}-day
          horizon. Solid line is observed history; dashed line is forecast with
          a confidence band. Not a live model output.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="date"
                tickFormatter={(value: string) => formatDateShort(value)}
                minTickGap={20}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(value: number) => formatInr(value)}
                width={72}
              />
              <Tooltip
                labelFormatter={(value) => formatDateShort(String(value))}
                formatter={(value, name) => {
                  const numeric = typeof value === "number" ? value : Number(value);
                  return [formatInr(numeric, 0), String(name)];
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="Upper"
                stroke="none"
                fill="var(--chart-band)"
                fillOpacity={0.35}
                legendType="none"
              />
              <Area
                type="monotone"
                dataKey="Lower"
                stroke="none"
                fill="var(--background)"
                fillOpacity={1}
                legendType="none"
              />
              <Line
                type="monotone"
                dataKey="Historical"
                stroke="var(--chart-line)"
                dot={false}
                strokeWidth={2}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="Forecast"
                stroke="var(--chart-forecast)"
                dot={false}
                strokeWidth={2}
                strokeDasharray="5 4"
                connectNulls={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
