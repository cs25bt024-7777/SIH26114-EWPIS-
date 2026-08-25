import { LoadingBlock } from "@/components/page-intro";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function Loading() {
  return (
    <DashboardShell>
      <LoadingBlock label="Loading dashboard" />
    </DashboardShell>
  );
}
