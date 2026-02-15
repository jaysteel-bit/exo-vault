'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { VaultGate } from '@/components/VaultGate'

// Resource data types
interface Resource {
  id: string
  title: string
  description: string
  category: 'sales' | 'operations' | 'hiring' | 'strategy'
  tier: 'public' | 'vault' | 'elite'
  type: 'pdf' | 'video' | 'template' | 'tool'
  icon: string
  downloadUrl?: string
}

// Resource data
const resources: Resource[] = [
  // Public Floor
  {
    id: 'roadmap',
    title: 'The EXO Scaling Roadmap',
    description: 'Your 90-day operational transformation blueprint. Step-by-step guide to building a self-running enterprise.',
    category: 'strategy',
    tier: 'public',
    type: 'pdf',
    icon: 'solar:map-linear',
    downloadUrl: '#'
  },
  {
    id: 'chaos-diagnostic',
    title: 'Operational Chaos Diagnostic',
    description: 'Self-assessment tool to identify your biggest bottlenecks across sales, operations, and hiring.',
    category: 'operations',
    tier: 'public',
    type: 'tool',
    icon: 'solar:clipboard-check-linear',
    downloadUrl: '#'
  },
  {
    id: 'quick-wins',
    title: '10 AI Quick Wins Guide',
    description: 'Immediate actions you can take today to automate 10+ hours of weekly work.',
    category: 'operations',
    tier: 'public',
    type: 'pdf',
    icon: 'solar:bolt-linear',
    downloadUrl: '#'
  },
  // Exo Vault
  {
    id: 'hiring-archetypes',
    title: 'Hiring Archetypes for the AI Era',
    description: 'Complete job description templates and interview frameworks for building an AI-native team.',
    category: 'hiring',
    tier: 'vault',
    type: 'template',
    icon: 'solar:users-group-rounded-linear',
    downloadUrl: '#'
  },
  {
    id: 'process-maps',
    title: 'Process Map Templates',
    description: 'Visual SOP templates for documenting and automating your core business operations.',
    category: 'operations',
    tier: 'vault',
    type: 'template',
    icon: 'solar:document-add-linear',
    downloadUrl: '#'
  },
  {
    id: 'pipeline-tracker',
    title: 'Sales Pipeline Tracker',
    description: 'Advanced Notion template for tracking deals, automating follow-ups, and forecasting revenue.',
    category: 'sales',
    tier: 'vault',
    type: 'template',
    icon: 'solar:graph-new-linear',
    downloadUrl: '#'
  },
  {
    id: 'handoff-scripts',
    title: 'Automated Handoff Scripts',
    description: 'Email and Slack templates for seamless handoffs between sales, delivery, and support.',
    category: 'sales',
    tier: 'vault',
    type: 'template',
    icon: 'solar:chat-round-dots-linear',
    downloadUrl: '#'
  },
  {
    id: 'onboarding-framework',
    title: 'New Hire Onboarding Framework',
    description: '30-60-90 day onboarding templates that get new team members productive 3x faster.',
    category: 'hiring',
    tier: 'vault',
    type: 'pdf',
    icon: 'solar:user-plus-linear',
    downloadUrl: '#'
  },
  {
    id: 'ai-workflow-library',
    title: 'AI Workflow Library',
    description: 'Pre-built automation workflows for Make, Zapier, and n8n ready to deploy.',
    category: 'operations',
    tier: 'vault',
    type: 'template',
    icon: 'solar:magic-stick-linear',
    downloadUrl: '#'
  },
  // Elite Floor
  {
    id: 'flow-os-config',
    title: 'Flow OS Custom Configuration',
    description: 'Complete Flow OS setup with custom dashboards, automations, and AI integrations.',
    category: 'operations',
    tier: 'elite',
    type: 'tool',
    icon: 'solar:settings-minimalistic-linear'
  },
  {
    id: 'revenue-accelerator',
    title: 'Revenue Accelerator Playbook',
    description: 'Proven strategies and scripts for 3x revenue growth within 90 days.',
    category: 'sales',
    tier: 'elite',
    type: 'pdf',
    icon: 'solar:chart-2-linear'
  },
  {
    id: 'ai-department',
    title: 'AI Department Blueprint',
    description: 'Complete guide to building an AI-powered department from scratch.',
    category: 'strategy',
    tier: 'elite',
    type: 'video',
    icon: 'solar:cpu-bolt-linear'
  },
  {
    id: 'executive-dashboard',
    title: 'Executive Dashboard Suite',
    description: 'Real-time KPI dashboards with predictive analytics and AI insights.',
    category: 'strategy',
    tier: 'elite',
    type: 'tool',
    icon: 'solar:widget-linear'
  }
]

