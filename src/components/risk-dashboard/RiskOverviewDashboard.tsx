
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Shield, TrendingUp, Clock, BarChart3, Users, Target, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

const riskTrendData = [
  { month: "Jan", high: 12, medium: 28, low: 15 },
  { month: "Feb", high: 15, medium: 25, low: 18 },
  { month: "Mar", high: 18, medium: 30, low: 20 },
  { month: "Apr", high: 14, medium: 35, low: 22 },
  { month: "May", high: 16, medium: 32, low: 25 },
  { month: "Jun", high: 13, medium: 29, low: 28 }
];

const riskCategoryData = [
  { name: "Regulatory", value: 35, color: "#ef4444" },
  { name: "Operational", value: 28, color: "#f59e0b" },
  { name: "Financial", value: 20, color: "#eab308" },
  { name: "Cyber Security", value: 12, color: "#3b82f6" },
  { name: "Reputational", value: 5, color: "#8b5cf6" }
];

const mitigationProgressData = [
  { category: "Critical Risks", completed: 75, total: 100 },
  { category: "High Risks", completed: 60, total: 100 },
  { category: "Medium Risks", completed: 45, total: 100 },
  { category: "Low Risks", completed: 80, total: 100 }
];

export function RiskOverviewDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Risks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              +12 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical & High</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">42</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mitigation Rate</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              Actions completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <Activity className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2</div>
            <p className="text-xs text-muted-foreground">
              Portfolio risk rating
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Trend Analysis</CardTitle>
            <CardDescription>Risk levels over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={riskTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={2} name="High Risk" />
                <Line type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2} name="Medium Risk" />
                <Line type="monotone" dataKey="low" stroke="#22c55e" strokeWidth={2} name="Low Risk" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk by Category</CardTitle>
            <CardDescription>Distribution of risks across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskCategoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {riskCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Top Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mitigation Progress</CardTitle>
            <CardDescription>Progress on risk mitigation actions by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mitigationProgressData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm">{item.completed}%</span>
                </div>
                <Progress value={item.completed} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Critical Risks</CardTitle>
            <CardDescription>Highest priority risks requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Regulatory Compliance Gap</div>
                  <div className="text-sm text-muted-foreground">
                    New GDPR requirements not fully implemented
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-red-100 text-red-800">Critical</Badge>
                    <span className="text-xs text-muted-foreground">Due in 15 days</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Cyber Security Vulnerability</div>
                  <div className="text-sm text-muted-foreground">
                    Critical security patches pending deployment
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-red-100 text-red-800">Critical</Badge>
                    <span className="text-xs text-muted-foreground">Due in 7 days</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Vendor Risk Assessment</div>
                  <div className="text-sm text-muted-foreground">
                    Key vendor contracts up for renewal
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-orange-100 text-orange-800">High</Badge>
                    <span className="text-xs text-muted-foreground">Due in 30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common risk management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium">Add New Risk</div>
                <div className="text-sm text-muted-foreground">Register new risk</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium">Update Mitigation</div>
                <div className="text-sm text-muted-foreground">Track progress</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <div>
                <div className="font-medium">Generate Report</div>
                <div className="text-sm text-muted-foreground">Risk analytics</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <div className="font-medium">Assign Owner</div>
                <div className="text-sm text-muted-foreground">Delegate risks</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
