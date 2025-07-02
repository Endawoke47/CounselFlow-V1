import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { Shield, FileText, Clock, AlertTriangle, TrendingUp, TrendingDown, Search, Filter, Plus, BarChart3, Award } from "lucide-react";

const LicensingRegulatory = () => {
  const stats = [
    {
      title: "Active Licenses",
      value: "89",
      change: "+12%",
      trend: "up" as const,
      icon: Award,
      variant: "default" as const,
    },
    {
      title: "Compliance Rate",
      value: "98%",
      change: "+2%",
      trend: "up" as const,
      icon: Shield,
      variant: "success" as const,
    },
    {
      title: "Expiring Soon",
      value: "8",
      change: "-20%",
      trend: "down" as const,
      icon: Clock,
      variant: "warning" as const,
    },
    {
      title: "Regulatory Updates",
      value: "15",
      change: "+25%",
      trend: "up" as const,
      icon: FileText,
      variant: "default" as const,
    },
  ];

  const licenses = [
    { id: 1, name: "Financial Services License", authority: "FCA", status: "Active", issueDate: "2023-01-15", expiryDate: "2025-01-15", jurisdiction: "UK", riskLevel: "Low" },
    { id: 2, name: "Data Processing License", authority: "ICO", status: "Renewal Pending", issueDate: "2022-06-10", expiryDate: "2024-06-10", jurisdiction: "UK", riskLevel: "Medium" },
    { id: 3, name: "Professional Services License", authority: "SRA", status: "Active", issueDate: "2023-03-20", expiryDate: "2026-03-20", jurisdiction: "England & Wales", riskLevel: "Low" },
    { id: 4, name: "Export License", authority: "HM Revenue & Customs", status: "Expired", issueDate: "2021-11-05", expiryDate: "2023-11-05", jurisdiction: "UK", riskLevel: "High" },
    { id: 5, name: "Broadcasting License", authority: "Ofcom", status: "Under Review", issueDate: "2023-08-12", expiryDate: "2025-08-12", jurisdiction: "UK", riskLevel: "Medium" },
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
                <span className="text-sm text-slate-500">vs last year</span>
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
              <h1 className="text-3xl font-bold mb-2">Licensing & Regulatory</h1>
              <p className="text-corporate-100 text-lg">
                Manage licenses, permits, and regulatory compliance requirements
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
              Add License
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

        {/* Licenses Table */}
        <CorporateCard variant="elevated" padding="none">
          <CorporateCardHeader 
            title="License Registry" 
            subtitle="Track licenses, permits, and regulatory requirements"
            action={
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </CorporateButton>
                <CorporateButton variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add License
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
                  placeholder="Search licenses..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Licenses Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">License Name</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Authority</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Issue Date</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Expiry Date</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Jurisdiction</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Risk Level</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {licenses.map((license) => (
                    <tr key={license.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4">
                        <p className="font-medium text-slate-900">{license.name}</p>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-slate-600">{license.authority}</p>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          license.status === 'Active' ? 'bg-green-100 text-green-800' :
                          license.status === 'Renewal Pending' || license.status === 'Under Review' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {license.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-600">{license.issueDate}</td>
                      <td className="py-4 text-sm text-slate-600">{license.expiryDate}</td>
                      <td className="py-4 text-sm text-slate-600">{license.jurisdiction}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          license.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                          license.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {license.riskLevel}
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

export default LicensingRegulatory;
