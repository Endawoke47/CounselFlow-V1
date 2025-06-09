
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, BarChart3, TrendingUp, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useState } from "react";

export function RiskReporting() {
  const [reportPeriod, setReportPeriod] = useState("current-quarter");
  const [reportEntity, setReportEntity] = useState("all");

  const riskTrendsData = [
    { month: "Jul", opened: 15, resolved: 12, total: 128 },
    { month: "Aug", opened: 18, resolved: 14, total: 132 },
    { month: "Sep", opened: 22, resolved: 16, total: 138 },
    { month: "Oct", opened: 19, resolved: 18, total: 139 },
    { month: "Nov", opened: 12, resolved: 9, total: 142 },
    { month: "Dec", opened: 8, resolved: 15, total: 135 }
  ];

  const riskByModuleData = [
    { module: "Contracts", count: 45, percentage: 32 },
    { module: "Litigation", count: 28, percentage: 20 },
    { module: "Compliance", count: 25, percentage: 18 },
    { module: "IP", count: 18, percentage: 13 },
    { module: "Outsourcing", count: 15, percentage: 11 },
    { module: "Regulatory", count: 9, percentage: 6 }
  ];

  const topRisksByEntity = [
    { entity: "Global Holdings Inc", critical: 4, high: 8, medium: 12, low: 3 },
    { entity: "EU Operations Ltd", critical: 3, high: 6, medium: 9, low: 5 },
    { entity: "APAC Subsidiary", critical: 2, high: 4, medium: 7, low: 4 },
    { entity: "Technology Division", critical: 3, high: 7, medium: 8, low: 2 }
  ];

  const reportTemplates = [
    {
      title: "Executive Risk Summary",
      description: "High-level risk overview for board and executive reporting",
      format: "PDF",
      icon: FileText,
      lastGenerated: "2024-11-10"
    },
    {
      title: "Detailed Risk Register",
      description: "Complete risk inventory with all details and mitigation plans",
      format: "Excel",
      icon: BarChart3,
      lastGenerated: "2024-11-12"
    },
    {
      title: "Risk Trend Analysis",
      description: "Quarterly trends and performance metrics",
      format: "PDF",
      icon: TrendingUp,
      lastGenerated: "2024-11-08"
    },
    {
      title: "Compliance Risk Report",
      description: "Regulatory and compliance-specific risk assessment",
      format: "PDF",
      icon: FileText,
      lastGenerated: "2024-11-05"
    }
  ];

  const keyMetrics = [
    { label: "Risk Resolution Rate", value: "73%", trend: "+5% vs last quarter", color: "text-green-600" },
    { label: "Average Time to Resolution", value: "32 days", trend: "-8 days vs last quarter", color: "text-green-600" },
    { label: "High-Risk Items", value: "12", trend: "-3 vs last month", color: "text-green-600" },
    { label: "Risk Concentration Index", value: "2.4", trend: "Stable", color: "text-blue-600" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Risk Reporting & Analytics</h2>
          <p className="text-muted-foreground">Generate reports and analyze risk trends</p>
        </div>
        <div className="flex gap-4">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Report Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-quarter">Current Quarter</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={reportEntity} onValueChange={setReportEntity}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Entity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entities</SelectItem>
              <SelectItem value="global">Global Holdings</SelectItem>
              <SelectItem value="eu">EU Operations</SelectItem>
              <SelectItem value="apac">APAC Subsidiary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <div className="text-xs text-muted-foreground">{metric.trend}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Trends Over Time</CardTitle>
            <CardDescription>Monthly risk identification and resolution patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={riskTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="opened" stroke="#ef4444" name="Opened" strokeWidth={2} />
                <Line type="monotone" dataKey="resolved" stroke="#22c55e" name="Resolved" strokeWidth={2} />
                <Line type="monotone" dataKey="total" stroke="#3b82f6" name="Total Active" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk by Module */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution by Module</CardTitle>
            <CardDescription>Risk count and percentage by business area</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskByModuleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="module" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Pre-configured reports for different stakeholders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTemplates.map((template, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <template.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{template.title}</h4>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{template.format}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Last generated: {template.lastGenerated}
                  </span>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Generate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Summary by Entity */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Summary by Entity</CardTitle>
          <CardDescription>Risk severity breakdown across business entities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topRisksByEntity.map((entity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="font-medium">{entity.entity}</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">{entity.critical} Critical</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">{entity.high} High</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">{entity.medium} Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{entity.low} Low</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
