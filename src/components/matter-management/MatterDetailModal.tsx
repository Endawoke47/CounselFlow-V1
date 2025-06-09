
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Clock, 
  User, 
  Building, 
  AlertTriangle, 
  MessageSquare, 
  CheckSquare,
  Upload,
  Calendar,
  Target
} from "lucide-react";

interface MatterDetailModalProps {
  matter: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MatterDetailModal({ matter, open, onOpenChange }: MatterDetailModalProps) {
  if (!matter) return null;

  const progressStages = [
    { name: "Logged", completed: true },
    { name: "In Review", completed: true },
    { name: "In Progress", completed: false },
    { name: "Resolved", completed: false },
    { name: "Closed", completed: false }
  ];

  const currentStage = progressStages.findIndex(stage => !stage.completed);
  const progressPercentage = (currentStage / progressStages.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {matter.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Overview Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Matter Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Matter ID</p>
                    <p className="font-medium">{matter.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{matter.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Business Unit</p>
                    <p className="font-medium">{matter.businessUnit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <p className="font-medium">{matter.owner}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className="bg-blue-100 text-blue-800">{matter.status}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Priority</p>
                    <Badge className="bg-red-100 text-red-800">{matter.priority}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Progress Tracker
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progressPercentage} className="w-full" />
                <div className="flex justify-between">
                  {progressStages.map((stage, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                        stage.completed ? 'bg-green-500' : 
                        index === currentStage ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <p className={`text-xs ${stage.completed ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {stage.name}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs for detailed content */}
            <Tabs defaultValue="advice" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="advice">Legal Advice</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="advice" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Legal Advice Log
                      </CardTitle>
                      <Button size="sm">Add Advice Entry</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50/50">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">Contract Terms Review</p>
                          <Badge variant="outline">Final Advice</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Reviewed the vendor agreement terms. Recommend modifications to liability clauses...
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Sarah Chen</span>
                          <span>Jan 20, 2024</span>
                          <span>Contract Review</span>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-orange-500 pl-4 py-3 bg-orange-50/50">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">Risk Assessment</p>
                          <Badge variant="outline">Draft</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Initial risk assessment indicates medium exposure due to...
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Sarah Chen</span>
                          <span>Jan 18, 2024</span>
                          <span>Risk Assessment</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tasks" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <CheckSquare className="h-5 w-5" />
                        Tasks & Milestones
                      </CardTitle>
                      <Button size="sm">Add Task</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="rounded" />
                          <div>
                            <p className="font-medium">Review contract terms</p>
                            <p className="text-sm text-muted-foreground">Due: Jan 25, 2024</p>
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-800">High</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg opacity-50">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" checked className="rounded" />
                          <div>
                            <p className="font-medium line-through">Initial document review</p>
                            <p className="text-sm text-muted-foreground">Completed: Jan 18, 2024</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Complete</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Activity Feed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-sm">Added new legal advice entry for contract terms review</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Sarah Chen • 2 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>DP</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-sm">Matter status updated to "In Progress"</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">David Park • 1 day ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Textarea placeholder="Add a comment..." className="mb-2" />
                      <Button size="sm">Add Comment</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        Document Library
                      </CardTitle>
                      <Button size="sm">Upload Document</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">Vendor Agreement Draft.pdf</p>
                            <p className="text-sm text-muted-foreground">Uploaded Jan 15, 2024 • 2.4 MB</p>
                          </div>
                        </div>
                        <Badge variant="outline">Contract</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">Legal Memo - Risk Assessment.docx</p>
                            <p className="text-sm text-muted-foreground">Uploaded Jan 18, 2024 • 1.1 MB</p>
                          </div>
                        </div>
                        <Badge variant="outline">Memo</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* SLA Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  SLA Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Due Date</span>
                  <span className="font-medium">{matter.dueDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Days Remaining</span>
                  <span className="font-medium text-green-600">3 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-green-100 text-green-800">{matter.slaStatus}</Badge>
                </div>
                <Progress value={75} className="w-full" />
              </CardContent>
            </Card>

            {/* Collaborators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Collaborators
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">Sarah Chen</p>
                    <p className="text-xs text-muted-foreground">Legal Owner</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">David Park</p>
                    <p className="text-xs text-muted-foreground">Supporting Counsel</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Add Collaborator
                </Button>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Level</span>
                  <Badge className="bg-orange-100 text-orange-800">{matter.riskLevel}</Badge>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm">Medium risk due to contract complexity and tight deadline. Monitor closely.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
