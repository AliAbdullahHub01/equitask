import React from 'react'
import { Plus, Clock, MessageSquare, Paperclip } from 'lucide-react'

export function Tasks() {
  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 1, title: 'Design landing page mockup', equity: '2.5%', tags: ['Design'], comments: 3 },
        { id: 2, title: 'Setup Supabase schemas', equity: '1.0%', tags: ['Backend'], comments: 0 },
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: 3, title: 'Implement JWT Auth', equity: '3.0%', tags: ['Security'], comments: 5 },
      ]
    },
    {
      id: 'review',
      title: 'In Review',
      tasks: [
        { id: 4, title: 'Fix mobile navigation bug', equity: '0.5%', tags: ['Bug'], comments: 12 },
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 5, title: 'Project Initialization', equity: '1.0%', tags: ['Setup'], comments: 1 },
      ]
    }
  ]

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-2xl font-bold text-white">Task Board</h2>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map(column => (
            <div key={column.id} className="w-80 flex flex-col bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center sticky top-0">
                <h3 className="font-semibold text-slate-200">{column.title}</h3>
                <span className="bg-slate-700 text-slate-300 text-xs font-bold px-2 py-1 rounded-full">
                  {column.tasks.length}
                </span>
              </div>
              <div className="p-3 flex-1 overflow-y-auto space-y-3">
                {column.tasks.map(task => (
                  <div key={task.id} className="bg-slate-700/50 hover:bg-slate-700 border border-slate-600 p-4 rounded-lg cursor-grab active:cursor-grabbing transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-1.5 flex-wrap">
                        {task.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-blue-500/20 text-blue-300 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20 whitespace-nowrap">
                        {task.equity} Eq
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-200 mb-4">{task.title}</p>
                    <div className="flex items-center justify-between text-slate-400 text-xs">
                      <div className="flex items-center gap-3">
                        {task.comments > 0 && (
                          <div className="flex items-center gap-1 hover:text-slate-200">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{task.comments}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 hover:text-slate-200">
                          <Paperclip className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-slate-700" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
