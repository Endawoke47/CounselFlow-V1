import React, { useState } from 'react'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard } from '@/components/corporate/CorporateCard'
import { CorporateButton } from '@/components/corporate/CorporateButton'
import { 
  Plus, 
  Search, 
  Building, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Users,
  Briefcase
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Entity {
  id: string
  name: string
  type: string
  jurisdiction: string
  status: 'active' | 'inactive' | 'pending' | 'dissolved'
  incorporationDate: string
  nextFilingDate: string
  directors: number
  shareholders: number
}

const mockEntities: Entity[] = [
  {
    id: 'E001',
    name: 'CounselFlow Technologies Inc.',
    type: 'Corporation',
    jurisdiction: 'Delaware',
    status: 'active',
    incorporationDate: '2020-01-15',
    nextFilingDate: '2024-03-15',
    directors: 5,
    shareholders: 12
  },
  {
    id: 'E002',
    name: 'CF Holdings LLC',
    type: 'Limited Liability Company',
    jurisdiction: 'Nevada',
    status: 'active',
    incorporationDate: '2021-06-01',
    nextFilingDate: '2024-02-28',
    directors: 3,
    shareholders: 8
  },
  {
    id: 'E003',
    name: 'Legal Services Subsidiary',
    type: 'Subsidiary',
    jurisdiction: 'California',
    status: 'pending',
    incorporationDate: '2023-12-01',
    nextFilingDate: '2024-01-31',
    directors: 2,
    shareholders: 1
  }
]

const statusConfig = {
  active: { color: 'text-emerald-700 bg-emerald-100', icon: CheckCircle },
  inactive: { color: 'text-slate-700 bg-slate-100', icon: Clock },
  pending: { color: 'text-amber-700 bg-amber-100', icon: AlertTriangle },
  dissolved: { color: 'text-red-700 bg-red-100', icon: AlertTriangle }
}

const EntityCard: React.FC<{ entity: Entity }> = ({ entity }) => {
  const StatusIcon = statusConfig[entity.status].icon
  const isFilingDue = new Date(entity.nextFilingDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  return (
    <CorporateCard variant="elevated" padding="lg" hover interactive>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-slate-900">{entity.name}</h3>
              {isFilingDue && (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                  Filing Due
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 flex items-center">
              <Building className="w-4 h-4 mr-1" />
              {entity.type} • {entity.jurisdiction}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center space-x-2">
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1',
            statusConfig[entity.status].color
          )}>
            <StatusIcon className="w-3 h-3" />
            <span>{entity.status}</span>
          </span>
        </div>

        {/* Entity Details */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>Inc: {new Date(entity.incorporationDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <FileText className="w-4 h-4" />
              <span>Next Filing: {new Date(entity.nextFilingDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Users className="w-4 h-4" />
              <span>{entity.directors} Directors</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Briefcase className="w-4 h-4" />
              <span>{entity.shareholders} Shareholders</span>
            </div>
          </div>
        </div>
      </div>
    </CorporateCard>
  )
}

const CompanySecretarial: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const stats = {
    total: mockEntities.length,
    active: mockEntities.filter(e => e.status === 'active').length,
    pending: mockEntities.filter(e => e.status === 'pending').length,
    filingsDue: mockEntities.filter(e => 
      new Date(e.nextFilingDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    ).length
  }

  return (
    <CorporateLayout
      title="Company Secretarial"
      subtitle="Manage corporate entities, governance, and regulatory compliance"
      actions={
        <CorporateButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          New Entity
        </CorporateButton>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <CorporateCard variant="flat" padding="lg" className="border-l-4 border-corporate-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Entities</p>
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <Building className="w-8 h-8 text-corporate-500" />
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
              <p className="text-sm font-medium text-slate-600">Pending</p>
              <p className="text-3xl font-bold text-slate-900">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </CorporateCard>
        
        <CorporateCard variant="flat" padding="lg" className="border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Filings Due</p>
              <p className="text-3xl font-bold text-slate-900">{stats.filingsDue}</p>
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
              placeholder="Search entities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
            />
          </div>
        </div>
      </CorporateCard>

      {/* Entities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockEntities.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
    </CorporateLayout>
  )
}

export default CompanySecretarial
