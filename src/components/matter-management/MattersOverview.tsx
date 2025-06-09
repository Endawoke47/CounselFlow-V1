
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, AlertTriangle, TrendingUp, Users, Target } from "lucide-react";

export function MattersOverview() {
  const stats = [
    {
      title: "Open Matters",
      value: "47",
      change: "+3 this week",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "SLA Breaches",
      value: "5",
      change: "-2 from last week",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Advice Requests",
      value: "23",
      change: "+8 this week",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Avg Resolution Time",
      value: "12.5 days",
      change: "-1.2 days",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Active Risks",
      value: "8",
      change: "2 high priority",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Team Workload",
      value: "85%",
      change: "Capacity utilization",
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
  );
}
