"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProviders } from "@/hooks/use-providers";
import { format, addDays, startOfWeek } from "date-fns";

export function ProviderSchedule() {
  const { providers, isLoading } = useProviders();

  // Generate current week dates
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {providers?.data?.map((provider) => (
        <Card key={provider.id}>
          <CardHeader>
            <CardTitle>
              Dr. {provider.firstName} {provider.lastName}
            </CardTitle>
            <CardDescription>
              {provider.specialty} • {provider.department}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-8 gap-2 min-w-[800px]">
                {/* Header row */}
                <div className="font-medium text-sm text-gray-600 p-2">
                  Time
                </div>
                {weekDays.map((day) => (
                  <div
                    key={day.toISOString()}
                    className="font-medium text-sm text-gray-600 p-2 text-center"
                  >
                    <div>{format(day, "EEE")}</div>
                    <div>{format(day, "MMM d")}</div>
                  </div>
                ))}

                {/* Time slots */}
                {timeSlots.map((time) => (
                  <>
                    <div
                      key={time}
                      className="text-sm text-gray-500 p-2 border-r"
                    >
                      {time}
                    </div>
                    {weekDays.map((day) => {
                      const dayOfWeek = day.getDay();
                      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                      const isAvailable = !isWeekend && Math.random() > 0.3; // Mock availability

                      return (
                        <div
                          key={`${day.toISOString()}-${time}`}
                          className="p-1 border-r border-b"
                        >
                          {isWeekend ? (
                            <div className="h-8 bg-gray-100 rounded flex items-center justify-center">
                              <span className="text-xs text-gray-400">Off</span>
                            </div>
                          ) : isAvailable ? (
                            <div className="h-8 bg-green-50 rounded flex items-center justify-center cursor-pointer hover:bg-green-100">
                              <Badge
                                variant="secondary"
                                className="text-xs bg-green-100 text-green-800"
                              >
                                Available
                              </Badge>
                            </div>
                          ) : (
                            <div className="h-8 bg-red-50 rounded flex items-center justify-center">
                              <Badge
                                variant="secondary"
                                className="text-xs bg-red-100 text-red-800"
                              >
                                Booked
                              </Badge>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-100 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-100 rounded"></div>
                  <span>Booked</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-100 rounded"></div>
                  <span>Off</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="bg-transparent">
                View Full Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
