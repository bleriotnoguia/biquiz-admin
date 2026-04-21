import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Score } from '@biquiz/shared'

interface ScoresStore {
  data: Score[]
  setScore: (score: Score) => void
  resetProgress: () => void
}

export const useScoresStore = create<ScoresStore>()(
  persist(
    (set, get) => ({
      data: [],
      setScore: (newScore) => {
        const filtered = get().data.filter((s) => s.category_id !== newScore.category_id)
        set({ data: [newScore, ...filtered] })
      },
      resetProgress: () => set({ data: [] }),
    }),
    { name: 'biquiz-scores' }
  )
)
