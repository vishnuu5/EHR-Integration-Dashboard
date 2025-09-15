"use client";

import { BillingManagement } from "@/components/billing/billing-management";

export default function BillingPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Billing & Administrative
        </h1>
        <p className="text-gray-600 mt-2">
          Manage billing, insurance, and administrative operations
        </p>
      </div>
      <BillingManagement />
    </div>
  );
}
