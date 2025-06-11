
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
    <div className="space-y-8">
      <div className="section-header">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="section-title">User & Access Management</h1>
            <p className="section-description">
              Manage user access, roles, and permissions across all legal modules
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="h-9 rounded-lg border-border/50 hover:bg-accent/50">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button onClick={() => setShowAddUserModal(true)} className="h-9 rounded-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-muted/30 p-1 rounded-xl border border-border/30">
          <TabsTrigger value="users" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Roles</span>
          </TabsTrigger>
          <TabsTrigger value="access-requests" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <CheckSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Requests</span>
          </TabsTrigger>
          <TabsTrigger value="entities" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Entities</span>
          </TabsTrigger>
          <TabsTrigger value="external" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">External</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Audit</span>
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
