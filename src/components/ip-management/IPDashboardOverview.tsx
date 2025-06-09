
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, AlertTriangle, DollarSign, FileText, Calendar } from "lucide-react";

export function IPDashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total IP Assets</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +12% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Renewals</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Next 90 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Disputes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              2 critical priority
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">License Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">
              YTD licensing income
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio by Asset Type</CardTitle>
            <CardDescription>Distribution of IP assets across categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Trademarks</span>
                <span className="text-sm font-medium">685 (55%)</span>
              </div>
              <Progress value={55} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Patents</span>
                <span className="text-sm font-medium">312 (25%)</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Copyrights</span>
                <span className="text-sm font-medium">150 (12%)</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Designs</span>
                <span className="text-sm font-medium">75 (6%)</span>
              </div>
              <Progress value={6} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Domain Names</span>
                <span className="text-sm font-medium">25 (2%)</span>
              </div>
              <Progress value={2} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>IP protection by jurisdiction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">United States</span>
                <span className="text-sm font-medium">423 (34%)</span>
              </div>
              <Progress value={34} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">European Union</span>
                <span className="text-sm font-medium">298 (24%)</span>
              </div>
              <Progress value={24} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">United Kingdom</span>
                <span className="text-sm font-medium">187 (15%)</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">China</span>
                <span className="text-sm font-medium">149 (12%)</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Other</span>
                <span className="text-sm font-medium">190 (15%)</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Urgent Actions Required</CardTitle>
            <CardDescription>Critical deadlines and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div className="flex-1">
                  <div className="font-medium">Trademark Renewal - "TechBrand"</div>
                  <div className="text-sm text-muted-foreground">Due: Tomorrow (US)</div>
                </div>
                <Badge variant="destructive">Critical</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Calendar className="h-5 w-5 text-orange-500" />
                <div className="flex-1">
                  <div className="font-medium">Patent Office Action Response</div>
                  <div className="text-sm text-muted-foreground">Due: 5 days (EP)</div>
                </div>
                <Badge variant="outline">High</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <div className="font-medium">Opposition Period Ends</div>
                  <div className="text-sm text-muted-foreground">Monitor: 2 weeks (UK)</div>
                </div>
                <Badge variant="outline">Medium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">New trademark filed</div>
                  <div className="text-sm text-muted-foreground">
                    "InnovateTech" registered in 3 jurisdictions
                  </div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">License agreement executed</div>
                  <div className="text-sm text-muted-foreground">
                    Patent portfolio licensed to MegaCorp Inc.
                  </div>
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Opposition filed</div>
                  <div className="text-sm text-muted-foreground">
                    Competitor challenged "DataFlow" trademark
                  </div>
                  <div className="text-xs text-muted-foreground">3 days ago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
