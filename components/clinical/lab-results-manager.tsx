"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useLabResults } from "@/hooks/use-lab-results";
import { format } from "date-fns";

export function LabResultsManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { labResults, isLoading, error } = useLabResults({
    search: searchQuery,
    status: statusFilter,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAbnormalFlagColor = (flag?: string) => {
    switch (flag) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return undefined;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Critical Results Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
            <CardTitle className="text-red-800">Critical Lab Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-red-700">
              <strong>Patient ID: 12345</strong> - Glucose: 450 mg/dL (Critical
              High)
            </p>
            <p className="text-sm text-red-700">
              <strong>Patient ID: 67890</strong> - Potassium: 2.8 mEq/L
              (Critical Low)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Lab Results</CardTitle>
          <CardDescription>
            Search and filter laboratory test results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by patient name, test name, or result..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Laboratory Results</CardTitle>
          <CardDescription>
            {labResults?.total
              ? `${labResults.total} results found`
              : "Loading lab results..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Reference Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ordered By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {labResults?.data?.map((result) => (
                  <TableRow key={result.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {format(new Date(result.orderedDate), "MMM d, yyyy")}
                        </div>
                        {result.resultDate && (
                          <div className="text-gray-500">
                            Result:{" "}
                            {format(new Date(result.resultDate), "MMM d, yyyy")}
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          John Doe
                        </div>
                        <div className="text-gray-500">
                          ID: {result.patientId}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {result.testName}
                        </div>
                        <div className="text-gray-500">{result.testCode}</div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {result.result}
                        </span>
                        {result.abnormalFlag && (
                          <Badge
                            className={
                              getAbnormalFlagColor(result.abnormalFlag) || ""
                            }
                          >
                            {result.abnormalFlag}
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {result.referenceRange}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className={getStatusColor(result.status)}>
                        {result.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm text-gray-900">
                        Dr. {result.orderedBy}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {!labResults?.data?.length && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No lab results found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
