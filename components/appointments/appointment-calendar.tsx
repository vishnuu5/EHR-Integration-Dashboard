"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useAppointments } from "@/hooks/use-appointments";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isToday,
} from "date-fns";
import { cn } from "@/lib/utils";

interface AppointmentCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function AppointmentCalendar({
  selectedDate,
  onDateSelect,
}: AppointmentCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);
  const { appointments, isLoading } = useAppointments({
    startDate: format(startOfMonth(currentMonth), "yyyy-MM-dd"),
    endDate: format(endOfMonth(currentMonth), "yyyy-MM-dd"),
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get first day of the week for the month (to show previous month days)
  const calendarStart = new Date(monthStart);
  calendarStart.setDate(calendarStart.getDate() - monthStart.getDay());

  // Get last day of the week for the month (to show next month days)
  const calendarEnd = new Date(monthEnd);
  calendarEnd.setDate(calendarEnd.getDate() + (6 - monthEnd.getDay()));

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const getAppointmentsForDate = (date: Date) => {
    if (!appointments?.data) return [];
    return appointments.data.filter((apt) =>
      isSameDay(new Date(apt.date), date)
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(
      currentMonth.getMonth() + (direction === "next" ? 1 : -1)
    );
    setCurrentMonth(newMonth);
  };

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

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(35)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("prev")}
            className="bg-transparent"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("next")}
            className="bg-transparent"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {calendarDays.map((day) => {
          const dayAppointments = getAppointmentsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-[100px] p-1 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors",
                !isCurrentMonth && "bg-gray-50 text-gray-400",
                isSelected && "ring-2 ring-medical-primary",
                isCurrentDay && "bg-blue-50"
              )}
              onClick={() => onDateSelect(day)}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={cn(
                    "text-sm font-medium",
                    isCurrentDay &&
                      "bg-medical-primary text-white rounded-full w-6 h-6 flex items-center justify-center"
                  )}
                >
                  {format(day, "d")}
                </span>
                {dayAppointments.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {dayAppointments.length}
                  </Badge>
                )}
              </div>

              {/* Appointments for the day */}
              <div className="space-y-1">
                {dayAppointments.slice(0, 3).map((appointment) => (
                  <div
                    key={appointment.id}
                    className={cn(
                      "text-xs p-1 rounded truncate",
                      getStatusColor(appointment.status),
                      "cursor-pointer hover:opacity-80"
                    )}
                    title={`${appointment.time} - ${appointment.patientName} (${appointment.appointmentType})`}
                  >
                    <div className="font-medium">{appointment.time}</div>
                    <div className="truncate">{appointment.patientName}</div>
                  </div>
                ))}
                {dayAppointments.length > 3 && (
                  <div className="text-xs text-gray-500 text-center">
                    +{dayAppointments.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Appointments for {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const dayAppointments = getAppointmentsForDate(selectedDate);
              if (dayAppointments.length === 0) {
                return (
                  <p className="text-gray-500">
                    No appointments scheduled for this date
                  </p>
                );
              }

              return (
                <div className="space-y-3">
                  {dayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.time}
                        </div>
                        <div>
                          <p className="font-medium">
                            {appointment.patientName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {appointment.appointmentType}
                          </p>
                          <p className="text-sm text-gray-500">
                            Dr. {appointment.providerName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
