"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "../../hooks/use-toast";
import {
  integrationManager,
  type EHRProvider,
} from "@/lib/api/integration-manager";
import { CheckCircle, XCircle, Settings, TestTube } from "lucide-react";

interface ConnectionStatus {
  drchrono: boolean;
  epic: boolean;
}

export function EHRConnectionManager() {
  const [activeProvider, setActiveProvider] = useState<EHRProvider>("drchrono");
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    drchrono: false,
    epic: false,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

  // DrChrono credentials
  const [drchronoConfig, setDrchronoConfig] = useState({
    clientId: process.env.NEXT_PUBLIC_DRCHRONO_CLIENT_ID || "",
    clientSecret: process.env.NEXT_PUBLIC_DRCHRONO_CLIENT_SECRET || "",
    baseUrl:
      process.env.NEXT_PUBLIC_DRCHRONO_BASE_URL || "https://drchrono.com/api/",
  });

  // Epic credentials
  const [epicConfig, setEpicConfig] = useState({
    username: process.env.NEXT_PUBLIC_EPIC_USERNAME || "",
    password: process.env.NEXT_PUBLIC_EPIC_PASSWORD || "",
    baseUrl: process.env.NEXT_PUBLIC_EPIC_BASE_URL || "https://fhir.epic.com/",
  });

  useEffect(() => {
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    try {
      const status = await integrationManager.healthCheck();
      setConnectionStatus(status);
    } catch (error) {
      console.error("Failed to check connection status:", error);
    }
  };

  const connectToEHR = async () => {
    setIsConnecting(true);
    try {
      const configs = [
        {
          provider: "drchrono" as EHRProvider,
          credentials: {
            clientId: drchronoConfig.clientId,
            clientSecret: drchronoConfig.clientSecret,
            baseUrl: drchronoConfig.baseUrl,
          },
        },
        {
          provider: "epic" as EHRProvider,
          credentials: {
            username: epicConfig.username,
            password: epicConfig.password,
            baseUrl: epicConfig.baseUrl,
          },
        },
      ];

      await integrationManager.initialize(configs);
      await checkConnectionStatus();

      toast({
        title: "Connection Successful",
        description: "Successfully connected to EHR systems",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description:
          "Failed to connect to EHR systems. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const testConnection = async () => {
    setIsTesting(true);
    try {
      const status = await integrationManager.healthCheck();
      setConnectionStatus(status);

      const connectedSystems = Object.entries(status)
        .filter(([_, connected]) => connected)
        .map(([system]) => system);

      if (connectedSystems.length > 0) {
        toast({
          title: "Connection Test Successful",
          description: `Connected to: ${connectedSystems.join(", ")}`,
        });
      } else {
        toast({
          title: "Connection Test Failed",
          description: "No EHR systems are currently connected",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Test Failed",
        description: "Failed to test EHR connections",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const switchProvider = (provider: EHRProvider) => {
    setActiveProvider(provider);
    integrationManager.setActiveProvider(provider);
    toast({
      title: "Provider Switched",
      description: `Now using ${provider.toUpperCase()} as the active EHR provider`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>EHR Connection Manager</span>
          </CardTitle>
          <CardDescription>
            Configure and manage connections to EHR systems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Connection Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">DrChrono</h3>
                <p className="text-sm text-gray-600">REST API Integration</p>
              </div>
              <div className="flex items-center space-x-2">
                {connectionStatus.drchrono ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <Badge
                  variant={connectionStatus.drchrono ? "default" : "secondary"}
                >
                  {connectionStatus.drchrono ? "Connected" : "Disconnected"}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Epic FHIR</h3>
                <p className="text-sm text-gray-600">FHIR R4 Integration</p>
              </div>
              <div className="flex items-center space-x-2">
                {connectionStatus.epic ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <Badge
                  variant={connectionStatus.epic ? "default" : "secondary"}
                >
                  {connectionStatus.epic ? "Connected" : "Disconnected"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Active Provider Selection */}
          <div className="space-y-2">
            <Label>Active EHR Provider</Label>
            <Select
              value={activeProvider}
              onValueChange={(value: EHRProvider) => switchProvider(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="drchrono">DrChrono</SelectItem>
                <SelectItem value="epic">Epic FHIR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* DrChrono Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">DrChrono Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="drchrono-client-id">Client ID</Label>
                  <Input
                    id="drchrono-client-id"
                    value={drchronoConfig.clientId}
                    onChange={(e) =>
                      setDrchronoConfig({
                        ...drchronoConfig,
                        clientId: e.target.value,
                      })
                    }
                    placeholder="DrChrono Client ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drchrono-client-secret">Client Secret</Label>
                  <Input
                    id="drchrono-client-secret"
                    type="password"
                    value={drchronoConfig.clientSecret}
                    onChange={(e) =>
                      setDrchronoConfig({
                        ...drchronoConfig,
                        clientSecret: e.target.value,
                      })
                    }
                    placeholder="DrChrono Client Secret"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="drchrono-base-url">Base URL</Label>
                <Input
                  id="drchrono-base-url"
                  value={drchronoConfig.baseUrl}
                  onChange={(e) =>
                    setDrchronoConfig({
                      ...drchronoConfig,
                      baseUrl: e.target.value,
                    })
                  }
                  placeholder="https://drchrono.com/api/"
                />
              </div>
            </CardContent>
          </Card>

          {/* Epic Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Epic FHIR Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="epic-username">Username</Label>
                  <Input
                    id="epic-username"
                    value={epicConfig.username}
                    onChange={(e) =>
                      setEpicConfig({ ...epicConfig, username: e.target.value })
                    }
                    placeholder="Epic Username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="epic-password">Password</Label>
                  <Input
                    id="epic-password"
                    type="password"
                    value={epicConfig.password}
                    onChange={(e) =>
                      setEpicConfig({ ...epicConfig, password: e.target.value })
                    }
                    placeholder="Epic Password"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="epic-base-url">Base URL</Label>
                <Input
                  id="epic-base-url"
                  value={epicConfig.baseUrl}
                  onChange={(e) =>
                    setEpicConfig({ ...epicConfig, baseUrl: e.target.value })
                  }
                  placeholder="https://fhir.epic.com/"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button onClick={connectToEHR} disabled={isConnecting}>
              {isConnecting ? "Connecting..." : "Connect to EHR Systems"}
            </Button>
            <Button
              variant="outline"
              onClick={testConnection}
              disabled={isTesting}
            >
              <TestTube className="h-4 w-4 mr-2" />
              {isTesting ? "Testing..." : "Test Connection"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
