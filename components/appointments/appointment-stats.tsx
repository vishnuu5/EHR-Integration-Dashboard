"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    name: "Today's Appointments",
    value: "24",
    change: "+3",
    changeType: "positive" as const,
    icon: CalendarIcon,
    description: "Scheduled for today",
  },
  {
    name: "This Week",
    value: "156",
    change: "+12%",
    changeType: "positive" as const,
    icon: ClockIcon,
    description: "Total appointments this week",
  },
  {
    name: "Completed",
    value: "89%",
    change: "+2%",
    changeType: "positive" as const,
    icon: CheckCircleIcon,
    description: "Completion rate this month",
  },
  {
    name: "No Shows",
    value: "8",
    change: "-3",
    changeType: "negative" as const,
    icon: ExclamationTriangleIcon,
    description: "No shows this week",
  },
];

export function AppointmentStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.name}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-medical-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="flex items-center space-x-2 text-xs">
              <span
                className={`inline-flex items-center ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                {stat.change}
              </span>
              <span className="text-gray-500">from last week</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
