'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts'
import { ChevronRight, TrendingUp, TrendingDown, Plus, Target } from 'lucide-react'
import {
  dailyStats,
  weeklyActivity,
  goals,
  weeklySummary,
  type StatCard,
} from '@/lib/health-data'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

const accentMap: Record<StatCard['accent'], { bg: string; text: string; ring: string }> = {
  primary: {
    bg: 'bg-primary/10',
    text: 'text-primary',
    ring: 'ring-primary/20',
  },
  accent: {
    bg: 'bg-accent/15',
    text: 'text-accent-foreground',
    ring: 'ring-accent/30',
  },
  info: {
    bg: 'bg-sky-500/10',
    text: 'text-sky-600 dark:text-sky-400',
    ring: 'ring-sky-500/20',
  },
  warning: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-600 dark:text-violet-400',
    ring: 'ring-violet-500/20',
  },
}

function StatCardItem({ stat, index }: { stat: StatCard; index: number }) {
  const Icon = stat.icon
  const accent = accentMap[stat.accent]
  const pct = Math.min(100, Math.round((stat.value / stat.goal) * 100))
  const isUp = stat.trend >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Card className="group relative overflow-hidden p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10">
        {/* Decorative gradient blob */}
        <div
          className={cn(
            'pointer-events-none absolute -right-6 -top-6 size-24 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-60',
            accent.bg
          )}
        />
        <div className="relative flex items-start justify-between">
          <div
            className={cn(
              'grid size-11 place-items-center rounded-xl ring-1',
              accent.bg,
              accent.text,
              accent.ring
            )}
          >
            <Icon className="size-5" />
          </div>
          <Badge
            variant="secondary"
            className={cn(
              'gap-1 font-medium',
              isUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
            )}
          >
            {isUp ? (
              <TrendingUp className="size-3" />
            ) : (
              <TrendingDown className="size-3" />
            )}
            {Math.abs(stat.trend)}%
          </Badge>
        </div>

        <div className="relative mt-4">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold tracking-tight text-foreground tabular-nums">
              {stat.value.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">{stat.unit}</span>
          </div>
        </div>

        <div className="relative mt-3">
          <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Goal progress</span>
            <span className="font-medium text-foreground">
              {pct}%<span className="text-muted-foreground"> / {stat.goal.toLocaleString()}</span>
            </span>
          </div>
          <Progress value={pct} className="h-1.5" />
        </div>
      </Card>
    </motion.div>
  )
}

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Hero greeting */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6 sm:p-8"
      >
        <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-8 size-40 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Today's overview
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              You're <span className="text-primary">87%</span> toward today's goals
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep up the momentum — you've stayed active for 12 days in a row.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Target className="size-4" />
              Adjust Goals
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md shadow-primary/30 hover:shadow-lg">
              <Plus className="size-4" />
              Log Activity
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dailyStats.map((s, i) => (
          <StatCardItem key={s.id} stat={s} index={i} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Weekly activity area chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Weekly Activity</h2>
              <p className="text-sm text-muted-foreground">
                Steps & calories over the past 7 days
              </p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="size-3" /> 14% vs last week
            </Badge>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyActivity}
                margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="g-steps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g-cal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    fontSize: 12,
                    color: 'var(--foreground)',
                    boxShadow: '0 8px 24px -8px rgba(0,0,0,0.12)',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                  iconType="circle"
                />
                <Area
                  type="monotone"
                  dataKey="steps"
                  name="Steps"
                  stroke="var(--chart-1)"
                  strokeWidth={2.5}
                  fill="url(#g-steps)"
                />
                <Area
                  type="monotone"
                  dataKey="calories"
                  name="Calories"
                  stroke="var(--chart-2)"
                  strokeWidth={2.5}
                  fill="url(#g-cal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Goals panel */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Daily Goals</h2>
              <p className="text-sm text-muted-foreground">Today's targets</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
              Edit <ChevronRight className="size-3.5" />
            </Button>
          </div>
          <div className="space-y-5">
            {goals.map((g) => {
              const Icon = g.icon
              const pct = Math.min(
                100,
                Math.round((g.current / g.target) * 100)
              )
              return (
                <div key={g.id}>
                  <div className="mb-1.5 flex items-center gap-2">
                    <div className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-3.5" />
                    </div>
                    <span className="text-sm font-medium">{g.label}</span>
                    <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                      {g.current}
                      <span className="text-muted-foreground/60"> / {g.target} {g.unit}</span>
                    </span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Weekly summary + bar chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Calories Burned</h2>
              <p className="text-sm text-muted-foreground">By day this week</p>
            </div>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyActivity}
                margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="g-bar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" />
                    <stop offset="100%" stopColor="var(--chart-1)" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    fontSize: 12,
                    color: 'var(--foreground)',
                  }}
                />
                <Bar
                  dataKey="calories"
                  name="Calories"
                  fill="url(#g-bar)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-base font-semibold">Week Summary</h2>
          <p className="text-sm text-muted-foreground">Your totals this week</p>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <SummaryStat
              label="Steps"
              value={weeklySummary.totalSteps.toLocaleString()}
              unit="total"
            />
            <SummaryStat
              label="Calories"
              value={weeklySummary.totalCalories.toLocaleString()}
              unit="kcal"
            />
            <SummaryStat
              label="Workouts"
              value={String(weeklySummary.totalWorkouts)}
              unit="sessions"
            />
            <SummaryStat
              label="Sleep"
              value={String(weeklySummary.totalSleepHours)}
              unit="hours"
            />
          </div>
          <div className="mt-5 rounded-xl bg-muted/60 p-4">
            <p className="text-xs text-muted-foreground">Avg resting heart rate</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold">{weeklySummary.avgHeartRate}</span>
              <span className="text-sm text-muted-foreground">bpm</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function SummaryStat({
  label,
  value,
  unit,
}: {
  label: string
  value: string
  unit: string
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-xl font-bold tracking-tight tabular-nums">{value}</p>
      <p className="text-[11px] text-muted-foreground/70">{unit}</p>
    </div>
  )
}
