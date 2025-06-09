
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download } from "lucide-react";

export function DisputesOverview() {
  const summaryStats = [
    { title: "Open Disputes", value: "24", description: "Active cases requiring attention", status: "warning" },
    { title: "Escalated", value: "7", description: "High priority disputes", status: "destructive" },
    { title: "Closed This Month", value: "12", description: "Recently resolved", status: "success" },
    { title: "Total Exposure", value: "$2.4M", description: "Financial risk exposure", status: "default" }
  ];

  const recentDisputes = [
    {
      id: "DIS-001",
      title: "Contract Breach - Supplier XYZ",
      entity: "Tech Corp Ltd",
      counterparty: "XYZ Supplies Inc",
      status: "In Review",
      owner: "Sarah Johnson",
      exposure: "$450,000",
      provisioned: true,
      lastUpdated: "2 hours ago"
    },
    {
      id: "DIS-002", 
      title: "Employment Dispute - Wrongful Termination",
      entity: "Tech Corp UK",
      counterparty: "John Smith",
      status: "Negotiation",
      owner: "Mike Chen",
      exposure: "$125,000",
      provisioned: false,
      lastUpdated: "1 day ago"
    },
    {
      id: "DIS-003",
      title: "IP Infringement Claim",
      entity: "Innovation Labs",
      counterparty: "Patent Co LLC",
      status: "Escalated",
      owner: "Lisa Wang",
      exposure: "$800,000",
      provisioned: true,
      lastUpdated: "3 days ago"
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

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Disputes</CardTitle>
              <CardDescription>Latest dispute activity across all entities</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search disputes..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                <SelectItem value="tech-corp">Tech Corp Ltd</SelectItem>
                <SelectItem value="tech-uk">Tech Corp UK</SelectItem>
                <SelectItem value="innovation">Innovation Labs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dispute Title</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Counterparty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Exposure</TableHead>
                <TableHead>Provisioned</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDisputes.map((dispute) => (
                <TableRow key={dispute.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{dispute.title}</TableCell>
                  <TableCell>{dispute.entity}</TableCell>
                  <TableCell>{dispute.counterparty}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(dispute.status)}>
                      {dispute.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{dispute.owner}</TableCell>
                  <TableCell className="font-medium">{dispute.exposure}</TableCell>
                  <TableCell>
                    <Badge variant={dispute.provisioned ? "default" : "outline"}>
                      {dispute.provisioned ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{dispute.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
