
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, Eye, Edit } from "lucide-react";

interface Contract {
  id: number;
  title: string;
  entity: string;
  status: string;
  renewalDate: string;
  owner: string;
  value: string;
  type: string;
}

interface ContractsListProps {
  contracts?: Contract[];
  onViewContract?: (contract: Contract) => void;
  onEditContract?: (contract: Contract) => void;
}

export function ContractsList({ contracts: propContracts, onViewContract, onEditContract }: ContractsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const defaultContracts = [
    {
      id: 1,
      title: "Software License Agreement",
      entity: "Acme Corp Ltd",
      status: "Active",
      renewalDate: "2024-12-15",
      owner: "Sarah Johnson",
      value: "$50,000",
      type: "Software"
    },
    {
      id: 2,
      title: "Master Service Agreement",
      entity: "Global Holdings Inc",
      status: "Expiring",
      renewalDate: "2024-07-20",
      owner: "Mike Chen",
      value: "$125,000",
      type: "Service"
    },
    {
      id: 3,
      title: "Property Lease",
      entity: "Regional Office LLC",
      status: "Active",
      renewalDate: "2025-03-01",
      owner: "Lisa Wong",
      value: "$200,000",
      type: "Real Estate"
    },
    {
      id: 4,
      title: "Vendor Agreement",
      entity: "Tech Subsidiary Co",
      status: "Under Review",
      renewalDate: "2024-09-10",
      owner: "David Kim",
      value: "$75,000",
      type: "Vendor"
    },
    {
      id: 5,
      title: "Employment Contract",
      entity: "Acme Corp Ltd",
      status: "Active",
      renewalDate: "2024-12-31",
      owner: "HR Team",
      value: "$80,000",
      type: "Employment"
    }
  ];

  const contracts = propContracts || defaultContracts;

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Expiring":
        return "destructive";
      case "Under Review":
        return "secondary";
      default:
        return "outline";
    }
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || contract.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search contracts, entities, or owners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expiring">Expiring</option>
                <option value="under review">Under Review</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contracts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contracts ({filteredContracts.length})</CardTitle>
          <CardDescription>
            Manage and track all contracts across your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract Title</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{contract.title}</TableCell>
                  <TableCell>{contract.entity}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(contract.status)}>
                      {contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{contract.renewalDate}</TableCell>
                  <TableCell>{contract.owner}</TableCell>
                  <TableCell>{contract.value}</TableCell>
                  <TableCell>{contract.type}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onViewContract?.(contract)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onEditContract?.(contract)}
                      >
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
