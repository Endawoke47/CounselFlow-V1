
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Users, AlertTriangle, TrendingUp, Clock, CheckCircle } from "lucide-react";

export function SpendOverviewDashboard() {
  const overviewStats = [
    {
      title: "Total Spend (YTD)",
      value: "$2.4M",
      change: "+12% vs last year",
      icon: DollarSign,
      color: "text-blue-600"
    },
    {
      title: "Active Vendors",
      value: "47",
      change: "3 new this quarter",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Budget Utilization",
      value: "78%",
      change: "On track",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Pending Invoices",
      value: "12",
      change: "$184K value",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  const topVendors = [
    { name: "Davis Polk & Wardwell", spend: "$324K", matters: 8, rating: 4.8 },
    { name: "Clifford Chance", spend: "$298K", matters: 12, rating: 4.6 },
    { name: "Baker McKenzie", spend: "$267K", matters: 15, rating: 4.5 },
    { name: "Allen & Overy", spend: "$189K", matters: 6, rating: 4.7 },
    { name: "Freshfields", spend: "$156K", matters: 9, rating: 4.4 }
  ];

  const budgetBreakdown = [
    { category: "Litigation", budget: 850000, spent: 634000, percentage: 75 },
    { category: "M&A", budget: 520000, spent: 423000, percentage: 81 },
    { category: "Regulatory", budget: 380000, spent: 267000, percentage: 70 },
    { category: "IP", budget: 290000, spent: 198000, percentage: 68 },
    { category: "Employment", budget: 160000, spent: 124000, percentage: 78 }
  ];

  const alerts = [
    { type: "Budget", message: "M&A budget 81% utilized", severity: "warning" },
    { type: "Compliance", message: "3 vendors missing updated NDAs", severity: "error" },
    { type: "Performance", message: "Vendor review due: Norton Rose", severity: "info" },
    { type: "Invoice", message: "5 invoices overdue for approval", severity: "warning" }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Vendors by Spend */}
        <Card>
          <CardHeader>
            <CardTitle>Top Vendors by Spend</CardTitle>
            <CardDescription>Year-to-date external legal spend leaders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVendors.map((vendor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium">{vendor.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {vendor.matters} matters • Rating: {vendor.rating}/5
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{vendor.spend}</div>
                    <Badge variant="outline" className="text-xs">
                      Rank #{index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Budget vs. Actual by Category</CardTitle>
            <CardDescription>Current year budget utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.category}</span>
                    <span>${(item.spent / 1000).toFixed(0)}K / ${(item.budget / 1000).toFixed(0)}K</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">
                    {item.percentage}% utilized
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Recent Alerts & Notifications
          </CardTitle>
          <CardDescription>Items requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={
                      alert.severity === "error" ? "destructive" :
                      alert.severity === "warning" ? "secondary" : "outline"
                    }
                  >
                    {alert.type}
                  </Badge>
                  <span className="text-sm">{alert.message}</span>
                </div>
                <CheckCircle className="h-4 w-4 text-muted-foreground hover:text-green-600 cursor-pointer" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
