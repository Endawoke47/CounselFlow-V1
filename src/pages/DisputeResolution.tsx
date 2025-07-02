import React, { useState } from 'react'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard } from '@/components/corporate/CorporateCard'
import { CorporateButton } from '@/components/corporate/CorporateButton'
import { 
  Plus, 
  Search, 
  Scale, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  Gavel
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Dispute {
  id: string
  title: string
  plaintiff: string
  defendant: string
  type: string
  status: 'investigation' | 'mediation' | 'arbitration' | 'litigation' | 'settled' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignedCounsel: string
  filingDate: string
  nextHearing?: string
  estimatedValue: number
  description: string
}

const mockDisputes: Dispute[] = [
  {
    id: 'D001',
    title: 'Employment Discrimination Case',
    plaintiff: 'Jane Smith',
    defendant: 'CounselFlow Inc.',
    type: 'Employment',
    status: 'mediation',
    priority: 'high',
    assignedCounsel: 'Michael Chen',
    filingDate: '2023-11-15',
    nextHearing: '2024-01-20',
    estimatedValue: 250000,
    description: 'Former employee alleging discrimination and wrongful termination.'
  },
  {
    id: 'D002',
    title: 'Contract Breach - Vendor Services',
    plaintiff: 'CounselFlow Inc.',
    defendant: 'TechVendor LLC',
    type: 'Commercial',
    status: 'arbitration',
    priority: 'medium',
    assignedCounsel: 'Sarah Johnson',
    filingDate: '2023-10-01',
    nextHearing: '2024-02-05',
    estimatedValue: 500000,
    description: 'Vendor failed to deliver services as per contract specifications.'
  },
  {
    id: 'D003',
    title: 'IP Infringement Claim',
    plaintiff: 'Innovation Corp',
    defendant: 'CounselFlow Inc.',
    type: 'Intellectual Property',
    status: 'investigation',
    priority: 'critical',
    assignedCounsel: 'Emily Rodriguez',
    filingDate: '2023-12-01',
    estimatedValue: 1000000,
    description: 'Patent infringement claim regarding core software algorithms.'
  }
]

const statusConfig = {
  investigation: { color: 'text-blue-700 bg-blue-100', icon: Search },
  mediation: { color: 'text-amber-700 bg-amber-100', icon: Clock },
  arbitration: { color: 'text-purple-700 bg-purple-100', icon: Scale },
  litigation: { color: 'text-red-700 bg-red-100', icon: Gavel },
  settled: { color: 'text-emerald-700 bg-emerald-100', icon: CheckCircle },
  closed: { color: 'text-slate-700 bg-slate-100', icon: CheckCircle }
}

const priorityConfig = {
  low: { color: 'text-slate-600 bg-slate-100' },
  medium: { color: 'text-amber-600 bg-amber-100' },
  high: { color: 'text-orange-600 bg-orange-100' },
  critical: { color: 'text-red-600 bg-red-100' }
}

const DisputeCard: React.FC<{ dispute: Dispute }> = ({ dispute }) => {
  const StatusIcon = statusConfig[dispute.status].icon
  const hasUpcomingHearing = dispute.nextHearing && 
    new Date(dispute.nextHearing) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  return (
    <CorporateCard variant="elevated" padding="lg" hover interactive>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-slate-900">{dispute.title}</h3>
              {hasUpcomingHearing && (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                  Hearing Soon
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600">
              {dispute.plaintiff} vs {dispute.defendant}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center space-x-2">
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1',
            statusConfig[dispute.status].color
          )}>
            <StatusIcon className="w-3 h-3" />
            <span>{dispute.status}</span>
          </span>
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full',
            priorityConfig[dispute.priority].color
          )}>
            {dispute.priority}
          </span>
          <span className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full">
            {dispute.type}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-2">{dispute.description}</p>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <User className="w-4 h-4" />
              <span>{dispute.assignedCounsel}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>Filed: {new Date(dispute.filingDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <DollarSign className="w-4 h-4" />
              <span>${dispute.estimatedValue.toLocaleString()}</span>
            </div>
            {dispute.nextHearing && (
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Gavel className="w-4 h-4" />
                <span>Next: {new Date(dispute.nextHearing).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </CorporateCard>
  )
}

const DisputeResolution: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const stats = {
    total: mockDisputes.length,
    active: mockDisputes.filter(d => !['settled', 'closed'].includes(d.status)).length,
    critical: mockDisputes.filter(d => d.priority === 'critical').length,
    totalValue: mockDisputes.reduce((sum, d) => sum + d.estimatedValue, 0)
  }

  return (
    <CorporateLayout
      title="Dispute Resolution"
      subtitle="Manage litigation, arbitration, and dispute resolution matters"
      actions={
        <CorporateButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          New Dispute
        </CorporateButton>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <CorporateCard variant="flat" padding="lg" className="border-l-4 border-corporate-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Disputes</p>
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <Scale className="w-8 h-8 text-corporate-500" />
          </div>
        </CorporateCard>
        
        <CorporateCard variant="flat" padding="lg" className="border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active</p>
              <p className="text-3xl font-bold text-slate-900">{stats.active}</p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </CorporateCard>
        
        <CorporateCard variant="flat" padding="lg" className="border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Critical</p>
              <p className="text-3xl font-bold text-slate-900">{stats.critical}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </CorporateCard>
        
        <CorporateCard variant="flat" padding="lg" className="border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total at Risk</p>
              <p className="text-3xl font-bold text-slate-900">${(stats.totalValue / 1000000).toFixed(1)}M</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
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
              placeholder="Search disputes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
            />
          </div>
        </div>
      </CorporateCard>

      {/* Disputes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockDisputes.map((dispute) => (
          <DisputeCard key={dispute.id} dispute={dispute} />
        ))}
      </div>
    </CorporateLayout>
  )
}

export default DisputeResolution
