
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, AlertTriangle, Shield, TrendingDown, Activity, Eye, MessageSquare } from "lucide-react";
import { AddDisputeModal } from "./AddDisputeModal";

const mockDisputes = [
  {
    id: "1",
    title: "Opposition to TechBrand Registration",
    type: "Opposition",
    asset: "TechBrand Logo",
    counterparty: "CompetitorCorp",
    jurisdiction: "US",
    priority: "High",
    status: "Active",
    filedDate: "2024-01-10",
    nextDeadline: "2024-02-15",
    counsel: "External",
    estimatedCost: "$75,000"
  },
  {
    id: "2",
    title: "Patent Infringement Claim",
    type: "Infringement",
    asset: "AI Processing Method",
    counterparty: "TechRival Inc",
    jurisdiction: "EU",
    priority: "Critical",
    status: "Settlement Negotiation",
    filedDate: "2023-11-20",
    nextDeadline: "2024-01-30",
    counsel: "Mixed Team",
    estimatedCost: "$250,000"
  },
  {
    id: "3",
    title: "Trademark Cancellation Proceeding",
    type: "Cancellation",
    asset: "DataFlow Mark",
    counterparty: "Legacy Systems Ltd",
    jurisdiction: "UK",
    priority: "Medium",
    status: "Discovery",
    filedDate: "2023-09-15",
    nextDeadline: "2024-02-01",
    counsel: "Internal",
    estimatedCost: "$45,000"
  }
];

const mockRisks = [
  {
    id: "1",
    title: "Trademark Renewal Risk",
    type: "Renewal",
    asset: "TechBrand Family",
    riskLevel: "High",
    probability: 85,
    impact: "High",
    description: "Multiple trademark renewals due within 90 days",
    mitigationActions: 3,
    dueDate: "2024-02-20"
  },
  {
    id: "2", 
    title: "Patent Invalidity Risk",
    type: "Invalidity",
    asset: "Core Algorithm Patent",
    riskLevel: "Medium",
    probability: 45,
    impact: "Critical",
    description: "Prior art discovered that may invalidate key claims",
    mitigationActions: 2,
    dueDate: "2024-03-15"
  },
  {
    id: "3",
    title: "Market Infringement Risk",
    type: "Infringement",
    asset: "Product Design Portfolio",
    riskLevel: "Low",
    probability: 25,
    impact: "Medium",
    description: "Competitor product shows similar design elements",
    mitigationActions: 1,
    dueDate: "2024-04-01"
  }
];

export function IPRiskMonitoring() {
  const [activeTab, setActiveTab] = useState("disputes");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case "High":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
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
        return <Badge className="bg-blue-100 text-blue-800">Active</Badge>;
      case "Settlement Negotiation":
        return <Badge className="bg-purple-100 text-purple-800">Settlement</Badge>;
      case "Discovery":
        return <Badge className="bg-yellow-100 text-yellow-800">Discovery</Badge>;
      case "Closed":
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "High":
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">IP Risk Monitoring</h2>
          <p className="text-muted-foreground">
            Monitor IP disputes, risks, and proactive threat assessment
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Log Dispute
        </Button>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <CardTitle className="text-sm font-medium">High Risk Assets</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Legal Spend</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$850K</div>
            <p className="text-xs text-muted-foreground">
              YTD dispute costs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.8</div>
            <p className="text-xs text-muted-foreground">
              Portfolio risk rating
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b">
        <button
          className={`pb-2 px-1 ${activeTab === "disputes" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("disputes")}
        >
          Active Disputes
        </button>
        <button
          className={`pb-2 px-1 ${activeTab === "risks" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("risks")}
        >
          Risk Assessment
        </button>
        <button
          className={`pb-2 px-1 ${activeTab === "monitoring" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("monitoring")}
        >
          Threat Monitoring
        </button>
      </div>

      {activeTab === "disputes" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Disputes & Legal Proceedings</CardTitle>
              <div className="flex gap-4">
                <Input
                  placeholder="Search disputes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="settlement">Settlement</SelectItem>
                    <SelectItem value="discovery">Discovery</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Counterparty</TableHead>
                  <TableHead>Jurisdiction</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Deadline</TableHead>
                  <TableHead>Est. Cost</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDisputes.map((dispute) => (
                  <TableRow key={dispute.id}>
                    <TableCell className="font-medium">{dispute.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{dispute.type}</Badge>
                    </TableCell>
                    <TableCell>{dispute.asset}</TableCell>
                    <TableCell>{dispute.counterparty}</TableCell>
                    <TableCell>{dispute.jurisdiction}</TableCell>
                    <TableCell>{getPriorityBadge(dispute.priority)}</TableCell>
                    <TableCell>{getStatusBadge(dispute.status)}</TableCell>
                    <TableCell className="text-sm">{dispute.nextDeadline}</TableCell>
                    <TableCell className="font-medium">{dispute.estimatedCost}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "risks" && (
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment & Mitigation</CardTitle>
            <CardDescription>Identified risks to IP portfolio with mitigation strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Mitigation Actions</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRisks.map((risk) => (
                  <TableRow key={risk.id}>
                    <TableCell className="font-medium">{risk.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{risk.type}</Badge>
                    </TableCell>
                    <TableCell>{risk.asset}</TableCell>
                    <TableCell>{getRiskBadge(risk.riskLevel)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={risk.probability} className="h-2 w-16" />
                        <span className="text-sm">{risk.probability}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(risk.impact)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{risk.mitigationActions} actions</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{risk.dueDate}</TableCell>
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
      )}

      {activeTab === "monitoring" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Surveillance</CardTitle>
              <CardDescription>Automated monitoring of potential infringements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Patent Landscape Monitoring</div>
                    <div className="text-sm text-muted-foreground">Weekly scans for similar filings</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Trademark Watch Service</div>
                    <div className="text-sm text-muted-foreground">Global trademark application monitoring</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Domain Name Monitoring</div>
                    <div className="text-sm text-muted-foreground">Cybersquatting and brand protection</div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Setup Required</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Latest threat detection results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Similar Patent Application Filed</div>
                    <div className="text-sm text-muted-foreground">
                      CompetitorCorp filed application with overlapping claims
                    </div>
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Trademark Opposition Window</div>
                    <div className="text-sm text-muted-foreground">
                      30-day window opens for "TechFlow" application
                    </div>
                    <div className="text-xs text-muted-foreground">1 day ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Activity className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Market Analysis Complete</div>
                    <div className="text-sm text-muted-foreground">
                      Q4 competitive landscape report available
                    </div>
                    <div className="text-xs text-muted-foreground">3 days ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <AddDisputeModal open={showAddModal} onOpenChange={setShowAddModal} />
    </div>
  );
}
