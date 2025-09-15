"use client";

import useSWR from "swr";
import type { Provider, PaginatedResponse } from "@/lib/types";

// Mock provider data
const mockProviders: Provider[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    specialty: "Internal Medicine",
    department: "Primary Care",
    phone: "(555) 123-4567",
    email: "dr.smith@hospital.com",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    specialty: "Cardiology",
    department: "Cardiology",
    phone: "(555) 234-5678",
    email: "dr.johnson@hospital.com",
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Williams",
    specialty: "Orthopedics",
    department: "Surgery",
    phone: "(555) 345-6789",
    email: "dr.williams@hospital.com",
  },
];

const fetcher = async (url: string): Promise<PaginatedResponse<Provider>> => {
  // Mock API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    data: mockProviders,
    total: mockProviders.length,
    page: 1,
    limit: 20,
    totalPages: Math.ceil(mockProviders.length / 20),
    hasNext: false,
    hasPrev: false,
  };
};

export function useProviders() {
  const { data, error, isLoading, mutate } = useSWR("/api/providers", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10000,
  });

  return {
    providers: data,
    isLoading,
    error: error?.message,
    mutate,
  };
}
