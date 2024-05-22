import React from 'react'
import { Field } from 'formik'
import FormField from '../Form/Field'
import FormCheckRadio from '../Form/CheckRadio'
import { mdiMail } from '@mdi/js'
import { supabase } from '@/config/supabase'

const QuestionFormStepOne = () => {
  const [categories, setCategories] = React.useState([])

  const getCategoriesData = async () => {
    const { data, error } = await supabase.rpc('get_categories')
    if (error) console.error(error)
    setCategories(data)
  }

  React.useEffect(() => {
    getCategoriesData()
  }, [])

  return (
    <>
      <FormField label="Name - en | fr" icons={[mdiMail, mdiMail]}>
        <Field name="name_en" placeholder="Name EN" />
        <Field name="name_fr" placeholder="Name FR" />
      </FormField>

      <FormField label="Category" labelFor="category" help="Select one category">
        <Field name="category_id" id="category" component="select">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.translate[0].name} / {category.translate[1].name}
            </option>
          ))}
        </Field>
      </FormField>

      <FormField label="Source Text - en | fr" icons={[mdiMail, mdiMail]}>
        <Field name="source_text_en" placeholder="Source Text EN" />
        <Field name="source_text_fr" placeholder="Source Text FR" />
      </FormField>

      <FormField label="Is Active">
        <FormCheckRadio type="switch">
          <Field type="checkbox" name="is_active" />
        </FormCheckRadio>
      </FormField>
    </>
  )
}

export default QuestionFormStepOne
