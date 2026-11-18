'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Calculator, RefreshCcw, Info } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type BmiCategory = {
  label: string
  color: string
  bg: string
  range: string
  bar: string
}

const categories: BmiCategory[] = [
  { label: 'Underweight', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-500/15 ring-sky-500/20', range: '< 18.5', bar: 'bg-sky-500' },
  { label: 'Normal', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/15 ring-emerald-500/20', range: '18.5 – 24.9', bar: 'bg-emerald-500' },
  { label: 'Overweight', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/15 ring-amber-500/20', range: '25.0 – 29.9', bar: 'bg-amber-500' },
  { label: 'Obese', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/15 ring-rose-500/20', range: '≥ 30.0', bar: 'bg-rose-500' },
]

function classifyBmi(bmi: number): { category: BmiCategory; index: number } {
  if (bmi < 18.5) return { category: categories[0], index: 0 }
  if (bmi < 25) return { category: categories[1], index: 1 }
  if (bmi < 30) return { category: categories[2], index: 2 }
  return { category: categories[3], index: 3 }
}

// BMI ranges from 12 to 40 → mapped to a 0–100% scale on the gradient bar
function bmiToPercent(bmi: number): number {
  const min = 12
  const max = 40
  return Math.max(0, Math.min(100, ((bmi - min) / (max - min)) * 100))
}

export function BmiCalculator() {
  // Defaults reflect the rest of the app (current weight = 60 kg, average height ~170 cm)
  const [height, setHeight] = React.useState('170')
  const [weight, setWeight] = React.useState('60')

  const h = parseFloat(height)
  const w = parseFloat(weight)
  const hasValid = h > 0 && w > 0
  const bmi = hasValid ? +(w / Math.pow(h / 100, 2)).toFixed(1) : 0
  const { category, index } = hasValid ? classifyBmi(bmi) : { category: categories[1], index: 1 }

  const handleReset = () => {
    setHeight('170')
    setWeight('60')
  }

  return (
    <Card className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
            <Calculator className="size-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold">BMI Calculator</h2>
            <p className="text-sm text-muted-foreground">Body Mass Index from your height & weight</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="size-8 text-muted-foreground"
          aria-label="Reset calculator"
        >
          <RefreshCcw className="size-4" />
        </Button>
      </div>

      {/* Helper instruction */}
      <div className="mb-4 flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0 text-primary" />
        <span>
          Enter your height and weight below — your BMI updates instantly along with the category.
        </span>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="bmi-height" className="text-xs font-medium text-muted-foreground">
            Height (cm)
          </Label>
          <Input
            id="bmi-height"
            type="number"
            inputMode="decimal"
            min={50}
            max={250}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="bmi-weight" className="text-xs font-medium text-muted-foreground">
            Weight (kg)
          </Label>
          <Input
            id="bmi-weight"
            type="number"
            inputMode="decimal"
            min={20}
            max={250}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="60"
            className="mt-1.5"
          />
        </div>
      </div>

      {/* Result */}
      <div className="mt-5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Your BMI</p>
            <motion.p
              key={bmi}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-4xl font-bold tabular-nums"
            >
              {hasValid ? bmi.toFixed(1) : '—'}
            </motion.p>
          </div>
          {hasValid && (
            <Badge
              variant="secondary"
              className={cn('rounded-full px-3 py-1 text-xs font-semibold ring-1', category.bg, category.color)}
            >
              {category.label}
            </Badge>
          )}
        </div>

        {/* BMI scale bar */}
        <div className="mt-4">
          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-emerald-500 via-50% to-rose-500">
            {hasValid && (
              <motion.div
                className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-foreground shadow-md"
                animate={{ left: `${bmiToPercent(bmi)}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 24 }}
              />
            )}
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
            <span>12</span>
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>40</span>
          </div>
        </div>
      </div>

      {/* Category legend */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {categories.map((c, i) => {
          const active = i === index && hasValid
          return (
            <div
              key={c.label}
              className={cn(
                'flex items-center justify-between rounded-lg border px-3 py-2 transition-all',
                active
                  ? cn('border-transparent ring-1', c.bg)
                  : 'border-border/60 bg-card'
              )}
            >
              <div className="flex items-center gap-2">
                <span className={cn('size-2 rounded-full', c.bar)} />
                <span className={cn('text-xs font-medium', active ? c.color : 'text-foreground')}>
                  {c.label}
                </span>
              </div>
              <span className="text-[10px] tabular-nums text-muted-foreground">{c.range}</span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
