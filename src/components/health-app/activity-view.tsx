'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from 'recharts'
import { Plus, Flame, Clock, Footprints, Dumbbell, Check, Trash2 } from 'lucide-react'
import { workoutHistory, workoutTypes, type Workout } from '@/lib/health-data'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const intensityColor: Record<Workout['intensity'], string> = {
  Low: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-emerald-500/20',
  Medium: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 ring-amber-500/20',
  High: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 ring-rose-500/20',
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const stepsByDay = [7240, 9850, 6320, 11240, 8910, 12450, 8742]

const ringData = [
  { name: 'Move', value: 77, fill: 'var(--chart-2)' },
]

export function ActivityView() {
  const [workouts, setWorkouts] = React.useState<Workout[]>(workoutHistory)
  const [selectedType, setSelectedType] = React.useState(workoutTypes[0].value)
  const [duration, setDuration] = React.useState('')
  const [intensity, setIntensity] = React.useState<Workout['intensity']>('Medium')

  const currentType = workoutTypes.find((t) => t.value === selectedType)!
  const computedCalories = duration
    ? Math.round((parseInt(duration, 10) || 0) * currentType.caloriesPerMin)
    : 0

  const handleAdd = () => {
    const mins = parseInt(duration, 10)
    if (!mins || mins < 1) {
      toast.error('Please enter a valid duration (minutes).')
      return
    }
    const newWorkout: Workout = {
      id: `w-${Date.now()}`,
      type: currentType.label,
      icon: currentType.icon,
      date: 'Just now',
      duration: mins,
      calories: computedCalories,
      intensity,
    }
    setWorkouts((prev) => [newWorkout, ...prev])
    toast.success(`Workout logged: ${currentType.label} · ${mins} min · ${computedCalories} kcal`)
    setDuration('')
  }

  const handleRemove = (id: string) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id))
    toast.info('Workout removed from log.')
  }

  const totalToday = workouts
    .filter((w) => w.date === 'Just now' || w.date.includes('Today'))
    .reduce((acc, w) => acc + w.calories, 0)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Activity Tracker</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Log workouts, monitor daily steps, and track calories burned.
          </p>
        </div>
        <Badge variant="secondary" className="gap-1 self-start">
          <Flame className="size-3.5 text-accent-foreground" />
          {totalToday || 380} kcal burned today
        </Badge>
      </div>

      {/* Top metrics row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Move ring */}
        <Card className="relative overflow-hidden p-6">
          <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-accent/20 blur-2xl" />
          <div className="relative flex items-center gap-5">
            <div className="size-28 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="72%"
                  outerRadius="100%"
                  data={ringData}
                  startAngle={90}
                  endAngle={90 - (ringData[0].value / 100) * 360}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar background={{ fill: 'var(--muted)' }} dataKey="value" cornerRadius={20} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Move Ring</p>
              <p className="text-2xl font-bold">{ringData[0].value}%</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {Math.round(700 * (ringData[0].value / 100))} / 700 kcal
              </p>
            </div>
          </div>
        </Card>

        {/* Steps today */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Footprints className="size-5" />
            </div>
            <Badge variant="secondary" className="text-emerald-600 dark:text-emerald-400">
              +12% vs yesterday
            </Badge>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Steps Today</p>
          <p className="text-3xl font-bold tabular-nums">8,742</p>
          <p className="mt-1 text-xs text-muted-foreground">Goal: 10,000</p>
        </Card>

        {/* Active minutes */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="grid size-10 place-items-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Clock className="size-5" />
            </div>
            <Badge variant="secondary" className="text-emerald-600 dark:text-emerald-400">
              On track
            </Badge>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Active Minutes</p>
          <p className="text-3xl font-bold tabular-nums">42<span className="text-base font-normal text-muted-foreground"> / 60 min</span></p>
          <p className="mt-1 text-xs text-muted-foreground">Daily target</p>
        </Card>
      </div>

      {/* Steps bar chart + Log workout form */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Steps chart */}
        <Card className="p-6 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Daily Steps</h2>
              <p className="text-sm text-muted-foreground">Last 7 days</p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Footprints className="size-3.5 text-primary" /> 64,852 total
            </Badge>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={days.map((d, i) => ({ day: d, steps: stepsByDay[i] }))} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
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
                <Bar dataKey="steps" fill="var(--chart-1)" radius={[6, 6, 0, 0]} maxBarSize={56} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Log workout form */}
        <Card className="p-6 lg:col-span-2">
          <div className="mb-5 flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <Plus className="size-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Log a Workout</h2>
              <p className="text-xs text-muted-foreground">Track what you did today</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="type" className="text-xs font-medium text-muted-foreground">
                Workout Type
              </Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger id="type" className="mt-1.5 w-full">
                  <SelectValue placeholder="Pick a workout" />
                </SelectTrigger>
                <SelectContent>
                  {workoutTypes.map((t) => {
                    const Icon = t.icon
                    return (
                      <SelectItem key={t.value} value={t.value}>
                        <span className="flex items-center gap-2">
                          <Icon className="size-4" />
                          {t.label}
                        </span>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="duration" className="text-xs font-medium text-muted-foreground">
                  Duration (min)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="30"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="intensity" className="text-xs font-medium text-muted-foreground">
                  Intensity
                </Label>
                <Select value={intensity} onValueChange={(v) => setIntensity(v as Workout['intensity'])}>
                  <SelectTrigger id="intensity" className="mt-1.5 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Computed calories preview */}
            <div className="flex items-center justify-between rounded-lg bg-muted/60 px-4 py-3">
              <span className="text-xs text-muted-foreground">Estimated calories</span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-accent-foreground">
                <Flame className="size-4 text-accent-foreground" />
                {computedCalories} kcal
              </span>
            </div>

            <Button
              onClick={handleAdd}
              className="w-full gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md shadow-primary/30 hover:shadow-lg"
            >
              <Check className="size-4" />
              Save Workout
            </Button>
          </div>
        </Card>
      </div>

      {/* Workout history list */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Recent Workouts</h2>
            <p className="text-sm text-muted-foreground">{workouts.length} sessions logged</p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Dumbbell className="size-3.5" />
            {workouts.reduce((acc, w) => acc + w.duration, 0)} min total
          </Badge>
        </div>

        <div className="max-h-[460px] space-y-2 overflow-y-auto scrollbar-thin pr-1">
          {workouts.length === 0 ? (
            <div className="grid place-items-center py-12 text-center">
              <Dumbbell className="size-8 text-muted-foreground/40" />
              <p className="mt-2 text-sm text-muted-foreground">
                No workouts logged yet. Add your first one above.
              </p>
            </div>
          ) : (
            workouts.map((w, i) => {
              const Icon = w.icon
              return (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(i, 6) * 0.04 }}
                  className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3 transition-colors hover:bg-muted/40"
                >
                  <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold">{w.type}</p>
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-[10px] font-medium ring-1',
                          intensityColor[w.intensity]
                        )}
                      >
                        {w.intensity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{w.date}</p>
                  </div>
                  <div className="hidden shrink-0 gap-4 text-right sm:flex">
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-semibold tabular-nums">{w.duration} min</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Calories</p>
                      <p className="text-sm font-semibold tabular-nums text-accent-foreground">
                        {w.calories} kcal
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0 text-muted-foreground hover:text-rose-500"
                    onClick={() => handleRemove(w.id)}
                    aria-label="Remove workout"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </motion.div>
              )
            })
          )}
        </div>
      </Card>
    </div>
  )
}
