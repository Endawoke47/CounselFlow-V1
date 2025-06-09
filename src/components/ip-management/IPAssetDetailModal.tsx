
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit, ExternalLink, FileText, AlertTriangle, DollarSign } from "lucide-react";

interface IPAssetDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: any;
}

export function IPAssetDetailModal({ open, onOpenChange, asset }: IPAssetDetailModalProps) {
  if (!asset) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{asset.title}</DialogTitle>
              <DialogDescription className="mt-2">
                {asset.type} • {asset.jurisdiction} • {asset.registrationNo}
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                View Registry
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Asset Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Type:</span>
                  <Badge variant="outline">{asset.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Owner:</span>
                  <span className="text-sm">{asset.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Jurisdiction:</span>
                  <span className="text-sm">{asset.jurisdiction}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge className="bg-green-100 text-green-800">{asset.status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Classes:</span>
                  <span className="text-sm">{asset.classes}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Important Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Filing Date:</span>
                  <span className="text-sm">{asset.filingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Registration:</span>
                  <span className="text-sm">{asset.registrationNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Next Renewal:</span>
                  <span className="text-sm font-medium text-orange-600">{asset.renewalDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Days Until Renewal:</span>
                  <Badge variant="outline" className="text-orange-600">127 days</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lifecycle Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lifecycle Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Application Filed</div>
                    <div className="text-sm text-muted-foreground">{asset.filingDate}</div>
                  </div>
                </div>
                <div className="ml-1 w-0.5 h-6 bg-gray-200"></div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Registration Granted</div>
                    <div className="text-sm text-muted-foreground">2024-03-20</div>
                  </div>
                </div>
                <div className="ml-1 w-0.5 h-6 bg-gray-200"></div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Next Renewal Due</div>
                    <div className="text-sm text-muted-foreground">{asset.renewalDate}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Linked Records */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Linked Contracts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{asset.linkedContracts}</div>
                <div className="text-sm text-muted-foreground">Active contracts</div>
                {asset.linkedContracts > 0 && (
                  <Button variant="link" className="p-0 h-auto text-sm mt-2">
                    View all contracts
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Disputes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{asset.linkedDisputes}</div>
                <div className="text-sm text-muted-foreground">Active disputes</div>
                {asset.linkedDisputes > 0 && (
                  <Button variant="link" className="p-0 h-auto text-sm mt-2">
                    View disputes
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Licensing Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$125K</div>
                <div className="text-sm text-muted-foreground">Annual revenue</div>
                <Button variant="link" className="p-0 h-auto text-sm mt-2">
                  View licensing details
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This trademark protects the company's primary brand identity including logo, 
                wordmark, and associated design elements. It provides exclusive rights to use 
                the mark in connection with the specified goods and services in Class 9 
                (computer software) and Class 42 (technology services).
              </p>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Renewal Risk:</span>
                  <Badge className="bg-green-100 text-green-800">Low</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Infringement Risk:</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Commercial Value:</span>
                  <Badge className="bg-blue-100 text-blue-800">High</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
