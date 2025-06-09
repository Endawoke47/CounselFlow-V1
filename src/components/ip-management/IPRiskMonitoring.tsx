
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Eye, FileText, Shield, TrendingUp } from "lucide-react";
import { AddDisputeModal } from "./AddDisputeModal";

const mockDisputes = [
  {
    id: "1",
    type: "Opposition",
    asset: "TechBrand Logo",
    counterparty: "CompetitorCorp Ltd",
    jurisdiction: "EU",
    status: "Active",
    priority: "High",
    filedDate: "2024-11-15",
    counsel: "External"
  },
  {
    id: "2",
    type: "Infringement",
    asset: "AI Processing Method",
    counterparty: "InnovateAI Inc",
    jurisdiction: "US",
    status: "Investigation",
    priority: "Medium",
    filedDate: "2024-10-22",
    counsel: "Internal"
  }
];

const riskMetrics = [
  { label: "High Risk Assets", value: 12, change: "+2", trend: "up" },
  { label: "Active Disputes", value: 8, change: "-1", trend: "down" },
  { label: "Monitoring Alerts", value: 23, change: "+5", trend: "up" },
  { label: "Resolution Rate", value: "94%", change: "+3%", trend: "up" }
];

export function IPRiskMonitoring() {
  const [showAddModal, setShowAddModal] = useState(false);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-red-100 text-red-800">Active</Badge>;
      case "Investigation":
        return <Badge className="bg-yellow-100 text-yellow-800">Investigation</Badge>;
      case "Settled":
        return <Badge className="bg-green-100 text-green-800">Settled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">IP Risk & Dispute Monitoring</h2>
          <p className="text-muted-foreground">
            Track disputes, infringements, and risk assessments
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <AlertTriangle className="h-4 w-4 mr-2" />
          Log Dispute
        </Button>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {riskMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  <TrendingUp className="h-4 w-4" />
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Disputes */}
      <Card>
        <CardHeader>
          <CardTitle>Active Disputes</CardTitle>
          <CardDescription>Ongoing IP disputes and legal proceedings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>IP Asset</TableHead>
                <TableHead>Counterparty</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Filed Date</TableHead>
                <TableHead>Counsel</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDisputes.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell>
                    <Badge variant="outline">{dispute.type}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{dispute.asset}</TableCell>
                  <TableCell>{dispute.counterparty}</TableCell>
                  <TableCell>{dispute.jurisdiction}</TableCell>
                  <TableCell>{getStatusBadge(dispute.status)}</TableCell>
                  <TableCell>{getPriorityBadge(dispute.priority)}</TableCell>
                  <TableCell>{dispute.filedDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{dispute.counsel}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Risk Assessment Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>High-Risk Assets</CardTitle>
            <CardDescription>IP assets requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div className="flex-1">
                  <div className="font-medium">TechBrand Logo</div>
                  <div className="text-sm text-muted-foreground">Opposition filed in EU</div>
                </div>
                <Badge variant="destructive">Critical</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Shield className="h-5 w-5 text-orange-500" />
                <div className="flex-1">
                  <div className="font-medium">DataFlow System</div>
                  <div className="text-sm text-muted-foreground">Potential infringement detected</div>
                </div>
                <Badge className="bg-orange-100 text-orange-800">High</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Eye className="h-5 w-5 text-yellow-500" />
                <div className="flex-1">
                  <div className="font-medium">AI Processing Method</div>
                  <div className="text-sm text-muted-foreground">Market monitoring alert</div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Categories</CardTitle>
            <CardDescription>Breakdown of risk types across portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Infringement Risk</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <span className="text-sm font-medium">15 assets</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Opposition Risk</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                  <span className="text-sm font-medium">8 assets</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Renewal Risk</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <span className="text-sm font-medium">12 assets</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Validity Risk</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                  <span className="text-sm font-medium">5 assets</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddDisputeModal open={showAddModal} onOpenChange={setShowAddModal} />
    </div>
  );
}
