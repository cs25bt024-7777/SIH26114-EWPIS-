"use client";

import { useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function SettingsClient() {
  const [name, setName] = useState("Duty officer (demo)");
  const [desk, setDesk] = useState("Price monitoring cell");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [criticalOnly, setCriticalOnly] = useState(false);
  const [watchIncluded, setWatchIncluded] = useState(true);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Card className="rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Officer profile</CardTitle>
          <CardDescription>
            Local workspace labels only. Authentication is not implemented in
            this frontend phase.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="officer-name" className="mb-1 block text-xs font-medium">
              Display name
            </label>
            <Input
              id="officer-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="officer-desk" className="mb-1 block text-xs font-medium">
              Desk / cell
            </label>
            <Input
              id="officer-desk"
              value={desk}
              onChange={(event) => setDesk(event.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Notification preferences</CardTitle>
          <CardDescription>
            These toggles change only this browser session. Nothing is stored on
            a server.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={emailAlerts}
              onChange={(event) => setEmailAlerts(event.target.checked)}
            />
            <span>
              Show in-app notification badge for new moderate and critical alerts
            </span>
          </label>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={criticalOnly}
              onChange={(event) => setCriticalOnly(event.target.checked)}
            />
            <span>Prioritise RED / Critical items in the header badge</span>
          </label>
        </CardContent>
      </Card>

      <Card className="rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Alert preferences</CardTitle>
          <CardDescription>
            Preferred default watch coverage for this demonstration workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={watchIncluded}
              onChange={(event) => setWatchIncluded(event.target.checked)}
            />
            <span>
              Include YELLOW / Watch (early warning, 15–30 day window) in the
              default alert register
            </span>
          </label>
        </CardContent>
      </Card>

      <Card className="rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>System information</CardTitle>
          <CardDescription>Prototype configuration for SIH26114.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <InfoRow label="Application" value="EWPIS frontend prototype" />
          <Separator />
          <InfoRow label="Problem statement" value="SIH26114" />
          <Separator />
          <InfoRow label="Data source" value="Local mock data (lib/mock-data.ts)" />
          <Separator />
          <InfoRow label="API boundary" value="lib/api.ts — FastAPI not connected" />
          <Separator />
          <InfoRow label="Authentication" value="Not implemented" />
          <Separator />
          <InfoRow
            label="Intended stack"
            value="Next.js · FastAPI · Supabase · Prophet/LightGBM · Gemini"
          />
          <p className="pt-2 text-xs text-muted-foreground">
            Session labels currently: {name}, {desk}. Email badge{" "}
            {emailAlerts ? "on" : "off"}; critical-only {criticalOnly ? "on" : "off"};
            watch included {watchIncluded ? "yes" : "no"}.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-6">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="sm:text-right">{value}</dd>
    </div>
  );
}
