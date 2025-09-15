import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PatientDetails } from "@/components/patients/patient-details";

export const metadata: Metadata = {
  title: "Patient Details - EHR Dashboard",
  description: "View and edit detailed patient information",
};

interface PatientDetailsPageProps {
  params: {
    id: string;
  };
}

export default function PatientDetailsPage({
  params,
}: PatientDetailsPageProps) {
  return (
    <DashboardLayout>
      <PatientDetails patientId={params.id} />
    </DashboardLayout>
  );
}
