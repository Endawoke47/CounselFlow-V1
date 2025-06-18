import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Send, 
  Download, 
  Eye, 
  Edit,
  Loader2,
  CheckCircle,
  Clock,
  AlertCircle,
  PenTool,
  Package,
  Users,
  Mail
} from "lucide-react";
import { BoardPack, BoardPackDocument, BoardMeeting } from "@/types/company-secretarial";
import { companySecretarialService } from "@/services/companySecretarialService";

export function BoardPackManager() {
  const [boardPacks, setBoardPacks] = useState<BoardPack[]>([]);
  const [meetings, setMeetings] = useState<BoardMeeting[]>([]);
  const [selectedPack, setSelectedPack] = useState<BoardPack | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [createPackForm, setCreatePackForm] = useState({
    meetingId: "",
    title: "",
    files: [] as File[]
  });

  useEffect(() => {
    loadBoardPacks();
    loadMeetings();
  }, []);

  const loadBoardPacks = async () => {
    // Mock data for board packs
    const mockPacks: BoardPack[] = [
      {
        id: 'pack-1',
        meetingId: 'meeting-1',
        title: 'Q4 2024 Board Meeting Pack',
        documents: [
          {
            id: 'doc-1',
            title: 'Board Meeting Agenda',
            fileName: 'agenda_q4_2024.pdf',
            fileUrl: '/board-packs/agenda_q4_2024.pdf',
            order: 1,
            requiresSignature: false,
            signatureStatus: 'not_required'
          },
          {
            id: 'doc-2',
            title: 'Financial Report Q4',
            fileName: 'financial_report_q4.pdf',
            fileUrl: '/board-packs/financial_report_q4.pdf',
            order: 2,
            requiresSignature: false,
            signatureStatus: 'not_required'
          },
          {
            id: 'doc-3',
            title: 'Board Resolution - Budget Approval',
            fileName: 'resolution_budget_2025.pdf',
            fileUrl: '/board-packs/resolution_budget_2025.pdf',
            order: 3,
            requiresSignature: true,
            signatureStatus: 'pending'
          }
        ],
        createdDate: new Date('2024-12-01'),
        sentDate: new Date('2024-12-08'),
        status: 'sent',
        eSignatureWorkflowId: 'workflow-123'
      },
      {
        id: 'pack-2',
        meetingId: 'meeting-2',
        title: 'AGM 2024 Board Pack',
        documents: [
          {
            id: 'doc-4',
            title: 'AGM Notice',
            fileName: 'agm_notice_2024.pdf',
            fileUrl: '/board-packs/agm_notice_2024.pdf',
            order: 1,
            requiresSignature: false,
            signatureStatus: 'not_required'
          },
          {
            id: 'doc-5',
            title: 'Annual Accounts',
            fileName: 'annual_accounts_2024.pdf',
            fileUrl: '/board-packs/annual_accounts_2024.pdf',
            order: 2,
            requiresSignature: true,
            signatureStatus: 'pending'
          }
        ],
        createdDate: new Date('2024-11-15'),
        status: 'draft'
      }
    ];
    setBoardPacks(mockPacks);
  };

  const loadMeetings = async () => {
    try {
      const meetingData = await companySecretarialService.getMeetings();
      setMeetings(meetingData);
    } catch (error) {
      console.error("Failed to load meetings:", error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setCreatePackForm(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setCreatePackForm(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleCreateBoardPack = async () => {
    if (!createPackForm.meetingId || createPackForm.files.length === 0) return;

    setIsCreating(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 15;
        });
      }, 300);

      const boardPack = await companySecretarialService.createBoardPack(
        createPackForm.meetingId,
        createPackForm.files
      );

      setUploadProgress(100);
      setBoardPacks(prev => [...prev, boardPack]);
      setCreatePackForm({ meetingId: "", title: "", files: [] });

    } catch (error) {
      console.error("Board pack creation failed:", error);
    } finally {
      setIsCreating(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const handleSendForSignature = async (packId: string) => {
    setIsSending(true);

    try {
      const result = await companySecretarialService.sendBoardPackForSignature(packId);
      
      setBoardPacks(prev => 
        prev.map(pack => 
          pack.id === packId 
            ? { 
                ...pack, 
                status: 'sent', 
                sentDate: new Date(),
                eSignatureWorkflowId: result.workflowId 
              }
            : pack
        )
      );

    } catch (error) {
      console.error("Failed to send board pack:", error);
    } finally {
      setIsSending(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'secondary';
      case 'sent':
        return 'default';
      case 'completed':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getSignatureStatusIcon = (status: string) => {
    switch (status) {
      case 'signed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'not_required':
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getMeetingTitle = (meetingId: string) => {
    const meeting = meetings.find(m => m.id === meetingId);
    return meeting ? meeting.title : 'Unknown Meeting';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Board Pack Manager</h2>
          <p className="text-muted-foreground">
            Create and manage board packs with e-signature workflows
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Package className="h-4 w-4 mr-2" />
              Create Board Pack
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Board Pack</DialogTitle>
              <DialogDescription>
                Upload documents and create a board pack for meeting distribution
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meeting">Meeting</Label>
                <select
                  id="meeting"
                  value={createPackForm.meetingId}
                  onChange={(e) => setCreatePackForm({ ...createPackForm, meetingId: e.target.value })}
                  className="w-full p-2 border border-input rounded-md"
                >
                  <option value="">Select a meeting</option>
                  {meetings.map(meeting => (
                    <option key={meeting.id} value={meeting.id}>
                      {meeting.title} - {meeting.scheduledDate.toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Board Pack Title</Label>
                <Input
                  id="title"
                  value={createPackForm.title}
                  onChange={(e) => setCreatePackForm({ ...createPackForm, title: e.target.value })}
                  placeholder="e.g., Q4 2024 Board Meeting Pack"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="files">Documents</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                  onChange={handleFileUpload}
                />
                {createPackForm.files.length > 0 && (
                  <div className="space-y-2 mt-2">
                    <Label className="text-sm">Selected Files:</Label>
                    {createPackForm.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">{file.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {(file.size / 1024 / 1024).toFixed(1)} MB
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isCreating && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Creating board pack...</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              <Button 
                onClick={handleCreateBoardPack}
                disabled={!createPackForm.meetingId || createPackForm.files.length === 0 || isCreating}
                className="w-full"
              >
                {isCreating ? "Creating..." : "Create Board Pack"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Board Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boardPacks.map((pack) => (
          <Card key={pack.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{pack.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {getMeetingTitle(pack.meetingId)}
                  </CardDescription>
                </div>
                <Badge variant={getStatusColor(pack.status)}>
                  {pack.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Documents:</span>
                    <span>{pack.documents.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Created:</span>
                    <span>{pack.createdDate.toLocaleDateString()}</span>
                  </div>
                  {pack.sentDate && (
                    <div className="flex items-center justify-between">
                      <span>Sent:</span>
                      <span>{pack.sentDate.toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Signature Status:</div>
                  <div className="space-y-1">
                    {pack.documents.filter(doc => doc.requiresSignature).map(doc => (
                      <div key={doc.id} className="flex items-center justify-between text-xs">
                        <span className="truncate">{doc.title}</span>
                        <div className="flex items-center gap-1">
                          {getSignatureStatusIcon(doc.signatureStatus)}
                          <span>{doc.signatureStatus}</span>
                        </div>
                      </div>
                    ))}
                    {pack.documents.filter(doc => doc.requiresSignature).length === 0 && (
                      <div className="text-xs text-muted-foreground">No signatures required</div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setSelectedPack(pack)}
                    className="flex-1"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  {pack.status === 'draft' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleSendForSignature(pack.id)}
                      disabled={isSending}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Send
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Board Pack Detail Modal */}
      {selectedPack && (
        <Dialog open={!!selectedPack} onOpenChange={() => setSelectedPack(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {selectedPack.title}
              </DialogTitle>
              <DialogDescription>
                {getMeetingTitle(selectedPack.meetingId)} • {selectedPack.documents.length} documents
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="documents" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="signatures">Signatures</TabsTrigger>
                <TabsTrigger value="workflow">Workflow</TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="space-y-4">
                <div className="space-y-3">
                  {selectedPack.documents.map((document) => (
                    <Card key={document.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                              <h4 className="font-medium">{document.title}</h4>
                              <p className="text-sm text-muted-foreground">{document.fileName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {document.requiresSignature && (
                              <Badge variant={document.signatureStatus === 'signed' ? 'default' : 'secondary'}>
                                <PenTool className="h-3 w-3 mr-1" />
                                {document.signatureStatus}
                              </Badge>
                            )}
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="signatures" className="space-y-4">
                <div className="space-y-4">
                  {selectedPack.documents.filter(doc => doc.requiresSignature).length > 0 ? (
                    selectedPack.documents.filter(doc => doc.requiresSignature).map(document => (
                      <Card key={document.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">{document.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getSignatureStatusIcon(document.signatureStatus)}
                              <span className="text-sm font-medium">
                                {document.signatureStatus === 'signed' ? 'Signed' : 
                                 document.signatureStatus === 'pending' ? 'Awaiting Signature' : 
                                 'Not Required'}
                              </span>
                            </div>
                            {document.signatureStatus === 'pending' && (
                              <Button size="sm" variant="outline">
                                <Mail className="h-4 w-4 mr-2" />
                                Send Reminder
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <PenTool className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No documents require signatures</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="workflow" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Badge variant={getStatusColor(selectedPack.status)} className="mt-1">
                        {selectedPack.status}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Created Date</Label>
                      <p className="text-sm text-muted-foreground">
                        {selectedPack.createdDate.toLocaleDateString()}
                      </p>
                    </div>
                    {selectedPack.sentDate && (
                      <div>
                        <Label className="text-sm font-medium">Sent Date</Label>
                        <p className="text-sm text-muted-foreground">
                          {selectedPack.sentDate.toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {selectedPack.eSignatureWorkflowId && (
                      <div>
                        <Label className="text-sm font-medium">Workflow ID</Label>
                        <p className="text-sm text-muted-foreground font-mono">
                          {selectedPack.eSignatureWorkflowId}
                        </p>
                      </div>
                    )}
                  </div>

                  {selectedPack.status === 'sent' && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">E-Signature Workflow</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Board pack sent to directors</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-orange-600" />
                            <span className="text-sm">Awaiting signatures</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">2 of 3 directors have accessed the pack</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Pack
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
              {selectedPack.status === 'draft' && (
                <Button size="sm" onClick={() => handleSendForSignature(selectedPack.id)}>
                  <Send className="h-4 w-4 mr-2" />
                  Send for Signature
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 