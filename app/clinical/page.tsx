import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ClinicalOperations } from "@/components/clinical/clinical-operations";

export const metadata: Metadata = {
  title: "Clinical Operations - EHR Dashboard",
  description:
    "Manage clinical data, vital signs, lab results, and medical records",
};

export default function ClinicalPage() {
  return (
    <DashboardLayout>
      <ClinicalOperations />
    </DashboardLayout>
  );
}