// Filter categories
const categories = [
  { id: 'all', label: 'All Resources', icon: 'solar:widget-2-linear' },
  { id: 'sales', label: 'Sales', icon: 'solar:graph-new-linear' },
  { id: 'operations', label: 'Operations', icon: 'solar:settings-linear' },
  { id: 'hiring', label: 'Hiring', icon: 'solar:users-group-rounded-linear' },
  { id: 'strategy', label: 'Strategy', icon: 'solar:compass-linear' }
]

// Resource Card Component
function ResourceCard({
  resource,
  onEliteClick
}: {
  resource: Resource
  onEliteClick: (resource: Resource) => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const isElite = resource.tier === 'elite'
  const isPublic = resource.tier === 'public'

  const getTierStyles = () => {
    if (isElite) {
      return 'border-violet-500/30 hover:border-violet-500/50'
    }
    if (isPublic) {
      return 'border-emerald-500/20 hover:border-emerald-500/40'
    }
    return 'border-white/10 hover:border-white/20'
  }

  const getTierBadge = () => {
    if (isElite) {
      return (
        <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-wider border border-violet-500/30">
          X-Scale Only
        </span>
      )
    }
    if (isPublic) {
      return (
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
          Free Access
        </span>
      )
    }
    return (
      <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 text-[10px] font-bold uppercase tracking-wider border border-white/10">
        Vault Access
      </span>
    )
  }

  const handleClick = () => {
    if (isElite) {
      onEliteClick(resource)
    } else if (resource.downloadUrl) {
      // In production, this would trigger the actual download
      window.open(resource.downloadUrl, '_blank')
    }
  }

  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group ${getTierStyles()}`}
      style={{
        backgroundColor: isElite ? 'rgba(139, 92, 246, 0.05)' : 'rgba(17, 17, 17, 0.6)',
        backdropFilter: 'blur(12px)',
        borderWidth: '1px',
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Spotlight Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.05), transparent 80%)`
        }}
      />

      {/* Elite Lock Overlay */}
      {isElite && (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent pointer-events-none z-10">
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>
      )}

      {/* Content */}
      <div className={`relative z-20 p-6 ${isElite ? 'opacity-80' : ''}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isElite
            ? 'bg-violet-500/20 text-violet-400'
            : 'bg-white/5 text-emerald-400'
            }`}>
            <iconify-icon icon={resource.icon} width="24"></iconify-icon>
          </div>
          {getTierBadge()}
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-medium text-white mb-2 group-hover:text-white transition-colors">
          {resource.title}
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed mb-4">
          {resource.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs text-neutral-500 uppercase tracking-wider">
            {resource.type}
          </span>

          {isElite ? (
            <div className="flex items-center gap-2 text-violet-400">
              <iconify-icon icon="solar:shield-keyhole-bold-duotone" width="20"></iconify-icon>
              <span className="text-xs font-medium">Locked</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-400 group-hover:text-emerald-300 transition-colors">
              <span className="text-xs font-medium">
                {isPublic ? 'Download' : 'Access'}
              </span>
              <iconify-icon
                icon="solar:arrow-right-linear"
                width="16"
                className="transform group-hover:translate-x-1 transition-transform"
              ></iconify-icon>
            </div>
          )}
        </div>
      </div>

      {/* Elite Lock Icon */}
      {isElite && (
        <div className="absolute top-4 right-4 z-30">
          <div className="w-8 h-8 rounded-full bg-violet-500/30 flex items-center justify-center">
            <iconify-icon icon="solar:lock-linear" width="16" className="text-violet-400"></iconify-icon>
          </div>
        </div>
      )}
    </div>
  )
}

