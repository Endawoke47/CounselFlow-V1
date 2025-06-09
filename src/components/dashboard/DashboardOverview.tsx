
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Calendar, 
  AlertTriangle, 
  TrendingUp,
  FileText,
  Scale,
  Shield,
  BarChart3
} from "lucide-react";

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Legal Operations Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Centralized view of your legal operations across all entities and jurisdictions
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Entities</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Pending Filings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              5 due this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 high priority
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Building2 className="h-6 w-6" />
              <span>Add Entity</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Calendar className="h-6 w-6" />
              <span>Schedule Meeting</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileText className="h-6 w-6" />
              <span>Generate Document</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across all modules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Building2 className="h-4 w-4 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Entity registration updated</p>
                <p className="text-xs text-muted-foreground">Acme Corp Ltd - UK</p>
              </div>
              <Badge variant="secondary">2 hours ago</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Scale className="h-4 w-4 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Board resolution approved</p>
                <p className="text-xs text-muted-foreground">Resolution #2024-015</p>
              </div>
              <Badge variant="secondary">5 hours ago</Badge>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <FileText className="h-4 w-4 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Contract lifecycle updated</p>
                <p className="text-xs text-muted-foreground">Service Agreement #SA-2024-089</p>
              </div>
              <Badge variant="secondary">1 day ago</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Critical dates requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg border-orange-200 bg-orange-50">
              <Calendar className="h-4 w-4 text-orange-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Annual Return Filing</p>
                <p className="text-xs text-muted-foreground">Global Tech Solutions Ltd</p>
              </div>
              <Badge variant="destructive">3 days</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg border-yellow-200 bg-yellow-50">
              <Shield className="h-4 w-4 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">License Renewal</p>
                <p className="text-xs text-muted-foreground">Financial Services License - SG</p>
              </div>
              <Badge variant="secondary">7 days</Badge>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Building2 className="h-4 w-4 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Board Meeting</p>
                <p className="text-xs text-muted-foreground">Quarterly Review - Q4 2024</p>
              </div>
              <Badge variant="outline">14 days</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Module Overview</CardTitle>
          <CardDescription>Status across all CounselFlow modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Company Secretarial</span>
              </div>
              <div className="text-2xl font-bold mb-1">247</div>
              <div className="text-xs text-muted-foreground">Active entities</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Contracts</span>
              </div>
              <div className="text-2xl font-bold mb-1">1,432</div>
              <div className="text-xs text-muted-foreground">Active contracts</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Scale className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Disputes</span>
              </div>
              <div className="text-2xl font-bold mb-1">23</div>
              <div className="text-xs text-muted-foreground">Open cases</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">IP Portfolio</span>
              </div>
              <div className="text-2xl font-bold mb-1">156</div>
              <div className="text-xs text-muted-foreground">Active assets</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Risk Score</span>
              </div>
              <div className="text-2xl font-bold mb-1">Low</div>
              <div className="text-xs text-muted-foreground">Overall assessment</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
