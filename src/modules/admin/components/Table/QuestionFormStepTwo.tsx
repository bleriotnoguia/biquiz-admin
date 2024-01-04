import React, { useState } from 'react'
import FormField from '../Form/Field'
import { Field } from 'formik'
import { mdiPlus, mdiTrashCan } from '@mdi/js'
import Button from '../Button'

const QuestionFormStepTwo = () => {
  const [inputs, setInputs] = useState([{ en: '', fr: '' }])

  const handleAdd = () => {
    if (inputs.length < 4) {
      setInputs([...inputs, { en: '', fr: '' }])
    }
  }

  const handleRemove = (index) => {
    setInputs(inputs.filter((input, i) => i !== index))
  }

  const handleChange = (index, lang, value) => {
    const newInputs = [...inputs]
    newInputs[index][lang] = value
    setInputs(newInputs)
  }

  return (
    <>
      {inputs.map((input, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex-1">
            <FormField label={`Option ${i + 1} en`} labelFor="type">
              <Field value={input.en} onChange={(e) => handleChange(i, 'en', e.target.value)} />
            </FormField>
          </div>
          <div className="flex-1">
            <FormField label={`Option ${i + 1} fr`} labelFor="type">
              <Field value={input.fr} onChange={(e) => handleChange(i, 'fr', e.target.value)} />
            </FormField>
          </div>
          <Button
            color="danger"
            icon={mdiTrashCan}
            onClick={() => handleRemove(i)}
            small
            className="self-end"
          />
        </div>
      ))}
      <div className="flex justify-end mt-4">
        <Button color="info" icon={mdiPlus} onClick={handleAdd} />
      </div>
      <FormField label="Type" labelFor="type" help="Select one type">
        <Field name="type" id="type" component="select">
          <option value="1">multiple_choice_single_answer</option>
          <option value="2">text_complete</option>
        </Field>
      </FormField>
    </>
  )
}

export default QuestionFormStepTwo
