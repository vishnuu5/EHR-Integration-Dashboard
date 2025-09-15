import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import type { ApiResponse } from "@/lib/types";

export class BaseApiClient {
  protected client: AxiosInstance;

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders,
      },
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(
          `API Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error) => {
        console.error("API Request Error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error(
          "API Response Error:",
          error.response?.data || error.message
        );
        return Promise.reject(error);
      }
    );
  }

  protected async request<T>(
    config: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.request<T>(config);
      return {
        success: true,
        data: response.data,
        message: "Request successful",
      };
    } catch (error: any) {
      return {
        success: false,
        error:
          error.response?.data?.message || error.message || "An error occurred",
        message: "Request failed",
      };
    }
  }

  public setAuthToken(token: string) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  public removeAuthToken() {
    delete this.client.defaults.headers.common["Authorization"];
  }
}
