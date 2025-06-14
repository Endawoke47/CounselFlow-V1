
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  AlertTriangle, 
  Shield, 
  Eye, 
  Search,
  Clock,
  Scale,
  TrendingUp,
  FileX
} from "lucide-react";
import { AddDisputeModal } from "./AddDisputeModal";

export function IPRiskMonitoring() {
  const [showAddDispute, setShowAddDispute] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const riskMetrics = [
    {
      title: "Active Disputes",
      value: "3",
      change: "+1 this month",
      icon: Scale,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Infringement Alerts",
      value: "7",
      change: "2 high priority",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Expiring Assets",
      value: "5",
      change: "Next 60 days",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Portfolio Value at Risk",
      value: "$1.2M",
      change: "8% of total value",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const disputes = [
    {
      id: "DIS-IP-001",
      title: "Patent Infringement Claim - ML Algorithm",
      defendant: "CompetitorCorp",
      assetId: "PAT-001",
      status: "Active Litigation",
      priority: "High",
      filedDate: "2023-11-15",
      valueAtRisk: "$450,000",
      nextAction: "Discovery Phase",
      dueDate: "2024-03-01",
      attorney: "Johnson & Associates"
    },
    {
      id: "DIS-IP-002", 
      title: "Trademark Opposition - Brand Name",
      defendant: "StartupXYZ",
      assetId: "TM-045",
      status: "Settlement Negotiation",
      priority: "Medium",
      filedDate: "2024-01-08",
      valueAtRisk: "$125,000",
      nextAction: "Mediation Session",
      dueDate: "2024-02-20",
      attorney: "IP Legal Partners"
    },
    {
      id: "DIS-IP-003",
      title: "Copyright Violation - Documentation",
      defendant: "TechSolutions Ltd",
      assetId: "CR-089",
      status: "Cease & Desist Sent",
      priority: "Low",
      filedDate: "2024-01-22",
      valueAtRisk: "$85,000",
      nextAction: "Response Review",
      dueDate: "2024-02-15",
      attorney: "Internal Legal"
    }
  ];

  const infringementAlerts = [
    {
      id: "ALERT-001",
      type: "Patent Watch",
      description: "Similar patent application filed by TechRival Inc.",
      assetId: "PAT-001",
      severity: "High",
      detectedDate: "2024-02-10",
      recommendedAction: "File opposition"
    },
    {
      id: "ALERT-002",
      type: "Market Monitoring",
      description: "Product launch with similar features detected",
      assetId: "PAT-023",
      severity: "Medium",
      detectedDate: "2024-02-08",
      recommendedAction: "Conduct analysis"
    },
    {
      id: "ALERT-003",
      type: "Trademark Watch",
      description: "Confusingly similar mark filed in EU",
      assetId: "TM-045",
      severity: "Medium",
      detectedDate: "2024-02-05",
      recommendedAction: "Review and oppose"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active Litigation": return "bg-red-100 text-red-800";
      case "Settlement Negotiation": return "bg-yellow-100 text-yellow-800";
      case "Cease & Desist Sent": return "bg-blue-100 text-blue-800";
      case "Resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {riskMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Disputes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Active IP Disputes
            </CardTitle>
            <Button onClick={() => setShowAddDispute(true)}>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report Dispute
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dispute Details</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Value at Risk</TableHead>
                <TableHead>Next Action</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disputes.map((dispute) => (
                <TableRow key={dispute.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{dispute.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {dispute.id} • vs {dispute.defendant}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Filed: {dispute.filedDate} • {dispute.attorney}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{dispute.assetId}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(dispute.status)}>
                      {dispute.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(dispute.priority)}>
                      {dispute.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{dispute.valueAtRisk}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{dispute.nextAction}</div>
                      <div className="text-sm text-muted-foreground">Due: {dispute.dueDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Infringement Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Infringement Monitoring Alerts
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Configure Watches
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {infringementAlerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{alert.type}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{alert.detectedDate}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileX className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Description</div>
                    <div className="font-medium">{alert.description}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Related Asset</div>
                    <div className="font-medium">{alert.assetId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Recommended Action</div>
                    <div className="font-medium">{alert.recommendedAction}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddDisputeModal 
        open={showAddDispute} 
        onOpenChange={setShowAddDispute} 
      />
    </div>
  );
}
