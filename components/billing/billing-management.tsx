"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillingStats } from "./billing-stats";
import { InsuranceManager } from "./insurance-manager";
import { BillingOperations } from "./billing-operations";
import { ReportsManager } from "./reports-manager";
import { PaymentHistory } from "./payment-history";

export function BillingManagement() {
  return (
    <div className="space-y-6">
      <BillingStats />

      <Tabs defaultValue="billing" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>

        <TabsContent value="billing" className="space-y-4">
          <BillingOperations />
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <InsuranceManager />
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <PaymentHistory />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <ReportsManager />
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900">
              Administrative Tools
            </h3>
            <p className="text-gray-600 mt-2">
              Administrative features coming soon
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
