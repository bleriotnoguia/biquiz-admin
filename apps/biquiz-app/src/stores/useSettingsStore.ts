import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsStore {
  isEasy: boolean
  isDarkMode: boolean
  language: string
  displaySource: boolean
  setIsEasy: (v: boolean) => void
  setIsDarkMode: (v: boolean) => void
  setLanguage: (v: string) => void
  setDisplaySource: (v: boolean) => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      isEasy: true,
      isDarkMode: false,
      language: 'fr',
      displaySource: true,
      setIsEasy: (v) => set({ isEasy: v }),
      setIsDarkMode: (v) => {
        document.body.classList.toggle('dark', v)
        set({ isDarkMode: v })
      },
      setLanguage: (v) => set({ language: v }),
      setDisplaySource: (v) => set({ displaySource: v }),
    }),
    { name: 'biquiz-settings' }
  )
)
