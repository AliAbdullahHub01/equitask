import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, LogOut, Settings, FolderKanban, CheckSquare, Users } from 'lucide-react'

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
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0">
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            EquiTask
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-300 hover:bg-slate-700 hover:text-rose-400 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm flex items-center px-8">
          <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        </header>
        <div className="flex-1 p-8 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
