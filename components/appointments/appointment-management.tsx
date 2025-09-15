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
import { AppointmentCalendar } from "./appointment-calendar";
import { AppointmentList } from "./appointment-list";
import { AppointmentStats } from "./appointment-stats";
import { ProviderSchedule } from "./provider-schedule";
import {
  PlusIcon,
  CalendarIcon,
  ListBulletIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export function AppointmentManagement() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<"calendar" | "list">(
    "calendar"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Appointment Scheduling
          </h1>
          <p className="text-gray-600">
            Schedule, manage, and track patient appointments
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/appointments/new">
            <Button className="medical-button">
              <PlusIcon className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <AppointmentStats />

      {/* Main Content */}
      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            Provider Schedule
          </TabsTrigger>
          <TabsTrigger value="availability" className="flex items-center gap-2">
            <UserGroupIcon className="h-4 w-4" />
            Availability
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Appointment Overview</CardTitle>
                  <CardDescription>
                    View and manage patient appointments
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={
                      selectedView === "calendar" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedView("calendar")}
                    className={
                      selectedView === "calendar"
                        ? "medical-button"
                        : "bg-transparent"
                    }
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Calendar
                  </Button>
                  <Button
                    variant={selectedView === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedView("list")}
                    className={
                      selectedView === "list"
                        ? "medical-button"
                        : "bg-transparent"
                    }
                  >
                    <ListBulletIcon className="h-4 w-4 mr-2" />
                    List
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selectedView === "calendar" ? (
                <AppointmentCalendar
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
              ) : (
                <AppointmentList selectedDate={selectedDate} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <ProviderSchedule />
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Provider Availability</CardTitle>
              <CardDescription>
                Check real-time provider availability for scheduling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Provider availability checking will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
