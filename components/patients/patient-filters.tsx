"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PatientFiltersProps {
  filters: {
    gender: string;
    ageRange: string;
    insuranceStatus: string;
    lastVisit: string;
  };
  onFilterChange: (filters: PatientFiltersProps["filters"]) => void;
}

export function PatientFilters({
  filters,
  onFilterChange,
}: PatientFiltersProps) {
  const updateFilter = (key: keyof typeof filters, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select
          value={filters.gender}
          onValueChange={(value) => updateFilter("gender", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All genders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All genders</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ageRange">Age Range</Label>
        <Select
          value={filters.ageRange}
          onValueChange={(value) => updateFilter("ageRange", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All ages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ages</SelectItem>
            <SelectItem value="0-17">0-17 years</SelectItem>
            <SelectItem value="18-34">18-34 years</SelectItem>
            <SelectItem value="35-54">35-54 years</SelectItem>
            <SelectItem value="55-74">55-74 years</SelectItem>
            <SelectItem value="75+">75+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="insuranceStatus">Insurance Status</Label>
        <Select
          value={filters.insuranceStatus}
          onValueChange={(value) => updateFilter("insuranceStatus", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="none">No Insurance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastVisit">Last Visit</Label>
        <Select
          value={filters.lastVisit}
          onValueChange={(value) => updateFilter("lastVisit", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any time</SelectItem>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
            <SelectItem value="365+">Over a year ago</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
