"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisHorizontalIcon, EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import type { Patient } from "@/lib/types"
import { formatDate, calculateAge } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface PatientTableProps {
  patients: Patient[]
  isLoading: boolean
  error?: string
  onRefresh: () => void
}

export function PatientTable({ patients, isLoading, error, onRefresh }: PatientTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDelete = async (patientId: string) => {
    setDeletingId(patientId)
    try {
      // API call to delete patient
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Mock delay
      toast({
        title: "Patient Deleted",
        description: "Patient record has been successfully deleted.",
      })
      onRefresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete patient record.",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="w-20 h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error loading patients: {error}</p>
        <Button onClick={onRefresh} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  if (!patients.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No patients found</p>
        <Link href="/patients/new">
          <Button className="medical-button">Add First Patient</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Demographics</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Insurance</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-medical-primary text-white text-sm">
                      {patient.firstName.charAt(0)}
                      {patient.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900">
                      {patient.firstName} {patient.lastName}
                    </div>
                    <div className="text-sm text-gray-500">ID: {patient.id}</div>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="text-sm">
                  <div className="text-gray-900">{calculateAge(patient.dateOfBirth)} years old</div>
                  <div className="text-gray-500 capitalize">{patient.gender}</div>
                  <div className="text-gray-500">{formatDate(patient.dateOfBirth)}</div>
                </div>
              </TableCell>

              <TableCell>
                <div className="text-sm">
                  {patient.phone && <div className="text-gray-900">{patient.phone}</div>}
                  {patient.email && <div className="text-gray-500">{patient.email}</div>}
                  {patient.address && (
                    <div className="text-gray-500">
                      {patient.address.city}, {patient.address.state}
                    </div>
                  )}
                </div>
              </TableCell>

              <TableCell>
                {patient.insuranceInfo ? (
                  <div className="text-sm">
                    <div className="text-gray-900">{patient.insuranceInfo.provider}</div>
                    <Badge
                      variant={patient.insuranceInfo.eligibilityStatus === "active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {patient.insuranceInfo.eligibilityStatus}
                    </Badge>
                  </div>
                ) : (
                  <span className="text-gray-400">No insurance</span>
                )}
              </TableCell>

              <TableCell>
                <div className="text-sm text-gray-500">
                  {/* Mock last visit date */}
                  {formatDate(new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString())}
                </div>
              </TableCell>

              <TableCell>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Active
                </Badge>
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
                    <DropdownMenuItem asChild>
                      <Link href={`/patients/${patient.id}`} className="flex items-center">
                        <EyeIcon className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/patients/${patient.id}/edit`} className="flex items-center">
                        <PencilIcon className="h-4 w-4 mr-2" />
                        Edit Patient
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(patient.id)}
                      disabled={deletingId === patient.id}
                      className="text-red-600 focus:text-red-600"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      {deletingId === patient.id ? "Deleting..." : "Delete Patient"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
