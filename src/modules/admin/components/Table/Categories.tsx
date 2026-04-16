'use client'

import React, { useEffect, useState } from 'react'
import { mdiChevronLeft, mdiChevronRight, mdiMagnify, mdiPencil, mdiClose, mdiCheck } from '@mdi/js'
import { supabase } from '@/config/supabase'
import Icon from '../Icon'

type Translation = { name: string; locale: string }

type Category = {
  id: number
  is_active: boolean
  created_at: string
  translate: Translation[]
}

type EditForm = {
  nameEn: string
  nameFr: string
  isActive: boolean
}

const TableCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const perPage = 10
  const [currentPage, setCurrentPage] = useState(0)

  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editForm, setEditForm] = useState<EditForm>({ nameEn: '', nameFr: '', isActive: true })
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const fetchCategories = async () => {
    setLoading(true)
    setFetchError(null)
    const { data, error } = await supabase.rpc('get_categories')

    if (error) {
      console.error('[Categories] Supabase error:', error)
      setFetchError(error.message)
    } else {
      setCategories(data ?? [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const getName = (category: Category, locale: string) =>
    category.translate?.find((t) => t.locale === locale)?.name ?? '—'

  const filteredCategories = categories.filter((cat) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return cat.translate?.some((t) => t.name?.toLowerCase().includes(q))
  })

  const paginated = filteredCategories.slice(perPage * currentPage, perPage * (currentPage + 1))
  const numPages = Math.ceil(filteredCategories.length / perPage)
  const pagesList = Array.from({ length: numPages }, (_, i) => i)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(0)
  }

  const openEdit = (category: Category) => {
    setEditingCategory(category)
    setEditForm({
      nameEn: getName(category, 'en'),
      nameFr: getName(category, 'fr'),
      isActive: category.is_active,
    })
    setSaveError(null)
  }

  const closeEdit = () => {
    setEditingCategory(null)
    setSaveError(null)
  }

  const handleSave = async () => {
    if (!editingCategory) return
    setSaving(true)
    setSaveError(null)

    const { error: statusError } = await supabase
      .from('question_categories')
      .update({ is_active: editForm.isActive })
      .eq('id', editingCategory.id)

    if (statusError) {
      setSaveError(statusError.message)
      setSaving(false)
      return
    }

    const translationUpdates = [
      { locale: 'en', name: editForm.nameEn },
      { locale: 'fr', name: editForm.nameFr },
    ]

    for (const { locale, name } of translationUpdates) {
      const existing = editingCategory.translate?.find((t) => t.locale === locale)
      if (existing) {
        const { error } = await supabase
          .from('question_category_translations')
          .update({ name })
          .eq('question_category_id', editingCategory.id)
          .eq('locale', locale)
        if (error) {
          setSaveError(error.message)
          setSaving(false)
          return
        }
      }
    }

    await fetchCategories()
    setSaving(false)
    closeEdit()
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—'
    const d = new Date(dateStr)
    return isNaN(d.getTime()) ? '—' : d.toLocaleDateString()
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

  if (fetchError) {
    return (
      <div className="px-4 py-10 text-center">
        <p className="text-sm font-medium text-red-500 dark:text-red-400 mb-1">Failed to load categories</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">{fetchError}</p>
      </div>
    )
  }

  return (
    <>
      {/* Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeEdit} />
          <div className="relative z-10 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-700">
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">Edit Category</h3>
              <button
                onClick={closeEdit}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              >
                <Icon path={mdiClose} size="18" w="" h="" />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                  Name (EN)
                </label>
                <input
                  type="text"
                  value={editForm.nameEn}
                  onChange={(e) => setEditForm((f) => ({ ...f, nameEn: e.target.value }))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                  Name (FR)
                </label>
                <input
                  type="text"
                  value={editForm.nameFr}
                  onChange={(e) => setEditForm((f) => ({ ...f, nameFr: e.target.value }))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditForm((f) => ({ ...f, isActive: !f.isActive }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${
                    editForm.isActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      editForm.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {editForm.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {saveError && (
                <p className="text-xs text-red-500 dark:text-red-400">{saveError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100 dark:border-slate-700">
              <button
                onClick={closeEdit}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {saving ? (
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Icon path={mdiCheck} size="16" w="" h="" />
                )}
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((category) => (
                <tr key={category.id}>
                  <td data-label="Name (EN)">
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {getName(category, 'en')}
                    </span>
                  </td>
                  <td data-label="Name (FR)">
                    <span className="text-slate-600 dark:text-slate-300">
                      {getName(category, 'fr')}
                    </span>
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
                      {formatDate(category.created_at)}
                    </span>
                  </td>
                  <td className="lg:w-1 whitespace-nowrap">
                    <button
                      onClick={() => openEdit(category)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400 transition"
                      title="Edit category"
                    >
                      <Icon path={mdiPencil} size="16" w="" h="" />
                    </button>
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
