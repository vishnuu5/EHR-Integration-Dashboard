"use client";

import useSWR from "swr";
import type { Appointment, PaginatedResponse } from "@/lib/types";

interface UseAppointmentsOptions {
  search?: string;
  status?: string;
  provider?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

// Mock appointment data
const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "Ram",
    providerId: "1",
    providerName: "Smith",
    appointmentType: "Consultation",
    date: "2024-01-15",
    time: "09:00",
    duration: 30,
    status: "confirmed",
    reason: "Annual checkup",
    location: "Main Office",
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Sarah",
    providerId: "2",
    providerName: "Johnson",
    appointmentType: "Follow-up",
    date: "2024-01-15",
    time: "10:30",
    duration: 45,
    status: "scheduled",
    reason: "Blood pressure follow-up",
    location: "Main Office",
  },
  {
    id: "3",
    patientId: "3",
    patientName: "Michael",
    providerId: "1",
    providerName: "Smith",
    appointmentType: "Physical Exam",
    date: "2024-01-16",
    time: "14:00",
    duration: 60,
    status: "completed",
    reason: "Annual physical examination",
    location: "Main Office",
  },
  {
    id: "4",
    patientId: "1",
    patientName: "Ram",
    providerId: "3",
    providerName: "vishnu",
    appointmentType: "Lab Work",
    date: "2024-01-17",
    time: "08:30",
    duration: 15,
    status: "scheduled",
    reason: "Blood work",
    location: "Lab",
  },
  {
    id: "5",
    patientId: "2",
    patientName: "Sarah",
    providerId: "2",
    providerName: "Ram",
    appointmentType: "Consultation",
    date: "2024-01-18",
    time: "11:00",
    duration: 30,
    status: "cancelled",
    reason: "Medication review",
    location: "Main Office",
  },
];

const fetcher = async (
  url: string
): Promise<PaginatedResponse<Appointment>> => {
  // Mock API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Parse URL to get parameters
  const urlObj = new URL(url, "http://localhost");
  const search = urlObj.searchParams.get("search") || "";
  const status = urlObj.searchParams.get("status") || "";
  const provider = urlObj.searchParams.get("provider") || "";
  const date = urlObj.searchParams.get("date") || "";
  const startDate = urlObj.searchParams.get("startDate") || "";
  const endDate = urlObj.searchParams.get("endDate") || "";
  const page = Number.parseInt(urlObj.searchParams.get("page") || "1");
  const limit = Number.parseInt(urlObj.searchParams.get("limit") || "20");

  // Filter appointments
  let filteredAppointments = mockAppointments;

  if (search) {
    const searchLower = search.toLowerCase();
    filteredAppointments = filteredAppointments.filter(
      (appointment) =>
        appointment.patientName.toLowerCase().includes(searchLower) ||
        appointment.providerName.toLowerCase().includes(searchLower) ||
        appointment.appointmentType.toLowerCase().includes(searchLower) ||
        appointment.id.includes(search)
    );
  }

  if (status) {
    filteredAppointments = filteredAppointments.filter(
      (appointment) => appointment.status === status
    );
  }

  if (provider) {
    filteredAppointments = filteredAppointments.filter((appointment) =>
      appointment.providerName
        .toLowerCase()
        .includes(provider.replace("dr-", "").replace("-", " "))
    );
  }

  if (date) {
    filteredAppointments = filteredAppointments.filter(
      (appointment) => appointment.date === date
    );
  }

  if (startDate && endDate) {
    filteredAppointments = filteredAppointments.filter(
      (appointment) =>
        appointment.date >= startDate && appointment.date <= endDate
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedAppointments = filteredAppointments.slice(
    startIndex,
    endIndex
  );

  return {
    data: paginatedAppointments,
    total: filteredAppointments.length,
    page,
    limit,
    totalPages: Math.ceil(filteredAppointments.length / limit),
    hasNext: endIndex < filteredAppointments.length,
    hasPrev: page > 1,
  };
};

export function useAppointments(options: UseAppointmentsOptions = {}) {
  const {
    search = "",
    status = "",
    provider = "",
    date = "",
    startDate = "",
    endDate = "",
    page = 1,
    limit = 20,
  } = options;

  // Build query string
  const params = new URLSearchParams({
    search,
    status,
    provider,
    date,
    startDate,
    endDate,
    page: page.toString(),
    limit: limit.toString(),
  });

  // Remove empty parameters
  for (const [key, value] of Array.from(params.entries())) {
    if (!value) {
      params.delete(key);
    }
  }

  const { data, error, isLoading, mutate } = useSWR(
    `/api/appointments?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    appointments: data,
    isLoading,
    error: error?.message,
    mutate,
  };
}
