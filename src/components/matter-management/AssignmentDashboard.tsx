
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, AlertTriangle, Clock, Target, User, CheckCircle } from "lucide-react";

export function AssignmentDashboard() {
  const teamWorkload = [
    { name: "Sarah Chen", capacity: 85, matters: 12, expertise: "Contract Law", region: "NA" },
    { name: "David Park", capacity: 60, matters: 8, expertise: "Employment", region: "NA" },
    { name: "Emily Rodriguez", capacity: 92, matters: 15, expertise: "Compliance", region: "EU" },
    { name: "Michael Wong", capacity: 45, matters: 6, expertise: "IP Law", region: "APAC" }
  ];

  const unassignedMatters = [
    { id: "MAT-2024-004", title: "Data Processing Agreement Review", type: "Contract", priority: "High", created: "2024-01-20" },
    { id: "MAT-2024-005", title: "Employment Termination Advice", type: "Legal Advice", priority: "Medium", created: "2024-01-19" },
    { id: "MAT-2024-006", title: "GDPR Compliance Assessment", type: "Compliance", priority: "High", created: "2024-01-18" }
  ];

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 90) return "text-red-600";
    if (capacity >= 75) return "text-orange-600";
    return "text-green-600";
  };

  const getCapacityBg = (capacity: number) => {
    if (capacity >= 90) return "bg-red-100";
    if (capacity >= 75) return "bg-orange-100";
    return "bg-green-100";
  };

  return (
    <div className="space-y-6">
      {/* Assignment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unassigned Matters</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Team Capacity</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">70%</div>
            <p className="text-xs text-muted-foreground">Across all team members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Violations</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-muted-foreground">Due to capacity issues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-Assignments</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Workload */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Workload
              </CardTitle>
              <Button variant="outline" size="sm">Rebalance</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamWorkload.map((member, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.expertise} • {member.region}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${getCapacityColor(member.capacity)}`}>
                        {member.capacity}%
                      </p>
                      <p className="text-sm text-muted-foreground">{member.matters} matters</p>
                    </div>
                  </div>
                  <Progress 
                    value={member.capacity} 
                    className={`w-full ${getCapacityBg(member.capacity)}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Unassigned Matters */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Unassigned Matters
              </CardTitle>
              <Button size="sm">Bulk Assign</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unassignedMatters.map((matter, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{matter.title}</p>
                    <Badge className={
                      matter.priority === "High" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"
                    }>
                      {matter.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>{matter.type}</span>
                    <span>{matter.created}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Auto-Assign
                    </Button>
                    <Button size="sm" className="flex-1">
                      Manual Assign
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Assignment Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Smart Assignment Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matter</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Suggested Assignee</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div>
                    <p className="font-medium">Data Processing Agreement</p>
                    <p className="text-sm text-muted-foreground">MAT-2024-004</p>
                  </div>
                </TableCell>
                <TableCell>Contract</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Sarah Chen
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">Contract expertise + Available capacity (85%)</p>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">95%</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Assign
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>
                    <p className="font-medium">Employment Termination Advice</p>
                    <p className="text-sm text-muted-foreground">MAT-2024-005</p>
                  </div>
                </TableCell>
                <TableCell>Legal Advice</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    David Park
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">Employment law specialist + Low workload (60%)</p>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">92%</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Assign
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
