
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Shield, FileText, Eye, Calendar } from "lucide-react";
import { AddIPAssetModal } from "./AddIPAssetModal";
import { IPAssetDetailModal } from "./IPAssetDetailModal";
import { CentralDataService } from "@/services/centralDataService";

export function IPAssetRegister() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const centralIPAssets = CentralDataService.getIPAssets();
  
  // Transform central data to match component interface
  const assets = centralIPAssets.map(asset => ({
    id: asset.applicationNumber || asset.id.toUpperCase(),
    title: asset.title,
    type: asset.type,
    status: asset.status,
    jurisdiction: asset.jurisdiction,
    filingDate: asset.filingDate.toLocaleDateString(),
    expiryDate: asset.expirationDate ? asset.expirationDate.toLocaleDateString() : 'N/A',
    inventor: asset.inventorIds.map(id => CentralDataService.getPersonById(id)?.fullName).filter(Boolean).join(', ') || 'Unknown',
    assignee: CentralDataService.getEntityById(asset.assigneeId)?.name || 'Unknown Entity',
    renewalDue: asset.expirationDate ? asset.expirationDate.toLocaleDateString() : 'N/A',
    value: `$${asset.estimatedValue.toLocaleString()}`,
    maintenanceCost: `$${asset.maintenanceFees.toLocaleString()}`
  }));

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Patent": return "bg-blue-100 text-blue-800";
      case "Trademark": return "bg-green-100 text-green-800";
      case "Copyright": return "bg-purple-100 text-purple-800";
      case "Trade Secret": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Expired": return "bg-red-100 text-red-800";
      case "Abandoned": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || asset.type === typeFilter;
    const matchesStatus = statusFilter === "all" || asset.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              IP Asset Register
            </CardTitle>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets by title or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Patent">Patents</SelectItem>
                <SelectItem value="Trademark">Trademarks</SelectItem>
                <SelectItem value="Copyright">Copyrights</SelectItem>
                <SelectItem value="Trade Secret">Trade Secrets</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Abandoned">Abandoned</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset Details</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Next Renewal</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{asset.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {asset.id} • Filed: {asset.filingDate}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Inventor: {asset.inventor}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(asset.type)}>
                      {asset.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(asset.status)}>
                      {asset.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{asset.jurisdiction}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{asset.value}</div>
                      <div className="text-sm text-muted-foreground">
                        Maintenance: {asset.maintenanceCost}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {asset.renewalDue}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedAsset(asset)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddIPAssetModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
      />
      
      <IPAssetDetailModal 
        asset={selectedAsset}
        open={!!selectedAsset}
        onOpenChange={() => setSelectedAsset(null)}
      />
    </div>
  );
}
