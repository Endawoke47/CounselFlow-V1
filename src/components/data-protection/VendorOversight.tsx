
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Building, Shield, AlertTriangle, CheckCircle, Search, Eye, Edit } from "lucide-react";

const mockVendors = [
  {
    id: "V-001",
    name: "CloudData Solutions",
    role: "Processor",
    jurisdiction: "United States",
    dataTypes: "Customer Analytics, Marketing Data",
    contractStatus: "Active DPA",
    riskScore: 75,
    lastAssessment: "2024-01-10",
    nextReview: "2024-07-10",
    safeguards: "Standard Contractual Clauses",
    onboardingStatus: "Complete",
    complianceStatus: "Compliant"
  },
  {
    id: "V-002",
    name: "HR Management Corp",
    role: "Controller",
    jurisdiction: "European Union",
    dataTypes: "Employee Data, Payroll Information",
    contractStatus: "DPA Signed",
    riskScore: 45,
    lastAssessment: "2024-01-08",
    nextReview: "2024-06-08",
    safeguards: "Adequacy Decision",
    onboardingStatus: "Complete",
    complianceStatus: "Compliant"
  },
  {
    id: "V-003",
    name: "Analytics Platform Inc",
    role: "Sub-processor",
    jurisdiction: "Singapore",
    dataTypes: "Website Analytics, User Behavior",
    contractStatus: "Under Review",
    riskScore: 85,
    lastAssessment: "2023-12-15",
    nextReview: "2024-06-15",
    safeguards: "Binding Corporate Rules",
    onboardingStatus: "In Progress",
    complianceStatus: "Pending Review"
  }
];

export function VendorOversight() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");

  const getRiskBadge = (score: number) => {
    if (score >= 75) {
      return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
    } else if (score >= 50) {
      return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
    }
  };

  const getComplianceBadge = (status: string) => {
    switch (status) {
      case "Compliant":
        return <Badge className="bg-green-100 text-green-800">Compliant</Badge>;
      case "Pending Review":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
      case "Non-Compliant":
        return <Badge className="bg-red-100 text-red-800">Non-Compliant</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getContractBadge = (status: string) => {
    switch (status) {
      case "Active DPA":
        return <Badge className="bg-green-100 text-green-800">Active DPA</Badge>;
      case "DPA Signed":
        return <Badge className="bg-blue-100 text-blue-800">DPA Signed</Badge>;
      case "Under Review":
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case "Expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Vendor & Processor Oversight</h2>
          <p className="text-muted-foreground">
            Manage third-party data processors and assess privacy risks
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Building className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Active relationships
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Require immediate review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DPAs Active</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              91% coverage
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Due</CardTitle>
            <CheckCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Next 90 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution & Safeguards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendor Risk Distribution</CardTitle>
            <CardDescription>Risk assessment across vendor portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">High Risk</div>
                    <div className="text-sm text-muted-foreground">Score 75-100</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">18</div>
                  <div className="text-xs text-muted-foreground">12%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">Medium Risk</div>
                    <div className="text-sm text-muted-foreground">Score 50-74</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">67</div>
                  <div className="text-xs text-muted-foreground">43%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">Low Risk</div>
                    <div className="text-sm text-muted-foreground">Score 0-49</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">71</div>
                  <div className="text-xs text-muted-foreground">45%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transfer Safeguards</CardTitle>
            <CardDescription>International data transfer protections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Standard Contractual Clauses</div>
                  <div className="text-sm text-muted-foreground">EU Commission approved</div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">89 vendors</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Adequacy Decision</div>
                  <div className="text-sm text-muted-foreground">EU-approved countries</div>
                </div>
                <Badge className="bg-green-100 text-green-800">34 vendors</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Binding Corporate Rules</div>
                  <div className="text-sm text-muted-foreground">Multinational groups</div>
                </div>
                <Badge className="bg-purple-100 text-purple-800">12 vendors</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Certification Schemes</div>
                  <div className="text-sm text-muted-foreground">Privacy certifications</div>
                </div>
                <Badge className="bg-orange-100 text-orange-800">21 vendors</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="processor">Processor</SelectItem>
                <SelectItem value="controller">Controller</SelectItem>
                <SelectItem value="sub-processor">Sub-processor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRisk} onValueChange={setSelectedRisk}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Register ({mockVendors.length})</CardTitle>
          <CardDescription>Third-party data processors and controllers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Data Types</TableHead>
                <TableHead>Contract Status</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Next Review</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{vendor.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{vendor.role}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{vendor.jurisdiction}</TableCell>
                  <TableCell className="text-sm">{vendor.dataTypes}</TableCell>
                  <TableCell>{getContractBadge(vendor.contractStatus)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{vendor.riskScore}</span>
                      {getRiskBadge(vendor.riskScore)}
                    </div>
                  </TableCell>
                  <TableCell>{getComplianceBadge(vendor.complianceStatus)}</TableCell>
                  <TableCell className="text-sm">{vendor.nextReview}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
