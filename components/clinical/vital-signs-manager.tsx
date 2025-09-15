"use client";

import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useVitalSigns } from "@/hooks/use-vital-signs";
import { format } from "date-fns";

export function VitalSignsManager() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [vitalData, setVitalData] = useState({
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
    temperature: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    weight: "",
    height: "",
  });

  const { vitalSigns, isLoading, mutate } = useVitalSigns();
  const { toast } = useToast();

  const handleRecordVitals = async () => {
    if (!selectedPatient) {
      toast({
        title: "Error",
        description: "Please select a patient first.",
        variant: "destructive",
      });
      return;
    }

    setIsRecording(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Vital Signs Recorded",
        description: "Vital signs have been successfully recorded.",
      });

      // Reset form
      setVitalData({
        bloodPressureSystolic: "",
        bloodPressureDiastolic: "",
        heartRate: "",
        temperature: "",
        respiratoryRate: "",
        oxygenSaturation: "",
        weight: "",
        height: "",
      });
      setSelectedPatient("");
      mutate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record vital signs.",
        variant: "destructive",
      });
    } finally {
      setIsRecording(false);
    }
  };

  const getVitalStatus = (vital: any, type: string) => {
    // Mock vital sign status logic
    if (type === "bloodPressure") {
      const systolic = vital.bloodPressureSystolic;
      const diastolic = vital.bloodPressureDiastolic;
      if (systolic > 140 || diastolic > 90) return "high";
      if (systolic < 90 || diastolic < 60) return "low";
      return "normal";
    }
    if (type === "heartRate") {
      if (vital.heartRate > 100) return "high";
      if (vital.heartRate < 60) return "low";
      return "normal";
    }
    return "normal";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "bg-red-100 text-red-800";
      case "low":
        return "bg-yellow-100 text-yellow-800";
      case "normal":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Record New Vital Signs */}
      <Card>
        <CardHeader>
          <CardTitle>Record Vital Signs</CardTitle>
          <CardDescription>Enter vital signs for a patient</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Patient</Label>
              <Select
                value={selectedPatient}
                onValueChange={setSelectedPatient}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">John Doe - ID: 001</SelectItem>
                  <SelectItem value="2">Sarah Johnson - ID: 002</SelectItem>
                  <SelectItem value="3">Michael Brown - ID: 003</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systolic">Blood Pressure (Systolic)</Label>
              <Input
                id="systolic"
                type="number"
                placeholder="120"
                value={vitalData.bloodPressureSystolic}
                onChange={(e) =>
                  setVitalData({
                    ...vitalData,
                    bloodPressureSystolic: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diastolic">Blood Pressure (Diastolic)</Label>
              <Input
                id="diastolic"
                type="number"
                placeholder="80"
                value={vitalData.bloodPressureDiastolic}
                onChange={(e) =>
                  setVitalData({
                    ...vitalData,
                    bloodPressureDiastolic: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
              <Input
                id="heartRate"
                type="number"
                placeholder="72"
                value={vitalData.heartRate}
                onChange={(e) =>
                  setVitalData({ ...vitalData, heartRate: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°F)</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                placeholder="98.6"
                value={vitalData.temperature}
                onChange={(e) =>
                  setVitalData({ ...vitalData, temperature: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="respiratory">Respiratory Rate</Label>
              <Input
                id="respiratory"
                type="number"
                placeholder="16"
                value={vitalData.respiratoryRate}
                onChange={(e) =>
                  setVitalData({
                    ...vitalData,
                    respiratoryRate: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="oxygen">Oxygen Saturation (%)</Label>
              <Input
                id="oxygen"
                type="number"
                placeholder="98"
                value={vitalData.oxygenSaturation}
                onChange={(e) =>
                  setVitalData({
                    ...vitalData,
                    oxygenSaturation: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="150"
                value={vitalData.weight}
                onChange={(e) =>
                  setVitalData({ ...vitalData, weight: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (inches)</Label>
              <Input
                id="height"
                type="number"
                placeholder="68"
                value={vitalData.height}
                onChange={(e) =>
                  setVitalData({ ...vitalData, height: e.target.value })
                }
              />
            </div>
          </div>

          <Button
            onClick={handleRecordVitals}
            disabled={isRecording}
            className="medical-button"
          >
            {isRecording ? "Recording..." : "Record Vital Signs"}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Vital Signs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Vital Signs</CardTitle>
          <CardDescription>Latest vital sign measurements</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Blood Pressure</TableHead>
                    <TableHead>Heart Rate</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Oxygen Sat</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vitalSigns?.data?.map((vital) => (
                    <TableRow key={vital.id}>
                      <TableCell className="font-medium">John Doe</TableCell>
                      <TableCell>
                        {format(
                          new Date(vital.recordedDate),
                          "MMM d, yyyy HH:mm"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>
                            {vital.bloodPressureSystolic}/
                            {vital.bloodPressureDiastolic}
                          </span>
                          <Badge
                            className={getStatusColor(
                              getVitalStatus(vital, "bloodPressure")
                            )}
                          >
                            {getVitalStatus(vital, "bloodPressure")}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{vital.heartRate} bpm</span>
                          <Badge
                            className={getStatusColor(
                              getVitalStatus(vital, "heartRate")
                            )}
                          >
                            {getVitalStatus(vital, "heartRate")}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{vital.temperature}°F</TableCell>
                      <TableCell>{vital.oxygenSaturation}%</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          Normal
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
