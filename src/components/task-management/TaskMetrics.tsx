
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

export function TaskMetrics() {
  const metricsCards = [
    {
      title: "Task Completion Rate",
      value: "78%",
      change: "+5% from last month",
      icon: CheckCircle,
      trend: "up",
      color: "text-green-600"
    },
    {
      title: "Avg. Time to Complete",
      value: "8.5 days",
      change: "-1.2 days from last month",
      icon: Clock,
      trend: "down",
      color: "text-blue-600"
    },
    {
      title: "Overdue Tasks",
      value: "8",
      change: "+3 from last week",
      icon: AlertTriangle,
      trend: "up",
      color: "text-red-600"
    },
    {
      title: "Active Assignees",
      value: "23",
      change: "2 new this month",
      icon: Users,
      trend: "up",
      color: "text-purple-600"
    }
  ];

  const tasksByModule = [
    { name: "Contracts", value: 15, color: "#8884d8" },
    { name: "IP Management", value: 12, color: "#82ca9d" },
    { name: "Compliance", value: 8, color: "#ffc658" },
    { name: "Disputes", value: 7, color: "#ff7300" },
    { name: "Company Secretarial", value: 5, color: "#0088fe" }
  ];

  const completionTrends = [
    { month: "Sep", completed: 32, total: 45 },
    { month: "Oct", completed: 38, total: 48 },
    { month: "Nov", completed: 41, total: 52 },
    { month: "Dec", completed: 45, total: 58 },
    { month: "Jan", completed: 37, total: 47 }
  ];

  const teamPerformance = [
    { name: "Sarah Chen", completed: 12, assigned: 15, rate: 80 },
    { name: "David Park", completed: 9, assigned: 11, rate: 82 },
    { name: "Emily Rodriguez", completed: 8, assigned: 10, rate: 80 },
    { name: "Michael Kim", completed: 6, assigned: 8, rate: 75 },
    { name: "Lisa Wang", completed: 5, assigned: 7, rate: 71 }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsCards.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks by Module */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks by Module</CardTitle>
            <CardDescription>Distribution of active tasks across modules</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tasksByModule}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {tasksByModule.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Completion Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Trends</CardTitle>
            <CardDescription>Monthly task completion vs total assigned</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={completionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#e5e7eb" name="Total Tasks" />
                <Bar dataKey="completed" fill="#22c55e" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
          <CardDescription>Individual completion rates and task loads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamPerformance.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {member.completed} of {member.assigned} tasks completed
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">{member.rate}%</div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${member.rate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
