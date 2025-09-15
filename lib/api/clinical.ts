// Clinical API functions for EHR integration
import type {
  ClinicalNote,
  VitalSigns,
  LabResult,
  Medication,
} from "@/lib/types";

export class ClinicalAPI {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    };
  }

  // Clinical Notes
  async getClinicalNotes(patientId?: string): Promise<ClinicalNote[]> {
    const url = patientId
      ? `${this.baseUrl}/clinical/notes?patient_id=${patientId}`
      : `${this.baseUrl}/clinical/notes`;

    const response = await fetch(url, { headers: this.headers });
    if (!response.ok) throw new Error("Failed to fetch clinical notes");
    return response.json();
  }

  async createClinicalNote(
    note: Omit<ClinicalNote, "id" | "createdAt" | "updatedAt">
  ): Promise<ClinicalNote> {
    const response = await fetch(`${this.baseUrl}/clinical/notes`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error("Failed to create clinical note");
    return response.json();
  }

  async updateClinicalNote(
    id: string,
    note: Partial<ClinicalNote>
  ): Promise<ClinicalNote> {
    const response = await fetch(`${this.baseUrl}/clinical/notes/${id}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error("Failed to update clinical note");
    return response.json();
  }

  // Vital Signs
  async getVitalSigns(patientId: string): Promise<VitalSigns[]> {
    const response = await fetch(
      `${this.baseUrl}/clinical/vitals?patient_id=${patientId}`,
      {
        headers: this.headers,
      }
    );
    if (!response.ok) throw new Error("Failed to fetch vital signs");
    return response.json();
  }

  async recordVitalSigns(
    vitals: Omit<VitalSigns, "id" | "recordedAt">
  ): Promise<VitalSigns> {
    const response = await fetch(`${this.baseUrl}/clinical/vitals`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(vitals),
    });
    if (!response.ok) throw new Error("Failed to record vital signs");
    return response.json();
  }

  // Lab Results
  async getLabResults(patientId: string): Promise<LabResult[]> {
    const response = await fetch(
      `${this.baseUrl}/clinical/labs?patient_id=${patientId}`,
      {
        headers: this.headers,
      }
    );
    if (!response.ok) throw new Error("Failed to fetch lab results");
    return response.json();
  }

  async updateLabResult(
    id: string,
    result: Partial<LabResult>
  ): Promise<LabResult> {
    const response = await fetch(`${this.baseUrl}/clinical/labs/${id}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(result),
    });
    if (!response.ok) throw new Error("Failed to update lab result");
    return response.json();
  }

  // Medications
  async getMedications(patientId: string): Promise<Medication[]> {
    const response = await fetch(
      `${this.baseUrl}/clinical/medications?patient_id=${patientId}`,
      {
        headers: this.headers,
      }
    );
    if (!response.ok) throw new Error("Failed to fetch medications");
    return response.json();
  }

  async prescribeMedication(
    medication: Omit<Medication, "id" | "prescribedAt">
  ): Promise<Medication> {
    const response = await fetch(`${this.baseUrl}/clinical/medications`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(medication),
    });
    if (!response.ok) throw new Error("Failed to prescribe medication");
    return response.json();
  }

  async updateMedication(
    id: string,
    medication: Partial<Medication>
  ): Promise<Medication> {
    const response = await fetch(`${this.baseUrl}/clinical/medications/${id}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(medication),
    });
    if (!response.ok) throw new Error("Failed to update medication");
    return response.json();
  }
}

export const clinicalAPI = new ClinicalAPI();
