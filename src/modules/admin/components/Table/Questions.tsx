'use client'

import { mdiPencil, mdiPlus, mdiTrashCan } from '@mdi/js'
import React, { useEffect, useRef, useState } from 'react'
import { IOption, IQuestion } from '@/modules/admin/interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import { format } from 'date-fns'
import { Form, Formik, FormikProps } from 'formik'
import QuestionFormStepTwo from './QuestionFormStepTwo'
import QuestionFormStepOne from './QuestionFormStepOne'
import Tabs, { ITabs } from './Tabs'
import { limitLength } from '../../utils/helpers'
import { supabase } from '@/config/supabase'

const TableSampleClients = () => {
  const formRef = useRef<FormikProps<any>>(null)
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const perPage = 5

  const initialQuestion: IQuestion = {
    name_en: '',
    name_fr: '',
    source_text_en: '',
    source_text_fr: '',
    is_active: true,
    category_id: 1,
    type_id: 1,
    options: [
      {
        is_correct: false,
        name_en: '',
        name_fr: '',
      },
      {
        is_correct: false,
        name_en: '',
        name_fr: '',
      },
      {
        is_correct: false,
        name_en: '',
        name_fr: '',
      },
      {
        is_correct: false,
        name_en: '',
        name_fr: '',
      },
    ],
    created_at: '',
    updated_at: '',
  }

  const [currentPage, setCurrentPage] = useState(0)

  const [question, setQuestion] = useState<IQuestion>(initialQuestion)

  const [options, setOptions] = useState<IOption[]>(initialQuestion.options)

  const questionsPaginated = questions.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = questions.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const getData = async () => {
    const { data, error } = await supabase.rpc('get_question_details')
    if (error) console.error(error)
    setQuestions(data)
  }

  const updateQuestionData = async (values) => {
    const { error } = await supabase.rpc('update_question_data', { p_data: values })
    if (error) {
      console.error(error)
    } else {
      handleCloseModal()
      getData()
    }
  }

  const insertQuestionData = async (values) => {
    const { error } = await supabase.rpc('insert_question_data', { p_data: values })
    if (error) console.error(error)
    else {
      handleCloseModal()
      getData()
    }
  }

  const deleteQuestionData = async (id) => {
    const { error } = await supabase.rpc('delete_question_data', { question_id: id })
    if (error) console.error(error)
    else {
      handleCloseModal()
      getData()
    }
  }

  const handleSubmit = async (values: IQuestion) => {
    if (values.id) {
      await updateQuestionData(values)
    } else {
      await insertQuestionData(values)
    }
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalSubmitBtn = () => {
    if (!formRef.current) return
    formRef.current.handleSubmit()
  }

  const handleCloseModal = () => {
    setOptions(initialQuestion.options)
    setQuestion(initialQuestion)
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, { id: null, is_correct: false, name_en: '', name_fr: '' }])
    }
  }

  const handleRemoveOption = (index) => {
    setOptions(options.filter((option, i) => i !== index))
  }

  const handleChangeOption = (index, lang, value) => {
    const newInputs = [...options]
    newInputs[index][lang] = value
    setOptions(newInputs)
  }

  const tabs: ITabs = [
    { id: 1, name: 'First step', content: <QuestionFormStepOne /> },
    {
      id: 2,
      name: 'Second step',
      content: (
        <QuestionFormStepTwo
          options={options}
          handleAddOption={handleAddOption}
          handleRemoveOption={handleRemoveOption}
          handleChangeOption={handleChangeOption}
        />
      ),
    },
  ]

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <CardBoxModal
        title="Question"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalSubmitBtn}
        onCancel={handleCloseModal}
      >
        <Formik innerRef={formRef} initialValues={question} onSubmit={handleSubmit}>
          <Form>
            <Tabs tabs={tabs} />

            {/* <Buttons>
              <Button type="submit" color="info" label="Submit" />
              <Button type="reset" color="info" outline label="Reset" onClick={handleCloseModal} />
            </Buttons> */}
          </Form>
        </Formik>
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={() => deleteQuestionData(question.id)}
        onCancel={handleCloseModal}
      >
        <p>
          Are you sure that you want to delete the question : <b>{question.name_en}</b>
        </p>
        <p>If yes, click on confirm button</p>
      </CardBoxModal>
      <div className="flex justify-end">
        <Button
          color="info"
          icon={mdiPlus}
          onClick={() => {
            setIsModalInfoActive(true)
            setOptions(question.options)
            setQuestion(question)
          }}
          small
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>is_active</th>
            <th>type</th>
            <th>source_text</th>
            <th>options</th>
            <th>category</th>
            <th>updated_at</th>
            <th>created_at</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {questionsPaginated.map((question: IQuestion) => (
            <tr key={question.id}>
              <td data-label="id">{question.id}</td>
              <td data-label="name">{limitLength(question.name_en)}</td>
              <td data-label="is_active">{question.is_active ? 'on' : 'off'}</td>
              <td data-label="type">{question.type_id}</td>
              <td data-label="source_text">{question.source_text_en}</td>
              <td data-label="locale">{question.options.length}</td>
              <td data-label="category">{question.category_id}</td>
              <td data-label="updated_at">
                <small className="text-gray-500 dark:text-slate-400">
                  {format(question.updated_at, 'dd/MM/yyyy')}
                </small>
              </td>
              <td data-label="created_at" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">
                  {format(question.created_at, 'dd/MM/yyyy')}
                </small>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiPencil}
                    onClick={() => {
                      setIsModalInfoActive(true)
                      setOptions(question.options)
                      setQuestion(question)
                    }}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => {
                      setQuestion(question)
                      setIsModalTrashActive(true)
                    }}
                    small
                  />
                </Buttons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableSampleClients
