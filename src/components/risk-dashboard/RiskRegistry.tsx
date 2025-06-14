
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, AlertTriangle, Eye, Edit, Calendar, User } from "lucide-react";
import { AddRiskModal } from "./AddRiskModal";

const mockRisks = [
  {
    id: "RSK-2024-001",
    title: "GDPR Compliance Gap",
    category: "Regulatory",
    riskLevel: "Critical",
    probability: 85,
    impact: "High",
    riskScore: 8.5,
    owner: "Jane Smith",
    status: "Open",
    identifiedDate: "2024-01-15",
    reviewDate: "2024-02-15",
    description: "Gap in GDPR compliance procedures for cross-border data transfers",
    mitigationActions: 3,
    lastUpdate: "2024-01-20"
  },
  {
    id: "RSK-2024-002",
    title: "Vendor Dependency Risk",
    category: "Operational",
    riskLevel: "High",
    probability: 70,
    impact: "Medium",
    riskScore: 7.0,
    owner: "Mike Johnson",
    status: "In Progress",
    identifiedDate: "2024-01-10",
    reviewDate: "2024-03-10",
    description: "Over-reliance on single vendor for critical services",
    mitigationActions: 2,
    lastUpdate: "2024-01-18"
  },
  {
    id: "RSK-2024-003",
    title: "Cyber Security Vulnerability",
    category: "Cyber Security",
    riskLevel: "Critical",
    probability: 60,
    impact: "Critical",
    riskScore: 9.0,
    owner: "Sarah Davis",
    status: "Mitigated",
    identifiedDate: "2023-12-20",
    reviewDate: "2024-01-20",
    description: "Critical vulnerabilities in customer-facing applications",
    mitigationActions: 5,
    lastUpdate: "2024-01-22"
  },
  {
    id: "RSK-2024-004",
    title: "Market Volatility Impact",
    category: "Financial",
    riskLevel: "Medium",
    probability: 45,
    impact: "High",
    riskScore: 6.5,
    owner: "David Wilson",
    status: "Open",
    identifiedDate: "2024-01-05",
    reviewDate: "2024-04-05",
    description: "Potential impact of market volatility on revenue streams",
    mitigationActions: 1,
    lastUpdate: "2024-01-12"
  },
  {
    id: "RSK-2024-005",
    title: "Reputation Management",
    category: "Reputational",
    riskLevel: "Medium",
    probability: 30,
    impact: "Medium",
    riskScore: 4.5,
    owner: "Lisa Chen",
    status: "Monitoring",
    identifiedDate: "2023-11-15",
    reviewDate: "2024-02-15",
    description: "Potential negative publicity from recent industry changes",
    mitigationActions: 2,
    lastUpdate: "2024-01-08"
  }
];

export function RiskRegistry() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredRisks = mockRisks.filter(risk => {
    const matchesSearch = risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || risk.category === selectedCategory;
    const matchesRiskLevel = selectedRiskLevel === "all" || risk.riskLevel === selectedRiskLevel;
    const matchesStatus = selectedStatus === "all" || risk.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesRiskLevel && matchesStatus;
  });

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case "Critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case "High":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <Badge className="bg-red-100 text-red-800">Open</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "Mitigated":
        return <Badge className="bg-green-100 text-green-800">Mitigated</Badge>;
      case "Monitoring":
        return <Badge className="bg-yellow-100 text-yellow-800">Monitoring</Badge>;
      case "Closed":
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 8) return "text-red-600 font-bold";
    if (score >= 6) return "text-orange-600 font-semibold";
    if (score >= 4) return "text-yellow-600";
    return "text-green-600";
  };

  // Calculate summary statistics
  const totalRisks = mockRisks.length;
  const criticalRisks = mockRisks.filter(r => r.riskLevel === "Critical").length;
  const openRisks = mockRisks.filter(r => r.status === "Open").length;
  const avgRiskScore = (mockRisks.reduce((sum, r) => sum + r.riskScore, 0) / mockRisks.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Risk Registry</h2>
          <p className="text-muted-foreground">Comprehensive registry of all identified risks and their management</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Risk
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Total Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRisks}</div>
            <p className="text-xs text-muted-foreground">{openRisks} currently open</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Critical Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalRisks}</div>
            <p className="text-xs text-muted-foreground">Require immediate action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Risk Owners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(mockRisks.map(r => r.owner)).size}
            </div>
            <p className="text-xs text-muted-foreground">Assigned owners</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Avg. Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRiskScore}</div>
            <p className="text-xs text-muted-foreground">Portfolio average</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Registry Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Risk Registry
          </CardTitle>
          <CardDescription>Complete list of all identified and managed risks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search risks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Regulatory">Regulatory</SelectItem>
                <SelectItem value="Operational">Operational</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                <SelectItem value="Reputational">Reputational</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Mitigated">Mitigated</SelectItem>
                <SelectItem value="Monitoring">Monitoring</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Review Date</TableHead>
                  <TableHead>Mitigation Actions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRisks.map((risk) => (
                  <TableRow key={risk.id}>
                    <TableCell className="font-medium">{risk.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{risk.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {risk.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{risk.category}</Badge>
                    </TableCell>
                    <TableCell>{getRiskLevelBadge(risk.riskLevel)}</TableCell>
                    <TableCell>
                      <span className={getRiskScoreColor(risk.riskScore)}>
                        {risk.riskScore}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(risk.status)}</TableCell>
                    <TableCell>{risk.owner}</TableCell>
                    <TableCell className="text-sm">{risk.reviewDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{risk.mitigationActions} actions</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddRiskModal open={showAddModal} onOpenChange={setShowAddModal} />
    </div>
  );
}
