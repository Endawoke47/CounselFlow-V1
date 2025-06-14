
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Scale, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Clock,
  Building2,
  Shield,
  BookOpen,
  DollarSign,
  CheckSquare,
  Target
} from "lucide-react";

export function DashboardOverview() {
  const stats = [
    {
      title: "Active Matters",
      value: "47",
      change: "+8% from last month",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Open Disputes",
      value: "12",
      change: "+2 new this week",
      icon: Scale,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Contract Reviews",
      value: "23",
      change: "5 due this week",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Legal Spend",
      value: "$284K",
      change: "-12% from last quarter",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const recentMatters = [
    {
      id: "MAT-2024-001",
      title: "Vendor Agreement Review - TechCorp",
      type: "Contract Review",
      priority: "High",
      assignee: "Sarah Chen",
      dueDate: "2024-02-15",
      status: "In Progress"
    },
    {
      id: "MAT-2024-002",
      title: "Employment Law Consultation",
      type: "Legal Advice",
      priority: "Medium",
      assignee: "David Park",
      dueDate: "2024-02-18",
      status: "Under Review"
    },
    {
      id: "MAT-2024-003",
      title: "IP License Agreement",
      type: "Contract Review",
      priority: "High",
      assignee: "Emily Rodriguez",
      dueDate: "2024-02-20",
      status: "Draft Review"
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Board Meeting Preparation",
      dueDate: "Tomorrow",
      assignee: "Legal Team",
      priority: "Critical"
    },
    {
      id: 2,
      title: "Compliance Audit Review",
      dueDate: "Feb 16",
      assignee: "Sarah Chen",
      priority: "High"
    },
    {
      id: 3,
      title: "Contract Template Update",
      dueDate: "Feb 18",
      assignee: "David Park",
      priority: "Medium"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Draft Review": return "bg-purple-100 text-purple-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Legal Operations Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your legal operations today.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Matters */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Matters</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMatters.map((matter) => (
                <div key={matter.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{matter.title}</h4>
                      <Badge className={getPriorityColor(matter.priority)}>
                        {matter.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{matter.id}</span>
                      <span>{matter.type}</span>
                      <span>Due: {matter.dueDate}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(matter.status)}>
                    {matter.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Tasks</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span>Due: {task.dueDate}</span>
                      <span>Assigned: {task.assignee}</span>
                    </div>
                  </div>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Workload</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Sarah Chen</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>David Park</span>
                  <span>72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Emily Rodriguez</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Performance</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94%</div>
            <p className="text-xs text-muted-foreground mt-1">
              On-time completion rate
            </p>
            <div className="mt-3">
              <Progress value={94} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">5</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active risk items requiring attention
            </p>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              Review Risks
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
