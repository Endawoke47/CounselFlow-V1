
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, AlertTriangle, CheckCircle, XCircle, Eye, FileText } from "lucide-react";

const mockLifecycleEvents = [
  {
    id: "1",
    asset: "TechBrand Logo",
    type: "Trademark",
    event: "Renewal Due",
    currentStage: "Registered",
    dueDate: "2024-02-15",
    daysRemaining: 12,
    priority: "High",
    jurisdiction: "US",
    status: "Pending Action",
    nextSteps: "File renewal application",
    cost: "$500"
  },
  {
    id: "2",
    asset: "AI Processing Method",
    type: "Patent",
    event: "Office Action Response",
    currentStage: "Under Examination",
    dueDate: "2024-02-28",
    daysRemaining: 25,
    priority: "Critical",
    jurisdiction: "EP",
    status: "Draft Response",
    nextSteps: "Review examiner comments",
    cost: "$8,500"
  },
  {
    id: "3",
    asset: "DataFlow System",
    type: "Patent",
    event: "Grant Maintenance",
    currentStage: "Granted",
    dueDate: "2024-03-20",
    daysRemaining: 45,
    priority: "Medium",
    jurisdiction: "US",
    status: "Monitor",
    nextSteps: "Prepare maintenance fee",
    cost: "$1,600"
  },
  {
    id: "4",
    asset: "Product Manual v2.0",
    type: "Copyright",
    event: "Registration Complete",
    currentStage: "Published",
    dueDate: "2024-01-30",
    daysRemaining: -3,
    priority: "Low",
    jurisdiction: "UK",
    status: "Completed",
    nextSteps: "Update asset register",
    cost: "$200"
  }
];

const mockAssetTimelines = [
  {
    asset: "TechBrand Logo",
    type: "Trademark",
    stages: [
      { name: "Application Filed", status: "completed", date: "2023-01-15" },
      { name: "Examination", status: "completed", date: "2023-04-20" },
      { name: "Publication", status: "completed", date: "2023-07-10" },
      { name: "Registration", status: "completed", date: "2023-10-15" },
      { name: "First Renewal", status: "upcoming", date: "2024-02-15" },
      { name: "Second Renewal", status: "future", date: "2029-02-15" }
    ]
  },
  {
    asset: "AI Processing Method",
    type: "Patent",
    stages: [
      { name: "Priority Filing", status: "completed", date: "2023-03-01" },
      { name: "PCT Filing", status: "completed", date: "2024-02-28" },
      { name: "EP Regional Phase", status: "active", date: "2024-09-01" },
      { name: "Examination", status: "active", date: "2024-12-15" },
      { name: "Grant Decision", status: "pending", date: "2025-06-01" },
      { name: "Opposition Period", status: "future", date: "2025-09-01" }
    ]
  }
];

export function LifecycleTracking() {
  const [activeTab, setActiveTab] = useState("deadlines");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case "High":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Action":
        return <Badge className="bg-red-100 text-red-800">Pending Action</Badge>;
      case "Draft Response":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft Response</Badge>;
      case "Monitor":
        return <Badge className="bg-blue-100 text-blue-800">Monitor</Badge>;
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDaysRemainingColor = (days: number) => {
    if (days < 0) return "text-red-600 font-semibold";
    if (days <= 7) return "text-red-500 font-medium";
    if (days <= 30) return "text-orange-500";
    return "text-muted-foreground";
  };

  const getStageIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "active":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "upcoming":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "future":
        return <XCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Lifecycle Tracking</h2>
          <p className="text-muted-foreground">
            Track IP asset lifecycles, deadlines, and renewal requirements
          </p>
        </div>
      </div>

      {/* Deadline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">
              Immediate attention required
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">7</div>
            <p className="text-xs text-muted-foreground">
              Critical deadlines approaching
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due This Month</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Plan ahead for renewals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tracked</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              Active lifecycle events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b">
        <button
          className={`pb-2 px-1 ${activeTab === "deadlines" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("deadlines")}
        >
          Upcoming Deadlines
        </button>
        <button
          className={`pb-2 px-1 ${activeTab === "timelines" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("timelines")}
        >
          Asset Timelines
        </button>
        <button
          className={`pb-2 px-1 ${activeTab === "calendar" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar View
        </button>
      </div>

      {activeTab === "deadlines" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Deadlines & Actions</CardTitle>
              <div className="flex gap-4">
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="trademark">Trademark</SelectItem>
                    <SelectItem value="patent">Patent</SelectItem>
                    <SelectItem value="copyright">Copyright</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Current Stage</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Days Remaining</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Steps</TableHead>
                  <TableHead>Est. Cost</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLifecycleEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.asset}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{event.type}</Badge>
                    </TableCell>
                    <TableCell>{event.event}</TableCell>
                    <TableCell className="text-sm">{event.currentStage}</TableCell>
                    <TableCell className="text-sm">{event.dueDate}</TableCell>
                    <TableCell className={getDaysRemainingColor(event.daysRemaining)}>
                      {event.daysRemaining < 0 ? `${Math.abs(event.daysRemaining)} days overdue` : `${event.daysRemaining} days`}
                    </TableCell>
                    <TableCell>{getPriorityBadge(event.priority)}</TableCell>
                    <TableCell>{getStatusBadge(event.status)}</TableCell>
                    <TableCell className="text-sm">{event.nextSteps}</TableCell>
                    <TableCell className="font-medium">{event.cost}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "timelines" && (
        <div className="space-y-6">
          {mockAssetTimelines.map((timeline) => (
            <Card key={timeline.asset}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{timeline.asset}</CardTitle>
                    <CardDescription>{timeline.type} Lifecycle Timeline</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.stages.map((stage, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex items-center gap-2 w-48">
                        {getStageIcon(stage.status)}
                        <span className={`text-sm ${stage.status === 'completed' ? 'text-muted-foreground' : 'font-medium'}`}>
                          {stage.name}
                        </span>
                      </div>
                      <div className="flex-1">
                        <Progress 
                          value={stage.status === 'completed' ? 100 : stage.status === 'active' ? 50 : 0} 
                          className="h-2"
                        />
                      </div>
                      <div className="text-sm text-muted-foreground w-24">
                        {stage.date}
                      </div>
                      <div className="w-24">
                        {stage.status === 'upcoming' && (
                          <Badge className="bg-orange-100 text-orange-800">Due Soon</Badge>
                        )}
                        {stage.status === 'active' && (
                          <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                        )}
                        {stage.status === 'completed' && (
                          <Badge className="bg-green-100 text-green-800">Complete</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "calendar" && (
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Visual timeline of all IP lifecycle events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium">Calendar Integration Coming Soon</h3>
              <p>Interactive calendar view of all IP deadlines and milestones</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
