// Integration manager for coordinating multiple EHR systems
import { DrChronoApiClient } from "./drchrono";
import { EpicFHIRApiClient } from "./epic";
import { authManager } from "./auth";
import type { Patient, Appointment } from "@/lib/types";

export type EHRProvider = "drchrono" | "epic";

export interface EHRConfig {
  provider: EHRProvider;
  credentials: {
    clientId?: string;
    clientSecret?: string;
    username?: string;
    password?: string;
    baseUrl: string;
  };
}

export class IntegrationManager {
  private drchronoClient?: DrChronoApiClient;
  private epicClient?: EpicFHIRApiClient;
  private activeProvider: EHRProvider = "drchrono";

  async initialize(configs: EHRConfig[]) {
    for (const config of configs) {
      await this.setupProvider(config);
    }
  }

  private async setupProvider(config: EHRConfig) {
    try {
      switch (config.provider) {
        case "drchrono":
          if (config.credentials.clientId && config.credentials.clientSecret) {
            await authManager.authenticateDrChrono(
              config.credentials.clientId,
              config.credentials.clientSecret
            );
            this.drchronoClient = new DrChronoApiClient();
          }
          break;

        case "epic":
          if (config.credentials.username && config.credentials.password) {
            await authManager.authenticateEpic(
              config.credentials.username,
              config.credentials.password
            );
            this.epicClient = new EpicFHIRApiClient();
          }
          break;
      }
    } catch (error) {
      console.error(`Failed to setup ${config.provider}:`, error);
    }
  }

  setActiveProvider(provider: EHRProvider) {
    this.activeProvider = provider;
  }

  getActiveProvider(): EHRProvider {
    return this.activeProvider;
  }

  // Unified patient operations
  async getPatients(): Promise<Patient[]> {
    const client = this.getActiveClient();
    if (!client) throw new Error("No active EHR client");

    return client.getPatients();
  }

  async getPatient(id: string): Promise<Patient> {
    const client = this.getActiveClient();
    if (!client) throw new Error("No active EHR client");

    return client.getPatient(id);
  }

  async createPatient(patient: Omit<Patient, "id">): Promise<Patient> {
    const client = this.getActiveClient();
    if (!client) throw new Error("No active EHR client");

    return client.createPatient(patient);
  }

  async updatePatient(id: string, patient: Partial<Patient>): Promise<Patient> {
    const client = this.getActiveClient();
    if (!client) throw new Error("No active EHR client");

    return client.updatePatient(id, patient);
  }

  // Unified appointment operations
  async getAppointments(): Promise<Appointment[]> {
    const client = this.getActiveClient();
    if (!client) throw new Error("No active EHR client");

    return client.getAppointments();
  }

  async createAppointment(
    appointment: Omit<Appointment, "id">
  ): Promise<Appointment> {
    const client = this.getActiveClient();
    if (!client) throw new Error("No active EHR client");

    return client.createAppointment(appointment);
  }

  private getActiveClient() {
    switch (this.activeProvider) {
      case "drchrono":
        return this.drchronoClient;
      case "epic":
        return this.epicClient;
      default:
        return null;
    }
  }

  // Health check for all providers
  async healthCheck(): Promise<Record<EHRProvider, boolean>> {
    const results: Record<EHRProvider, boolean> = {
      drchrono: false,
      epic: false,
    };

    if (this.drchronoClient) {
      try {
        await this.drchronoClient.getPatients();
        results.drchrono = true;
      } catch (error) {
        console.error("DrChrono health check failed:", error);
      }
    }

    if (this.epicClient) {
      try {
        await this.epicClient.getPatients();
        results.epic = true;
      } catch (error) {
        console.error("Epic health check failed:", error);
      }
    }

    return results;
  }
}

export const integrationManager = new IntegrationManager();
