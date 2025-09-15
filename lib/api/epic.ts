import { BaseApiClient } from "./base"
import type { Patient, Appointment, ApiResponse, PaginatedResponse } from "@/lib/types"

export class EpicFHIRApiClient extends BaseApiClient {
  constructor() {
    super(process.env.EPIC_BASE_URL || "https://fhir.epic.com/", {
      Accept: "application/fhir+json",
    })
  }

  // Authentication for Epic FHIR
  async authenticate(username: string, password: string): Promise<ApiResponse<{ access_token: string }>> {
    // Epic FHIR typically uses OAuth2 or basic auth
    // This is a simplified implementation
    const credentials = btoa(`${username}:${password}`)
    this.client.defaults.headers.common["Authorization"] = `Basic ${credentials}`

    return {
      success: true,
      data: { access_token: "epic-mock-token" },
      message: "Authentication successful",
    }
  }

  // Patient Management (FHIR R4)
  async getPatients(page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<Patient>>> {
    return this.request({
      method: "GET",
      url: "/Patient",
      params: {
        _count: limit,
        _offset: (page - 1) * limit,
      },
    })
  }

  async getPatient(patientId: string): Promise<ApiResponse<Patient>> {
    return this.request({
      method: "GET",
      url: `/Patient/${patientId}`,
    })
  }

  async searchPatients(query: string): Promise<ApiResponse<PaginatedResponse<Patient>>> {
    return this.request({
      method: "GET",
      url: "/Patient",
      params: {
        name: query,
      },
    })
  }

  async createPatient(patientData: any): Promise<ApiResponse<Patient>> {
    // Convert to FHIR format
    const fhirPatient = this.convertToFHIRPatient(patientData)

    return this.request({
      method: "POST",
      url: "/Patient",
      data: fhirPatient,
    })
  }

  async updatePatient(patientId: string, patientData: any): Promise<ApiResponse<Patient>> {
    const fhirPatient = this.convertToFHIRPatient(patientData)

    return this.request({
      method: "PUT",
      url: `/Patient/${patientId}`,
      data: fhirPatient,
    })
  }

  // Appointment Management (FHIR R4)
  async getAppointments(date?: string, patientId?: string): Promise<ApiResponse<PaginatedResponse<Appointment>>> {
    const params: any = {}
    if (date) params.date = date
    if (patientId) params.patient = patientId

    return this.request({
      method: "GET",
      url: "/Appointment",
      params,
    })
  }

  async getAppointment(appointmentId: string): Promise<ApiResponse<Appointment>> {
    return this.request({
      method: "GET",
      url: `/Appointment/${appointmentId}`,
    })
  }

  async createAppointment(appointmentData: any): Promise<ApiResponse<Appointment>> {
    const fhirAppointment = this.convertToFHIRAppointment(appointmentData)

    return this.request({
      method: "POST",
      url: "/Appointment",
      data: fhirAppointment,
    })
  }

  // Helper methods to convert between our types and FHIR format
  private convertToFHIRPatient(patient: any): any {
    return {
      resourceType: "Patient",
      name: [
        {
          given: [patient.firstName],
          family: patient.lastName,
        },
      ],
      gender: patient.gender,
      birthDate: patient.dateOfBirth,
      telecom: [
        {
          system: "phone",
          value: patient.phone,
        },
        {
          system: "email",
          value: patient.email,
        },
      ],
      address: patient.address
        ? [
            {
              line: [patient.address.street],
              city: patient.address.city,
              state: patient.address.state,
              postalCode: patient.address.zipCode,
              country: patient.address.country,
            },
          ]
        : [],
    }
  }

  private convertToFHIRAppointment(appointment: any): any {
    return {
      resourceType: "Appointment",
      status: appointment.status,
      serviceType: [
        {
          text: appointment.appointmentType,
        },
      ],
      start: `${appointment.date}T${appointment.time}:00`,
      end: `${appointment.date}T${appointment.time}:00`, // Add duration logic
      participant: [
        {
          actor: {
            reference: `Patient/${appointment.patientId}`,
          },
          status: "accepted",
        },
        {
          actor: {
            reference: `Practitioner/${appointment.providerId}`,
          },
          status: "accepted",
        },
      ],
    }
  }
}
