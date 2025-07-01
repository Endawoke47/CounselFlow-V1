'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '../components/ui/Navigation'
import { Card, Button, Badge, Notification, Modal, LoadingSpinner, Divider } from '../components/ui/UIComponents'

export default function CounselFlowApp() {
  const [activeModule, setActiveModule] = useState('dashboard')
  const [showWelcome, setShowWelcome] = useState(true)
  const [notifications, setNotifications] = useState<Array<{
    id: number
    type: 'success' | 'warning' | 'error' | 'info'
    title: string
    message: string
  }>>([])
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Welcome notification
    setTimeout(() => {
      addNotification('success', 'Welcome to CounselFlow', 'Your AI-native legal operating system is ready.')
    }, 1000)
  }, [])

  const addNotification = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, type, title, message }])
  }

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const handleModuleSelect = (moduleId: string) => {
    setActiveModule(moduleId)
    setShowWelcome(false)
    addNotification('info', 'Module Switched', `Now viewing ${moduleId.charAt(0).toUpperCase() + moduleId.slice(1)} module`)
  }

  if (showWelcome) {
    return <WelcomeScreen onEnter={() => setShowWelcome(false)} />
  }

  return (
    <div style={{ background: '#0F172A', minHeight: '100vh' }}>
      <Navigation onModuleSelect={handleModuleSelect} activeModule={activeModule} />
      
      {/* Main Content Area */}
      <main style={{
        marginLeft: '280px',
        padding: '2rem',
        paddingBottom: '100px',
        minHeight: '100vh'
      }} className="mobile-full">
        <ModuleContent 
          activeModule={activeModule} 
          onShowModal={() => setShowModal(true)}
          onAddNotification={addNotification}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </main>

      {/* Notifications */}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={() => removeNotification(notification.id)}
        />
      ))}

      {/* Example Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Contract Details"
        size="large"
      >
        <div style={{ color: '#94A3B8' }}>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>Service Agreement - TechCorp Inc.</h3>
          <p style={{ marginBottom: '1rem' }}>
            This comprehensive service agreement outlines the terms and conditions for legal services 
            provided to TechCorp Inc. The contract includes provisions for intellectual property, 
            confidentiality, and dispute resolution.
          </p>
          <Divider />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', margin: '1rem 0' }}>
            <div>
              <strong style={{ color: 'white' }}>Contract Value:</strong>
              <p>$250,000</p>
            </div>
            <div>
              <strong style={{ color: 'white' }}>Duration:</strong>
              <p>12 months</p>
            </div>
            <div>
              <strong style={{ color: 'white' }}>Status:</strong>
              <p><Badge variant="warning">Under Review</Badge></p>
            </div>
            <div>
              <strong style={{ color: 'white' }}>Next Action:</strong>
              <p>Client signature required</p>
            </div>
          </div>
          <Divider />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary">
              Send for Signature
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 25%, #334155 50%, #475569 75%, #64748B 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '800px',
        animation: 'fadeInUp 1s ease-out'
      }}>
        {/* Logo */}
        <div style={{
          width: '120px',
          height: '120px',
          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          margin: '0 auto 2rem',
          boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3)',
          animation: 'pulse 3s infinite'
        }}>
          ⚖️
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '4rem',
          fontWeight: '800',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #34D399)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: '1.1'
        }}>
          CounselFlow
        </h1>

        <p style={{
          fontSize: '1.5rem',
          color: '#94A3B8',
          marginBottom: '0.5rem',
          fontWeight: '300'
        }}>
          AI-Native Legal Operating System
        </p>

        <p style={{
          fontSize: '1.1rem',
          color: '#64748B',
          marginBottom: '3rem',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto 3rem'
        }}>
          Experience the future of legal practice with revolutionary AI-powered workflow automation, 
          advanced analytics, and comprehensive case management in one unified platform.
        </p>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {[
            { icon: '🤖', title: 'AI-Powered', desc: 'Intelligent legal assistance' },
            { icon: '📊', title: 'Advanced Analytics', desc: 'Real-time insights' },
            { icon: '🔒', title: 'Enterprise Security', desc: 'Military-grade protection' },
            { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized performance' }
          ].map((feature, index) => (
            <div key={index} style={{
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(148, 163, 184, 0.1)',
              borderRadius: '16px',
              padding: '2rem 1rem',
              animation: `fadeInUp 1s ease-out ${index * 0.1}s both`
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                {feature.icon}
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#94A3B8',
                fontSize: '0.9rem'
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          variant="primary"
          size="large"
          onClick={onEnter}
        >
          🚀 Enter CounselFlow
        </Button>

        <p style={{
          color: '#64748B',
          fontSize: '0.9rem',
          marginTop: '2rem'
        }}>
          Trusted by elite law firms and corporate legal departments worldwide
        </p>
      </div>
    </div>
  )
}

function ModuleContent({ 
  activeModule, 
  onShowModal, 
  onAddNotification,
  isLoading,
  setIsLoading 
}: { 
  activeModule: string
  onShowModal: () => void
  onAddNotification: (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}) {
  const handleAction = (action: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onAddNotification('success', 'Action Completed', `${action} has been successfully executed.`)
    }, 2000)
  }

  switch (activeModule) {
    case 'dashboard':
      return <DashboardModule onShowModal={onShowModal} onAction={handleAction} isLoading={isLoading} />
    case 'analytics':
      return <AnalyticsModule onAction={handleAction} isLoading={isLoading} />
    case 'contracts':
      return <ContractsModule onShowModal={onShowModal} onAction={handleAction} isLoading={isLoading} />
    case 'matters':
      return <MattersModule onAction={handleAction} isLoading={isLoading} />
    case 'ai-assistant':
      return <AIAssistantModule onAction={handleAction} isLoading={isLoading} />
    default:
      return <DashboardModule onShowModal={onShowModal} onAction={handleAction} isLoading={isLoading} />
  }
}

function DashboardModule({ onShowModal, onAction, isLoading }: { onShowModal: () => void, onAction: (action: string) => void, isLoading: boolean }) {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '0.5rem'
        }}>
          Welcome to CounselFlow
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>
          Your AI-native legal operating system dashboard
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { title: 'Active Matters', value: '23', change: '+3 this week', color: '#3B82F6', icon: '⚖️' },
          { title: 'Pending Reviews', value: '8', change: '2 urgent', color: '#F59E0B', icon: '📋' },
          { title: 'Contracts Due', value: '5', change: 'Next 30 days', color: '#EF4444', icon: '📄' },
          { title: 'AI Insights', value: '12', change: 'New recommendations', color: '#10B981', icon: '🤖' }
        ].map((stat, index) => (
          <Card key={index} hover>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              <h3 style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0 }}>
                {stat.title}
              </h3>
              <div style={{
                width: '40px',
                height: '40px',
                background: `${stat.color}20`,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                {stat.icon}
              </div>
            </div>
            <div style={{
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>
              {stat.value}
            </div>
            <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
              {stat.change}
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '1rem' }}>
          Quick Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <Button variant="primary" onClick={() => onAction('New Matter Created')} disabled={isLoading}>
            {isLoading ? <LoadingSpinner size="small" /> : '⚖️'} New Matter
          </Button>
          <Button variant="outline" onClick={onShowModal}>
            📄 Review Contract
          </Button>
          <Button variant="secondary" onClick={() => onAction('Report Generated')}>
            📊 Generate Report
          </Button>
          <Button variant="ghost" onClick={() => onAction('AI Analysis Started')}>
            🤖 AI Analysis
          </Button>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card>
        <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '1rem' }}>
          Recent Activity
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { action: 'Contract reviewed and approved', client: 'TechCorp Inc.', time: '2 hours ago', status: 'completed', priority: 'high' },
            { action: 'Matter status updated', client: 'Global Industries', time: '4 hours ago', status: 'pending', priority: 'medium' },
            { action: 'AI analysis completed', client: 'StartupXYZ', time: '6 hours ago', status: 'completed', priority: 'low' }
          ].map((activity, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '10px'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'white', marginBottom: '0.25rem', fontWeight: '500' }}>
                  {activity.action}
                </div>
                <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
                  {activity.client}
                </div>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Badge 
                  variant={activity.priority === 'high' ? 'error' : activity.priority === 'medium' ? 'warning' : 'success'} 
                  size="small"
                >
                  {activity.priority}
                </Badge>
                <Badge 
                  variant={activity.status === 'completed' ? 'success' : 'warning'} 
                  size="small"
                >
                  {activity.status}
                </Badge>
                <div style={{ color: '#64748B', fontSize: '0.8rem', minWidth: '80px' }}>
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function AnalyticsModule({ onAction, isLoading }: { onAction: (action: string) => void, isLoading: boolean }) {
  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>
        📊 Advanced Analytics
      </h1>
      
      <div style={{ display: 'grid', gap: '2rem' }}>
        <Card>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>Performance Metrics</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { metric: 'Case Success Rate', value: '94.2%', trend: '+5.3%' },
              { metric: 'Avg. Resolution Time', value: '18.5 days', trend: '-12%' },
              { metric: 'Client Satisfaction', value: '4.8/5', trend: '+0.2' },
              { metric: 'Revenue Growth', value: '+23%', trend: 'YoY' }
            ].map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', fontSize: '2rem', fontWeight: '700' }}>
                  {item.value}
                </div>
                <div style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                  {item.metric}
                </div>
                <Badge variant="success" size="small">{item.trend}</Badge>
              </div>
            ))}
          </div>
        </Card>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <Card>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>AI Predictions</h4>
            <p style={{ color: '#94A3B8', marginBottom: '1rem' }}>
              Based on current data trends and case patterns
            </p>
            <Button variant="primary" onClick={() => onAction('AI Prediction Generated')} disabled={isLoading}>
              {isLoading ? <LoadingSpinner size="small" /> : '🤖'} Generate Predictions
            </Button>
          </Card>
          
          <Card>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Risk Assessment</h4>
            <p style={{ color: '#94A3B8', marginBottom: '1rem' }}>
              Comprehensive risk analysis across all active matters
            </p>
            <Button variant="outline" onClick={() => onAction('Risk Analysis Completed')}>
              🛡️ Run Analysis
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ContractsModule({ onShowModal, onAction, isLoading }: { onShowModal: () => void, onAction: (action: string) => void, isLoading: boolean }) {
  const contracts = [
    { name: 'Service Agreement - TechCorp', status: 'Under Review', value: '$250K', due: '2025-07-15', priority: 'high' },
    { name: 'NDA - Global Industries', status: 'Signed', value: '-', due: '2025-12-31', priority: 'low' },
    { name: 'Partnership Agreement', status: 'Draft', value: '$1.2M', due: '2025-08-01', priority: 'medium' }
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '700' }}>
          📄 Contract Management
        </h1>
        <Button variant="primary" onClick={() => onAction('New Contract Created')} disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="small" /> : '+'} New Contract
        </Button>
      </div>

      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {contracts.map((contract, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem',
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '12px',
              cursor: 'pointer'
            }} onClick={onShowModal}>
              <div>
                <div style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {contract.name}
                </div>
                <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
                  Due: {contract.due} • Value: {contract.value}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Badge 
                  variant={contract.priority === 'high' ? 'error' : contract.priority === 'medium' ? 'warning' : 'success'} 
                  size="small"
                >
                  {contract.priority}
                </Badge>
                <Badge 
                  variant={contract.status === 'Signed' ? 'success' : contract.status === 'Under Review' ? 'warning' : 'info'} 
                  size="small"
                >
                  {contract.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function MattersModule({ onAction, isLoading }: { onAction: (action: string) => void, isLoading: boolean }) {
  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>
        ⚖️ Matter Management
      </h1>
      
      <Card>
        <p style={{ color: '#94A3B8', textAlign: 'center', padding: '2rem' }}>
          Matter management interface coming soon. This will include case tracking, 
          timeline management, and collaboration tools.
        </p>
        <div style={{ textAlign: 'center' }}>
          <Button variant="primary" onClick={() => onAction('Matter Created')} disabled={isLoading}>
            {isLoading ? <LoadingSpinner size="small" /> : '⚖️'} Create New Matter
          </Button>
        </div>
      </Card>
    </div>
  )
}

function AIAssistantModule({ onAction, isLoading }: { onAction: (action: string) => void, isLoading: boolean }) {
  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>
        🤖 AI Legal Assistant
      </h1>
      
      <Card>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            margin: '0 auto 1rem'
          }}>
            🤖
          </div>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>AI-Powered Legal Intelligence</h3>
          <p style={{ color: '#94A3B8', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Get instant legal insights, document analysis, and smart recommendations 
            powered by advanced AI technology.
          </p>
          <Button variant="primary" onClick={() => onAction('AI Assistant Activated')} disabled={isLoading} size="large">
            {isLoading ? <LoadingSpinner size="small" /> : '✨'} Start AI Analysis
          </Button>
        </div>
      </Card>
    </div>
  )
}
