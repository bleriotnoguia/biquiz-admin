import { useQuery } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'
import { useSettingsStore } from '../stores/useSettingsStore'
import { Question, QuestionOption } from '@biquiz/shared'

interface RawTranslation {
  name: string
  locale: string
}

interface RawSourceText {
  source_text: string
  locale: string
}

interface RawOption {
  id: number
  name: RawTranslation[]
  is_correct: boolean
}

interface RawQuestion {
  id: number
  is_active: boolean
  name: RawTranslation[]
  source_text: RawSourceText[]
  options: RawOption[]
}

const fetchQuestions = async (category_id: string, lang: string): Promise<Question[]> => {
  const { data, error } = await supabase
    .from('questions')
    .select(
      `id, is_active,
      source_text:question_translations(source_text, locale),
      name:question_translations(name, locale),
      options:question_options(id, name:question_option_translations(name, locale), is_correct)`
    )
    .eq('question_category_id', category_id)

  if (error) throw new Error(error.message)

  return (
    (data as RawQuestion[])?.map((ques) => {
      const name = ques.name.find((i) => i.locale === lang)?.name ?? ''
      const source_text = ques.source_text.find((i) => i.locale === lang)?.source_text ?? ''
      const options: QuestionOption[] = ques.options.map((opt) => ({
        id: opt.id,
        is_correct: opt.is_correct,
        name: opt.name.find((i) => i.locale === lang)?.name ?? '',
      }))
      return { ...ques, name, source_text, options }
    }) ?? []
  )
}

export const useQuestions = (category_id: string) => {
  const language = useSettingsStore((s) => s.language)
  return useQuery({
    queryKey: ['questions', category_id, language],
    queryFn: () => fetchQuestions(category_id, language),
    enabled: !!category_id,
    staleTime: 5 * 60 * 1000,
  })
}
