import { Suspense } from "react";

import { CommoditiesClient } from "@/app/commodities/commodities-client";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { LoadingBlock, PageIntro } from "@/components/page-intro";

export const metadata = {
  title: "Commodities",
};

export default function CommoditiesPage() {
  return (
    <DashboardShell>
      <PageIntro
        kicker="Commodity intelligence"
        title="Monitored essential commodities"
        description="Current price, change, risk score, shortage probability and short-horizon forecast by market. Demonstration records only."
      />
      <Suspense fallback={<LoadingBlock label="Loading commodities" />}>
        <CommoditiesClient />
      </Suspense>
    </DashboardShell>
  );
}
