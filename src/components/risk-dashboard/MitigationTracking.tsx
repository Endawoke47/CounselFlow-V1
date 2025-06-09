
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, CheckCircle, AlertTriangle, User, Calendar } from "lucide-react";
import { useState } from "react";

export function MitigationTracking() {
  const [filterStatus, setFilterStatus] = useState("all");

  const mitigationPlans = [
    {
      id: 1,
      riskTitle: "GDPR Compliance Audit Findings",
      riskSeverity: "Critical",
      plan: "Implement comprehensive data mapping and privacy controls",
      owner: "Privacy Officer",
      assignee: "Data Protection Team",
      dueDate: "2024-11-20",
      progress: 75,
      status: "In Progress",
      actions: [
        { task: "Complete data mapping exercise", completed: true, dueDate: "2024-11-10" },
        { task: "Update privacy policies", completed: true, dueDate: "2024-11-15" },
        { task: "Implement technical controls", completed: false, dueDate: "2024-11-18" },
        { task: "Conduct staff training", completed: false, dueDate: "2024-11-20" }
      ],
      overdue: false
    },
    {
      id: 2,
      riskTitle: "Key Supplier Contract Termination Clause",
      riskSeverity: "High",
      plan: "Negotiate alternative suppliers and contract amendments",
      owner: "Commercial Team",
      assignee: "Procurement Manager",
      dueDate: "2024-11-25",
      progress: 40,
      status: "In Progress",
      actions: [
        { task: "Identify alternative suppliers", completed: true, dueDate: "2024-11-12" },
        { task: "Initiate contract negotiations", completed: false, dueDate: "2024-11-20" },
        { task: "Legal review of amendments", completed: false, dueDate: "2024-11-23" },
        { task: "Execute backup agreements", completed: false, dueDate: "2024-11-25" }
      ],
      overdue: false
    },
    {
      id: 3,
      riskTitle: "Patent Opposition in Key Market",
      riskSeverity: "High",
      plan: "Prepare opposition response and alternative protection strategy",
      owner: "IP Counsel",
      assignee: "External IP Firm",
      dueDate: "2024-12-01",
      progress: 60,
      status: "In Progress",
      actions: [
        { task: "Gather prior art evidence", completed: true, dueDate: "2024-11-15" },
        { task: "Prepare legal arguments", completed: true, dueDate: "2024-11-20" },
        { task: "File opposition response", completed: false, dueDate: "2024-11-28" },
        { task: "Monitor proceedings", completed: false, dueDate: "2024-12-01" }
      ],
      overdue: false
    },
    {
      id: 4,
      riskTitle: "Vendor Performance Risk",
      riskSeverity: "Medium",
      plan: "Implement enhanced monitoring and backup vendor agreement",
      owner: "Operations Manager",
      assignee: "Vendor Management Team",
      dueDate: "2024-11-10",
      progress: 25,
      status: "Overdue",
      actions: [
        { task: "Set up monitoring KPIs", completed: true, dueDate: "2024-11-05" },
        { task: "Identify backup vendors", completed: false, dueDate: "2024-11-08" },
        { task: "Negotiate SLA improvements", completed: false, dueDate: "2024-11-10" },
        { task: "Implement monitoring system", completed: false, dueDate: "2024-11-12" }
      ],
      overdue: true
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "destructive";
      case "High": return "secondary";
      case "Medium": return "outline";
      default: return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "default";
      case "In Progress": return "secondary";
      case "Overdue": return "destructive";
      case "Not Started": return "outline";
      default: return "outline";
    }
  };

  const filteredPlans = mitigationPlans.filter(plan => {
    if (filterStatus === "all") return true;
    return plan.status.toLowerCase().replace(" ", "-") === filterStatus;
  });

  const summaryStats = [
    {
      title: "Active Mitigations",
      value: mitigationPlans.filter(p => p.status === "In Progress").length,
      icon: Clock,
      color: "text-blue-600"
    },
    {
      title: "Overdue Actions",
      value: mitigationPlans.filter(p => p.overdue).length,
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "Completed This Month",
      value: "8",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Average Progress",
      value: Math.round(mitigationPlans.reduce((acc, plan) => acc + plan.progress, 0) / mitigationPlans.length) + "%",
      icon: User,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Mitigation Tracking</h2>
          <p className="text-muted-foreground">Monitor risk mitigation plans and action progress</p>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="not-started">Not Started</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summaryStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                </div>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mitigation Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Active Mitigation Plans ({filteredPlans.length})</CardTitle>
          <CardDescription>
            Risk mitigation progress and action tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredPlans.map((plan) => (
              <div key={plan.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{plan.riskTitle}</h4>
                      <Badge variant={getSeverityColor(plan.riskSeverity) as any}>
                        {plan.riskSeverity}
                      </Badge>
                      <Badge variant={getStatusColor(plan.status) as any}>
                        {plan.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{plan.plan}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Owner: {plan.owner}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Assignee: {plan.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {plan.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{plan.progress}%</div>
                    <div className="text-xs text-muted-foreground">Complete</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{plan.progress}%</span>
                  </div>
                  <Progress value={plan.progress} className="h-2" />
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Action Items:</h5>
                  <div className="space-y-2">
                    {plan.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            action.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                          }`}>
                            {action.completed && <CheckCircle className="h-3 w-3 text-white" />}
                          </div>
                          <span className={action.completed ? 'line-through text-muted-foreground' : ''}>
                            {action.task}
                          </span>
                        </div>
                        <span className="text-muted-foreground">{action.dueDate}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Update Progress
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