// Elite Gateway Modal Component
function EliteModal({
  isOpen,
  onClose,
  resource
}: {
  isOpen: boolean
  onClose: () => void
  resource: Resource | null
}) {
  if (!isOpen || !resource) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 modal-backdrop" />

      {/* Modal Content */}
      <div
        className="relative z-10 w-full max-w-lg glass-panel rounded-3xl p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
        >
          <iconify-icon icon="solar:close-circle-linear" width="24"></iconify-icon>
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center mx-auto mb-6">
          <iconify-icon icon="solar:shield-keyhole-bold-duotone" width="32" className="text-violet-400"></iconify-icon>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-light text-white text-center mb-3">
          Reserved for <span className="font-serif italic text-violet-400">Self-Running Enterprises</span>
        </h2>

        {/* Description */}
        <p className="text-neutral-400 text-center mb-2">
          <span className="text-white font-medium">{resource.title}</span>
        </p>
        <p className="text-neutral-500 text-sm text-center mb-8 leading-relaxed">
          This framework is a core component of the Exo Capability Stack. It requires specific configuration within Flow OS and is reserved for active X-Scale partners.
        </p>

        {/* Benefits */}
        <div className="bg-white/5 rounded-xl p-4 mb-8">
          <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">X-Scale Partners Receive:</p>
          <ul className="space-y-2">
            {[
              'Full access to all Elite resources',
              'Custom Flow OS configuration',
              '90-day implementation support',
              'Weekly strategy sessions'
            ].map((benefit, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                <iconify-icon icon="solar:check-circle-linear" width="16" className="text-emerald-400"></iconify-icon>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <a
          href="#"
          className="w-full py-4 bg-violet-500 hover:bg-violet-400 text-white font-bold tracking-wide rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)] transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          Book Systems Audit
          <iconify-icon icon="solar:arrow-right-linear" width="18"></iconify-icon>
        </a>

        <p className="text-center text-[10px] text-neutral-600 uppercase tracking-wider mt-4">
          No commitment required • Free consultation
        </p>
      </div>
    </div>
  )
}

// Main Content Component
function VaultContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Gate State
  const [isGateOpen, setIsGateOpen] = useState(false);
  const userParam = searchParams.get('user');
  const [userName, setUserName] = useState<string | null>(null);

  // Logic to determine if gate should be open
  useEffect(() => {
    // 1. If explicit ?user=Name available, allow access
    if (userParam) {
      setUserName(decodeURIComponent(userParam));
      setIsGateOpen(true);
      return;
    }

    // 2. Check LocalStorage (if they signed up previously on this device)
    const storedUser = localStorage.getItem('exo_vault_user');
    if (storedUser) {
      setUserName(storedUser);
      setIsGateOpen(true);
    }

    // Otherwise, keep gate closed
  }, [userParam]);

  const handleGateUnlock = (name: string) => {
    setUserName(name);
    setIsGateOpen(true);
    // Persist to LocalStorage so they don't have to sign in every reload
    localStorage.setItem('exo_vault_user', name);
  };


  // Handle entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // Separate resources by tier for display
  const publicResources = filteredResources.filter(r => r.tier === 'public')
  const vaultResources = filteredResources.filter(r => r.tier === 'vault')
  const eliteResources = filteredResources.filter(r => r.tier === 'elite')

  const handleEliteClick = useCallback((resource: Resource) => {
    setSelectedResource(resource)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedResource(null), 300)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 antialiased">
      {/* Soft Gate */}
      {!isGateOpen && (
        <VaultGate onUnlock={handleGateUnlock} />
      )}

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-violet-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Navigation */}
      <nav className="w-full z-50 border-b border-white/5 bg-neutral-950/50 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors overflow-hidden">
              {/* Nav Logo */}
              <img src="/favicon.png" alt="Exo" className="w-full h-full object-contain" />
            </div>
            <span className="text-md font-medium tracking-tight text-white/90">Exo Vault</span>
          </a>

          <div className="flex items-center gap-4">
            {userName && (
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span>{userName}</span>
              </div>
            )}
            <a
              href="https://exoent.co/"
              className="hidden sm:flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Home
              <iconify-icon icon="solar:arrow-right-up-linear"></iconify-icon>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-12 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Hero Header */}
          <div className={`text-center mb-12 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                {userName ? 'Master Key Active' : 'Vault Access'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight mb-4">
              {userName ? (
                <>
                  Welcome back, <span className="font-serif italic text-emerald-400">{userName}</span>.<br />
                  Your Vault is Active.
                </>
              ) : (
                <>
                  Welcome to the <span className="font-serif italic text-emerald-400">Exo Vault</span>.
                </>
              )}
            </h1>

            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Your resource library for building self-running enterprises. Download frameworks, templates, and tools designed to operationalize your growth.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className={`mb-10 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="glass-panel rounded-2xl p-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <iconify-icon
                    icon="solar:magnifer-linear"
                    width="20"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                  ></iconify-icon>
                  <input
                    type="search"
                    placeholder="Query the Vault..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2 ${activeCategory === cat.id
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/5 text-neutral-400 border border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                      <iconify-icon icon={cat.icon} width="14"></iconify-icon>
                      <span className="hidden sm:inline">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="space-y-12">

            {/* Public Floor Section */}
            {publicResources.length > 0 && (
              <section className={`transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <iconify-icon icon="solar:unlock-linear" width="18" className="text-emerald-400"></iconify-icon>
                  </div>
                  <h2 className="text-xl font-medium text-white">Free Access</h2>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">No signup required</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {publicResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onEliteClick={handleEliteClick}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Exo Vault Section */}
            {vaultResources.length > 0 && (
              <section className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <iconify-icon icon="solar:key-linear" width="18" className="text-white"></iconify-icon>
                  </div>
                  <h2 className="text-xl font-medium text-white">The Exo Vault</h2>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">Lead access</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vaultResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onEliteClick={handleEliteClick}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Elite Floor Section */}
            {eliteResources.length > 0 && (
              <section className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                    <iconify-icon icon="solar:crown-linear" width="18" className="text-violet-400"></iconify-icon>
                  </div>
                  <h2 className="text-xl font-medium text-white">Elite Resources</h2>
                  <span className="text-xs text-violet-400 uppercase tracking-wider">X-Scale Partners Only</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {eliteResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onEliteClick={handleEliteClick}
                    />
                  ))}
                </div>

                {/* Elite CTA Banner */}
                <div className="mt-8 glass-panel rounded-2xl p-6 border border-violet-500/20 bg-gradient-to-r from-violet-500/5 to-transparent">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                        <iconify-icon icon="solar:shield-keyhole-bold-duotone" width="24" className="text-violet-400"></iconify-icon>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Unlock the Complete Capability Stack</h3>
                        <p className="text-sm text-neutral-400">X-Scale partners get full access to all Elite resources and implementation support.</p>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="px-6 py-3 bg-violet-500 hover:bg-violet-400 text-white font-bold tracking-wide rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)] whitespace-nowrap"
                    >
                      Book Systems Audit
                    </a>
                  </div>
                </div>
              </section>
            )}

            {/* No Results */}
            {filteredResources.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <iconify-icon icon="solar:document-text-linear" width="32" className="text-neutral-500"></iconify-icon>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No resources found</h3>
                <p className="text-neutral-400">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-xs text-neutral-700 border-t border-white/5 bg-neutral-950 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>&copy; 2026 Exo Enterprise LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://exoent.co/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="https://exoent.co/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="mailto:exo.corpmail@gmail.com" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <iconify-icon icon="solar:chat-round-dots-linear" width="14"></iconify-icon>
              Need Help?
            </a>
          </div>
        </div>
      </footer>

      {/* Elite Gateway Modal */}
      <EliteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        resource={selectedResource}
      />
    </div>
  )
}

// Main Page Component with Suspense boundary
export default function VaultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <iconify-icon icon="solar:box-minimalistic-bold" width="32" className="text-emerald-400"></iconify-icon>
          </div>
          <p className="text-neutral-400">Loading Vault...</p>
        </div>
      </div>
    }>
      <VaultContent />
    </Suspense>
  )
}
