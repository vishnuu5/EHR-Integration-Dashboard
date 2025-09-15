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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Download,
  BarChart3,
  PieChart,
  TrendingUp,
  FileText,
} from "lucide-react";

const reportTypes = [
  {
    id: "revenue",
    title: "Revenue Report",
    description: "Monthly and yearly revenue analysis",
    icon: TrendingUp,
  },
  {
    id: "claims",
    title: "Claims Analysis",
    description: "Insurance claims status and trends",
    icon: BarChart3,
  },
  {
    id: "collections",
    title: "Collections Report",
    description: "Outstanding balances and collection rates",
    icon: PieChart,
  },
  {
    id: "aging",
    title: "Aging Report",
    description: "Accounts receivable aging analysis",
    icon: FileText,
  },
];

export function ReportsManager() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Reports</CardTitle>
          <CardDescription>
            Generate and download financial and administrative reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {reportTypes.map((report) => (
              <Card
                key={report.id}
                className="border-2 hover:border-blue-200 transition-colors"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <report.icon className="h-6 w-6 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {report.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Label
                        htmlFor={`period-${report.id}`}
                        className="text-sm"
                      >
                        Period
                      </Label>
                      <Select>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="current-month">
                            Current Month
                          </SelectItem>
                          <SelectItem value="last-month">Last Month</SelectItem>
                          <SelectItem value="quarter">This Quarter</SelectItem>
                          <SelectItem value="year">This Year</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button size="sm" className="mt-5">
                      <Download className="h-4 w-4 mr-1" />
                      Generate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>Key financial metrics at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$45,231</div>
              <div className="text-sm text-green-700">Monthly Revenue</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">94.2%</div>
              <div className="text-sm text-blue-700">Collection Rate</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">$12,450</div>
              <div className="text-sm text-orange-700">Outstanding Claims</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
