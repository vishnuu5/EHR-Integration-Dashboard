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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Download } from "lucide-react";
import { mockPaymentHistory } from "@/lib/mock-data/billing";

export function PaymentHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");

  const filteredPayments = mockPaymentHistory.filter((payment) => {
    const matchesSearch = payment.patientName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesMethod =
      paymentMethodFilter === "all" ||
      payment.paymentMethod === paymentMethodFilter;
    return matchesSearch && matchesMethod;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                View and manage patient payment records
              </CardDescription>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by patient name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="method">Payment Method</Label>
              <Select
                value={paymentMethodFilter}
                onValueChange={setPaymentMethodFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-4 font-medium">Patient</th>
                    <th className="text-left p-4 font-medium">Amount</th>
                    <th className="text-left p-4 font-medium">
                      Payment Method
                    </th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium">{payment.patientName}</div>
                      </td>
                      <td className="p-4 font-medium">${payment.amount}</td>
                      <td className="p-4 capitalize">
                        {payment.paymentMethod.replace("_", " ")}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {payment.paymentDate}
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="font-mono text-sm">
                          {payment.transactionId}
                        </div>
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
