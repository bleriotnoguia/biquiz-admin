import React from 'react'
import FormField from '../Form/Field'
import { Field } from 'formik'
import { IOption } from '../../interfaces'
import FormCheckRadio from '../Form/CheckRadio'
import { supabase } from '@/config/supabase'

type Props = {
  options: IOption[] | null
  handleChangeOption: (index: number, lang: string, value: string | boolean) => void
}

const QuestionFormStepTwo = ({ options, handleChangeOption }: Props) => {
  const [questionTypes, setQuestionTypes] = React.useState([])

  const getQuestionTypesData = async () => {
    const { data, error } = await supabase.rpc('get_question_types')
    if (error) console.error(error)
    setQuestionTypes(data)
  }

  React.useEffect(() => {
    getQuestionTypesData()
  }, [])

  return (
    <div className="space-y-4">
      {options.map((option, i) => (
        <div key={i} className="rounded-xl border border-gray-200 dark:border-slate-700 p-4 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Option {i + 1}
            </span>
            <FormCheckRadio type="switch" label="Correct answer">
              <Field
                type="checkbox"
                value={option.is_correct}
                checked={option.is_correct}
                onChange={(e) => handleChangeOption(i, 'is_correct', e.target.checked)}
                name={`option_${i + 1}_is_correct`}
              />
            </FormCheckRadio>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField label="English">
              <Field
                value={option.name_en ?? ''}
                onChange={(e) => handleChangeOption(i, 'name_en', e.target.value)}
                name={`option_${i + 1}_name_en`}
                placeholder="Answer in English"
              />
            </FormField>
            <FormField label="French">
              <Field
                value={option.name_fr ?? ''}
                onChange={(e) => handleChangeOption(i, 'name_fr', e.target.value)}
                name={`option_${i + 1}_name_fr`}
                placeholder="Réponse en Français"
              />
            </FormField>
          </div>
        </div>
      ))}

      <FormField label="Question type" labelFor="type" help="Select how answers are displayed">
        <Field name="type_id" id="type" component="select">
          {questionTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.translate[0].name} / {type.translate[1].name}
            </option>
          ))}
        </Field>
      </FormField>
    </div>
  )
}

export default QuestionFormStepTwo
