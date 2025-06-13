
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Brain, AlertTriangle, Clock } from "lucide-react";

const mockDocuments = [
  {
    id: "1",
    name: "Financial Statements 2023.pdf",
    category: "Financial",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    status: "Reviewed",
    aiFlags: 3,
    reviewer: "Sarah Johnson",
    riskLevel: "Medium"
  },
  {
    id: "2",
    name: "Patent Portfolio Summary.xlsx",
    category: "IP & Technology",
    size: "1.8 MB",
    uploadDate: "2024-01-14",
    status: "In Review",
    aiFlags: 7,
    reviewer: "Michael Chen",
    riskLevel: "High"
  },
  {
    id: "3",
    name: "Employment Contracts Bundle.zip",
    category: "Employment",
    size: "15.2 MB",
    uploadDate: "2024-01-13",
    status: "Pending",
    aiFlags: 2,
    reviewer: "Emily Rodriguez",
    riskLevel: "Low"
  },
  {
    id: "4",
    name: "Corporate Governance Charter.docx",
    category: "Legal & Compliance",
    size: "850 KB",
    uploadDate: "2024-01-12",
    status: "Reviewed",
    aiFlags: 1,
    reviewer: "David Kim",
    riskLevel: "Low"
  },
  {
    id: "5",
    name: "Customer Contracts Sample.pdf",
    category: "Commercial",
    size: "4.1 MB",
    uploadDate: "2024-01-11",
    status: "In Review",
    aiFlags: 5,
    reviewer: "Sarah Johnson",
    riskLevel: "Medium"
  }
];

const categories = [
  { name: "Financial", count: 8, reviewed: 6 },
  { name: "Legal & Compliance", count: 12, reviewed: 10 },
  { name: "IP & Technology", count: 5, reviewed: 2 },
  { name: "Employment", count: 7, reviewed: 4 },
  { name: "Commercial", count: 9, reviewed: 7 }
];

export function DocumentViewer() {
  const getStatusColor = (status: string) => {
    const colors = {
      "Reviewed": "bg-green-100 text-green-800",
      "In Review": "bg-yellow-100 text-yellow-800",
      "Pending": "bg-gray-100 text-gray-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getRiskColor = (risk: string) => {
    const colors = {
      "High": "text-red-600",
      "Medium": "text-yellow-600",
      "Low": "text-green-600"
    };
    return colors[risk as keyof typeof colors] || "text-gray-600";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Reviewed":
        return <Eye className="h-4 w-4 text-green-600" />;
      case "In Review":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">41</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI-Flagged Items</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Review Progress</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">71%</div>
            <p className="text-xs text-muted-foreground">29/41 reviewed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Categories</CardTitle>
          <CardDescription>
            Review progress by document category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div key={category.name} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{category.name}</h4>
                  <Badge variant="outline">
                    {category.reviewed}/{category.count}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.round((category.reviewed / category.count) * 100)}% complete
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
          <CardDescription>
            All uploaded documents with AI-assisted analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4 flex-1">
                  {getStatusIcon(doc.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-medium">{doc.name}</h4>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span>Category: {doc.category}</span>
                      <span>Size: {doc.size}</span>
                      <span>Uploaded: {doc.uploadDate}</span>
                      <span>Reviewer: {doc.reviewer}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Brain className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{doc.aiFlags} AI flags</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className={`h-4 w-4 ${getRiskColor(doc.riskLevel)}`} />
                        <span className={`text-sm ${getRiskColor(doc.riskLevel)}`}>
                          {doc.riskLevel} risk
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Brain className="h-4 w-4 mr-1" />
                    AI Analysis
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Upload Documents
        </Button>
        <Button variant="outline">
          Connect to VDR
        </Button>
        <Button variant="outline">
          Bulk Analysis
        </Button>
      </div>
    </div>
  );
}
