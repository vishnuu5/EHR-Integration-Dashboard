"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, AlertCircle, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    description: "+20.1% from last month",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Outstanding Claims",
    value: "23",
    description: "$12,450 pending",
    icon: CreditCard,
    trend: "neutral",
  },
  {
    title: "Denied Claims",
    value: "5",
    description: "2 require resubmission",
    icon: AlertCircle,
    trend: "down",
  },
  {
    title: "Collection Rate",
    value: "94.2%",
    description: "+2.3% from last month",
    icon: TrendingUp,
    trend: "up",
  },
];

export function BillingStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p
              className={`text-xs ${
                stat.trend === "up"
                  ? "text-green-600"
                  : stat.trend === "down"
                  ? "text-red-600"
                  : "text-muted-foreground"
              }`}
            >
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
