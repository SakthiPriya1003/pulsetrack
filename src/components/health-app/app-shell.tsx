'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Menu, X, Moon, Sun, Bell } from 'lucide-react'
import { navItems, type ViewKey } from '@/lib/health-data'
import { useTheme } from './theme-provider'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type Props = {
  active: ViewKey
  onNavigate: (v: ViewKey) => void
  children: React.ReactNode
}

export function AppShell({ active, onNavigate, children }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()

  const handleNav = (v: ViewKey) => {
    onNavigate(v)
    setMobileOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      {/* Top header */}
      <header className="sticky top-0 z-40 border-b border-border/60 glass-card">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Brand + mobile menu button */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30">
                <Activity className="size-5" />
                <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-green-500 ring-2 ring-background animate-soft-pulse" />
              </div>
              <div className="leading-tight">
                <p className="text-base font-bold tracking-tight">
                  Pulse<span className="text-primary">Track</span>
                </p>
                <p className="hidden text-[11px] text-muted-foreground sm:block">
                  Health & Fitness Monitor
                </p>
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = active === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => handleNav(item.key)}
                  className={cn(
                    'relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary to-primary/90 shadow-md shadow-primary/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon className="size-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="size-5" />
              ) : (
                <Moon className="size-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-accent ring-2 ring-background" />
            </Button>
            <Avatar className="size-9 ring-2 ring-primary/40">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-semibold">
                PT
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 36 }}
              className="fixed left-0 top-16 z-50 w-72 border-r border-border/60 bg-card p-4 shadow-xl lg:hidden"
            >
              <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Navigation
              </p>
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = active === item.key
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNav(item.key)}
                    className={cn(
                      'mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <Icon className="size-4" />
                    <div className="flex flex-col">
                      <span>{item.label}</span>
                      <span className={cn('text-[11px]', isActive ? 'text-primary-foreground/80' : 'text-muted-foreground/70')}>
                        {item.description}
                      </span>
                    </div>
                  </button>
                )
              })}
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main content area with sidebar */}
      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden w-60 shrink-0 border-r border-border/60 bg-sidebar/60 backdrop-blur-sm lg:block">
          <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col p-4">
            <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Menu
            </p>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = active === item.key
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNav(item.key)}
                    className={cn(
                      'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                        : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    )}
                  >
                    <Icon className="size-4" />
                    <div className="flex flex-col">
                      <span>{item.label}</span>
                      <span className={cn('text-[11px]', isActive ? 'text-primary-foreground/80' : 'text-muted-foreground/70')}>
                        {item.description}
                      </span>
                    </div>
                  </button>
                )
              })}
            </nav>

            {/* Streak / motivation card */}
            <div className="mt-auto rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-4">
              <p className="text-xs font-semibold text-muted-foreground">
                Current Streak
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                12 <span className="text-sm font-normal text-muted-foreground">days</span>
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Keep it up — you're crushing it!
              </p>
            </div>
          </div>
        </aside>

        {/* Main page content */}
        <main className="flex-1 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-border/60 bg-card/60 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} PulseTrack · Your daily health companion
          </p>
          <p className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-green-500 animate-soft-pulse" />
            All systems live · Data synced just now
          </p>
        </div>
      </footer>
    </div>
  )
}
