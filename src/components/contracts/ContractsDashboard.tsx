
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContractsOverview } from "./ContractsOverview";
import { ContractsList } from "./ContractsList";
import { AlertManagement } from "./AlertManagement";
import { TaskManagement } from "./TaskManagement";
import { NotificationsCenter } from "./NotificationsCenter";

export function ContractsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contract Lifecycle Management</h1>
          <p className="text-muted-foreground">
            Manage contracts, renewals, and compliance across your organization
          </p>
        </div>
        <Button>
          Add New Contract
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Dashboard</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <ContractsOverview />
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <ContractsList />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <AlertManagement />
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <TaskManagement />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <NotificationsCenter />
        </TabsContent>
      </Tabs>
    </div>
  );
}
