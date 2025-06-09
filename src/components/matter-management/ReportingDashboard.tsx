
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download, Calendar, Filter, TrendingUp, Clock, Target, AlertTriangle } from "lucide-react";

const chartConfig = {
  matters: {
    label: "Matters",
    color: "hsl(var(--chart-1))",
  },
  advice: {
    label: "Advice",
    color: "hsl(var(--chart-2))",
  },
  sla: {
    label: "SLA Compliance",
    color: "hsl(var(--chart-3))",
  },
};

export function ReportingDashboard() {
  const mattersData = [
    { department: "HR", matters: 15, advice: 8, slaCompliance: 92 },
    { department: "IT", matters: 12, advice: 18, slaCompliance: 88 },
    { department: "Procurement", matters: 20, advice: 12, slaCompliance: 95 },
    { department: "Finance", matters: 8, advice: 5, slaCompliance: 100 },
    { department: "Operations", matters: 18, advice: 22, slaCompliance: 85 }
  ];

  const matterTypeData = [
    { name: "Contract Review", value: 35, color: "#3b82f6" },
    { name: "Legal Advice", value: 28, color: "#10b981" },
    { name: "Compliance", value: 20, color: "#f59e0b" },
    { name: "Regulatory", value: 12, color: "#ef4444" },
    { name: "Other", value: 5, color: "#8b5cf6" }
  ];

  const timelineData = [
    { month: "Jan", opened: 25, closed: 22, pending: 3 },
    { month: "Feb", opened: 30, closed: 28, pending: 5 },
    { month: "Mar", opened: 35, closed: 32, pending: 8 },
    { month: "Apr", opened: 28, closed: 30, pending: 6 },
    { month: "May", opened: 32, closed: 29, pending: 9 },
    { month: "Jun", opened: 38, closed: 35, pending: 12 }
  ];

  const topMatters = [
    { id: "MAT-2024-001", title: "M&A Due Diligence Review", exposure: "High", days: 45 },
    { id: "MAT-2024-015", title: "Regulatory Compliance Audit", exposure: "High", days: 38 },
    { id: "MAT-2024-023", title: "IP Licensing Agreement", exposure: "Medium", days: 32 },
    { id: "MAT-2024-031", title: "Employment Dispute", exposure: "Medium", days: 28 }
  ];

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Value & Performance Reporting
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Last 6 Months
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Entities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                <SelectItem value="parent">Parent Company</SelectItem>
                <SelectItem value="sub1">Subsidiary 1</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="it">Information Technology</SelectItem>
                <SelectItem value="procurement">Procurement</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Matter Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="contract">Contract Review</SelectItem>
                <SelectItem value="advice">Legal Advice</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
              </SelectContent>
            </Select>
            
            <Input type="date" placeholder="Date Range" />
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matters Handled</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
            <p className="text-xs text-muted-foreground">+12% from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">92%</div>
            <p className="text-xs text-muted-foreground">Above 90% target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Turnaround</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5 days</div>
            <p className="text-xs text-muted-foreground">-1.2 days from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Risk Matters</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mattersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="matters" fill="var(--color-matters)" />
                  <Bar dataKey="advice" fill="var(--color-advice)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Matter Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Matter Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={matterTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {matterTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Timeline and Top Matters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matter Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Matter Resolution Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="opened" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="closed" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top High-Risk Matters */}
        <Card>
          <CardHeader>
            <CardTitle>Top High-Risk Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topMatters.map((matter, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{matter.title}</p>
                    <p className="text-xs text-muted-foreground">{matter.id}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={
                      matter.exposure === "High" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"
                    }>
                      {matter.exposure}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{matter.days} days open</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Download className="h-6 w-6 mb-2" />
              Executive Summary
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <TrendingUp className="h-6 w-6 mb-2" />
              Performance Report
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <AlertTriangle className="h-6 w-6 mb-2" />
              Risk Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
