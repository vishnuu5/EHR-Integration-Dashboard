"use client";

import useSWR from "swr";
import type { Medication, PaginatedResponse } from "@/lib/types";

interface UseMedicationsParams {
  search?: string;
  status?: string;
  patient?: string;
  page?: number;
  limit?: number;
}

// Mock data for medications
const mockMedications: Medication[] = [
  {
    id: "med-1",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    prescribedBy: "Smith",
    dateStarted: "2024-01-01T00:00:00Z",
    dateEnded: undefined,
    status: "active",
    instructions: "Take with food",
  },
  {
    id: "med-2",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    prescribedBy: "Raju",
    dateStarted: "2023-12-15T00:00:00Z",
    dateEnded: undefined,
    status: "active",
    instructions: "Take with meals",
  },
  {
    id: "med-3",
    name: "Warfarin",
    dosage: "5mg",
    frequency: "Once daily",
    prescribedBy: "Brown",
    dateStarted: "2023-11-20T00:00:00Z",
    dateEnded: undefined,
    status: "active",
    instructions: "Monitor INR levels",
  },
  {
    id: "med-4",
    name: "Aspirin",
    dosage: "81mg",
    frequency: "Once daily",
    prescribedBy: "Wilson",
    dateStarted: "2023-10-10T00:00:00Z",
    dateEnded: "2024-01-10T00:00:00Z",
    status: "discontinued",
    instructions: "Take with food",
  },
];

const fetcher = async (url: string) => {
  // Mock API delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  const params = new URLSearchParams(url.split("?")[1] || "");
  const search = params.get("search")?.toLowerCase() || "";
  const status = params.get("status") || "all";
  const patient = params.get("patient") || "all";

  let filteredMedications = mockMedications;

  if (search) {
    filteredMedications = filteredMedications.filter(
      (med) =>
        med.name.toLowerCase().includes(search) ||
        med.prescribedBy.toLowerCase().includes(search)
    );
  }

  if (status !== "all") {
    filteredMedications = filteredMedications.filter(
      (med) => med.status === status
    );
  }

  // Patient filter would be implemented with actual patient data
  if (patient !== "all") {
    // Mock patient filtering
    filteredMedications = filteredMedications.filter((_, index) =>
      patient === "1"
        ? index < 2
        : patient === "2"
        ? index >= 2 && index < 3
        : index >= 3
    );
  }

  return {
    data: filteredMedications,
    total: filteredMedications.length,
    page: 1,
    limit: 10,
    totalPages: Math.ceil(filteredMedications.length / 10),
  };
};

export function useMedications(params: UseMedicationsParams = {}) {
  const queryString = new URLSearchParams({
    search: params.search || "",
    status: params.status || "all",
    patient: params.patient || "all",
    page: (params.page || 1).toString(),
    limit: (params.limit || 10).toString(),
  }).toString();

  const { data, error, isLoading, mutate } = useSWR<
    PaginatedResponse<Medication>
  >(`/api/medications?${queryString}`, fetcher);

  return {
    medications: data,
    isLoading,
    error,
    mutate,
  };
}
