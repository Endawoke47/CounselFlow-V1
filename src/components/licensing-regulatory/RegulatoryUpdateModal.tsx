
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, User, MapPin, AlertTriangle, Link } from "lucide-react";

interface RegulatoryUpdateModalProps {
  update: any;
  onOpenChange: (update: any) => void;
}

export function RegulatoryUpdateModal({ update, onOpenChange }: RegulatoryUpdateModalProps) {
  if (!update) return null;

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Regulation":
        return <Badge className="bg-blue-100 text-blue-800">Regulation</Badge>;
      case "Proposed Regulation":
        return <Badge className="bg-orange-100 text-orange-800">Proposed</Badge>;
      case "Case Law":
        return <Badge className="bg-purple-100 text-purple-800">Case Law</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "High":
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };

  return (
    <Dialog open={!!update} onOpenChange={() => onOpenChange(null)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{update.title}</DialogTitle>
            <div className="flex gap-2">
              {getTypeBadge(update.type)}
              {getRiskBadge(update.riskLevel)}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Update Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Jurisdiction</p>
                <p className="font-medium">{update.jurisdiction}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Effective Date</p>
                <p className="font-medium">{update.effectiveDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Reviewer</p>
                <p className="font-medium">{update.assignedReviewer}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Source</p>
                <p className="font-medium">{update.source}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="summary" className="space-y-4">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="impact">Impact Assessment</TabsTrigger>
              <TabsTrigger value="actions">Compliance Actions</TabsTrigger>
              <TabsTrigger value="links">Linked Records</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Update Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Summary</label>
                    <p className="mt-1">{update.summary}</p>
                  </div>
                  
                  {update.type === "Case Law" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Court</label>
                          <p className="mt-1">Supreme Court</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Citation</label>
                          <p className="mt-1">Thompson v. TechCorp, 2024 SC 123</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Holding Summary</label>
                        <p className="mt-1">The court held that corporations have enhanced liability for data breaches involving personal information, establishing new standards for data protection compliance.</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Legal Area</label>
                        <div className="mt-1 flex gap-2">
                          <Badge variant="outline">Data Protection</Badge>
                          <Badge variant="outline">Corporate Liability</Badge>
                          <Badge variant="outline">Privacy</Badge>
                        </div>
                      </div>
                    </>
                  )}

                  {update.type === "Proposed Regulation" && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Forecasted Impact</label>
                      <p className="mt-1">This amendment will require enhanced data processing documentation and may impact our current data handling procedures across UK operations.</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tags</label>
                    <div className="mt-1 flex gap-2">
                      <Badge variant="outline">Data Protection</Badge>
                      <Badge variant="outline">Compliance</Badge>
                      <Badge variant="outline">High Priority</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impact">
              <Card>
                <CardHeader>
                  <CardTitle>Business Impact Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Affected Entities</label>
                      <div className="mt-1 space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span>TechCorp UK Ltd</span>
                          <Badge className="bg-red-100 text-red-800">High Impact</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span>TechCorp Services UK</span>
                          <Badge className="bg-yellow-100 text-yellow-800">Medium Impact</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Business Functions</label>
                      <div className="mt-1 space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span>Data Processing</span>
                          <Badge className="bg-red-100 text-red-800">Critical</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span>Customer Services</span>
                          <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Risk Assessment</label>
                    <div className="mt-1 p-4 border rounded-md bg-red-50">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-800">High Risk - Immediate Action Required</p>
                          <p className="text-sm text-red-700 mt-1">
                            Non-compliance could result in significant regulatory penalties and reputational damage. 
                            Existing data processing agreements may need immediate review and updates.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Review and update data processing agreements</p>
                        <p className="text-sm text-muted-foreground">Due: 2024-07-15 • Assigned: Legal Team</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Conduct privacy impact assessment</p>
                        <p className="text-sm text-muted-foreground">Due: 2024-07-30 • Assigned: Compliance Team</p>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Update privacy policies and notices</p>
                        <p className="text-sm text-muted-foreground">Due: 2024-08-15 • Assigned: Legal Team</p>
                      </div>
                      <Badge variant="outline">Not Started</Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Compliance Action
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="links">
              <Card>
                <CardHeader>
                  <CardTitle>Linked Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Related Licenses</label>
                      <div className="mt-1 space-y-2">
                        <div className="flex items-center gap-3 p-2 border rounded">
                          <Link className="h-4 w-4" />
                          <span>Data Protection Registration - UK</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Related Contracts</label>
                      <div className="mt-1 space-y-2">
                        <div className="flex items-center gap-3 p-2 border rounded">
                          <Link className="h-4 w-4" />
                          <span>Master Services Agreement - Customer Data</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 border rounded">
                          <Link className="h-4 w-4" />
                          <span>Data Processing Agreement Template</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Related Policies</label>
                      <div className="mt-1 space-y-2">
                        <div className="flex items-center gap-3 p-2 border rounded">
                          <Link className="h-4 w-4" />
                          <span>Privacy Policy v2.1</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 border rounded">
                          <Link className="h-4 w-4" />
                          <span>Data Retention Policy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
