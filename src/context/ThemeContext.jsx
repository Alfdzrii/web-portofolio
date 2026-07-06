import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

/* ── Read initial preference: localStorage → OS media query ─────── */
function getInitialDark() {
  try {
    const stored = localStorage.getItem('p5r-theme')
    if (stored !== null) return stored === 'dark'
  } catch {
    /* storage blocked in private mode — ignore */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({ children }) {
  const [dark, setDarkRaw] = useState(getInitialDark)

  /* Apply class to <html> and persist choice on every change */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('p5r-theme', dark ? 'dark' : 'light')
    } catch {
      /* storage blocked — ignore */
    }
  }, [dark])

  const setDark = (value) => {
    // Accept both direct booleans and toggle callbacks
    const next = typeof value === 'function' ? value(dark) : value
    setDarkRaw(next)
  }

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

/* eslint-disable react-refresh/only-export-components */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
