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
import { Button } from "@/components/ui/button";

const clinicalNoteSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),
  noteType: z.enum(["progress", "consultation", "discharge", "procedure"]),
  subject: z.string().min(1, "Subject is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

type ClinicalNoteFormData = z.infer<typeof clinicalNoteSchema>;

const noteTypes = [
  { value: "progress", label: "Progress Note" },
  { value: "consultation", label: "Consultation" },
  { value: "discharge", label: "Discharge Summary" },
  { value: "procedure", label: "Procedure Note" },
];

export function NewClinicalNoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClinicalNoteFormData>({
    resolver: zodResolver(clinicalNoteSchema),
  });

  const onSubmit = async (data: ClinicalNoteFormData) => {
    setIsSubmitting(true);
    try {
      // Mock API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Clinical Note Created",
        description: "The clinical note has been successfully created.",
      });

      router.push("/clinical");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create clinical note. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Clinical Note Information</CardTitle>
          <CardDescription>
            Enter the basic information for the clinical note
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient *</Label>
              <Select onValueChange={(value) => setValue("patientId", value)}>
                <SelectTrigger
                  className={errors.patientId ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">John Doe - ID: 001</SelectItem>
                  <SelectItem value="2">Sarah Johnson - ID: 002</SelectItem>
                  <SelectItem value="3">Michael Brown - ID: 003</SelectItem>
                </SelectContent>
              </Select>
              {errors.patientId && (
                <p className="text-sm text-red-600">
                  {errors.patientId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="noteType">Note Type *</Label>
              <Select
                onValueChange={(value) => setValue("noteType", value as any)}
              >
                <SelectTrigger
                  className={errors.noteType ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select note type" />
                </SelectTrigger>
                <SelectContent>
                  {noteTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.noteType && (
                <p className="text-sm text-red-600">
                  {errors.noteType.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              {...register("subject")}
              placeholder="Brief description of the note"
              className={errors.subject ? "border-red-500" : ""}
            />
            {errors.subject && (
              <p className="text-sm text-red-600">{errors.subject.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clinical Content</CardTitle>
          <CardDescription>
            Document clinical findings, observations, and plans
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Clinical Note Content *</Label>
            <Textarea
              id="content"
              {...register("content")}
              placeholder="Enter detailed clinical documentation..."
              rows={12}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && (
              <p className="text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              Documentation Guidelines
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Include objective findings and observations</li>
              <li>• Document patient's subjective complaints</li>
              <li>• Provide assessment and clinical impression</li>
              <li>• Outline treatment plan and follow-up instructions</li>
              <li>• Use clear, professional medical terminology</li>
              <li>• Include relevant vital signs and test results</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/clinical")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Clinical Note"}
        </Button>
      </div>
    </form>
  );
}
