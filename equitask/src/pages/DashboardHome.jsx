import React from 'react'

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Tasks', value: '12' },
          { label: 'Completed', value: '5' },
          { label: 'Pending', value: '7' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-slate-400 text-sm font-medium mb-2">{stat.label}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 min-h-[400px]">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <p className="text-slate-400 text-sm">No activity to show yet. Awaiting backend implementation.</p>
      </div>
    </div>
  )
}
