'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/config/supabase'
import Button from '../Button'
import Buttons from '../Buttons'

type Category = {
  id: number
  name_en: string
  name_fr: string
  is_active: boolean
  created_at: string
}

const TableCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const perPage = 10
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('question_categories')
        .select('id, name_en, name_fr, is_active, created_at')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setCategories(data)
      }
      setLoading(false)
    }

    fetchCategories()
  }, [])

  const paginated = categories.slice(perPage * currentPage, perPage * (currentPage + 1))
  const numPages = Math.ceil(categories.length / perPage)
  const pagesList = Array.from({ length: numPages }, (_, i) => i)

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-slate-400">Loading categories…</div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-slate-400">No categories found.</div>
    )
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name (EN)</th>
            <th>Name (FR)</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((category) => (
            <tr key={category.id}>
              <td data-label="Name (EN)">{category.name_en}</td>
              <td data-label="Name (FR)">{category.name_fr}</td>
              <td data-label="Status">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    category.is_active
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}
                >
                  {category.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">
                  {new Date(category.created_at).toLocaleDateString()}
                </small>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {numPages > 1 && (
        <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
            <Buttons>
              {pagesList.map((page) => (
                <Button
                  key={page}
                  active={page === currentPage}
                  label={String(page + 1)}
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
      )}
    </>
  )
}

export default TableCategories
