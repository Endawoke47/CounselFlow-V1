import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { BookOpen, FileText, Users, TrendingUp, TrendingDown, Search, Filter, Plus, BarChart3, Star } from "lucide-react";

const KnowledgeManagement = () => {
  const stats = [
    {
      title: "Total Documents",
      value: "1,247",
      change: "+23%",
      trend: "up" as const,
      icon: FileText,
      variant: "default" as const,
    },
    {
      title: "Active Contributors",
      value: "89",
      change: "+12%",
      trend: "up" as const,
      icon: Users,
      variant: "success" as const,
    },
    {
      title: "Knowledge Base Views",
      value: "15.2K",
      change: "+35%",
      trend: "up" as const,
      icon: TrendingUp,
      variant: "success" as const,
    },
    {
      title: "Pending Reviews",
      value: "18",
      change: "-22%",
      trend: "down" as const,
      icon: BookOpen,
      variant: "warning" as const,
    },
  ];

  const documents = [
    { id: 1, title: "Employment Law Best Practices", category: "Legal Guides", author: "Sarah Johnson", lastUpdated: "2 days ago", views: 156, rating: 4.8 },
    { id: 2, title: "Contract Negotiation Strategies", category: "Templates", author: "Michael Chen", lastUpdated: "1 week ago", views: 289, rating: 4.9 },
    { id: 3, title: "Data Privacy Compliance Checklist", category: "Compliance", author: "Emily Davis", lastUpdated: "3 days ago", views: 201, rating: 4.7 },
    { id: 4, title: "IP Protection Guidelines", category: "Legal Guides", author: "Robert Wilson", lastUpdated: "5 days ago", views: 134, rating: 4.6 },
    { id: 5, title: "Merger & Acquisition Playbook", category: "Procedures", author: "Lisa Anderson", lastUpdated: "1 day ago", views: 98, rating: 4.9 },
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
              <h1 className="text-3xl font-bold mb-2">Knowledge Management</h1>
              <p className="text-corporate-100 text-lg">
                Centralize legal knowledge, best practices, and institutional expertise
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <CorporateButton variant="secondary" size="md">
              <Plus className="w-4 h-4 mr-2" />
              Add Document
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
              <BarChart3 className="w-4 h-4 mr-2" />
              Usage Analytics
            </CorporateButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Knowledge Base */}
        <CorporateCard variant="elevated" padding="none">
          <CorporateCardHeader 
            title="Knowledge Base" 
            subtitle="Access and manage legal knowledge and resources"
            action={
              <div className="flex space-x-2">
                <CorporateButton variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </CorporateButton>
                <CorporateButton variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Document
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
                  placeholder="Search knowledge base..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Documents Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Document</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Category</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Author</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Last Updated</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Views</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Rating</th>
                    <th className="text-left pb-3 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4">
                        <p className="font-medium text-slate-900">{doc.title}</p>
                      </td>
                      <td className="py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-800">
                          {doc.category}
                        </span>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-slate-600">{doc.author}</p>
                      </td>
                      <td className="py-4 text-sm text-slate-600">{doc.lastUpdated}</td>
                      <td className="py-4 text-sm text-slate-600">{doc.views}</td>
                      <td className="py-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                          <span className="text-sm font-medium text-slate-900">{doc.rating}</span>
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

export default KnowledgeManagement;
