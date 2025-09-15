import type { Metadata } from "next";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export const metadata: Metadata = {
  title: "EHR Integration Dashboard - Overview",
  description: "Healthcare data management and EHR integration dashboard",
};

export default function HomePage() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
}
