'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/config/store'
import { DarkModeProvider } from '@/contexts/DarkModeContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <DarkModeProvider>{children}</DarkModeProvider>
    </Provider>
  )
}
