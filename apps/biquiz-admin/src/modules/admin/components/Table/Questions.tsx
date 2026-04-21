'use client'

import { mdiChevronLeft, mdiChevronRight, mdiMagnify, mdiPencil, mdiPlus, mdiTrashCan } from '@mdi/js'
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
import toast from 'react-hot-toast'
import Icon from '../Icon'

const TableQuestions = () => {
  const formRef = useRef<FormikProps<any>>(null)
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [isSubmeting, setIsSubmeting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
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
      { is_correct: false, name_en: '', name_fr: '' },
      { is_correct: false, name_en: '', name_fr: '' },
      { is_correct: false, name_en: '', name_fr: '' },
      { is_correct: false, name_en: '', name_fr: '' },
    ],
    created_at: '',
    updated_at: '',
  }

  const [currentPage, setCurrentPage] = useState(0)
  const [question, setQuestion] = useState<IQuestion>(initialQuestion)
  const [options, setOptions] = useState<IOption[]>(initialQuestion.options)

  const filteredQuestions = questions.filter((q) => {
    if (!searchQuery.trim()) return true
    const q_lower = searchQuery.toLowerCase()
    return (
      q.name_en?.toLowerCase().includes(q_lower) ||
      q.source_text_en?.toLowerCase().includes(q_lower)
    )
  })

  const numPages = Math.ceil(filteredQuestions.length / perPage)
  const questionsPaginated = filteredQuestions.slice(perPage * currentPage, perPage * (currentPage + 1))

  const pagesList = Array.from({ length: numPages }, (_, i) => i)

  const getQuestionsData = async () => {
    setLoading(true)
    const { data, error } = await supabase.rpc('get_question_details')
    if (error) console.error(error)
    setQuestions(data ?? [])
    setLoading(false)
  }

  const updateQuestionData = async (values: IQuestion) => {
    const { error } = await supabase.rpc('update_question_data', { p_data: values })
    if (error) {
      toast.error('Failed to update question.')
    } else {
      toast.success('Question updated successfully!')
      handleCloseModal()
      getQuestionsData()
    }
  }

  const insertQuestionData = async (values: IQuestion) => {
    const { error } = await supabase.rpc('insert_question_data', { p_data: values })
    if (error) toast.error('Failed to create question.')
    else {
      toast.success('Question created successfully!')
      handleCloseModal()
      getQuestionsData()
    }
  }

  const deleteQuestionData = async (id: number) => {
    const { error } = await supabase.rpc('delete_question_data', { question_id: id })
    if (error) toast.error('Failed to delete question.')
    else {
      toast.success('Question deleted!')
      handleCloseModal()
      getQuestionsData()
    }
  }

  const handleSubmit = async (values: IQuestion) => {
    setIsSubmeting(true)
    if (values.id) {
      await updateQuestionData(values)
    } else {
      await insertQuestionData(values)
    }
    setIsSubmeting(false)
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

  const handleChangeOption = (index: number, lang: keyof IOption, value: string | boolean) => {
    const newInputs = [...options]
    newInputs[index][lang] = value
    setOptions(newInputs)
  }

  const tabs: ITabs = [
    { id: 1, name: 'First step', content: <QuestionFormStepOne /> },
    {
      id: 2,
      name: 'Second step',
      content: <QuestionFormStepTwo options={options} handleChangeOption={handleChangeOption} />,
    },
  ]

  useEffect(() => {
    getQuestionsData()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(0)
  }

  return (
    <>
      <CardBoxModal
        title="Question"
        buttonColor="info"
        buttonLabel={isSubmeting ? 'Saving...' : 'Submit'}
        isActive={isModalInfoActive}
        onConfirm={handleModalSubmitBtn}
        onCancel={handleCloseModal}
      >
        <Formik innerRef={formRef} initialValues={question} onSubmit={handleSubmit}>
          <Form>
            <Tabs tabs={tabs} />
          </Form>
        </Formik>
      </CardBoxModal>

      <CardBoxModal
        title="Confirm deletion"
        buttonColor="danger"
        buttonLabel="Delete"
        isActive={isModalTrashActive}
        onConfirm={() => deleteQuestionData(question.id)}
        onCancel={handleCloseModal}
      >
        <p>
          Are you sure you want to delete: <b>{question.name_en}</b>?
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-sm">This action cannot be undone.</p>
      </CardBoxModal>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-100 dark:border-slate-700">
        <div className="relative flex-1 max-w-xs">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon path={mdiMagnify} size="16" w="" h="" />
          </span>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-8 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />
        </div>
        <Button
          color="info"
          icon={mdiPlus}
          label="Add"
          onClick={() => {
            setIsModalInfoActive(true)
            setOptions(initialQuestion.options)
            setQuestion(initialQuestion)
          }}
          small
          roundedFull
        />
      </div>

      {loading ? (
        <div className="px-4 py-8">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="px-4 py-12 text-center text-slate-400 dark:text-slate-500">
          {searchQuery ? `No questions found for "${searchQuery}"` : 'No questions yet.'}
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>status</th>
                <th>type</th>
                <th>source text</th>
                <th>options</th>
                <th>category</th>
                <th>updated</th>
                <th>created</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {questionsPaginated.map((question: IQuestion) => (
                <tr key={question.id}>
                  <td data-label="id">
                    <span className="text-xs text-slate-400 dark:text-slate-500">#{question.id}</span>
                  </td>
                  <td data-label="name">
                    <span className="font-medium text-slate-700 dark:text-slate-200">{limitLength(question.name_en)}</span>
                  </td>
                  <td data-label="status">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      question.is_active
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                    }`}>
                      {question.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td data-label="type">
                    <span className="text-xs text-slate-500">{question.type_id}</span>
                  </td>
                  <td data-label="source text">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{question.source_text_en}</span>
                  </td>
                  <td data-label="options">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                      {question.options.length}
                    </span>
                  </td>
                  <td data-label="category">
                    <span className="text-xs text-slate-500">{question.category_id}</span>
                  </td>
                  <td data-label="updated">
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {format(question.updated_at, 'dd/MM/yyyy')}
                    </span>
                  </td>
                  <td data-label="created" className="lg:w-1 whitespace-nowrap">
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {format(question.created_at, 'dd/MM/yyyy')}
                    </span>
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

          {numPages > 1 && (
            <div className="px-4 py-3 border-t border-gray-100 dark:border-slate-700">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                    className="p-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <Icon path={mdiChevronLeft} size="16" w="" h="" />
                  </button>
                  {pagesList.map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                        page === currentPage
                          ? 'bg-indigo-600 text-white'
                          : 'border border-gray-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {page + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(numPages - 1, p + 1))}
                    disabled={currentPage === numPages - 1}
                    className="p-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <Icon path={mdiChevronRight} size="16" w="" h="" />
                  </button>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Page {currentPage + 1} of {numPages} &middot; {filteredQuestions.length} questions
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default TableQuestions
