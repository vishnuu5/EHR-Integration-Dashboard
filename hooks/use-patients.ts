"use client";

import useSWR from "swr";
import type { Patient, PaginatedResponse } from "@/lib/types";

interface UsePatientOptions {
  search?: string;
  filters?: {
    gender?: string;
    ageRange?: string;
    insuranceStatus?: string;
    lastVisit?: string;
  };
  page?: number;
  limit?: number;
}

// Mock data for development
const mockPatients: Patient[] = [
  {
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
    ],
    medicalHistory: [
      {
        id: "1",
        condition: "Hypertension",
        diagnosisDate: "2022-06-15",
        status: "chronic",
        notes: "Well controlled with medication",
      },
    ],
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    dateOfBirth: "1992-07-22",
    gender: "female",
    phone: "(555) 234-5678",
    email: "sarah.johnson@email.com",
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
    },
    insuranceInfo: {
      provider: "Aetna",
      policyNumber: "AET987654321",
      eligibilityStatus: "active",
    },
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Brown",
    dateOfBirth: "1978-11-08",
    gender: "male",
    phone: "(555) 345-6789",
    email: "michael.brown@email.com",
    insuranceInfo: {
      provider: "Cigna",
      policyNumber: "CIG456789123",
      eligibilityStatus: "pending",
    },
  },
];

const fetcher = async (url: string): Promise<PaginatedResponse<Patient>> => {
  // Mock API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Parse URL to get search and filter parameters
  const urlObj = new URL(url, "http://localhost");
  const search = urlObj.searchParams.get("search") || "";
  const gender = urlObj.searchParams.get("gender") || "";
  const page = Number.parseInt(urlObj.searchParams.get("page") || "1");
  const limit = Number.parseInt(urlObj.searchParams.get("limit") || "20");

  // Filter patients based on search and filters
  let filteredPatients = mockPatients;

  if (search) {
    const searchLower = search.toLowerCase();
    filteredPatients = filteredPatients.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(searchLower) ||
        patient.lastName.toLowerCase().includes(searchLower) ||
        patient.email?.toLowerCase().includes(searchLower) ||
        patient.phone?.includes(search) ||
        patient.id.includes(search)
    );
  }

  if (gender) {
    filteredPatients = filteredPatients.filter(
      (patient) => patient.gender === gender
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  return {
    data: paginatedPatients,
    total: filteredPatients.length,
    page,
    limit,
    totalPages: Math.ceil(filteredPatients.length / limit),
    hasNext: endIndex < filteredPatients.length,
    hasPrev: page > 1,
  };
};

export function usePatients(options: UsePatientOptions = {}) {
  const { search = "", filters = {}, page = 1, limit = 20 } = options;

  // Build query string
  const params = new URLSearchParams({
    search,
    page: page.toString(),
    limit: limit.toString(),
    ...Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value)
    ),
  });

  const { data, error, isLoading, mutate } = useSWR(
    `/api/patients?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    patients: data,
    isLoading,
    error: error?.message,
    mutate,
  };
}
