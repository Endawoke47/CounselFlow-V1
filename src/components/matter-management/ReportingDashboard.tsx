
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download,
  Calendar,
  Clock,
  Target,
  Users,
  DollarSign,
  FileText
} from "lucide-react";

export function ReportingDashboard() {
  const reportMetrics = [
    {
      title: "Matters Completed",
      value: "78",
      change: "+12% vs last month",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Avg Resolution Time",
      value: "12.5 days",
      change: "-8% improvement",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Team Utilization",
      value: "84%",
      change: "+5% vs last month",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Budget Efficiency",
      value: "92%",
      change: "Within budget targets",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const mattersByType = [
    { type: "Contract Review", count: 23, percentage: 32 },
    { type: "Legal Advice", count: 18, percentage: 25 },
    { type: "Compliance", count: 15, percentage: 21 },
    { type: "Employment Law", count: 10, percentage: 14 },
    { type: "Other", count: 6, percentage: 8 }
  ];

  const mattersByPriority = [
    { priority: "Critical", count: 5, percentage: 7 },
    { priority: "High", count: 18, percentage: 25 },
    { priority: "Medium", count: 32, percentage: 44 },
    { priority: "Low", count: 17, percentage: 24 }
  ];

  const teamPerformance = [
    {
      name: "Sarah Chen",
      completed: 15,
      inProgress: 8,
      avgTime: "2.8 days",
      efficiency: 94
    },
    {
      name: "David Park",
      completed: 12,
      inProgress: 6,
      avgTime: "3.2 days",
      efficiency: 88
    },
    {
      name: "Emily Rodriguez",
      completed: 14,
      inProgress: 5,
      avgTime: "3.1 days",
      efficiency: 91
    },
    {
      name: "Michael Johnson",
      completed: 11,
      inProgress: 7,
      avgTime: "3.5 days",
      efficiency: 85
    }
  ];

  const monthlyTrends = [
    { month: "Oct", completed: 45, created: 52 },
    { month: "Nov", completed: 58, created: 61 },
    { month: "Dec", completed: 62, created: 59 },
    { month: "Jan", completed: 71, created: 68 },
    { month: "Feb", completed: 78, created: 75 }
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

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-600";
    if (efficiency >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Matter Management Reports
            </CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="last30">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Last 7 days</SelectItem>
                  <SelectItem value="last30">Last 30 days</SelectItem>
                  <SelectItem value="last90">Last 90 days</SelectItem>
                  <SelectItem value="lastYear">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matters by Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Matters by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mattersByType.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" style={{
                      backgroundColor: `hsl(${220 + index * 30}, 60%, 50%)`
                    }} />
                    <span className="text-sm">{item.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.count}</div>
                    <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Matters by Priority */}
        <Card>
          <CardHeader>
            <CardTitle>Matters by Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mattersByPriority.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm font-medium">{item.count} matters</div>
                      <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamPerformance.map((member, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{member.name}</h4>
                  <div className={`text-sm font-medium ${getEfficiencyColor(member.efficiency)}`}>
                    {member.efficiency}% efficiency
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                    <div className="text-lg font-bold text-green-600">{member.completed}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                    <div className="text-lg font-bold text-blue-600">{member.inProgress}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Avg Time</div>
                    <div className="text-lg font-bold">{member.avgTime}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Efficiency</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${member.efficiency}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Monthly Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4">
              {monthlyTrends.map((month, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">{month.month}</div>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-muted-foreground">Created</div>
                      <div className="text-sm font-medium">{month.created}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                      <div className="text-sm font-medium text-green-600">{month.completed}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <h4 className="font-medium">Executive Summary</h4>
                <p className="text-sm text-muted-foreground">Generate monthly executive report</p>
              </div>
            </div>
            <Button className="w-full mt-3" variant="outline">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="font-medium">Scheduled Reports</h4>
                <p className="text-sm text-muted-foreground">Manage automated reporting</p>
              </div>
            </div>
            <Button className="w-full mt-3" variant="outline">
              Configure Schedule
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div>
                <h4 className="font-medium">Custom Dashboard</h4>
                <p className="text-sm text-muted-foreground">Create custom analytics view</p>
              </div>
            </div>
            <Button className="w-full mt-3" variant="outline">
              Customize View
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
