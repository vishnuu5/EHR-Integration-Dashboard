"use client";

import useSWR from "swr";
import type { LabResult, PaginatedResponse } from "@/lib/types";

interface UseLabResultsParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

// Mock data for lab results
const mockLabResults: LabResult[] = [
  {
    id: "lab-1",
    patientId: "patient-1",
    testName: "Complete Blood Count",
    testCode: "CBC",
    result: "Normal",
    referenceRange: "4.5-11.0 K/uL",
    abnormalFlag: undefined,
    status: "completed",
    orderedDate: "2024-01-15T08:00:00Z",
    resultDate: "2024-01-15T14:30:00Z",
    orderedBy: "Smith",
  },
  {
    id: "lab-2",
    patientId: "patient-2",
    testName: "Glucose",
    testCode: "GLU",
    result: "450 mg/dL",
    referenceRange: "70-100 mg/dL",
    abnormalFlag: "critical",
    status: "completed",
    orderedDate: "2024-01-14T09:15:00Z",
    resultDate: "2024-01-14T11:45:00Z",
    orderedBy: "Johnson",
  },
  {
    id: "lab-3",
    patientId: "patient-3",
    testName: "Potassium",
    testCode: "K",
    result: "2.8 mEq/L",
    referenceRange: "3.5-5.0 mEq/L",
    abnormalFlag: "critical",
    status: "completed",
    orderedDate: "2024-01-13T10:30:00Z",
    resultDate: "2024-01-13T15:20:00Z",
    orderedBy: "Brown",
  },
  {
    id: "lab-4",
    patientId: "patient-1",
    testName: "Cholesterol Panel",
    testCode: "CHOL",
    result: "Pending",
    referenceRange: "<200 mg/dL",
    abnormalFlag: undefined,
    status: "pending",
    orderedDate: "2024-01-16T07:45:00Z",
    resultDate: undefined,
    orderedBy: "Smith",
  },
];

const fetcher = async (url: string) => {
  // Mock API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  const params = new URLSearchParams(url.split("?")[1] || "");
  const search = params.get("search")?.toLowerCase() || "";
  const status = params.get("status") || "all";

  let filteredResults = mockLabResults;

  if (search) {
    filteredResults = filteredResults.filter(
      (result) =>
        result.testName.toLowerCase().includes(search) ||
        result.result.toLowerCase().includes(search)
    );
  }

  if (status !== "all") {
    filteredResults = filteredResults.filter(
      (result) => result.status === status
    );
  }

  return {
    data: filteredResults,
    total: filteredResults.length,
    page: 1,
    limit: 10,
    totalPages: Math.ceil(filteredResults.length / 10),
  };
};

export function useLabResults(params: UseLabResultsParams = {}) {
  const queryString = new URLSearchParams({
    search: params.search || "",
    status: params.status || "all",
    page: (params.page || 1).toString(),
    limit: (params.limit || 10).toString(),
  }).toString();

  const { data, error, isLoading, mutate } = useSWR<
    PaginatedResponse<LabResult>
  >(`/api/lab-results?${queryString}`, fetcher);

  return {
    labResults: data,
    isLoading,
    error,
    mutate,
  };
}
