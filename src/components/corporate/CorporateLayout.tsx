import React from 'react'
import { CorporateNavigation, CorporateTopNav } from './CorporateNavigation'

interface CorporateLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  actions?: React.ReactNode
}

export const CorporateLayout: React.FC<CorporateLayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  actions 
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <CorporateNavigation />
      
      {/* Main Content Area */}
      <div className="lg:ml-72">
        {/* Top Navigation */}
        <CorporateTopNav />
        
        {/* Page Header */}
        {(title || subtitle || actions) && (
          <div className="bg-white border-b border-slate-200 px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                {title && (
                  <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
                )}
                {subtitle && (
                  <p className="mt-2 text-lg text-slate-600">{subtitle}</p>
                )}
              </div>
              {actions && (
                <div className="flex items-center space-x-3">
                  {actions}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Page Content */}
        <main className="px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default CorporateLayout
