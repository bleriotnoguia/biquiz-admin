'use client'

import { mdiPencil, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { Question } from '@/modules/admin/interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import { useQuestionsData } from '../../hooks/questionsData'
import { format } from 'date-fns'
import { Form, Formik } from 'formik'
import QuestionFormStepTwo from './QuestionFormStepTwo'
import QuestionFormStepOne from './QuestionFormStepOne'
import Tabs, { ITabs } from './Tabs'
import { limitLength } from '../../utils/helpers'

const TableSampleClients = () => {
  const questions = useQuestionsData()
  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  const questionsPaginated = questions.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = questions.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const tabs: ITabs = [
    { id: 1, name: 'First step', content: <QuestionFormStepOne /> },
    { id: 2, name: 'Second step', content: <QuestionFormStepTwo /> },
  ]

  return (
    <>
      <CardBoxModal
        title="Question"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <Formik
          initialValues={{
            name_en: '',
            name_fr: '',
            category: '2',
            source_text_en: '',
            source_text_fr: '',
            is_active: false,
            type: '1',
            options: [
              { en: '', fr: '' },
              { en: '', fr: '' },
              { en: '', fr: '' },
              { en: '', fr: '' },
            ],
          }}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        >
          <Form>
            <Tabs tabs={tabs} />

            {/* <Buttons>
              <Button type="submit" color="info" label="Submit" />
              <Button type="reset" color="info" outline label="Reset" onClick={handleModalAction} />
            </Buttons> */}
          </Form>
        </Formik>
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

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
          {questionsPaginated.map((question: Question) => (
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
                    onClick={() => setIsModalInfoActive(true)}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => setIsModalTrashActive(true)}
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
