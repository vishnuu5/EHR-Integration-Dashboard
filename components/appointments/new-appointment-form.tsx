"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { usePatients } from "@/hooks/use-patients";
import { useProviders } from "@/hooks/use-providers";
import { format, addDays } from "date-fns";

const appointmentSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),
  providerId: z.string().min(1, "Provider is required"),
  appointmentType: z.string().min(1, "Appointment type is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.number().min(15, "Duration must be at least 15 minutes"),
  reason: z.string().optional(),
  notes: z.string().optional(),
  location: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const appointmentTypes = [
  "Consultation",
  "Follow-up",
  "Physical Exam",
  "Procedure",
  "Lab Work",
  "Imaging",
  "Therapy",
  "Emergency",
];

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export function NewAppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const { patients } = usePatients({ limit: 100 });
  const { providers } = useProviders();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      duration: 30,
    },
  });

  const watchedDate = watch("date");
  const watchedProvider = watch("providerId");

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    try {
      // Mock API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Appointment Scheduled",
        description: "The appointment has been successfully scheduled.",
      });

      router.push("/appointments");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate available dates (next 30 days, excluding weekends for demo)
  const availableDates = Array.from({ length: 30 }, (_, i) => {
    const date = addDays(new Date(), i + 1);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return null; // Skip weekends
    return date;
  }).filter(Boolean) as Date[];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient and Provider Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Patient & Provider</CardTitle>
            <CardDescription>
              Select the patient and healthcare provider
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient *</Label>
              <Select
                value={selectedPatient}
                onValueChange={(value) => {
                  setSelectedPatient(value);
                  setValue("patientId", value);
                }}
              >
                <SelectTrigger
                  className={errors.patientId ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients?.data?.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.firstName} {patient.lastName} - {patient.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.patientId && (
                <p className="text-sm text-red-600">
                  {errors.patientId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="providerId">Provider *</Label>
              <Select
                value={selectedProvider}
                onValueChange={(value) => {
                  setSelectedProvider(value);
                  setValue("providerId", value);
                }}
              >
                <SelectTrigger
                  className={errors.providerId ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers?.data?.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      Dr. {provider.firstName} {provider.lastName} -{" "}
                      {provider.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.providerId && (
                <p className="text-sm text-red-600">
                  {errors.providerId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointmentType">Appointment Type *</Label>
              <Select
                onValueChange={(value) => setValue("appointmentType", value)}
              >
                <SelectTrigger
                  className={errors.appointmentType ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.appointmentType && (
                <p className="text-sm text-red-600">
                  {errors.appointmentType.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Date and Time Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Date & Time</CardTitle>
            <CardDescription>
              Choose the appointment date and time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Select
                value={selectedDate}
                onValueChange={(value) => {
                  setSelectedDate(value);
                  setValue("date", value);
                }}
              >
                <SelectTrigger className={errors.date ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a date" />
                </SelectTrigger>
                <SelectContent>
                  {availableDates.map((date) => (
                    <SelectItem
                      key={date.toISOString()}
                      value={format(date, "yyyy-MM-dd")}
                    >
                      {format(date, "EEEE, MMMM d, yyyy")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.date && (
                <p className="text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Select onValueChange={(value) => setValue("time", value)}>
                <SelectTrigger className={errors.time ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.time && (
                <p className="text-sm text-red-600">{errors.time.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes) *</Label>
              <Select
                onValueChange={(value) =>
                  setValue("duration", Number.parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="Main Office, Room 101"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>
            Reason for visit and any special notes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Visit</Label>
            <Input
              id="reason"
              {...register("reason")}
              placeholder="Annual checkup, follow-up, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Any special instructions or notes for this appointment"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Availability Check */}
      {watchedDate && watchedProvider && (
        <Card>
          <CardHeader>
            <CardTitle>Provider Availability</CardTitle>
            <CardDescription>
              Checking availability for selected date and provider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">
                Provider is available on selected date
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="medical-button"
        >
          {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
        </Button>
      </div>
    </form>
  );
}
