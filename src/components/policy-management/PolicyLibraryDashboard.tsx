
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Search, Filter } from "lucide-react";
import { AddPolicyModal } from "./AddPolicyModal";
import { PolicyDetailModal } from "./PolicyDetailModal";

const mockPolicies = [
  {
    id: "1",
    title: "Data Protection Policy",
    version: "2.1",
    entity: "TechCorp UK Ltd",
    jurisdiction: "United Kingdom",
    type: "Data Privacy",
    effectiveDate: "2024-01-15",
    status: "Active",
    lastUpdated: "2024-01-10",
    owner: "Sarah Johnson"
  },
  {
    id: "2", 
    title: "Code of Conduct",
    version: "1.5",
    entity: "TechCorp GmbH",
    jurisdiction: "Germany",
    type: "Ethics & Compliance",
    effectiveDate: "2024-02-01",
    status: "Draft",
    lastUpdated: "2024-01-28",
    owner: "Michael Schmidt"
  },
  {
    id: "3",
    title: "Anti-Money Laundering Policy",
    version: "3.0",
    entity: "TechCorp Inc",
    jurisdiction: "United States",
    type: "Financial Compliance",
    effectiveDate: "2024-03-01",
    status: "In Review",
    lastUpdated: "2024-02-15",
    owner: "Jennifer Chen"
  }
];

export function PolicyLibraryDashboard() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entityFilter, setEntityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleViewPolicy = (policy: any) => {
    setSelectedPolicy(policy);
    setDetailModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "In Review": return "bg-blue-100 text-blue-800";
      case "Retired": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Policies</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">186</div>
            <p className="text-xs text-muted-foreground">75% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Policy Library</CardTitle>
              <CardDescription>Manage and organize all organizational policies</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setAddModalOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Policy
              </Button>
              <Button variant="outline" onClick={() => setAddModalOpen(true)}>
                <FileText className="h-4 w-4 mr-2" />
                Create Draft
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={entityFilter} onValueChange={setEntityFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                <SelectItem value="uk">TechCorp UK Ltd</SelectItem>
                <SelectItem value="de">TechCorp GmbH</SelectItem>
                <SelectItem value="us">TechCorp Inc</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="Retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Policies Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Title</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.title}</TableCell>
                  <TableCell>{policy.version}</TableCell>
                  <TableCell>{policy.entity}</TableCell>
                  <TableCell>{policy.jurisdiction}</TableCell>
                  <TableCell>{policy.type}</TableCell>
                  <TableCell>{policy.effectiveDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(policy.status)}>
                      {policy.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{policy.owner}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewPolicy(policy)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddPolicyModal open={addModalOpen} onOpenChange={setAddModalOpen} />
      <PolicyDetailModal 
        open={detailModalOpen} 
        onOpenChange={setDetailModalOpen}
        policy={selectedPolicy}
      />
    </div>
  );
}
