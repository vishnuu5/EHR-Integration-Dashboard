"use client";

import useSWR from "swr";
import type { Patient } from "@/lib/types";

// Mock patient data - in real app, this would come from API
const mockPatient: Patient = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1985-03-15",
  gender: "male",
  phone: "(555) 123-4567",
  email: "john.doe@email.com",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
  },
  emergencyContact: {
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "(555) 123-4568",
  },
  insuranceInfo: {
    provider: "Blue Cross Blue Shield",
    policyNumber: "BC123456789",
    groupNumber: "GRP001",
    eligibilityStatus: "active",
  },
  allergies: [
    {
      id: "1",
      allergen: "Penicillin",
      severity: "severe",
      reaction: "Anaphylaxis",
      dateRecorded: "2020-01-15",
    },
    {
      id: "2",
      allergen: "Shellfish",
      severity: "moderate",
      reaction: "Hives",
      dateRecorded: "2021-05-10",
    },
  ],
  medications: [
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Smith",
      dateStarted: "2023-01-01",
      status: "active",
    },
    {
      id: "2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. Johnson",
      dateStarted: "2023-03-15",
      status: "active",
    },
  ],
  medicalHistory: [
    {
      id: "1",
      condition: "Hypertension",
      diagnosisDate: "2022-06-15",
      status: "chronic",
      notes: "Well controlled with medication",
    },
    {
      id: "2",
      condition: "Type 2 Diabetes",
      diagnosisDate: "2023-03-10",
      status: "active",
      notes: "Recently diagnosed, managing with diet and medication",
    },
  ],
};

const fetcher = async (url: string): Promise<Patient> => {
  // Mock API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Extract patient ID from URL
  const patientId = url.split("/").pop();

  // In a real app, you would fetch from your API
  // For now, return mock data
  return mockPatient;
};

export function usePatient(patientId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    patientId ? `/api/patients/${patientId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  );

  return {
    patient: data,
    isLoading,
    error: error?.message,
    mutate,
  };
}
