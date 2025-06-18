import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DrillDownSlideOver } from "@/components/ui/slide-over";
import { useDrillDown } from "@/hooks/useDrillDown";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  FileText,
  Users,
  DollarSign,
  Brain,
  Zap,
  Target,
  Activity,
  BarChart3,
  Calendar,
  Bell,
  Settings,
  RefreshCw,
  Download,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description?: string;
}

interface AIInsight {
  id: string;
  type: "risk" | "opportunity" | "trend" | "alert";
  title: string;
  description: string;
  confidence: number;
  priority: "low" | "medium" | "high" | "critical";
  module: string;
  actionRequired: boolean;
}

interface RecentActivity {
  id: string;
  type: "contract" | "matter" | "compliance" | "document" | "risk";
  title: string;
  description: string;
  timestamp: string;
  user: string;
  status: "completed" | "pending" | "failed";
}

interface UpcomingDeadline {
  id: string;
  title: string;
  type: "contract_renewal" | "compliance_review" | "matter_deadline" | "document_review";
  dueDate: string;
  priority: "low" | "medium" | "high" | "critical";
  assignee: string;
  module: string;
}

export function EnhancedDashboard() {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedModule, setSelectedModule] = useState("all");
  const { drillDownData, isSlideOverOpen, openDrillDown, closeDrillDown } = useDrillDown();

  // Mock data for demonstration
  const metrics: DashboardMetric[] = [
    {
      id: "contracts",
      title: "Active Contracts",
      value: "247",
      change: { value: "+12% from last month", type: "increase" },
      icon: FileText,
      color: "text-primary",
      description: "Total active contracts across all entities",
    },
    {
      id: "compliance",
      title: "Compliance Score",
      value: "94%",
      change: { value: "+3% from last quarter", type: "increase" },
      icon: Shield,
      color: "text-success-600",
      description: "Overall compliance across all frameworks",
    },
    {
      id: "matters",
      title: "Active Matters",
      value: "89",
      change: { value: "+7% from last month", type: "increase" },
      icon: Users,
      color: "text-info-600",
      description: "Legal matters currently being handled",
    },
    {
      id: "spend",
      title: "Legal Spend",
      value: "$2.4M",
      change: { value: "-5% from last quarter", type: "decrease" },
      icon: DollarSign,
      color: "text-warning-600",
      description: "Total legal spend this quarter",
    },
    {
      id: "risks",
      title: "High Risks",
      value: "23",
      change: { value: "-2 from last week", type: "decrease" },
      icon: AlertTriangle,
      color: "text-destructive",
      description: "High priority risks requiring attention",
    },
    {
      id: "automation",
      title: "Time Saved",
      value: "156h",
      change: { value: "+24h this month", type: "increase" },
      icon: Zap,
      color: "text-purple-600",
      description: "Time saved through automation",
    },
  ];

  const aiInsights: AIInsight[] = [
    {
      id: "insight-1",
      type: "risk",
      title: "Contract Renewal Risk",
      description: "15 high-value contracts are approaching renewal with potential for unfavorable terms based on market analysis.",
      confidence: 92,
      priority: "high",
      module: "Contracts",
      actionRequired: true,
    },
    {
      id: "insight-2",
      type: "opportunity",
      title: "Vendor Consolidation Opportunity",
      description: "Analysis shows potential 18% cost savings through vendor consolidation in legal services.",
      confidence: 87,
      priority: "medium",
      module: "Spend Management",
      actionRequired: true,
    },
    {
      id: "insight-3",
      type: "trend",
      title: "Increasing Data Privacy Litigation",
      description: "45% increase in data privacy related matters industry-wide. Recommend proactive compliance review.",
      confidence: 94,
      priority: "medium",
      module: "Data Protection",
      actionRequired: false,
    },
    {
      id: "insight-4",
      type: "alert",
      title: "Regulatory Change Impact",
      description: "New EU AI Act requirements will affect 12 active contracts. Immediate review recommended.",
      confidence: 98,
      priority: "critical",
      module: "Compliance",
      actionRequired: true,
    },
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: "activity-1",
      type: "contract",
      title: "Microsoft License Agreement",
      description: "Contract approved and executed",
      timestamp: "2024-06-30T14:30:00Z",
      user: "Sarah Johnson",
      status: "completed",
    },
    {
      id: "activity-2",
      type: "compliance",
      title: "GDPR Compliance Review",
      description: "Quarterly compliance assessment completed",
      timestamp: "2024-06-30T11:15:00Z",
      user: "Legal Team",
      status: "completed",
    },
    {
      id: "activity-3",
      type: "document",
      title: "Employment Agreement Template",
      description: "New template created with AI assistance",
      timestamp: "2024-06-30T09:45:00Z",
      user: "HR Team",
      status: "completed",
    },
    {
      id: "activity-4",
      type: "matter",
      title: "IP Dispute Resolution",
      description: "Matter assigned to external counsel",
      timestamp: "2024-06-29T16:20:00Z",
      user: "Mike Chen",
      status: "pending",
    },
  ];

  const upcomingDeadlines: UpcomingDeadline[] = [
    {
      id: "deadline-1",
      title: "Oracle License Renewal",
      type: "contract_renewal",
      dueDate: "2024-07-15",
      priority: "high",
      assignee: "Sarah Johnson",
      module: "Contracts",
    },
    {
      id: "deadline-2",
      title: "SOX Controls Review",
      type: "compliance_review",
      dueDate: "2024-07-08",
      priority: "critical",
      assignee: "Compliance Team",
      module: "Compliance",
    },
    {
      id: "deadline-3",
      title: "Employment Dispute Response",
      type: "matter_deadline",
      dueDate: "2024-07-05",
      priority: "high",
      assignee: "Legal Team",
      module: "Matters",
    },
    {
      id: "deadline-4",
      title: "Privacy Policy Update",
      type: "document_review",
      dueDate: "2024-07-12",
      priority: "medium",
      assignee: "Data Protection Officer",
      module: "Data Protection",
    },
  ];

  // Chart data
  const contractTrendData = [
    { month: "Jan", contracts: 220, value: 2100000 },
    { month: "Feb", contracts: 235, value: 2250000 },
    { month: "Mar", contracts: 242, value: 2300000 },
    { month: "Apr", contracts: 238, value: 2280000 },
    { month: "May", contracts: 245, value: 2350000 },
    { month: "Jun", contracts: 247, value: 2400000 },
  ];

  const complianceData = [
    { framework: "GDPR", score: 85 },
    { framework: "CCPA", score: 92 },
    { framework: "SOX", score: 94 },
    { framework: "HIPAA", score: 88 },
    { framework: "ISO 27001", score: 91 },
  ];

  const riskDistributionData = [
    { name: "Low", value: 89, color: "#10b981" },
    { name: "Medium", value: 44, color: "#f59e0b" },
    { name: "High", value: 23, color: "#ef4444" },
  ];

  const matterTypeData = [
    { type: "Commercial", count: 35, spend: 450000 },
    { type: "Employment", count: 22, spend: 280000 },
    { type: "IP", count: 18, spend: 320000 },
    { type: "Regulatory", count: 14, spend: 210000 },
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "increase":
        return <ArrowUpRight className="h-4 w-4 text-success-600" />;
      case "decrease":
        return <ArrowDownRight className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case "increase":
        return "text-success-600";
      case "decrease":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "risk":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "opportunity":
        return <TrendingUp className="h-4 w-4 text-success-600" />;
      case "trend":
        return <BarChart3 className="h-4 w-4 text-info-600" />;
      case "alert":
        return <Bell className="h-4 w-4 text-warning-600" />;
      default:
        return <Brain className="h-4 w-4 text-primary" />;
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive";
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "contract":
        return <FileText className="h-4 w-4 text-primary" />;
      case "matter":
        return <Users className="h-4 w-4 text-info-600" />;
      case "compliance":
        return <Shield className="h-4 w-4 text-success-600" />;
      case "document":
        return <FileText className="h-4 w-4 text-warning-600" />;
      case "risk":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-3 w-3 text-success-600" />;
      case "pending":
        return <Clock className="h-3 w-3 text-warning-600" />;
      case "failed":
        return <AlertTriangle className="h-3 w-3 text-destructive" />;
      default:
        return <Clock className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const criticalInsights = aiInsights.filter(i => i.priority === "critical" || i.priority === "high");
  const criticalDeadlines = upcomingDeadlines.filter(d => d.priority === "critical" || d.priority === "high");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Legal Operations Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive overview of legal operations with AI-powered insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
              <SelectItem value="1y">1 year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      {(criticalInsights.length > 0 || criticalDeadlines.length > 0) && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have {criticalInsights.length} critical AI insights and {criticalDeadlines.length} urgent deadlines requiring immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {metrics.map((metric) => (
          <Card 
            key={metric.id} 
            className="card-shadow hover:card-shadow-hover hover-lift transition-all duration-300 cursor-pointer"
            onClick={() => {
              const dataType = metric.id === "contracts" ? "contracts" : 
                              metric.id === "matters" ? "matters" :
                              metric.id === "compliance" ? "compliance" :
                              metric.id === "risks" ? "risks" :
                              metric.id === "spend" ? "matters" : "tasks";
              openDrillDown(dataType, `${metric.title} Details`, metric.title);
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              {metric.change && (
                <div className={`flex items-center gap-1 text-sm ${getChangeColor(metric.change.type)}`}>
                  {getChangeIcon(metric.change.type)}
                  <span>{metric.change.value}</span>
                </div>
              )}
              {metric.description && (
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contract Trends */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Contract Trends
                </CardTitle>
                <CardDescription>Contract volume and value over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart 
                    data={contractTrendData}
                    onClick={(data) => {
                      if (data && data.activePayload) {
                        const month = data.activePayload[0]?.payload?.month;
                        openDrillDown("contracts", `Contracts for ${month}`, "Contract Management", { month });
                      }
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="contracts" 
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      style={{ cursor: "pointer" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Compliance Scores */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-success-600" />
                  Compliance Scores
                </CardTitle>
                <CardDescription>Compliance status across frameworks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceData.map((item) => (
                    <div 
                      key={item.framework} 
                      className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                      onClick={() => openDrillDown("compliance", `${item.framework} Compliance`, "Data Protection", { framework: item.framework })}
                    >
                      <span className="text-sm font-medium">{item.framework}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={item.score} className="w-24" />
                        <span className="text-sm font-bold w-10">{item.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Distribution */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Risk Distribution
                </CardTitle>
                <CardDescription>Current risk levels across organization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onClick={(data) => {
                        if (data && data.name) {
                          openDrillDown("risks", `${data.name} Risks`, "Risk Management", { severity: data.name.toLowerCase() });
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Matter Analytics */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-info-600" />
                  Matter Analytics
                </CardTitle>
                <CardDescription>Legal matters by type and spend</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart 
                    data={matterTypeData}
                    onClick={(data) => {
                      if (data && data.activePayload) {
                        const type = data.activePayload[0]?.payload?.type;
                        openDrillDown("matters", `${type} Matters`, "Matter Management", { type: type?.toLowerCase() });
                      }
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="type" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                      style={{ cursor: "pointer" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aiInsights.map((insight) => (
              <Card key={insight.id} className="card-shadow hover:card-shadow-hover transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getInsightIcon(insight.type)}
                      <CardTitle className="text-base">{insight.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityBadgeVariant(insight.priority)} className="text-xs">
                        {insight.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{insight.module}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                  {insight.actionRequired && (
                    <div className="flex items-center gap-2">
                      <Button size="sm">
                        <Target className="h-4 w-4 mr-2" />
                        Take Action
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Key performance indicators over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={contractTrendData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="contracts" 
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Module Performance</CardTitle>
                <CardDescription>Performance metrics by module</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Contract Management</span>
                    <div className="flex items-center gap-2">
                      <Progress value={94} className="w-24" />
                      <span className="text-sm font-bold">94%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Matter Management</span>
                    <div className="flex items-center gap-2">
                      <Progress value={87} className="w-24" />
                      <span className="text-sm font-bold">87%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Compliance</span>
                    <div className="flex items-center gap-2">
                      <Progress value={92} className="w-24" />
                      <span className="text-sm font-bold">92%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risk Management</span>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="w-24" />
                      <span className="text-sm font-bold">78%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{activity.title}</h4>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(activity.status)}
                          <span className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        by {activity.user}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-4">
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline) => (
              <Card key={deadline.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{deadline.title}</h4>
                        <Badge variant={getPriorityBadgeVariant(deadline.priority)} className="text-xs">
                          {deadline.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {deadline.module} • Assigned to {deadline.assignee}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {new Date(deadline.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.ceil((new Date(deadline.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Drill Down Slide Over */}
      <DrillDownSlideOver
        isOpen={isSlideOverOpen}
        onClose={closeDrillDown}
        data={drillDownData}
      />
    </div>
  );
} 