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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicalStats } from "./clinical-stats";
import { VitalSignsManager } from "./vital-signs-manager";
import { ClinicalNotesManager } from "./clinical-notes-manager";
import { LabResultsManager } from "./lab-results-manager";
import { MedicationManager } from "./medication-manager";
import {
  PlusIcon,
  HeartIcon,
  DocumentTextIcon,
  BeakerIcon,
  CubeIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export function ClinicalOperations() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Clinical Operations
          </h1>
          <p className="text-gray-600">
            Manage clinical data, vital signs, lab results, and medical records
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/clinical/notes/new">
            <Button className="medical-button">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Clinical Note
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <ClinicalStats />

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <ChartBarIcon className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="vitals" className="flex items-center gap-2">
            <HeartIcon className="h-4 w-4" />
            Vital Signs
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <DocumentTextIcon className="h-4 w-4" />
            Clinical Notes
          </TabsTrigger>
          <TabsTrigger value="labs" className="flex items-center gap-2">
            <BeakerIcon className="h-4 w-4" />
            Lab Results
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center gap-2">
            <CubeIcon className="h-4 w-4" />
            Medications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Clinical Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Clinical Activity</CardTitle>
                <CardDescription>
                  Latest clinical updates and actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "vital",
                      message: "Vital signs recorded for John Doe",
                      time: "15 minutes ago",
                      status: "success",
                    },
                    {
                      type: "lab",
                      message: "Lab results available for Sarah Johnson",
                      time: "1 hour ago",
                      status: "info",
                    },
                    {
                      type: "note",
                      message: "Clinical note added for Michael Brown",
                      time: "2 hours ago",
                      status: "success",
                    },
                    {
                      type: "medication",
                      message: "Medication updated for Emily Davis",
                      time: "3 hours ago",
                      status: "warning",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                          activity.status === "success"
                            ? "bg-green-500"
                            : activity.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Critical Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Critical Alerts</CardTitle>
                <CardDescription>
                  Important clinical alerts requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <p className="text-sm font-medium text-red-800">
                        Critical Lab Value
                      </p>
                    </div>
                    <p className="text-sm text-red-700 mt-1">
                      Patient ID: 12345 - Glucose level: 450 mg/dL
                    </p>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <p className="text-sm font-medium text-yellow-800">
                        Medication Interaction
                      </p>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      Patient ID: 67890 - Drug interaction detected
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-sm font-medium text-blue-800">
                        Overdue Vital Signs
                      </p>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      5 patients have overdue vital sign measurements
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Clinical Actions</CardTitle>
              <CardDescription>
                Common clinical tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col space-y-2 bg-transparent"
                  onClick={() => setActiveTab("vitals")}
                >
                  <HeartIcon className="h-6 w-6" />
                  <span>Record Vitals</span>
                </Button>

                <Link href="/clinical/notes/new">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col space-y-2 bg-transparent"
                  >
                    <DocumentTextIcon className="h-6 w-6" />
                    <span>Add Note</span>
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col space-y-2 bg-transparent"
                  onClick={() => setActiveTab("labs")}
                >
                  <BeakerIcon className="h-6 w-6" />
                  <span>View Labs</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col space-y-2 bg-transparent"
                  onClick={() => setActiveTab("medications")}
                >
                  <CubeIcon className="h-6 w-6" />
                  <span>Manage Meds</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <VitalSignsManager />
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <ClinicalNotesManager />
        </TabsContent>

        <TabsContent value="labs" className="space-y-4">
          <LabResultsManager />
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <MedicationManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
