import React from 'react'
import { Field } from 'formik'
import FormField from '../Form/Field'
import FormCheckRadio from '../Form/CheckRadio'
import { mdiTranslate, mdiBookOpenPageVariant } from '@mdi/js'
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
    <div className="space-y-1">
      <FormField label="Question — EN | FR" icons={[mdiTranslate, mdiTranslate]}>
        <Field name="name_en" placeholder="Question in English" />
        <Field name="name_fr" placeholder="Question en Français" />
      </FormField>

      <FormField label="Category" labelFor="category" help="Select the question's category">
        <Field name="category_id" id="category" component="select">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.translate[0].name} / {category.translate[1].name}
            </option>
          ))}
        </Field>
      </FormField>

      <FormField label="Source text — EN | FR" icons={[mdiBookOpenPageVariant, mdiBookOpenPageVariant]}>
        <Field name="source_text_en" placeholder="e.g. Luke 1:11-17" />
        <Field name="source_text_fr" placeholder="ex. Luc 1:11-17" />
      </FormField>

      <FormField label="Active">
        <FormCheckRadio type="switch" label="Published and visible to users">
          <Field type="checkbox" name="is_active" />
        </FormCheckRadio>
      </FormField>
    </div>
  )
}

export default QuestionFormStepOne
