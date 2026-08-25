import { AlertsClient } from "@/app/alerts/alerts-client";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageIntro } from "@/components/page-intro";

export const metadata = {
  title: "Alerts",
};

export default function AlertsPage() {
  return (
    <DashboardShell>
      <PageIntro
        kicker="Early warning"
        title="Alert register"
        description="What is happening, how serious it is, where it is occurring, and the current workflow status. Critical (RED) items are visually distinct and labelled."
      />
      <AlertsClient />
    </DashboardShell>
  );
}
