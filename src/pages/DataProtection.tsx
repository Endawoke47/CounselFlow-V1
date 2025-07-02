import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { Shield, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Search, Filter, Plus, BarChart3, Users } from "lucide-react";

const DataProtection = () => {
  const stats = [
    {
      title: "Compliance Score",
      value: "94%",
      change: "+3%",
      trend: "up" as const,
      icon: Shield,
      variant: "success" as const,
    },
    {
      title: "Data Subjects",
      value: "12.5K",
      change: "+8%",
      trend: "up" as const,
      icon: Users,
      variant: "default" as const,
    },
    {
      title: "Open Requests",
      value: "7",
      change: "-12%",
      trend: "down" as const,
      icon: AlertTriangle,
      variant: "warning" as const,
    },
    {
      title: "Completed Audits",
      value: "15",
      change: "+25%",
      trend: "up" as const,
      icon: CheckCircle,
      variant: "success" as const,
    },
  ];

  const dataRequests = [
    { id: 1, type: "Access Request", subject: "John Doe", email: "john.doe@example.com", status: "Pending", priority: "Medium", submitted: "2 days ago" },
    { id: 2, type: "Deletion Request", subject: "Jane Smith", email: "jane.smith@example.com", status: "In Progress", priority: "High", submitted: "1 day ago" },
    { id: 3, type: "Rectification Request", subject: "Bob Johnson", email: "bob.j@example.com", status: "Completed", priority: "Low", submitted: "1 week ago" },
    { id: 4, type: "Portability Request", subject: "Alice Brown", email: "alice.b@example.com", status: "Pending", priority: "Medium", submitted: "3 days ago" },
    { id: 5, type: "Objection Request", subject: "Charlie Wilson", email: "charlie.w@example.com", status: "Under Review", priority: "High", submitted: "5 hours ago" },
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
                <span className="text-sm text-slate-500">vs last month</span>
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
              <h1 className="text-3xl font-bold mb-2">Data Protection & Privacy</h1>
              <p className="text-corporate-100 text-lg">
                Ensure GDPR compliance and manage data subject rights requests
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <CorporateButton variant="secondary" size="md">
              <Plus className="w-4 h-4 mr-2" />
              Log Request
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
              <BarChart3 className="w-4 h-4 mr-2" />
              Compliance Report
            </CorporateButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Data Subject Requests */}
        <CorporateCard variant="elevated" padding="none">
          <CorporateCardHeader 
            title="Data Subject Requests" 
            subtitle="Manage GDPR and privacy rights requests"
            action={
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </CorporateButton>
                <CorporateButton variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Request
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
                  placeholder="Search requests..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Requests Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Request Type</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Data Subject</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Contact</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Priority</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Submitted</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dataRequests.map((request) => (
                    <tr key={request.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          request.type === 'Access Request' ? 'bg-blue-100 text-blue-800' :
                          request.type === 'Deletion Request' ? 'bg-red-100 text-red-800' :
                          request.type === 'Rectification Request' ? 'bg-amber-100 text-amber-800' :
                          request.type === 'Portability Request' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {request.type}
                        </span>
                      </td>
                      <td className="py-4">
                        <p className="font-medium text-slate-900">{request.subject}</p>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-slate-600">{request.email}</p>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          request.status === 'Under Review' ? 'bg-amber-100 text-amber-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          request.priority === 'High' ? 'bg-red-100 text-red-800' :
                          request.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {request.priority}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-600">{request.submitted}</td>
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

export default DataProtection;
