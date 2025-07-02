import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { FileText, Shield, Clock, CheckCircle, Search, Filter, Plus, BarChart3, TrendingUp, TrendingDown } from "lucide-react";

const PolicyManagement = () => {
  const stats = [
    {
      title: "Total Policies",
      value: "156",
      change: "+8%",
      trend: "up" as const,
      icon: FileText,
      variant: "default" as const,
    },
    {
      title: "Pending Review",
      value: "12",
      change: "-15%",
      trend: "down" as const,
      icon: Clock,
      variant: "warning" as const,
    },
    {
      title: "Compliance Rate",
      value: "96%",
      change: "+2%",
      trend: "up" as const,
      icon: Shield,
      variant: "success" as const,
    },
    {
      title: "Updated This Month",
      value: "23",
      change: "+18%",
      trend: "up" as const,
      icon: CheckCircle,
      variant: "success" as const,
    },
  ];

  const policies = [
    { id: 1, name: "Data Privacy Policy", category: "Data Protection", status: "Current", lastReview: "2 weeks ago", nextReview: "In 10 months" },
    { id: 2, name: "Employee Code of Conduct", category: "HR Policy", status: "Pending Review", lastReview: "1 month ago", nextReview: "Overdue" },
    { id: 3, name: "Information Security Policy", category: "IT Security", status: "Current", lastReview: "3 weeks ago", nextReview: "In 9 months" },
    { id: 4, name: "Anti-Corruption Policy", category: "Compliance", status: "Draft", lastReview: "N/A", nextReview: "Pending" },
    { id: 5, name: "Vendor Management Policy", category: "Procurement", status: "Current", lastReview: "1 week ago", nextReview: "In 11 months" },
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
                <span className="text-sm text-slate-500">vs last quarter</span>
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
              <h1 className="text-3xl font-bold mb-2">Policy Management</h1>
              <p className="text-corporate-100 text-lg">
                Manage organizational policies and ensure compliance across all departments
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                <FileText className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <CorporateButton variant="secondary" size="md">
              <Plus className="w-4 h-4 mr-2" />
              Create Policy
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

        {/* Policies Table */}
        <CorporateCard variant="elevated" padding="none">
          <CorporateCardHeader 
            title="Policies" 
            subtitle="Manage and track all organizational policies"
            action={
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </CorporateButton>
                <CorporateButton variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Policy
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
                  placeholder="Search policies..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Policies Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Policy Name</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Category</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Last Review</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Next Review</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.map((policy) => (
                    <tr key={policy.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4">
                        <p className="font-medium text-slate-900">{policy.name}</p>
                      </td>
                      <td className="py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-800">
                          {policy.category}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          policy.status === 'Current' ? 'bg-green-100 text-green-800' :
                          policy.status === 'Pending Review' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {policy.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-600">{policy.lastReview}</td>
                      <td className="py-4">
                        <span className={`text-sm ${
                          policy.nextReview === 'Overdue' ? 'text-red-600 font-medium' :
                          policy.nextReview === 'Pending' ? 'text-amber-600' :
                          'text-slate-600'
                        }`}>
                          {policy.nextReview}
                        </span>
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

export default PolicyManagement;
