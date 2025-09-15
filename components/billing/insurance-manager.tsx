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
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle, Clock } from "lucide-react";
import { mockInsuranceRecords } from "@/lib/mock-data/billing";

export function InsuranceManager() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = mockInsuranceRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.insuranceProvider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "expired":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Insurance Eligibility</CardTitle>
          <CardDescription>
            Check and manage patient insurance information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="search">Search Patients</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search by patient name or insurance provider..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-4 font-medium">Patient</th>
                    <th className="text-left p-4 font-medium">
                      Insurance Provider
                    </th>
                    <th className="text-left p-4 font-medium">Policy Number</th>
                    <th className="text-left p-4 font-medium">Coverage</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">
                            {record.patientName}
                          </div>
                          <div className="text-sm text-gray-600">
                            DOB: {record.dateOfBirth}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">
                          {record.insuranceProvider}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-mono text-sm">
                          {record.policyNumber}
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="text-sm">
                            Deductible: ${record.deductible}
                          </div>
                          <div className="text-sm">Copay: ${record.copay}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(record.status)}
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <Button variant="outline" size="sm">
                          Verify Eligibility
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
