import React, { useState, useEffect } from 'react'
import { Folder, MoreVertical, Plus, Loader2, ArrowUpRight, Target } from 'lucide-react'
import axios from 'axios'
import API_URL from '../api'

export function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects`)
        setProjects(response.data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-4">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#00FFA3' }} />
        <p className="text-sm" style={{ color: '#333' }}>Loading projects...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Projects</h2>
          <p className="text-xs mt-1" style={{ color: '#444' }}>Manage your active equity pools and team workspaces</p>
        </div>
        <button className="neon-btn flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group relative rounded-2xl p-6 transition-all duration-300 overflow-hidden" 
            style={{ 
              background: '#0d0d0d', 
              border: '1px solid rgba(255,255,255,0.05)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,255,163,0.15)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(0,255,163,0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
              style={{ background: '#00FFA3', filter: 'blur(30px)' }} />

            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,255,163,0.08)', border: '1px solid rgba(0,255,163,0.1)' }}>
                <Folder className="w-6 h-6" style={{ color: '#00FFA3' }} />
              </div>
              <button className="p-1.5 rounded-lg text-[#333] hover:text-[#00FFA3] hover:bg-[#1a1a1a] transition-all">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{project.name}</h3>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-md" 
                style={{ 
                  background: 'rgba(0,255,163,0.05)', 
                  color: '#00FFA3', 
                  border: '1px solid rgba(0,255,163,0.1)' 
                }}>
                Active
              </span>
              <span className="text-[10px] text-[#444] font-bold uppercase tracking-widest">ID: {String(project.id).slice(0, 8)}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#333' }}>Equity Pool</p>
                <div className="flex items-center gap-1.5">
                  <Target className="w-3 h-3" style={{ color: '#00FFA3' }} />
                  <p className="text-lg font-black text-[#00FFA3]">{project.total_equity_pool || project.totalEquityPool || 100}%</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#333' }}>Contributors</p>
                <p className="text-lg font-black text-white">4</p>
              </div>
            </div>

            {/* Hover Action Link */}
            <div className="mt-6 flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-[#2a2a2a] group-hover:text-[#00FFA3] transition-colors cursor-pointer">
              View Workspace <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        ))}

        {/* Create New Project Placeholder Card */}
        <div className="group rounded-2xl p-6 border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer hover:bg-[rgba(0,255,163,0.02)]" 
          style={{ borderColor: 'rgba(255,255,255,0.03)' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,255,163,0.2)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)'}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Plus className="w-5 h-5 text-[#333] group-hover:text-[#00FFA3]" />
          </div>
          <p className="text-sm font-bold text-[#333] group-hover:text-white transition-colors">Create New Project</p>
        </div>
      </div>
    </div>
  )
}

