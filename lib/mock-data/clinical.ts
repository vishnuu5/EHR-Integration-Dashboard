import type {
  ClinicalNote,
  VitalSigns,
  LabResult,
  Medication,
} from "@/lib/types";

export const mockClinicalNotes: ClinicalNote[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "John Doe",
    providerId: "1",
    noteType: "progress",
    date: "2024-01-15",
    subject: "Follow-up visit for hypertension",
    content:
      "Patient reports feeling well. Blood pressure well controlled on current medication regimen. No side effects reported. Continue current treatment plan.",
    status: "signed",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Sarah Johnson",
    providerId: "2",
    noteType: "consultation",
    date: "2024-01-14",
    subject: "Initial consultation for diabetes management",
    content:
      "New patient with Type 2 diabetes. HbA1c elevated at 8.2%. Initiated on metformin 500mg BID. Patient education provided on diet and exercise.",
    status: "signed",
    createdAt: "2024-01-14T14:15:00Z",
  },
];

export const mockVitalSigns: VitalSigns[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "John Doe",
    recordedDate: "2024-01-15T10:30:00Z",
    recordedBy: "Nurse Johnson",
    bloodPressureSystolic: 128,
    bloodPressureDiastolic: 82,
    heartRate: 72,
    temperature: 98.6,
    respiratoryRate: 16,
    oxygenSaturation: 98,
    weight: 180,
    height: 70,
    bmi: 25.8,
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Sarah Johnson",
    recordedDate: "2024-01-14T14:15:00Z",
    recordedBy: "Nurse Smith",
    bloodPressureSystolic: 142,
    bloodPressureDiastolic: 90,
    heartRate: 78,
    temperature: 99.1,
    respiratoryRate: 18,
    oxygenSaturation: 97,
    weight: 165,
    height: 65,
    bmi: 27.5,
  },
];

export const mockLabResults: LabResult[] = [
  {
    id: "1",
    patientId: "1",
    testName: "Complete Blood Count",
    testCode: "CBC",
    result: "Normal",
    referenceRange: "Within normal limits",
    status: "completed",
    orderedDate: "2024-01-10",
    resultDate: "2024-01-12",
    orderedBy: "Dr. Smith",
  },
  {
    id: "2",
    patientId: "2",
    testName: "Hemoglobin A1C",
    testCode: "HbA1c",
    result: "8.2%",
    referenceRange: "<7.0%",
    status: "completed",
    orderedDate: "2024-01-08",
    resultDate: "2024-01-10",
    orderedBy: "Dr. Wilson",
  },
];

export const mockMedications: Medication[] = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    prescribedBy: "Dr. Smith",
    dateStarted: "2024-01-01",
    status: "active",
    instructions: "Take with or without food",
    patientId: "1",
  },
  {
    id: "2",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    prescribedBy: "Dr. Wilson",
    dateStarted: "2024-01-15",
    status: "active",
    instructions: "Take with meals to reduce stomach upset",
    patientId: "2",
  },
];
