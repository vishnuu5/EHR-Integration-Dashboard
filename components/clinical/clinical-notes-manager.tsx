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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisHorizontalIcon,
  EyeIcon,
  PencilIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useClinicalNotes } from "@/hooks/use-clinical-notes";
import { format } from "date-fns";

export function ClinicalNotesManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { clinicalNotes, isLoading, error } = useClinicalNotes({
    search: searchQuery,
    type: typeFilter,
    status: statusFilter,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "signed":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "amended":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "progress":
        return "bg-blue-100 text-blue-800";
      case "consultation":
        return "bg-purple-100 text-purple-800";
      case "discharge":
        return "bg-green-100 text-green-800";
      case "procedure":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
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
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Notes</CardTitle>
          <CardDescription>
            Search and filter clinical documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notes by patient name, subject, or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="progress">Progress Notes</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="discharge">Discharge</SelectItem>
                <SelectItem value="procedure">Procedure</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="amended">Amended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notes Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Clinical Notes</CardTitle>
              <CardDescription>
                {clinicalNotes?.total
                  ? `${clinicalNotes.total} notes found`
                  : "Loading clinical notes..."}
              </CardDescription>
            </div>
            <Link href="/clinical/notes/new">
              <Button className="medical-button">Add New Note</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clinicalNotes?.data?.map((note) => (
                  <TableRow key={note.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {format(new Date(note.date), "MMM d, yyyy")}
                        </div>
                        <div className="text-gray-500">
                          {format(new Date(note.date), "HH:mm")}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          John Doe
                        </div>
                        <div className="text-gray-500">
                          ID: {note.patientId}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm text-gray-900">Dr. Smith</div>
                    </TableCell>

                    <TableCell>
                      <Badge className={getTypeColor(note.noteType)}>
                        {note.noteType}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {note.subject}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className={getStatusColor(note.status)}>
                        {note.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <EllipsisHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <EyeIcon className="h-4 w-4 mr-2" />
                            View Note
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <PencilIcon className="h-4 w-4 mr-2" />
                            Edit Note
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {!clinicalNotes?.data?.length && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No clinical notes found</p>
              <Link href="/clinical/notes/new">
                <Button className="medical-button">Create First Note</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
