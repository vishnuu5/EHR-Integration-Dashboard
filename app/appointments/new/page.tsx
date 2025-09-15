import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { NewAppointmentForm } from "@/components/appointments/new-appointment-form";

export const metadata: Metadata = {
  title: "Schedule New Appointment - EHR Dashboard",
  description: "Schedule a new patient appointment",
};

export default function NewAppointmentPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Schedule New Appointment
          </h1>
          <p className="text-gray-600">
            Book a new appointment with provider availability checking
          </p>
        </div>
        <NewAppointmentForm />
      </div>
    </DashboardLayout>
  );
}
