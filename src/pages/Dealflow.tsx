import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { TrendingUp, DollarSign, FileText, Clock, TrendingDown, Search, Filter, Plus, BarChart3, Briefcase } from "lucide-react";

const Dealflow = () => {
  const stats = [
    {
      title: "Active Deals",
      value: "47",
      change: "+23%",
      trend: "up" as const,
      icon: Briefcase,
      variant: "default" as const,
    },
    {
      title: "Total Deal Value",
      value: "$24.8M",
      change: "+35%",
      trend: "up" as const,
      icon: DollarSign,
      variant: "success" as const,
    },
    {
      title: "Deals Closed",
      value: "12",
      change: "+50%",
      trend: "up" as const,
      icon: TrendingUp,
      variant: "success" as const,
    },
    {
      title: "Avg. Deal Time",
      value: "89 days",
      change: "-12%",
      trend: "down" as const,
      icon: Clock,
      variant: "success" as const,
    },
  ];

  const deals = [
    { id: 1, name: "TechCorp Acquisition", type: "M&A", value: "$5.2M", stage: "Due Diligence", probability: "85%", expectedClose: "2024-02-15", lead: "Sarah Johnson" },
    { id: 2, name: "StartupX Investment", type: "Investment", value: "$2.8M", stage: "Negotiation", probability: "70%", expectedClose: "2024-01-30", lead: "Michael Chen" },
    { id: 3, name: "FinancePartners Joint Venture", type: "Joint Venture", value: "$8.1M", stage: "Legal Review", probability: "90%", expectedClose: "2024-02-28", lead: "Emily Davis" },
    { id: 4, name: "RetailCo Asset Purchase", type: "Asset Deal", value: "$3.5M", stage: "Documentation", probability: "60%", expectedClose: "2024-03-15", lead: "Robert Wilson" },
    { id: 5, name: "CloudSoft Licensing", type: "Licensing", value: "$1.2M", stage: "Initial Review", probability: "40%", expectedClose: "2024-04-01", lead: "Lisa Anderson" },
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
              <h1 className="text-3xl font-bold mb-2">Deal Flow Management</h1>
              <p className="text-corporate-100 text-lg">
                Track and manage M&A transactions, investments, and strategic deals
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                <Briefcase className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <CorporateButton variant="secondary" size="md">
              <Plus className="w-4 h-4 mr-2" />
              New Deal
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
              <BarChart3 className="w-4 h-4 mr-2" />
              Pipeline Report
            </CorporateButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Deals Pipeline */}
        <CorporateCard variant="elevated" padding="none">
          <CorporateCardHeader 
            title="Deal Pipeline" 
            subtitle="Track active deals and transaction progress"
            action={
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </CorporateButton>
                <CorporateButton variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Deal
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
                  placeholder="Search deals..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Deals Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Deal Name</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Type</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Value</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Stage</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Probability</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Expected Close</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Lead</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal) => (
                    <tr key={deal.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4">
                        <p className="font-medium text-slate-900">{deal.name}</p>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          deal.type === 'M&A' ? 'bg-blue-100 text-blue-800' :
                          deal.type === 'Investment' ? 'bg-green-100 text-green-800' :
                          deal.type === 'Joint Venture' ? 'bg-purple-100 text-purple-800' :
                          deal.type === 'Asset Deal' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {deal.type}
                        </span>
                      </td>
                      <td className="py-4">
                        <p className="font-medium text-slate-900">{deal.value}</p>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          deal.stage === 'Due Diligence' || deal.stage === 'Legal Review' ? 'bg-blue-100 text-blue-800' :
                          deal.stage === 'Negotiation' || deal.stage === 'Documentation' ? 'bg-amber-100 text-amber-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {deal.stage}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                parseInt(deal.probability) >= 80 ? 'bg-green-500' :
                                parseInt(deal.probability) >= 60 ? 'bg-amber-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: deal.probability }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-600">{deal.probability}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-slate-600">{deal.expectedClose}</td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-corporate-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-corporate-700">
                              {deal.lead.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">{deal.lead}</p>
                        </div>
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

export default Dealflow;
