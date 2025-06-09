
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, User, Building, MapPin, Clock, Upload } from "lucide-react";

interface LicenseDetailModalProps {
  license: any;
  onOpenChange: (license: any) => void;
}

export function LicenseDetailModal({ license, onOpenChange }: LicenseDetailModalProps) {
  if (!license) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "Expiring":
        return <Badge className="bg-orange-100 text-orange-800">Expiring</Badge>;
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRenewalProgress = (status: string) => {
    switch (status) {
      case "Not Started": return 0;
      case "In Progress": return 50;
      case "Submitted": return 75;
      case "Completed": return 100;
      case "Overdue": return 0;
      default: return 0;
    }
  };

  return (
    <Dialog open={!!license} onOpenChange={() => onOpenChange(null)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{license.title}</DialogTitle>
            {getStatusBadge(license.status)}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* License Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Entity</p>
                <p className="font-medium">{license.entity}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Jurisdiction</p>
                <p className="font-medium">{license.jurisdiction}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Expiry Date</p>
                <p className="font-medium">{license.expiryDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Owner</p>
                <p className="font-medium">{license.owner}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="renewal">Renewal</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>License Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">License Type</label>
                      <p className="mt-1">{license.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Regulator</label>
                      <p className="mt-1">{license.regulator}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">License ID</label>
                      <p className="mt-1">FS-2024-001</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Issued Date</label>
                      <p className="mt-1">2021-12-15</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Notes</label>
                    <p className="mt-1 text-sm">This license allows us to provide financial advisory services in the UK market. Annual compliance reporting required.</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tags</label>
                    <div className="mt-1 flex gap-2">
                      <Badge variant="outline">Financial</Badge>
                      <Badge variant="outline">UK</Badge>
                      <Badge variant="outline">Critical</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="renewal">
              <Card>
                <CardHeader>
                  <CardTitle>Renewal Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Renewal Progress</span>
                      <span className="text-sm text-muted-foreground">{license.renewalStatus}</span>
                    </div>
                    <Progress value={getRenewalProgress(license.renewalStatus)} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Renewal Due</label>
                      <p className="mt-1 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        90 days before expiry
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Renewal Type</label>
                      <p className="mt-1">Annual</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Renewal Tasks</label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Prepare renewal documentation</p>
                          <p className="text-sm text-muted-foreground">Due: 2024-09-15</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Submit renewal application</p>
                          <p className="text-sm text-muted-foreground">Due: 2024-10-15</p>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Renewal Documents
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>License Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Original License Certificate</p>
                          <p className="text-sm text-muted-foreground">Uploaded: 2021-12-15</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Annual Compliance Report 2023</p>
                          <p className="text-sm text-muted-foreground">Uploaded: 2024-01-15</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Audit History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-l-2 border-blue-500 pl-4 pb-4">
                      <p className="font-medium">License created</p>
                      <p className="text-sm text-muted-foreground">2021-12-15 by Sarah Johnson</p>
                    </div>
                    <div className="border-l-2 border-green-500 pl-4 pb-4">
                      <p className="font-medium">Renewal task assigned</p>
                      <p className="text-sm text-muted-foreground">2024-06-15 by Michael Chen</p>
                    </div>
                    <div className="border-l-2 border-orange-500 pl-4 pb-4">
                      <p className="font-medium">Status updated to Expiring</p>
                      <p className="text-sm text-muted-foreground">2024-06-20 by System</p>
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
