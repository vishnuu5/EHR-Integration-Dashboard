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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import type { Patient } from "@/lib/types";

const patientSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  // Address
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  // Emergency Contact
  emergencyName: z.string().optional(),
  emergencyRelationship: z.string().optional(),
  emergencyPhone: z.string().optional(),
  // Insurance
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
  groupNumber: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

export function NewPatientForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  const onSubmit = async (data: PatientFormData) => {
    setIsSubmitting(true);
    try {
      // Transform form data to Patient type
      const patientData: Partial<Patient> = {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        address: data.street
          ? {
              street: data.street,
              city: data.city || "",
              state: data.state || "",
              zipCode: data.zipCode || "",
            }
          : undefined,
        emergencyContact: data.emergencyName
          ? {
              name: data.emergencyName,
              relationship: data.emergencyRelationship || "",
              phone: data.emergencyPhone || "",
            }
          : undefined,
        insuranceInfo: data.insuranceProvider
          ? {
              provider: data.insuranceProvider,
              policyNumber: data.policyNumber || "",
              groupNumber: data.groupNumber,
              eligibilityStatus: "active" as const,
            }
          : undefined,
      };

      // Mock API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Patient Created",
        description: `${data.firstName} ${data.lastName} has been successfully added to the system.`,
      });

      router.push("/patients");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create patient record. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="demographics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Demographics</CardTitle>
              <CardDescription>
                Basic patient information and demographics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    placeholder="Enter first name"
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    placeholder="Enter last name"
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...register("dateOfBirth")}
                    className={errors.dateOfBirth ? "border-red-500" : ""}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-sm text-red-600">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("gender", value as "male" | "female" | "other")
                    }
                  >
                    <SelectTrigger
                      className={errors.gender ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-red-600">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Phone, email, and address details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="patient@example.com"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  {...register("street")}
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register("city")}
                    placeholder="New York"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" {...register("state")} placeholder="NY" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    {...register("zipCode")}
                    placeholder="10001"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
              <CardDescription>
                Person to contact in case of emergency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Contact Name</Label>
                  <Input
                    id="emergencyName"
                    {...register("emergencyName")}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyRelationship">Relationship</Label>
                  <Input
                    id="emergencyRelationship"
                    {...register("emergencyRelationship")}
                    placeholder="Spouse"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Phone Number</Label>
                  <Input
                    id="emergencyPhone"
                    {...register("emergencyPhone")}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Information</CardTitle>
              <CardDescription>
                Patient insurance and coverage details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                  <Input
                    id="insuranceProvider"
                    {...register("insuranceProvider")}
                    placeholder="Blue Cross Blue Shield"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Policy Number</Label>
                  <Input
                    id="policyNumber"
                    {...register("policyNumber")}
                    placeholder="ABC123456789"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groupNumber">Group Number</Label>
                  <Input
                    id="groupNumber"
                    {...register("groupNumber")}
                    placeholder="GRP001"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="medical-button"
        >
          {isSubmitting ? "Creating Patient..." : "Create Patient"}
        </Button>
      </div>
    </form>
  );
}
