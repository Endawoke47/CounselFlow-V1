
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  const stats = [
    {
      title: "Total IP Assets",
      value: "156",
      change: "+12 this quarter",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Patents",
      value: "34",
      change: "8 pending approval",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Renewals Due",
      value: "7",
      change: "Next 30 days",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "IP Revenue",
      value: "$2.3M",
      change: "+18% YoY",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
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

  const portfolioValue = [
    {
      category: "Patents",
      value: 1200000,
      percentage: 52,
      count: 34
    },
    {
      category: "Trademarks",
      value: 680000,
      percentage: 30,
      count: 89
    },
    {
      category: "Trade Secrets",
      value: 420000,
      percentage: 18,
      count: 33
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Patent": return "bg-blue-100 text-blue-800";
      case "Trademark": return "bg-green-100 text-green-800";
      case "Copyright": return "bg-purple-100 text-purple-800";
      case "Trade Secret": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Value Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioValue.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.category}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold">
                        ${(item.value / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.count} assets
                      </div>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {item.percentage}% of total portfolio
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Renewals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Renewals</CardTitle>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingRenewals.map((renewal) => (
                <div key={renewal.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{renewal.title}</h4>
                      <Badge className={getTypeColor(renewal.type)}>
                        {renewal.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{renewal.id}</span>
                      <span>{renewal.jurisdiction}</span>
                      <span>Due: {renewal.renewalDate}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">{renewal.cost}</div>
                    <Button variant="ghost" size="sm">
                      Schedule
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Alerts and Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">7</div>
            <p className="text-xs text-muted-foreground mt-1">
              Assets requiring action within 60 days
            </p>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              Review Items
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Costs</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$58K</div>
            <p className="text-xs text-muted-foreground mt-1">
              Projected annual maintenance fees
            </p>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              View Budget
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">324%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Average return on IP investments
            </p>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              View Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
