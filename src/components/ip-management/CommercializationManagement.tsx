
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, DollarSign, TrendingUp, Users, FileText, Eye, Edit } from "lucide-react";

const mockLicenseAgreements = [
  {
    id: "1",
    licensee: "TechSoft Solutions",
    ipAsset: "AI Processing Method",
    type: "Exclusive",
    territory: "North America",
    startDate: "2024-01-15",
    endDate: "2027-01-15",
    royaltyRate: "5%",
    minimumRoyalty: "$50,000",
    status: "Active",
    revenue: "$125,000"
  },
  {
    id: "2",
    licensee: "Global Innovations Inc",
    ipAsset: "TechBrand Logo",
    type: "Non-Exclusive",
    territory: "Worldwide",
    startDate: "2023-06-01",
    endDate: "2026-06-01",
    royaltyRate: "3%",
    minimumRoyalty: "$25,000",
    status: "Active",
    revenue: "$75,000"
  },
  {
    id: "3",
    licensee: "StartupCorp",
    ipAsset: "DataFlow System",
    type: "Non-Exclusive",
    territory: "Europe",
    startDate: "2023-03-10",
    endDate: "2025-03-10",
    royaltyRate: "4%",
    minimumRoyalty: "$30,000",
    status: "Pending Renewal",
    revenue: "$42,000"
  }
];

export function CommercializationManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "Pending Renewal":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Renewal</Badge>;
      case "Expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case "Terminated":
        return <Badge className="bg-gray-100 text-gray-800">Terminated</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Commercialization Management</h2>
          <p className="text-muted-foreground">
            Manage IP licensing agreements and revenue streams
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New License Agreement
        </Button>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">
              +15% from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              3 expiring this quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Licensees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              5 new this year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Royalty Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <p className="text-xs text-muted-foreground">
              Industry standard: 3.8%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Asset Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Asset Type</CardTitle>
            <CardDescription>Breakdown of licensing revenue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Patents</span>
                <span className="text-sm font-medium">$1.2M (50%)</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Trademarks</span>
                <span className="text-sm font-medium">$720K (30%)</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Copyrights</span>
                <span className="text-sm font-medium">$360K (15%)</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Trade Secrets</span>
                <span className="text-sm font-medium">$120K (5%)</span>
              </div>
              <Progress value={5} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Assets</CardTitle>
            <CardDescription>Highest revenue generating IP assets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">AI Processing Method</div>
                  <div className="text-sm text-muted-foreground">Patent Portfolio</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$450K</div>
                  <div className="text-xs text-muted-foreground">12 licenses</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">TechBrand Suite</div>
                  <div className="text-sm text-muted-foreground">Trademark Family</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$320K</div>
                  <div className="text-xs text-muted-foreground">8 licenses</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">DataFlow Architecture</div>
                  <div className="text-sm text-muted-foreground">Trade Secret</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$280K</div>
                  <div className="text-xs text-muted-foreground">5 licenses</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* License Agreements Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>License Agreements</CardTitle>
            <div className="flex gap-4">
              <Input
                placeholder="Search agreements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending Renewal</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="exclusive">Exclusive</SelectItem>
                  <SelectItem value="non-exclusive">Non-Exclusive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Licensee</TableHead>
                <TableHead>IP Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Territory</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Royalty Rate</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLicenseAgreements.map((agreement) => (
                <TableRow key={agreement.id}>
                  <TableCell className="font-medium">{agreement.licensee}</TableCell>
                  <TableCell>{agreement.ipAsset}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{agreement.type}</Badge>
                  </TableCell>
                  <TableCell>{agreement.territory}</TableCell>
                  <TableCell className="text-sm">
                    {agreement.startDate} - {agreement.endDate}
                  </TableCell>
                  <TableCell>{agreement.royaltyRate}</TableCell>
                  <TableCell className="font-medium">{agreement.revenue}</TableCell>
                  <TableCell>{getStatusBadge(agreement.status)}</TableCell>
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
