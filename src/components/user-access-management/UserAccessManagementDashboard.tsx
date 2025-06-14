
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, Users, Shield, Globe, CheckSquare, Activity, Eye, Settings, UserCheck, BarChart3, AlertTriangle } from "lucide-react";
import { UserDirectory } from "./UserDirectory";
import { RolePermissionEditor } from "./RolePermissionEditor";
import { AccessRequestWorkflow } from "./AccessRequestWorkflow";
import { EntityAssignment } from "./EntityAssignment";
import { ExternalUserPanel } from "./ExternalUserPanel";
import { AuditLogViewer } from "./AuditLogViewer";
import { AddUserModal } from "./AddUserModal";
import { PermissionMatrix } from "./PermissionMatrix";
import { AccessRequestApproval } from "./AccessRequestApproval";
import { BulkUserActions } from "./BulkUserActions";

export function UserAccessManagementDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // Dashboard overview stats
  const dashboardStats = [
    {
      title: "Total Users",
      value: "127",
      change: "+3 this month",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      title: "Active Sessions",
      value: "89",
      change: "Currently online",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      title: "Pending Requests",
      value: "12",
      change: "Awaiting approval",
      icon: CheckSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950"
    },
    {
      title: "Security Alerts",
      value: "3",
      change: "Requires attention",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced header section */}
      <div className="desktop-section">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">
              User & Access Management
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Comprehensive user access control, role management, and security oversight 
              across all legal modules and entities
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="default" className="btn-desktop hover-lift">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Button onClick={() => setShowAddUserModal(true)} className="btn-desktop hover-lift">
              <Plus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </div>
        </div>

        {/* Dashboard overview cards */}
        <div className="desktop-grid desktop-grid-wide mt-8">
          {dashboardStats.map((stat) => (
            <Card key={stat.title} className="desktop-card hover-lift theme-transition">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Enhanced tabs navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="border-b border-border bg-background/50 backdrop-blur-sm rounded-lg p-1">
          <TabsList className="grid w-full grid-cols-8 bg-transparent h-12">
            <TabsTrigger 
              value="users" 
              className="flex items-center gap-2 h-10 rounded-md font-medium transition-all hover:bg-accent/50 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger 
              value="roles" 
              className="flex items-center gap-2 h-10 rounded-md font-medium transition-all hover:bg-accent/50 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Roles</span>
            </TabsTrigger>
            <TabsTrigger 
              value="permissions" 
              className="flex items-center gap-2 h-10 rounded-md font-medium transition-all hover:bg-accent/50 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Permissions</span>
            </TabsTrigger>
            <TabsTrigger 
              value="access-requests" 
              className="flex items-center gap-2 h-10 rounded-md font-medium transition-all hover:bg-accent/50 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <CheckSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Requests</span>
            </TabsTrigger>
            <TabsTrigger 
              value="approval" 
              className="flex items-center gap-2 h-10 rounded-md font-medium transition-all hover:bg-accent/50 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <UserCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Approval</span>
            </TabsTrigger>
            <TabsTrigger 
              value="entities" 
              className="flex items-center gap-2 h-10 rounded-md font-medium transition-all hover:bg-accent/50 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Entities</span>
            </TabsTrigger>
            <TabsTrigger 
              value="external" 
              className="flex items-center gap-2 h-10 rounded-md font-medium transition-all hover:bg-accent/50 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">External</span>
            </TabsTrigger>
            <TabsTrigger 
              value="audit" 
              className="flex items-center gap-2 h-10 rounded-md font-medium transition-all hover:bg-accent/50 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Audit</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="users" className="desktop-section space-y-8">
          <UserDirectory />
          <BulkUserActions />
        </TabsContent>

        <TabsContent value="roles" className="desktop-section space-y-8">
          <RolePermissionEditor />
        </TabsContent>

        <TabsContent value="permissions" className="desktop-section space-y-8">
          <PermissionMatrix />
        </TabsContent>

        <TabsContent value="access-requests" className="desktop-section space-y-8">
          <AccessRequestWorkflow />
        </TabsContent>

        <TabsContent value="approval" className="desktop-section space-y-8">
          <AccessRequestApproval />
        </TabsContent>

        <TabsContent value="entities" className="desktop-section space-y-8">
          <EntityAssignment />
        </TabsContent>

        <TabsContent value="external" className="desktop-section space-y-8">
          <ExternalUserPanel />
        </TabsContent>

        <TabsContent value="audit" className="desktop-section space-y-8">
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
