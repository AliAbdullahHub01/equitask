import React, { useState, useEffect } from 'react'
import { Trophy, TrendingUp, Award, Loader2, Zap, RefreshCw } from 'lucide-react'
import axios from 'axios'
import API_URL from '../api'

export function TeamEquity() {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const colors = [
    { bg: 'rgba(0,255,163,0.12)', text: '#00FFA3' },
    { bg: 'rgba(129,140,248,0.12)', text: '#818cf8' },
    { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b' },
    { bg: 'rgba(248,113,113,0.12)', text: '#f87171' },
  ]

  const fetchLeaderboard = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    try {
      const response = await axios.get(`${API_URL}/equity/leaderboard/1`)
      const membersWithColors = response.data.map((member, i) => ({
        ...member,
        color: colors[i % colors.length]
      }))
      setTeamMembers(membersWithColors)
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-4">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#00FFA3' }} />
        <p className="text-sm" style={{ color: '#333' }}>Loading leaderboard...</p>
      </div>
    )
  }

  const sortedMembers = [...teamMembers].sort((a, b) => b.points - a.points)
  const leader = sortedMembers[0]
  const totalEquity = sortedMembers.reduce((sum, m) => {
    const val = parseFloat(m.totalEquity?.replace('%', '') || 0)
    return sum + val
  }, 0)

  const medalColors = ['#00FFA3', '#818cf8', '#f59e0b']
  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Team Equity</h2>
          <p className="text-xs mt-1" style={{ color: '#444' }}>Equity distributed automatically when tasks are completed</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Trophy className="w-4 h-4" style={{ color: '#f59e0b' }} />
            <div>
              <p className="text-[10px]" style={{ color: '#444' }}>Total Distributed</p>
              <p className="text-sm font-black" style={{ color: '#00FFA3' }}>{totalEquity.toFixed(1)}%</p>
            </div>
          </div>
          <button
            onClick={() => fetchLeaderboard(true)}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
            style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', color: '#444' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#00FFA3'; e.currentTarget.style.borderColor = 'rgba(0,255,163,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#444'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Leader Card */}
      {leader && (
        <div className="rounded-2xl p-6 relative overflow-hidden" style={{
          background: 'linear-gradient(135deg, rgba(0,255,163,0.06) 0%, rgba(0,0,0,0) 60%)',
          border: '1px solid rgba(0,255,163,0.15)',
        }}>
          {/* Glow blob */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'rgba(0,255,163,0.04)', filter: 'blur(30px)' }} />
          
          <div className="relative flex items-center gap-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black" style={{ background: leader.color?.bg || 'rgba(0,255,163,0.12)', color: leader.color?.text || '#00FFA3', border: '1px solid rgba(0,255,163,0.2)' }}>
                {leader.name?.charAt(0) || 'A'}
              </div>
              <div className="absolute -top-2 -right-2 text-lg">🏆</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4" style={{ color: '#00FFA3' }} />
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#00FFA3' }}>Current Leader</p>
              </div>
              <h3 className="text-xl font-black text-white mb-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{leader.name}</h3>
              <p className="text-xs" style={{ color: '#555' }}>{leader.role} · Secured <span className="font-bold" style={{ color: '#00FFA3' }}>{leader.totalEquity}</span> equity</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black" style={{ color: '#00FFA3', textShadow: '0 0 30px rgba(0,255,163,0.4)' }}>{leader.totalEquity}</p>
              <p className="text-xs" style={{ color: '#444' }}>of the pool</p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="px-5 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          <div className="grid grid-cols-12 text-xs font-bold uppercase tracking-widest" style={{ color: '#2a2a2a' }}>
            <span className="col-span-1">#</span>
            <span className="col-span-4">Member</span>
            <span className="col-span-3">Role</span>
            <span className="col-span-2">Points</span>
            <span className="col-span-2 text-right">Equity</span>
          </div>
        </div>

        {sortedMembers.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center" style={{ color: '#2a2a2a' }}>
            <Award className="w-10 h-10 mb-3" />
            <p className="text-sm font-semibold">No data yet</p>
            <p className="text-xs mt-1">Complete a task to see equity distributed here</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
            {sortedMembers.map((member, idx) => (
              <div key={member.id}
                className="px-5 py-3 grid grid-cols-12 items-center transition-all"
                style={{ background: idx === 0 ? 'rgba(0,255,163,0.02)' : 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.background = '#111'}
                onMouseLeave={e => e.currentTarget.style.background = idx === 0 ? 'rgba(0,255,163,0.02)' : 'transparent'}
              >
                <span className="col-span-1 text-sm font-black" style={{ color: medalColors[idx] || '#333' }}>
                  {medals[idx] || `${idx + 1}`}
                </span>

                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm" style={{ background: member.color?.bg || 'rgba(255,255,255,0.05)', color: member.color?.text || '#555' }}>
                    {member.name?.charAt(0) || '?'}
                  </div>
                  <span className="text-sm font-semibold text-white">{member.name}</span>
                </div>

                <span className="col-span-3 text-xs" style={{ color: '#444' }}>{member.role}</span>

                <div className="col-span-2">
                  <span className="text-sm font-mono font-bold text-white">{member.points.toLocaleString()}</span>
                  <span className="text-xs ml-1" style={{ color: '#333' }}>pts</span>
                </div>

                <div className="col-span-2 flex flex-col items-end gap-1">
                  <span className="text-sm font-black px-2.5 py-0.5 rounded-lg" style={{ background: 'rgba(0,255,163,0.08)', color: '#00FFA3', border: '1px solid rgba(0,255,163,0.15)' }}>
                    {member.totalEquity}
                  </span>
                  <div className="flex items-center gap-0.5 text-xs" style={{ color: '#00cc82' }}>
                    <TrendingUp className="w-3 h-3" />
                    <span>{member.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer hint */}
      <p className="text-center text-xs" style={{ color: '#1f1f1f' }}>
        Equity updates automatically · Drag tasks to Done on the Task Board
      </p>
    </div>
  )
}
