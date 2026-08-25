import { SettingsClient } from "@/app/settings/settings-client";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageIntro } from "@/components/page-intro";

export const metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <DashboardShell>
      <PageIntro
        kicker="Workspace"
        title="Settings"
        description="Profile labels, notification preferences and system information for this demonstration frontend. No backend persistence."
      />
      <SettingsClient />
    </DashboardShell>
  );
}
