
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Filter, Download, Eye, Edit } from "lucide-react";
import { AddIPAssetModal } from "./AddIPAssetModal";
import { IPAssetDetailModal } from "./IPAssetDetailModal";

const mockIPAssets = [
  {
    id: "1",
    title: "TechBrand Logo",
    type: "Trademark",
    owner: "TechCorp Ltd",
    jurisdiction: "US",
    registrationNo: "US2024001234",
    filingDate: "2024-01-15",
    status: "Registered",
    renewalDate: "2029-01-15",
    classes: "Class 9, 42",
    linkedContracts: 3,
    linkedDisputes: 0
  },
  {
    id: "2",
    title: "AI Processing Method",
    type: "Patent",
    owner: "TechCorp Inc",
    jurisdiction: "EP",
    registrationNo: "EP3456789",
    filingDate: "2023-06-10",
    status: "Granted",
    renewalDate: "2025-06-10",
    classes: "G06F 17/30",
    linkedContracts: 1,
    linkedDisputes: 1
  },
  {
    id: "3",
    title: "Product Manual v2.0",
    type: "Copyright",
    owner: "TechCorp UK",
    jurisdiction: "UK",
    registrationNo: "CR-2024-789",
    filingDate: "2024-02-20",
    status: "Registered",
    renewalDate: "2074-02-20",
    classes: "Literary Work",
    linkedContracts: 0,
    linkedDisputes: 0
  }
];

export function IPAssetRegister() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Registered":
      case "Granted":
        return <Badge className="bg-green-100 text-green-800">Registered</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "Opposed":
        return <Badge className="bg-red-100 text-red-800">Opposed</Badge>;
      case "Expired":
        return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleViewAsset = (asset: any) => {
    setSelectedAsset(asset);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">IP Asset Register</h2>
          <p className="text-muted-foreground">
            Centralized registry of all intellectual property assets
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add IP Asset
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="trademark">Trademark</SelectItem>
                <SelectItem value="patent">Patent</SelectItem>
                <SelectItem value="copyright">Copyright</SelectItem>
                <SelectItem value="design">Industrial Design</SelectItem>
                <SelectItem value="domain">Domain Name</SelectItem>
                <SelectItem value="trade-secret">Trade Secret</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
              <SelectTrigger>
                <SelectValue placeholder="Jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jurisdictions</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ep">European Union</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="cn">China</SelectItem>
                <SelectItem value="jp">Japan</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="registered">Registered</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="opposed">Opposed</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <CardTitle>IP Assets ({mockIPAssets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Registration No.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Links</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockIPAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{asset.type}</Badge>
                  </TableCell>
                  <TableCell>{asset.owner}</TableCell>
                  <TableCell>{asset.jurisdiction}</TableCell>
                  <TableCell className="font-mono text-sm">{asset.registrationNo}</TableCell>
                  <TableCell>{getStatusBadge(asset.status)}</TableCell>
                  <TableCell>{asset.renewalDate}</TableCell>
                  <TableCell className="text-sm">{asset.classes}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Contracts: {asset.linkedContracts}</div>
                      <div>Disputes: {asset.linkedDisputes}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewAsset(asset)}
                      >
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

      <AddIPAssetModal open={showAddModal} onOpenChange={setShowAddModal} />
      <IPAssetDetailModal 
        open={showDetailModal} 
        onOpenChange={setShowDetailModal}
        asset={selectedAsset}
      />
    </div>
  );
}
