// Core EHR Types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  phone?: string;
  email?: string;
  address?: Address;
  emergencyContact?: EmergencyContact;
  insuranceInfo?: InsuranceInfo;
  insurance?: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  allergies?: Allergy[];
  medications?: Medication[];
  medicalHistory?: MedicalCondition[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  eligibilityStatus: "active" | "inactive" | "pending";
}

export interface Allergy {
  id: string;
  allergen: string;
  severity: "mild" | "moderate" | "severe";
  reaction?: string;
  dateRecorded: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  dateStarted: string;
  dateEnded?: string;
  status: "active" | "discontinued" | "completed";
  instructions?: string;
  patientId?: string;
}

export interface MedicalCondition {
  id: string;
  condition: string;
  diagnosisDate: string;
  status: "active" | "resolved" | "chronic";
  notes?: string;
}

// Appointment Types
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  appointmentType: string;
  date: string;
  time: string;
  scheduledDateTime?: string;
  duration: number;
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show";
  reason?: string;
  notes?: string;
  location?: string;
}

export interface Provider {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  department: string;
  phone?: string;
  email?: string;
  schedule?: ProviderSchedule[];
}

export interface ProviderSchedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// Clinical Types
export interface VitalSigns {
  id: string;
  patientId: string;
  patientName?: string; // Added patientName property to match mock data
  recordedDate: string;
  recordedBy: string;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  heartRate?: number;
  temperature?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  weight?: number;
  height?: number;
  bmi?: number;
}

export interface ClinicalNote {
  id: string;
  patientId: string;
  providerId: string;
  noteType: "progress" | "consultation" | "discharge" | "procedure";
  date: string;
  subject: string;
  content: string;
  status: "draft" | "signed" | "amended";
  createdAt?: string;
  patientName?: string;
}

export interface LabResult {
  id: string;
  patientId: string;
  testName: string;
  testCode: string;
  result: string;
  referenceRange: string;
  status: "pending" | "completed" | "cancelled";
  orderedDate: string;
  resultDate?: string;
  orderedBy: string;
  abnormalFlag?: "high" | "low" | "critical";
}

// Billing Types
export interface BillingRecord {
  id: string;
  patientId: string;
  patientName: string; // Added patientName field to match mock data
  appointmentId?: string;
  serviceCode: string; // Added serviceCode field
  serviceDescription: string; // Added serviceDescription field
  serviceDate: string;
  amount: string; // Changed to string to match mock data format
  status: "pending" | "paid" | "partially_paid" | "denied" | "submitted"; // Added submitted status
  insuranceProvider?: string; // Added insuranceProvider field
  claimNumber?: string;
  procedureCodes?: ProcedureCode[];
  diagnosisCodes?: DiagnosisCode[];
  totalAmount?: number;
  insuranceCoverage?: number;
  patientResponsibility?: number;
}

export interface InsuranceRecord {
  id: string;
  patientId: string;
  patientName: string;
  dateOfBirth: string;
  insuranceProvider: string;
  policyNumber: string;
  groupNumber?: string;
  deductible: string;
  copay: string;
  status: "active" | "inactive" | "pending";
  effectiveDate: string;
  expirationDate: string;
}

export interface PaymentRecord {
  id: string;
  patientId: string;
  patientName: string;
  amount: string;
  paymentMethod: "credit_card" | "debit_card" | "cash" | "check" | "insurance";
  paymentDate: string;
  status: "completed" | "pending" | "failed" | "refunded";
  transactionId: string;
  billingRecordId: string;
}

export interface ProcedureCode {
  code: string;
  description: string;
  amount: number;
}

export interface DiagnosisCode {
  code: string;
  description: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number; // Added totalPages field used by hooks
  hasNext?: boolean;
  hasPrev?: boolean;
}

// Authentication Types
export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "provider" | "staff";
  permissions: string[];
  lastLogin?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// EHR Integration Types
export interface EHRConfig {
  provider: "drchrono" | "epic";
  baseUrl: string;
  clientId?: string;
  clientSecret?: string;
  username?: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface EHRConnection {
  id: string;
  provider: "drchrono" | "epic";
  status: "connected" | "disconnected" | "error";
  lastSync?: string;
  config: EHRConfig;
}
