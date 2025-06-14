
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Filter, 
  Plus, 
  BookOpen, 
  Star, 
  Clock, 
  User, 
  Tag,
  FileText,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

export function AdviceLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const adviceEntries = [
    {
      id: 1,
      title: "Employment Contract Templates - Remote Work Clauses",
      category: "Employment Law",
      summary: "Standard clauses and considerations for remote work arrangements in employment contracts.",
      content: "This guidance covers essential clauses for remote work arrangements including...",
      author: "Sarah Chen",
      lastUpdated: "2024-01-15",
      tags: ["contracts", "remote-work", "employment"],
      rating: 4.8,
      views: 245,
      isBookmarked: true
    },
    {
      id: 2,
      title: "GDPR Compliance Checklist for Data Processing Agreements",
      category: "Data Privacy",
      summary: "Comprehensive checklist for ensuring GDPR compliance in data processing agreements.",
      content: "Key requirements for GDPR compliance include...",
      author: "Emily Rodriguez",
      lastUpdated: "2024-01-12",
      tags: ["gdpr", "data-privacy", "compliance"],
      rating: 4.9,
      views: 189,
      isBookmarked: false
    },
    {
      id: 3,
      title: "Vendor Agreement Risk Assessment Framework",
      category: "Contract Law",
      summary: "Framework for identifying and mitigating risks in vendor agreements.",
      content: "Risk assessment should cover the following areas...",
      author: "David Park",
      lastUpdated: "2024-01-10",
      tags: ["vendor", "risk-assessment", "contracts"],
      rating: 4.6,
      views: 156,
      isBookmarked: true
    },
    {
      id: 4,
      title: "Intellectual Property License Negotiations",
      category: "IP Law",
      summary: "Best practices for negotiating intellectual property licensing agreements.",
      content: "When negotiating IP licenses, consider the following key terms...",
      author: "Michael Wong",
      lastUpdated: "2024-01-08",
      tags: ["ip", "licensing", "negotiations"],
      rating: 4.7,
      views: 203,
      isBookmarked: false
    }
  ];

  const categories = [
    "Employment Law",
    "Data Privacy",
    "Contract Law",
    "IP Law",
    "Regulatory Compliance",
    "Corporate Law"
  ];

  const filteredEntries = adviceEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Legal Advice Library</h2>
          <p className="text-muted-foreground">Searchable repository of legal guidance and templates</p>
        </div>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Advice Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Advice Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input placeholder="Enter advice title" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Summary</Label>
                <Textarea placeholder="Brief summary of the advice" rows={2} />
              </div>
              
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea placeholder="Detailed advice content" rows={6} />
              </div>
              
              <div className="space-y-2">
                <Label>Tags</Label>
                <Input placeholder="Enter tags separated by commas" />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddModal(false)}>
                  Save Advice Entry
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search advice library..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{entry.title}</h3>
                    <Badge variant="outline">{entry.category}</Badge>
                    {entry.isBookmarked && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{entry.summary}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {entry.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Updated {entry.lastUpdated}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {entry.views} views
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {entry.rating}/5
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="h-2 w-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    {entry.isBookmarked ? (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">127</p>
                <p className="text-sm text-muted-foreground">Total Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Eye className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Plus className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Added This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">4.7</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
