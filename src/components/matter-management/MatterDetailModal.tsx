
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Clock, 
  User, 
  Building, 
  Calendar, 
  AlertTriangle, 
  MessageSquare,
  Paperclip,
  Edit,
  Save,
  X
} from "lucide-react";
import { useState } from "react";

interface MatterDetailModalProps {
  matter: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MatterDetailModal({ matter, open, onOpenChange }: MatterDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState("");

  if (!matter) return null;

  const getStatusColor = (status: string) => {
    const colors = {
      "In Progress": "bg-blue-100 text-blue-800",
      "Pending Review": "bg-yellow-100 text-yellow-800",
      "Complete": "bg-green-100 text-green-800",
      "On Hold": "bg-gray-100 text-gray-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      "High": "bg-red-100 text-red-800",
      "Medium": "bg-orange-100 text-orange-800",
      "Low": "bg-green-100 text-green-800"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const mockComments = [
    {
      id: 1,
      author: "Sarah Chen",
      content: "Initial review completed. Contract terms look standard.",
      timestamp: "2024-01-16 10:30 AM",
      type: "comment"
    },
    {
      id: 2,
      author: "System",
      content: "Matter assigned to Sarah Chen",
      timestamp: "2024-01-15 2:15 PM",
      type: "system"
    }
  ];

  const mockDocuments = [
    { name: "Vendor Agreement Draft.pdf", size: "2.1 MB", uploadedBy: "John Doe", date: "2024-01-15" },
    { name: "Legal Review Notes.docx", size: "0.8 MB", uploadedBy: "Sarah Chen", date: "2024-01-16" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {matter.title}
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                {isEditing ? "Save" : "Edit"}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Matter Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Matter ID</Label>
                      <p className="text-sm text-muted-foreground">{matter.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Type</Label>
                      <p className="text-sm text-muted-foreground">{matter.type}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <div className="mt-1">
                      {isEditing ? (
                        <Select defaultValue={matter.status}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Pending Review">Pending Review</SelectItem>
                            <SelectItem value="Complete">Complete</SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge className={getStatusColor(matter.status)}>
                          {matter.status}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Priority</Label>
                    <div className="mt-1">
                      {isEditing ? (
                        <Select defaultValue={matter.priority}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge className={getPriorityColor(matter.priority)}>
                          {matter.priority}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Business Unit</Label>
                      <p className="text-sm text-muted-foreground">{matter.businessUnit}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Owner</Label>
                      <p className="text-sm text-muted-foreground">{matter.owner}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline & Dates */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Created Date</Label>
                      <p className="text-sm text-muted-foreground">{matter.createdDate}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Due Date</Label>
                      <p className="text-sm text-muted-foreground">{matter.dueDate}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">SLA Status</Label>
                    <div className="flex items-center gap-2 mt-1">
                      {matter.slaStatus === "At Risk" ? (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-green-500" />
                      )}
                      <span className="text-sm">{matter.slaStatus}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Risk Level</Label>
                    <p className="text-sm text-muted-foreground">{matter.riskLevel}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea 
                    placeholder="Enter matter description..."
                    defaultValue="Review and analysis of vendor agreement for procurement department. Includes terms negotiation and risk assessment."
                    rows={4}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Review and analysis of vendor agreement for procurement department. Includes terms negotiation and risk assessment.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Documents</CardTitle>
                  <Button size="sm">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.size} • Uploaded by {doc.uploadedBy} on {doc.date}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Comments & Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Comment */}
                <div className="space-y-2">
                  <Label>Add Comment</Label>
                  <Textarea 
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <Button size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Post Comment
                  </Button>
                </div>

                {/* Comments List */}
                <div className="space-y-3">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="border-l-2 border-muted pl-4 py-2">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4" />
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        {comment.type === "system" && (
                          <Badge variant="outline" className="text-xs">System</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Matter Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Matter Created</p>
                      <p className="text-sm text-muted-foreground">January 15, 2024 at 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Assigned to Sarah Chen</p>
                      <p className="text-sm text-muted-foreground">January 15, 2024 at 2:15 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Initial Review Completed</p>
                      <p className="text-sm text-muted-foreground">January 16, 2024 at 10:30 AM</p>
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
