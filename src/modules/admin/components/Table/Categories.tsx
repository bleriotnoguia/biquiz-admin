'use client'

import React, { useEffect, useState } from 'react'
import { mdiChevronLeft, mdiChevronRight, mdiMagnify } from '@mdi/js'
import { supabase } from '@/config/supabase'
import Icon from '../Icon'

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
  const [searchQuery, setSearchQuery] = useState('')

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

  const filteredCategories = categories.filter((cat) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return cat.name_en?.toLowerCase().includes(q) || cat.name_fr?.toLowerCase().includes(q)
  })

  const paginated = filteredCategories.slice(perPage * currentPage, perPage * (currentPage + 1))
  const numPages = Math.ceil(filteredCategories.length / perPage)
  const pagesList = Array.from({ length: numPages }, (_, i) => i)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(0)
  }

  if (loading) {
    return (
      <div className="px-4 py-8">
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-slate-700">
        <div className="relative flex-1 max-w-xs">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon path={mdiMagnify} size="16" w="" h="" />
          </span>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-8 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
          {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'}
        </span>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="px-4 py-12 text-center text-slate-400 dark:text-slate-500">
          {searchQuery ? `No categories found for "${searchQuery}"` : 'No categories yet.'}
        </div>
      ) : (
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
                  <td data-label="Name (EN)">
                    <span className="font-medium text-slate-700 dark:text-slate-200">{category.name_en}</span>
                  </td>
                  <td data-label="Name (FR)">
                    <span className="text-slate-600 dark:text-slate-300">{category.name_fr}</span>
                  </td>
                  <td data-label="Status">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        category.is_active
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                      }`}
                    >
                      {category.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {new Date(category.created_at).toLocaleDateString()}
                    </span>
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
                  Page {currentPage + 1} of {numPages}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default TableCategories
