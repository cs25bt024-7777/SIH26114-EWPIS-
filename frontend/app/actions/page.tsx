import { ActionsClient } from "@/app/actions/actions-client";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageIntro } from "@/components/page-intro";

export const metadata = {
  title: "Actions",
};

export default function ActionsPage() {
  return (
    <DashboardShell>
      <PageIntro
        kicker="Action centre"
        title="Recommended actions for review"
        description="Each item pairs a risk situation with possible monitoring, procurement, buffer and market-surveillance options. Final decisions remain with authorised officials."
      />
      <ActionsClient />
    </DashboardShell>
  );
}
