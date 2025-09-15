import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PatientManagement } from "@/components/patients/patient-management";

export const metadata: Metadata = {
  title: "Patient Management - EHR Dashboard",
  description: "Manage patient records, demographics, and medical information",
};

export default function PatientsPage() {
  return (
    <DashboardLayout>
      <PatientManagement />
    </DashboardLayout>
  );
}
