
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Download, Calendar, FileText, AlertTriangle, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

export function LicensingReportingDashboard() {
  const kpis = [
    { title: "Active Licenses", value: 124, change: "+8", trend: "up" },
    { title: "Expiring Soon", value: 12, change: "Next 90 days", trend: "warning" },
    { title: "SLA Breaches", value: 3, change: "-2 from last month", trend: "down" },
    { title: "Updates Reviewed", value: 89, change: "91% completion", trend: "up" }
  ];

  const licenseStatusData = [
    { name: "Active", value: 109, color: "#22c55e" },
    { name: "Expiring", value: 12, color: "#f59e0b" },
    { name: "Overdue", value: 3, color: "#ef4444" }
  ];

  const updatesByRegionData = [
    { region: "EU", regulations: 15, caselaw: 8, proposed: 12 },
    { region: "UK", regulations: 12, caselaw: 5, proposed: 8 },
    { region: "US", regulations: 18, caselaw: 12, proposed: 15 },
    { region: "APAC", regulations: 9, caselaw: 4, proposed: 6 }
  ];

  const volumeData = [
    { month: "Jan", updates: 25 },
    { month: "Feb", updates: 32 },
    { month: "Mar", updates: 28 },
    { month: "Apr", updates: 45 },
    { month: "May", updates: 38 },
    { month: "Jun", updates: 42 }
  ];

  const actionStatusData = [
    { function: "Legal", completed: 12, inProgress: 8, notStarted: 4 },
    { function: "Compliance", completed: 15, inProgress: 6, notStarted: 3 },
    { function: "Data Processing", completed: 8, inProgress: 12, notStarted: 6 },
    { function: "HR", completed: 5, inProgress: 4, notStarted: 2 }
  ];

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Compliance & Exposure Reports</h2>
          <p className="text-muted-foreground">Generate comprehensive reports for stakeholders</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="current-month">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="year-to-date">Year to Date</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {kpi.trend === "up" && <TrendingUp className="h-4 w-4 text-green-600" />}
              {kpi.trend === "warning" && <AlertTriangle className="h-4 w-4 text-orange-600" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* License Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>License Status Distribution</CardTitle>
            <CardDescription>Current status of all licenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={licenseStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {licenseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Updates by Region */}
        <Card>
          <CardHeader>
            <CardTitle>Regulatory Updates by Region</CardTitle>
            <CardDescription>Distribution of updates by jurisdiction</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={updatesByRegionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="regulations" fill="#3b82f6" name="Regulations" />
                <Bar dataKey="caselaw" fill="#8b5cf6" name="Case Law" />
                <Bar dataKey="proposed" fill="#f59e0b" name="Proposed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Update Volume Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Update Volume Trend</CardTitle>
            <CardDescription>Monthly regulatory update volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="updates" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Action Status by Function */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Actions by Function</CardTitle>
            <CardDescription>Status of actions across business functions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={actionStatusData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="function" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="completed" stackId="a" fill="#22c55e" name="Completed" />
                <Bar dataKey="inProgress" stackId="a" fill="#3b82f6" name="In Progress" />
                <Bar dataKey="notStarted" stackId="a" fill="#94a3b8" name="Not Started" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>High Risk Items Summary</CardTitle>
          <CardDescription>Items requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">3 Licenses Overdue for Renewal</p>
                  <p className="text-sm text-muted-foreground">Broadcasting License, Financial Services License</p>
                </div>
              </div>
              <Badge className="bg-red-100 text-red-800">Critical</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">5 High-Risk Regulatory Updates</p>
                  <p className="text-sm text-muted-foreground">EU AI Act, Data Protection Amendments</p>
                </div>
              </div>
              <Badge className="bg-orange-100 text-orange-800">High</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">12 Compliance Actions Due Soon</p>
                  <p className="text-sm text-muted-foreground">Next 30 days</p>
                </div>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Pre-configured reports for different stakeholders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <FileText className="h-6 w-6" />
              <span>Board Snapshot</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              <span>SLA Violations</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>Risk Summary</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
