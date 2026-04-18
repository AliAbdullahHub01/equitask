import React from 'react'
import { Folder, MoreVertical, Plus } from 'lucide-react'

export function Projects() {
  const projects = [
    { id: 1, name: 'Q3 Marketing Site', status: 'Active', tasks: 12, equity: '15%' },
    { id: 2, name: 'Mobile App Redesign', status: 'Planning', tasks: 24, equity: '40%' },
    { id: 3, name: 'Backend Migration', status: 'Active', tasks: 8, equity: '25%' },
    { id: 4, name: 'User Research', status: 'Completed', tasks: 5, equity: '10%' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                <Folder className="w-6 h-6" />
              </div>
              <button className="text-slate-400 hover:text-white">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
            
            <div className="flex items-center gap-2 mb-6">
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                project.status === 'Completed' ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20' :
                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {project.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-700 pt-4">
              <div>
                <p className="text-sm text-slate-400 mb-1">Open Tasks</p>
                <p className="font-semibold text-slate-200">{project.tasks}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Pool Equity</p>
                <p className="font-semibold text-slate-200">{project.equity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
