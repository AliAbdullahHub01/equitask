import React from 'react'
import { Trophy, TrendingUp, Award } from 'lucide-react'

export function TeamEquity() {
  const teamMembers = [
    { id: 1, name: 'Alice Chen', role: 'Lead Developer', totalEquity: '12.5%', points: 1250, trend: '+2.1%', avatar: 'bg-indigo-500' },
    { id: 2, name: 'Bob Smith', role: 'UI/UX Designer', totalEquity: '8.0%', points: 800, trend: '+1.5%', avatar: 'bg-rose-500' },
    { id: 3, name: 'Charlie Davis', role: 'Product Manager', totalEquity: '15.0%', points: 1500, trend: '+0.5%', avatar: 'bg-emerald-500' },
    { id: 4, name: 'Diana Prince', role: 'Backend Dev', totalEquity: '6.5%', points: 650, trend: '+3.2%', avatar: 'bg-amber-500' },
  ]

  // Sort by equity
  const sortedMembers = [...teamMembers].sort((a, b) => b.points - a.points)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Team Equity</h2>
          <p className="text-slate-400 text-sm">Real-time equity distribution based on completed tasks.</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 flex items-center gap-3">
          <Trophy className="w-5 h-5 text-amber-400" />
          <div>
            <p className="text-xs text-slate-400">Total Pool</p>
            <p className="font-bold text-slate-200">100.0%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Top Performer Highlight */}
        <div className="md:col-span-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30 p-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center border-4 border-slate-900 shadow-xl">
            <span className="text-xl font-bold text-white">{sortedMembers[0].name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Current Leader: {sortedMembers[0].name}</h3>
            </div>
            <p className="text-slate-300 text-sm">Has contributed the most value this sprint. Secured {sortedMembers[0].totalEquity} equity.</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-700 text-slate-400 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Member</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Contribution Points</th>
              <th className="p-4 font-semibold">Total Equity</th>
              <th className="p-4 font-semibold text-right">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {sortedMembers.map((member) => (
              <tr key={member.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${member.avatar} flex items-center justify-center text-white font-bold text-sm shadow-inner`}>
                      {member.name.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-200">{member.name}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-400">{member.role}</td>
                <td className="p-4 font-mono text-slate-300">{member.points} pts</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                    {member.totalEquity}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1 text-emerald-400 font-medium text-sm">
                    <TrendingUp className="w-4 h-4" />
                    {member.trend}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
