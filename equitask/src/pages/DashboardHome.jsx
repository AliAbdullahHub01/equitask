import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckSquare, Users, FolderKanban, Zap, ArrowRight } from 'lucide-react'
import axios from 'axios'

export function DashboardHome() {
  const [taskCount, setTaskCount] = useState('...')
  const [memberCount, setMemberCount] = useState('...')

  useEffect(() => {
    // Fetch task count
    axios.get('http://localhost:5000/api/tasks/project/1')
      .then(res => setTaskCount(res.data.length))
      .catch(() => setTaskCount('—'))

    // Fetch team member count
    axios.get('http://localhost:5000/api/equity/leaderboard/1')
      .then(res => setMemberCount(res.data.length))
      .catch(() => setMemberCount('—'))
  }, [])

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div className="rounded-2xl p-8 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, rgba(0,255,163,0.06) 0%, rgba(0,0,0,0) 70%)',
        border: '1px solid rgba(0,255,163,0.12)'
      }}>
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'rgba(0,255,163,0.03)', filter: 'blur(40px)' }} />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#00FFA3' }}>Welcome back</p>
          <h2 className="text-3xl font-black tracking-tight mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Hey, Ali 👋</h2>
          <p className="text-sm" style={{ color: '#555' }}>Your EquiTask dashboard is live. Drag tasks to Done to earn equity automatically.</p>
          <Link to="/dashboard/tasks"
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-lg text-sm font-black transition-all"
            style={{ background: '#00FFA3', color: '#020202', boxShadow: '0 0 20px rgba(0,255,163,0.25)' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 35px rgba(0,255,163,0.45)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,163,0.25)'}
          >
            Go to Task Board <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Tasks', value: taskCount, icon: CheckSquare, color: '#00FFA3' },
          { label: 'Team Members', value: memberCount, icon: Users, color: '#818cf8' },
          { label: 'Projects', value: '1', icon: FolderKanban, color: '#f59e0b' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-5 rounded-xl" style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#333' }}>{stat.label}</p>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-3xl font-black" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Quick links */}
      <div className="rounded-xl p-5" style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#333' }}>Quick Actions</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Task Board', desc: 'Manage and move tasks', path: '/dashboard/tasks', icon: CheckSquare },
            { label: 'Team Equity', desc: 'View leaderboard', path: '/dashboard/equity', icon: Zap },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Link key={i} to={item.path}
                className="flex items-center gap-3 p-4 rounded-xl transition-all"
                style={{ background: '#111', border: '1px solid rgba(255,255,255,0.04)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,163,0.2)'; e.currentTarget.style.background = 'rgba(0,255,163,0.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.background = '#111'; }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(0,255,163,0.08)' }}>
                  <Icon className="w-4 h-4" style={{ color: '#00FFA3' }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{item.label}</p>
                  <p className="text-xs" style={{ color: '#444' }}>{item.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto" style={{ color: '#2a2a2a' }} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  )
}
