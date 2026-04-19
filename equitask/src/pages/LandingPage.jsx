import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, TrendingUp, CheckCircle2 } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen text-white selection:bg-[rgba(0,255,163,0.2)]" style={{ background: '#020202' }}>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl" style={{ background: 'rgba(2,2,2,0.8)' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Equi<span style={{ color: '#00FFA3' }}>Task</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium transition-colors" style={{ color: '#555' }} onMouseEnter={e => e.target.style.color='#f0f0f0'} onMouseLeave={e => e.target.style.color='#555'}>
              Log in
            </Link>
            <Link to="/dashboard" className="neon-btn text-sm px-5 py-2 rounded-lg">
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase mb-10" style={{ borderColor: 'rgba(0,255,163,0.3)', color: '#00FFA3', background: 'rgba(0,255,163,0.05)' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#00FFA3' }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#00FFA3' }}></span>
          </span>
          Hackathon Project · Built in 2025
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Build Together.<br />
          <span style={{ color: '#00FFA3', textShadow: '0 0 80px rgba(0,255,163,0.4)' }}>
            Own Together.
          </span>
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12" style={{ color: '#555' }}>
          The task board that automatically calculates and distributes equity as your team ships work. No spreadsheets. No arguments.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard" className="neon-btn flex items-center gap-2 px-8 py-4 rounded-xl text-base">
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="#features" className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold border transition-all" style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#888' }}>
            How it works
          </a>
        </div>

        {/* Stats bar */}
        <div className="mt-24 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { value: '100%', label: 'Transparent' },
            { value: 'Real-Time', label: 'Equity Engine' },
            { value: 'Zero', label: 'Disputes' },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl border" style={{ background: '#0d0d0d', borderColor: 'rgba(255,255,255,0.06)' }}>
              <p className="text-2xl font-black mb-1" style={{ color: '#00FFA3' }}>{stat.value}</p>
              <p className="text-xs" style={{ color: '#444' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div id="features" className="mt-32 grid md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
          {[
            { icon: Zap, title: 'Instant Equity', desc: 'Drag a task to Done and watch your equity update in real-time. No manual tracking ever.' },
            { icon: TrendingUp, title: 'Live Leaderboard', desc: 'Transparent leaderboard shows exactly who is contributing and earning what, always.' },
            { icon: Shield, title: 'Supabase Backend', desc: 'Industrial-grade Postgres database backing every transaction with full audit history.' },
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="p-6 rounded-2xl border transition-all group" style={{ background: '#0d0d0d', borderColor: 'rgba(255,255,255,0.06)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,255,163,0.25)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(0,255,163,0.1)' }}>
                  <Icon className="w-5 h-5" style={{ color: '#00FFA3' }} />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{feature.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-32 text-center" style={{ color: '#2a2a2a' }}>
          <p className="text-sm">Built by Ali Abdullah · EquiTask &copy; 2025 · Hackathon Edition</p>
        </div>
      </main>
    </div>
  )
}
