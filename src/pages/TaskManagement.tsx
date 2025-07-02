import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { CheckSquare, Clock, AlertTriangle, TrendingUp, TrendingDown, Search, Filter, Plus, BarChart3, Calendar } from "lucide-react";

const TaskManagement = () => {
  const stats = [
    {
      title: "Total Tasks",
      value: "284",
      change: "+18%",
      trend: "up" as const,
      icon: CheckSquare,
      variant: "default" as const,
    },
    {
      title: "Completed Today",
      value: "23",
      change: "+12%",
      trend: "up" as const,
      icon: TrendingUp,
      variant: "success" as const,
    },
    {
      title: "Overdue Tasks",
      value: "12",
      change: "-25%",
      trend: "down" as const,
      icon: AlertTriangle,
      variant: "warning" as const,
    },
    {
      title: "Due This Week",
      value: "47",
      change: "+8%",
      trend: "up" as const,
      icon: Clock,
      variant: "default" as const,
    },
  ];

  const tasks = [
    { id: 1, title: "Review Employment Contract - TechCorp", assignee: "Sarah Johnson", priority: "High", status: "In Progress", dueDate: "2024-01-15", category: "Contract Review" },
    { id: 2, title: "Prepare Board Meeting Documents", assignee: "Michael Chen", priority: "Medium", status: "Pending", dueDate: "2024-01-18", category: "Corporate" },
    { id: 3, title: "IP Patent Filing Research", assignee: "Emily Davis", priority: "High", status: "Completed", dueDate: "2024-01-12", category: "Intellectual Property" },
    { id: 4, title: "Compliance Audit Preparation", assignee: "Robert Wilson", priority: "Medium", status: "In Progress", dueDate: "2024-01-20", category: "Compliance" },
    { id: 5, title: "Vendor Agreement Renewal", assignee: "Lisa Anderson", priority: "Low", status: "Pending", dueDate: "2024-01-25", category: "Procurement" },
  ];

  const StatCard = ({ title, value, change, trend, icon: Icon, variant }: any) => {
    const variantStyles = {
      default: 'border-slate-200',
      success: 'border-emerald-200 bg-emerald-50/50',
      warning: 'border-amber-200 bg-amber-50/50',
      danger: 'border-red-200 bg-red-50/50'
    };

    const iconStyles = {
      default: 'text-slate-600',
      success: 'text-emerald-600',
      warning: 'text-amber-600',
      danger: 'text-red-600'
    };

    return (
      <CorporateCard variant="elevated" padding="lg" className={`border-l-4 ${variantStyles[variant]}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Icon className={`w-5 h-5 ${iconStyles[variant]}`} />
              <p className="text-sm font-medium text-slate-600">{title}</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-slate-900">{value}</p>
              <div className="flex items-center space-x-1">
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {change}
                </span>
                <span className="text-sm text-slate-500">vs last week</span>
              </div>
            </div>
          </div>
        </div>
      </CorporateCard>
    );
  };

  return (
    <CorporateLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-corporate-600 to-corporate-700 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Task Management</h1>
              <p className="text-corporate-100 text-lg">
                Organize, track, and manage legal tasks and deadlines efficiently
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                <CheckSquare className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <CorporateButton variant="secondary" size="md">
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </CorporateButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Tasks Table */}
        <CorporateCard variant="elevated" padding="none">
          <CorporateCardHeader 
            title="Task List" 
            subtitle="Manage and track all assigned tasks and deadlines"
            action={
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </CorporateButton>
                <CorporateButton variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Task
                </CorporateButton>
              </div>
            }
          />
          <CorporateCardContent className="p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Tasks Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Task</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Assignee</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Category</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Priority</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Due Date</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4">
                        <p className="font-medium text-slate-900">{task.title}</p>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-corporate-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-corporate-700">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">{task.assignee}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-800">
                          {task.category}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          task.priority === 'High' ? 'bg-red-100 text-red-800' :
                          task.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-slate-600">{task.dueDate}</p>
                      </td>
                      <td className="py-4">
                        <CorporateButton variant="ghost" size="sm">
                          View
                        </CorporateButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CorporateCardContent>
        </CorporateCard>
      </div>
    </CorporateLayout>
  );
};

export default TaskManagement;
