
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Eye, Edit, Star, MapPin } from "lucide-react";
import { AddVendorModal } from "./AddVendorModal";
import { VendorDetailModal } from "./VendorDetailModal";

export function VendorManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [specializationFilter, setSpecializationFilter] = useState("all");

  const vendors = [
    {
      id: 1,
      name: "Davis Polk & Wardwell",
      type: "Magic Circle",
      jurisdiction: "US, UK, EU",
      specializations: ["M&A", "Securities", "Banking"],
      status: "Approved",
      rating: 4.8,
      engagements: 8,
      totalSpend: "$324K",
      lastEngagement: "2024-03-15"
    },
    {
      id: 2,
      name: "Clifford Chance",
      type: "Magic Circle",
      jurisdiction: "UK, EU, APAC",
      specializations: ["Banking", "Capital Markets", "Real Estate"],
      status: "Panel",
      rating: 4.6,
      engagements: 12,
      totalSpend: "$298K",
      lastEngagement: "2024-03-10"
    },
    {
      id: 3,
      name: "Baker McKenzie",
      type: "Global",
      jurisdiction: "Global Coverage",
      specializations: ["Employment", "IP", "Tax"],
      status: "Approved",
      rating: 4.5,
      engagements: 15,
      totalSpend: "$267K",
      lastEngagement: "2024-03-20"
    },
    {
      id: 4,
      name: "Local Boutique Firm",
      type: "Boutique",
      jurisdiction: "Singapore",
      specializations: ["Regulatory", "Compliance"],
      status: "Blacklisted",
      rating: 2.1,
      engagements: 2,
      totalSpend: "$45K",
      lastEngagement: "2024-01-15"
    }
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || vendor.status.toLowerCase() === statusFilter;
    const matchesSpecialization = specializationFilter === "all" || 
                                 vendor.specializations.some(spec => spec.toLowerCase() === specializationFilter);
    
    return matchesSearch && matchesStatus && matchesSpecialization;
  });

  const handleViewVendor = (vendor) => {
    setSelectedVendor(vendor);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Vendor Management</h2>
          <p className="text-muted-foreground">Manage external legal service providers</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search vendors, specializations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="panel">Panel</SelectItem>
                <SelectItem value="blacklisted">Blacklisted</SelectItem>
              </SelectContent>
            </Select>
            <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="m&a">M&A</SelectItem>
                <SelectItem value="litigation">Litigation</SelectItem>
                <SelectItem value="ip">IP</SelectItem>
                <SelectItem value="employment">Employment</SelectItem>
                <SelectItem value="regulatory">Regulatory</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Directory */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Directory</CardTitle>
          <CardDescription>
            {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Specializations</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Engagements</TableHead>
                <TableHead>Total Spend</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{vendor.name}</div>
                      <div className="text-sm text-muted-foreground">{vendor.type}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-sm">{vendor.jurisdiction}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {vendor.specializations.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        vendor.status === "Approved" ? "default" :
                        vendor.status === "Panel" ? "secondary" : "destructive"
                      }
                    >
                      {vendor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{vendor.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{vendor.engagements}</TableCell>
                  <TableCell className="font-medium">{vendor.totalSpend}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewVendor(vendor)}
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

      <AddVendorModal open={showAddModal} onOpenChange={setShowAddModal} />
      <VendorDetailModal 
        open={showDetailModal} 
        onOpenChange={setShowDetailModal}
        vendor={selectedVendor}
      />
    </div>
  );
}
