import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { Users, Shield, UserPlus, TrendingUp, TrendingDown, Search, Filter, Plus, BarChart3, Settings } from "lucide-react";

const UserAccessManagement = () => {
  const stats = [
    {
      title: "Total Users",
      value: "156",
      change: "+12%",
      trend: "up" as const,
      icon: Users,
      variant: "default" as const,
    },
    {
      title: "Active Sessions",
      value: "89",
      change: "+8%",
      trend: "up" as const,
      icon: Shield,
      variant: "success" as const,
    },
    {
      title: "Pending Requests",
      value: "7",
      change: "-15%",
      trend: "down" as const,
      icon: UserPlus,
      variant: "warning" as const,
    },
    {
      title: "Security Score",
      value: "96%",
      change: "+3%",
      trend: "up" as const,
      icon: TrendingUp,
      variant: "success" as const,
    },
  ];

  const users = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@company.com", role: "Legal Director", department: "Legal", status: "Active", lastLogin: "2 hours ago" },
    { id: 2, name: "Michael Chen", email: "michael.c@company.com", role: "Senior Associate", department: "Legal", status: "Active", lastLogin: "1 day ago" },
    { id: 3, name: "Emily Davis", email: "emily.d@company.com", role: "Compliance Manager", department: "Compliance", status: "Inactive", lastLogin: "1 week ago" },
    { id: 4, name: "Robert Wilson", email: "robert.w@company.com", role: "Legal Counsel", department: "Legal", status: "Active", lastLogin: "3 hours ago" },
    { id: 5, name: "Lisa Anderson", email: "lisa.a@company.com", role: "Paralegal", department: "Legal", status: "Pending", lastLogin: "Never" },
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
              <h1 className="text-3xl font-bold mb-2">User Access Management</h1>
              <p className="text-corporate-100 text-lg">
                Manage user accounts, roles, and access permissions across the platform
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <CorporateButton variant="secondary" size="md">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
              <Settings className="w-4 h-4 mr-2" />
              Manage Roles
            </CorporateButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Users Table */}
        <CorporateCard variant="elevated" padding="none">
          <CorporateCardHeader 
            title="User Management" 
            subtitle="Manage user accounts and access permissions"
            action={
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </CorporateButton>
                <CorporateButton variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
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
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Name</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Email</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Role</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Department</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Last Login</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-corporate-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-corporate-700">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <p className="font-medium text-slate-900">{user.name}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-slate-600">{user.email}</p>
                      </td>
                      <td className="py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-slate-600">{user.department}</p>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' :
                          user.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-600">{user.lastLogin}</td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <CorporateButton variant="ghost" size="sm">
                            Edit
                          </CorporateButton>
                        </div>
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

export default UserAccessManagement;
