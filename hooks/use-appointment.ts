"use client";

import useSWR from "swr";
import type { Appointment } from "@/lib/types";

// Mock appointment data
const mockAppointment: Appointment = {
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
  notes: "Patient reports feeling well. No current concerns.",
  location: "Main Office, Room 101",
};

const fetcher = async (url: string): Promise<Appointment> => {
  // Mock API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Extract appointment ID from URL
  const appointmentId = url.split("/").pop();

  // In a real app, you would fetch from your API
  return mockAppointment;
};

export function useAppointment(appointmentId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    appointmentId ? `/api/appointments/${appointmentId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  );

  return {
    appointment: data,
    isLoading,
    error: error?.message,
    mutate,
  };
}
