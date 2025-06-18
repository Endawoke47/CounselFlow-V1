import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DrillDownSlideOver } from "@/components/ui/slide-over";
import { useDrillDown } from "@/hooks/useDrillDown";
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  Calendar,
  FileText,
  Clock,
  Target
} from "lucide-react";

export function IPDashboardOverview() {
  const { drillDownData, isSlideOverOpen, openDrillDown, closeDrillDown } = useDrillDown();

  const stats = [
    {
      title: "Total IP Assets",
      value: "156",
      change: "+12 this quarter",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      dataType: "compliance",
      filters: { type: "ip_assets" }
    },
    {
      title: "Active Patents",
      value: "34",
      change: "8 pending approval",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
      dataType: "compliance",
      filters: { type: "patents", status: "active" }
    },
    {
      title: "Renewals Due",
      value: "7",
      change: "Next 30 days",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      dataType: "tasks",
      filters: { type: "renewals", status: "due" }
    },
    {
      title: "IP Revenue",
      value: "$2.3M",
      change: "+18% YoY",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      dataType: "matters",
      filters: { type: "ip_revenue" }
    }
  ];

  const upcomingRenewals = [
    {
      id: "PAT-001",
      title: "Machine Learning Algorithm Patent",
      type: "Patent",
      renewalDate: "2024-03-15",
      jurisdiction: "US",
      cost: "$12,500"
    },
    {
      id: "TM-045",
      title: "CounselFlow Trademark",
      type: "Trademark",
      renewalDate: "2024-03-22",
      jurisdiction: "EU",
      cost: "$3,200"
    },
    {
      id: "PAT-023",
      title: "Data Processing System",
      type: "Patent",
      renewalDate: "2024-04-01",
      jurisdiction: "UK",
      cost: "$8,900"
    }
  ];

  const portfolioBreakdown = [
    { type: "Patents", count: 34, percentage: 22 },
    { type: "Trademarks", count: 67, percentage: 43 },
    { type: "Copyrights", count: 28, percentage: 18 },
    { type: "Trade Secrets", count: 27, percentage: 17 }
  ];

  const jurisdictionData = [
    { jurisdiction: "United States", assets: 45, renewals: 3 },
    { jurisdiction: "European Union", assets: 38, renewals: 2 },
    { jurisdiction: "United Kingdom", assets: 29, renewals: 1 },
    { jurisdiction: "Canada", assets: 22, renewals: 1 },
    { jurisdiction: "Australia", assets: 22, renewals: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">IP Portfolio Overview</h2>
          <p className="text-muted-foreground">
            Monitor and manage intellectual property assets across all jurisdictions
          </p>
        </div>
        <Button className="gap-2">
          <Target className="h-4 w-4" />
          New Application
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => openDrillDown(stat.dataType, stat.title, "IP Management", stat.filters)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Renewals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Upcoming Renewals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingRenewals.map((renewal) => (
                <div 
                  key={renewal.id} 
                  className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => openDrillDown("tasks", `${renewal.type} Renewals`, "IP Management", { type: renewal.type.toLowerCase() })}
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    {renewal.type === "Patent" ? 
                      <Shield className="h-4 w-4 text-primary" /> : 
                      <FileText className="h-4 w-4 text-primary" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{renewal.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {renewal.id} • {renewal.jurisdiction}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {renewal.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Due: {renewal.renewalDate}
                      </span>
                      <span className="text-xs font-medium text-green-600">
                        {renewal.cost}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Portfolio Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {portfolioBreakdown.map((item, index) => (
              <div 
                key={index} 
                className="space-y-2 cursor-pointer hover:bg-accent p-2 rounded transition-colors"
                onClick={() => openDrillDown("compliance", `${item.type} Portfolio`, "IP Management", { type: item.type.toLowerCase() })}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.type}</span>
                  <span className="text-sm">{item.count} assets</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                  {item.percentage}% of portfolio
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Jurisdiction Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Assets by Jurisdiction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jurisdictionData.map((jurisdiction, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                onClick={() => openDrillDown("compliance", `${jurisdiction.jurisdiction} IP Assets`, "IP Management", { jurisdiction: jurisdiction.jurisdiction })}
              >
                <div className="flex-1">
                  <div className="font-medium">{jurisdiction.jurisdiction}</div>
                  <div className="text-sm text-muted-foreground">
                    {jurisdiction.assets} total assets
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{jurisdiction.assets}</div>
                  <div className="text-sm text-muted-foreground">
                    {jurisdiction.renewals} renewals due
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Revenue Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="text-center cursor-pointer hover:bg-accent p-4 rounded transition-colors"
              onClick={() => openDrillDown("matters", "IP Revenue Streams", "IP Management", { type: "revenue" })}
            >
              <div className="text-2xl font-bold text-green-600">$2.3M</div>
              <div className="text-sm text-muted-foreground">This Year</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Protection Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="space-y-2 cursor-pointer hover:bg-accent p-2 rounded transition-colors"
              onClick={() => openDrillDown("compliance", "IP Protection Status", "IP Management", { metric: "protection_rate" })}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Protected</span>
                <span className="text-sm">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              At Risk Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="text-center cursor-pointer hover:bg-accent p-4 rounded transition-colors"
              onClick={() => openDrillDown("risks", "At Risk IP Assets", "IP Management", { status: "at_risk" })}
            >
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-muted-foreground">Require Action</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Avg Processing Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="text-center cursor-pointer hover:bg-accent p-4 rounded transition-colors"
              onClick={() => openDrillDown("tasks", "Application Processing", "IP Management", { metric: "processing_time" })}
            >
              <div className="text-2xl font-bold text-purple-600">18 mo</div>
              <div className="text-sm text-muted-foreground">Patent Applications</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drill Down Slide Over */}
      <DrillDownSlideOver
        isOpen={isSlideOverOpen}
        onClose={closeDrillDown}
        data={drillDownData}
      />
    </div>
  );
}
