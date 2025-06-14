
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Brain, FileText, Filter, BookOpen, Lightbulb } from "lucide-react";

const mockSearchResults = [
  {
    id: "1",
    title: "Data Protection Policy",
    entity: "TechCorp UK Ltd",
    excerpt: "This policy outlines the organization's approach to data protection and privacy compliance, ensuring adherence to GDPR and other applicable data protection regulations...",
    relevanceScore: 95,
    type: "Data Privacy",
    lastUpdated: "2024-01-10",
    tags: ["GDPR", "Data Protection", "Privacy"]
  },
  {
    id: "2",
    title: "Employee Code of Conduct",
    entity: "TechCorp GmbH",
    excerpt: "All employees must maintain the highest standards of professional conduct and ethical behavior in all business dealings...",
    relevanceScore: 87,
    type: "Ethics & Compliance",
    lastUpdated: "2024-01-28",
    tags: ["Ethics", "Conduct", "Compliance"]
  },
  {
    id: "3",
    title: "Information Security Policy",
    entity: "TechCorp Inc",
    excerpt: "This policy establishes guidelines for protecting company information assets and maintaining information security across all systems...",
    relevanceScore: 82,
    type: "Security",
    lastUpdated: "2024-02-05",
    tags: ["Security", "Information", "Assets"]
  }
];

const mockSuggestions = [
  "GDPR compliance requirements",
  "Data retention policies",
  "Employee harassment procedures",
  "Information security protocols",
  "Anti-money laundering guidelines"
];

const mockInsights = [
  {
    title: "Policy Gap Identified",
    description: "No remote work policy found across entities",
    type: "warning",
    entity: "All Entities"
  },
  {
    title: "Regulatory Update",
    description: "New data protection requirements may affect existing policies",
    type: "info",
    entity: "EU Entities"
  },
  {
    title: "Best Practice",
    description: "Consider standardizing privacy policies across all entities",
    type: "suggestion",
    entity: "All Entities"
  }
];

export function SearchHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("semantic");
  const [entityFilter, setEntityFilter] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate AI search delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSearching(false);
    setHasSearched(true);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning": return "🚨";
      case "info": return "ℹ️";
      case "suggestion": return "💡";
      default: return "📋";
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "warning": return "border-orange-200 bg-orange-50";
      case "info": return "border-blue-200 bg-blue-50";
      case "suggestion": return "border-green-200 bg-green-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI-Powered Policy Search
          </CardTitle>
          <CardDescription>
            Search across all policies using natural language queries and AI-powered semantic search
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Ask anything about your policies... e.g., 'What are our data retention requirements?'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-base"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching || !searchQuery.trim()}>
              {isSearching ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          {/* Search Options */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Search Type:</label>
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semantic">Semantic Search</SelectItem>
                  <SelectItem value="keyword">Keyword Search</SelectItem>
                  <SelectItem value="hybrid">Hybrid Search</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Entity:</label>
              <Select value={entityFilter} onValueChange={setEntityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entities</SelectItem>
                  <SelectItem value="uk">TechCorp UK Ltd</SelectItem>
                  <SelectItem value="de">TechCorp GmbH</SelectItem>
                  <SelectItem value="us">TechCorp Inc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Suggestions */}
          {!hasSearched && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Try these suggestions:</label>
              <div className="flex flex-wrap gap-2">
                {mockSuggestions.map((suggestion, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setSearchQuery(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Results & Insights */}
      {hasSearched && (
        <Tabs defaultValue="results" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="results">Search Results</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="gaps">Policy Gaps</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Found {mockSearchResults.length} results for "{searchQuery}"
              </h3>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">Sort by relevance</span>
              </div>
            </div>

            {mockSearchResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-lg">{result.title}</h4>
                        <Badge variant="outline">{result.type}</Badge>
                        <Badge className="bg-green-100 text-green-800">
                          {result.relevanceScore}% match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {result.entity} • Last updated: {result.lastUpdated}
                      </p>
                      <p className="text-sm mb-3">{result.excerpt}</p>
                      <div className="flex items-center space-x-2">
                        {result.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Policy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                AI-Generated Insights
              </h3>
              <p className="text-sm text-muted-foreground">
                Based on your search and current policy landscape, here are some insights:
              </p>

              {mockInsights.map((insight, index) => (
                <Card key={index} className={`border-l-4 ${getInsightColor(insight.type)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-lg">{getInsightIcon(insight.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Applies to: {insight.entity}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gaps" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Policy Gap Analysis</CardTitle>
                <CardDescription>
                  AI-identified areas where policies may be missing or incomplete
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
                    <h4 className="font-medium text-orange-900">Missing Policies</h4>
                    <ul className="text-sm text-orange-800 mt-2 space-y-1">
                      <li>• Remote Work Policy (recommended for all entities)</li>
                      <li>• Social Media Usage Policy</li>
                      <li>• Vendor Management Policy</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <h4 className="font-medium text-blue-900">Outdated Policies</h4>
                    <ul className="text-sm text-blue-800 mt-2 space-y-1">
                      <li>• IT Security Policy (last updated 18 months ago)</li>
                      <li>• Privacy Policy (regulatory changes pending)</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                    <h4 className="font-medium text-green-900">Recommendations</h4>
                    <ul className="text-sm text-green-800 mt-2 space-y-1">
                      <li>• Standardize data retention policies across entities</li>
                      <li>• Create policy templates for common scenarios</li>
                      <li>• Implement quarterly policy review schedule</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
