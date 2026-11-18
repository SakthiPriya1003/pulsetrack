import type { LucideIcon } from 'lucide-react'
import {
  Heart,
  Footprints,
  Moon,
  Droplets,
  Activity,
  Dumbbell,
  Bike,
  Waves,
  PersonStanding,
  Timer,
  TrendingUp,
} from 'lucide-react'

export type ViewKey = 'dashboard' | 'activity' | 'metrics'

export type NavItem = {
  key: ViewKey
  label: string
  icon: LucideIcon
  description: string
}

export const navItems: NavItem[] = [
  {
    key: 'metrics',
    label: 'Health Metrics',
    icon: Heart,
    description: 'Heart, sleep & weight',
  },
  {
    key: 'activity',
    label: 'Activity',
    icon: Dumbbell,
    description: 'Workouts & steps',
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: Activity,
    description: 'Daily overview',
  },
]

// --- Daily stat cards (Dashboard top row) ---
export type StatCard = {
  id: string
  label: string
  value: number
  unit: string
  goal: number
  icon: LucideIcon
  trend: number // percent change vs yesterday
  accent: 'primary' | 'accent' | 'info' | 'warning'
}

export const dailyStats: StatCard[] = [
  {
    id: 'steps',
    label: 'Steps',
    value: 8742,
    unit: 'steps',
    goal: 10000,
    icon: Footprints,
    trend: 12,
    accent: 'primary',
  },
  {
    id: 'active',
    label: 'Active Minutes',
    value: 42,
    unit: 'min',
    goal: 60,
    icon: Timer,
    trend: 6,
    accent: 'info',
  },
  {
    id: 'heart',
    label: 'Resting HR',
    value: 62,
    unit: 'bpm',
    goal: 80,
    icon: Heart,
    trend: -3,
    accent: 'warning',
  },
  {
    id: 'water',
    label: 'Hydration',
    value: 1.6,
    unit: 'L',
    goal: 2.5,
    icon: Droplets,
    trend: 5,
    accent: 'accent',
  },
]

// --- Weekly activity chart ---
export const weeklyActivity = [
  { day: 'Mon', steps: 7240, calories: 470 },
  { day: 'Tue', steps: 9850, calories: 612 },
  { day: 'Wed', steps: 6320, calories: 395 },
  { day: 'Thu', steps: 11240, calories: 720 },
  { day: 'Fri', steps: 8910, calories: 555 },
  { day: 'Sat', steps: 12450, calories: 815 },
  { day: 'Sun', steps: 8742, calories: 542 },
]

// --- Heart rate trend (Health Metrics) ---
export const heartRateTrend = [
  { time: '6am', bpm: 58 },
  { time: '9am', bpm: 72 },
  { time: '12pm', bpm: 78 },
  { time: '3pm', bpm: 84 },
  { time: '6pm', bpm: 92 },
  { time: '9pm', bpm: 70 },
  { time: '12am', bpm: 62 },
]

// --- Sleep history (Health Metrics) ---
export const sleepHistory = [
  { day: 'Mon', deep: 1.8, light: 4.2, rem: 1.5 },
  { day: 'Tue', deep: 2.1, light: 4.0, rem: 1.3 },
  { day: 'Wed', deep: 1.4, light: 4.6, rem: 1.6 },
  { day: 'Thu', deep: 2.4, light: 3.8, rem: 1.4 },
  { day: 'Fri', deep: 1.6, light: 4.4, rem: 1.7 },
  { day: 'Sat', deep: 2.6, light: 4.1, rem: 1.8 },
  { day: 'Sun', deep: 2.2, light: 4.3, rem: 1.6 },
]

// --- Weight history (Health Metrics) ---
export const weightHistory = [
  { week: 'W1', weight: 62.8 },
  { week: 'W2', weight: 62.3 },
  { week: 'W3', weight: 61.9 },
  { week: 'W4', weight: 61.5 },
  { week: 'W5', weight: 61.0 },
  { week: 'W6', weight: 60.6 },
  { week: 'W7', weight: 60.3 },
  { week: 'W8', weight: 60.0 },
]

// --- Workout history (Activity Tracker) ---
export type Workout = {
  id: string
  type: string
  icon: LucideIcon
  date: string
  duration: number // minutes
  calories: number
  intensity: 'Low' | 'Medium' | 'High'
}

export const workoutHistory: Workout[] = [
  {
    id: 'w1',
    type: 'Morning Run',
    icon: PersonStanding,
    date: 'Today · 6:30 AM',
    duration: 42,
    calories: 380,
    intensity: 'High',
  },
  {
    id: 'w2',
    type: 'Cycling',
    icon: Bike,
    date: 'Yesterday · 5:45 PM',
    duration: 65,
    calories: 510,
    intensity: 'Medium',
  },
  {
    id: 'w3',
    type: 'Strength Training',
    icon: Dumbbell,
    date: 'Nov 15 · 7:00 AM',
    duration: 50,
    calories: 320,
    intensity: 'High',
  },
  {
    id: 'w4',
    type: 'Swimming',
    icon: Waves,
    date: 'Nov 14 · 6:30 PM',
    duration: 35,
    calories: 295,
    intensity: 'Medium',
  },
  {
    id: 'w5',
    type: 'Yoga Flow',
    icon: PersonStanding,
    date: 'Nov 13 · 7:30 AM',
    duration: 30,
    calories: 145,
    intensity: 'Low',
  },
  {
    id: 'w6',
    type: 'HIIT Session',
    icon: Timer,
    date: 'Nov 12 · 6:00 PM',
    duration: 28,
    calories: 365,
    intensity: 'High',
  },
]

// --- Workout type options for the log form ---
export const workoutTypes = [
  { value: 'run', label: 'Running', icon: PersonStanding, caloriesPerMin: 9 },
  { value: 'cycle', label: 'Cycling', icon: Bike, caloriesPerMin: 8 },
  { value: 'swim', label: 'Swimming', icon: Waves, caloriesPerMin: 8.5 },
  { value: 'strength', label: 'Strength', icon: Dumbbell, caloriesPerMin: 6.5 },
  { value: 'yoga', label: 'Yoga', icon: PersonStanding, caloriesPerMin: 4.5 },
  { value: 'hiit', label: 'HIIT', icon: Timer, caloriesPerMin: 13 },
]

// --- Goals (Dashboard goals panel) ---
export type Goal = {
  id: string
  label: string
  current: number
  target: number
  unit: string
  icon: LucideIcon
}

export const goals: Goal[] = [
  {
    id: 'steps-goal',
    label: 'Daily Steps',
    current: 8742,
    target: 10000,
    unit: 'steps',
    icon: Footprints,
  },
  {
    id: 'active-goal',
    label: 'Active Minutes',
    current: 42,
    target: 60,
    unit: 'min',
    icon: Timer,
  },
  {
    id: 'sleep-goal',
    label: 'Sleep Duration',
    current: 7.4,
    target: 8,
    unit: 'hrs',
    icon: Moon,
  },
  {
    id: 'weight-goal',
    label: 'Target Weight',
    current: 60,
    target: 58,
    unit: 'kg',
    icon: TrendingUp,
  },
]

// --- Weekly summary (Dashboard bottom card) ---
export const weeklySummary = {
  totalSteps: 64752,
  totalCalories: 4109,
  totalWorkouts: 5,
  totalSleepHours: 51.5,
  avgHeartRate: 68,
}
