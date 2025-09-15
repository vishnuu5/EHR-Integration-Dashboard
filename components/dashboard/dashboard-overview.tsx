"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UsersIcon,
  CalendarIcon,
  HeartIcon,
  CreditCardIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const stats = [
  {
    name: "Total Patients",
    value: "2,847",
    change: "+12%",
    changeType: "positive",
    icon: UsersIcon,
    href: "/patients",
  },
  {
    name: "Today's Appointments",
    value: "24",
    change: "+3",
    changeType: "positive",
    icon: CalendarIcon,
    href: "/appointments",
  },
  {
    name: "Pending Lab Results",
    value: "8",
    change: "-2",
    changeType: "negative",
    icon: HeartIcon,
    href: "/clinical",
  },
  {
    name: "Outstanding Bills",
    value: "$12,450",
    change: "+5%",
    changeType: "positive",
    icon: CreditCardIcon,
    href: "/billing",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "appointment",
    message: "New appointment scheduled for John Doe",
    time: "2 minutes ago",
    status: "info",
  },
  {
    id: 2,
    type: "patient",
    message: "Patient record updated for Sarah Johnson",
    time: "15 minutes ago",
    status: "success",
  },
  {
    id: 3,
    type: "lab",
    message: "Lab results available for Michael Brown",
    time: "1 hour ago",
    status: "warning",
  },
  {
    id: 4,
    type: "billing",
    message: "Payment received from Emily Davis",
    time: "2 hours ago",
    status: "success",
  },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome to your EHR Integration Dashboard. Monitor and manage
          healthcare data across multiple systems.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.name}
            className="medical-card hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-medical-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
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
                <span className="text-gray-500">from last month</span>
              </div>
              <Link href={stat.href}>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full bg-transparent"
                >
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest updates across your healthcare systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
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
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* EHR Connections */}
        <Card>
          <CardHeader>
            <CardTitle>EHR Connections</CardTitle>
            <CardDescription>
              Status of your integrated healthcare systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">DrChrono API</p>
                    <p className="text-sm text-gray-500">Connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Epic FHIR</p>
                    <p className="text-sm text-gray-500">Testing</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Custom Integration</p>
                    <p className="text-sm text-gray-500">Disconnected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Setup
                </Button>
              </div>
            </div>

            <Link href="/settings">
              <Button className="w-full mt-4 medical-button">
                Manage Connections
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts for healthcare management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/patients/new">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col space-y-2 bg-transparent"
              >
                <UsersIcon className="h-6 w-6" />
                <span>Add Patient</span>
              </Button>
            </Link>

            <Link href="/appointments/new">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col space-y-2 bg-transparent"
              >
                <CalendarIcon className="h-6 w-6" />
                <span>Schedule Appointment</span>
              </Button>
            </Link>

            <Link href="/clinical/notes/new">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col space-y-2 bg-transparent"
              >
                <HeartIcon className="h-6 w-6" />
                <span>Add Clinical Note</span>
              </Button>
            </Link>

            <Link href="/billing/new">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col space-y-2 bg-transparent"
              >
                <CreditCardIcon className="h-6 w-6" />
                <span>Create Bill</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
