
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

const mockAccessRequests = [
  {
    id: "1",
    user: "John Smith",
    email: "john.smith@company.com",
    requestType: "Module Access",
    resource: "IP Management Module",
    reason: "New role requires IP portfolio management",
    status: "Pending",
    requestDate: "2024-01-14",
    approver: "Sarah Johnson"
  },
  {
    id: "2",
    user: "Lisa Chen",
    email: "lisa.chen@partner-firm.com",
    requestType: "External Access",
    resource: "Dispute #2024-001",
    reason: "External counsel assignment",
    status: "Approved",
    requestDate: "2024-01-13",
    approver: "Michael Chen"
  },
  {
    id: "3",
    user: "Robert Davis",
    email: "robert.davis@company.com",
    requestType: "Entity Access",
    resource: "European Subsidiaries",
    reason: "Regional compliance oversight",
    status: "Rejected",
    requestDate: "2024-01-12",
    approver: "Emily Rodriguez"
  }
];

export function AccessRequestWorkflow() {
  return (
    <div className="space-y-6">
      <Card className="modern-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <AlertCircle className="h-4 w-4 text-primary" />
            </div>
            Access Request Workflow
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed">
            Review and approve access requests from users across the organization
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-lg border border-border/50">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="font-semibold text-foreground">User</TableHead>
                  <TableHead className="font-semibold text-foreground">Request Type</TableHead>
                  <TableHead className="font-semibold text-foreground">Resource</TableHead>
                  <TableHead className="font-semibold text-foreground">Reason</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground">Request Date</TableHead>
                  <TableHead className="font-semibold text-foreground">Approver</TableHead>
                  <TableHead className="font-semibold text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAccessRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-accent/30 transition-colors">
                    <TableCell className="py-4">
                      <div>
                        <div className="font-medium text-foreground">{request.user}</div>
                        <div className="text-sm text-muted-foreground">{request.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-foreground">{request.requestType}</TableCell>
                    <TableCell className="py-4 text-foreground">{request.resource}</TableCell>
                    <TableCell className="max-w-xs py-4">
                      <div className="truncate text-muted-foreground" title={request.reason}>
                        {request.reason}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant={
                        request.status === "Approved" ? "default" :
                        request.status === "Pending" ? "secondary" : "destructive"
                      } className="rounded-lg">
                        {request.status === "Pending" && <Clock className="h-3 w-3 mr-1.5" />}
                        {request.status === "Approved" && <CheckCircle className="h-3 w-3 mr-1.5" />}
                        {request.status === "Rejected" && <XCircle className="h-3 w-3 mr-1.5" />}
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 text-foreground">{request.requestDate}</TableCell>
                    <TableCell className="py-4 text-foreground">{request.approver}</TableCell>
                    <TableCell className="py-4">
                      {request.status === "Pending" ? (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-8 rounded-lg border-border/50 hover:bg-accent/50">
                            <CheckCircle className="h-3 w-3 mr-1.5" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 rounded-lg border-border/50 hover:bg-accent/50">
                            <XCircle className="h-3 w-3 mr-1.5" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
