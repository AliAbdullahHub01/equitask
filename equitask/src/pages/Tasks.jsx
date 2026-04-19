import React, { useState, useEffect } from 'react'
import { Plus, MessageSquare, Loader2, X, GripVertical } from 'lucide-react'
import axios from 'axios'

export function Tasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskEquity, setNewTaskEquity] = useState('1.0')
  const [dragOverCol, setDragOverCol] = useState(null)
  const [completing, setCompleting] = useState(null) // taskId being completed

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/project/1')
      setTasks(response.data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAddTask = async (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    try {
      const projectId = tasks.length > 0 ? tasks[0].project_id : null
      if (!projectId) {
        console.error('No project loaded yet — cannot add task without a valid project.')
        return
      }
      await axios.post('http://localhost:5000/api/tasks', {
        title: newTaskTitle,
        projectId,
        equityValue: parseFloat(newTaskEquity)
      })
      fetchTasks()
      setNewTaskTitle('')
      setNewTaskEquity('1.0')
      setShowAddModal(false)
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  // --- Drag and Drop ---
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', taskId.toString())
  }

  const handleDragOver = (e, columnId) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverCol(columnId)
  }

  const handleDragLeave = () => {
    setDragOverCol(null)
  }

  const handleDrop = async (e, columnId) => {
    e.preventDefault()
    setDragOverCol(null)
    const taskId = e.dataTransfer.getData('text/plain')

    const task = tasks.find(t => t.id === taskId || t.id === parseInt(taskId))
    if (!task) return
    if (task.status === columnId) return

    // Optimistic UI
    setTasks(prev => prev.map(t => (t.id === task.id) ? { ...t, status: columnId } : t))

    try {
      if (columnId === 'done') {
        setCompleting(task.id)
        await axios.post(`http://localhost:5000/api/tasks/${task.id}/complete`, {
          userName: 'Ali'
        })
        
        // Celebration!
        if (window.confetti) {
          window.confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00FFA3', '#ffffff', '#00cc82']
          });
        }
        
        setCompleting(null)
      } else {
        await axios.put(`http://localhost:5000/api/tasks/${task.id}`, { status: columnId })
      }
      fetchTasks()
    } catch (error) {
      console.error("Error moving task:", error)
      fetchTasks()
      setCompleting(null)
    }
  }

  const columns = [
    { id: 'todo',        title: 'To Do',       color: '#555' },
    { id: 'in-progress', title: 'In Progress',  color: '#f59e0b' },
    { id: 'review',      title: 'In Review',    color: '#818cf8' },
    { id: 'done',        title: 'Done',         color: '#00FFA3' },
  ]

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-4">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#00FFA3' }} />
        <p className="text-sm" style={{ color: '#333' }}>Loading tasks...</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Task Board</h2>
          <p className="text-xs mt-1" style={{ color: '#444' }}>{tasks.length} tasks · Drag to move · Drop to Done to trigger the Equity Engine</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
          style={{ background: '#00FFA3', color: '#020202', boxShadow: '0 0 20px rgba(0,255,163,0.3)' }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 35px rgba(0,255,163,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,163,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {/* Columns */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 h-full min-w-max">
          {columns.map(column => {
            const colTasks = tasks.filter(t => t.status === column.id)
            const isOver = dragOverCol === column.id

            return (
              <div
                key={column.id}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
                className="w-72 flex flex-col rounded-xl transition-all duration-200"
                style={{
                  background: isOver ? 'rgba(0,255,163,0.03)' : '#0a0a0a',
                  border: `1px solid ${isOver ? 'rgba(0,255,163,0.25)' : 'rgba(255,255,255,0.05)'}`,
                  boxShadow: isOver ? '0 0 30px rgba(0,255,163,0.07)' : 'none',
                }}
              >
                {/* Column Header */}
                <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: column.color }} />
                    <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#666' }}>{column.title}</h3>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#444' }}>
                    {colTasks.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="p-2 flex-1 overflow-y-auto space-y-2">
                  {colTasks.map(task => (
                    <div
                      key={task.id}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      className="p-3 rounded-lg cursor-grab active:cursor-grabbing group transition-all duration-150"
                      style={{
                        background: completing === task.id ? 'rgba(0,255,163,0.08)' : '#111',
                        border: completing === task.id ? '1px solid rgba(0,255,163,0.3)' : '1px solid rgba(255,255,255,0.05)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      {/* Top row */}
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.04)', color: '#555' }}>
                          DEV
                        </span>
                        <span className="text-xs font-black px-2 py-0.5 rounded-md" style={{ background: 'rgba(0,255,163,0.08)', color: '#00FFA3', border: '1px solid rgba(0,255,163,0.2)' }}>
                          {task.equity_value}% Eq
                        </span>
                      </div>

                      {/* Title */}
                      <p className="text-sm font-semibold text-white mb-3 leading-snug">{task.title}</p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs" style={{ color: '#333' }}>
                          <MessageSquare className="w-3 h-3" />
                          <span>0</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GripVertical className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#333' }} />
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(0,255,163,0.15)', color: '#00FFA3' }}>
                            A
                          </div>
                        </div>
                      </div>

                      {completing === task.id && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs" style={{ color: '#00FFA3' }}>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Calculating equity...
                        </div>
                      )}
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div className="h-20 flex items-center justify-center rounded-lg border border-dashed" style={{ borderColor: 'rgba(255,255,255,0.05)', color: '#2a2a2a' }}>
                      <p className="text-xs">Drop here</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: '#0d0d0d', border: '1px solid rgba(0,255,163,0.15)', boxShadow: '0 0 60px rgba(0,255,163,0.08)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>New Task</h3>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all" style={{ background: '#1a1a1a', color: '#555' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = '#555'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#555' }}>Task Title</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full rounded-lg px-4 py-3 text-sm font-medium text-white outline-none transition-all"
                  style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}
                  placeholder="e.g. Build the onboarding flow"
                  onFocus={e => e.target.style.borderColor = 'rgba(0,255,163,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  required
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#555' }}>Equity Reward (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="50"
                  value={newTaskEquity}
                  onChange={(e) => setNewTaskEquity(e.target.value)}
                  className="w-full rounded-lg px-4 py-3 text-sm font-medium text-white outline-none transition-all"
                  style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,255,163,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-lg text-sm font-semibold transition-all"
                  style={{ background: '#1a1a1a', color: '#555' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-lg text-sm font-black transition-all"
                  style={{ background: '#00FFA3', color: '#020202', boxShadow: '0 0 20px rgba(0,255,163,0.3)' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 35px rgba(0,255,163,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,163,0.3)'}
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
