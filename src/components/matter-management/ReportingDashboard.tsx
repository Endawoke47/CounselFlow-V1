
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  FileText, 
  AlertTriangle,
  Download,
  Calendar,
  DollarSign
} from "lucide-react";

export function ReportingDashboard() {
  const mattersByType = [
    { name: "Contract Review", value: 15, color: "#3b82f6" },
    { name: "Legal Advice", value: 12, color: "#10b981" },
    { name: "Compliance", value: 8, color: "#f59e0b" },
    { name: "Litigation", value: 5, color: "#ef4444" },
    { name: "Regulatory", value: 7, color: "#8b5cf6" }
  ];

  const monthlyTrends = [
    { month: "Jan", matters: 42, resolved: 38, pending: 4 },
    { month: "Feb", matters: 45, resolved: 41, pending: 4 },
    { month: "Mar", matters: 38, resolved: 35, pending: 3 },
    { month: "Apr", matters: 52, resolved: 48, pending: 4 },
    { month: "May", matters: 47, resolved: 44, pending: 3 },
    { month: "Jun", matters: 49, resolved: 45, pending: 4 }
  ];

  const slaPerformance = [
    { department: "HR", onTime: 92, breached: 8 },
    { department: "IT", onTime: 85, breached: 15 },
    { department: "Procurement", onTime: 88, breached: 12 },
    { department: "Finance", onTime: 95, breached: 5 },
    { department: "Operations", onTime: 82, breached: 18 }
  ];

  const workloadData = [
    { name: "Jan", workload: 85 },
    { name: "Feb", workload: 88 },
    { name: "Mar", workload: 75 },
    { name: "Apr", workload: 92 },
    { name: "May", workload: 89 },
    { name: "Jun", workload: 87 }
  ];

  const keyMetrics = [
    {
      title: "Total Matters",
      value: "47",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Avg Resolution Time",
      value: "12.5 days",
      change: "-1.2 days",
      trend: "down",
      icon: Clock,
      color: "text-green-600"
    },
    {
      title: "SLA Compliance",
      value: "89%",
      change: "+3%",
      trend: "up",
      icon: AlertTriangle,
      color: "text-orange-600"
    },
    {
      title: "Team Utilization",
      value: "85%",
      change: "-2%",
      trend: "down",
      icon: Users,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Matter Management Reporting</h2>
          <p className="text-muted-foreground">Analytics and insights for legal matters</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="last-6-months">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                )}
                <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {metric.change}
                </span>
                <span className="ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matter Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Matters by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mattersByType}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mattersByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* SLA Performance */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Performance by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={slaPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="onTime" fill="#10b981" name="On Time" />
                <Bar dataKey="breached" fill="#ef4444" name="Breached" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Matter Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="matters" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Total Matters" />
              <Area type="monotone" dataKey="resolved" stackId="2" stroke="#10b981" fill="#10b981" name="Resolved" />
              <Area type="monotone" dataKey="pending" stackId="2" stroke="#f59e0b" fill="#f59e0b" name="Pending" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Workload */}
        <Card>
          <CardHeader>
            <CardTitle>Team Workload Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={workloadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="workload" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Matters Resolved</p>
                <p className="text-sm text-green-600">This month</p>
              </div>
              <div className="text-2xl font-bold text-green-800">42</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <p className="font-medium text-orange-800">SLA Breaches</p>
                <p className="text-sm text-orange-600">This month</p>
              </div>
              <div className="text-2xl font-bold text-orange-800">5</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Active Matters</p>
                <p className="text-sm text-blue-600">Currently open</p>
              </div>
              <div className="text-2xl font-bold text-blue-800">23</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-purple-800">Team Members</p>
                <p className="text-sm text-purple-600">Active this month</p>
              </div>
              <div className="text-2xl font-bold text-purple-800">8</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
