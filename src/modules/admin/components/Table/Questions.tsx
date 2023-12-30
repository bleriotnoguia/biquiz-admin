'use client'

import { mdiPencil, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { Question } from '@/modules/admin/interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import { useQuestionsData } from '../../hooks/questionsData'

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

  return (
    <>
      <CardBoxModal
        title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
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
            <th>is_active</th>
            <th>type</th>
            <th>source_text</th>
            <th>locale</th>
            <th>category</th>
            <th>id</th>
            <th>updated_at</th>
            <th>created_at</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {questionsPaginated.map((question: Question) => (
            <tr key={question.id}>
              <td data-label="is_active">{question.is_active ? 'on' : 'off'}</td>
              <td data-label="type">{question.type}</td>
              <td data-label="source_text">{question.source_text}</td>
              <td data-label="locale">{question.locale}</td>
              <td data-label="category">{question.category}</td>
              <td data-label="id">{question.id}</td>
              <td data-label="updated_at">{question.updated_at}</td>
              <td data-label="created_at" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">{question.created_at}</small>
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
