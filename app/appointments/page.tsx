import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AppointmentManagement } from "@/components/appointments/appointment-management";

export const metadata: Metadata = {
  title: "Appointment Scheduling - EHR Dashboard",
  description: "Schedule, manage, and track patient appointments",
};

export default function AppointmentsPage() {
  return (
    <DashboardLayout>
      <AppointmentManagement />
    </DashboardLayout>
  );
}
