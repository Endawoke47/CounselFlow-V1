import React from 'react'
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from './CorporateCard'
import { CorporateButton } from './CorporateButton'
import { 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Users, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Briefcase,
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    trend: 'up' | 'down'
    period: string
  }
  icon: React.ComponentType<{ className?: string }>
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  variant = 'default' 
}) => {
  const variantStyles = {
    default: 'border-slate-200',
    success: 'border-emerald-200 bg-emerald-50/50',
    warning: 'border-amber-200 bg-amber-50/50',
    danger: 'border-red-200 bg-red-50/50'
  }

  const iconStyles = {
    default: 'text-slate-600',
    success: 'text-emerald-600',
    warning: 'text-amber-600',
    danger: 'text-red-600'
  }

  return (
    <CorporateCard variant="elevated" padding="lg" className={cn('border-l-4', variantStyles[variant])}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <Icon className={cn('w-5 h-5', iconStyles[variant])} />
            <p className="text-sm font-medium text-slate-600">{title}</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            {change && (
              <div className="flex items-center space-x-1">
                {change.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={cn(
                  'text-sm font-medium',
                  change.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                )}>
                  {Math.abs(change.value)}%
                </span>
                <span className="text-sm text-slate-500">{change.period}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </CorporateCard>
  )
}

interface RecentActivityItem {
  id: string
  type: 'contract' | 'matter' | 'compliance' | 'task'
  title: string
  description: string
  timestamp: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'pending' | 'in-progress' | 'completed' | 'overdue'
}

const ActivityItem: React.FC<{ item: RecentActivityItem }> = ({ item }) => {
  const typeIcons = {
    contract: FileText,
    matter: Briefcase,
    compliance: Shield,
    task: CheckCircle
  }

  const statusColors = {
    pending: 'text-amber-600 bg-amber-100',
    'in-progress': 'text-blue-600 bg-blue-100',
    completed: 'text-emerald-600 bg-emerald-100',
    overdue: 'text-red-600 bg-red-100'
  }

  const priorityColors = {
    low: 'border-slate-300',
    medium: 'border-amber-300',
    high: 'border-red-300'
  }

  const Icon = typeIcons[item.type] || FileText

  return (
    <div className={cn(
      'flex items-start space-x-4 p-4 rounded-lg border-l-4 hover:bg-slate-50 transition-colors duration-200',
      item.priority ? priorityColors[item.priority] : 'border-slate-300'
    )}>
      <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-slate-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-slate-900 truncate">{item.title}</h4>
            <p className="text-sm text-slate-600 mt-1">{item.description}</p>
            <p className="text-xs text-slate-500 mt-2">{item.timestamp}</p>
          </div>
          {item.status && (
            <span className={cn(
              'px-2 py-1 text-xs font-medium rounded-full',
              statusColors[item.status]
            )}>
              {item.status.replace('-', ' ')}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export const CorporateDashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Active Matters',
      value: '247',
      change: { value: 12, trend: 'up' as const, period: 'vs last month' },
      icon: Briefcase,
      variant: 'default' as const
    },
    {
      title: 'Pending Contracts',
      value: '89',
      change: { value: 5, trend: 'down' as const, period: 'vs last month' },
      icon: FileText,
      variant: 'warning' as const
    },
    {
      title: 'Compliance Score',
      value: '94%',
      change: { value: 2, trend: 'up' as const, period: 'vs last quarter' },
      icon: Shield,
      variant: 'success' as const
    },
    {
      title: 'Overdue Tasks',
      value: '23',
      change: { value: 8, trend: 'down' as const, period: 'vs last week' },
      icon: AlertTriangle,
      variant: 'danger' as const
    }
  ]

  const recentActivity: RecentActivityItem[] = [
    {
      id: '1',
      type: 'contract',
      title: 'Vendor Agreement - TechCorp Ltd',
      description: 'Contract renewal requires legal review before expiration',
      timestamp: '2 hours ago',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '2',
      type: 'matter',
      title: 'Employment Dispute Resolution',
      description: 'Mediation scheduled for next week with external counsel',
      timestamp: '4 hours ago',
      status: 'in-progress',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'compliance',
      title: 'GDPR Compliance Audit',
      description: 'Monthly data protection review completed successfully',
      timestamp: '1 day ago',
      status: 'completed',
      priority: 'low'
    },
    {
      id: '4',
      type: 'task',
      title: 'Board Meeting Preparation',
      description: 'Legal documents for Q4 board meeting need finalization',
      timestamp: '2 days ago',
      status: 'overdue',
      priority: 'high'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-corporate-600 to-corporate-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good Morning, John</h1>
            <p className="text-corporate-100 text-lg">
              You have 12 pending tasks and 3 high-priority matters requiring attention.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
              <Activity className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <CorporateButton variant="secondary" size="md">
            View All Tasks
          </CorporateButton>
          <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
            Generate Report
          </CorporateButton>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <CorporateCard variant="elevated" padding="none">
            <CorporateCardHeader 
              title="Recent Activity" 
              subtitle="Latest updates and actions across all legal matters"
              action={
                <CorporateButton variant="ghost" size="sm">
                  View All
                </CorporateButton>
              }
            />
            <CorporateCardContent className="p-0">
              <div className="space-y-1">
                {recentActivity.map((item) => (
                  <ActivityItem key={item.id} item={item} />
                ))}
              </div>
            </CorporateCardContent>
          </CorporateCard>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <CorporateCard variant="elevated" padding="lg">
            <CorporateCardHeader 
              title="Quick Actions" 
              subtitle="Common tasks and shortcuts"
            />
            <CorporateCardContent>
              <div className="space-y-3">
                <CorporateButton variant="outline" fullWidth className="justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Create New Contract
                </CorporateButton>
                <CorporateButton variant="outline" fullWidth className="justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Add Matter
                </CorporateButton>
                <CorporateButton variant="outline" fullWidth className="justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Review
                </CorporateButton>
                <CorporateButton variant="outline" fullWidth className="justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </CorporateButton>
              </div>
            </CorporateCardContent>
          </CorporateCard>

          {/* Upcoming Deadlines */}
          <CorporateCard variant="outlined" padding="lg">
            <CorporateCardHeader 
              title="Upcoming Deadlines" 
              subtitle="Critical dates this week"
            />
            <CorporateCardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <Clock className="w-5 h-5 text-red-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-900">Patent Filing</p>
                    <p className="text-xs text-red-700">Due in 2 days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-900">Contract Review</p>
                    <p className="text-xs text-amber-700">Due in 5 days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">Compliance Audit</p>
                    <p className="text-xs text-blue-700">Due next week</p>
                  </div>
                </div>
              </div>
            </CorporateCardContent>
          </CorporateCard>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CorporateCard variant="elevated" padding="lg">
          <CorporateCardHeader 
            title="Matter Distribution" 
            subtitle="Breakdown by practice area"
            action={
              <CorporateButton variant="ghost" size="sm">
                <PieChart className="w-4 h-4 mr-2" />
                View Details
              </CorporateButton>
            }
          />
          <CorporateCardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <p className="text-slate-500">Chart placeholder - Matter distribution</p>
            </div>
          </CorporateCardContent>
        </CorporateCard>

        <CorporateCard variant="elevated" padding="lg">
          <CorporateCardHeader 
            title="Monthly Trends" 
            subtitle="Legal activities over time"
            action={
              <CorporateButton variant="ghost" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Report
              </CorporateButton>
            }
          />
          <CorporateCardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <p className="text-slate-500">Chart placeholder - Monthly trends</p>
            </div>
          </CorporateCardContent>
        </CorporateCard>
      </div>
    </div>
  )
}
