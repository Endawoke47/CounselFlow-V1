import React, { useState } from 'react'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from '@/components/corporate/CorporateCard'
import { CorporateButton } from '@/components/corporate/CorporateButton'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  DollarSign,
  Briefcase
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Matter {
  id: string
  title: string
  client: string
  type: string
  status: 'active' | 'pending' | 'completed' | 'on-hold'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo: string
  dueDate: string
  budget: number
  spent: number
  description: string
}

const mockMatters: Matter[] = [
  {
    id: 'M001',
    title: 'Vendor Agreement Renewal - TechCorp',
    client: 'TechCorp Industries',
    type: 'Contract Law',
    status: 'active',
    priority: 'high',
    assignedTo: 'Sarah Johnson',
    dueDate: '2024-01-15',
    budget: 50000,
    spent: 32000,
    description: 'Annual vendor agreement renewal with updated terms and compliance requirements.'
  },
  {
    id: 'M002',
    title: 'Employment Dispute Resolution',
    client: 'Global Manufacturing Inc.',
    type: 'Employment Law',
    status: 'pending',
    priority: 'urgent',
    assignedTo: 'Michael Chen',
    dueDate: '2024-01-10',
    budget: 75000,
    spent: 45000,
    description: 'Mediation and resolution of employment dispute involving senior management.'
  },
  {
    id: 'M003',
    title: 'IP Portfolio Review',
    client: 'Innovation Labs',
    type: 'Intellectual Property',
    status: 'active',
    priority: 'medium',
    assignedTo: 'Emily Rodriguez',
    dueDate: '2024-02-01',
    budget: 100000,
    spent: 25000,
    description: 'Comprehensive review and optimization of intellectual property portfolio.'
  }
]

const statusConfig = {
  active: { color: 'text-blue-700 bg-blue-100', icon: Clock },
  pending: { color: 'text-amber-700 bg-amber-100', icon: AlertTriangle },
  completed: { color: 'text-emerald-700 bg-emerald-100', icon: CheckCircle },
  'on-hold': { color: 'text-slate-700 bg-slate-100', icon: Clock }
}

const priorityConfig = {
  low: { color: 'text-slate-600 bg-slate-100' },
  medium: { color: 'text-amber-600 bg-amber-100' },
  high: { color: 'text-orange-600 bg-orange-100' },
  urgent: { color: 'text-red-600 bg-red-100' }
}

const MatterCard: React.FC<{ matter: Matter }> = ({ matter }) => {
  const StatusIcon = statusConfig[matter.status].icon
  const budgetUtilization = (matter.spent / matter.budget) * 100

  return (
    <CorporateCard variant="elevated" padding="lg" hover interactive>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">{matter.title}</h3>
            <p className="text-sm text-slate-600">{matter.client}</p>
          </div>
          <button className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
            <MoreHorizontal className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Badges */}
        <div className="flex items-center space-x-2">
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1',
            statusConfig[matter.status].color
          )}>
            <StatusIcon className="w-3 h-3" />
            <span>{matter.status.replace('-', ' ')}</span>
          </span>
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full',
            priorityConfig[matter.priority].color
          )}>
            {matter.priority}
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <User className="w-4 h-4" />
              <span>{matter.assignedTo}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>{new Date(matter.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <DollarSign className="w-4 h-4" />
              <span>${matter.spent.toLocaleString()} / ${matter.budget.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  budgetUtilization > 90 ? 'bg-red-500' : 
                  budgetUtilization > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                )}
                style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </CorporateCard>
  )
}

const MatterManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const stats = {
    total: mockMatters.length,
    active: mockMatters.filter(m => m.status === 'active').length,
    pending: mockMatters.filter(m => m.status === 'pending').length,
    urgent: mockMatters.filter(m => m.priority === 'urgent').length
  }

  return (
    <CorporateLayout
      title="Matter Management"
      subtitle="Manage and track all legal matters across your organization"
      actions={
        <CorporateButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          New Matter
        </CorporateButton>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <CorporateCard variant="flat" padding="lg" className="border-l-4 border-corporate-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Matters</p>
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <Briefcase className="w-8 h-8 text-corporate-500" />
          </div>
        </CorporateCard>
        
        <CorporateCard variant="flat" padding="lg" className="border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active</p>
              <p className="text-3xl font-bold text-slate-900">{stats.active}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </CorporateCard>
        
        <CorporateCard variant="flat" padding="lg" className="border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Pending</p>
              <p className="text-3xl font-bold text-slate-900">{stats.pending}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-amber-500" />
          </div>
        </CorporateCard>
        
        <CorporateCard variant="flat" padding="lg" className="border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Urgent</p>
              <p className="text-3xl font-bold text-slate-900">{stats.urgent}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </CorporateCard>
      </div>

      {/* Search */}
      <CorporateCard variant="flat" padding="lg" className="mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search matters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
            />
          </div>
          <CorporateButton variant="outline" size="md">
            <Filter className="w-4 h-4" />
          </CorporateButton>
        </div>
      </CorporateCard>

      {/* Matters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockMatters.map((matter) => (
          <MatterCard key={matter.id} matter={matter} />
        ))}
      </div>
    </CorporateLayout>
  )
}

export default MatterManagement
