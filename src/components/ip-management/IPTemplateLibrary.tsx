
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Download, Eye, Edit, Search, Filter } from "lucide-react";

const mockTemplates = [
  {
    id: "1",
    title: "Patent License Agreement",
    category: "Licensing",
    type: "Contract Template",
    jurisdiction: "Multi-Jurisdictional",
    lastUpdated: "2024-01-15",
    usage: 42,
    status: "Active",
    description: "Comprehensive patent licensing agreement template with royalty provisions"
  },
  {
    id: "2",
    title: "Trademark Opposition Filing",
    category: "Disputes",
    type: "Legal Filing",
    jurisdiction: "US",
    lastUpdated: "2023-12-20",
    usage: 18,
    status: "Active",
    description: "Template for filing trademark opposition proceedings with USPTO"
  },
  {
    id: "3",
    title: "IP Assignment Agreement",
    category: "Assignments",
    type: "Contract Template",
    jurisdiction: "UK",
    lastUpdated: "2024-01-10",
    usage: 35,
    status: "Active",
    description: "Employee IP assignment and invention disclosure agreement"
  },
  {
    id: "4",
    title: "Cease and Desist Letter",
    category: "Enforcement",
    type: "Legal Notice",
    jurisdiction: "Multi-Jurisdictional",
    lastUpdated: "2023-11-28",
    usage: 23,
    status: "Active",
    description: "Formal cease and desist letter template for IP infringement"
  },
  {
    id: "5",
    title: "Prior Art Search Report",
    category: "Research",
    type: "Analysis Template",
    jurisdiction: "Global",
    lastUpdated: "2023-10-15",
    usage: 67,
    status: "Review Required",
    description: "Comprehensive prior art search and analysis report template"
  },
  {
    id: "6",
    title: "Patent Prosecution Memo",
    category: "Prosecution",
    type: "Internal Memo",
    jurisdiction: "EP",
    lastUpdated: "2023-09-22",
    usage: 89,
    status: "Active",
    description: "Template for patent prosecution strategy and office action responses"
  }
];

const mockCategories = [
  { name: "Licensing", count: 12, color: "bg-blue-100 text-blue-800" },
  { name: "Disputes", count: 8, color: "bg-red-100 text-red-800" },
  { name: "Assignments", count: 15, color: "bg-green-100 text-green-800" },
  { name: "Enforcement", count: 6, color: "bg-purple-100 text-purple-800" },
  { name: "Research", count: 9, color: "bg-orange-100 text-orange-800" },
  { name: "Prosecution", count: 11, color: "bg-teal-100 text-teal-800" }
];

export function IPTemplateLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "Review Required":
        return <Badge className="bg-yellow-100 text-yellow-800">Review Required</Badge>;
      case "Deprecated":
        return <Badge className="bg-gray-100 text-gray-800">Deprecated</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">IP Template Library</h2>
          <p className="text-muted-foreground">
            Standardized templates for IP legal documents and processes
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Template
        </Button>
      </div>

      {/* Template Categories Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {mockCategories.map((category) => (
          <Card key={category.name} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{category.count}</div>
              <div className="text-sm font-medium">{category.name}</div>
              <Badge className={`${category.color} mt-2`} variant="secondary">
                Templates
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">61</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Used</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              Patent Prosecution Memo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Updates</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Updated this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Review Required</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Templates pending review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Template Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="licensing">Licensing</SelectItem>
                <SelectItem value="disputes">Disputes</SelectItem>
                <SelectItem value="assignments">Assignments</SelectItem>
                <SelectItem value="enforcement">Enforcement</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="prosecution">Prosecution</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Template Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="contract">Contract Template</SelectItem>
                <SelectItem value="filing">Legal Filing</SelectItem>
                <SelectItem value="memo">Internal Memo</SelectItem>
                <SelectItem value="notice">Legal Notice</SelectItem>
                <SelectItem value="analysis">Analysis Template</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
              <SelectTrigger>
                <SelectValue placeholder="Jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jurisdictions</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="eu">European Union</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="multi">Multi-Jurisdictional</SelectItem>
                <SelectItem value="global">Global</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Templates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Template Library ({mockTemplates.length})</CardTitle>
          <CardDescription>Available IP legal document templates and forms</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Usage Count</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{template.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {template.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{template.category}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{template.type}</TableCell>
                  <TableCell className="text-sm">{template.jurisdiction}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{template.usage}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{template.lastUpdated}</TableCell>
                  <TableCell>{getStatusBadge(template.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
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

      {/* Popular Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Most Popular Templates</CardTitle>
          <CardDescription>Frequently used templates across the organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium">Patent Prosecution Memo</div>
                  <div className="text-sm text-muted-foreground">89 uses</div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Prosecution</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Template for patent prosecution strategy and office action responses
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium">Prior Art Search Report</div>
                  <div className="text-sm text-muted-foreground">67 uses</div>
                </div>
                <Badge className="bg-orange-100 text-orange-800">Research</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Comprehensive prior art search and analysis report template
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium">Patent License Agreement</div>
                  <div className="text-sm text-muted-foreground">42 uses</div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Licensing</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Comprehensive patent licensing agreement template with royalty provisions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
