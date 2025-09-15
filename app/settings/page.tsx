"use client";

import { EHRConnectionManager } from "@/components/settings/ehr-connection-manager";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure EHR integrations and system settings
        </p>
      </div>
      <EHRConnectionManager />
    </div>
  );
}
