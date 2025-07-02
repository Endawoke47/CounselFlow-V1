import React, { useState } from 'react'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard } from '@/components/corporate/CorporateCard'
import { CorporateButton } from '@/components/corporate/CorporateButton'
import { 
  Plus, 
  Search, 
  FileText, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Building
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Contract {
  id: string
  title: string
  counterparty: string
  type: string
  status: 'draft' | 'review' | 'active' | 'expired' | 'terminated'
  value: number
  startDate: string
  endDate: string
  renewalDate?: string
}

const mockContracts: Contract[] = [
  {
    id: 'C001',
    title: 'Software License Agreement',
    counterparty: 'Microsoft Corporation',
    type: 'License',
    status: 'active',
    value: 500000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    renewalDate: '2024-11-01'
  },
  {
    id: 'C002',
    title: 'Vendor Services Agreement',
    counterparty: 'TechCorp Industries',
    type: 'Service',
    status: 'review',
    value: 250000,
    startDate: '2024-02-01',
    endDate: '2025-01-31'
  },
  {
    id: 'C003',
    title: 'Office Lease Agreement',
    counterparty: 'Prime Real Estate',
    type: 'Lease',
    status: 'active',
    value: 1200000,
    startDate: '2023-01-01',
    endDate: '2028-12-31'
  }
]

const statusConfig = {
  draft: { color: 'text-slate-700 bg-slate-100', icon: FileText },
  review: { color: 'text-amber-700 bg-amber-100', icon: Clock },
  active: { color: 'text-emerald-700 bg-emerald-100', icon: CheckCircle },
  expired: { color: 'text-red-700 bg-red-100', icon: AlertTriangle },
  terminated: { color: 'text-slate-700 bg-slate-100', icon: AlertTriangle }
}

const ContractCard: React.FC<{ contract: Contract }> = ({ contract }) => {
  const StatusIcon = statusConfig[contract.status].icon
  const isExpiringSoon = contract.renewalDate && 
    new Date(contract.renewalDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  return (
    <CorporateCard variant="elevated" padding="lg" hover interactive>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-slate-900">{contract.title}</h3>
              {isExpiringSoon && (
                <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                  Renewal Due
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 flex items-center">
              <Building className="w-4 h-4 mr-1" />
              {contract.counterparty}
            </p>
          </div>
        </div>

        {/* Status and Type */}
        <div className="flex items-center space-x-2">
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1',
            statusConfig[contract.status].color
          )}>
            <StatusIcon className="w-3 h-3" />
            <span>{contract.status}</span>
          </span>
          <span className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full">
            {contract.type}
          </span>
        </div>

        {/* Contract Details */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <DollarSign className="w-4 h-4" />
              <span>${contract.value.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>Start: {new Date(contract.startDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-slate-600">
              <span>End: {new Date(contract.endDate).toLocaleDateString()}</span>
            </div>
            {contract.renewalDate && (
              <div className="text-sm text-slate-600">
                <span>Renewal: {new Date(contract.renewalDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </CorporateCard>
  )
}

const Contracts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const stats = {
    total: mockContracts.length,
    active: mockContracts.filter(c => c.status === 'active').length,
    review: mockContracts.filter(c => c.status === 'review').length,
    totalValue: mockContracts.reduce((sum, c) => sum + c.value, 0)
  }

  return (
    <CorporateLayout
      title="Contract Management"
      subtitle="Manage contracts, renewals, and compliance across your organization"
      actions={
        <CorporateButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          New Contract
        </CorporateButton>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <CorporateCard variant="flat" padding="lg" className="border-l-4 border-corporate-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Contracts</p>
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-corporate-500" />
          </div>
        </CorporateCard>
        
        <CorporateCard variant="flat" padding="lg" className="border-l-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active</p>
              <p className="text-3xl font-bold text-slate-900">{stats.active}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
        </CorporateCard>
        
        <CorporateCard variant="flat" padding="lg" className="border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">In Review</p>
              <p className="text-3xl font-bold text-slate-900">{stats.review}</p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </CorporateCard>
        
        <CorporateCard variant="flat" padding="lg" className="border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Value</p>
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
              placeholder="Search contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
            />
          </div>
        </div>
      </CorporateCard>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockContracts.map((contract) => (
          <ContractCard key={contract.id} contract={contract} />
        ))}
      </div>
    </CorporateLayout>
  )
}

export default Contracts
