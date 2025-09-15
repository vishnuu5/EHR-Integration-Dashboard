"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HeartIcon,
  DocumentTextIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    name: "Vital Signs Today",
    value: "127",
    change: "+8%",
    changeType: "positive" as const,
    icon: HeartIcon,
    description: "Recorded today",
  },
  {
    name: "Clinical Notes",
    value: "43",
    change: "+12",
    changeType: "positive" as const,
    icon: DocumentTextIcon,
    description: "Added this week",
  },
  {
    name: "Pending Lab Results",
    value: "18",
    change: "-3",
    changeType: "negative" as const,
    icon: BeakerIcon,
    description: "Awaiting results",
  },
  {
    name: "Critical Alerts",
    value: "3",
    change: "+1",
    changeType: "negative" as const,
    icon: ExclamationTriangleIcon,
    description: "Require attention",
  },
];

export function ClinicalStats() {
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
