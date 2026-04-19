import React, { useState } from 'react'
import { User, Bell, Sliders, Save, Shield } from 'lucide-react'

export function Settings() {
  const [name, setName] = useState('Ali')
  const [email, setEmail] = useState('ali@equitask.dev')
  const [role, setRole] = useState('Lead Developer')
  const [equityPool, setEquityPool] = useState('100')
  const [notif, setNotif] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputStyle = {
    background: '#111',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: 'white',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
  }

  const Section = ({ icon: Icon, title, children }) => (
    <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ background: 'rgba(0,255,163,0.08)', borderRadius: '10px', padding: '8px', display: 'flex', alignItems: 'center' }}>
          <Icon size={16} color="#00FFA3" />
        </div>
        <p style={{ fontWeight: 700, fontSize: '14px', color: 'white' }}>{title}</p>
      </div>
      {children}
    </div>
  )

  const Field = ({ label, children }) => (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', marginBottom: '8px' }}>{label}</label>
      {children}
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 900, color: 'white' }}>Settings</h2>
        <p style={{ fontSize: '12px', color: '#444', marginTop: '4px' }}>Manage your profile and project configuration</p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">

        <Section icon={User} title="Profile">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Display Name">
              <input style={inputStyle} value={name} onChange={e => setName(e.target.value)}
                onFocus={e => e.target.style.borderColor = 'rgba(0,255,163,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </Field>
            <Field label="Role">
              <input style={inputStyle} value={role} onChange={e => setRole(e.target.value)}
                onFocus={e => e.target.style.borderColor = 'rgba(0,255,163,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </Field>
          </div>
          <Field label="Email">
            <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)}
              onFocus={e => e.target.style.borderColor = 'rgba(0,255,163,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </Field>
        </Section>

        <Section icon={Sliders} title="Equity Engine">
          <Field label="Total Equity Pool (%)">
            <input style={inputStyle} type="number" min="1" max="100" value={equityPool} onChange={e => setEquityPool(e.target.value)}
              onFocus={e => e.target.style.borderColor = 'rgba(0,255,163,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </Field>
          <p style={{ fontSize: '12px', color: '#333' }}>Equity is automatically split when tasks are moved to Done.</p>
        </Section>

        <Section icon={Bell} title="Notifications">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>Equity Alerts</p>
              <p style={{ fontSize: '12px', color: '#444', marginTop: '2px' }}>Get notified when equity is distributed</p>
            </div>
            <button type="button" onClick={() => setNotif(!notif)}
              style={{
                width: '48px', height: '26px', borderRadius: '999px', border: 'none', cursor: 'pointer',
                background: notif ? '#00FFA3' : '#222',
                position: 'relative', transition: 'background 0.2s',
              }}
            >
              <span style={{
                position: 'absolute', top: '3px',
                left: notif ? '24px' : '3px',
                width: '20px', height: '20px', borderRadius: '50%',
                background: notif ? '#020202' : '#555',
                transition: 'left 0.2s',
              }} />
            </button>
          </div>
        </Section>

        <Section icon={Shield} title="Security">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', background: 'rgba(0,255,163,0.04)', border: '1px solid rgba(0,255,163,0.1)' }}>
            <Shield size={16} color="#00FFA3" />
            <p style={{ fontSize: '13px', color: '#555' }}>This is a demo build. Auth & team management coming in v2.</p>
          </div>
        </Section>

        <button type="submit"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
            borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: '14px',
            background: saved ? '#00cc82' : '#00FFA3', color: '#020202',
            boxShadow: '0 0 20px rgba(0,255,163,0.3)', transition: 'all 0.2s',
          }}
        >
          <Save size={16} />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
