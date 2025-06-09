
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Bell, Eye, FileText, Scale, Gavel } from "lucide-react";
import { RegulatoryUpdateModal } from "./RegulatoryUpdateModal";

export function RegulatoryWatchlist() {
  const [selectedUpdate, setSelectedUpdate] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [jurisdictionFilter, setJurisdictionFilter] = useState("all");

  const stats = [
    {
      title: "Active Alerts",
      value: "24",
      change: "+3 this week",
      icon: Bell,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "New Regulations",
      value: "8",
      change: "This month",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Case Law Updates",
      value: "12",
      change: "Under review",
      icon: Gavel,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Pending Actions",
      value: "16",
      change: "Requiring review",
      icon: Eye,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const updates = [
    {
      id: 1,
      title: "EU AI Act Implementation Guidelines",
      type: "Regulation",
      jurisdiction: "European Union",
      status: "Active",
      effectiveDate: "2024-08-01",
      riskLevel: "High",
      assignedReviewer: "Sarah Johnson",
      summary: "New guidelines for AI system compliance and risk assessment requirements",
      source: "European Commission"
    },
    {
      id: 2,
      title: "Data Protection Amendment Act 2024",
      type: "Proposed Regulation",
      jurisdiction: "United Kingdom",
      status: "Proposed",
      effectiveDate: "2025-01-01",
      riskLevel: "Medium",
      assignedReviewer: "Michael Chen",
      summary: "Proposed amendments to UK GDPR implementation",
      source: "UK Parliament"
    },
    {
      id: 3,
      title: "Thompson v. TechCorp Data Breach Ruling",
      type: "Case Law",
      jurisdiction: "United States",
      status: "Final",
      effectiveDate: "2024-06-15",
      riskLevel: "High",
      assignedReviewer: "Emma Wilson",
      summary: "Landmark ruling on corporate liability in data breach incidents",
      source: "Supreme Court"
    }
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Regulation":
        return <Badge className="bg-blue-100 text-blue-800">Regulation</Badge>;
      case "Proposed Regulation":
        return <Badge className="bg-orange-100 text-orange-800">Proposed</Badge>;
      case "Case Law":
        return <Badge className="bg-purple-100 text-purple-800">Case Law</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "High":
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Watchlist */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Regulatory Watchlist</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Alert
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search regulatory updates..."
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
                <SelectItem value="regulation">Regulation</SelectItem>
                <SelectItem value="proposed">Proposed</SelectItem>
                <SelectItem value="case-law">Case Law</SelectItem>
              </SelectContent>
            </Select>
            <Select value={jurisdictionFilter} onValueChange={setJurisdictionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jurisdictions</SelectItem>
                <SelectItem value="eu">European Union</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="sg">Singapore</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Updates Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Assigned Reviewer</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {updates.map((update) => (
                <TableRow 
                  key={update.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedUpdate(update)}
                >
                  <TableCell className="font-medium">{update.title}</TableCell>
                  <TableCell>{getTypeBadge(update.type)}</TableCell>
                  <TableCell>{update.jurisdiction}</TableCell>
                  <TableCell>{update.effectiveDate}</TableCell>
                  <TableCell>{getRiskBadge(update.riskLevel)}</TableCell>
                  <TableCell>{update.assignedReviewer}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{update.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <RegulatoryUpdateModal update={selectedUpdate} onOpenChange={setSelectedUpdate} />
    </div>
  );
}
