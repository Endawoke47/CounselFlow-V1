
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Search, Filter, Plus } from "lucide-react";
import { AddKnowledgeModal } from "./AddKnowledgeModal";
import { KnowledgeDetailModal } from "./KnowledgeDetailModal";

const mockKnowledgeEntries = [
  {
    id: "1",
    title: "Data Protection Compliance Memo",
    type: "Memo",
    jurisdiction: "United Kingdom",
    author: "Sarah Johnson",
    tags: ["GDPR", "Data Protection", "Compliance"],
    lastUpdated: "2024-01-15",
    accessLevel: "Team"
  },
  {
    id: "2",
    title: "M&A Due Diligence Playbook",
    type: "Playbook",
    jurisdiction: "Multiple",
    author: "Michael Schmidt",
    tags: ["M&A", "Due Diligence", "Process"],
    lastUpdated: "2024-01-10",
    accessLevel: "Org-wide"
  },
  {
    id: "3",
    title: "Employment Contract Template",
    type: "Template Contract",
    jurisdiction: "Germany",
    author: "Jennifer Chen",
    tags: ["Employment", "Contract", "Template"],
    lastUpdated: "2024-02-05",
    accessLevel: "Team"
  }
];

export function KnowledgeLibraryDashboard() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [jurisdictionFilter, setJurisdictionFilter] = useState("all");

  const handleViewEntry = (entry: any) => {
    setSelectedEntry(entry);
    setDetailModalOpen(true);
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "Private": return "bg-red-100 text-red-800";
      case "Team": return "bg-blue-100 text-blue-800";
      case "Org-wide": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+45 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">186</div>
            <p className="text-xs text-muted-foreground">Contract templates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Playbooks</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Process guides</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Updates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Knowledge Library</CardTitle>
              <CardDescription>Manage institutional knowledge and legal resources</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setAddModalOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Knowledge
              </Button>
              <Button variant="outline" onClick={() => setAddModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Entry
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search knowledge entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={topicFilter} onValueChange={setTopicFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Topic / Legal Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                <SelectItem value="contracts">Contracts</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="employment">Employment</SelectItem>
                <SelectItem value="ip">Intellectual Property</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="memo">Memo</SelectItem>
                <SelectItem value="faq">FAQ</SelectItem>
                <SelectItem value="playbook">Playbook</SelectItem>
                <SelectItem value="risk-note">Risk Note</SelectItem>
                <SelectItem value="template-contract">Template Contract</SelectItem>
              </SelectContent>
            </Select>
            <Select value={jurisdictionFilter} onValueChange={setJurisdictionFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jurisdictions</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="multiple">Multiple</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Knowledge Entries Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockKnowledgeEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.title}</TableCell>
                  <TableCell>{entry.type}</TableCell>
                  <TableCell>{entry.jurisdiction}</TableCell>
                  <TableCell>{entry.author}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {entry.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{entry.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{entry.lastUpdated}</TableCell>
                  <TableCell>
                    <Badge className={getAccessLevelColor(entry.accessLevel)}>
                      {entry.accessLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewEntry(entry)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddKnowledgeModal open={addModalOpen} onOpenChange={setAddModalOpen} />
      <KnowledgeDetailModal 
        open={detailModalOpen} 
        onOpenChange={setDetailModalOpen}
        entry={selectedEntry}
      />
    </div>
  );
}
