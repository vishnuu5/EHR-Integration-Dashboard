"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PencilIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePatient } from "@/hooks/use-patient";
import { formatDate, calculateAge } from "@/lib/utils";

interface PatientDetailsProps {
  patientId: string;
}

export function PatientDetails({ patientId }: PatientDetailsProps) {
  const { patient, isLoading, error } = usePatient(patientId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="lg:col-span-2">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error loading patient details</p>
        <Link href="/patients">
          <Button variant="outline">Back to Patients</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {patient.firstName} {patient.lastName}
          </h1>
          <p className="text-gray-600">Patient ID: {patient.id}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/patients/${patient.id}/edit`}>
            <Button className="medical-button">
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit Patient
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Patient Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-medical-primary text-white text-xl">
                    {patient.firstName.charAt(0)}
                    {patient.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">
                    {patient.firstName} {patient.lastName}
                  </h3>
                  <p className="text-gray-600">
                    {calculateAge(patient.dateOfBirth)} years old
                  </p>
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800 mt-1"
                  >
                    Active Patient
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">Demographics</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Born: {formatDate(patient.dateOfBirth)}</p>
                    <p>
                      Gender:{" "}
                      {patient.gender.charAt(0).toUpperCase() +
                        patient.gender.slice(1)}
                    </p>
                  </div>
                </div>

                {patient.phone && (
                  <div className="flex items-center space-x-2 text-sm">
                    <PhoneIcon className="h-4 w-4 text-gray-400" />
                    <span>{patient.phone}</span>
                  </div>
                )}

                {patient.email && (
                  <div className="flex items-center space-x-2 text-sm">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                    <span>{patient.email}</span>
                  </div>
                )}

                {patient.address && (
                  <div className="flex items-start space-x-2 text-sm">
                    <MapPinIcon className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p>{patient.address.street}</p>
                      <p>
                        {patient.address.city}, {patient.address.state}{" "}
                        {patient.address.zipCode}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          {patient.emergencyContact && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{patient.emergencyContact.name}</p>
                  <p className="text-sm text-gray-600">
                    {patient.emergencyContact.relationship}
                  </p>
                  <p className="text-sm">{patient.emergencyContact.phone}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Insurance Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Insurance Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {patient.insuranceInfo ? (
                      <div className="space-y-2">
                        <p className="font-medium">
                          {patient.insuranceInfo.provider}
                        </p>
                        <p className="text-sm text-gray-600">
                          Policy: {patient.insuranceInfo.policyNumber}
                        </p>
                        {patient.insuranceInfo.groupNumber && (
                          <p className="text-sm text-gray-600">
                            Group: {patient.insuranceInfo.groupNumber}
                          </p>
                        )}
                        <Badge
                          variant={
                            patient.insuranceInfo.eligibilityStatus === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {patient.insuranceInfo.eligibilityStatus}
                        </Badge>
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        No insurance information on file
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">
                            Appointment scheduled
                          </p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">
                            Lab results received
                          </p>
                          <p className="text-xs text-gray-500">1 week ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">
                            Insurance updated
                          </p>
                          <p className="text-xs text-gray-500">2 weeks ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="medical" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Allergies */}
                <Card>
                  <CardHeader>
                    <CardTitle>Allergies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {patient.allergies && patient.allergies.length > 0 ? (
                      <div className="space-y-2">
                        {patient.allergies.map((allergy) => (
                          <div
                            key={allergy.id}
                            className="flex items-center justify-between"
                          >
                            <span className="font-medium">
                              {allergy.allergen}
                            </span>
                            <Badge
                              variant={
                                allergy.severity === "severe"
                                  ? "destructive"
                                  : allergy.severity === "moderate"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {allergy.severity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No known allergies</p>
                    )}
                  </CardContent>
                </Card>

                {/* Current Medications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Current Medications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {patient.medications && patient.medications.length > 0 ? (
                      <div className="space-y-3">
                        {patient.medications
                          .filter((med) => med.status === "active")
                          .map((medication) => (
                            <div
                              key={medication.id}
                              className="border-l-4 border-medical-primary pl-3"
                            >
                              <p className="font-medium">{medication.name}</p>
                              <p className="text-sm text-gray-600">
                                {medication.dosage} - {medication.frequency}
                              </p>
                              <p className="text-xs text-gray-500">
                                Prescribed by {medication.prescribedBy}
                              </p>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No current medications</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Medical History */}
              <Card>
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.medicalHistory &&
                  patient.medicalHistory.length > 0 ? (
                    <div className="space-y-3">
                      {patient.medicalHistory.map((condition) => (
                        <div
                          key={condition.id}
                          className="flex items-start justify-between"
                        >
                          <div>
                            <p className="font-medium">{condition.condition}</p>
                            <p className="text-sm text-gray-600">
                              Diagnosed: {formatDate(condition.diagnosisDate)}
                            </p>
                            {condition.notes && (
                              <p className="text-sm text-gray-500 mt-1">
                                {condition.notes}
                              </p>
                            )}
                          </div>
                          <Badge
                            variant={
                              condition.status === "active"
                                ? "default"
                                : condition.status === "chronic"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {condition.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No medical history recorded</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment History</CardTitle>
                  <CardDescription>
                    Past and upcoming appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Appointment history will be displayed here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>
                    Payment history and outstanding balances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Billing information will be displayed here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Documents</CardTitle>
                  <CardDescription>
                    Medical records, forms, and other documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Patient documents will be displayed here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
