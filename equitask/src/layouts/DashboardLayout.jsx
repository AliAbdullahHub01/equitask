import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, LogOut, Settings, FolderKanban, CheckSquare, Users, Zap } from 'lucide-react'

export function DashboardLayout() {
  const location = useLocation();

  const navLinks = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
    { path: '/dashboard/tasks', label: 'Task Board', icon: CheckSquare },
    { path: '/dashboard/equity', label: 'Team Equity', icon: Users },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: '#020202' }}>

      {/* Sidebar */}
      <aside className="w-60 flex flex-col shrink-0 border-r" style={{ background: '#060606', borderColor: 'rgba(255,255,255,0.05)' }}>

        {/* Logo */}
        <div className="p-6 pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,255,163,0.12)', border: '1px solid rgba(0,255,163,0.25)' }}>
              <Zap className="w-4 h-4" style={{ color: '#00FFA3' }} />
            </div>
            <span className="text-lg font-black tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Equi<span style={{ color: '#00FFA3' }}>Task</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium"
                style={isActive ? {
                  background: 'rgba(0,255,163,0.08)',
                  color: '#00FFA3',
                  border: '1px solid rgba(0,255,163,0.15)',
                  boxShadow: '0 0 20px rgba(0,255,163,0.05)'
                } : {
                  color: '#444',
                  border: '1px solid transparent',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = '#888'; e.currentTarget.style.background = '#0d0d0d'; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = '#444'; e.currentTarget.style.background = 'transparent'; } }}
              >
                <Icon className="w-4 h-4" />
                {link.label}
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#00FFA3' }} />}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          {/* Demo user pill */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg mb-2" style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: 'rgba(0,255,163,0.15)', color: '#00FFA3' }}>
              A
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Ali</p>
              <p className="text-[10px]" style={{ color: '#333' }}>Demo User</p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium transition-all" style={{ color: '#333' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ff4d4d'; e.currentTarget.style.background = 'rgba(255,77,77,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#333'; e.currentTarget.style.background = 'transparent'; }}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-14 border-b flex items-center px-8 justify-between" style={{ background: 'rgba(6,6,6,0.9)', borderColor: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>
          <h1 className="text-sm font-semibold" style={{ color: '#555' }}>
            {navLinks.find(l => l.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,255,163,0.05)', border: '1px solid rgba(0,255,163,0.15)', color: '#00FFA3' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00FFA3' }} />
            Live
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
