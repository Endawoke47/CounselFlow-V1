
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Phone, Mail, Edit, FileText, DollarSign } from "lucide-react";

interface VendorDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vendor: any;
}

export function VendorDetailModal({ open, onOpenChange, vendor }: VendorDetailModalProps) {
  if (!vendor) return null;

  const engagements = [
    { id: 1, matter: "M&A - TechCorp Acquisition", amount: "$45K", status: "Completed", date: "2024-03-15" },
    { id: 2, matter: "IP Dispute - Patent Infringement", amount: "$32K", status: "Active", date: "2024-03-10" },
    { id: 3, matter: "Regulatory Compliance Review", amount: "$18K", status: "Completed", date: "2024-02-28" }
  ];

  const documents = [
    { name: "Master Service Agreement", type: "Contract", date: "2024-01-15" },
    { name: "NDA - Standard", type: "Legal", date: "2024-01-15" },
    { name: "Conflict Check Certificate", type: "Compliance", date: "2024-03-01" },
    { name: "Data Security Assessment", type: "Compliance", date: "2024-02-15" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{vendor.name}</span>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </DialogTitle>
          <DialogDescription>
            Vendor profile and engagement history
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagements">Engagements</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Firm Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Type</label>
                    <p>{vendor.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Jurisdiction</label>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{vendor.jurisdiction}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div>
                      <Badge 
                        variant={
                          vendor.status === "Approved" ? "default" :
                          vendor.status === "Panel" ? "secondary" : "destructive"
                        }
                      >
                        {vendor.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Specializations</label>
                    <div className="flex flex-wrap gap-1">
                      {vendor.specializations.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{vendor.rating}/5.0 Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>{vendor.totalSpend} Total Spend</span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Engagements</label>
                    <p>{vendor.engagements} completed</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Engagement</label>
                    <p>{vendor.lastEngagement}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Primary Contact</label>
                    <p>Sarah Johnson</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span>sarah.johnson@{vendor.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Engagements</CardTitle>
                <CardDescription>Current and completed matters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {engagements.map((engagement) => (
                    <div key={engagement.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{engagement.matter}</div>
                        <div className="text-sm text-muted-foreground">{engagement.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{engagement.amount}</div>
                        <Badge variant={engagement.status === "Active" ? "default" : "secondary"}>
                          {engagement.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents & Compliance</CardTitle>
                <CardDescription>Required documentation and compliance status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">{doc.type}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{doc.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Historical performance and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Responsiveness</span>
                        <span className="font-medium">4.8/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quality of Work</span>
                        <span className="font-medium">4.7/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cost Effectiveness</span>
                        <span className="font-medium">4.5/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Communication</span>
                        <span className="font-medium">4.9/5</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Recent Feedback</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-muted rounded">
                        "Excellent work on the M&A transaction. Very responsive and commercial."
                      </div>
                      <div className="p-2 bg-muted rounded">
                        "Strong technical expertise in IP matters. Would recommend."
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
