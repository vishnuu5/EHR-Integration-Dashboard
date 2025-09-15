"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAppointments } from "@/hooks/use-appointments";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface AppointmentListProps {
  selectedDate?: Date;
}

export function AppointmentList({ selectedDate }: AppointmentListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [providerFilter, setProviderFilter] = useState("all");
  const { toast } = useToast();

  const { appointments, isLoading, error, mutate } = useAppointments({
    search: searchQuery,
    status: statusFilter,
    provider: providerFilter,
    date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined,
  });

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Appointment Cancelled",
        description: "The appointment has been successfully cancelled.",
      });
      mutate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel appointment.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "no-show":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center space-x-4 p-4 border rounded-lg animate-pulse"
          >
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="w-20 h-6 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error loading appointments: {error}</p>
        <Button onClick={() => mutate()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search appointments by patient name or ID..."
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
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="no-show">No Show</SelectItem>
          </SelectContent>
        </Select>
        <Select value={providerFilter} onValueChange={setProviderFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All providers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All providers</SelectItem>
            <SelectItem value="dr-smith">Dr. Smith</SelectItem>
            <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
            <SelectItem value="dr-williams">Dr. Williams</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Appointments Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments?.data?.map((appointment) => (
              <TableRow key={appointment.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium">
                      {format(new Date(appointment.date), "MMM d, yyyy")}
                    </div>
                    <div className="text-gray-500">{appointment.time}</div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">
                      {appointment.patientName}
                    </div>
                    <div className="text-gray-500">
                      ID: {appointment.patientId}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">
                      Dr. {appointment.providerName}
                    </div>
                    <div className="text-gray-500">
                      {appointment.location || "Main Office"}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-sm text-gray-900">
                    {appointment.appointmentType}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="text-sm text-gray-500">
                    {appointment.duration} min
                  </div>
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
                        <Link
                          href={`/appointments/${appointment.id}`}
                          className="flex items-center"
                        >
                          <EyeIcon className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/appointments/${appointment.id}/edit`}
                          className="flex items-center"
                        >
                          <PencilIcon className="h-4 w-4 mr-2" />
                          Edit Appointment
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {appointment.status !== "cancelled" && (
                        <DropdownMenuItem
                          onClick={() =>
                            handleCancelAppointment(appointment.id)
                          }
                          className="text-red-600 focus:text-red-600"
                        >
                          <XMarkIcon className="h-4 w-4 mr-2" />
                          Cancel Appointment
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

      {!appointments?.data?.length && (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No appointments found</p>
          <Link href="/appointments/new">
            <Button className="medical-button">
              Schedule First Appointment
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
