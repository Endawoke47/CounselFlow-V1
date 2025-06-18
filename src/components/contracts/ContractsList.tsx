
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, Eye, Edit, Link, Upload } from "lucide-react";
import { RelationshipsPanel } from "@/components/ui/relationships-panel";
import { RelatedItem } from "@/services/relationshipService";
import { CentralDataService } from "@/services/centralDataService";
import { ExcelImportModal } from "@/components/shared/ExcelImportModal";
import { ExcelExportModal } from "@/components/shared/ExcelExportModal";

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
  onRelatedItemClick?: (item: RelatedItem) => void;
}

export function ContractsList({ contracts: propContracts, onViewContract, onEditContract, onRelatedItemClick }: ContractsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [showRelationships, setShowRelationships] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const centralContracts = CentralDataService.getContracts();
  
  // Transform central data to match component interface
  const defaultContracts = centralContracts.map(contract => ({
    id: parseInt(contract.id.split('-')[1]),
    title: contract.title,
    entity: CentralDataService.getEntityById(contract.entityId)?.name || 'Unknown Entity',
    status: contract.status,
    renewalDate: contract.expirationDate.toLocaleDateString(),
    owner: CentralDataService.getPersonById(contract.responsiblePersonId)?.fullName || 'Unknown',
    value: `${contract.currency} ${contract.contractValue.toLocaleString()}`,
    type: contract.type
  }));

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

  // Excel import/export configuration
  const contractColumns = [
    { key: 'title', label: 'Contract Title', type: 'text' as const },
    { key: 'entity', label: 'Entity', type: 'text' as const },
    { key: 'counterparty', label: 'Counterparty', type: 'text' as const },
    { key: 'value', label: 'Contract Value', type: 'currency' as const },
    { key: 'currency', label: 'Currency', type: 'text' as const },
    { key: 'startDate', label: 'Start Date', type: 'date' as const },
    { key: 'renewalDate', label: 'End Date', type: 'date' as const },
    { key: 'status', label: 'Status', type: 'text' as const },
    { key: 'type', label: 'Type', type: 'text' as const },
    { key: 'owner', label: 'Owner', type: 'text' as const }
  ];

  const handleImportContracts = async (data: any[]) => {
    // In a real implementation, this would call an API to import the contracts
    console.log('Importing contracts:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleExportContracts = async (config: any) => {
    // In a real implementation, this would prepare the data for export
    console.log('Exporting contracts with config:', config);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowImportModal(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowExportModal(true)}
              >
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
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedContract(contract);
                          setShowRelationships(true);
                        }}
                        title="View Related Items"
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Relationships Panel */}
      {showRelationships && selectedContract && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Related Items</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowRelationships(false)}
            >
              Close
            </Button>
          </div>
          <RelationshipsPanel
            itemId={`contract-${selectedContract.id.toString().padStart(3, '0')}`}
            itemType="contracts"
            itemTitle={selectedContract.title}
            onItemClick={onRelatedItemClick}
          />
        </div>
      )}

      {/* Import Modal */}
      <ExcelImportModal
        open={showImportModal}
        onOpenChange={setShowImportModal}
        title="Import Contracts from Excel"
        description="Upload an Excel file to bulk import contract data"
        templateColumns={contractColumns.map(col => col.label)}
        onImport={handleImportContracts}
        sampleData={[{
          'Contract Title': 'Software License Agreement',
          'Entity': 'Acme Corporation Ltd',
          'Counterparty': 'Microsoft Corporation',
          'Contract Value': '150000',
          'Currency': 'USD',
          'Start Date': '2024-01-01',
          'End Date': '2025-01-01',
          'Status': 'Active',
          'Type': 'Software License',
          'Owner': 'John Smith'
        }]}
      />

      {/* Export Modal */}
      <ExcelExportModal
        open={showExportModal}
        onOpenChange={setShowExportModal}
        title="Export Contracts to Excel"
        description="Export contract data to Excel or CSV format"
        data={filteredContracts}
        columns={contractColumns}
        onExport={handleExportContracts}
      />
    </div>
  );
}
