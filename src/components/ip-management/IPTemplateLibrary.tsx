
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Download, Eye, FileText, Copy } from "lucide-react";

const mockTemplates = [
  {
    id: "1",
    title: "Patent License Agreement - Standard",
    type: "License Agreement",
    jurisdiction: "Multi-jurisdictional",
    riskLevel: "Medium",
    lastUpdated: "2024-11-15",
    usage: 12,
    tags: ["Patent", "Licensing", "Standard"]
  },
  {
    id: "2",
    title: "Trademark Assignment Deed",
    type: "Assignment",
    jurisdiction: "UK",
    riskLevel: "Low",
    lastUpdated: "2024-10-22",
    usage: 8,
    tags: ["Trademark", "Assignment", "UK"]
  },
  {
    id: "3",
    title: "Cease and Desist - Trademark Infringement",
    type: "Enforcement Letter",
    jurisdiction: "US",
    riskLevel: "High",
    lastUpdated: "2024-12-01",
    usage: 15,
    tags: ["Trademark", "Enforcement", "Infringement"]
  }
];

const templateCategories = [
  { name: "License Agreements", count: 12, description: "Inbound and outbound licensing templates" },
  { name: "Assignment Deeds", count: 8, description: "IP transfer and assignment documents" },
  { name: "Enforcement Letters", count: 6, description: "Cease & desist and takedown notices" },
  { name: "NDAs", count: 15, description: "IP-focused non-disclosure agreements" },
  { name: "Joint Development", count: 4, description: "Collaborative IP development agreements" }
];

export function IPTemplateLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "High":
        return <Badge variant="destructive">High Risk</Badge>;
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">IP Template Library</h2>
          <p className="text-muted-foreground">
            IP-specific templates, clauses, and enforcement documents
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Template
        </Button>
      </div>

      {/* Template Categories */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {templateCategories.map((category, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{category.count}</div>
                <div className="font-medium">{category.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{category.description}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Template Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="license">License Agreement</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
                <SelectItem value="enforcement">Enforcement Letter</SelectItem>
                <SelectItem value="nda">NDA</SelectItem>
                <SelectItem value="joint-dev">Joint Development</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
              <SelectTrigger>
                <SelectValue placeholder="Jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jurisdictions</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="eu">European Union</SelectItem>
                <SelectItem value="multi">Multi-jurisdictional</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRisk} onValueChange={setSelectedRisk}>
              <SelectTrigger>
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Templates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Available Templates</CardTitle>
          <CardDescription>IP templates and clause library</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Usage Count</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{template.type}</Badge>
                  </TableCell>
                  <TableCell>{template.jurisdiction}</TableCell>
                  <TableCell>{getRiskBadge(template.riskLevel)}</TableCell>
                  <TableCell>{template.lastUpdated}</TableCell>
                  <TableCell>{template.usage}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {template.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {template.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Clause Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>AI Clause Suggestions</CardTitle>
          <CardDescription>Recommended clauses and template improvements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium">Enhanced Data Protection Clause</div>
                <div className="text-sm text-muted-foreground mb-2">
                  For licensing agreements involving data processing or AI technologies
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">GDPR Compliant</Badge>
                  <Badge variant="outline" className="text-xs">AI Ready</Badge>
                </div>
              </div>
              <Button size="sm" variant="outline">
                View Clause
              </Button>
            </div>
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <FileText className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium">Updated Termination Provisions</div>
                <div className="text-sm text-muted-foreground mb-2">
                  Recommended updates based on recent case law changes
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">Recent Updates</Badge>
                  <Badge variant="outline" className="text-xs">Risk Mitigation</Badge>
                </div>
              </div>
              <Button size="sm" variant="outline">
                View Updates
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
