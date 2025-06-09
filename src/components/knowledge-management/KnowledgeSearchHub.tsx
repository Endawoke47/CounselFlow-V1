
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, Copy, Download, Grid, List } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockSearchResults = [
  {
    id: "1",
    title: "Data Protection Impact Assessment Template",
    type: "Template",
    snippet: "Standard DPIA template for GDPR compliance assessments including risk evaluation criteria...",
    jurisdiction: "EU",
    tags: ["GDPR", "DPIA", "Privacy"],
    lastModified: "2024-01-15",
    relevanceScore: 95
  },
  {
    id: "2",
    title: "Employment Termination Procedures",
    type: "Playbook",
    snippet: "Comprehensive guide for handling employee terminations across different jurisdictions...",
    jurisdiction: "Multiple",
    tags: ["Employment", "Termination", "HR"],
    lastModified: "2024-01-20",
    relevanceScore: 88
  },
  {
    id: "3",
    title: "IP License Agreement Clauses",
    type: "Clause Library",
    snippet: "Standard intellectual property licensing clauses with risk assessments and alternatives...",
    jurisdiction: "US",
    tags: ["IP", "Licensing", "Contracts"],
    lastModified: "2024-01-18",
    relevanceScore: 82
  }
];

const recentSearches = [
  "GDPR compliance checklist",
  "Employment contract termination",
  "IP licensing terms",
  "M&A due diligence"
];

const suggestedTopics = [
  "Contract Review Process",
  "Regulatory Updates Q1 2024",
  "Risk Assessment Templates",
  "Compliance Training Materials"
];

export function KnowledgeSearchHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [jurisdictionFilter, setJurisdictionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Knowledge Search</CardTitle>
          <CardDescription>
            Search using natural language or keywords to find relevant legal knowledge
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Ask a question or search for knowledge... (e.g., 'What are the GDPR compliance requirements for data processing?')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap items-center gap-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="memo">Memo</SelectItem>
                <SelectItem value="faq">FAQ</SelectItem>
                <SelectItem value="playbook">Playbook</SelectItem>
                <SelectItem value="template">Template</SelectItem>
                <SelectItem value="clause">Clause</SelectItem>
              </SelectContent>
            </Select>

            <Select value={jurisdictionFilter} onValueChange={setJurisdictionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jurisdictions</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="eu">European Union</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="date">Last Modified</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="type">Document Type</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto flex gap-2">
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cards")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search Results */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Search Results ({mockSearchResults.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {viewMode === "cards" ? (
                <div className="grid gap-4">
                  {mockSearchResults.map((result) => (
                    <Card key={result.id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-lg mb-1">{result.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{result.type}</Badge>
                            <Badge variant="outline">{result.jurisdiction}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {result.relevanceScore}% match
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{result.snippet}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {result.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {mockSearchResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex-1">
                        <h3 className="font-medium">{result.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{result.type}</Badge>
                          <Badge variant="outline" className="text-xs">{result.jurisdiction}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {result.lastModified}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Copy</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Smart Suggestions Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="w-full text-left text-sm p-2 rounded hover:bg-muted"
                    onClick={() => setSearchQuery(search)}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Suggested Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestedTopics.map((topic, index) => (
                  <button
                    key={index}
                    className="w-full text-left text-sm p-2 rounded hover:bg-muted"
                    onClick={() => setSearchQuery(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
