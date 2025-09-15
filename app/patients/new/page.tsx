import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { NewPatientForm } from "@/components/patients/new-patient-form";

export const metadata: Metadata = {
  title: "Add New Patient - EHR Dashboard",
  description: "Create a new patient record",
};

export default function NewPatientPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New Patient</h1>
          <p className="text-gray-600">
            Create a comprehensive patient record with demographics and medical
            information
          </p>
        </div>
        <NewPatientForm />
      </div>
    </DashboardLayout>
  );
}
