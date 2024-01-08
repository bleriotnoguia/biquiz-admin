import React from 'react'
import FormField from '../Form/Field'
import { Field } from 'formik'
import { mdiPlus, mdiTrashCan } from '@mdi/js'
import Button from '../Button'
import { Option } from '../../interfaces'

type Props = {
  options: Option[] | null
  handleChangeOption: (index, lang, value) => void
  handleAddOption: () => void
  handleRemoveOption: (index) => void
}

const QuestionFormStepTwo = ({
  options,
  handleChangeOption,
  handleAddOption,
  handleRemoveOption,
}: Props) => {
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
          <Button
            color="danger"
            icon={mdiTrashCan}
            onClick={() => handleRemoveOption(i)}
            small
            className="self-end"
          />
        </div>
      ))}
      <div className="flex justify-end mt-4">
        <Button color="info" icon={mdiPlus} onClick={handleAddOption} />
      </div>
      <FormField label="Type" labelFor="type" help="Select one type">
        <Field name="type_id" id="type" component="select">
          <option value="1">multiple_choice_single_answer</option>
          <option value="2">text_complete</option>
        </Field>
      </FormField>
    </>
  )
}

export default QuestionFormStepTwo
