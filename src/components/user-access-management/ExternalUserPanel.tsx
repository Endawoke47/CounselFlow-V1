
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink, Calendar, Shield, AlertTriangle } from "lucide-react";

const mockExternalUsers = [
  {
    id: "1",
    name: "David Kim",
    firm: "Kim & Associates",
    email: "david.kim@kim-law.com",
    accessType: "Matter-Specific",
    resources: ["Dispute #2024-001"],
    startDate: "2024-01-01",
    expiryDate: "2024-03-01",
    status: "Active",
    nda: "Signed"
  },
  {
    id: "2",
    name: "Maria Santos",
    firm: "Global Legal Partners",
    email: "maria.santos@glp.com",
    accessType: "Module Access",
    resources: ["IP Management"],
    startDate: "2023-12-01",
    expiryDate: "2024-06-01",
    status: "Active",
    nda: "Signed"
  },
  {
    id: "3",
    name: "James Wilson",
    firm: "Wilson Audit Services",
    email: "james@wilson-audit.com",
    accessType: "Read-Only",
    resources: ["All Contracts", "Compliance Reports"],
    startDate: "2024-01-10",
    expiryDate: "2024-01-20",
    status: "Expired",
    nda: "Pending"
  }
];

export function ExternalUserPanel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            External User Access Control
          </CardTitle>
          <CardDescription>
            Manage access for external counsel, consultants, and auditors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Firm/Organization</TableHead>
                <TableHead>Access Type</TableHead>
                <TableHead>Resources</TableHead>
                <TableHead>Access Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>NDA Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockExternalUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.firm}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.accessType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.resources.map((resource, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {resource}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.startDate} to {user.expiryDate}</div>
                      {new Date(user.expiryDate) < new Date() && (
                        <div className="text-destructive flex items-center gap-1 mt-1">
                          <AlertTriangle className="h-3 w-3" />
                          Expired
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      user.status === "Active" ? "default" : "destructive"
                    }>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      user.nda === "Signed" ? "default" : "secondary"
                    }>
                      <Shield className="h-3 w-3 mr-1" />
                      {user.nda}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Extend
                      </Button>
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
