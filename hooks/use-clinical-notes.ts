"use client"

import useSWR from "swr"
import type { ClinicalNote, PaginatedResponse } from "@/lib/types"

interface UseClinicalNotesParams {
  search?: string
  type?: string
  status?: string
  page?: number
  limit?: number
}

// Mock data for clinical notes
const mockClinicalNotes: ClinicalNote[] = [
  {
    id: "note-1",
    patientId: "patient-1",
    providerId: "provider-1",
    noteType: "progress",
    subject: "Follow-up visit for hypertension",
    content: "Patient reports feeling well. Blood pressure controlled on current medication regimen.",
    status: "signed",
    date: "2024-01-15T10:30:00Z",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "note-2",
    patientId: "patient-2",
    providerId: "provider-2",
    noteType: "consultation",
    subject: "Initial cardiology consultation",
    content: "New patient referral for chest pain evaluation. EKG normal, stress test recommended.",
    status: "draft",
    date: "2024-01-14T14:15:00Z",
    createdAt: "2024-01-14T14:15:00Z",
  },
  {
    id: "note-3",
    patientId: "patient-3",
    providerId: "provider-1",
    noteType: "discharge",
    subject: "Discharge summary - pneumonia treatment",
    content: "Patient completed antibiotic course. Symptoms resolved. Follow-up in 2 weeks.",
    status: "signed",
    date: "2024-01-13T16:45:00Z",
    createdAt: "2024-01-13T16:50:00Z",
  },
]

const fetcher = async (url: string) => {
  // Mock API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const params = new URLSearchParams(url.split("?")[1] || "")
  const search = params.get("search")?.toLowerCase() || ""
  const type = params.get("type") || "all"
  const status = params.get("status") || "all"

  let filteredNotes = mockClinicalNotes

  if (search) {
    filteredNotes = filteredNotes.filter(
      (note) => note.subject.toLowerCase().includes(search) || note.content.toLowerCase().includes(search),
    )
  }

  if (type !== "all") {
    filteredNotes = filteredNotes.filter((note) => note.noteType === type)
  }

  if (status !== "all") {
    filteredNotes = filteredNotes.filter((note) => note.status === status)
  }

  return {
    data: filteredNotes,
    total: filteredNotes.length,
    page: 1,
    limit: 10,
    totalPages: Math.ceil(filteredNotes.length / 10),
  }
}

export function useClinicalNotes(params: UseClinicalNotesParams = {}) {
  const queryString = new URLSearchParams({
    search: params.search || "",
    type: params.type || "all",
    status: params.status || "all",
    page: (params.page || 1).toString(),
    limit: (params.limit || 10).toString(),
  }).toString()

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<ClinicalNote>>(
    `/api/clinical-notes?${queryString}`,
    fetcher,
  )

  return {
    clinicalNotes: data,
    isLoading,
    error,
    mutate,
  }
}
