
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Upload, User, Building, AlertTriangle } from "lucide-react";

interface NewMatterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewMatterModal({ open, onOpenChange }: NewMatterModalProps) {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Create New Matter
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="legal">Legal Details</TabsTrigger>
            <TabsTrigger value="assignment">Assignment</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Matter Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Matter Title *</Label>
                    <Input id="title" placeholder="Enter matter title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Matter Type *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contract">Contract Review</SelectItem>
                        <SelectItem value="advice">Legal Advice</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="litigation">Litigation</SelectItem>
                        <SelectItem value="regulatory">Regulatory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the matter..." rows={3} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessUnit">Business Unit *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="it">Information Technology</SelectItem>
                        <SelectItem value="procurement">Procurement</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="riskLevel">Risk Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="requester">Requester</Label>
                    <Input id="requester" placeholder="Enter requester name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="na">North America</SelectItem>
                        <SelectItem value="eu">Europe</SelectItem>
                        <SelectItem value="apac">Asia Pacific</SelectItem>
                        <SelectItem value="latam">Latin America</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legal Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jurisdiction">Jurisdiction</Label>
                    <Input id="jurisdiction" placeholder="Enter jurisdiction" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entity">Entity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select entity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parent">Parent Company</SelectItem>
                        <SelectItem value="subsidiary1">Subsidiary 1</SelectItem>
                        <SelectItem value="subsidiary2">Subsidiary 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="slaDeadline">SLA Deadline</Label>
                    <Input id="slaDeadline" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="visibility">Visibility</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">Internal Only</SelectItem>
                        <SelectItem value="shared">Shared with BU</SelectItem>
                        <SelectItem value="exec">Executive Visible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedRecords">Linked Records</Label>
                  <Input id="linkedRecords" placeholder="Link contracts, disputes, etc." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="Enter tags separated by commas" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assignment & Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="legalOwner">Legal Owner</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah">Sarah Chen</SelectItem>
                        <SelectItem value="david">David Park</SelectItem>
                        <SelectItem value="emily">Emily Rodriguez</SelectItem>
                        <SelectItem value="auto">Auto-assign</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reviewer">Reviewer/Approver</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reviewer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gc">General Counsel</SelectItem>
                        <SelectItem value="associate">Associate GC</SelectItem>
                        <SelectItem value="senior">Senior Counsel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportingCounsel">Supporting Counsel</Label>
                  <Input id="supportingCounsel" placeholder="Add supporting team members" />
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Smart Assignment Suggestions
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sarah Chen (Contract Specialist)</span>
                      <Badge variant="outline">75% Capacity</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">David Park (Employment Law)</span>
                      <Badge variant="outline">60% Capacity</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attachments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documents & Attachments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                  <Button variant="outline">Choose Files</Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Initial Notes</Label>
                  <Textarea id="notes" placeholder="Add any initial notes or context..." rows={3} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Create Matter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
