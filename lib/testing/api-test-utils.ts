// Testing utilities for API integrations
import { integrationManager } from "@/lib/api/integration-manager"
import type { Patient, Appointment } from "@/lib/types"

export class APITestSuite {
  private testResults: Array<{ test: string; passed: boolean; error?: string }> = []

  async runAllTests(): Promise<void> {
    console.log("🧪 Starting EHR API Integration Tests...")

    await this.testPatientOperations()
    await this.testAppointmentOperations()
    await this.testErrorHandling()

    this.printResults()
  }

  private async testPatientOperations(): Promise<void> {
    try {
      // Test getting patients
      const patients = await integrationManager.getPatients()
      this.addResult("Get Patients", patients.length >= 0)

      if (patients.length > 0) {
        // Test getting specific patient
        const patient = await integrationManager.getPatient(patients[0].id)
        this.addResult("Get Patient by ID", !!patient.id)
      }

      // Test creating patient (with mock data)
      const newPatient: Omit<Patient, "id"> = {
        firstName: "Test",
        lastName: "Patient",
        dateOfBirth: "1990-01-01",
        gender: "male",
        email: "test@example.com",
        phone: "555-0123",
        address: {
          street: "123 Test St",
          city: "Test City",
          state: "TS",
          zipCode: "12345",
          country: "US",
        },
        emergencyContact: {
          name: "Emergency Contact",
          relationship: "spouse",
          phone: "555-0124",
        },
        insurance: {
          provider: "Test Insurance",
          policyNumber: "TEST123",
          groupNumber: "GRP001",
        },
        medicalHistory: [],
        allergies: [],
      }

      // Note: This might fail in sandbox environments
      try {
        const createdPatient = await integrationManager.createPatient(newPatient)
        this.addResult("Create Patient", !!createdPatient.id)
      } catch (error) {
        this.addResult("Create Patient", false, "Sandbox limitation")
      }
    } catch (error) {
      this.addResult("Patient Operations", false, error instanceof Error ? error.message : "Unknown error")
    }
  }

  private async testAppointmentOperations(): Promise<void> {
    try {
      // Test getting appointments
      const appointments = await integrationManager.getAppointments()
      this.addResult("Get Appointments", appointments.length >= 0)

      // Test creating appointment (with mock data)
      const newAppointment: Omit<Appointment, "id"> = {
        patientId: "test-patient-id",
        patientName: "Test Patient",
        providerId: "test-provider-id",
        providerName: "Dr. Test",
        appointmentType: "consultation",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        time: "10:00",
        scheduledDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        duration: 30,
        status: "scheduled",
        reason: "Test appointment",
        location: "Test Clinic",
        notes: "Test appointment notes",
      }

      try {
        const createdAppointment = await integrationManager.createAppointment(newAppointment)
        this.addResult("Create Appointment", !!createdAppointment.id)
      } catch (error) {
        this.addResult("Create Appointment", false, "Sandbox limitation")
      }
    } catch (error) {
      this.addResult("Appointment Operations", false, error instanceof Error ? error.message : "Unknown error")
    }
  }

  private async testErrorHandling(): Promise<void> {
    try {
      // Test invalid patient ID
      try {
        await integrationManager.getPatient("invalid-id")
        this.addResult("Error Handling - Invalid ID", false, "Should have thrown error")
      } catch (error) {
        this.addResult("Error Handling - Invalid ID", true)
      }
    } catch (error) {
      this.addResult("Error Handling", false, error instanceof Error ? error.message : "Unknown error")
    }
  }

  private addResult(test: string, passed: boolean, error?: string): void {
    this.testResults.push({ test, passed, error })
  }

  private printResults(): void {
    console.log("\n📊 Test Results:")
    console.log("================")

    let passed = 0
    let failed = 0

    this.testResults.forEach((result) => {
      const status = result.passed ? "✅ PASS" : "❌ FAIL"
      const errorMsg = result.error ? ` (${result.error})` : ""
      console.log(`${status} ${result.test}${errorMsg}`)

      if (result.passed) passed++
      else failed++
    })

    console.log(`\n📈 Summary: ${passed} passed, ${failed} failed`)
    console.log(`Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`)
  }

  getResults() {
    return this.testResults
  }
}

// Mock data generators for testing
export const generateMockPatient = (): Omit<Patient, "id"> => ({
  firstName: `Test${Math.floor(Math.random() * 1000)}`,
  lastName: "Patient",
  dateOfBirth: "1990-01-01",
  gender: "male",
  email: `test${Math.floor(Math.random() * 1000)}@example.com`,
  phone: "555-0123",
  address: {
    street: "123 Test St",
    city: "Test City",
    state: "TS",
    zipCode: "12345",
    country: "US",
  },
  emergencyContact: {
    name: "Emergency Contact",
    relationship: "spouse",
    phone: "555-0124",
  },
  insurance: {
    provider: "Test Insurance",
    policyNumber: `TEST${Math.floor(Math.random() * 1000)}`,
    groupNumber: "GRP001",
  },
  medicalHistory: [],
  allergies: [],
})

export const generateMockAppointment = (patientId: string): Omit<Appointment, "id"> => ({
  patientId,
  patientName: "Test Patient",
  providerId: "test-provider-id",
  providerName: "Dr. Test",
  appointmentType: "consultation",
  date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  time: "10:00",
  scheduledDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  duration: 30,
  status: "scheduled",
  reason: "Test appointment",
  location: "Test Clinic",
  notes: "Test appointment notes",
})

export const apiTestSuite = new APITestSuite()
