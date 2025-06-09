
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const mockWorkflows = [
  {
    id: "1",
    policyTitle: "Updated Privacy Policy",
    version: "3.0",
    submittedBy: "Sarah Johnson",
    submittedDate: "2024-03-01",
    status: "Pending Review",
    currentApprover: "Michael Schmidt",
    priority: "High"
  },
  {
    id: "2",
    policyTitle: "New Security Guidelines",
    version: "1.0",
    submittedBy: "Jennifer Chen",
    submittedDate: "2024-02-28",
    status: "In Review",
    currentApprover: "Legal Team",
    priority: "Medium"
  },
  {
    id: "3",
    policyTitle: "Employee Handbook Update",
    version: "2.5",
    submittedBy: "David Wilson",
    submittedDate: "2024-02-25",
    status: "Approved",
    currentApprover: "John Smith",
    priority: "Low"
  }
];

const mockApprovalSteps = [
  { step: "Legal Review", approver: "Sarah Johnson", status: "Completed", date: "2024-03-02" },
  { step: "Compliance Check", approver: "Michael Schmidt", status: "In Progress", date: null },
  { step: "Executive Approval", approver: "Jennifer Chen", status: "Pending", date: null }
];

export function ApprovalWorkflows() {
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "In Progress": return <Clock className="h-4 w-4 text-blue-600" />;
      case "Pending": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "Rejected": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "In Review": return "bg-blue-100 text-blue-800";
      case "Pending Review": return "bg-yellow-100 text-yellow-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Being reviewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Ready to publish</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Workflows */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Approval Workflows</CardTitle>
              <CardDescription>Track and manage policy approval processes</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Title</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Approver</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWorkflows.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell className="font-medium">{workflow.policyTitle}</TableCell>
                  <TableCell>{workflow.version}</TableCell>
                  <TableCell>{workflow.submittedBy}</TableCell>
                  <TableCell>{workflow.submittedDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(workflow.status)}>
                      {workflow.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{workflow.currentApprover}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(workflow.priority)}>
                      {workflow.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Approval Steps Detail */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Process Detail</CardTitle>
          <CardDescription>Current approval steps for "Updated Privacy Policy v3.0"</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockApprovalSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                {getStatusIcon(step.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{step.step}</h4>
                    <Badge className={getStatusColor(step.status)}>
                      {step.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Assigned to: {step.approver}
                    {step.date && ` • Completed: ${step.date}`}
                  </p>
                </div>
                {step.status === "In Progress" && (
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      Request Changes
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comments and Audit Trail */}
      <Card>
        <CardHeader>
          <CardTitle>Comments & Audit Trail</CardTitle>
          <CardDescription>Communication history for approval process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Sarah Johnson</h4>
                <span className="text-sm text-muted-foreground">2024-03-02 14:30</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Legal review completed. Policy complies with current regulations. Approved for next stage.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Michael Schmidt</h4>
                <span className="text-sm text-muted-foreground">2024-03-01 16:45</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Submitted for compliance review. Please verify data retention sections match new requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
