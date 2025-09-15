import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { NewClinicalNoteForm } from "@/components/clinical/new-clinical-note-form";

export const metadata: Metadata = {
  title: "New Clinical Note - EHR Dashboard",
  description: "Create a new clinical note or documentation",
};

export default function NewClinicalNotePage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            New Clinical Note
          </h1>
          <p className="text-gray-600">
            Document patient encounter, observations, and clinical findings
          </p>
        </div>
        <NewClinicalNoteForm />
      </div>
    </DashboardLayout>
  );
}
