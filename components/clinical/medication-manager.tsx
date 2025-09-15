"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisHorizontalIcon, PencilIcon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useMedications } from "@/hooks/use-medications"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

export function MedicationManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [patientFilter, setPatientFilter] = useState("all")

  const { medications, isLoading, error, mutate } = useMedications({
    search: searchQuery,
    status: statusFilter,
    patient: patientFilter,
  })
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "discontinued":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDiscontinueMedication = async (medicationId: string) => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Medication Discontinued",
        description: "The medication has been successfully discontinued.",
      })
      mutate()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to discontinue medication.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Drug Interaction Alert */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800">Drug Interaction Alert</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-yellow-700">
            <strong>Patient ID: 67890</strong> - Potential interaction detected between Warfarin and Aspirin. Review
            recommended.
          </p>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Medication Management</CardTitle>
          <CardDescription>Search and manage patient medications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by medication name, patient, or prescriber..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="discontinued">Discontinued</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={patientFilter} onValueChange={setPatientFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All patients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All patients</SelectItem>
                <SelectItem value="1">John Doe</SelectItem>
                <SelectItem value="2">Sarah Johnson</SelectItem>
                <SelectItem value="3">Michael Brown</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Medications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Medications</CardTitle>
          <CardDescription>
            {medications?.total ? `${medications.total} medications found` : "Loading medications..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage & Frequency</TableHead>
                  <TableHead>Prescribed By</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medications?.data?.map((medication) => (
                  <TableRow key={medication.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">John Doe</div>
                        <div className="text-gray-500">ID: {medication.id.slice(0, 6)}</div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{medication.name}</div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm">
                        <div className="text-gray-900">{medication.dosage}</div>
                        <div className="text-gray-500">{medication.frequency}</div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm text-gray-900">Dr. {medication.prescribedBy}</div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm">
                        <div className="text-gray-900">{format(new Date(medication.dateStarted), "MMM d, yyyy")}</div>
                        {medication.dateEnded && (
                          <div className="text-gray-500">
                            Ended: {format(new Date(medication.dateEnded), "MMM d, yyyy")}
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className={getStatusColor(medication.status)}>{medication.status}</Badge>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <EllipsisHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <PencilIcon className="h-4 w-4 mr-2" />
                            Edit Medication
                          </DropdownMenuItem>
                          {medication.status === "active" && (
                            <DropdownMenuItem
                              onClick={() => handleDiscontinueMedication(medication.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <XMarkIcon className="h-4 w-4 mr-2" />
                              Discontinue
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {!medications?.data?.length && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No medications found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
