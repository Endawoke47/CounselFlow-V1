
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, Clock, CheckCircle, Shield, Building2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function RiskOverviewDashboard() {
  const riskSummary = [
    {
      title: "Total Active Risks",
      value: "142",
      description: "Across all business units",
      icon: AlertTriangle,
      trend: "+8 this month",
      variant: "default" as const
    },
    {
      title: "Critical Risks",
      value: "12",
      description: "Requiring immediate attention",
      icon: Shield,
      trend: "-2 from last month",
      variant: "destructive" as const
    },
    {
      title: "Overdue Mitigations",
      value: "23",
      description: "Past target completion",
      icon: Clock,
      trend: "+5 this week",
      variant: "secondary" as const
    },
    {
      title: "Resolved This Quarter",
      value: "67",
      description: "Successfully mitigated",
      icon: CheckCircle,
      trend: "+23% vs last quarter",
      variant: "default" as const
    }
  ];

  const riskTrends = [
    { month: "Jan", risks: 45, resolved: 32 },
    { month: "Feb", risks: 52, resolved: 38 },
    { month: "Mar", risks: 48, resolved: 41 },
    { month: "Apr", risks: 56, resolved: 35 },
    { month: "May", risks: 61, resolved: 43 },
    { month: "Jun", risks: 58, resolved: 47 }
  ];

  const riskByType = [
    { name: "Contractual", value: 35, color: "#8884d8" },
    { name: "Litigation", value: 28, color: "#82ca9d" },
    { name: "Compliance", value: 22, color: "#ffc658" },
    { name: "IP & Licensing", value: 18, color: "#ff7300" },
    { name: "Cyber & Privacy", value: 15, color: "#0088fe" },
    { name: "Regulatory", value: 12, color: "#00c49f" },
    { name: "Operational", value: 8, color: "#ffbb28" },
    { name: "Reputational", value: 4, color: "#ff8042" }
  ];

  const topRisks = [
    {
      id: 1,
      title: "Data Privacy Compliance Gap",
      category: "Compliance",
      severity: "Critical",
      likelihood: "High",
      entity: "EU Operations",
      owner: "Privacy Officer",
      dueDate: "2024-11-20"
    },
    {
      id: 2,
      title: "Major Contract Termination Risk",
      category: "Contractual",
      severity: "High",
      likelihood: "Medium",
      entity: "Global Holdings",
      owner: "Commercial Team",
      dueDate: "2024-11-25"
    },
    {
      id: 3,
      title: "Patent Opposition Proceedings",
      category: "IP & Licensing",
      severity: "High",
      likelihood: "High",
      entity: "Technology Division",
      owner: "IP Counsel",
      dueDate: "2024-12-01"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "destructive";
      case "High": return "secondary";
      case "Medium": return "outline";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Entity Switcher */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <select className="flex-1 bg-transparent border-none text-sm focus:outline-none">
              <option>All Entities</option>
              <option>Global Holdings Inc</option>
              <option>EU Operations Ltd</option>
              <option>APAC Subsidiary</option>
              <option>Technology Division</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {riskSummary.map((stat, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <Badge variant={stat.variant} className="mt-2 text-xs">
                {stat.trend}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Trends</CardTitle>
            <CardDescription>Monthly risk identification vs resolution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="risks" fill="#ef4444" name="New Risks" />
                <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution by Type</CardTitle>
            <CardDescription>Current active risks by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskByType}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {riskByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Risks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Priority Risks</CardTitle>
          <CardDescription>Highest severity risks requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topRisks.map((risk) => (
              <div key={risk.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{risk.title}</h4>
                    <Badge variant={getSeverityColor(risk.severity) as any}>
                      {risk.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{risk.category}</span>
                    <span>•</span>
                    <span>{risk.entity}</span>
                    <span>•</span>
                    <span>Owner: {risk.owner}</span>
                    <span>•</span>
                    <span>Due: {risk.dueDate}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
