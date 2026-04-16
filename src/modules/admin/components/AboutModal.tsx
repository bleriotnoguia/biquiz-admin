'use client'

import React from 'react'
import { mdiClose, mdiGithub, mdiOpenInNew, mdiTagMultiple, mdiHelpCircleOutline } from '@mdi/js'
import Icon from './Icon'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function AboutModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-11/12 max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">About Biquiz Admin</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          >
            <Icon path={mdiClose} size="18" w="" h="" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Logo + description */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xl">B</span>
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-white">Biquiz Admin</p>
              <p className="text-xs text-slate-400">Bible quiz management platform</p>
            </div>
          </div>

          {/* Stats / links */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3 flex items-center gap-2">
              <Icon path={mdiHelpCircleOutline} size="18" w="" h="" className="text-indigo-500" />
              <div>
                <p className="text-xs text-slate-400">Questions</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Quiz app</p>
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3 flex items-center gap-2">
              <Icon path={mdiTagMultiple} size="18" w="" h="" className="text-purple-500" />
              <div>
                <p className="text-xs text-slate-400">Categories</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Organized</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <a
              href="https://biquiz.bleriotnoguia.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition group"
            >
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-400">
                Open Biquiz App
              </span>
              <Icon path={mdiOpenInNew} size="16" w="" h="" className="text-indigo-400 group-hover:text-indigo-600" />
            </a>
            <a
              href="https://github.com/bleriotnoguia/biquiz-admin"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition group"
            >
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                View on GitHub
              </span>
              <Icon path={mdiGithub} size="16" w="" h="" className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 dark:border-slate-700 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Built by{' '}
            <a
              href="https://bleriotnoguia.com"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-500 hover:underline"
            >
              BleriotNoguia.com
            </a>
            {' '}· {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}
