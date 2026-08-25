import { LocationsClient } from "@/app/locations/locations-client";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageIntro } from "@/components/page-intro";

export const metadata = {
  title: "Locations",
};

export default function LocationsPage() {
  return (
    <DashboardShell>
      <PageIntro
        kicker="Geographic intelligence"
        title="States, districts and market risk"
        description="Use the regional board and state cards to see where risk is concentrating. Coordinates are stored on each location so a geographic map layer can be attached later."
      />
      <LocationsClient />
    </DashboardShell>
  );
}
