'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts'
import {
  Heart,
  Moon,
  Droplets,
  Scale,
  Activity,
  TrendingDown,
  TrendingUp,
  Thermometer,
  Wind,
  Info,
} from 'lucide-react'
import { heartRateTrend, sleepHistory, weightHistory } from '@/lib/health-data'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { BmiCalculator } from '@/components/health-app/bmi-calculator'

const vitals = [
  {
    id: 'hr',
    label: 'Heart Rate',
    value: 68,
    unit: 'bpm',
    icon: Heart,
    accent: 'text-rose-500',
    bg: 'bg-rose-500/10',
    ring: 'ring-rose-500/20',
    note: 'Resting · Healthy',
  },
  {
    id: 'spo2',
    label: 'Blood Oxygen',
    value: 98,
    unit: '% SpO₂',
    icon: Wind,
    accent: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-500/10',
    ring: 'ring-sky-500/20',
    note: 'Normal range',
  },
  {
    id: 'temp',
    label: 'Body Temp',
    value: 36.6,
    unit: '°C',
    icon: Thermometer,
    accent: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10',
    ring: 'ring-amber-500/20',
    note: 'Stable',
  },
  {
    id: 'weight',
    label: 'Weight',
    value: 60,
    unit: 'kg',
    icon: Scale,
    accent: 'text-primary',
    bg: 'bg-primary/10',
    ring: 'ring-primary/20',
    note: '2.8 kg down in 8w',
  },
]

const sleepSummary = {
  total: 7.4,
  goal: 8,
  deep: 2.2,
  light: 4.3,
  rem: 1.6,
  score: 84,
}

