'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { updatePassword, resetAuthStatus } from '@/modules/auth/auth.actions'
import {
  selectUpdatePasswordError,
  selectUpdatePasswordStatus,
} from '@/modules/auth/auth.selectors'
import { CustomError } from '@biquiz/shared'
import { RequestStatus } from '@biquiz/shared'
import { useAppDispatch, useAppSelector } from '@/config/store'
import { supabase } from '@/config/supabase'

type PageState = 'loading' | 'ready' | 'invalid'

const ResetPasswordPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const updateError: CustomError | null = useAppSelector(selectUpdatePasswordError)
  const updateStatus: RequestStatus = useAppSelector(selectUpdatePasswordStatus)

  const [pageState, setPageState] = useState<PageState>('loading')
  const [passwordMismatch, setPasswordMismatch] = useState(false)

  useEffect(() => {
    // Supabase embeds the recovery tokens in the URL hash.
    // Calling getSession() after page load processes those hash params automatically.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setPageState('ready')
      } else {
        // Also listen for the PASSWORD_RECOVERY event in case the hash
        // hasn't been processed yet when the component mounts.
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
          if (event === 'PASSWORD_RECOVERY') {
            setPageState('ready')
          }
        })
        // Give Supabase a moment to process the hash; fall back to invalid.
        const timer = setTimeout(() => setPageState('invalid'), 3000)
        return () => {
          subscription.unsubscribe()
          clearTimeout(timer)
        }
      }
    })
  }, [])

  useEffect(() => {
    if (updateStatus === RequestStatus.COMPLETED) {
      const timer = setTimeout(() => router.push('/login'), 2500)
      return () => clearTimeout(timer)
    }
  }, [updateStatus, router])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPasswordMismatch(false)
    const formData = new FormData(event.target as HTMLFormElement)
    const password = formData.get('password') as string
    const confirm = formData.get('confirm') as string

    if (password !== confirm) {
      setPasswordMismatch(true)
      return
    }

    await dispatch(updatePassword({ password }))
  }

  const onRetry = () => {
    dispatch(resetAuthStatus(['updatePasswordStatus', 'updatePasswordError']))
  }

  const isLoading = updateStatus === RequestStatus.LOADING
  const isCompleted = updateStatus === RequestStatus.COMPLETED

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-900">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-12">
          <div className="text-6xl mb-6">📖</div>
          <h1 className="text-4xl font-bold text-white mb-4">Biquiz Admin</h1>
          <p className="text-indigo-200 text-lg leading-relaxed">
            Manage your Bible quiz content, categories, and questions from one place.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Set new password</h2>
            <p className="mt-2 text-gray-500 dark:text-slate-400">Choose a strong password for your account.</p>
          </div>

          {pageState === 'loading' && (
            <div className="flex items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          )}

          {pageState === 'invalid' && (
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-center">
              <svg className="h-12 w-12 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <p className="text-red-700 dark:text-red-400 font-medium">Invalid or expired link</p>
              <p className="text-red-600 dark:text-red-500 text-sm">
                This password reset link is no longer valid. Please request a new one.
              </p>
              <Link
                href="/forgot-password"
                className="mt-2 inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors font-medium"
              >
                Request a new reset link
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          )}

          {pageState === 'ready' && (
            <>
              {isCompleted ? (
                <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 text-center">
                  <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-700 dark:text-green-400 font-medium text-lg">Password updated!</p>
                  <p className="text-green-600 dark:text-green-500 text-sm">
                    Your password has been changed. Redirecting you to sign in…
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                      New password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                      Confirm new password
                    </label>
                    <input
                      id="confirm"
                      name="confirm"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                    />
                  </div>

                  {passwordMismatch && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                      <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Passwords do not match.
                    </div>
                  )}

                  {updateStatus === RequestStatus.FAILED && updateError && (
                    <div className="flex flex-col gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {updateError.message}
                      </div>
                      <button type="button" onClick={onRetry} className="text-left underline text-xs">
                        Try again
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Updating…
                      </span>
                    ) : (
                      'Update password'
                    )}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
