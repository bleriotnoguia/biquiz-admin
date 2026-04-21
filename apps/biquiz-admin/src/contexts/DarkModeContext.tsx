'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface DarkModeContextType {
  isDarkMode: boolean
  setDarkMode: (value: boolean | null) => void
}

const DarkModeContext = createContext<DarkModeContextType | null>(null)

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('darkMode') === '1'
    }
    return false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    document.documentElement.classList.toggle('dark-scrollbars-compat', isDarkMode)
    document.body.classList.toggle('dark-scrollbars', isDarkMode)
    localStorage.setItem('darkMode', isDarkMode ? '1' : '0')
  }, [isDarkMode])

  const setDarkMode = (value: boolean | null) =>
    setIsDarkMode((prev) => (value !== null ? value : !prev))

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => {
  const ctx = useContext(DarkModeContext)
  if (!ctx) throw new Error('useDarkMode must be used within DarkModeProvider')
  return ctx
}
