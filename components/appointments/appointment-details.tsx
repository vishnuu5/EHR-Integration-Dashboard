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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PencilIcon,
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAppointment } from "@/hooks/use-appointment";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface AppointmentDetailsProps {
  appointmentId: string;
}

export function AppointmentDetails({ appointmentId }: AppointmentDetailsProps) {
  const { appointment, isLoading, error, mutate } =
    useAppointment(appointmentId);
  const { toast } = useToast();

  const handleStatusChange = async (newStatus: string) => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Status Updated",
        description: `Appointment status changed to ${newStatus}.`,
      });
      mutate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update appointment status.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
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

  if (error || !appointment) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error loading appointment details</p>
        <Link href="/appointments">
          <Button variant="outline">Back to Appointments</Button>
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "no-show":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Appointment Details
          </h1>
          <p className="text-gray-600">
            {format(new Date(appointment.date), "EEEE, MMMM d, yyyy")} at{" "}
            {appointment.time}
          </p>
        </div>
        <div className="flex gap-2">
          {appointment.status !== "completed" &&
            appointment.status !== "cancelled" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("confirmed")}
                  className="bg-transparent"
                >
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Confirm
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("cancelled")}
                  className="bg-transparent text-red-600 hover:text-red-700"
                >
                  <XMarkIcon className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          <Link href={`/appointments/${appointment.id}/edit`}>
            <Button className="medical-button">
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointment Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                <Badge className={getStatusColor(appointment.status)}>
                  {appointment.status}
                </Badge>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Patient</h4>
                <p className="text-gray-600">{appointment.patientName}</p>
                <p className="text-sm text-gray-500">
                  ID: {appointment.patientId}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Provider</h4>
                <p className="text-gray-600">Dr. {appointment.providerName}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Type</h4>
                <p className="text-gray-600">{appointment.appointmentType}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Duration</h4>
                <p className="text-gray-600">{appointment.duration} minutes</p>
              </div>

              {appointment.location && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                  <p className="text-gray-600">{appointment.location}</p>
                </div>
              )}

              {appointment.reason && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Reason</h4>
                  <p className="text-gray-600">{appointment.reason}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Date & Time
                      </h4>
                      <p className="text-gray-600">
                        {format(new Date(appointment.date), "MMMM d, yyyy")}
                      </p>
                      <p className="text-gray-600">{appointment.time}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Duration
                      </h4>
                      <p className="text-gray-600">
                        {appointment.duration} minutes
                      </p>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                      <p className="text-gray-600">{appointment.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Clinical Notes</CardTitle>
                  <CardDescription>
                    Notes and observations from the appointment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    No clinical notes recorded yet
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment History</CardTitle>
                  <CardDescription>
                    Previous appointments and changes
                  </CardDescription>
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
                          Patient confirmed attendance
                        </p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>
                    Charges and payment information for this appointment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Billing information will be available after the appointment
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
