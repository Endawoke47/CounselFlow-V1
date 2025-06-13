
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, TrendingDown, FileText, MessageSquare } from "lucide-react";

const mockRisks = [
  {
    id: "1",
    category: "IP & Technology",
    title: "Patent Expiration Risk",
    description: "Key patent expires in 18 months with no renewal strategy",
    severity: "High",
    probability: "Medium",
    impact: "Revenue loss of $5-10M annually",
    mitigation: "Negotiate extended licensing agreement",
    status: "Under Review",
    assignee: "Sarah Johnson",
    comments: 3
  },
  {
    id: "2",
    category: "Legal & Compliance",
    title: "Regulatory Compliance Gap",
    description: "Missing GDPR compliance documentation for EU operations",
    severity: "Medium",
    probability: "High",
    impact: "Potential fines up to €2M",
    mitigation: "Implement compliance program pre-closing",
    status: "Acknowledged",
    assignee: "Michael Chen",
    comments: 1
  },
  {
    id: "3",
    category: "Employment",
    title: "Key Person Dependency",
    description: "75% of revenue tied to relationships of departing CEO",
    severity: "High",
    probability: "Medium",
    impact: "Customer retention risk",
    mitigation: "Negotiate retention package and transition plan",
    status: "Resolved",
    assignee: "Emily Rodriguez",
    comments: 5
  },
  {
    id: "4",
    category: "Financial",
    title: "Working Capital Variance",
    description: "Significant seasonal working capital requirements",
    severity: "Low",
    probability: "High",
    impact: "Additional $3M financing needs",
    mitigation: "Adjust purchase price for working capital",
    status: "Under Review",
    assignee: "David Kim",
    comments: 2
  }
];

const riskMetrics = [
  { category: "High Risk", count: 3, color: "text-red-600" },
  { category: "Medium Risk", count: 5, color: "text-yellow-600" },
  { category: "Low Risk", count: 2, color: "text-green-600" },
  { category: "Resolved", count: 4, color: "text-gray-600" }
];

export function RiskConsolidation() {
  const getSeverityColor = (severity: string) => {
    const colors = {
      "High": "bg-red-100 text-red-800",
      "Medium": "bg-yellow-100 text-yellow-800",
      "Low": "bg-green-100 text-green-800"
    };
    return colors[severity as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Under Review": "bg-blue-100 text-blue-800",
      "Acknowledged": "bg-yellow-100 text-yellow-800",
      "Resolved": "bg-green-100 text-green-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {riskMetrics.map((metric) => (
          <Card key={metric.category}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.category}</CardTitle>
              <AlertTriangle className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${metric.color}`}>{metric.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Risk Score Summary
            </CardTitle>
            <CardDescription>
              Overall risk assessment for this deal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Overall Risk Score</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Medium (6.2/10)
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Legal & Compliance</span>
                  <span className="text-yellow-600">5.5/10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Financial</span>
                  <span className="text-green-600">3.2/10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>IP & Technology</span>
                  <span className="text-red-600">8.1/10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Employment</span>
                  <span className="text-yellow-600">6.8/10</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Risk Mitigation Progress
            </CardTitle>
            <CardDescription>
              Status of identified risk mitigation actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Mitigation Actions</span>
                <span className="text-sm text-muted-foreground">8/14 complete</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completed</span>
                  <span className="text-green-600">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>In Progress</span>
                  <span className="text-yellow-600">4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Not Started</span>
                  <span className="text-gray-600">2</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Register</CardTitle>
          <CardDescription>
            Detailed view of all identified risks and mitigation strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRisks.map((risk) => (
              <div key={risk.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">{risk.title}</h4>
                      <Badge className={getSeverityColor(risk.severity)}>
                        {risk.severity} Risk
                      </Badge>
                      <Badge className={getStatusColor(risk.status)}>
                        {risk.status}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Category:</span> {risk.category}
                    </div>
                    
                    <div className="text-sm">
                      {risk.description}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Impact:</span> {risk.impact}
                      </div>
                      <div>
                        <span className="font-medium">Probability:</span> {risk.probability}
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium">Mitigation:</span> {risk.mitigation}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Assignee: {risk.assignee}</span>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {risk.comments} comments
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Comment
                    </Button>
                    <Button variant="outline" size="sm">
                      Update Status
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generate Risk Report
        </Button>
        <Button variant="outline">
          Export to PDF
        </Button>
      </div>
    </div>
  );
}
