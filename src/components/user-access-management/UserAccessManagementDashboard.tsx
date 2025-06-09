
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Users, Shield, Globe, CheckSquare, Activity, Eye } from "lucide-react";
import { UserDirectory } from "./UserDirectory";
import { RolePermissionEditor } from "./RolePermissionEditor";
import { AccessRequestWorkflow } from "./AccessRequestWorkflow";
import { EntityAssignment } from "./EntityAssignment";
import { ExternalUserPanel } from "./ExternalUserPanel";
import { AuditLogViewer } from "./AuditLogViewer";
import { AddUserModal } from "./AddUserModal";

export function UserAccessManagementDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User & Access Management</h1>
          <p className="text-muted-foreground">
            Manage user access, roles, and permissions across all legal modules
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button onClick={() => setShowAddUserModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="access-requests" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Access Requests
          </TabsTrigger>
          <TabsTrigger value="entities" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Entity Access
          </TabsTrigger>
          <TabsTrigger value="external" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            External Users
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Audit Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <UserDirectory />
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <RolePermissionEditor />
        </TabsContent>

        <TabsContent value="access-requests" className="space-y-6">
          <AccessRequestWorkflow />
        </TabsContent>

        <TabsContent value="entities" className="space-y-6">
          <EntityAssignment />
        </TabsContent>

        <TabsContent value="external" className="space-y-6">
          <ExternalUserPanel />
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <AuditLogViewer />
        </TabsContent>
      </Tabs>

      <AddUserModal 
        open={showAddUserModal} 
        onOpenChange={setShowAddUserModal} 
      />
    </div>
  );
}
