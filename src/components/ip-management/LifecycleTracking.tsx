
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export function LifecycleTracking() {
  const upcomingDeadlines = [
    {
      id: "1",
      asset: "TechBrand Logo",
      type: "Trademark Renewal",
      dueDate: "2024-12-25",
      daysRemaining: 1,
      jurisdiction: "US",
      priority: "Critical",
      status: "Pending Action"
    },
    {
      id: "2",
      asset: "AI Processing Method",
      type: "Patent Office Action Response",
      dueDate: "2024-12-30",
      daysRemaining: 5,
      jurisdiction: "EP",
      priority: "High",
      status: "In Progress"
    },
    {
      id: "3",
      asset: "DataFlow System",
      type: "Opposition Period Monitoring",
      dueDate: "2025-01-15",
      daysRemaining: 21,
      jurisdiction: "UK",
      priority: "Medium",
      status: "Monitoring"
    }
  ];

  const lifecycleStats = [
    { label: "Due This Week", value: 3, color: "text-red-600" },
    { label: "Due This Month", value: 12, color: "text-orange-600" },
    { label: "Due Next Quarter", value: 28, color: "text-blue-600" },
    { label: "Auto-Managed", value: 156, color: "text-green-600" }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "High":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case "Medium":
        return <Badge className="bg-blue-100 text-blue-800">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending Action":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "Monitoring":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Lifecycle Tracking</h2>
          <p className="text-muted-foreground">
            Monitor deadlines, renewals, and compliance requirements
          </p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Calendar View
        </Button>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {lifecycleStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
          <CardDescription>Critical actions required in the next 90 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {getStatusIcon(deadline.status)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{deadline.asset}</div>
                    <div className="text-sm text-muted-foreground">{deadline.jurisdiction}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{deadline.type}</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span className="text-sm">Due: {deadline.dueDate}</span>
                    <span className="text-sm font-medium">
                      ({deadline.daysRemaining} {deadline.daysRemaining === 1 ? 'day' : 'days'} remaining)
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 space-y-2">
                  {getPriorityBadge(deadline.priority)}
                  <div className="text-center">
                    <Button size="sm" variant={deadline.priority === "Critical" ? "default" : "outline"}>
                      Take Action
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Risk Predictions</CardTitle>
            <CardDescription>Automated analysis of potential risks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">China Renewal Risk</span>
                <Badge className="bg-red-100 text-red-800">High</Badge>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground">
                12 trademarks at risk of lapse due to payment processing delays
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">USPTO Office Actions</span>
                <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-muted-foreground">
                3 patents likely to receive office actions based on filing patterns
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Opposition Risk</span>
                <Badge className="bg-green-100 text-green-800">Low</Badge>
              </div>
              <Progress value={25} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Recent filings show low opposition likelihood
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automation Status</CardTitle>
            <CardDescription>Automated processes and manual interventions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Automated Renewals</span>
              </div>
              <Badge className="bg-green-100 text-green-800">156 Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Smart Alerts</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">23 Pending</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Manual Review Required</span>
              </div>
              <Badge className="bg-orange-100 text-orange-800">8 Items</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