export function MetricsView() {
  const sleepPct = Math.min(100, Math.round((sleepSummary.total / sleepSummary.goal) * 100))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Health Metrics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Deep dive into your vitals, sleep quality, and long-term trends.
          </p>
        </div>
        <Badge variant="secondary" className="gap-1 self-start">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-soft-pulse" />
          Live · Updated 2 min ago
        </Badge>
      </div>

      {/* BMI Calculator — hero section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BmiCalculator />
        </div>

        {/* Snapshot summary beside the calculator */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <Activity className="size-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Today's Snapshot</h2>
              <p className="text-sm text-muted-foreground">Quick summary of your vitals</p>
            </div>
          </div>
          <div className="space-y-3">
            {vitals.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.id}
                  className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-3"
                >
                  <div
                    className={cn(
                      'grid size-9 place-items-center rounded-lg ring-1',
                      v.bg,
                      v.accent,
                      v.ring
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">{v.label}</p>
                    <p className="text-sm font-semibold tabular-nums">
                      {v.value} <span className="text-xs font-normal text-muted-foreground">{v.unit}</span>
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{v.note}</span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Sample data note */}
      <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-700 dark:text-amber-300">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        <span>
          Sample data metrics are used for the sections below — Today's Snapshot, vital cards,
          heart rate, sleep, weight, and weekly insights are illustrative only.
        </span>
      </div>

      {/* Vital cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vitals.map((v, i) => {
          const Icon = v.icon
          return (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Card className="relative overflow-hidden p-5">
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      'grid size-11 place-items-center rounded-xl ring-1',
                      v.bg,
                      v.accent,
                      v.ring
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  {v.id === 'weight' && (
                    <Badge variant="secondary" className="gap-1 text-emerald-600 dark:text-emerald-400">
                      <TrendingDown className="size-3" /> 3.5%
                    </Badge>
                  )}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{v.label}</p>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold tabular-nums">{v.value}</span>
                  <span className="text-sm text-muted-foreground">{v.unit}</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{v.note}</p>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Heart rate detail */}
      <Card className="p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-lg bg-rose-500/10 text-rose-500">
              <Heart className="size-5 animate-soft-pulse" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Heart Rate — Today</h2>
              <p className="text-sm text-muted-foreground">BPM throughout the day</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Stat label="Resting" value="58 bpm" />
            <Stat label="Average" value="74 bpm" />
            <Stat label="Peak" value="142 bpm" accent="text-rose-500" />
          </div>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={heartRateTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="g-hr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-5)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--chart-5)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} domain={[40, 150]} />
              <Tooltip
                contentStyle={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  fontSize: 12,
                  color: 'var(--foreground)',
                }}
              />
              <ReferenceLine y={60} stroke="var(--chart-1)" strokeDasharray="4 4" label={{ value: 'Resting', fontSize: 10, fill: 'var(--muted-foreground)' }} />
              <Area type="monotone" dataKey="bpm" name="Heart Rate" stroke="var(--chart-5)" strokeWidth={2.5} fill="url(#g-hr)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Sleep + Weight side by side */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sleep breakdown */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <Moon className="size-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold">Sleep Quality</h2>
                <p className="text-sm text-muted-foreground">Last night & weekly breakdown</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-violet-600 dark:text-violet-400">
              Score {sleepSummary.score}
            </Badge>
          </div>

          {/* Last night summary */}
          <div className="mb-4 rounded-xl bg-muted/60 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Last night</p>
              <p className="text-xs text-muted-foreground">Goal: {sleepSummary.goal} hrs</p>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tabular-nums">{sleepSummary.total}</span>
              <span className="text-sm text-muted-foreground">hours</span>
            </div>
            <Progress value={sleepPct} className="mt-2 h-1.5" />
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <SleepPhase label="Deep" value={sleepSummary.deep} color="var(--chart-3)" />
              <SleepPhase label="Light" value={sleepSummary.light} color="var(--chart-1)" />
              <SleepPhase label="REM" value={sleepSummary.rem} color="var(--chart-4)" />
            </div>
          </div>

          {/* Weekly sleep bar chart */}
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepHistory} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
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
                <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
                <Bar dataKey="deep" name="Deep" stackId="a" fill="var(--chart-3)" radius={[0, 0, 0, 0]} maxBarSize={36} />
                <Bar dataKey="light" name="Light" stackId="a" fill="var(--chart-1)" maxBarSize={36} />
                <Bar dataKey="rem" name="REM" stackId="a" fill="var(--chart-4)" radius={[6, 6, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Weight trend */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Scale className="size-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold">Weight Trend</h2>
                <p className="text-sm text-muted-foreground">Past 8 weeks</p>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1 text-emerald-600 dark:text-emerald-400">
              <TrendingDown className="size-3" /> -2.8 kg
            </Badge>
          </div>

          {/* Current weight highlight */}
          <div className="mb-4 flex items-end justify-between rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-4">
            <div>
              <p className="text-xs text-muted-foreground">Current</p>
              <p className="text-3xl font-bold tabular-nums">60 <span className="text-sm font-normal text-muted-foreground">kg</span></p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Target</p>
              <p className="text-2xl font-semibold tabular-nums text-primary">58 <span className="text-xs font-normal text-muted-foreground">kg</span></p>
            </div>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightHistory} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} domain={[59, 64]} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    fontSize: 12,
                    color: 'var(--foreground)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  name="Weight (kg)"
                  stroke="var(--chart-1)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: 'var(--chart-1)', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: 'var(--card)', stroke: 'var(--chart-1)', strokeWidth: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Health insights tabs */}
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
            <Activity className="size-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Weekly Insights</h2>
            <p className="text-sm text-muted-foreground">Patterns & recommendations</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="hydration">Hydration</TabsTrigger>
            <TabsTrigger value="recovery">Recovery</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <InsightCard
                title="Sleep consistency"
                value="92%"
                tone="emerald"
                description="Bedtime varied by only 18 minutes this week — excellent consistency."
              />
              <InsightCard
                title="Active days"
                value="6 / 7"
                tone="primary"
                description="You hit your move goal on six of the last seven days."
              />
              <InsightCard
                title="Resting HR"
                value="58 bpm"
                tone="rose"
                description="Down 3 bpm this month, a sign of improving cardiovascular fitness."
              />
            </div>
          </TabsContent>

          <TabsContent value="hydration" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InsightCard
                title="Avg hydration"
                value="1.9 L / day"
                tone="sky"
                description="Slightly below your 2.5 L target. Try drinking a glass before each meal."
              />
              <InsightCard
                title="Best day"
                value="Saturday · 2.6 L"
                tone="emerald"
                description="Consistent sipping through the day helped you hit your goal."
              />
            </div>
          </TabsContent>

          <TabsContent value="recovery" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InsightCard
                title="Recovery score"
                value="84 / 100"
                tone="violet"
                description="Your body is well-recovered — ready for a moderate-to-high intensity session."
              />
              <InsightCard
                title="HRV trend"
                value="42 ms · +6%"
                tone="emerald"
                description="Heart-rate variability is up 6% over the past two weeks."
              />
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: string
}) {
  return (
    <div className="rounded-lg bg-muted/60 px-3 py-1.5 text-center">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={cn('text-sm font-semibold tabular-nums', accent)}>{value}</p>
    </div>
  )
}

function SleepPhase({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <div className="rounded-lg bg-card/80 p-2 ring-1 ring-border/60">
      <div className="mx-auto size-2 rounded-full" style={{ background: color }} />
      <p className="mt-1 text-xs font-semibold tabular-nums">{value}h</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  )
}

function InsightCard({
  title,
  value,
  description,
  tone,
}: {
  title: string
  value: string
  description: string
  tone: 'emerald' | 'primary' | 'rose' | 'sky' | 'violet'
}) {
  const tones: Record<'emerald' | 'primary' | 'rose' | 'sky' | 'violet', string> = {
    emerald: 'text-emerald-600 dark:text-emerald-400',
    primary: 'text-primary',
    rose: 'text-rose-500',
    sky: 'text-sky-600 dark:text-sky-400',
    violet: 'text-violet-600 dark:text-violet-400',
  }
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className={cn('mt-0.5 text-xl font-bold tabular-nums', tones[tone])}>{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
    </div>
  )
}
