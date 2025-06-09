
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, AlertCircle, Clock, FileText, Shield, Users } from "lucide-react";

export function ComplianceOnboarding() {
  const complianceItems = [
    {
      vendor: "Davis Polk & Wardwell",
      nda: { status: "Complete", date: "2024-01-15", expires: "2025-01-15" },
      conflictCheck: { status: "Complete", date: "2024-03-01", expires: "2024-09-01" },
      dataSecurity: { status: "Complete", date: "2024-02-15", expires: "2025-02-15" },
      diversityInfo: { status: "Complete", date: "2024-01-20", expires: "N/A" },
      complianceScore: 100
    },
    {
      vendor: "Clifford Chance",
      nda: { status: "Complete", date: "2024-01-10", expires: "2025-01-10" },
      conflictCheck: { status: "Expired", date: "2023-12-01", expires: "2024-06-01" },
      dataSecurity: { status: "Complete", date: "2024-02-20", expires: "2025-02-20" },
      diversityInfo: { status: "Pending", date: "", expires: "" },
      complianceScore: 65
    },
    {
      vendor: "Baker McKenzie",
      nda: { status: "Complete", date: "2024-02-01", expires: "2025-02-01" },
      conflictCheck: { status: "Complete", date: "2024-03-05", expires: "2024-09-05" },
      dataSecurity: { status: "Pending", date: "", expires: "" },
      diversityInfo: { status: "Complete", date: "2024-02-10", expires: "N/A" },
      complianceScore: 75
    },
    {
      vendor: "Local Boutique Firm",
      nda: { status: "Pending", date: "", expires: "" },
      conflictCheck: { status: "Pending", date: "", expires: "" },
      dataSecurity: { status: "Pending", date: "", expires: "" },
      diversityInfo: { status: "Pending", date: "", expires: "" },
      complianceScore: 0
    }
  ];

  const requiredDocuments = [
    {
      name: "Non-Disclosure Agreement",
      description: "Standard NDA covering confidentiality and data protection",
      frequency: "Annual",
      mandatory: true
    },
    {
      name: "Conflict Check Certificate",
      description: "Confirmation of no conflicts of interest",
      frequency: "Per engagement",
      mandatory: true
    },
    {
      name: "Data Security Assessment",
      description: "Security standards and data handling procedures",
      frequency: "Annual",
      mandatory: true
    },
    {
      name: "Diversity & Inclusion Information",
      description: "Firm diversity metrics and inclusion initiatives",
      frequency: "Annual",
      mandatory: false
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "expired":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "complete":
        return <Badge variant="default">Complete</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Compliance & Onboarding</h2>
          <p className="text-muted-foreground">Manage vendor compliance requirements and documentation</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Required Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Required Documentation
          </CardTitle>
          <CardDescription>Standard compliance requirements for all vendors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{doc.name}</h4>
                  {doc.mandatory && <Badge variant="outline" className="text-xs">Required</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                <div className="text-xs text-muted-foreground">
                  Frequency: {doc.frequency}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Vendor Compliance Status
          </CardTitle>
          <CardDescription>Current compliance status for all active vendors</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>NDA</TableHead>
                <TableHead>Conflict Check</TableHead>
                <TableHead>Data Security</TableHead>
                <TableHead>Diversity Info</TableHead>
                <TableHead>Compliance Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.vendor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.nda.status)}
                      {getStatusBadge(item.nda.status)}
                    </div>
                    {item.nda.expires && item.nda.expires !== "N/A" && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Expires: {item.nda.expires}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.conflictCheck.status)}
                      {getStatusBadge(item.conflictCheck.status)}
                    </div>
                    {item.conflictCheck.expires && item.conflictCheck.expires !== "N/A" && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Expires: {item.conflictCheck.expires}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.dataSecurity.status)}
                      {getStatusBadge(item.dataSecurity.status)}
                    </div>
                    {item.dataSecurity.expires && item.dataSecurity.expires !== "N/A" && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Expires: {item.dataSecurity.expires}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.diversityInfo.status)}
                      {getStatusBadge(item.diversityInfo.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress value={item.complianceScore} className="h-2" />
                      <div className="text-sm font-medium">{item.complianceScore}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                      {item.complianceScore < 100 && (
                        <Button size="sm">
                          Request Docs
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Risk Flags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            Compliance Risk Flags
          </CardTitle>
          <CardDescription>Items requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <div>
                  <div className="font-medium">Clifford Chance - Conflict Check Expired</div>
                  <div className="text-sm text-muted-foreground">Expired on 2024-06-01, renewal required</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Request Renewal
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-yellow-200 rounded-lg bg-yellow-50">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-yellow-600" />
                <div>
                  <div className="font-medium">Local Boutique Firm - Missing All Documentation</div>
                  <div className="text-sm text-muted-foreground">No compliance documents on file</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Send Onboarding
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-yellow-200 rounded-lg bg-yellow-50">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-yellow-600" />
                <div>
                  <div className="font-medium">Baker McKenzie - Data Security Assessment Pending</div>
                  <div className="text-sm text-muted-foreground">Document requested 2 weeks ago</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Follow Up
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
