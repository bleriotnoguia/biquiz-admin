import { create } from 'zustand'
import { Choice } from '@biquiz/shared'

interface QuizStore {
  choices: Choice[]
  categoryId: string
  addChoice: (c: Choice) => void
  deleteChoices: () => void
  setCategoryId: (id: string) => void
}

export const useQuizStore = create<QuizStore>()((set) => ({
  choices: [],
  categoryId: '',
  addChoice: (c) => set((s) => ({ choices: [c, ...s.choices] })),
  deleteChoices: () => set({ choices: [] }),
  setCategoryId: (id) => set({ categoryId: id }),
}))
