
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, AlertTriangle, Clock, Globe, FileText, Bell } from "lucide-react";

const mockComplianceData = [
  {
    regulation: "GDPR",
    jurisdiction: "European Union",
    overallScore: 92,
    requirements: [
      { name: "Lawful Basis Documentation", status: "Complete", score: 100 },
      { name: "Data Subject Rights", status: "Complete", score: 95 },
      { name: "Data Protection by Design", status: "In Progress", score: 85 },
      { name: "Breach Notification", status: "Complete", score: 90 }
    ],
    lastReview: "2024-01-10",
    nextReview: "2024-04-10"
  },
  {
    regulation: "CCPA/CPRA",
    jurisdiction: "California, USA",
    overallScore: 88,
    requirements: [
      { name: "Consumer Rights Notice", status: "Complete", score: 95 },
      { name: "Opt-Out Mechanisms", status: "Complete", score: 90 },
      { name: "Third-Party Disclosures", status: "In Progress", score: 80 },
      { name: "Data Minimization", status: "Complete", score: 85 }
    ],
    lastReview: "2024-01-08",
    nextReview: "2024-04-08"
  },
  {
    regulation: "POPIA",
    jurisdiction: "South Africa",
    overallScore: 85,
    requirements: [
      { name: "Information Officer", status: "Complete", score: 100 },
      { name: "Processing Records", status: "In Progress", score: 80 },
      { name: "Data Subject Consent", status: "Complete", score: 90 },
      { name: "Security Safeguards", status: "In Progress", score: 75 }
    ],
    lastReview: "2024-01-05",
    nextReview: "2024-04-05"
  }
];

const mockAlerts = [
  {
    id: "1",
    type: "Law Update",
    title: "GDPR Article 30 Guidelines Updated",
    description: "EDPB released new guidance on ROPA requirements",
    severity: "Medium",
    date: "2024-01-12"
  },
  {
    id: "2",
    type: "Compliance Gap",
    title: "Kenya DPA Implementation Delay",
    description: "3 entities missing data localization requirements",
    severity: "High",
    date: "2024-01-10"
  },
  {
    id: "3",
    type: "Review Due",
    title: "Annual CCPA Compliance Review",
    description: "California compliance review due in 30 days",
    severity: "Medium",
    date: "2024-01-08"
  }
];

export function ComplianceTracker() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Complete":
        return <Badge className="bg-green-100 text-green-800">Complete</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "High":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "Low":
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Regulatory Compliance Tracker</h2>
          <p className="text-muted-foreground">
            Monitor compliance across global data protection regulations
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by jurisdiction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jurisdictions</SelectItem>
              <SelectItem value="eu">European Union</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="africa">Africa</SelectItem>
              <SelectItem value="asia">Asia Pacific</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overall Compliance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <p className="text-xs text-muted-foreground">
              Across all regulations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jurisdictions</CardTitle>
            <Globe className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Active compliance programs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Due</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              In next 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance by Regulation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockComplianceData.map((regulation) => (
          <Card key={regulation.regulation}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{regulation.regulation}</CardTitle>
                <div className="text-2xl font-bold text-primary">{regulation.overallScore}%</div>
              </div>
              <CardDescription>{regulation.jurisdiction}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={regulation.overallScore} className="h-2" />
              
              <div className="space-y-3">
                {regulation.requirements.map((req, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{req.name}</div>
                      <div className="text-xs text-muted-foreground">{req.score}% complete</div>
                    </div>
                    {getStatusBadge(req.status)}
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Review:</span>
                  <span>{regulation.lastReview}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Review:</span>
                  <span>{regulation.nextReview}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts & Updates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Regulatory Alerts & Updates</CardTitle>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Manage Alerts
            </Button>
          </div>
          <CardDescription>Latest regulatory changes and compliance gaps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">{alert.type}</Badge>
                    {getSeverityBadge(alert.severity)}
                  </div>
                  <div className="font-medium">{alert.title}</div>
                  <div className="text-sm text-muted-foreground">{alert.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">{alert.date}</div>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
