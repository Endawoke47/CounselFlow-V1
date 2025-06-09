
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Download, Calendar, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

export function ReportingDashboard() {
  const entityData = [
    { name: 'Tech Corp Ltd', disputes: 12, exposure: 1800000 },
    { name: 'Tech Corp UK', disputes: 8, exposure: 650000 },
    { name: 'Innovation Labs', disputes: 6, exposure: 980000 },
    { name: 'Real Estate Holdings', disputes: 4, exposure: 320000 }
  ];

  const caseTypeData = [
    { name: 'Contract', value: 35, color: '#8884d8' },
    { name: 'Employment', value: 25, color: '#82ca9d' },
    { name: 'IP', value: 20, color: '#ffc658' },
    { name: 'Commercial', value: 15, color: '#ff7300' },
    { name: 'Other', value: 5, color: '#00ff00' }
  ];

  const timelineData = [
    { month: 'Jan', opened: 8, closed: 5 },
    { month: 'Feb', opened: 12, closed: 7 },
    { month: 'Mar', opened: 6, closed: 9 },
    { month: 'Apr', opened: 10, closed: 8 },
    { month: 'May', opened: 14, closed: 6 },
    { month: 'Jun', opened: 9, closed: 11 }
  ];

  const highExposureDisputes = [
    { title: "IP Infringement Claim", entity: "Innovation Labs", exposure: "$800,000", status: "Escalated" },
    { title: "Contract Breach - Supplier XYZ", entity: "Tech Corp Ltd", exposure: "$450,000", status: "In Review" },
    { title: "Employment Class Action", entity: "Tech Corp UK", exposure: "$320,000", status: "Negotiation" },
    { title: "Lease Dispute", entity: "Real Estate Holdings", exposure: "$280,000", status: "Open" }
  ];

  const kpis = [
    { title: "Total Active Disputes", value: "30", change: "+3", trend: "up" },
    { title: "Total Exposure", value: "$3.8M", change: "-$200K", trend: "down" },
    { title: "Avg Resolution Time", value: "45 days", change: "-5 days", trend: "down" },
    { title: "Provisioned Amount", value: "$2.1M", change: "+$150K", trend: "up" }
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>Customize your report parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Entity</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entities</SelectItem>
                  <SelectItem value="tech-corp">Tech Corp Ltd</SelectItem>
                  <SelectItem value="tech-uk">Tech Corp UK</SelectItem>
                  <SelectItem value="innovation">Innovation Labs</SelectItem>
                  <SelectItem value="real-estate">Real Estate Holdings</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date From</Label>
              <Input type="date" defaultValue="2024-01-01" />
            </div>
            <div className="space-y-2">
              <Label>Date To</Label>
              <Input type="date" defaultValue="2024-12-31" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button>Apply Filters</Button>
            <Button variant="outline">Reset</Button>
            <Button variant="outline" className="ml-auto">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="executive" className="space-y-4">
        <TabsList>
          <TabsTrigger value="executive">Executive Summary</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analytics</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="executive" className="space-y-4">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi) => (
              <Card key={kpi.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className={`text-xs ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Disputes by Entity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={entityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="disputes" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={caseTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {caseTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* High Exposure Disputes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Highest Exposure Disputes
              </CardTitle>
              <CardDescription>Disputes requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {highExposureDisputes.map((dispute, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{dispute.title}</h4>
                      <p className="text-sm text-muted-foreground">{dispute.entity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{dispute.exposure}</p>
                      <Badge variant="outline">{dispute.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dispute Timeline</CardTitle>
              <CardDescription>Monthly dispute opening and closure trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="opened" stroke="#8884d8" name="Opened" />
                  <Line type="monotone" dataKey="closed" stroke="#82ca9d" name="Closed" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Exposure by Entity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={entityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${(value as number / 1000000).toFixed(1)}M`, 'Exposure']} />
                  <Bar dataKey="exposure" fill="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Executive Summary
                </CardTitle>
                <CardDescription>High-level overview for executive leadership</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Key metrics and trends</li>
                  <li>• High-risk disputes</li>
                  <li>• Financial exposure summary</li>
                  <li>• Recommended actions</li>
                </ul>
                <Button className="w-full mt-4" variant="outline">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Exposure Report
                </CardTitle>
                <CardDescription>Detailed financial analysis and provisioning</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Total exposure by entity</li>
                  <li>• Provisioning status</li>
                  <li>• Settlement ranges</li>
                  <li>• Legal spend tracking</li>
                </ul>
                <Button className="w-full mt-4" variant="outline">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Risk Assessment Report
                </CardTitle>
                <CardDescription>Risk analysis and mitigation strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Risk scoring methodology</li>
                  <li>• Trend analysis</li>
                  <li>• Mitigation recommendations</li>
                  <li>• Preventive measures</li>
                </ul>
                <Button className="w-full mt-4" variant="outline">
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
