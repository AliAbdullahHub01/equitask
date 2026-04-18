import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { LandingPage } from './pages/LandingPage'
import { DashboardLayout } from './layouts/DashboardLayout'
import { DashboardHome } from './pages/DashboardHome'
import { Projects } from './pages/Projects'
import { Tasks } from './pages/Tasks'
import { TeamEquity } from './pages/TeamEquity'

// Create a client for React Query
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />
          
          {/* Protected/Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="projects" element={<Projects />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="equity" element={<TeamEquity />} />
            <Route path="settings" element={<div className="text-white">Settings Page (Coming Soon)</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
