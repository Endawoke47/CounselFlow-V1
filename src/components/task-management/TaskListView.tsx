
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, AlertTriangle, Clock, CheckCircle, User, Calendar } from "lucide-react";

export function TaskListView() {
  const [searchTerm, setSearchTerm] = useState("");

  const tasks = [
    {
      id: "TASK-001",
      title: "Review supplier contract renewal",
      module: "Contracts",
      assignee: "Sarah Chen",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-01-25",
      entity: "Global Holdings",
      description: "Annual renewal review for critical supplier agreement",
      overdue: false
    },
    {
      id: "TASK-002",
      title: "File patent opposition response",
      module: "IP Management",
      assignee: "David Park",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2024-01-20",
      entity: "Technology Division",
      description: "Respond to patent opposition within statutory deadline",
      overdue: true
    },
    {
      id: "TASK-003",
      title: "Complete GDPR compliance audit",
      module: "Compliance",
      assignee: "Emily Rodriguez",
      priority: "Medium",
      status: "Completed",
      dueDate: "2024-01-15",
      entity: "EU Operations",
      description: "Quarterly GDPR compliance review and documentation",
      overdue: false
    },
    {
      id: "TASK-004",
      title: "Prepare board resolution for AGM",
      module: "Company Secretarial",
      assignee: "Michael Kim",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-01-30",
      entity: "Corporate",
      description: "Draft resolutions for annual general meeting",
      overdue: false
    },
    {
      id: "TASK-005",
      title: "Review litigation settlement proposal",
      module: "Disputes",
      assignee: "Lisa Wang",
      priority: "High",
      status: "Blocked",
      dueDate: "2024-01-28",
      entity: "APAC Operations",
      description: "Evaluate settlement terms and commercial impact",
      overdue: false
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "In Progress": return <Clock className="h-4 w-4 text-blue-500" />;
      case "Blocked": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      "Not Started": "bg-gray-100 text-gray-800",
      "In Progress": "bg-blue-100 text-blue-800",
      "Completed": "bg-green-100 text-green-800",
      "Blocked": "bg-red-100 text-red-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      "Critical": "bg-red-100 text-red-800",
      "High": "bg-orange-100 text-orange-800",
      "Medium": "bg-yellow-100 text-yellow-800",
      "Low": "bg-green-100 text-green-800"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getModuleBadge = (module: string) => {
    const colors = {
      "Contracts": "bg-purple-100 text-purple-800",
      "IP Management": "bg-indigo-100 text-indigo-800",
      "Compliance": "bg-cyan-100 text-cyan-800",
      "Company Secretarial": "bg-teal-100 text-teal-800",
      "Disputes": "bg-pink-100 text-pink-800"
    };
    return colors[module as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-red-600">8</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">23</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">16</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              All Tasks
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} className={task.overdue ? "bg-red-50" : ""}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {task.overdue && <AlertTriangle className="h-4 w-4 text-red-500" />}
                        {task.title}
                      </div>
                      <div className="text-sm text-muted-foreground">{task.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getModuleBadge(task.module)}>
                      {task.module}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityBadge(task.priority)}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <Badge className={getStatusBadge(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {task.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>{task.entity}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
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
