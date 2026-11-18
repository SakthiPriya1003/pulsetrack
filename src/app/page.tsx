'use client'

import * as React from 'react'
import { AppShell } from '@/components/health-app/app-shell'
import { DashboardView } from '@/components/health-app/dashboard-view'
import { ActivityView } from '@/components/health-app/activity-view'
import { MetricsView } from '@/components/health-app/metrics-view'
import type { ViewKey } from '@/lib/health-data'

export default function Home() {
  const [view, setView] = React.useState<ViewKey>('metrics')

  return (
    <AppShell active={view} onNavigate={setView}>
      {view === 'dashboard' && <DashboardView />}
      {view === 'activity' && <ActivityView />}
      {view === 'metrics' && <MetricsView />}
    </AppShell>
  )
}
