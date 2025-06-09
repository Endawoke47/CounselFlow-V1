
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, Copy } from "lucide-react";

const mockSearchResults = [
  {
    id: "1",
    title: "Data Protection Policy",
    snippet: "This policy covers data collection, processing, and storage in accordance with GDPR requirements...",
    tags: ["GDPR", "Data Protection", "Privacy"],
    entity: "TechCorp UK Ltd",
    status: "Active",
    date: "2024-01-15",
    confidence: 95
  },
  {
    id: "2",
    title: "Employee Privacy Guidelines",
    snippet: "Guidelines for protecting employee personal data and maintaining confidentiality in the workplace...",
    tags: ["Employee Privacy", "HR", "Confidentiality"],
    entity: "TechCorp GmbH",
    status: "Active", 
    date: "2024-02-01",
    confidence: 87
  },
  {
    id: "3",
    title: "Third-Party Data Sharing Agreement Template",
    snippet: "Standard template for agreements governing the sharing of personal data with external partners...",
    tags: ["Data Sharing", "Third Party", "Template"],
    entity: "TechCorp Inc",
    status: "Active",
    date: "2024-01-20",
    confidence: 78
  }
];

export function SearchHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [entityFilter, setEntityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Policy Search</CardTitle>
          <CardDescription>Search policies using natural language queries and intelligent filters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  placeholder="Ask anything about your policies... e.g., 'Show me all GDPR-related policies for UK entities'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <Select value={entityFilter} onValueChange={setEntityFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by Entity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Entities</SelectItem>
                  <SelectItem value="uk">TechCorp UK Ltd</SelectItem>
                  <SelectItem value="de">TechCorp GmbH</SelectItem>
                  <SelectItem value="us">TechCorp Inc</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Policy Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="data-privacy">Data Privacy</SelectItem>
                  <SelectItem value="ethics">Ethics & Compliance</SelectItem>
                  <SelectItem value="financial">Financial Compliance</SelectItem>
                  <SelectItem value="hr">HR Policies</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2 ml-auto">
                <Button
                  variant={viewMode === "cards" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                >
                  Cards
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                >
                  Table
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>Found {mockSearchResults.length} policies matching your query</CardDescription>
            </div>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSearchResults.map((result) => (
              <Card key={result.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{result.title}</h3>
                        <Badge variant="outline">{result.confidence}% match</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{result.snippet}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{result.entity}</span>
                        <span>•</span>
                        <span>{result.status}</span>
                        <span>•</span>
                        <span>{result.date}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {result.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-1" />
                        Copy Clause
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assistance Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Search Assistance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2">Suggested Queries</h4>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="justify-start w-full">
                  "Data retention policies"
                </Button>
                <Button variant="ghost" size="sm" className="justify-start w-full">
                  "GDPR compliance documents"
                </Button>
                <Button variant="ghost" size="sm" className="justify-start w-full">
                  "Employee handbook updates"
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Quick Filters</h4>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="justify-start w-full">
                  Recently updated
                </Button>
                <Button variant="ghost" size="sm" className="justify-start w-full">
                  Pending approval
                </Button>
                <Button variant="ghost" size="sm" className="justify-start w-full">
                  Expiring soon
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Recent Searches</h4>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="justify-start w-full">
                  "Privacy policies UK"
                </Button>
                <Button variant="ghost" size="sm" className="justify-start w-full">
                  "Code of conduct"
                </Button>
                <Button variant="ghost" size="sm" className="justify-start w-full">
                  "Security protocols"
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
