
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { AddRiskModal } from "./AddRiskModal";

export function RiskRegistry() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");

  const risks = [
    {
      id: 1,
      title: "GDPR Compliance Audit Findings",
      category: "Compliance",
      severity: "Critical",
      likelihood: "High",
      impact: "High",
      entity: "EU Operations Ltd",
      jurisdiction: "EU",
      owner: "Privacy Officer",
      status: "Open",
      dueDate: "2024-11-20",
      source: "Regulatory Audit",
      controlStatus: "Partial"
    },
    {
      id: 2,
      title: "Key Supplier Contract Termination Clause",
      category: "Contractual",
      severity: "High",
      likelihood: "Medium",
      impact: "High",
      entity: "Global Holdings Inc",
      jurisdiction: "US",
      owner: "Commercial Team",
      status: "Mitigating",
      dueDate: "2024-11-25",
      source: "Contract Review",
      controlStatus: "Uncontrolled"
    },
    {
      id: 3,
      title: "Patent Opposition in Key Market",
      category: "IP & Licensing",
      severity: "High",
      likelihood: "High",
      impact: "Medium",
      entity: "Technology Division",
      jurisdiction: "Germany",
      owner: "IP Counsel",
      status: "Open",
      dueDate: "2024-12-01",
      source: "IP Portfolio Review",
      controlStatus: "Partial"
    },
    {
      id: 4,
      title: "Class Action Litigation Exposure",
      category: "Litigation",
      severity: "Medium",
      likelihood: "Low",
      impact: "High",
      entity: "APAC Subsidiary",
      jurisdiction: "Australia",
      owner: "Litigation Counsel",
      status: "Resolved",
      dueDate: "2024-10-15",
      source: "Legal Assessment",
      controlStatus: "Controlled"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "destructive";
      case "High": return "secondary";
      case "Medium": return "outline";
      case "Low": return "default";
      default: return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "destructive";
      case "Mitigating": return "secondary";
      case "Resolved": return "default";
      default: return "outline";
    }
  };

  const getControlStatusColor = (status: string) => {
    switch (status) {
      case "Controlled": return "default";
      case "Partial": return "secondary";
      case "Uncontrolled": return "destructive";
      default: return "outline";
    }
  };

  const filteredRisks = risks.filter(risk => {
    const matchesSearch = risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || risk.category === filterCategory;
    const matchesSeverity = filterSeverity === "all" || risk.severity === filterSeverity;
    
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Risk Registry</h2>
          <p className="text-muted-foreground">Comprehensive risk tracking and management</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Risk
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search risks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Contractual">Contractual</SelectItem>
                <SelectItem value="Litigation">Litigation</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
                <SelectItem value="IP & Licensing">IP & Licensing</SelectItem>
                <SelectItem value="Cyber & Privacy">Cyber & Privacy</SelectItem>
                <SelectItem value="Regulatory">Regulatory</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Risk Table */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Inventory ({filteredRisks.length} risks)</CardTitle>
          <CardDescription>
            Active risks across all business units and jurisdictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Control</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRisks.map((risk) => (
                <TableRow key={risk.id}>
                  <TableCell className="font-medium max-w-[200px]">
                    <div className="truncate" title={risk.title}>
                      {risk.title}
                    </div>
                  </TableCell>
                  <TableCell>{risk.category}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(risk.severity) as any}>
                      {risk.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{risk.entity}</TableCell>
                  <TableCell className="text-sm">{risk.owner}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(risk.status) as any}>
                      {risk.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getControlStatusColor(risk.controlStatus) as any}>
                      {risk.controlStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{risk.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddRiskModal open={showAddModal} onOpenChange={setShowAddModal} />
    </div>
  );
}
