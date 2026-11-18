'use client'

import * as React from 'react'

type ThemeProviderProps = {
  children: React.ReactNode
  attribute?: 'class' | 'data-theme'
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: string
  setTheme: (theme: string) => void
}

const ThemeProviderContext = React.createContext<ThemeProviderState>({
  theme: 'light',
  setTheme: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState(defaultTheme)

  React.useEffect(() => {
    const stored = localStorage.getItem('pulse-theme')
    const initial = stored ?? (enableSystem ? 'light' : defaultTheme)
    setThemeState(initial)
  }, [defaultTheme, enableSystem])

  React.useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('pulse-theme', theme)
  }, [theme])

  const setTheme = React.useCallback((t: string) => setThemeState(t), [])

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const ctx = React.useContext(ThemeProviderContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
