
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Download, FileText, GitBranch, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TemplateDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: any;
}

export function TemplateDetailModal({ open, onOpenChange, template }: TemplateDetailModalProps) {
  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{template.title}</DialogTitle>
              <DialogDescription className="mt-2">
                {template.type} • {template.version} • {template.jurisdiction}
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button>
                Generate Contract
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Template Content</TabsTrigger>
            <TabsTrigger value="clauses">Clauses</TabsTrigger>
            <TabsTrigger value="usage">Usage & Analytics</TabsTrigger>
            <TabsTrigger value="versions">Version History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Template Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Type:</span> {template.type}
                    </div>
                    <div>
                      <span className="font-medium">Version:</span> {template.version}
                    </div>
                    <div>
                      <span className="font-medium">Jurisdiction:</span> {template.jurisdiction}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <Badge className="ml-2" variant="outline">{template.status}</Badge>
                    </div>
                    <div>
                      <span className="font-medium">Last Updated:</span> {template.lastUpdated}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Clauses: {template.clauses}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <span>Linked Contracts: {template.linkedContracts}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4" />
                      <span>Total Versions: 3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  This is a comprehensive {template.type} template designed for use in {template.jurisdiction}.
                  The template includes standard clauses and provisions commonly used in {template.type.toLowerCase()}s
                  and has been reviewed for legal compliance and commercial best practices.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Template Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-sm p-4 bg-muted rounded-md max-h-96 overflow-y-auto">
                  <h3>{template.title}</h3>
                  <p>
                    This agreement is entered into on [DATE] between [PARTY A] and [PARTY B]
                    for the purpose of [PURPOSE].
                  </p>
                  <h4>1. Definitions</h4>
                  <p>
                    For the purposes of this agreement, the following terms shall have the meanings
                    set forth below...
                  </p>
                  <h4>2. Scope of Work</h4>
                  <p>
                    The scope of work includes but is not limited to [SCOPE DETAILS]...
                  </p>
                  <h4>3. Terms and Conditions</h4>
                  <p>
                    The parties agree to the following terms and conditions...
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clauses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Required Clauses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Data Protection Clause - Standard</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Limitation of Liability</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Termination Rights</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Optional Clauses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Force Majeure</span>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Intellectual Property Assignment</span>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Usage Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>Contracts Generated: {template.linkedContracts}</div>
                    <div>Most Recent Use: 2024-01-20</div>
                    <div>Average Monthly Usage: 8</div>
                    <div>Success Rate: 95%</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Top Clause Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Data Protection</span>
                      <span>100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Liability</span>
                      <span>95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Termination</span>
                      <span>88%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-2">
                  <p><strong>Common Deviations:</strong> 12% of contracts remove the Force Majeure clause</p>
                  <p><strong>Risk Commentary:</strong> Template maintains low-risk profile with standard market terms</p>
                  <p><strong>Compliance Status:</strong> Fully compliant with current {template.jurisdiction} regulations</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="versions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Version History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium text-sm">{template.version} (Current)</div>
                      <div className="text-xs text-muted-foreground">Updated data protection clauses</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{template.lastUpdated}</div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium text-sm">v2.0</div>
                      <div className="text-xs text-muted-foreground">Added termination clauses</div>
                    </div>
                    <div className="text-xs text-muted-foreground">2023-12-15</div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium text-sm">v1.0</div>
                      <div className="text-xs text-muted-foreground">Initial template creation</div>
                    </div>
                    <div className="text-xs text-muted-foreground">2023-11-01</div>
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
