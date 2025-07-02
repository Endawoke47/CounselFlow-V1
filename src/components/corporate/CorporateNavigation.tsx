import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { 
  Home, 
  FileText, 
  Users, 
  Shield, 
  Briefcase, 
  Scale, 
  Book, 
  Settings,
  ChevronDown,
  Search,
  Bell,
  User,
  Menu,
  X
} from 'lucide-react'

interface NavigationItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children?: NavigationItem[]
}

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
    icon: Home
  },
  {
    id: 'matters',
    label: 'Matter Management',
    href: '/matters',
    icon: Briefcase,
    children: [
      { id: 'active-matters', label: 'Active Matters', href: '/matters/active', icon: FileText },
      { id: 'archived-matters', label: 'Archived Matters', href: '/matters/archived', icon: FileText }
    ]
  },
  {
    id: 'contracts',
    label: 'Contract Management',
    href: '/contracts',
    icon: FileText,
    children: [
      { id: 'active-contracts', label: 'Active Contracts', href: '/contracts/active', icon: FileText },
      { id: 'contract-templates', label: 'Templates', href: '/contracts/templates', icon: FileText }
    ]
  },
  {
    id: 'compliance',
    label: 'Compliance & Risk',
    href: '/compliance',
    icon: Shield,
    children: [
      { id: 'risk-dashboard', label: 'Risk Dashboard', href: '/risk-dashboard', icon: Shield },
      { id: 'data-protection', label: 'Data Protection', href: '/data-protection', icon: Shield }
    ]
  },
  {
    id: 'disputes',
    label: 'Dispute Resolution',
    href: '/dispute-resolution',
    icon: Scale
  },
  {
    id: 'corporate',
    label: 'Corporate Secretarial',
    href: '/company-secretarial',
    icon: Users
  },
  {
    id: 'knowledge',
    label: 'Knowledge Management',
    href: '/knowledge-management',
    icon: Book
  }
]

export const CorporateNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const location = useLocation()

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const isActiveRoute = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  const NavItem: React.FC<{ item: NavigationItem; level?: number }> = ({ item, level = 0 }) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)
    const isActive = isActiveRoute(item.href)

    return (
      <li className="w-full">
        <div className="flex items-center w-full">
          <Link
            to={item.href}
            className={cn(
              'flex items-center flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
              level > 0 && 'ml-4 pl-8',
              isActive
                ? 'bg-corporate-100 text-corporate-900 border-r-4 border-corporate-600'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            <item.icon className={cn('w-5 h-5 mr-3 flex-shrink-0', isActive ? 'text-corporate-600' : 'text-slate-500')} />
            <span className="flex-1">{item.label}</span>
          </Link>
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(item.id)}
              className="p-2 mr-2 rounded-md hover:bg-slate-100 transition-colors duration-200"
            >
              <ChevronDown 
                className={cn(
                  'w-4 h-4 text-slate-500 transition-transform duration-200',
                  isExpanded && 'rotate-180'
                )}
              />
            </button>
          )}
        </div>
        {hasChildren && isExpanded && (
          <ul className="mt-2 space-y-1">
            {item.children!.map((child) => (
              <NavItem key={child.id} item={child} level={level + 1} />
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={cn(
        'fixed top-0 left-0 h-full bg-white border-r border-slate-200 shadow-lg z-50 transition-transform duration-300 ease-in-out',
        'w-80 lg:w-72',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-corporate-600 to-corporate-700 rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">CounselFlow</h1>
              <p className="text-xs text-slate-500">Legal OS</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">John Doe</p>
                <p className="text-xs text-slate-500">Legal Counsel</p>
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200">
              <Settings className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

// Top Navigation Bar
export const CorporateTopNav: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="lg:ml-72 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
            <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500">
              <span>Welcome back, John</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-10 pr-4 py-2 w-80 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
              />
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Profile */}
            <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200">
              <div className="w-8 h-8 bg-corporate-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-corporate-600" />
              </div>
              <span className="hidden md:block text-sm font-medium text-slate-700">John Doe</span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
