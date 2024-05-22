import React from 'react'
import FormField from '../Form/Field'
import { Field } from 'formik'
import { IOption } from '../../interfaces'
import FormCheckRadio from '../Form/CheckRadio'
import { supabase } from '@/config/supabase'

type Props = {
  options: IOption[] | null
  handleChangeOption: (index, lang, value) => void
}

const QuestionFormStepTwo = ({ options, handleChangeOption }: Props) => {
  const [questionTypes, setQuestionTypes] = React.useState([])

  const getQuestionTypesData = async () => {
    const { data, error } = await supabase.rpc('get_question_types')
    console.log(data, error)
    if (error) console.error(error)
    setQuestionTypes(data)
  }

  React.useEffect(() => {
    getQuestionTypesData()
  }, [])
  return (
    <>
      {options.map((option, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex-1">
            <FormField label={`Option ${i + 1} en`} labelFor="type">
              <Field
                value={option.name_en ?? ''}
                onChange={(e) => handleChangeOption(i, 'name_en', e.target.value)}
                name={`option_${i + 1}_name_en`}
              />
            </FormField>
          </div>
          <div className="flex-1">
            <FormField label={`Option ${i + 1} fr`} labelFor="type">
              <Field
                value={option.name_fr ?? ''}
                onChange={(e) => handleChangeOption(i, 'name_fr', e.target.value)}
                name={`option_${i + 1}_name_fr`}
              />
            </FormField>
          </div>
          <div className="flex justify-end">
            <FormField label="Is Correct">
              <FormCheckRadio type="switch">
                <Field
                  type="checkbox"
                  value={option.is_correct}
                  checked={option.is_correct}
                  onChange={(e) => handleChangeOption(i, 'is_correct', e.target.checked)}
                  name={`option_${i + 1}_is_correct`}
                />
              </FormCheckRadio>
            </FormField>
          </div>
        </div>
      ))}
      <FormField label="Type" labelFor="type" help="Select one type">
        <Field name="type_id" id="type" component="select">
          {questionTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.translate[0].name} / {type.translate[1].name}
            </option>
          ))}
        </Field>
      </FormField>
    </>
  )
}

export default QuestionFormStepTwo
