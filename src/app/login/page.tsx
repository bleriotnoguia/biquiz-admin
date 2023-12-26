'use client'

import React, { useEffect } from 'react'
import CardBox from '@/components/CardBox'
import LayoutGuest from '@/layouts/Guest'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from '@/modules/auth/auth.actions'
import {
  selectIsLoggedInUser,
  selectSignInError,
  selectSignInStatus,
} from '@/modules/auth/auth.selectors'
import { CustomError } from '@/types/error'
import { RequestStatus } from '@/types/request-status'
import { useAppDispatch, useAppSelector } from '@/config/store'

const LoginPage = ({ searchParams }: { searchParams: { message: string } }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const isLoggedInUser: boolean = useAppSelector(selectIsLoggedInUser)
  const signInError: CustomError | null = useAppSelector(selectSignInError)
  const signInStatus: RequestStatus = useAppSelector(selectSignInStatus)

  useEffect(() => {
    if (isLoggedInUser) {
      router.push('/')
    }
  }, [isLoggedInUser, router])

  const onSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const formEntries = Object.fromEntries(formData)
    const email: string = formEntries.email as string
    const password: string = formEntries.password as string

    await dispatch(signIn({ email, password }))
  }

  return (
    <LayoutGuest>
      <Link
        href="/"
        className="absolute bg-white left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            onSubmit={onSignIn}
          >
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="email"
              placeholder="you@example.com"
              required
            />
            <label className="text-md" htmlFor="password">
              Password
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
            <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
              {signInStatus === RequestStatus.LOADING ? 'Loading ...' : 'Sign in'}
            </button>
            {/* <button
              formAction={signUp}
              className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            >
              Sign Up
            </button> */}
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
          </form>
          {signInStatus === RequestStatus.FAILED && (
            <div className="mt-8 p-2 text-center bg-red-100 text-red-600 rounded">
              {signInError?.message}
            </div>
          )}
        </CardBox>
      </div>
    </LayoutGuest>
  )
}

export default LoginPage
