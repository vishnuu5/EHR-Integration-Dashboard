"use client";

import useSWR from "swr";
import type { VitalSigns, PaginatedResponse } from "@/lib/types";

interface UseVitalSignsParams {
  patientId?: string;
  page?: number;
  limit?: number;
}

// Mock data for vital signs
const mockVitalSigns: VitalSigns[] = [
  {
    id: "vital-1",
    patientId: "patient-1",
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    heartRate: 72,
    temperature: 98.6,
    respiratoryRate: 16,
    oxygenSaturation: 98,
    weight: 150,
    height: 68,
    recordedDate: "2024-01-15T10:30:00Z",
    recordedBy: "nurse-1",
  },
  {
    id: "vital-2",
    patientId: "patient-2",
    bloodPressureSystolic: 145,
    bloodPressureDiastolic: 95,
    heartRate: 88,
    temperature: 99.2,
    respiratoryRate: 18,
    oxygenSaturation: 96,
    weight: 180,
    height: 70,
    recordedDate: "2024-01-14T14:15:00Z",
    recordedBy: "nurse-2",
  },
  {
    id: "vital-3",
    patientId: "patient-3",
    bloodPressureSystolic: 110,
    bloodPressureDiastolic: 70,
    heartRate: 65,
    temperature: 98.4,
    respiratoryRate: 14,
    oxygenSaturation: 99,
    weight: 140,
    height: 65,
    recordedDate: "2024-01-13T16:45:00Z",
    recordedBy: "nurse-1",
  },
];

const fetcher = async (url: string) => {
  // Mock API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const params = new URLSearchParams(url.split("?")[1] || "");
  const patientId = params.get("patientId");

  let filteredVitalSigns = mockVitalSigns;

  if (patientId) {
    filteredVitalSigns = filteredVitalSigns.filter(
      (vital) => vital.patientId === patientId
    );
  }

  // Sort by most recent first
  filteredVitalSigns.sort(
    (a, b) =>
      new Date(b.recordedDate).getTime() - new Date(a.recordedDate).getTime()
  );

  return {
    data: filteredVitalSigns,
    total: filteredVitalSigns.length,
    page: 1,
    limit: 10,
    totalPages: Math.ceil(filteredVitalSigns.length / 10),
  };
};

export function useVitalSigns(params: UseVitalSignsParams = {}) {
  const queryString = new URLSearchParams({
    patientId: params.patientId || "",
    page: (params.page || 1).toString(),
    limit: (params.limit || 10).toString(),
  }).toString();

  const { data, error, isLoading, mutate } = useSWR<
    PaginatedResponse<VitalSigns>
  >(`/api/vital-signs?${queryString}`, fetcher);

  return {
    vitalSigns: data,
    isLoading,
    error,
    mutate,
  };
}
