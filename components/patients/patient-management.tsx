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
import { PatientTable } from "./patient-table";
import { PatientFilters } from "./patient-filters";
import { PatientStats } from "./patient-stats";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePatients } from "@/hooks/use-patients";

export function PatientManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    gender: "",
    ageRange: "",
    insuranceStatus: "",
    lastVisit: "",
  });

  const { patients, isLoading, error, mutate } = usePatients({
    search: searchQuery,
    filters,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      gender: "",
      ageRange: "",
      insuranceStatus: "",
      lastVisit: "",
    });
    setSearchQuery("");
  };

  const activeFiltersCount =
    Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Patient Management
          </h1>
          <p className="text-gray-600">
            Manage patient records, demographics, and medical information
          </p>
        </div>
        <Link href="/patients/new">
          <Button className="medical-button">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add New Patient
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <PatientStats />

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search patients by name, ID, phone, or email..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="mr-2">
                  {activeFiltersCount} filter
                  {activeFiltersCount !== 1 ? "s" : ""} active
                </Badge>
              )}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-transparent"
              >
                <FunnelIcon className="h-4 w-4 mr-2" />
                Filters
              </Button>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" onClick={clearFilters} size="sm">
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {showFilters && (
          <CardContent className="border-t">
            <PatientFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </CardContent>
        )}
      </Card>

      {/* Patient Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
          <CardDescription>
            {patients?.total
              ? `${patients.total} patients found`
              : "Loading patient records..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PatientTable
            patients={patients?.data || []}
            isLoading={isLoading}
            error={error}
            onRefresh={() => mutate()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
