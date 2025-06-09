
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Download, Eye, Edit, MoreHorizontal } from "lucide-react";
import { DisputeDetailModal } from "./DisputeDetailModal";

export function DisputesList() {
  const [selectedDisputes, setSelectedDisputes] = useState<string[]>([]);
  const [showDisputeDetail, setShowDisputeDetail] = useState(false);
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);

  const disputes = [
    {
      id: "DIS-001",
      title: "Contract Breach - Supplier XYZ",
      entity: "Tech Corp Ltd",
      counterparty: "XYZ Supplies Inc",
      status: "In Review",
      priority: "High",
      owner: "Sarah Johnson",
      exposure: "$450,000",
      provisioned: true,
      initiated: "2024-01-15",
      deadline: "2024-02-15",
      lastUpdated: "2 hours ago"
    },
    {
      id: "DIS-002", 
      title: "Employment Dispute - Wrongful Termination",
      entity: "Tech Corp UK",
      counterparty: "John Smith",
      status: "Negotiation",
      priority: "Medium",
      owner: "Mike Chen",
      exposure: "$125,000",
      provisioned: false,
      initiated: "2024-01-10",
      deadline: "2024-03-01",
      lastUpdated: "1 day ago"
    },
    {
      id: "DIS-003",
      title: "IP Infringement Claim",
      entity: "Innovation Labs",
      counterparty: "Patent Co LLC",
      status: "Escalated",
      priority: "Critical",
      owner: "Lisa Wang",
      exposure: "$800,000",
      provisioned: true,
      initiated: "2024-01-05",
      deadline: "2024-01-30",
      lastUpdated: "3 days ago"
    },
    {
      id: "DIS-004",
      title: "Lease Dispute - Office Space",
      entity: "Real Estate Holdings",
      counterparty: "Property Management Co",
      status: "Open",
      priority: "Low",
      owner: "Tom Rodriguez",
      exposure: "$75,000",
      provisioned: false,
      initiated: "2024-01-20",
      deadline: "2024-04-01",
      lastUpdated: "5 days ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-blue-100 text-blue-800";
      case "In Review": return "bg-yellow-100 text-yellow-800";
      case "Negotiation": return "bg-orange-100 text-orange-800";
      case "Escalated": return "bg-red-100 text-red-800";
      case "Resolved": return "bg-green-100 text-green-800";
      case "Closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSelectDispute = (disputeId: string, checked: boolean) => {
    if (checked) {
      setSelectedDisputes([...selectedDisputes, disputeId]);
    } else {
      setSelectedDisputes(selectedDisputes.filter(id => id !== disputeId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDisputes(disputes.map(d => d.id));
    } else {
      setSelectedDisputes([]);
    }
  };

  const handleViewDispute = (disputeId: string) => {
    setSelectedDisputeId(disputeId);
    setShowDisputeDetail(true);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Disputes</CardTitle>
              <CardDescription>Manage and track all disputes across entities</CardDescription>
            </div>
            <div className="flex gap-2">
              {selectedDisputes.length > 0 && (
                <Button variant="outline" size="sm">
                  Bulk Actions ({selectedDisputes.length})
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search disputes by title, entity, or counterparty..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                <SelectItem value="tech-corp">Tech Corp Ltd</SelectItem>
                <SelectItem value="tech-uk">Tech Corp UK</SelectItem>
                <SelectItem value="innovation">Innovation Labs</SelectItem>
                <SelectItem value="real-estate">Real Estate Holdings</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedDisputes.length === disputes.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Dispute Title</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Counterparty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Exposure</TableHead>
                <TableHead>Provisioned</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disputes.map((dispute) => (
                <TableRow key={dispute.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox 
                      checked={selectedDisputes.includes(dispute.id)}
                      onCheckedChange={(checked) => handleSelectDispute(dispute.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{dispute.title}</TableCell>
                  <TableCell>{dispute.entity}</TableCell>
                  <TableCell>{dispute.counterparty}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(dispute.status)}>
                      {dispute.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(dispute.priority)}>
                      {dispute.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{dispute.owner}</TableCell>
                  <TableCell className="font-medium">{dispute.exposure}</TableCell>
                  <TableCell>
                    <Badge variant={dispute.provisioned ? "default" : "outline"}>
                      {dispute.provisioned ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{dispute.deadline}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewDispute(dispute.id)}
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

      <DisputeDetailModal 
        open={showDisputeDetail} 
        onOpenChange={setShowDisputeDetail}
        disputeId={selectedDisputeId}
      />
    </div>
  );
}
