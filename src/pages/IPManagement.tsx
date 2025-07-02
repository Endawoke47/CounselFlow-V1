import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { Shield, TrendingUp, TrendingDown, Clock, Award, Search, Filter, Plus, BarChart3 } from "lucide-react";

const IPManagement = () => {
  const stats = [
    {
      title: "Total IP Assets",
      value: "342",
      change: "+18%",
      trend: "up" as const,
      icon: Shield,
      variant: "default" as const,
    },
    {
      title: "Active Patents",
      value: "156",
      change: "+8%",
      trend: "up" as const,
      icon: Award,
      variant: "success" as const,
    },
    {
      title: "Pending Applications",
      value: "23",
      change: "+15%",
      trend: "up" as const,
      icon: Clock,
      variant: "warning" as const,
    },
    {
      title: "Portfolio Value",
      value: "$8.2M",
      change: "+22%",
      trend: "up" as const,
      icon: TrendingUp,
      variant: "success" as const,
    },
  ];

  const ipAssets = [
    { id: 1, title: "AI-Powered Legal Research Algorithm", type: "Patent", status: "Granted", filingDate: "2023-03-15", expiryDate: "2043-03-15", jurisdiction: "US, EU" },
    { id: 2, title: "CounselFlow", type: "Trademark", status: "Registered", filingDate: "2023-01-10", expiryDate: "2033-01-10", jurisdiction: "Global" },
    { id: 3, title: "Document Automation System", type: "Patent", status: "Pending", filingDate: "2024-02-20", expiryDate: "TBD", jurisdiction: "US" },
    { id: 4, title: "Legal Analytics Engine", type: "Copyright", status: "Registered", filingDate: "2023-06-05", expiryDate: "Life + 70", jurisdiction: "US, EU" },
    { id: 5, title: "Smart Contract Templates", type: "Trade Secret", status: "Protected", filingDate: "2023-08-12", expiryDate: "Indefinite", jurisdiction: "Internal" },
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
              <h1 className="text-3xl font-bold mb-2">Intellectual Property Management</h1>
              <p className="text-corporate-100 text-lg">
                Protect and manage your organization's intellectual property portfolio
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
              Add IP Asset
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
              <BarChart3 className="w-4 h-4 mr-2" />
              Portfolio Report
            </CorporateButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* IP Assets */}
        <CorporateCard variant="elevated" padding="none">
          <CorporateCardHeader 
            title="IP Portfolio" 
            subtitle="Manage patents, trademarks, copyrights, and trade secrets"
            action={
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </CorporateButton>
                <CorporateButton variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Asset
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
                  placeholder="Search IP assets..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* IP Assets Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Asset Title</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Type</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Filing Date</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Expiry Date</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Jurisdiction</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ipAssets.map((asset) => (
                    <tr key={asset.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4">
                        <p className="font-medium text-slate-900">{asset.title}</p>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          asset.type === 'Patent' ? 'bg-blue-100 text-blue-800' :
                          asset.type === 'Trademark' ? 'bg-purple-100 text-purple-800' :
                          asset.type === 'Copyright' ? 'bg-green-100 text-green-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {asset.type}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          asset.status === 'Granted' || asset.status === 'Registered' || asset.status === 'Protected' ? 'bg-green-100 text-green-800' :
                          asset.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {asset.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-600">{asset.filingDate}</td>
                      <td className="py-4 text-sm text-slate-600">{asset.expiryDate}</td>
                      <td className="py-4 text-sm text-slate-600">{asset.jurisdiction}</td>
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

export default IPManagement;
