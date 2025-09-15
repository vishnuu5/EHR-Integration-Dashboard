import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AppointmentDetails } from "@/components/appointments/appointment-details";

export const metadata: Metadata = {
  title: "Appointment Details - EHR Dashboard",
  description: "View and manage appointment details",
};

interface AppointmentDetailsPageProps {
  params: {
    id: string;
  };
}

export default function AppointmentDetailsPage({
  params,
}: AppointmentDetailsPageProps) {
  return (
    <DashboardLayout>
      <AppointmentDetails appointmentId={params.id} />
    </DashboardLayout>
  );
}
