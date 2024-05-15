import { supabase } from '@/config/supabase'
import { useEffect, useState } from 'react'
import { Question } from '../interfaces'

export const useQuestionsData = () => {
  const [questions, setQuestions] = useState<Question[] | null>([])

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.rpc('get_question_details')
      if (error) console.error(error)
      // else console.log(data)
      // console.log('data', data)

      setQuestions(data)
    }

    getData()
  }, [])

  return questions ?? []
}
