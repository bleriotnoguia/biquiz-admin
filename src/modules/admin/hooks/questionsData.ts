import { supabase } from '@/config/supabase'
import { useEffect, useState } from 'react'
import { IQuestion } from '../interfaces'

export const useQuestionsData = () => {
  const [questions, setQuestions] = useState<IQuestion[] | null>([])
  console.log('test1')

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.rpc('get_question_details')
      if (error) console.error(error)
      setQuestions(data)
    }

    getData()
  }, [])

  return questions ?? []
}
