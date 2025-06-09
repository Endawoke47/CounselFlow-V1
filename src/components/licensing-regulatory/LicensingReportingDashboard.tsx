
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { Download, Calendar, FileText, TrendingUp, AlertTriangle } from "lucide-react";

export function LicensingReportingDashboard() {
  const stats = [
    {
      title: "Active Licenses",
      value: "124",
      change: "+8 this month",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Expiring Licenses",
      value: "12",
      change: "Next 90 days",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "SLA Breaches",
      value: "3",
      change: "This quarter",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Updates Reviewed",
      value: "89%",
      change: "Completion rate",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const licenseStatusData = [
    { name: "Active", value: 109, color: "#22c55e" },
    { name: "Expiring", value: 12, color: "#f59e0b" },
    { name: "Overdue", value: 3, color: "#ef4444" }
  ];

  const updatesByRegionData = [
    { region: "EU", regulations: 45, caselaw: 23 },
    { region: "UK", regulations: 32, caselaw: 18 },
    { region: "US", regulations: 28, caselaw: 35 },
    { region: "APAC", regulations: 19, caselaw: 12 }
  ];

  const complianceTimelineData = [
    { month: "Jan", actions: 12, completed: 10 },
    { month: "Feb", actions: 18, completed: 15 },
    { month: "Mar", actions: 24, completed: 20 },
    { month: "Apr", actions: 16, completed: 14 },
    { month: "May", actions: 22, completed: 18 },
    { month: "Jun", actions: 28, completed: 25 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
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

      {/* Report Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Compliance & Exposure Reports</CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="q2-2024">
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q2-2024">Q2 2024</SelectItem>
                  <SelectItem value="q1-2024">Q1 2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* License Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">License Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={licenseStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {licenseStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {licenseStatusData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Updates by Region */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Regulatory Updates by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={updatesByRegionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="regulations" fill="#3b82f6" name="Regulations" />
                    <Bar dataKey="caselaw" fill="#8b5cf6" name="Case Law" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Timeline */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Compliance Actions Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={complianceTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="actions" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Total Actions"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    name="Completed Actions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk Summary Table */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">High-Risk Items Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">EU AI Act Compliance Gap</p>
                    <p className="text-sm text-muted-foreground">3 entities affected • Data Processing function</p>
                  </div>
                  <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">UK Data Protection License Renewal</p>
                    <p className="text-sm text-muted-foreground">Expires in 45 days • TechCorp UK Ltd</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Medium Risk</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">US Privacy Law Updates</p>
                    <p className="text-sm text-muted-foreground">2 pending compliance actions</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Low Risk</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
