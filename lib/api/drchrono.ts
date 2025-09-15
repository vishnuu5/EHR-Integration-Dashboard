import { BaseApiClient } from "./base";
import type {
  Patient,
  Appointment,
  Provider,
  ApiResponse,
  PaginatedResponse,
} from "@/lib/types";

export class DrChronoApiClient extends BaseApiClient {
  constructor() {
    super(process.env.DRCHRONO_BASE_URL || "https://drchrono.com/api/", {
      Accept: "application/json",
    });
  }

  // Authentication
  async authenticate(
    clientId: string,
    clientSecret: string
  ): Promise<ApiResponse<{ access_token: string }>> {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    });

    return this.request({
      method: "POST",
      url: "/o/token/",
      data: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  // Patient Management
  async getPatients(
    page = 1,
    limit = 20
  ): Promise<ApiResponse<PaginatedResponse<Patient>>> {
    return this.request({
      method: "GET",
      url: "/patients",
      params: { page, page_size: limit },
    });
  }

  async getPatient(patientId: string): Promise<ApiResponse<Patient>> {
    return this.request({
      method: "GET",
      url: `/patients/${patientId}`,
    });
  }

  async createPatient(
    patientData: Partial<Patient>
  ): Promise<ApiResponse<Patient>> {
    return this.request({
      method: "POST",
      url: "/patients",
      data: patientData,
    });
  }

  async updatePatient(
    patientId: string,
    patientData: Partial<Patient>
  ): Promise<ApiResponse<Patient>> {
    return this.request({
      method: "PATCH",
      url: `/patients/${patientId}`,
      data: patientData,
    });
  }

  async deletePatient(patientId: string): Promise<ApiResponse<void>> {
    return this.request({
      method: "DELETE",
      url: `/patients/${patientId}`,
    });
  }

  // Appointment Management
  async getAppointments(
    date?: string,
    patientId?: string
  ): Promise<ApiResponse<PaginatedResponse<Appointment>>> {
    const params: any = {};
    if (date) params.date = date;
    if (patientId) params.patient = patientId;

    return this.request({
      method: "GET",
      url: "/appointments",
      params,
    });
  }

  async getAppointment(
    appointmentId: string
  ): Promise<ApiResponse<Appointment>> {
    return this.request({
      method: "GET",
      url: `/appointments/${appointmentId}`,
    });
  }

  async createAppointment(
    appointmentData: Partial<Appointment>
  ): Promise<ApiResponse<Appointment>> {
    return this.request({
      method: "POST",
      url: "/appointments",
      data: appointmentData,
    });
  }

  async updateAppointment(
    appointmentId: string,
    appointmentData: Partial<Appointment>
  ): Promise<ApiResponse<Appointment>> {
    return this.request({
      method: "PATCH",
      url: `/appointments/${appointmentId}`,
      data: appointmentData,
    });
  }

  async cancelAppointment(appointmentId: string): Promise<ApiResponse<void>> {
    return this.request({
      method: "PATCH",
      url: `/appointments/${appointmentId}`,
      data: { status: "cancelled" },
    });
  }

  // Provider Management
  async getProviders(): Promise<ApiResponse<PaginatedResponse<Provider>>> {
    return this.request({
      method: "GET",
      url: "/doctors",
    });
  }

  async getProvider(providerId: string): Promise<ApiResponse<Provider>> {
    return this.request({
      method: "GET",
      url: `/doctors/${providerId}`,
    });
  }
}
