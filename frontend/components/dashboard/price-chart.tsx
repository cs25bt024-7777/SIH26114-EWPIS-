"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/page-intro";
import { formatDateShort, formatInr } from "@/lib/utils";
import type { ForecastSeries } from "@/types/forecast";

export function PriceChart({ series }: { series: ForecastSeries | null }) {
  if (!series || series.historical.length === 0) {
    return (
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Historical prices</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No historical series"
            description="A price history is not available for the current selection."
          />
        </CardContent>
      </Card>
    );
  }

  const data = series.historical.map((point) => ({
    date: point.date,
    Observed: point.price,
    Arrivals: point.mandiArrivalsTonnes,
  }));

  return (
    <Card className="rounded-lg">
      <CardHeader className="border-b">
        <CardTitle>Historical price trend</CardTitle>
        <CardDescription>
          Observed modal prices (demonstration series). Axes show date and
          value; arrivals are plotted on the right axis where available.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="date"
                tickFormatter={(value: string) => formatDateShort(value)}
                minTickGap={24}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                yAxisId="price"
                tick={{ fontSize: 11 }}
                tickFormatter={(value: number) => formatInr(value)}
                width={72}
              />
              <YAxis
                yAxisId="arrivals"
                orientation="right"
                tick={{ fontSize: 11 }}
                width={48}
              />
              <Tooltip
                labelFormatter={(value) => formatDateShort(String(value))}
                formatter={(value, name) => {
                  const numeric = typeof value === "number" ? value : Number(value);
                  if (name === "Observed") return [formatInr(numeric, 0), "Observed price"];
                  return [numeric, "Mandi arrivals (t)"];
                }}
              />
              <Legend />
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="Observed"
                stroke="var(--chart-line)"
                dot={false}
                strokeWidth={2}
              />
              <Line
                yAxisId="arrivals"
                type="monotone"
                dataKey="Arrivals"
                stroke="var(--chart-secondary)"
                dot={false}
                strokeWidth={1.5}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
