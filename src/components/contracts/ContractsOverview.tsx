
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, AlertTriangle, Clock, CheckCircle, Building2 } from "lucide-react";

export function ContractsOverview() {
  const summaryStats = [
    {
      title: "Active Contracts",
      value: "247",
      description: "Currently active across all entities",
      icon: FileText,
      trend: "+12 this month"
    },
    {
      title: "Expiring Soon",
      value: "18",
      description: "Require attention in next 30 days",
      icon: AlertTriangle,
      trend: "8 critical",
      variant: "destructive" as const
    },
    {
      title: "Pending Review",
      value: "34",
      description: "Awaiting team review",
      icon: Clock,
      trend: "5 overdue"
    },
    {
      title: "Completed Tasks",
      value: "156",
      description: "This quarter",
      icon: CheckCircle,
      trend: "+23% vs last quarter"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Contract Renewed",
      contract: "Software License Agreement",
      entity: "Acme Corp Ltd",
      user: "Sarah Johnson",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      action: "Review Task Assigned",
      contract: "Master Service Agreement",
      entity: "Global Holdings Inc",
      user: "Mike Chen",
      time: "4 hours ago",
      status: "pending"
    },
    {
      id: 3,
      action: "Alert Triggered",
      contract: "Property Lease",
      entity: "Regional Office LLC",
      user: "System",
      time: "1 day ago",
      status: "alert"
    }
  ];

  const quickActions = [
    { label: "Add New Contract", action: "add" },
    { label: "Bulk Upload", action: "upload" },
    { label: "Generate Report", action: "report" },
    { label: "Configure Alerts", action: "alerts" }
  ];

  return (
    <div className="space-y-6">
      {/* Entity Switcher */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <select className="flex-1 bg-transparent border-none text-sm focus:outline-none">
              <option>All Entities</option>
              <option>Acme Corp Ltd</option>
              <option>Global Holdings Inc</option>
              <option>Regional Office LLC</option>
              <option>Tech Subsidiary Co</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <Badge 
                variant={stat.variant || "secondary"} 
                className="mt-2 text-xs"
              >
                {stat.trend}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest contract updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'completed' ? 'bg-green-500' :
                    activity.status === 'pending' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.contract}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{activity.entity}</span>
                      <span>•</span>
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common contract management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Button key={index} variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
