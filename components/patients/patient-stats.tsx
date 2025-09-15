"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  UsersIcon,
  UserPlusIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    name: "Total Patients",
    value: "2,847",
    change: "+12%",
    changeType: "positive" as const,
    icon: UsersIcon,
    description: "Active patient records",
  },
  {
    name: "New This Month",
    value: "156",
    change: "+23%",
    changeType: "positive" as const,
    icon: UserPlusIcon,
    description: "New patient registrations",
  },
  {
    name: "Overdue Visits",
    value: "23",
    change: "-8%",
    changeType: "negative" as const,
    icon: ExclamationTriangleIcon,
    description: "Patients with overdue checkups",
  },
  {
    name: "Scheduled Today",
    value: "47",
    change: "+5%",
    changeType: "positive" as const,
    icon: ClockIcon,
    description: "Appointments scheduled for today",
  },
];

export function PatientStats() {
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
                {stat.change}
              </span>
              <span className="text-gray-500">from last month</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
